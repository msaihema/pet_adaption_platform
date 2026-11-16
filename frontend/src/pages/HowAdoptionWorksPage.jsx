import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart, Search, ShieldCheck, Home, Award, ChevronDown, CheckCircle2,
  FileText, Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const HowAdoptionWorksPage = () => {
  const { t, lang } = useLanguage();
  const [openFaq, setOpenFaq] = useState(null);

  const steps = [
    {
      num: '01',
      title: lang === 'en' ? 'Search & Choose a Companion' : 'వెతకండి మరియు ఎంచుకోండి',
      desc: lang === 'en'
        ? 'Browse our verified roster of dogs, cats, and rescue pets. Use filters for activity level, size, and lifestyle compatibility.'
        : 'ధృవీకరించబడిన కుక్కలు మరియు పిల్లుల జాబితాను పరిశీలించండి. మీ జీవనశైలికి అనువైన స్నేహితుడిని ఎంచుకోండి.'
    },
    {
      num: '02',
      title: lang === 'en' ? 'Complete Online Application' : 'ఆన్‌లైన్ దరఖాస్తును పూర్తి చేయండి',
      desc: lang === 'en'
        ? 'Submit a digital application detailing your living environment, family agreement, and daily pet care plan.'
        : 'మీ నివాస వాతావరణం, కుటుంబ సభ్యుల సమ్మతి మరియు రోజువారీ సంరక్షణ ప్రణాళికతో ఆన్‌లైన్ దరఖాస్తును సమర్పించండి.'
    },
    {
      num: '03',
      title: lang === 'en' ? 'Shelter Visit & Identity Verification' : 'ఆశ్రమ సందర్శన & గుర్తింపు ధృవీకరణ',
      desc: lang === 'en'
        ? 'Visit the partner shelter to interact with the pet and upload your government ID for administrative safety verification.'
        : 'ఆశ్రమాన్ని సందర్శించి పెంపుడు జీవితో గడపండి మరియు మీ గుర్తింపు పత్రాన్ని సురక్షితంగా ధృవీకరించుకోండి.'
    },
    {
      num: '04',
      title: lang === 'en' ? 'Lifetime Health Passport & Welcome Home' : 'హెల్త్ పాస్‌పోర్ట్ & స్వాగతం',
      desc: lang === 'en'
        ? 'Take your new companion home along with their official Adoption Certificate and digital Pet Health Passport.'
        : 'అధికారిక దత్తత సర్టిఫికెట్ మరియు డిజిటల్ హెల్త్ పాస్‌పోర్ట్‌తో మీ కొత్త కుటుంబ సభ్యుడిని ఇంటికి తీసుకెళ్లండి.'
    }
  ];

  const faqs = [
    {
      q: lang === 'en' ? 'Is there any fee to adopt a pet on Pet Love?' : 'పెట్ లవ్‌లో దత్తత తీసుకోవడానికి ఏదైనా రుసుము ఉంటుందా?',
      a: lang === 'en'
        ? 'No, Pet Love promotes 100% ethical, non-commercial adoption. Shelters do not charge adoption fees. Some NGOs may ask for voluntary donations or basic veterinary reimbursement.'
        : 'లేదు, పెట్ లవ్ 100% నైతిక మరియు ఉచిత దత్తతలను ప్రోత్సహిస్తుంది. ఎలాంటి కొనుగోలు రుసుములు ఉండవు.'
    },
    {
      q: lang === 'en' ? 'Why is government ID verification mandatory?' : 'ప్రభుత్వ గుర్తింపు ధృవీకరణ ఎందుకు తప్పనిసరి?',
      a: lang === 'en'
        ? 'To prevent abandonment, exploitation, and ensure pets go to legitimate, safe loving homes, our platform requires authorized identity checks.'
        : 'జంతువుల రక్షణ మరియు భద్రత దృష్ట్యా, అవి బాధ్యతాయుతమైన కుటుంబాలకు చేరుతున్నాయని నిర్ధారించుకోవడానికి గుర్తింపు ధృవీకరణ తప్పనిసరి.'
    },
    {
      q: lang === 'en' ? 'Can I adopt if I live in an apartment?' : 'నేను అపార్ట్‌మెంట్‌లో ఉంటే దత్తత తీసుకోవచ్చా?',
      a: lang === 'en'
        ? 'Absolutely! Many cats, smaller breed dogs, and gentle seniors do extraordinarily well in apartments with regular walking routines.'
        : 'ఖచ్చితంగా తీసుకోవచ్చు! పిల్లులు, చిన్న జాతి కుక్కలు మరియు ప్రశాంతమైన సీనియర్ జంతువులు అపార్ట్‌మెంట్లలో చక్కగా జీవించగలవు.'
    },
    {
      q: lang === 'en' ? 'What is the Pet Health Passport?' : 'పెట్ హెల్త్ పాస్‌పోర్ట్ అంటే ఏమిటి?',
      a: lang === 'en'
        ? 'It is an official digital record tracking all vaccinations, deworming history, microchip IDs, and upcoming veterinary boosters for the pet.'
        : 'ఇది మీ పెంపుడు జంతువు యొక్క టీకాలు, నట్టల నివారణ, మైక్రోచిప్ వివరాలు మరియు తదుపరి బూస్టర్ డోసులను ట్రాక్ చేసే అధికారిక డిజిటల్ రికార్డు.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Intro */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-lavender-100 text-lavender-700 text-xs font-bold uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5" />
          <span>{lang === 'en' ? 'Ethical Adoption Process' : 'నైతిక దత్తత విధానం'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-charcoal tracking-tight">
          {t('home.howWorksTitle')}
        </h1>
        <p className="text-sm sm:text-base text-mutedgrey leading-relaxed">
          {t('home.howWorksSubtitle')}
        </p>
      </div>

      {/* 4 Process Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((st, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-8 border border-lavender-100 shadow-card relative hover:-translate-y-1 transition-all space-y-3"
          >
            <span className="text-4xl font-extrabold text-lavender-300 font-mono">
              {st.num}
            </span>
            <h3 className="text-xl font-extrabold text-charcoal">
              {st.title}
            </h3>
            <p className="text-xs sm:text-sm text-mutedgrey leading-relaxed">
              {st.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Responsible Adoption Checklist */}
      <div id="guidelines" className="bg-lavender-50 rounded-3xl p-8 sm:p-10 border border-lavender-200/80 space-y-6">
        <h2 className="text-2xl font-extrabold text-charcoal flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-lavender-600" />
          {lang === 'en' ? 'Responsible Adopter Commitment' : 'బాధ్యతాయుత దత్తతదారుని ప్రమాణాలు'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-charcoal">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Lifelong commitment (pets live 12-16 years)</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Regular annual vaccinations and vet checkups</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>High-quality nutritious food and fresh water</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Safe, secure indoor living space with loving patience</span>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-6">
        <h2 className="text-2xl font-extrabold text-charcoal text-center">
          {lang === 'en' ? 'Frequently Asked Questions' : 'తరచుగా అడిగే ప్రశ్నలు (FAQ)'}
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-lavender-100 shadow-sm overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left p-5 font-bold text-xs sm:text-sm text-charcoal flex items-center justify-between hover:bg-lavender-50/50 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-lavender-500 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>

              {openFaq === idx && (
                <div className="p-5 pt-0 text-xs sm:text-sm text-mutedgrey leading-relaxed border-t border-lavender-50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Explore CTA */}
      <div className="text-center pt-4">
        <Link
          to="/find-pets"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-lavender-500 hover:bg-lavender-600 text-white font-bold text-sm shadow-md transition-all hover:scale-105"
        >
          <span>{t('explorePets')}</span>
          <Heart className="w-4 h-4 fill-current" />
        </Link>
      </div>

    </div>
  );
};
