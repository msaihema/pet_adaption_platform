# Pet Love – Pet Adoption & Care Platform 🐾

> **"Find Love. Adopt Happiness."**

A modern, responsive, bilingual (English & Telugu) full-stack pet adoption and post-adoption care platform designed with a soft lavender theme, modern rounded container cards, digital pet health passports, and verified shelter workflows.

---

## 🎨 Design Theme & Color Palette

- **Primary Color:** Soft Lavender (`#A678D6`)
- **Secondary Color:** Light Lavender (`#C8A5EA`)
- **Background:** White (`#FFFFFF`)
- **Section Background:** Very Light Lavender (`#F8F4FC`)
- **Text:** Dark Charcoal (`#292433`)
- **Secondary Text:** Muted Grey (`#77717F`)
- **Buttons:** Lavender (`#A678D6`), Hover: Dark Lavender (`#8755B9`)
- **Typography:** Plus Jakarta Sans & Noto Sans Telugu (`తెలుగు`)
- **Aesthetic:** Rounded corners (`rounded-2xl`, `rounded-3xl`), soft shadows (`shadow-card`), high-resolution pet photography, smooth micro-interactions.

---

## 🌐 Full Bilingual Support (English & Telugu)

A reactive, instant-switching translation architecture (without page reload) covering 100% of the platform:
- Top Navigation & Mobile Menu
- Hero Section, Headings, Subtitles, & CTAs
- Pet Search & Dynamic Filter controls
- Detailed Pet Profiles, Temperament tags, & Care instructions
- **Digital Pet Health Passport** (Vaccination records, Deworming schedules, Vet clinic data)
- Multi-step Adoption Application Form & Validation messages
- Adopter Government ID Verification Workflow
- Dashboards for Adopters, NGOs, and Platform Administrators
- Post-Adoption Care Reminders & Calendar
- Lost & Found Community Board
- Furry Soulmate Compatibility Quiz
- Footer & Legal Guidelines

---

## 🚀 Key Features

### 1. Homepage & Hero Section
- High-quality hero banner featuring a cute dog and kitten together.
- Overlapping rounded search filter panel (Category, Breed, Age, Gender, Location, Health Status, Vaccination Status, and Keyword Search).
- "Meet Your New Best Friend" featured pets showcase with category filter tabs.
- "How Adoption Works" 4-step transparent adoption workflow.
- Digital Pet Health Passport preview callout.
- Real-time impact counters & adoption testimonials.

### 2. Comprehensive Pet Search ("Find a Pet")
- Multi-parameter filtering with instant query updates.
- Real-time sorting (Recently Rescued, Alphabetical).
- Dynamic count badge displaying available pets.

### 3. Pet Details & Digital Health Passport
- High-res photo gallery with thumbnail selector.
- Key specs chips (Age, Gender, Size, Location, Status, NGO Verification).
- Comprehensive personality tags, dietary needs, and medical history.
- **Pet Health Passport:** Complete vaccination tables (vaccine name, date given, valid until, vet name, batch number), deworming records, microchip ID, and vet clinic contact.
- Prominent "Apply for Adoption" button opening the application modal.

### 4. Adoption Management & Fairness Policy
- Multi-step application modal (Personal info, Living environment, Care commitment).
- **One active adoption request per pet** policy enforced on the backend.
- Application status tracking stepper:
  `Submitted` ➔ `Under Review` ➔ `Shelter Visit` ➔ `Approved / Rejected`
- **Official Adoption Certificate Generator:** Printable lifetime certificate with seal, certificate ID, and celebratory confetti.

### 5. Adopter Government ID Verification
- Dedicated verification portal for adopters.
- Upload Government ID (Aadhaar, Passport, Driver's License, Voter ID) and Address Proof.
- Statuses: `Unverified`, `Pending Admin Review`, `Officially Verified Adopter`, `Rejected`.
- Private and secure document handling with admin approval queue.

### 6. Post-Adoption Care Dashboard
- Personalized care calendar and reminders for:
  - Vaccination boosters
  - Deworming treatments
  - Grooming sessions
  - Daily medications
  - Vet checkups
- Interactive mark-done, status toggles, and custom reminder creation.

### 7. NGO / Shelter Portal
- Real-time shelter statistics (Total Pets, Available, Adopted, Pending Applications).
- Register & Edit Pet profiles with medical records and multi-photo URLs.
- Review adoption applications, check adopter ID status, approve/reject with shelter remarks, and schedule shelter visits.
- Add vaccination records directly to pet health passports.

### 8. Platform Admin Dashboard
- System health metrics (Adopters, NGOs, Pets, Total Adoptions, Pending Reviews).
- Adopter ID verification review queue (inspect uploaded proof and approve/reject).
- NGO verification and partner management.
- One-click demo database reset.

### 9. Community Features
- **Lost and Found Pets Board:** Report lost or found pets with photo, location, date, reward, and contact. Mark reunited when found.
- **Compatibility Quiz / Matchmaker:** 5-question lifestyle assessment calculating percentage match with available pets.

---

## 🔑 Demo 1-Click Login Credentials

Quick login buttons are available on the `/login` page:

| Role | Email | Password |
|---|---|---|
| **Adopter** | `adopter@petlove.com` | `password123` |
| **Shelter NGO** | `ngo@petlove.com` | `password123` |
| **Platform Admin** | `admin@petlove.com` | `password123` |

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Lucide React icons, Canvas Confetti, Axios, React Router v6.
- **Backend:** Node.js, Express.js, JWT Authentication, Multer file uploads, Bcrypt password hashing.
- **Database:** MongoDB & Mongoose (with persistent smart JSON fallback storage for zero-dependency portability).

---

## 🏃 Running the Application

### Option A: Run Full-Stack Express Server (Single Port 5000)
Serves both backend APIs and the built production React frontend:
```bash
npm start
```
Open [http://localhost:5000](http://localhost:5000) in your browser.

### Option B: Run in Development Mode (Vite HMR on 5173 + Backend on 5000)
1. **Start Backend:**
   ```bash
   cd backend
   npm start
   ```
2. **Start Frontend (in another terminal):**
   ```bash
   cd frontend
   npm run dev
   ```
Open [http://localhost:5173](http://localhost:5173) in your browser.
