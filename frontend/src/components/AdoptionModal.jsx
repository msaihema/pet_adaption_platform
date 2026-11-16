import React, { useState } from 'react';
import axios from 'axios';
import { X, Heart, ShieldCheck, AlertCircle, CheckCircle2, Home, User, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export const AdoptionModal = ({ pet, isOpen, onClose, onSuccess }) => {
  const { t, lang } = useLanguage();
  const { user, isAuthenticated } = useAuth();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    age: '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: user?.address || '',
    occupation: '',
    residenceType: 'Apartment',
    hasFencedYard: 'Yes',
    familyMembersCount: '3',
    allFamilyAgreed: 'Yes',
    otherPets: 'None',
    petExperience: 'Intermediate',
    hoursPetAloneDaily: '2-4 hours',
    carePlan: '',
    reasonForAdoption: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.fullName || !formData.phone || !formData.email || !formData.address) {
        setError(lang === 'en' ? 'Please fill in all personal contact fields.' : 'దయచేసి అన్ని వ్యక్తిగత వివరాలను నమోదు చేయండి.');
        return;
      }
    }
    setError('');
    setStep(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        petId: pet._id,
        formData
      };

      const res = await axios.post('/api/adoptions', payload);
      setSuccess(true);
      if (onSuccess) onSuccess(res.data.application);
    } catch (err) {
      console.error('Adoption submit error:', err);
      const msg = err.response?.data?.message || (lang === 'en' ? 'Failed to submit application. Please try again.' : 'దరఖాస్తు సమర్పించడం విఫలమైంది. దయచేసి మళ్లీ ప్రయత్నించండి.');
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-lavender-100 animate-in fade-in zoom-in-95">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-mutedgrey hover:text-charcoal hover:bg-lavender-50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-lavender-100">
          <div className="w-14 h-14 rounded-2xl overflow-hidden bg-lavender-100 shrink-0">
            <img
              src={pet.images?.[0] || 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=300&q=80'}
              alt={pet.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-charcoal">
              {t('adoptionModal.modalTitle')} {pet.name}
            </h2>
            <p className="text-xs font-semibold text-lavender-600">
              {pet.breed} • {pet.location}
            </p>
          </div>
        </div>

        {/* Success Screen */}
        {success ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-extrabold text-charcoal">
              {t('adoptionModal.successTitle')}
            </h3>
            <p className="text-sm text-mutedgrey max-w-md mx-auto leading-relaxed">
              {t('adoptionModal.successMsg')}
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-3 rounded-full bg-lavender-500 hover:bg-lavender-600 text-white font-bold text-sm shadow-md transition-all"
              >
                {lang === 'en' ? 'Go to My Applications' : 'నా దరఖాస్తులను చూడండి'}
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Step Indicators */}
            <div className="grid grid-cols-3 gap-2 py-4">
              <div className={`h-1.5 rounded-full transition-all ${step >= 1 ? 'bg-lavender-500' : 'bg-lavender-100'}`} />
              <div className={`h-1.5 rounded-full transition-all ${step >= 2 ? 'bg-lavender-500' : 'bg-lavender-100'}`} />
              <div className={`h-1.5 rounded-full transition-all ${step >= 3 ? 'bg-lavender-500' : 'bg-lavender-100'}`} />
            </div>

            {error && (
              <div className="p-3 mb-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Step 1: Personal Info */}
            {step === 1 && (
              <form onSubmit={handleNextStep} className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-sm font-bold text-charcoal">
                  <User className="w-4 h-4 text-lavender-500" />
                  <span>{t('adoptionModal.step1')}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1">
                      {t('adoptionModal.fullName')} *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-lavender-200 text-xs sm:text-sm focus:ring-2 focus:ring-lavender-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1">
                      {t('adoptionModal.age')} *
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="e.g. 28"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-lavender-200 text-xs sm:text-sm focus:ring-2 focus:ring-lavender-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1">
                      {t('adoptionModal.phone')} *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-lavender-200 text-xs sm:text-sm focus:ring-2 focus:ring-lavender-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1">
                      {t('adoptionModal.email')} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-lavender-200 text-xs sm:text-sm focus:ring-2 focus:ring-lavender-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">
                    {t('adoptionModal.address')} *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House/Apartment, Street, City"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-lavender-200 text-xs sm:text-sm focus:ring-2 focus:ring-lavender-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">
                    {t('adoptionModal.occupation')}
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    placeholder="e.g. Architect, Consultant, Teacher"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-lavender-200 text-xs sm:text-sm focus:ring-2 focus:ring-lavender-400 focus:outline-none"
                  />
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 text-xs font-bold text-mutedgrey hover:text-charcoal"
                  >
                    {t('adoptionModal.cancel')}
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-2.5 rounded-full bg-lavender-500 hover:bg-lavender-600 text-white font-bold text-xs sm:text-sm shadow-md"
                  >
                    {lang === 'en' ? 'Continue to Step 2 →' : 'దశ 2 కి వెళ్లండి →'}
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Living Environment */}
            {step === 2 && (
              <form onSubmit={handleNextStep} className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-sm font-bold text-charcoal">
                  <Home className="w-4 h-4 text-lavender-500" />
                  <span>{t('adoptionModal.step2')}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1">
                      {t('adoptionModal.residenceType')}
                    </label>
                    <select
                      name="residenceType"
                      value={formData.residenceType}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-lavender-200 text-xs sm:text-sm focus:ring-2 focus:ring-lavender-400"
                    >
                      <option value="Own Independent House">{t('adoptionModal.residenceOwn')}</option>
                      <option value="Rented Independent House">{t('adoptionModal.residenceRentHouse')}</option>
                      <option value="Apartment">{t('adoptionModal.residenceApartment')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1">
                      {t('adoptionModal.hasFencedYard')}
                    </label>
                    <select
                      name="hasFencedYard"
                      value={formData.hasFencedYard}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-lavender-200 text-xs sm:text-sm focus:ring-2 focus:ring-lavender-400"
                    >
                      <option value="Yes">{t('adoptionModal.yes')}</option>
                      <option value="No">{t('adoptionModal.no')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1">
                      {t('adoptionModal.familyMembers')}
                    </label>
                    <input
                      type="number"
                      name="familyMembersCount"
                      value={formData.familyMembersCount}
                      onChange={handleChange}
                      min="1"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-lavender-200 text-xs sm:text-sm focus:ring-2 focus:ring-lavender-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1">
                      {t('adoptionModal.allAgreed')}
                    </label>
                    <select
                      name="allFamilyAgreed"
                      value={formData.allFamilyAgreed}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-lavender-200 text-xs sm:text-sm focus:ring-2 focus:ring-lavender-400"
                    >
                      <option value="Yes">{t('adoptionModal.yes')}</option>
                      <option value="No">{t('adoptionModal.no')}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">
                    {t('adoptionModal.otherPets')}
                  </label>
                  <input
                    type="text"
                    name="otherPets"
                    value={formData.otherPets}
                    onChange={handleChange}
                    placeholder="e.g. 1 vaccinated dog, or None"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-lavender-200 text-xs sm:text-sm focus:ring-2 focus:ring-lavender-400"
                  />
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-2.5 text-xs font-bold text-mutedgrey hover:text-charcoal"
                  >
                    ← {lang === 'en' ? 'Back' : 'వెనుకకు'}
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-2.5 rounded-full bg-lavender-500 hover:bg-lavender-600 text-white font-bold text-xs sm:text-sm shadow-md"
                  >
                    {lang === 'en' ? 'Continue to Step 3 →' : 'దశ 3 కి వెళ్లండి →'}
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Care Commitment */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-sm font-bold text-charcoal">
                  <Clock className="w-4 h-4 text-lavender-500" />
                  <span>{t('adoptionModal.step3')}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1">
                      {t('adoptionModal.petExperience')}
                    </label>
                    <select
                      name="petExperience"
                      value={formData.petExperience}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-lavender-200 text-xs sm:text-sm focus:ring-2 focus:ring-lavender-400"
                    >
                      <option value="Beginner">{t('adoptionModal.expBeginner')}</option>
                      <option value="Intermediate">{t('adoptionModal.expIntermediate')}</option>
                      <option value="Advanced">{t('adoptionModal.expAdvanced')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1">
                      {t('adoptionModal.hoursAlone')}
                    </label>
                    <input
                      type="text"
                      name="hoursPetAloneDaily"
                      value={formData.hoursPetAloneDaily}
                      onChange={handleChange}
                      placeholder="e.g. 1-2 hours"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-lavender-200 text-xs sm:text-sm focus:ring-2 focus:ring-lavender-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">
                    {t('adoptionModal.reasonForAdoption')} *
                  </label>
                  <textarea
                    rows={2}
                    name="reasonForAdoption"
                    value={formData.reasonForAdoption}
                    onChange={handleChange}
                    placeholder="Tell us what drew you to this pet..."
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-lavender-200 text-xs sm:text-sm focus:ring-2 focus:ring-lavender-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">
                    {t('adoptionModal.carePlan')}
                  </label>
                  <textarea
                    rows={2}
                    name="carePlan"
                    value={formData.carePlan}
                    onChange={handleChange}
                    placeholder="Daily walking, feeding routine, medical care arrangements..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-lavender-200 text-xs sm:text-sm focus:ring-2 focus:ring-lavender-400"
                  />
                </div>

                {/* One Active Policy Note */}
                <div className="p-3 bg-lavender-50 rounded-2xl border border-lavender-200 text-[11px] text-mutedgrey leading-relaxed flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-lavender-600 shrink-0 mt-0.5" />
                  <span>{t('adoptionModal.oneActiveNotice')}</span>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 text-xs font-bold text-mutedgrey hover:text-charcoal"
                  >
                    ← {lang === 'en' ? 'Back' : 'వెనుకకు'}
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 rounded-full bg-lavender-500 hover:bg-lavender-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-lavender-500/30 hover:shadow-lavender-600/40 transition-all flex items-center gap-2"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                    <span>{loading ? t('adoptionModal.submitting') : t('adoptionModal.submitApplication')}</span>
                  </button>
                </div>
              </form>
            )}
          </>
        )}

      </div>
    </div>
  );
};
