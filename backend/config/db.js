import mongoose from 'mongoose';
import { Pet } from '../models/Pet.js';
import { User } from '../models/User.js';
import { AdoptionApplication } from '../models/AdoptionApplication.js';
import { CareReminder } from '../models/CareReminder.js';
import { LostPet } from '../models/LostPet.js';
import { initialUsers, initialPets, initialApplications, initialCareReminders, initialLostPets } from '../data/initialData.js';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/petlove';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000
    });
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}/${conn.connection.name}`);

    // Check if pet collection is empty or has fewer than 12 pets, and seed if needed
    await seedDatabaseIfNeeded();

    return true;
  } catch (error) {
    console.log(`[MongoDB] Connection error or offline (${error.message}). Running with persistent smart store.`);
    return false;
  }
};

export const seedDatabaseIfNeeded = async () => {
  try {
    if (mongoose.connection.readyState !== 1) return;

    const petCount = await Pet.countDocuments();
    console.log(`[MongoDB] Current pet records in database: ${petCount}`);

    if (petCount < 12) {
      console.log(`[MongoDB] Seeding database with realistic sample pet profiles...`);
      // Clean and seed pets
      await Pet.deleteMany({});
      for (const petData of initialPets) {
        await Pet.create(petData);
      }
      console.log(`[MongoDB] Successfully seeded ${initialPets.length} pets into MongoDB!`);
    }

    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log(`[MongoDB] Seeding users...`);
      for (const userData of initialUsers) {
        await User.create(userData);
      }
      console.log(`[MongoDB] Successfully seeded users!`);
    }

    const appCount = await AdoptionApplication.countDocuments();
    if (appCount === 0) {
      for (const appData of initialApplications) {
        await AdoptionApplication.create(appData);
      }
    }

    const remCount = await CareReminder.countDocuments();
    if (remCount === 0) {
      for (const remData of initialCareReminders) {
        await CareReminder.create(remData);
      }
    }

    const lostCount = await LostPet.countDocuments();
    if (lostCount === 0) {
      for (const lostData of initialLostPets) {
        await LostPet.create(lostData);
      }
    }
  } catch (err) {
    console.error('[MongoDB] Error during database seeding:', err.message);
  }
};
