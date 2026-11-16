import React from 'react';
import { Heart, ShieldCheck, Award, Users, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AboutPage = () => {
  const { t, lang } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Intro */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-lavender-100 text-lavender-700 text-xs font-bold uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5" />
          <span>{lang === 'en' ? 'Our Mission & Story' : 'మా లక్ష్యం & ప్రయాణం'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-charcoal tracking-tight">
          {lang === 'en' ? 'Every Pet Deserves a Forever Family' : 'ప్రతి మూగజీవికి ఒక ఆప్యాయమైన కుటుంబం లభించాలి'}
        </h1>
        <p className="text-sm sm:text-base text-mutedgrey leading-relaxed">
          {t('footer.aboutText')}
        </p>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-8 border border-lavender-100 shadow-card text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-lavender-100 text-lavender-700 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-extrabold text-charcoal">
            {lang === 'en' ? 'Verified Shelters Only' : 'ధృవీకరించబడిన ఆశ్రమాలు మాత్రమే'}
          </h3>
          <p className="text-xs text-mutedgrey leading-relaxed">
            We partner exclusively with recognized animal welfare organizations, eliminating cruel puppy mills and commercial trading.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-lavender-100 shadow-card text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-lavender-100 text-lavender-700 flex items-center justify-center mx-auto">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-extrabold text-charcoal">
            {lang === 'en' ? 'Digital Medical Passports' : 'డిజిటల్ మెడికల్ పాస్‌పోర్ట్'}
          </h3>
          <p className="text-xs text-mutedgrey leading-relaxed">
            Every adoption is backed by authenticated vaccination logs, deworming calendars, and lifetime health records.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-lavender-100 shadow-card text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-lavender-100 text-lavender-700 flex items-center justify-center mx-auto">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-extrabold text-charcoal">
            {lang === 'en' ? 'Bilingual Community' : 'ద్విభాషా వేదిక'}
          </h3>
          <p className="text-xs text-mutedgrey leading-relaxed">
            Accessible in both English and Telugu to reach families and compassionate individuals across all communities.
          </p>
        </div>
      </div>

    </div>
  );
};
