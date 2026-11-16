import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Heart, ShieldCheck, Clock, CheckCircle2, AlertCircle, Plus,
  Calendar, Award, Utensils, Syringe, Trash2, Check, ExternalLink, UserCheck
} from 'lucide-react';
import { PetCard } from '../components/PetCard';
import { VerificationModal } from '../components/VerificationModal';
import { AdoptionCertificateModal } from '../components/AdoptionCertificateModal';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';

export const AdopterDashboard = () => {
  const { t, lang } = useLanguage();
  const { user, refreshUser } = useAuth();
  const { favorites } = useFavorites();
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'applications');
  const [applications, setApplications] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [favoritePets, setFavoritePets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);
  const [certificateData, setCertificateData] = useState(null);
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);

  // Add reminder form
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [remTitle, setRemTitle] = useState('');
  const [remType, setRemType] = useState('vaccination');
  const [remDate, setRemDate] = useState('');
  const [remTime, setRemTime] = useState('09:00 AM');
  const [remFreq, setRemFreq] = useState('once');
  const [remNotes, setRemNotes] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      // 1. Applications
      const appsRes = await axios.get('/api/adoptions/my');
      setApplications(appsRes.data.applications || []);

      // 2. Reminders
      const remRes = await axios.get('/api/care-reminders');
      setReminders(remRes.data.reminders || []);

      // 3. Favorites
      const petsRes = await axios.get('/api/pets');
      const allPets = petsRes.data.pets || [];
      setFavoritePets(allPets.filter(p => favorites.includes(p._id)));
    } catch (err) {
      console.error('Error loading adopter dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [favorites]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleAddReminder = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/care-reminders', {
        title: remTitle,
        type: remType,
        dueDate: remDate,
        time: remTime,
        frequency: remFreq,
        notes: remNotes
      });
      setReminders([res.data.reminder, ...reminders]);
      setShowAddReminder(false);
      setRemTitle('');
      setRemDate('');
      setRemNotes('');
    } catch (err) {
      console.error('Add reminder error:', err);
    }
  };

  const handleToggleReminderStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    try {
      await axios.put(`/api/care-reminders/${id}`, { status: nextStatus });
      setReminders(reminders.map(r => r._id === id ? { ...r, status: nextStatus } : r));
    } catch (err) {
      console.error('Update reminder status error:', err);
    }
  };

  const handleDeleteReminder = async (id) => {
    try {
      await axios.delete(`/api/care-reminders/${id}`);
      setReminders(reminders.filter(r => r._id !== id));
    } catch (err) {
      console.error('Delete reminder error:', err);
    }
  };

  const openCertificate = async (appId) => {
    try {
      const res = await axios.get(`/api/adoptions/${appId}/certificate`);
      setCertificateData(res.data.certificate);
      setCertificateModalOpen(true);
    } catch (err) {
      console.error('Error loading certificate:', err);
    }
  };

  const getStageColor = (status) => {
    switch (status) {
      case 'submitted': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'under_review': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'home_check': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'approved':
      case 'completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'rejected': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getVerificationBadge = () => {
    const status = user?.verificationStatus || 'unverified';
    if (status === 'verified') {
      return (
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{t('verification.verified')}</span>
        </div>
      );
    }
    if (status === 'pending') {
      return (
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
          <Clock className="w-4 h-4 text-amber-600" />
          <span>{t('verification.pending')}</span>
        </div>
      );
    }
    return (
      <button
        type="button"
        onClick={() => setVerificationModalOpen(true)}
        className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-lavender-500 hover:bg-lavender-600 text-white text-xs font-bold shadow-sm transition-all"
      >
        <ShieldCheck className="w-4 h-4" />
        <span>{lang === 'en' ? 'Verify Government ID' : 'గుర్తింపును ధృవీకరించండి'}</span>
      </button>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Profile Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-lavender-100 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-lavender-500 text-white flex items-center justify-center font-bold text-2xl shadow-md">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-charcoal">{user?.name}</h1>
              <span className="text-[10px] uppercase font-bold bg-lavender-100 text-lavender-700 px-2.5 py-0.5 rounded-full">
                {user?.role}
              </span>
            </div>
            <p className="text-xs text-mutedgrey mt-0.5">{user?.email} • {user?.phone || 'Phone on file'}</p>
          </div>
        </div>

        {/* Verification Status Banner Action */}
        <div>
          {getVerificationBadge()}
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex flex-wrap items-center gap-2 border-b border-lavender-200 pb-3">
        {[
          { id: 'applications', label: t('dashboard.tabApplications'), count: applications.length },
          { id: 'reminders', label: t('dashboard.tabReminders'), count: reminders.length },
          { id: 'adopted', label: t('dashboard.tabAdopted'), count: applications.filter(a => a.status === 'approved' || a.status === 'completed').length },
          { id: 'favorites', label: t('dashboard.tabFavorites'), count: favoritePets.length }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-lavender-500 text-white shadow-md shadow-lavender-500/25'
                : 'bg-lavender-50/70 hover:bg-lavender-100 text-charcoal'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${
              activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-lavender-200/80 text-charcoal'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Tab 1: Applications Tracker */}
      {activeTab === 'applications' && (
        <div className="space-y-6">
          {applications.length > 0 ? (
            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app._id}
                  className="bg-white rounded-3xl p-6 border border-lavender-100 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden bg-lavender-100 shrink-0">
                        <img
                          src={app.petImage || 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=300&q=80'}
                          alt={app.petName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-extrabold text-charcoal">{app.petName}</h3>
                        <p className="text-xs text-mutedgrey">
                          Applied on: {new Date(app.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border capitalize ${getStageColor(app.status)}`}>
                        {app.status.replace('_', ' ')}
                      </span>

                      {(app.status === 'approved' || app.status === 'completed') && (
                        <button
                          type="button"
                          onClick={() => openCertificate(app._id)}
                          className="px-4 py-1.5 rounded-full bg-lavender-500 hover:bg-lavender-600 text-white text-xs font-bold shadow-sm flex items-center gap-1.5"
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>{t('dashboard.viewCertificate')}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Application Stepper Tracker */}
                  <div className="pt-2 border-t border-lavender-100">
                    <p className="text-[11px] font-bold text-mutedgrey uppercase tracking-wider mb-3">
                      {lang === 'en' ? 'Adoption Progress Tracker' : 'దత్తత ప్రక్రియ పురోగతి'}
                    </p>
                    <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-bold">
                      <div className={`p-2 rounded-xl ${['submitted', 'under_review', 'home_check', 'approved', 'completed'].includes(app.status) ? 'bg-lavender-500 text-white' : 'bg-gray-100 text-mutedgrey'}`}>
                        1. Submitted
                      </div>
                      <div className={`p-2 rounded-xl ${['under_review', 'home_check', 'approved', 'completed'].includes(app.status) ? 'bg-lavender-500 text-white' : 'bg-gray-100 text-mutedgrey'}`}>
                        2. Under Review
                      </div>
                      <div className={`p-2 rounded-xl ${['home_check', 'approved', 'completed'].includes(app.status) ? 'bg-lavender-500 text-white' : 'bg-gray-100 text-mutedgrey'}`}>
                        3. Shelter Visit
                      </div>
                      <div className={`p-2 rounded-xl ${['approved', 'completed'].includes(app.status) ? 'bg-emerald-600 text-white' : app.status === 'rejected' ? 'bg-red-500 text-white' : 'bg-gray-100 text-mutedgrey'}`}>
                        {app.status === 'rejected' ? 'Rejected' : '4. Approved'}
                      </div>
                    </div>
                  </div>

                  {app.reviewNotes && (
                    <div className="p-3 bg-lavender-50 rounded-2xl text-xs text-charcoal border border-lavender-200">
                      <span className="font-bold text-lavender-700">Shelter Notes: </span>
                      {app.reviewNotes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-lavender-100 space-y-4">
              <Heart className="w-12 h-12 text-lavender-300 mx-auto" />
              <h3 className="text-lg font-bold text-charcoal">{t('dashboard.noApplications')}</h3>
              <Link
                to="/find-pets"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-lavender-500 text-white font-bold text-xs"
              >
                {t('explorePets')}
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Post-Adoption Care Reminders */}
      {activeTab === 'reminders' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-charcoal flex items-center gap-2">
              <Calendar className="w-5 h-5 text-lavender-600" />
              {t('dashboard.tabReminders')}
            </h2>
            <button
              type="button"
              onClick={() => setShowAddReminder(!showAddReminder)}
              className="px-4 py-2 rounded-full bg-lavender-500 hover:bg-lavender-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>{t('dashboard.addReminderBtn')}</span>
            </button>
          </div>

          {/* Add Reminder Inline Form */}
          {showAddReminder && (
            <form onSubmit={handleAddReminder} className="bg-white rounded-3xl p-6 border border-lavender-200 shadow-card space-y-4 animate-in fade-in">
              <h3 className="text-sm font-extrabold text-charcoal">{t('dashboard.addReminderBtn')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">{t('dashboard.reminderTitle')} *</label>
                  <input
                    type="text"
                    value={remTitle}
                    onChange={(e) => setRemTitle(e.target.value)}
                    placeholder="e.g. Annual Rabies Booster"
                    required
                    className="w-full px-3 py-2 text-xs border rounded-xl focus:ring-2 focus:ring-lavender-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">{t('dashboard.reminderType')} *</label>
                  <select
                    value={remType}
                    onChange={(e) => setRemType(e.target.value)}
                    className="w-full px-3 py-2 text-xs border rounded-xl focus:ring-2 focus:ring-lavender-400"
                  >
                    <option value="vaccination">{t('dashboard.typeVaccine')}</option>
                    <option value="deworming">{t('dashboard.typeDeworm')}</option>
                    <option value="grooming">{t('dashboard.typeGroom')}</option>
                    <option value="medication">{t('dashboard.typeMeds')}</option>
                    <option value="vet_visit">{t('dashboard.typeVet')}</option>
                    <option value="diet">{t('dashboard.typeDiet')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">{t('dashboard.dueDate')} *</label>
                  <input
                    type="date"
                    value={remDate}
                    onChange={(e) => setRemDate(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs border rounded-xl focus:ring-2 focus:ring-lavender-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">{t('dashboard.notes')}</label>
                <input
                  type="text"
                  value={remNotes}
                  onChange={(e) => setRemNotes(e.target.value)}
                  placeholder="e.g. Hyderabad Pet Clinic with Dr. Ramesh"
                  className="w-full px-3 py-2 text-xs border rounded-xl focus:ring-2 focus:ring-lavender-400"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddReminder(false)}
                  className="px-4 py-2 text-xs font-bold text-mutedgrey hover:text-charcoal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-lavender-500 text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  {t('dashboard.saveReminder')}
                </button>
              </div>
            </form>
          )}

          {/* Reminders List */}
          {reminders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reminders.map((rem) => (
                <div
                  key={rem._id}
                  className={`bg-white rounded-3xl p-5 border shadow-sm flex items-start justify-between gap-4 transition-all ${
                    rem.status === 'completed' ? 'border-gray-200 bg-gray-50/50 opacity-80' : 'border-lavender-100 hover:shadow-card'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => handleToggleReminderStatus(rem._id, rem.status)}
                      className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        rem.status === 'completed' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-lavender-300 hover:border-lavender-500'
                      }`}
                    >
                      {rem.status === 'completed' && <Check className="w-3.5 h-3.5" />}
                    </button>
                    <div>
                      <h4 className={`text-sm font-extrabold text-charcoal ${rem.status === 'completed' ? 'line-through text-mutedgrey' : ''}`}>
                        {rem.title}
                      </h4>
                      <p className="text-xs text-lavender-600 font-bold mt-0.5 capitalize">
                        {rem.type.replace('_', ' ')} • Due: {rem.dueDate} {rem.time ? `(${rem.time})` : ''}
                      </p>
                      {rem.notes && (
                        <p className="text-xs text-mutedgrey mt-1">{rem.notes}</p>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteReminder(rem._id)}
                    className="p-1.5 text-mutedgrey hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-lavender-100 space-y-4">
              <Calendar className="w-12 h-12 text-lavender-300 mx-auto" />
              <h3 className="text-lg font-bold text-charcoal">{t('dashboard.noReminders')}</h3>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Adopted Pets & Certificates */}
      {activeTab === 'adopted' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applications.filter(a => a.status === 'approved' || a.status === 'completed').map((app) => (
              <div key={app._id} className="bg-white rounded-3xl p-6 border border-lavender-100 shadow-card flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={app.petImage}
                    alt={app.petName}
                    className="w-16 h-16 rounded-2xl object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-extrabold text-charcoal">{app.petName}</h3>
                    <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Officially Adopted Forever
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openCertificate(app._id)}
                  className="px-4 py-2 rounded-full bg-lavender-500 hover:bg-lavender-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Award className="w-4 h-4" />
                  <span>{t('dashboard.viewCertificate')}</span>
                </button>
              </div>
            ))}
          </div>

          {applications.filter(a => a.status === 'approved' || a.status === 'completed').length === 0 && (
            <div className="bg-white rounded-3xl p-12 text-center border border-lavender-100 space-y-4">
              <Award className="w-12 h-12 text-lavender-300 mx-auto" />
              <h3 className="text-lg font-bold text-charcoal">
                {lang === 'en' ? 'No officially adopted pets yet' : 'ఇంకా దత్తత తీసుకున్న జంతువులు లేవు'}
              </h3>
              <p className="text-xs text-mutedgrey max-w-sm mx-auto">
                {lang === 'en' ? 'Once your application is approved, your official lifetime adoption certificate will appear here.' : 'మీ దరఖాస్తు ఆమోదించబడిన వెంటనే మీ అధికారిక దత్తత సర్టిఫికెట్ ఇక్కడ కనిపిస్తుంది.'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Favorites */}
      {activeTab === 'favorites' && (
        <div className="space-y-6">
          {favoritePets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoritePets.map((pet) => (
                <PetCard key={pet._id} pet={pet} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-lavender-100 space-y-4">
              <Heart className="w-12 h-12 text-lavender-300 mx-auto" />
              <h3 className="text-lg font-bold text-charcoal">{t('dashboard.noFavorites')}</h3>
              <Link
                to="/find-pets"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-lavender-500 text-white font-bold text-xs"
              >
                {t('explorePets')}
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <VerificationModal
        isOpen={verificationModalOpen}
        onClose={() => setVerificationModalOpen(false)}
        onSuccess={() => {
          refreshUser();
        }}
      />

      <AdoptionCertificateModal
        certificate={certificateData}
        isOpen={certificateModalOpen}
        onClose={() => setCertificateModalOpen(false)}
      />

    </div>
  );
};
