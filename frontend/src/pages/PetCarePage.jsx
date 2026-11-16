import React from 'react';
import { HeartPulse, Syringe, Utensils, ShieldCheck, Calendar, Phone, Activity, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const PetCarePage = () => {
  const { t, lang } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Intro */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-lavender-100 text-lavender-700 text-xs font-bold uppercase tracking-wider">
          <HeartPulse className="w-3.5 h-3.5" />
          <span>{lang === 'en' ? 'Holistic Wellness & Longevity' : 'సంపూర్ణ జంతు ఆరోగ్యం & సంరక్షణ'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-charcoal tracking-tight">
          {lang === 'en' ? 'Pet Health & Post-Adoption Care' : 'పెంపుడు జంతువుల ఆరోగ్యం & సంరక్షణ మార్గదర్శి'}
        </h1>
        <p className="text-sm sm:text-base text-mutedgrey leading-relaxed">
          {lang === 'en'
            ? 'Everything you need to keep your companion thriving: core vaccination timetables, balanced diets, deworming calendars, and emergency care.'
            : 'మీ ముద్దుల నేస్తం ఆరోగ్యంగా ఉండటానికి అవసరమైన సమస్త సమాచారం: టీకాల షెడ్యూల్, సమతుల్య పోషకాహారం మరియు అత్యవసర జాగ్రత్తలు.'}
        </p>
      </div>

      {/* Core Vaccination Schedules */}
      <section id="vaccination-guide" className="bg-white rounded-3xl p-8 sm:p-10 border border-lavender-100 shadow-card space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-lavender-500 text-white flex items-center justify-center shadow-md">
            <Syringe className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-charcoal">
              {lang === 'en' ? 'Core Vaccination Timetable' : 'ప్రధాన టీకాల కాలపట్టిక (Vaccination Schedule)'}
            </h2>
            <p className="text-xs text-mutedgrey">
              {lang === 'en' ? 'Essential shots recommended by senior veterinary physicians' : 'నిపుణులైన పశువైద్యులచే సిఫార్సు చేయబడిన ముఖ్యమైన టీకాలు'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Canine Schedule */}
          <div className="p-6 rounded-2xl bg-lavender-50/70 border border-lavender-200/80 space-y-3">
            <h3 className="text-base font-extrabold text-charcoal flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-lavender-500"></span>
              {lang === 'en' ? 'Dogs & Puppies Schedule' : 'కుక్కలు & కూనల టీకాల షెడ్యూల్'}
            </h3>
            <ul className="space-y-2 text-xs text-charcoal/90">
              <li className="flex justify-between border-b border-lavender-200/50 pb-1.5">
                <span className="font-bold">6-8 Weeks:</span>
                <span>DHPP Puppy Shot 1 (Distemper, Parvo)</span>
              </li>
              <li className="flex justify-between border-b border-lavender-200/50 pb-1.5">
                <span className="font-bold">10-12 Weeks:</span>
                <span>DHPP Shot 2 + Corona + Kennel Cough</span>
              </li>
              <li className="flex justify-between border-b border-lavender-200/50 pb-1.5">
                <span className="font-bold">14-16 Weeks:</span>
                <span>Anti-Rabies Primary Dose + DHPP Booster</span>
              </li>
              <li className="flex justify-between pt-1">
                <span className="font-bold">Annually:</span>
                <span className="text-lavender-700 font-bold">Annual Rabies & DHPP Booster</span>
              </li>
            </ul>
          </div>

          {/* Feline Schedule */}
          <div className="p-6 rounded-2xl bg-lavender-50/70 border border-lavender-200/80 space-y-3">
            <h3 className="text-base font-extrabold text-charcoal flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-lavender-500"></span>
              {lang === 'en' ? 'Cats & Kittens Schedule' : 'పిల్లులు & పిల్లికూనల టీకాల షెడ్యూల్'}
            </h3>
            <ul className="space-y-2 text-xs text-charcoal/90">
              <li className="flex justify-between border-b border-lavender-200/50 pb-1.5">
                <span className="font-bold">8 Weeks:</span>
                <span>FVRCP (Feline Viral Rhinotracheitis, Calici, Panleukopenia)</span>
              </li>
              <li className="flex justify-between border-b border-lavender-200/50 pb-1.5">
                <span className="font-bold">12 Weeks:</span>
                <span>FVRCP Booster + FeLV (Feline Leukemia)</span>
              </li>
              <li className="flex justify-between border-b border-lavender-200/50 pb-1.5">
                <span className="font-bold">16 Weeks:</span>
                <span>Anti-Rabies Vaccine</span>
              </li>
              <li className="flex justify-between pt-1">
                <span className="font-bold">Annually:</span>
                <span className="text-lavender-700 font-bold">Annual FVRCP & Rabies Booster</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Nutrition & Diet Guide */}
      <section id="nutrition" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-lavender-100 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-lavender-100 text-lavender-700 flex items-center justify-center">
            <Utensils className="w-5 h-5" />
          </div>
          <h3 className="text-base font-extrabold text-charcoal">
            {lang === 'en' ? 'Balanced Canine Nutrition' : 'కుక్కల సమతుల్య ఆహారం'}
          </h3>
          <p className="text-xs text-mutedgrey leading-relaxed">
            High quality proteins, complex carbohydrates, and essential fatty acids. Never feed chocolate, onions, grapes, raisins, or cooked bones.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-lavender-100 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-lavender-100 text-lavender-700 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <h3 className="text-base font-extrabold text-charcoal">
            {lang === 'en' ? 'Deworming & Tick Control' : 'నట్టల నివారణ & ఈగలు/పేలు'}
          </h3>
          <p className="text-xs text-mutedgrey leading-relaxed">
            Deworm puppies monthly until 6 months, and adult dogs every 3 months. Use vet-approved spot-on drops or chewables against fleas and ticks.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-lavender-100 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-lavender-100 text-lavender-700 flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <h3 className="text-base font-extrabold text-charcoal">
            {lang === 'en' ? '24/7 Vet Tele-Support' : '24/7 అత్యవసర సంప్రదింపు'}
          </h3>
          <p className="text-xs text-mutedgrey leading-relaxed">
            Emergency vet helpline: <span className="font-bold text-lavender-700">+91 94401 23456</span>. In case of poisoning, high fever, or trauma, contact the nearest clinic immediately.
          </p>
        </div>
      </section>

    </div>
  );
};
