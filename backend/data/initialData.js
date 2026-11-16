export const initialUsers = [
  {
    _id: "user_adopter_1",
    name: "Suresh Kumar",
    email: "adopter@petlove.com",
    password: "$2a$10$wT0X7Vf6gZ1uJq9p2y8K0uQ7bL3p0X8q4m5n6o7p8q9r0s1t2u3v4", // Demo password: password123
    role: "adopter",
    phone: "+91 98765 43210",
    address: "Banjara Hills, Hyderabad, Telangana",
    verificationStatus: "verified",
    verificationDocuments: {
      govtIdType: "Aadhaar Card",
      govtIdUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80",
      addressProofUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
      submittedAt: "2025-01-15T10:00:00Z",
      reviewedAt: "2025-01-16T14:30:00Z"
    },
    createdAt: "2025-01-10T09:00:00Z"
  },
  {
    _id: "user_adopter_2",
    name: "Ananya Sharma",
    email: "ananya@petlove.com",
    password: "$2a$10$wT0X7Vf6gZ1uJq9p2y8K0uQ7bL3p0X8q4m5n6o7p8q9r0s1t2u3v4", // Demo password: password123
    role: "adopter",
    phone: "+91 98450 12345",
    address: "Madhapur, Hyderabad, Telangana",
    verificationStatus: "pending",
    verificationDocuments: {
      govtIdType: "Passport",
      govtIdUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80",
      submittedAt: "2025-02-01T11:20:00Z"
    },
    createdAt: "2025-02-01T11:00:00Z"
  },
  {
    _id: "user_ngo_1",
    name: "Paws & Hope Animal Shelter",
    email: "ngo@petlove.com",
    password: "$2a$10$wT0X7Vf6gZ1uJq9p2y8K0uQ7bL3p0X8q4m5n6o7p8q9r0s1t2u3v4", // Demo password: password123
    role: "ngo",
    phone: "+91 94401 23456",
    address: "Jubilee Hills, Hyderabad, Telangana",
    ngoDetails: {
      organizationName: "Paws & Hope Foundation",
      registrationNumber: "TS/HYD/NGO/2021/8892",
      website: "https://pawshope.org",
      description: "Dedicated to rescue, medical rehabilitation, and loving adoptions for abandoned animals across Telangana.",
      verified: true
    },
    createdAt: "2024-11-01T10:00:00Z"
  },
  {
    _id: "user_admin_1",
    name: "Pet Love Administrator",
    email: "admin@petlove.com",
    password: "$2a$10$wT0X7Vf6gZ1uJq9p2y8K0uQ7bL3p0X8q4m5n6o7p8q9r0s1t2u3v4", // Demo password: password123
    role: "admin",
    phone: "+91 90000 00001",
    address: "Hitec City, Hyderabad",
    createdAt: "2024-01-01T00:00:00Z"
  }
];

export const initialPets = [
  {
    _id: "pet_1",
    name: "Bella & Milo",
    category: "dog",
    breed: "Golden Retriever & Tabby",
    age: "1.5 Years & 8 Months",
    ageGroup: "young",
    gender: "female",
    size: "medium",
    location: "Hyderabad, Telangana",
    healthStatus: "healthy",
    vaccinated: true,
    spayedNeutered: true,
    ngoVerified: true,
    adoptionStatus: "available",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Bella (Golden Retriever) and Milo (Tabby Kitten) were rescued together and share an unbreakable bond. They sleep, play, and eat side by side. Perfect for a family seeking double happiness!",
    personality: ["Bonded Pair", "Extremely Friendly", "Kid-Loving", "House Trained", "Gentle"],
    activityLevel: "moderate",
    diet: "High protein kibble twice daily for Bella; Royal Canin Kitten dry + wet mix for Milo.",
    medicalHistory: "Fully checked by senior vet Dr. Ramesh. No chronic illnesses or allergies detected.",
    vaccinationRecords: [
      {
        vaccineName: "DHPP (7-in-1)",
        dateAdministered: "2024-10-15",
        validUntil: "2025-10-15",
        vetName: "Dr. Ramesh Varma, Hyderabad Pet Clinic",
        batchNumber: "VAC-DHPP-8821"
      },
      {
        vaccineName: "Rabies Vaccine",
        dateAdministered: "2024-11-01",
        validUntil: "2025-11-01",
        vetName: "Dr. Ramesh Varma, Hyderabad Pet Clinic",
        batchNumber: "VAC-RAB-9943"
      }
    ],
    dewormingRecords: [
      {
        medicine: "Drontal Plus",
        dateAdministered: "2024-12-01",
        nextDueDate: "2025-03-01"
      }
    ],
    vetInfo: {
      clinicName: "Hyderabad Care Pet Hospital",
      doctorName: "Dr. Ramesh Varma, BVSc & AH",
      contact: "+91 94401 99882"
    },
    microchipId: "985141002348912",
    ngoId: "user_ngo_1",
    ngoName: "Paws & Hope Animal Shelter",
    createdAt: "2025-01-05T12:00:00Z"
  },
  {
    _id: "pet_2",
    name: "Rocky",
    category: "dog",
    breed: "Beagle",
    age: "2 Years",
    ageGroup: "young",
    gender: "male",
    size: "medium",
    location: "Bengaluru, Karnataka",
    healthStatus: "healthy",
    vaccinated: true,
    spayedNeutered: true,
    ngoVerified: true,
    adoptionStatus: "available",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Rocky is an energetic, super cheerful Beagle boy who loves brisk morning walks and scent games. He is friendly with other dogs and quick to learn tricks.",
    personality: ["Playful", "Curious", "Social with Dogs", "High Energy"],
    activityLevel: "high",
    diet: "Pedigree Pro active dog food, boiled chicken treats for training.",
    medicalHistory: "Ear checkup clear, joints healthy, standard dental scaling completed in Nov 2024.",
    vaccinationRecords: [
      {
        vaccineName: "DHPP Booster",
        dateAdministered: "2024-09-12",
        validUntil: "2025-09-12",
        vetName: "Dr. Anita Rao, Bangalore Vet Clinic",
        batchNumber: "BGL-VAC-3312"
      },
      {
        vaccineName: "Anti-Rabies",
        dateAdministered: "2024-09-12",
        validUntil: "2025-09-12",
        vetName: "Dr. Anita Rao, Bangalore Vet Clinic",
        batchNumber: "BGL-RAB-7721"
      }
    ],
    dewormingRecords: [
      {
        medicine: "Wormstop Tablets",
        dateAdministered: "2024-11-15",
        nextDueDate: "2025-02-15"
      }
    ],
    vetInfo: {
      clinicName: "Indiranagar Veterinary Hospital",
      doctorName: "Dr. Anita Rao",
      contact: "+91 98800 11223"
    },
    microchipId: "985141004455667",
    ngoId: "user_ngo_1",
    ngoName: "Paws & Hope Animal Shelter",
    createdAt: "2025-01-08T10:00:00Z"
  },
  {
    _id: "pet_3",
    name: "Luna",
    category: "cat",
    breed: "Persian Mix",
    age: "1 Year",
    ageGroup: "young",
    gender: "female",
    size: "small",
    location: "Visakhapatnam, Andhra Pradesh",
    healthStatus: "healthy",
    vaccinated: true,
    spayedNeutered: true,
    ngoVerified: true,
    adoptionStatus: "available",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Luna is a graceful, purr-machine who loves sunbathing by the window and curling up in warm laps. Gentle with quiet children and loves head scratches.",
    personality: ["Calm", "Affectionate", "Lap Cat", "Quiet", "Indoor Only"],
    activityLevel: "low",
    diet: "Royal Canin Indoor Persian dry kibble and salmon pate wet food.",
    medicalHistory: "Regular coat grooming required. Healthy kidneys and clear eyes.",
    vaccinationRecords: [
      {
        vaccineName: "Tricat Trio (FVRCP)",
        dateAdministered: "2024-08-20",
        validUntil: "2025-08-20",
        vetName: "Dr. Srinivas, Vizag Pet Center",
        batchNumber: "VZ-CAT-1109"
      },
      {
        vaccineName: "Rabies",
        dateAdministered: "2024-08-20",
        validUntil: "2025-08-20",
        vetName: "Dr. Srinivas, Vizag Pet Center",
        batchNumber: "VZ-RAB-4402"
      }
    ],
    dewormingRecords: [
      {
        medicine: "Broadline Spot-on",
        dateAdministered: "2024-11-20",
        nextDueDate: "2025-02-20"
      }
    ],
    vetInfo: {
      clinicName: "Vizag Feline Clinic",
      doctorName: "Dr. K. Srinivas",
      contact: "+91 89125 54433"
    },
    microchipId: "985141007788990",
    ngoId: "user_ngo_1",
    ngoName: "Paws & Hope Animal Shelter",
    createdAt: "2025-01-12T14:00:00Z"
  },
  {
    _id: "pet_4",
    name: "Charlie",
    category: "dog",
    breed: "Indie / Desi Dog",
    age: "4 Months",
    ageGroup: "puppy",
    gender: "male",
    size: "small",
    location: "Hyderabad, Telangana",
    healthStatus: "healthy",
    vaccinated: true,
    spayedNeutered: false,
    ngoVerified: true,
    adoptionStatus: "available",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Charlie is a sweet, resilient Indian Pariah puppy rescued from a rainy street corner. Very intelligent, highly adaptable, and already knows basic potty training!",
    personality: ["Intelligent", "Playful", "Quick Learner", "Loyal", "Great Guard Dog"],
    activityLevel: "moderate",
    diet: "Puppy starter kibble with warm broth and curd rice.",
    medicalHistory: "Dewormed twice, vaccinated with 1st puppy booster. Spay/neuter required at 6 months (voucher provided by NGO).",
    vaccinationRecords: [
      {
        vaccineName: "DHPP Puppy Dose 1",
        dateAdministered: "2024-12-10",
        validUntil: "2025-01-10",
        vetName: "Dr. Ramesh Varma",
        batchNumber: "VAC-PUP-091"
      }
    ],
    dewormingRecords: [
      {
        medicine: "Kiwof Puppy Syrup",
        dateAdministered: "2024-12-05",
        nextDueDate: "2025-01-05"
      }
    ],
    vetInfo: {
      clinicName: "Hyderabad Care Pet Hospital",
      doctorName: "Dr. Ramesh Varma",
      contact: "+91 94401 99882"
    },
    microchipId: "985141001122334",
    ngoId: "user_ngo_1",
    ngoName: "Paws & Hope Animal Shelter",
    createdAt: "2025-01-15T08:00:00Z"
  },
  {
    _id: "pet_5",
    name: "Simba",
    category: "cat",
    breed: "Ginger Tabby",
    age: "5 Months",
    ageGroup: "puppy",
    gender: "male",
    size: "small",
    location: "Vijayawada, Andhra Pradesh",
    healthStatus: "healthy",
    vaccinated: true,
    spayedNeutered: true,
    ngoVerified: true,
    adoptionStatus: "available",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1561948955-570b270e7c36?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Simba is a spunky ginger kitten who loves chasing feathered toys and laser dots. He gets along wonderfully with other cats and loves making friends.",
    personality: ["Playful", "Inquisitive", "Social", "Litter Trained"],
    activityLevel: "high",
    diet: "Whiskas Junior Ocean Fish kitten food + fresh boiled fish.",
    medicalHistory: "Clean checkup, clear eyes and ears. Spayed and vaccinated.",
    vaccinationRecords: [
      {
        vaccineName: "FVRCP 2nd Dose",
        dateAdministered: "2024-11-28",
        validUntil: "2025-11-28",
        vetName: "Dr. Prasad, Vijayawada Vet Care",
        batchNumber: "VJA-KIT-991"
      }
    ],
    dewormingRecords: [
      {
        medicine: "Prazisam Dewormer",
        dateAdministered: "2024-11-20",
        nextDueDate: "2025-02-20"
      }
    ],
    vetInfo: {
      clinicName: "Vijayawada Animal Care",
      doctorName: "Dr. N. Prasad",
      contact: "+91 86624 33221"
    },
    microchipId: "985141005544332",
    ngoId: "user_ngo_1",
    ngoName: "Paws & Hope Animal Shelter",
    createdAt: "2025-01-18T11:00:00Z"
  },
  {
    _id: "pet_6",
    name: "Max",
    category: "dog",
    breed: "Labrador Retriever",
    age: "3 Years",
    ageGroup: "adult",
    gender: "male",
    size: "large",
    location: "Hyderabad, Telangana",
    healthStatus: "healthy",
    vaccinated: true,
    spayedNeutered: true,
    ngoVerified: true,
    adoptionStatus: "available",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1527526029430-319f10814151?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Max is a gentle giant who loves tennis balls, swimming, and cuddle sessions. Excellent leash manners and fully house-trained.",
    personality: ["Gentle Giant", "Affectionate", "Water Lover", "Obedient"],
    activityLevel: "moderate",
    diet: "Royal Canin Labrador adult blend, omega-3 fish oil supplement.",
    medicalHistory: "Hip evaluation healthy, clear ears, full medical passport up to date.",
    vaccinationRecords: [
      {
        vaccineName: "DHPP Annual",
        dateAdministered: "2024-07-14",
        validUntil: "2025-07-14",
        vetName: "Dr. Ramesh Varma",
        batchNumber: "HYD-LAB-776"
      },
      {
        vaccineName: "Rabies Annual",
        dateAdministered: "2024-07-14",
        validUntil: "2025-07-14",
        vetName: "Dr. Ramesh Varma",
        batchNumber: "HYD-RAB-339"
      }
    ],
    dewormingRecords: [
      {
        medicine: "Bayer Drontal Plus",
        dateAdministered: "2024-10-15",
        nextDueDate: "2025-01-15"
      }
    ],
    vetInfo: {
      clinicName: "Hyderabad Care Pet Hospital",
      doctorName: "Dr. Ramesh Varma",
      contact: "+91 94401 99882"
    },
    microchipId: "985141009900112",
    ngoId: "user_ngo_1",
    ngoName: "Paws & Hope Animal Shelter",
    createdAt: "2025-01-20T16:00:00Z"
  },
  {
    _id: "pet_7",
    name: "Daisy",
    category: "dog",
    breed: "Shih Tzu",
    age: "5 Years",
    ageGroup: "adult",
    gender: "female",
    size: "small",
    location: "Chennai, Tamil Nadu",
    healthStatus: "healthy",
    vaccinated: true,
    spayedNeutered: true,
    ngoVerified: true,
    adoptionStatus: "available",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Daisy is a calm, charming apartment companion who enjoys peaceful strolls and watching television with her humans. Hypoallergenic coat.",
    personality: ["Calm", "Low Energy", "Great Apartment Dog", "Loving"],
    activityLevel: "low",
    diet: "Small-breed kibble with steamed veggies.",
    medicalHistory: "Dental cleaning completed Sept 2024. Clear eyesight and knees.",
    vaccinationRecords: [
      {
        vaccineName: "DHPP Multi",
        dateAdministered: "2024-06-18",
        validUntil: "2025-06-18",
        vetName: "Dr. K. Swaminathan, Chennai Vet",
        batchNumber: "CHN-SHIH-442"
      }
    ],
    dewormingRecords: [
      {
        medicine: "Caniverm",
        dateAdministered: "2024-09-15",
        nextDueDate: "2024-12-15"
      }
    ],
    vetInfo: {
      clinicName: "Adyar Animal Hospital",
      doctorName: "Dr. K. Swaminathan",
      contact: "+91 44244 55667"
    },
    microchipId: "985141006677889",
    ngoId: "user_ngo_1",
    ngoName: "Paws & Hope Animal Shelter",
    createdAt: "2025-01-22T09:00:00Z"
  },
  {
    _id: "pet_8",
    name: "Bruno",
    category: "dog",
    breed: "German Shepherd",
    age: "7 Years",
    ageGroup: "senior",
    gender: "male",
    size: "large",
    location: "Hyderabad, Telangana",
    healthStatus: "special_needs",
    vaccinated: true,
    spayedNeutered: true,
    ngoVerified: true,
    adoptionStatus: "available",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Bruno is a wise, loyal senior looking for a cozy retirement home. He has mild arthritis managed with daily glucosamine supplements. In return, he will give endless loyalty.",
    personality: ["Gentle", "Protective", "Calm", "Senior Soul", "Devoted"],
    activityLevel: "low",
    diet: "Senior dog food with glucosamine and chondroitin.",
    medicalHistory: "Mild arthritis in rear hips, receives Synoquin joint supplement daily. Heart and blood panels healthy.",
    vaccinationRecords: [
      {
        vaccineName: "DHPP + Rabies Combined",
        dateAdministered: "2024-05-10",
        validUntil: "2025-05-10",
        vetName: "Dr. Ramesh Varma",
        batchNumber: "HYD-SR-102"
      }
    ],
    dewormingRecords: [
      {
        medicine: "Drontal Plus",
        dateAdministered: "2024-11-01",
        nextDueDate: "2025-02-01"
      }
    ],
    vetInfo: {
      clinicName: "Hyderabad Care Pet Hospital",
      doctorName: "Dr. Ramesh Varma",
      contact: "+91 94401 99882"
    },
    microchipId: "985141001239874",
    ngoId: "user_ngo_1",
    ngoName: "Paws & Hope Animal Shelter",
    createdAt: "2025-01-25T15:00:00Z"
  },
  {
    _id: "pet_9",
    name: "Milo & Oscar",
    category: "cat",
    breed: "British Shorthair Mix",
    age: "2 Years",
    ageGroup: "young",
    gender: "male",
    size: "medium",
    location: "Bengaluru, Karnataka",
    healthStatus: "healthy",
    vaccinated: true,
    spayedNeutered: true,
    ngoVerified: true,
    adoptionStatus: "available",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Milo is a plush grey shorthair with striking copper eyes. He is extremely polite, litter-box trained, and enjoys sitting quietly beside you while you work.",
    personality: ["Independent", "Gentle", "Quiet", "Work Companion"],
    activityLevel: "low",
    diet: "Grain-free salmon kibble and tuna feast broth.",
    medicalHistory: "Clean blood panel, vaccinated against feline leukemia, dental health pristine.",
    vaccinationRecords: [
      {
        vaccineName: "FVRCP Annual Booster",
        dateAdministered: "2024-10-05",
        validUntil: "2025-10-05",
        vetName: "Dr. Anita Rao, Bangalore Vet Clinic",
        batchNumber: "BGL-FVR-881"
      },
      {
        vaccineName: "Rabies Booster",
        dateAdministered: "2024-10-05",
        validUntil: "2025-10-05",
        vetName: "Dr. Anita Rao",
        batchNumber: "BGL-RAB-441"
      }
    ],
    dewormingRecords: [
      {
        medicine: "Broadline Spot-on",
        dateAdministered: "2024-11-10",
        nextDueDate: "2025-02-10"
      }
    ],
    vetInfo: {
      clinicName: "Indiranagar Veterinary Hospital",
      doctorName: "Dr. Anita Rao",
      contact: "+91 98800 11223"
    },
    microchipId: "985141009876543",
    ngoId: "user_ngo_1",
    ngoName: "Paws & Hope Animal Shelter",
    createdAt: "2025-02-01T10:00:00Z"
  },
  {
    _id: "pet_10",
    name: "Koko",
    category: "dog",
    breed: "Cocker Spaniel",
    age: "3 Years",
    ageGroup: "adult",
    gender: "female",
    size: "medium",
    location: "Visakhapatnam, Andhra Pradesh",
    healthStatus: "healthy",
    vaccinated: true,
    spayedNeutered: true,
    ngoVerified: true,
    adoptionStatus: "available",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Koko has luxurious golden curls and big soulful eyes. She loves beach walks, playing fetch with squeaky toys, and is wonderfully trained with children.",
    personality: ["Loving", "Playful", "Family Companion", "Obedient"],
    activityLevel: "moderate",
    diet: "Fresh boiled chicken breast with carrots and premium dry dog food.",
    medicalHistory: "Ear cleaning done monthly. Healthy heart and clear vision.",
    vaccinationRecords: [
      {
        vaccineName: "DHPP 7-in-1",
        dateAdministered: "2024-11-12",
        validUntil: "2025-11-12",
        vetName: "Dr. K. Srinivas",
        batchNumber: "VZ-COCKER-112"
      }
    ],
    dewormingRecords: [
      {
        medicine: "Drontal Plus",
        dateAdministered: "2024-12-01",
        nextDueDate: "2025-03-01"
      }
    ],
    vetInfo: {
      clinicName: "Vizag Pet Center",
      doctorName: "Dr. K. Srinivas",
      contact: "+91 89125 54433"
    },
    microchipId: "985141003456789",
    ngoId: "user_ngo_1",
    ngoName: "Paws & Hope Animal Shelter",
    createdAt: "2025-02-02T14:30:00Z"
  },
  {
    _id: "pet_11",
    name: "Leo",
    category: "dog",
    breed: "Indie / Desi Dog",
    age: "1 Year",
    ageGroup: "young",
    gender: "male",
    size: "medium",
    location: "Hyderabad, Telangana",
    healthStatus: "healthy",
    vaccinated: true,
    spayedNeutered: true,
    ngoVerified: true,
    adoptionStatus: "available",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Leo is a cheerful golden-coated Indie who loves to run, play tag, and make everyone smile. Strong immune system, high intelligence, and deeply affectionate.",
    personality: ["Alert", "Loyal", "Agile", "Low Maintenance", "Loving"],
    activityLevel: "moderate",
    diet: "Home-cooked rice with boiled chicken and veggies, plus high-fiber kibble.",
    medicalHistory: "Fully dewormed, annual rabies booster up to date. Excellent stamina.",
    vaccinationRecords: [
      {
        vaccineName: "DHPP Complete",
        dateAdministered: "2024-10-22",
        validUntil: "2025-10-22",
        vetName: "Dr. Ramesh Varma",
        batchNumber: "HYD-IND-901"
      },
      {
        vaccineName: "Rabies Anti-Viral",
        dateAdministered: "2024-10-22",
        validUntil: "2025-10-22",
        vetName: "Dr. Ramesh Varma",
        batchNumber: "HYD-RAB-108"
      }
    ],
    dewormingRecords: [
      {
        medicine: "Kiwof Plus",
        dateAdministered: "2024-11-20",
        nextDueDate: "2025-02-20"
      }
    ],
    vetInfo: {
      clinicName: "Hyderabad Care Pet Hospital",
      doctorName: "Dr. Ramesh Varma",
      contact: "+91 94401 99882"
    },
    microchipId: "985141006543210",
    ngoId: "user_ngo_1",
    ngoName: "Paws & Hope Animal Shelter",
    createdAt: "2025-02-04T08:00:00Z"
  },
  {
    _id: "pet_12",
    name: "Cleo",
    category: "cat",
    breed: "Siamese Mix",
    age: "1.5 Years",
    ageGroup: "young",
    gender: "female",
    size: "small",
    location: "Vijayawada, Andhra Pradesh",
    healthStatus: "healthy",
    vaccinated: true,
    spayedNeutered: true,
    ngoVerified: true,
    adoptionStatus: "available",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1513360309081-38f0762b41ab?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Cleo is a stunning Siamese mix with deep sapphire blue eyes and point coloring. She is vocal, expressive, and loves greeting you at the doorway.",
    personality: ["Vocal", "Affectionate", "Curious", "Playful"],
    activityLevel: "moderate",
    diet: "Hill's Science Diet Indoor Adult Cat food.",
    medicalHistory: "Sterilized in August 2024. All vaccinations active and verified.",
    vaccinationRecords: [
      {
        vaccineName: "FVRCP Trio",
        dateAdministered: "2024-08-15",
        validUntil: "2025-08-15",
        vetName: "Dr. N. Prasad",
        batchNumber: "VJA-SIA-332"
      }
    ],
    dewormingRecords: [
      {
        medicine: "Prazisam",
        dateAdministered: "2024-11-15",
        nextDueDate: "2025-02-15"
      }
    ],
    vetInfo: {
      clinicName: "Vijayawada Animal Care",
      doctorName: "Dr. N. Prasad",
      contact: "+91 86624 33221"
    },
    microchipId: "985141007654321",
    ngoId: "user_ngo_1",
    ngoName: "Paws & Hope Animal Shelter",
    createdAt: "2025-02-05T11:00:00Z"
  },
  {
    _id: "pet_13",
    name: "Tommy",
    category: "dog",
    breed: "Pomeranian",
    age: "8 Months",
    ageGroup: "puppy",
    gender: "male",
    size: "small",
    location: "Chennai, Tamil Nadu",
    healthStatus: "healthy",
    vaccinated: true,
    spayedNeutered: false,
    ngoVerified: true,
    adoptionStatus: "available",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Tommy is a fluffy white bundle of endless enthusiasm. Loves hopping around, playing with tennis balls, and taking naps in cozy blanket baskets.",
    personality: ["Enthusiastic", "Vibrant", "Cuddle Bug", "Great Watch Dog"],
    activityLevel: "moderate",
    diet: "Small breed puppy kibble with chicken broth.",
    medicalHistory: "Puppy booster shots complete. Spay/neuter appointment booked for month 10.",
    vaccinationRecords: [
      {
        vaccineName: "DHPP Puppy Primary",
        dateAdministered: "2024-11-01",
        validUntil: "2025-05-01",
        vetName: "Dr. K. Swaminathan",
        batchNumber: "CHN-POM-221"
      }
    ],
    dewormingRecords: [
      {
        medicine: "Kiwof Puppy Syrup",
        dateAdministered: "2024-11-01",
        nextDueDate: "2025-01-01"
      }
    ],
    vetInfo: {
      clinicName: "Adyar Animal Hospital",
      doctorName: "Dr. K. Swaminathan",
      contact: "+91 44244 55667"
    },
    microchipId: "985141008765432",
    ngoId: "user_ngo_1",
    ngoName: "Paws & Hope Animal Shelter",
    createdAt: "2025-02-06T15:00:00Z"
  },
  {
    _id: "pet_14",
    name: "Shadow",
    category: "dog",
    breed: "Labrador Mix",
    age: "4 Years",
    ageGroup: "adult",
    gender: "male",
    size: "large",
    location: "Hyderabad, Telangana",
    healthStatus: "healthy",
    vaccinated: true,
    spayedNeutered: true,
    ngoVerified: true,
    adoptionStatus: "adopted", // Already adopted sample to test requirement 10!
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Shadow has found his forever home with an amazing family in Hyderabad! He is loving his daily runs in the garden.",
    personality: ["Gentle", "Protective", "Trained", "Devoted"],
    activityLevel: "moderate",
    diet: "Royal Canin Adult Blend.",
    medicalHistory: "Full lifetime vaccination completed.",
    vaccinationRecords: [
      {
        vaccineName: "DHPP Annual",
        dateAdministered: "2024-06-10",
        validUntil: "2025-06-10",
        vetName: "Dr. Ramesh Varma",
        batchNumber: "HYD-LAB-554"
      }
    ],
    dewormingRecords: [],
    vetInfo: {
      clinicName: "Hyderabad Care Pet Hospital",
      doctorName: "Dr. Ramesh Varma",
      contact: "+91 94401 99882"
    },
    microchipId: "985141009988776",
    ngoId: "user_ngo_1",
    ngoName: "Paws & Hope Animal Shelter",
    createdAt: "2024-12-01T10:00:00Z"
  }
];

export const initialApplications = [
  {
    _id: "app_1",
    petId: "pet_14",
    petName: "Shadow",
    petImage: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1000&q=80",
    adopterId: "user_adopter_1",
    adopterName: "Suresh Kumar",
    adopterEmail: "adopter@petlove.com",
    adopterPhone: "+91 98765 43210",
    status: "approved",
    certificateNumber: "CERT-PETLOVE-991823",
    adoptionDate: "2025-01-20T10:00:00Z",
    formData: {
      fullName: "Suresh Kumar",
      age: "32",
      phone: "+91 98765 43210",
      email: "adopter@petlove.com",
      address: "Banjara Hills, Hyderabad",
      occupation: "Software Engineering Manager",
      residenceType: "Independent House",
      hasFencedYard: "Yes",
      familyMembersCount: "4",
      allFamilyAgreed: "Yes",
      otherPets: "None",
      petExperience: "Experienced",
      hoursPetAloneDaily: "1-2 hours",
      carePlan: "Daily walks and loving care.",
      reasonForAdoption: "We fell in love with Shadow and wanted to give him a permanent forever home."
    },
    reviewNotes: "Application approved after successful home check and document verification.",
    timeline: [
      { stage: "submitted", timestamp: "2025-01-10T10:30:00Z", note: "Application submitted online" },
      { stage: "approved", timestamp: "2025-01-20T10:00:00Z", note: "Approved and certificate issued" }
    ],
    createdAt: "2025-01-10T10:30:00Z",
    updatedAt: "2025-01-20T10:00:00Z"
  }
];

export const initialCareReminders = [
  {
    _id: "rem_1",
    petId: "pet_1",
    adopterId: "user_adopter_1",
    title: "Bella & Milo - Rabies Vaccine Booster",
    type: "vaccination",
    dueDate: "2025-11-01",
    time: "10:30 AM",
    frequency: "yearly",
    status: "pending",
    notes: "Annual booster due at Hyderabad Care Pet Hospital with Dr. Ramesh."
  },
  {
    _id: "rem_2",
    petId: "pet_1",
    adopterId: "user_adopter_1",
    title: "Quarterly Deworming (Drontal Plus)",
    type: "deworming",
    dueDate: "2025-03-01",
    time: "09:00 AM",
    frequency: "monthly",
    status: "pending",
    notes: "Give 1 tablet per 10kg body weight with morning meal."
  },
  {
    _id: "rem_3",
    petId: "pet_1",
    adopterId: "user_adopter_1",
    title: "Grooming & Coat Brushing Session",
    type: "grooming",
    dueDate: "2025-02-15",
    time: "04:00 PM",
    frequency: "weekly",
    status: "completed",
    completedAt: "2025-02-15T16:30:00Z",
    notes: "Bath, nail trim, and deshedding session completed."
  }
];

export const initialLostPets = [
  {
    _id: "lost_1",
    type: "lost",
    title: "Missing Beagle pup named Oliver",
    category: "dog",
    breed: "Beagle",
    color: "Tricolor (White, Brown, Black)",
    location: "Kondapur, near Botanical Garden, Hyderabad",
    date: "2025-02-05",
    contactName: "Pooja Reddy",
    contactPhone: "+91 99887 66554",
    reward: "₹10,000 Reward",
    image: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=800&q=80",
    description: "Wearing a red collar with a silver bell. Oliver is very friendly but may be scared. Please call immediately if spotted!",
    status: "active",
    createdAt: "2025-02-05T18:00:00Z"
  },
  {
    _id: "lost_2",
    type: "found",
    title: "Found Golden Indie Kitten with White Paws",
    category: "cat",
    breed: "Indie / Domestic Shorthair",
    color: "Ginger with White Chest",
    location: "Gachibowli Outer Ring Road, Hyderabad",
    date: "2025-02-08",
    contactName: "Karthik Varma",
    contactPhone: "+91 98480 33445",
    reward: "Safe in temporary foster care",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=800&q=80",
    description: "Found wandering safely near a cafe. Very affectionate and litter trained. Owner please show proof of ownership.",
    status: "active",
    createdAt: "2025-02-08T09:30:00Z"
  }
];
