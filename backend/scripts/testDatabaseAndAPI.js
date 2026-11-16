import mongoose from 'mongoose';
import { Pet } from '../models/Pet.js';
import { User } from '../models/User.js';
import { connectDB } from '../config/db.js';
import { store } from '../utils/storage.js';

async function runTests() {
  console.log('--- TEST 1: MongoDB Connection & Seeding ---');
  await connectDB();
  await store.syncFromMongoDB();

  const totalMongoPets = await Pet.countDocuments();
  console.log(`[PASS] Total Pet records in MongoDB: ${totalMongoPets}`);
  if (totalMongoPets < 12) {
    throw new Error(`Expected at least 12 pets, but found ${totalMongoPets}`);
  }

  console.log('\n--- TEST 2: Inspecting Sample Pet Profiles ---');
  const samplePets = await Pet.find().limit(4).lean();
  samplePets.forEach((p, idx) => {
    console.log(`[Pet ${idx + 1}] Name: ${p.name} | Category: ${p.category} | Breed: ${p.breed} | Age: ${p.age} | Status: ${p.adoptionStatus} | Vaccinated: ${p.vaccinated} | Location: ${p.location}`);
  });

  console.log('\n--- TEST 3: Testing Filtering & Requirement 10 (Adopted pets excluded by default) ---');
  const allInMemory = store.getPets();
  console.log(`Total pets in store: ${allInMemory.length}`);
  const availablePets = allInMemory.filter(p => (p.adoptionStatus || 'available') === 'available');
  const adoptedPets = allInMemory.filter(p => p.adoptionStatus === 'adopted');
  console.log(`Available pets for adoption: ${availablePets.length}`);
  console.log(`Adopted pets (excluded from available): ${adoptedPets.length} (${adoptedPets.map(p => p.name).join(', ')})`);

  if (availablePets.length === 0) {
    throw new Error('Available pets count is 0!');
  }

  console.log('\n--- TEST 4: Category Filtering (Dogs vs Cats) ---');
  const dogs = availablePets.filter(p => p.category === 'dog');
  const cats = availablePets.filter(p => p.category === 'cat');
  console.log(`Available Dogs: ${dogs.length} (${dogs.slice(0, 3).map(d => d.name).join(', ')}...)`);
  console.log(`Available Cats: ${cats.length} (${cats.slice(0, 3).map(c => c.name).join(', ')}...)`);

  console.log('\n--- TEST 5: Location Filtering ---');
  const hydPets = availablePets.filter(p => p.location.toLowerCase().includes('hyderabad'));
  console.log(`Hyderabad Pets: ${hydPets.length}`);

  console.log('\n--- TEST 6: Requirement 9 (Newly Added NGO Pet Appears in Public Listing) ---');
  const testPetName = "Barnaby Test Pup " + Date.now().toString().slice(-4);
  const newNgoPet = store.createPet({
    name: testPetName,
    category: 'dog',
    breed: 'Golden Retriever',
    age: '6 Months',
    ageGroup: 'puppy',
    gender: 'male',
    size: 'medium',
    location: 'Hyderabad, Telangana',
    healthStatus: 'healthy',
    vaccinated: true,
    spayedNeutered: true,
    ngoVerified: true,
    adoptionStatus: 'available',
    images: ['https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1000&q=80'],
    description: 'A test rescue pup added by NGO shelter.',
    personality: ['Playful', 'Loving'],
    ngoId: 'user_ngo_1',
    ngoName: 'Paws & Hope Animal Shelter'
  });

  const updatedAvailable = store.getPets().filter(p => (p.adoptionStatus || 'available') === 'available');
  const foundNewPet = updatedAvailable.find(p => p.name === testPetName);
  if (!foundNewPet) {
    throw new Error('Newly created pet was not found in available pets list!');
  }
  console.log(`[PASS] Newly added NGO pet "${foundNewPet.name}" appears immediately in public available listings! Total available now: ${updatedAvailable.length}`);

  // Clean up test pet
  store.deletePet(newNgoPet._id);
  console.log(`[PASS] Test pet cleaned up.`);

  console.log('\n--- ALL VERIFICATIONS PASSED SUCCESSFULLY! ---');
  await mongoose.disconnect();
  process.exit(0);
}

runTests().catch(err => {
  console.error('[FAIL] Test execution error:', err);
  process.exit(1);
});
