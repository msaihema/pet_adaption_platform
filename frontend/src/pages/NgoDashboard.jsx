import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Building2, Plus, Edit3, Trash2, ShieldCheck, Heart, Users,
  Syringe, Calendar, CheckCircle2, XCircle, Clock, AlertCircle, FileText
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export const NgoDashboard = () => {
  const { t, lang } = useLanguage();
  const { user } = useAuth();

  const [pets, setPets] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pets'); // 'pets', 'applications', 'medicals'

  // Add/Edit Pet Modal State
  const [isPetModalOpen, setIsPetModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [petForm, setPetForm] = useState({
    name: '',
    category: 'dog',
    breed: '',
    age: '1 Year',
    ageGroup: 'young',
    gender: 'male',
    size: 'medium',
    location: user?.address || 'Hyderabad, Telangana',
    healthStatus: 'healthy',
    vaccinated: true,
    spayedNeutered: true,
    description: '',
    personality: 'Friendly, Gentle, Kid-loving',
    diet: 'Nutritious balanced dry kibble twice daily.',
    images: ['https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1000&q=80'],
    microchipId: ''
  });

  // Vaccination Modal State
  const [isVaccineModalOpen, setIsVaccineModalOpen] = useState(false);
  const [selectedPetForVac, setSelectedPetForVac] = useState(null);
  const [vacName, setVacName] = useState('Anti-Rabies Vaccine');
  const [vacDate, setVacDate] = useState(new Date().toISOString().split('T')[0]);
  const [vacValid, setVacValid] = useState('1 Year');
  const [vacVet, setVacVet] = useState('Dr. Ramesh Varma');

  const loadData = async () => {
    setLoading(true);
    try {
      const petsRes = await axios.get('/api/pets');
      // For demo, show all pets or filtered to user's NGO
      const allPets = petsRes.data.pets || [];
      const ngoPets = allPets.filter(p => p.ngoId === user?._id || p.ngoName?.includes('Paws') || user?.role === 'admin');
      setPets(ngoPets.length > 0 ? ngoPets : allPets);

      const appsRes = await axios.get('/api/adoptions/ngo');
      setApplications(appsRes.data.applications || []);
    } catch (err) {
      console.error('NGO Dashboard load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAddPet = () => {
    setEditingPet(null);
    setPetForm({
      name: '',
      category: 'dog',
      breed: '',
      age: '1 Year',
      ageGroup: 'young',
      gender: 'male',
      size: 'medium',
      location: user?.address || 'Hyderabad, Telangana',
      healthStatus: 'healthy',
      vaccinated: true,
      spayedNeutered: true,
      description: '',
      personality: 'Friendly, Gentle, Kid-loving',
      diet: 'Nutritious balanced dry kibble twice daily.',
      images: ['https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1000&q=80'],
      microchipId: ''
    });
    setIsPetModalOpen(true);
  };

  const handleOpenEditPet = (pet) => {
    setEditingPet(pet);
    setPetForm({
      name: pet.name,
      category: pet.category,
      breed: pet.breed,
      age: pet.age,
      ageGroup: pet.ageGroup || 'young',
      gender: pet.gender,
      size: pet.size,
      location: pet.location,
      healthStatus: pet.healthStatus,
      vaccinated: pet.vaccinated,
      spayedNeutered: pet.spayedNeutered,
      description: pet.description,
      personality: Array.isArray(pet.personality) ? pet.personality.join(', ') : pet.personality,
      diet: pet.diet,
      images: pet.images,
      microchipId: pet.microchipId
    });
    setIsPetModalOpen(true);
  };

  const handleSavePet = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...petForm,
        personality: petForm.personality.split(',').map(s => s.trim())
      };

      if (editingPet) {
        await axios.put(`/api/pets/${editingPet._id}`, payload);
      } else {
        await axios.post('/api/pets', payload);
      }

      setIsPetModalOpen(false);
      loadData();
    } catch (err) {
      console.error('Error saving pet:', err);
    }
  };

  const handleDeletePet = async (id) => {
    if (!window.confirm('Are you sure you want to delete this pet profile?')) return;
    try {
      await axios.delete(`/api/pets/${id}`);
      loadData();
    } catch (err) {
      console.error('Delete pet error:', err);
    }
  };

  const handleUpdateApplicationStatus = async (appId, status, reviewNotes) => {
    try {
      await axios.put(`/api/adoptions/${appId}/status`, {
        status,
        reviewNotes: reviewNotes || `Application updated by shelter on ${new Date().toLocaleDateString()}`
      });
      loadData();
    } catch (err) {
      console.error('Update status error:', err);
    }
  };

  const handleAddVaccination = async (e) => {
    e.preventDefault();
    if (!selectedPetForVac) return;
    try {
      await axios.post(`/api/pets/${selectedPetForVac._id}/vaccinations`, {
        vaccineName: vacName,
        dateAdministered: vacDate,
        validUntil: vacValid,
        vetName: vacVet
      });
      setIsVaccineModalOpen(false);
      loadData();
    } catch (err) {
      console.error('Error adding vaccine:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-lavender-100 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-lavender-500 text-white flex items-center justify-center font-bold text-2xl shadow-md">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-charcoal">
                {user?.ngoDetails?.organizationName || user?.name}
              </h1>
              <span className="text-[10px] uppercase font-bold bg-lavender-100 text-lavender-700 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-lavender-600" />
                Verified Shelter
              </span>
            </div>
            <p className="text-xs text-mutedgrey mt-0.5">
              Reg: {user?.ngoDetails?.registrationNumber || 'TS/HYD/NGO/2021/8892'} • {user?.address || 'Hyderabad'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenAddPet}
          className="px-6 py-3 rounded-full bg-lavender-500 hover:bg-lavender-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-lavender-500/25 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>{t('ngoDashboard.addNewPet')}</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t('ngoDashboard.totalPets'), count: pets.length, color: 'text-lavender-600' },
          { label: t('ngoDashboard.availablePets'), count: pets.filter(p => p.adoptionStatus === 'available').length, color: 'text-emerald-600' },
          { label: t('ngoDashboard.adoptedPets'), count: pets.filter(p => p.adoptionStatus === 'adopted').length, color: 'text-purple-600' },
          { label: t('ngoDashboard.pendingApps'), count: applications.filter(a => ['submitted', 'under_review'].includes(a.status)).length, color: 'text-amber-600' }
        ].map((m, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-5 border border-lavender-100 shadow-sm text-center">
            <span className={`text-3xl font-extrabold ${m.color} font-sans block`}>
              {m.count}
            </span>
            <span className="text-xs font-bold text-mutedgrey uppercase tracking-wider mt-1 block">
              {m.label}
            </span>
          </div>
        ))}
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2 border-b border-lavender-200 pb-3">
        <button
          onClick={() => setActiveTab('pets')}
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'pets' ? 'bg-lavender-500 text-white shadow-md' : 'bg-lavender-50 text-charcoal hover:bg-lavender-100'
          }`}
        >
          {t('ngoDashboard.managePets')} ({pets.length})
        </button>
        <button
          onClick={() => setActiveTab('applications')}
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'applications' ? 'bg-lavender-500 text-white shadow-md' : 'bg-lavender-50 text-charcoal hover:bg-lavender-100'
          }`}
        >
          {t('ngoDashboard.applicationsTitle')} ({applications.length})
        </button>
      </div>

      {/* Tab 1: Pets Table */}
      {activeTab === 'pets' && (
        <div className="bg-white rounded-3xl border border-lavender-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-lavender-50 text-charcoal font-bold border-b border-lavender-200">
                <tr>
                  <th className="p-4">Pet Details</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Health & Passport</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-lavender-100">
                {pets.map((p) => (
                  <tr key={p._id} className="hover:bg-lavender-50/40">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images?.[0] || 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=200&q=80'}
                          alt={p.name}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div>
                          <p className="font-extrabold text-charcoal text-sm">{p.name}</p>
                          <p className="text-mutedgrey text-[11px]">{p.breed} • {p.age}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-bold text-lavender-700 capitalize">{p.category}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold capitalize border ${
                        p.adoptionStatus === 'available' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-purple-50 text-purple-700 border-purple-200'
                      }`}>
                        {p.adoptionStatus}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedPetForVac(p);
                          setIsVaccineModalOpen(true);
                        }}
                        className="text-xs font-bold text-lavender-600 hover:text-lavender-800 flex items-center gap-1"
                      >
                        <Syringe className="w-3.5 h-3.5" />
                        <span>Add Vaccine ({p.vaccinationRecords?.length || 0})</span>
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEditPet(p)}
                          className="p-1.5 text-lavender-600 hover:bg-lavender-50 rounded-lg transition-colors"
                          title="Edit Pet"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletePet(p._id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Pet"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Applications Review */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app._id} className="bg-white rounded-3xl p-6 border border-lavender-100 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-extrabold text-charcoal">
                    Application for <span className="text-lavender-600">{app.petName}</span>
                  </h3>
                  <p className="text-xs text-mutedgrey mt-0.5">
                    Applicant: <span className="font-bold text-charcoal">{app.adopterName}</span> ({app.adopterEmail} • {app.adopterPhone})
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize border ${
                    app.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {app.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Application Details Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-lavender-50/60 p-4 rounded-2xl">
                <div>
                  <span className="text-[10px] text-mutedgrey uppercase font-bold block">Residence</span>
                  <span className="font-bold text-charcoal">{app.formData?.residenceType} (Yard: {app.formData?.hasFencedYard})</span>
                </div>
                <div>
                  <span className="text-[10px] text-mutedgrey uppercase font-bold block">Family Members</span>
                  <span className="font-bold text-charcoal">{app.formData?.familyMembersCount} (All agreed: {app.formData?.allFamilyAgreed})</span>
                </div>
                <div>
                  <span className="text-[10px] text-mutedgrey uppercase font-bold block">Experience</span>
                  <span className="font-bold text-charcoal">{app.formData?.petExperience}</span>
                </div>
                <div>
                  <span className="text-[10px] text-mutedgrey uppercase font-bold block">Hours Alone Daily</span>
                  <span className="font-bold text-charcoal">{app.formData?.hoursPetAloneDaily}</span>
                </div>
              </div>

              {app.formData?.reasonForAdoption && (
                <p className="text-xs text-charcoal/80 italic">
                  "{app.formData.reasonForAdoption}"
                </p>
              )}

              {/* Action Buttons */}
              <div className="pt-2 border-t border-lavender-100 flex flex-wrap items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdateApplicationStatus(app._id, 'home_check', 'Shelter visit scheduled.')}
                  className="px-4 py-1.5 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs"
                >
                  Schedule Visit
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateApplicationStatus(app._id, 'approved', 'Application approved! Congratulations.')}
                  className="px-4 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-sm"
                >
                  Approve Adoption
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateApplicationStatus(app._id, 'rejected', 'Application not aligned with pet requirements.')}
                  className="px-4 py-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}

          {applications.length === 0 && (
            <div className="bg-white rounded-3xl p-12 text-center border border-lavender-100 text-mutedgrey">
              No adoption applications for your shelter pets right now.
            </div>
          )}
        </div>
      )}

      {/* Add / Edit Pet Modal */}
      {isPetModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-lavender-100 animate-in fade-in">
            <h2 className="text-xl font-extrabold text-charcoal">
              {editingPet ? 'Edit Pet Profile' : t('ngoDashboard.addNewPet')}
            </h2>

            <form onSubmit={handleSavePet} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">Pet Name *</label>
                  <input
                    type="text"
                    value={petForm.name}
                    onChange={(e) => setPetForm({ ...petForm, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-xs border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">Category *</label>
                  <select
                    value={petForm.category}
                    onChange={(e) => setPetForm({ ...petForm, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded-xl"
                  >
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">Breed *</label>
                  <input
                    type="text"
                    value={petForm.breed}
                    onChange={(e) => setPetForm({ ...petForm, breed: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-xs border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">Age *</label>
                  <input
                    type="text"
                    value={petForm.age}
                    onChange={(e) => setPetForm({ ...petForm, age: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-xs border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">Gender *</label>
                  <select
                    value={petForm.gender}
                    onChange={(e) => setPetForm({ ...petForm, gender: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded-xl"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">Location *</label>
                  <input
                    type="text"
                    value={petForm.location}
                    onChange={(e) => setPetForm({ ...petForm, location: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-xs border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">Photo Image URL *</label>
                <input
                  type="url"
                  value={petForm.images[0] || ''}
                  onChange={(e) => setPetForm({ ...petForm, images: [e.target.value] })}
                  required
                  className="w-full px-3 py-2 text-xs border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">Personality Traits (Comma separated)</label>
                <input
                  type="text"
                  value={petForm.personality}
                  onChange={(e) => setPetForm({ ...petForm, personality: e.target.value })}
                  placeholder="e.g. Playful, Gentle, Loyal"
                  className="w-full px-3 py-2 text-xs border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">Description</label>
                <textarea
                  rows={2}
                  value={petForm.description}
                  onChange={(e) => setPetForm({ ...petForm, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPetModalOpen(false)}
                  className="px-5 py-2 text-xs font-bold text-mutedgrey"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-2 bg-lavender-500 hover:bg-lavender-600 text-white rounded-full text-xs font-bold shadow-sm"
                >
                  Save Pet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Vaccination to Health Passport Modal */}
      {isVaccineModalOpen && selectedPetForVac && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-lavender-100 animate-in fade-in">
            <h3 className="text-base font-extrabold text-charcoal">
              Add Vaccination for {selectedPetForVac.name}
            </h3>

            <form onSubmit={handleAddVaccination} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">Vaccine Name *</label>
                <input
                  type="text"
                  value={vacName}
                  onChange={(e) => setVacName(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs border rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">Date Administered *</label>
                <input
                  type="date"
                  value={vacDate}
                  onChange={(e) => setVacDate(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs border rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">Valid Until / Booster Due</label>
                <input
                  type="text"
                  value={vacValid}
                  onChange={(e) => setVacValid(e.target.value)}
                  className="w-full px-3 py-2 text-xs border rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">Administering Veterinarian</label>
                <input
                  type="text"
                  value={vacVet}
                  onChange={(e) => setVacVet(e.target.value)}
                  className="w-full px-3 py-2 text-xs border rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsVaccineModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-mutedgrey"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-lavender-500 text-white rounded-xl text-xs font-bold"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
