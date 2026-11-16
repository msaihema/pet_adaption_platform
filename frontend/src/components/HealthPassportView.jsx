import React from 'react';
import { Syringe, ShieldCheck, HeartPulse, Calendar, Stethoscope, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const HealthPassportView = ({ pet }) => {
  const { t, lang } = useLanguage();

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-lavender-100 shadow-sm space-y-8">
      
      {/* Passport Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-lavender-500 to-lavender-600 text-white shadow-md">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
            <HeartPulse className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold flex items-center gap-2">
              {t('petDetails.healthPassportHeading')}
              <ShieldCheck className="w-5 h-5 text-lavender-200" />
            </h3>
            <p className="text-xs text-white/90">
              {lang === 'en' ? 'Official Digital Medical & Vaccination Record' : 'అధికారిక డిజిటల్ వైద్య & టీకా రికార్డు'}
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/70 block">
            {t('petDetails.microchipLabel')}
          </span>
          <span className="text-sm font-mono font-bold text-white bg-black/20 px-3 py-1 rounded-lg">
            {pet.microchipId || 'MC-985141002348'}
          </span>
        </div>
      </div>

      {/* Key Health Status Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
        <div className="p-4 rounded-2xl bg-lavender-50 border border-lavender-200/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-lavender-500 text-white flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-mutedgrey uppercase">{t('filters.vaccinationStatus')}</p>
            <p className="text-sm font-extrabold text-charcoal">
              {pet.vaccinated ? t('filters.vaccinatedOnly') : t('filters.notVaccinated')}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-lavender-50 border border-lavender-200/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-lavender-500 text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-mutedgrey uppercase">{lang === 'en' ? 'Spayed / Neutered' : 'స్టెరిలైజేషన్'}</p>
            <p className="text-sm font-extrabold text-charcoal">
              {pet.spayedNeutered ? (lang === 'en' ? 'Sterilized' : 'పూర్తయింది') : (lang === 'en' ? 'Scheduled' : 'వాయిదా/నిర్ణయించబడింది')}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-lavender-50 border border-lavender-200/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-lavender-500 text-white flex items-center justify-center shrink-0">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-mutedgrey uppercase">{t('petDetails.healthLabel')}</p>
            <p className="text-sm font-extrabold text-charcoal capitalize">
              {pet.healthStatus === 'healthy' ? t('filters.healthy') : t('filters.specialNeeds')}
            </p>
          </div>
        </div>
      </div>

      {/* Vaccination Records Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-extrabold text-charcoal flex items-center gap-2">
            <Syringe className="w-4 h-4 text-lavender-500" />
            {t('petDetails.vaccinationTableTitle')}
          </h4>
          <span className="text-xs text-lavender-600 font-bold">
            {pet.vaccinationRecords?.length || 0} {lang === 'en' ? 'Recorded' : 'నమోదైనవి'}
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-lavender-100">
          <table className="w-full text-left text-xs">
            <thead className="bg-lavender-50 text-charcoal font-bold border-b border-lavender-200/70">
              <tr>
                <th className="p-3.5">{t('petDetails.vaccineNameCol')}</th>
                <th className="p-3.5">{t('petDetails.dateAdministeredCol')}</th>
                <th className="p-3.5">{t('petDetails.validUntilCol')}</th>
                <th className="p-3.5">{t('petDetails.vetCol')}</th>
                <th className="p-3.5">{t('petDetails.batchCol')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lavender-100 text-mutedgrey">
              {pet.vaccinationRecords && pet.vaccinationRecords.length > 0 ? (
                pet.vaccinationRecords.map((vac, idx) => (
                  <tr key={idx} className="hover:bg-lavender-50/40 transition-colors">
                    <td className="p-3.5 font-bold text-charcoal">{vac.vaccineName}</td>
                    <td className="p-3.5 font-medium">{vac.dateAdministered}</td>
                    <td className="p-3.5 font-semibold text-emerald-600">{vac.validUntil || 'Lifetime'}</td>
                    <td className="p-3.5">{vac.vetName}</td>
                    <td className="p-3.5 font-mono text-[11px] text-lavender-700">{vac.batchNumber}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-mutedgrey">
                    {lang === 'en' ? 'No vaccination records recorded yet.' : 'ఇంకా టీకా రికార్డులు నమోదు కాలేదు.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deworming Schedule Table */}
      <div className="space-y-3">
        <h4 className="text-base font-extrabold text-charcoal flex items-center gap-2">
          <Calendar className="w-4 h-4 text-lavender-500" />
          {t('petDetails.dewormingTitle')}
        </h4>

        <div className="overflow-x-auto rounded-2xl border border-lavender-100">
          <table className="w-full text-left text-xs">
            <thead className="bg-lavender-50 text-charcoal font-bold border-b border-lavender-200/70">
              <tr>
                <th className="p-3.5">{t('petDetails.medicineCol')}</th>
                <th className="p-3.5">{t('petDetails.dateAdministeredCol')}</th>
                <th className="p-3.5">{t('petDetails.nextDueCol')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lavender-100 text-mutedgrey">
              {pet.dewormingRecords && pet.dewormingRecords.length > 0 ? (
                pet.dewormingRecords.map((dw, idx) => (
                  <tr key={idx} className="hover:bg-lavender-50/40 transition-colors">
                    <td className="p-3.5 font-bold text-charcoal">{dw.medicine}</td>
                    <td className="p-3.5 font-medium">{dw.dateAdministered}</td>
                    <td className="p-3.5 font-semibold text-lavender-700">{dw.nextDueDate || 'Upcoming'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-6 text-center text-mutedgrey">
                    {lang === 'en' ? 'Deworming records in progress.' : 'నట్టల నివారణ రికార్డులు పరిశీలనలో ఉన్నాయి.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Veterinary Clinic & Medical History */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Clinic info */}
        <div className="p-5 rounded-2xl bg-lavender-50/60 border border-lavender-200/70 space-y-2">
          <h5 className="text-xs font-extrabold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
            <Stethoscope className="w-4 h-4 text-lavender-600" />
            {t('petDetails.vetClinicInfo')}
          </h5>
          <p className="text-sm font-bold text-charcoal">
            {pet.vetInfo?.clinicName || 'Hyderabad Care Pet Hospital'}
          </p>
          <p className="text-xs text-mutedgrey">
            {t('petDetails.doctorName')}: <span className="font-semibold text-charcoal">{pet.vetInfo?.doctorName || 'Dr. Ramesh Varma, BVSc & AH'}</span>
          </p>
          <p className="text-xs text-mutedgrey">
            {t('petDetails.contactNumber')}: <span className="font-semibold text-lavender-600">{pet.vetInfo?.contact || '+91 94401 99882'}</span>
          </p>
        </div>

        {/* Medical History */}
        <div className="p-5 rounded-2xl bg-lavender-50/60 border border-lavender-200/70 space-y-2">
          <h5 className="text-xs font-extrabold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-lavender-600" />
            {t('petDetails.medicalHeading')}
          </h5>
          <p className="text-xs text-mutedgrey leading-relaxed">
            {pet.medicalHistory || (lang === 'en' ? 'Comprehensive wellness checkup completed. Ears, eyes, joints, and cardiovascular health are completely normal.' : 'సమగ్ర ఆరోగ్య పరీక్ష పూర్తయింది. చెవులు, కళ్ళు, కీళ్ళు మరియు గుండె పనితీరు పూర్తిగా సాధారణం.')}
          </p>
        </div>
      </div>

    </div>
  );
};
