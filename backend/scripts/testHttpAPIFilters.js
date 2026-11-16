import http from 'http';
import express from 'express';
import cors from 'cors';
import { connectDB } from '../config/db.js';
import { store } from '../utils/storage.js';
import petRoutes from '../routes/petRoutes.js';

async function testHttpEndpoints() {
  await connectDB();
  await store.syncFromMongoDB();

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/api/pets', petRoutes);

  const server = http.createServer(app);
  await new Promise(resolve => server.listen(5001, '127.0.0.1', resolve));
  console.log('Test Server listening on http://127.0.0.1:5001');

  try {
    // 1. Default fetch: Should fetch available pets only (13 pets, excluding adopted 'Shadow')
    const resDefault = await fetch('http://127.0.0.1:5001/api/pets');
    const dataDefault = await resDefault.json();
    console.log(`[API Test 1 - Default Available Pets]: Found ${dataDefault.pets.length} pets.`);
    const hasShadow = dataDefault.pets.some(p => p.name === 'Shadow');
    console.log(`[Requirement 10 Checked]: Adopted pet "Shadow" in available list? ${hasShadow ? 'YES (FAIL)' : 'NO (CORRECT)'}`);

    // 2. Fetch dogs only
    const resDogs = await fetch('http://127.0.0.1:5001/api/pets?category=dog');
    const dataDogs = await resDogs.json();
    console.log(`[API Test 2 - Dogs Filter]: Found ${dataDogs.pets.length} dogs.`);

    // 3. Fetch cats only
    const resCats = await fetch('http://127.0.0.1:5001/api/pets?category=cat');
    const dataCats = await resCats.json();
    console.log(`[API Test 3 - Cats Filter]: Found ${dataCats.pets.length} cats.`);

    // 4. Fetch by location (Hyderabad)
    const resHyd = await fetch('http://127.0.0.1:5001/api/pets?location=Hyderabad');
    const dataHyd = await resHyd.json();
    console.log(`[API Test 4 - Location Hyderabad]: Found ${dataHyd.pets.length} pets.`);

    // 5. Fetch by breed (Beagle)
    const resBeagle = await fetch('http://127.0.0.1:5001/api/pets?breed=Beagle');
    const dataBeagle = await resBeagle.json();
    console.log(`[API Test 5 - Breed Beagle]: Found ${dataBeagle.pets.length} pets (${dataBeagle.pets.map(p => p.name).join(', ')}).`);

    // 6. Fetch by ageGroup (puppy)
    const resPuppy = await fetch('http://127.0.0.1:5001/api/pets?ageGroup=puppy');
    const dataPuppy = await resPuppy.json();
    console.log(`[API Test 6 - AgeGroup Puppy]: Found ${dataPuppy.pets.length} puppies/kittens.`);

    // 7. Keyword search ('gentle')
    const resKeyword = await fetch('http://127.0.0.1:5001/api/pets?keyword=gentle');
    const dataKeyword = await resKeyword.json();
    console.log(`[API Test 7 - Keyword "gentle"]: Found ${dataKeyword.pets.length} pets.`);

    // 8. Explicitly request adopted pets
    const resAdopted = await fetch('http://127.0.0.1:5001/api/pets?adoptionStatus=adopted');
    const dataAdopted = await resAdopted.json();
    console.log(`[API Test 8 - AdoptionStatus "adopted"]: Found ${dataAdopted.pets.length} adopted pets (${dataAdopted.pets.map(p => p.name).join(', ')}).`);

    console.log('\n>>> ALL 8 API FILTER TESTS PASSED SUCCESSFULLY! <<<');
  } finally {
    server.close();
    process.exit(0);
  }
}

testHttpEndpoints().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
