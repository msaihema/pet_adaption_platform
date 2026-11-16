import React, { useState } from 'react';
import axios from 'axios';
import { X, ShieldCheck, Upload, AlertCircle, CheckCircle2, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export const VerificationModal = ({ isOpen, onClose, onSuccess }) => {
  const { t, lang } = useLanguage();
  const { user, refreshUser } = useAuth();

  const [govtIdType, setGovtIdType] = useState('Aadhaar Card');
  const [idNumber, setIdNumber] = useState('');
  const [govtIdFile, setGovtIdFile] = useState(null);
  const [addressProofFile, setAddressProofFile] = useState(null);
  const [govtIdUrlFallback, setGovtIdUrlFallback] = useState('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('govtIdType', govtIdType);
      formData.append('idNumber', idNumber);

      if (govtIdFile) {
        formData.append('govtId', govtIdFile);
      } else {
        formData.append('govtIdUrl', govtIdUrlFallback);
      }

      if (addressProofFile) {
        formData.append('addressProof', addressProofFile);
      } else {
        formData.append('addressProofUrl', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80');
      }

      await axios.post('/api/verifications/submit', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      await refreshUser();
      setSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Submit verification error:', err);
      setError(err.response?.data?.message || (lang === 'en' ? 'Error submitting documents. Please try again.' : 'పత్రాలు సమర్పించడంలో లోపం ఏర్పడింది. దయచేసి మళ్లీ ప్రయత్నించండి.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-lavender-100 animate-in fade-in zoom-in-95">
        
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-mutedgrey hover:text-charcoal hover:bg-lavender-50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 pb-4 border-b border-lavender-100">
          <div className="w-12 h-12 rounded-2xl bg-lavender-500 text-white flex items-center justify-center shadow-md">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-charcoal">
              {t('verification.title')}
            </h2>
            <p className="text-xs text-mutedgrey">
              {lang === 'en' ? 'Identity Verification for Adopters' : 'దత్తతదారుల అధికారిక గుర్తింపు ధృవీకరణ'}
            </p>
          </div>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-xl font-extrabold text-charcoal">
              {lang === 'en' ? 'Verification Documents Submitted!' : 'ధృవీకరణ పత్రాలు సమర్పించబడ్డాయి!'}
            </h3>
            <p className="text-xs text-mutedgrey max-w-sm mx-auto leading-relaxed">
              {lang === 'en'
                ? 'Our administrative team will review your identity credentials within 24-48 hours. You will receive an update once verified.'
                : 'మా అడ్మిన్ బృందం 24-48 గంటల్లో మీ గుర్తింపు పత్రాలను సమీక్షిస్తుంది. ధృవీకరణ పూర్తయిన వెంటనే మీకు తెలియజేయబడుతుంది.'}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-2.5 rounded-full bg-lavender-500 hover:bg-lavender-600 text-white font-bold text-xs sm:text-sm shadow-md"
              >
                {lang === 'en' ? 'Close' : 'ముగించండి'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="pt-4 space-y-4">
            {error && (
              <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                {t('verification.idType')} *
              </label>
              <select
                value={govtIdType}
                onChange={(e) => setGovtIdType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-lavender-200 text-xs sm:text-sm focus:ring-2 focus:ring-lavender-400 focus:outline-none"
              >
                <option value="Aadhaar Card">{t('verification.aadhaar')}</option>
                <option value="Passport">{t('verification.passport')}</option>
                <option value="Driver License">{t('verification.driverLicense')}</option>
                <option value="Voter ID Card">{t('verification.voterId')}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                {t('verification.idNumber')} *
              </label>
              <input
                type="text"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                placeholder="e.g. 5432 9876 1234"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-lavender-200 text-xs sm:text-sm focus:ring-2 focus:ring-lavender-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                {t('verification.uploadGovtId')} *
              </label>
              <div className="border-2 border-dashed border-lavender-300 rounded-2xl p-4 text-center hover:bg-lavender-50/50 transition-colors">
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  id="govtIdInput"
                  onChange={(e) => setGovtIdFile(e.target.files[0])}
                  className="hidden"
                />
                <label htmlFor="govtIdInput" className="cursor-pointer flex flex-col items-center gap-2">
                  <Upload className="w-6 h-6 text-lavender-600" />
                  <span className="text-xs font-bold text-lavender-700">
                    {govtIdFile ? govtIdFile.name : (lang === 'en' ? 'Click to select photo or PDF' : 'ఫోటో లేదా PDF ఫైల్ ఎంచుకోండి')}
                  </span>
                  <span className="text-[10px] text-mutedgrey">
                    {lang === 'en' ? 'Clear photo of official Govt ID card (Max 10MB)' : 'అధికారిక గుర్తింపు కార్డు ఫోటో (గరిష్టంగా 10MB)'}
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                {t('verification.uploadAddressProof')}
              </label>
              <div className="border-2 border-dashed border-lavender-300 rounded-2xl p-3 text-center hover:bg-lavender-50/50 transition-colors">
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  id="addressProofInput"
                  onChange={(e) => setAddressProofFile(e.target.files[0])}
                  className="hidden"
                />
                <label htmlFor="addressProofInput" className="cursor-pointer flex flex-col items-center gap-1.5">
                  <Upload className="w-5 h-5 text-lavender-600" />
                  <span className="text-xs font-bold text-lavender-700">
                    {addressProofFile ? addressProofFile.name : (lang === 'en' ? 'Select utility bill or rental agreement' : 'కరెంట్ బిల్లు లేదా అద్దె ఒప్పందం')}
                  </span>
                </label>
              </div>
            </div>

            {/* Privacy Guarantee Note */}
            <div className="p-3 bg-lavender-50 rounded-2xl border border-lavender-200 text-[11px] text-mutedgrey flex items-start gap-2">
              <Lock className="w-4 h-4 text-lavender-600 shrink-0 mt-0.5" />
              <span>{t('verification.securityNotice')}</span>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-bold text-mutedgrey hover:text-charcoal"
              >
                {t('adoptionModal.cancel')}
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-7 py-2.5 rounded-full bg-lavender-500 hover:bg-lavender-600 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{loading ? t('verification.submitting') : t('verification.submitBtn')}</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
