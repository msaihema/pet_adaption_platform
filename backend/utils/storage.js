import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { initialUsers, initialPets, initialApplications, initialCareReminders, initialLostPets } from '../data/initialData.js';
import { Pet } from '../models/Pet.js';
import { User } from '../models/User.js';
import { AdoptionApplication } from '../models/AdoptionApplication.js';
import { CareReminder } from '../models/CareReminder.js';
import { LostPet } from '../models/LostPet.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '..', 'data', 'db.json');

class DataStore {
  constructor() {
    this.data = {
      users: initialUsers,
      pets: initialPets,
      applications: initialApplications,
      careReminders: initialCareReminders,
      lostPets: initialLostPets
    };
    this.init();
  }

  init() {
    try {
      const dir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        // Ensure at least initial pets exist
        if (!parsed.pets || parsed.pets.length < 12) {
          parsed.pets = initialPets;
        }
        this.data = parsed;
        this.save();
      } else {
        this.data = {
          users: initialUsers,
          pets: initialPets,
          applications: initialApplications,
          careReminders: initialCareReminders,
          lostPets: initialLostPets
        };
        this.save();
      }
    } catch (err) {
      console.error('Error initializing DataStore, using memory fallback:', err);
      this.data = {
        users: initialUsers,
        pets: initialPets,
        applications: initialApplications,
        careReminders: initialCareReminders,
        lostPets: initialLostPets
      };
    }
  }

  async syncFromMongoDB() {
    try {
      if (mongoose.connection.readyState === 1) {
        const mongoPets = await Pet.find().lean();
        if (mongoPets && mongoPets.length > 0) {
          this.data.pets = mongoPets.map(p => ({ ...p, _id: p._id.toString() }));
        }

        const mongoUsers = await User.find().lean();
        if (mongoUsers && mongoUsers.length > 0) {
          this.data.users = mongoUsers.map(u => ({ ...u, _id: u._id.toString() }));
        }

        const mongoApps = await AdoptionApplication.find().lean();
        if (mongoApps && mongoApps.length > 0) {
          this.data.applications = mongoApps.map(a => ({ ...a, _id: a._id.toString() }));
        }

        const mongoRems = await CareReminder.find().lean();
        if (mongoRems && mongoRems.length > 0) {
          this.data.careReminders = mongoRems.map(r => ({ ...r, _id: r._id.toString() }));
        }

        const mongoLost = await LostPet.find().lean();
        if (mongoLost && mongoLost.length > 0) {
          this.data.lostPets = mongoLost.map(l => ({ ...l, _id: l._id.toString() }));
        }

        this.save();
        console.log(`[DataStore] Synchronized from MongoDB: ${this.data.pets.length} pets loaded into active memory.`);
      }
    } catch (err) {
      console.error('[DataStore] Sync from MongoDB error:', err.message);
    }
  }

  save() {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving DataStore to disk:', err);
    }
  }

  // Users
  getUsers() { return this.data.users; }
  getUserById(id) { return this.data.users.find(u => u._id === id || u._id === id?.toString()); }
  getUserByEmail(email) {
    if (!email) return null;
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }
  createUser(user) {
    const newUser = {
      _id: user._id || 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      ...user,
      createdAt: user.createdAt || new Date().toISOString()
    };
    this.data.users.push(newUser);
    this.save();

    // Persist to MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      User.create(newUser).catch(e => console.error('MongoDB User create error:', e.message));
    }
    return newUser;
  }
  updateUser(id, updates) {
    const index = this.data.users.findIndex(u => u._id === id || u._id === id?.toString());
    if (index === -1) return null;
    this.data.users[index] = { ...this.data.users[index], ...updates };
    this.save();

    if (mongoose.connection.readyState === 1) {
      User.updateOne({ $or: [{ _id: id }, { email: this.data.users[index].email }] }, { $set: updates })
        .catch(e => console.error('MongoDB User update error:', e.message));
    }
    return this.data.users[index];
  }

  // Pets
  getPets() { return this.data.pets; }
  getPetById(id) { return this.data.pets.find(p => p._id === id || p._id === id?.toString()); }
  createPet(pet) {
    const newPet = {
      _id: pet._id || 'pet_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      ...pet,
      createdAt: pet.createdAt || new Date().toISOString()
    };
    this.data.pets.unshift(newPet);
    this.save();

    // Persist to MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      Pet.create(newPet).catch(e => console.error('MongoDB Pet create error:', e.message));
    }
    return newPet;
  }
  updatePet(id, updates) {
    const index = this.data.pets.findIndex(p => p._id === id || p._id === id?.toString());
    if (index === -1) return null;
    this.data.pets[index] = { ...this.data.pets[index], ...updates };
    this.save();

    if (mongoose.connection.readyState === 1) {
      Pet.updateOne({ _id: id }, { $set: updates })
        .catch(e => console.error('MongoDB Pet update error:', e.message));
    }
    return this.data.pets[index];
  }
  deletePet(id) {
    const index = this.data.pets.findIndex(p => p._id === id || p._id === id?.toString());
    if (index === -1) return false;
    this.data.pets.splice(index, 1);
    this.save();

    if (mongoose.connection.readyState === 1) {
      Pet.deleteOne({ _id: id }).catch(e => console.error('MongoDB Pet delete error:', e.message));
    }
    return true;
  }

  // Applications
  getApplications() { return this.data.applications; }
  getApplicationById(id) { return this.data.applications.find(a => a._id === id || a._id === id?.toString()); }
  getApplicationsByAdopter(adopterId) {
    return this.data.applications.filter(a => a.adopterId === adopterId || a.adopterId === adopterId?.toString());
  }
  getApplicationsByPet(petId) {
    return this.data.applications.filter(a => a.petId === petId || a.petId === petId?.toString());
  }
  createApplication(app) {
    const newApp = {
      _id: app._id || 'app_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      ...app,
      timeline: app.timeline || [
        { stage: 'submitted', timestamp: new Date().toISOString(), note: 'Application submitted successfully' }
      ],
      createdAt: app.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.data.applications.unshift(newApp);
    this.save();

    if (mongoose.connection.readyState === 1) {
      AdoptionApplication.create(newApp).catch(e => console.error('MongoDB Application create error:', e.message));
    }
    return newApp;
  }
  updateApplication(id, updates) {
    const index = this.data.applications.findIndex(a => a._id === id || a._id === id?.toString());
    if (index === -1) return null;
    this.data.applications[index] = {
      ...this.data.applications[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.save();

    if (mongoose.connection.readyState === 1) {
      AdoptionApplication.updateOne({ _id: id }, { $set: updates })
        .catch(e => console.error('MongoDB Application update error:', e.message));
    }
    return this.data.applications[index];
  }

  // Care Reminders
  getReminders() { return this.data.careReminders; }
  getRemindersByAdopter(adopterId) {
    return this.data.careReminders.filter(r => r.adopterId === adopterId || r.adopterId === adopterId?.toString());
  }
  createReminder(reminder) {
    const newReminder = {
      _id: reminder._id || 'rem_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      ...reminder,
      status: reminder.status || 'pending',
      createdAt: reminder.createdAt || new Date().toISOString()
    };
    this.data.careReminders.unshift(newReminder);
    this.save();

    if (mongoose.connection.readyState === 1) {
      CareReminder.create(newReminder).catch(e => console.error('MongoDB Reminder create error:', e.message));
    }
    return newReminder;
  }
  updateReminder(id, updates) {
    const index = this.data.careReminders.findIndex(r => r._id === id || r._id === id?.toString());
    if (index === -1) return null;
    this.data.careReminders[index] = { ...this.data.careReminders[index], ...updates };
    this.save();

    if (mongoose.connection.readyState === 1) {
      CareReminder.updateOne({ _id: id }, { $set: updates })
        .catch(e => console.error('MongoDB Reminder update error:', e.message));
    }
    return this.data.careReminders[index];
  }
  deleteReminder(id) {
    const index = this.data.careReminders.findIndex(r => r._id === id || r._id === id?.toString());
    if (index === -1) return false;
    this.data.careReminders.splice(index, 1);
    this.save();

    if (mongoose.connection.readyState === 1) {
      CareReminder.deleteOne({ _id: id }).catch(e => console.error('MongoDB Reminder delete error:', e.message));
    }
    return true;
  }

  // Lost & Found
  getLostPets() { return this.data.lostPets; }
  createLostPet(item) {
    const newItem = {
      _id: item._id || 'lost_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      ...item,
      status: item.status || 'active',
      createdAt: item.createdAt || new Date().toISOString()
    };
    this.data.lostPets.unshift(newItem);
    this.save();

    if (mongoose.connection.readyState === 1) {
      LostPet.create(newItem).catch(e => console.error('MongoDB LostPet create error:', e.message));
    }
    return newItem;
  }
  updateLostPet(id, updates) {
    const index = this.data.lostPets.findIndex(item => item._id === id || item._id === id?.toString());
    if (index === -1) return null;
    this.data.lostPets[index] = { ...this.data.lostPets[index], ...updates };
    this.save();

    if (mongoose.connection.readyState === 1) {
      LostPet.updateOne({ _id: id }, { $set: updates })
        .catch(e => console.error('MongoDB LostPet update error:', e.message));
    }
    return this.data.lostPets[index];
  }

  async resetToDefault() {
    this.data = {
      users: JSON.parse(JSON.stringify(initialUsers)),
      pets: JSON.parse(JSON.stringify(initialPets)),
      applications: JSON.parse(JSON.stringify(initialApplications)),
      careReminders: JSON.parse(JSON.stringify(initialCareReminders)),
      lostPets: JSON.parse(JSON.stringify(initialLostPets))
    };
    this.save();

    if (mongoose.connection.readyState === 1) {
      try {
        await Pet.deleteMany({});
        await Pet.insertMany(initialPets);
        await User.deleteMany({});
        await User.insertMany(initialUsers);
        await AdoptionApplication.deleteMany({});
        await AdoptionApplication.insertMany(initialApplications);
        await CareReminder.deleteMany({});
        await CareReminder.insertMany(initialCareReminders);
        await LostPet.deleteMany({});
        await LostPet.insertMany(initialLostPets);
      } catch (err) {
        console.error('MongoDB reset error:', err.message);
      }
    }

    return this.data;
  }
}

export const store = new DataStore();
