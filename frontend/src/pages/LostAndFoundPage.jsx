import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Search, Plus, MapPin, Calendar, Phone, Award, CheckCircle2,
  AlertTriangle, ShieldAlert, X
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const LostAndFoundPage = () => {
  const { t, lang } = useLanguage();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'lost', 'found'

  // Report Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState('lost');
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('dog');
  const [formBreed, setFormBreed] = useState('');
  const [formColor, setFormColor] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0]);
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formReward, setFormReward] = useState('');
  const [formImage, setFormImage] = useState('https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80');
  const [formDesc, setFormDesc] = useState('');

  const loadListings = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/lost-found');
      setListings(res.data.listings || []);
    } catch (err) {
      console.error('Error fetching lost and found:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadListings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/lost-found', {
        type: formType,
        title: formTitle,
        category: formCategory,
        breed: formBreed,
        color: formColor,
        location: formLocation,
        date: formDate,
        contactName: formName,
        contactPhone: formPhone,
        reward: formReward,
        imageUrl: formImage,
        description: formDesc
      });
      setIsModalOpen(false);
      // Reset
      setFormTitle('');
      setFormBreed('');
      setFormLocation('');
      setFormPhone('');
      setFormDesc('');
      loadListings();
    } catch (err) {
      console.error('Submit lost/found error:', err);
    }
  };

  const handleMarkReunited = async (id) => {
    try {
      await axios.put(`/api/lost-found/${id}/status`, { status: 'reunited' });
      loadListings();
    } catch (err) {
      console.error('Reunited status error:', err);
    }
  };

  const filtered = activeTab === 'all' ? listings : listings.filter(item => item.type === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="rounded-3xl bg-lavender-100/80 p-8 sm:p-10 border border-lavender-200/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-lavender-700">
            {t('nav.lostFound')}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight">
            {t('lostFound.pageTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-mutedgrey leading-relaxed">
            {t('lostFound.pageSubtitle')}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3.5 rounded-full bg-lavender-500 hover:bg-lavender-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-lavender-500/25 flex items-center gap-2 transition-all hover:scale-105 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{t('lostFound.reportBtn')}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-lavender-200 pb-3">
        {[
          { id: 'all', label: t('lostFound.tabAll') },
          { id: 'lost', label: t('lostFound.tabLost') },
          { id: 'found', label: t('lostFound.tabFound') }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-lavender-500 text-white shadow-md'
                : 'bg-lavender-50 text-charcoal hover:bg-lavender-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Listings Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-80 rounded-3xl bg-lavender-100/60 animate-pulse" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-3xl overflow-hidden border border-lavender-100 shadow-sm hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] bg-lavender-100 overflow-hidden">
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80'}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3.5 left-3.5">
                    {item.status === 'reunited' ? (
                      <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-sm flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {t('lostFound.statusReunited')}
                      </span>
                    ) : item.type === 'lost' ? (
                      <span className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-bold shadow-sm flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {t('lostFound.typeLost')}
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold shadow-sm flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        {t('lostFound.typeFound')}
                      </span>
                    )}
                  </div>

                  {item.reward && (
                    <div className="absolute bottom-3 right-3 bg-amber-400 text-amber-950 font-bold text-xs px-2.5 py-1 rounded-full shadow-sm">
                      {item.reward}
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-base font-extrabold text-charcoal">
                    {item.title}
                  </h3>
                  <p className="text-xs text-lavender-600 font-bold">
                    {item.breed} • {item.color}
                  </p>
                  <p className="text-xs text-mutedgrey leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-lavender-100 space-y-1.5 text-xs text-mutedgrey">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-lavender-600 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-lavender-600 shrink-0" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-charcoal pt-1">
                      <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{item.contactName}: {item.contactPhone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {item.status !== 'reunited' && (
                <div className="p-5 pt-0">
                  <button
                    type="button"
                    onClick={() => handleMarkReunited(item._id)}
                    className="w-full py-2 bg-lavender-50 hover:bg-lavender-100 text-lavender-700 text-xs font-bold rounded-2xl transition-colors"
                  >
                    {t('lostFound.reunitedBtn')}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-16 text-center border border-lavender-100 text-mutedgrey">
          No lost or found reports matching this category right now.
        </div>
      )}

      {/* Report Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-lavender-100 animate-in fade-in">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-mutedgrey hover:text-charcoal"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-extrabold text-charcoal">
              {t('lostFound.reportModalTitle')}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">
                  {t('lostFound.reportType')} *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormType('lost')}
                    className={`py-2 rounded-xl text-xs font-bold border ${
                      formType === 'lost' ? 'bg-red-500 text-white border-red-500' : 'bg-gray-50 text-charcoal'
                    }`}
                  >
                    {t('lostFound.typeLost')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormType('found')}
                    className={`py-2 rounded-xl text-xs font-bold border ${
                      formType === 'found' ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-50 text-charcoal'
                    }`}
                  >
                    {t('lostFound.typeFound')}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">{t('lostFound.petNameOrTitle')} *</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Lost White Indie Pup near Hitec City"
                  required
                  className="w-full px-3 py-2 text-xs border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">{t('lostFound.breed')}</label>
                  <input
                    type="text"
                    value={formBreed}
                    onChange={(e) => setFormBreed(e.target.value)}
                    placeholder="e.g. Beagle / Indie"
                    className="w-full px-3 py-2 text-xs border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">{t('lostFound.color')}</label>
                  <input
                    type="text"
                    value={formColor}
                    onChange={(e) => setFormColor(e.target.value)}
                    placeholder="e.g. Brown & White"
                    className="w-full px-3 py-2 text-xs border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">{t('lostFound.lastLocation')} *</label>
                <input
                  type="text"
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  placeholder="e.g. Near Inorbit Mall, Madhapur, Hyderabad"
                  required
                  className="w-full px-3 py-2 text-xs border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">{t('lostFound.contactName')} *</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">{t('lostFound.contactPhone')} *</label>
                  <input
                    type="tel"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">{t('lostFound.rewardAmount')}</label>
                <input
                  type="text"
                  value={formReward}
                  onChange={(e) => setFormReward(e.target.value)}
                  placeholder="e.g. ₹5,000 Reward"
                  className="w-full px-3 py-2 text-xs border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">{t('lostFound.description')}</label>
                <textarea
                  rows={2}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Distinguishing marks, collar details..."
                  className="w-full px-3 py-2 text-xs border rounded-xl"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-mutedgrey"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-lavender-500 hover:bg-lavender-600 text-white rounded-full text-xs font-bold shadow-md"
                >
                  {t('lostFound.submitReport')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
