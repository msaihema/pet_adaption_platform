import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search, ShieldCheck, Sparkles, Building2, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const HeroSection = () => {
  const { t, lang } = useLanguage();

  return (
    <div className="relative pt-6 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Outer Rounded Container with Lavender subtle shadow */}
      <div className="relative rounded-3xl lg:rounded-4xl overflow-hidden min-h-[500px] lg:min-h-[560px] flex items-center shadow-2xl shadow-purple-900/10">
        
        {/* Background Hero Image - Cute dog and kitten together */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=2000&q=85')`,
            backgroundPosition: 'center 35%'
          }}
        />

        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/65 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-black/20" />

        {/* Content Container */}
        <div className="relative z-10 max-w-2xl px-6 sm:px-12 py-16 lg:py-24 space-y-6">
          
          {/* Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm font-semibold shadow-sm">
            <Sparkles className="w-4 h-4 text-lavender-300" />
            <span>{t('tagline')}</span>
          </div>

          {/* Hero Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
            {t('heroHeading')}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-white/90 leading-relaxed font-normal max-w-xl drop-shadow">
            {t('heroSubtitle')}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/find-pets"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-lavender-500 hover:bg-lavender-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-lavender-500/40 hover:shadow-lavender-600/50 hover:scale-105 transition-all duration-200"
            >
              <Search className="w-5 h-5" />
              {t('explorePets')}
            </Link>

            <Link
              to="/register?role=ngo"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/40 font-bold text-sm sm:text-base hover:scale-105 transition-all duration-200"
            >
              <Building2 className="w-5 h-5 text-lavender-200" />
              {t('registerAsNgo')}
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="flex flex-wrap items-center gap-6 pt-4 text-white/80 text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-lavender-300" />
              <span>{lang === 'en' ? '100% NGO Verified' : '100% ఎన్జీఓ ధృవీకరించినవి'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-lavender-300" />
              <span>{lang === 'en' ? 'Digital Health Passports' : 'డిజిటల్ హెల్త్ పాస్‌పోర్ట్'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-lavender-300" />
              <span>{lang === 'en' ? 'Transparent Adoption' : 'పారదర్శక దత్తత'}</span>
            </div>
          </div>

        </div>

        {/* Floating Decorative Badge */}
        <div className="hidden lg:flex absolute bottom-8 right-10 z-10 bg-white/90 backdrop-blur-md border border-white/50 p-4 rounded-3xl shadow-xl items-center gap-3.5 max-w-xs animate-pulse-subtle">
          <div className="w-12 h-12 rounded-2xl bg-lavender-100 flex items-center justify-center text-lavender-600 shrink-0">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs font-bold text-charcoal">
              {lang === 'en' ? 'Verified Shelter Guarantee' : 'ధృవీకరించిన ఆశ్రమాల హామీ'}
            </p>
            <p className="text-[11px] text-mutedgrey mt-0.5">
              {lang === 'en' ? 'Every pet is vaccinated and vet examined.' : 'ప్రతి జీవికి టీకాలు & ఆరోగ్య పరీక్ష పూర్తయింది.'}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
