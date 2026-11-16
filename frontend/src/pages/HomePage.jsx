import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Sparkles, ArrowRight, ShieldCheck, Heart, HeartPulse, Building2, Users, Award, CheckCircle2 } from 'lucide-react';
import { HeroSection } from '../components/HeroSection';
import { SearchFilterSection } from '../components/SearchFilterSection';
import { PetCard } from '../components/PetCard';
import { useLanguage } from '../context/LanguageContext';

export const HomePage = () => {
  const { t, lang } = useLanguage();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'dogs', 'cats', 'recent'

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await axios.get('/api/pets');
        setPets(res.data.pets || []);
      } catch (err) {
        console.error('Error fetching pets for home:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  const getFilteredPets = () => {
    switch (activeTab) {
      case 'dogs':
        return pets.filter(p => p.category === 'dog');
      case 'cats':
        return pets.filter(p => p.category === 'cat');
      case 'recent':
        return [...pets].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6);
      default:
        // Featured or all
        const featured = pets.filter(p => p.featured);
        return featured.length > 0 ? featured : pets.slice(0, 6);
    }
  };

  const displayedPets = getFilteredPets();

  return (
    <div className="space-y-16 lg:space-y-24">
      
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Overlapping Search Filter Section */}
      <SearchFilterSection />

      {/* 3. Featured Pets Section ("Meet Your New Best Friend") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-lavender-100 text-lavender-700 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>{t('brandName')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight">
            {t('home.featuredTitle')}
          </h2>
          <p className="text-sm sm:text-base text-mutedgrey leading-relaxed">
            {t('home.featuredSubtitle')}
          </p>
        </div>

        {/* Category Tabs: All, Dogs, Cats, Recently Added */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {[
            { id: 'all', label: t('home.tabsAll') },
            { id: 'dogs', label: t('home.tabsDogs') },
            { id: 'cats', label: t('home.tabsCats') },
            { id: 'recent', label: t('home.tabsRecent') }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-lavender-500 text-white shadow-md shadow-lavender-500/30'
                  : 'bg-lavender-50 hover:bg-lavender-100 text-charcoal'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Pets Grid */}
        <div className="mt-10">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="h-96 rounded-3xl bg-lavender-100/60 animate-pulse" />
              ))}
            </div>
          ) : displayedPets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {displayedPets.map((pet) => (
                <PetCard key={pet._id} pet={pet} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-3xl bg-lavender-50 border border-lavender-100">
              <p className="text-sm font-bold text-mutedgrey">
                {lang === 'en' ? 'No pets match this filter right now.' : 'ప్రస్తుతం ఈ విభాగంలో జంతువులు లేవు.'}
              </p>
            </div>
          )}
        </div>

        {/* View All Pets Button */}
        <div className="mt-12 text-center">
          <Link
            to="/find-pets"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-lavender-50 border-2 border-lavender-400 text-lavender-700 font-bold text-sm shadow-sm transition-all hover:scale-105"
          >
            <span>{t('explorePets')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. How Adoption Works Section */}
      <section className="bg-lavender-100/70 py-16 lg:py-20 border-y border-lavender-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-lavender-600">
              {lang === 'en' ? 'Simple & Transparent' : 'సరళమైన మరియు పారదర్శకమైనది'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight">
              {t('home.howWorksTitle')}
            </h2>
            <p className="text-sm sm:text-base text-mutedgrey leading-relaxed">
              {t('home.howWorksSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: t('home.step1Title'),
                desc: t('home.step1Desc'),
                icon: Heart
              },
              {
                step: '02',
                title: t('home.step2Title'),
                desc: t('home.step2Desc'),
                icon: ShieldCheck
              },
              {
                step: '03',
                title: t('home.step3Title'),
                desc: t('home.step3Desc'),
                icon: Users
              },
              {
                step: '04',
                title: t('home.step4Title'),
                desc: t('home.step4Desc'),
                icon: Award
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-lavender-100 relative group hover:-translate-y-1 transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-lavender-100 flex items-center justify-center text-lavender-600 mb-5 group-hover:bg-lavender-500 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-4xl font-extrabold text-lavender-200 absolute top-5 right-6 select-none font-mono">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-extrabold text-charcoal mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-mutedgrey leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Pet Health Passport Feature Preview Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-lavender-500 to-lavender-700 rounded-3xl lg:rounded-4xl p-8 sm:p-12 lg:p-16 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-md">
              <HeartPulse className="w-4 h-4 text-lavender-200" />
              <span>{lang === 'en' ? 'Exclusive Feature' : 'ప్రత్యేక విశిష్టత'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {t('home.passportHighlightTitle')}
            </h2>

            <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal">
              {t('home.passportHighlightDesc')}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs font-semibold text-white/90">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-lavender-200 shrink-0" />
                <span>{lang === 'en' ? 'Lifetime Vaccines' : 'టీకాల వివరాలు'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-lavender-200 shrink-0" />
                <span>{lang === 'en' ? 'Deworming Tracker' : 'నట్టల నివారణ'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-lavender-200 shrink-0" />
                <span>{lang === 'en' ? 'Care Reminders' : 'సంరక్షణ రిమైండర్లు'}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                to="/pet-care"
                className="px-7 py-3.5 rounded-full bg-white text-lavender-700 hover:bg-lavender-50 font-bold text-sm shadow-md transition-all hover:scale-105"
              >
                {t('home.explorePassport')}
              </Link>
              <Link
                to="/matchmaker"
                className="px-7 py-3.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-sm border border-white/30 transition-all hover:scale-105"
              >
                {t('nav.quiz')}
              </Link>
            </div>
          </div>

          {/* Decorative Background Elements */}
          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="hidden lg:block absolute -right-10 top-1/2 -translate-y-1/2 w-80 opacity-90">
            <div className="bg-white/10 backdrop-blur-md border border-white/30 p-6 rounded-3xl space-y-4 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/30 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold">Vaccine Booster Alert</p>
                  <p className="text-[11px] text-white/80">Rabies Due in 14 days</p>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-white/20 overflow-hidden">
                <div className="h-full bg-white w-4/5 rounded-full"></div>
              </div>
              <p className="text-[10px] text-white/70 text-right">Dr. Ramesh Varma, Clinic Head</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Impact Stats Counters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { count: '1,420+', label: t('home.statsPetsSaved'), icon: Heart },
            { count: '1,280+', label: t('home.statsHappyFamilies'), icon: Users },
            { count: '48+', label: t('home.statsPartnerNgos'), icon: Building2 },
            { count: '75+', label: t('home.statsVetsConnected'), icon: HeartPulse }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-lavender-50/70 rounded-3xl p-6 sm:p-8 border border-lavender-100">
                <div className="w-10 h-10 rounded-xl bg-lavender-200 text-lavender-700 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-4xl font-extrabold text-charcoal font-sans">
                  {stat.count}
                </div>
                <p className="text-xs sm:text-sm font-semibold text-mutedgrey mt-1">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Happy Adoption Stories / Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-lavender-600">
            {lang === 'en' ? 'Stories of Love' : 'ప్రేమ పూరిత కథలు'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight">
            {t('home.storiesTitle')}
          </h2>
          <p className="text-sm sm:text-base text-mutedgrey">
            {t('home.storiesSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Vikram & Swathi',
              location: 'Hyderabad',
              story: lang === 'en'
                ? '"Adopting Leo changed our home completely. The digital health passport gave us full confidence that his vaccines were up to date."'
                : '"లియోను దత్తత తీసుకోవడం మా ఇంట్లో ఎనలేని సంతోషాన్ని నింపింది. హెల్త్ పాస్‌పోర్ట్ ద్వారా టీకాల వివరాలన్నీ స్పష్టంగా తెలిశాయి."',
              pet: 'Adopted Indie Pup "Leo"',
              image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80'
            },
            {
              name: 'Dr. Radhika Sen',
              location: 'Bengaluru',
              story: lang === 'en'
                ? '"As a busy medical professional, Pet Love’s automated vaccination and deworming reminders keep my rescued Persian kitten thriving."'
                : '"నేను డాక్టర్‌గా తీరిక లేకుండా ఉన్నప్పటికీ, పెట్ లవ్ సంరక్షణ రిమైండర్లు నా ముద్దుల పిల్లి ఆరోగ్యాన్ని చక్కగా చూసుకోవడానికి సహాయపడతాయి."',
              pet: 'Adopted Persian Mix "Mochi"',
              image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80'
            },
            {
              name: 'Karthik & Deepa',
              location: 'Visakhapatnam',
              story: lang === 'en'
                ? '"The NGO verification and adoption ceremony certificate were so heartwarming. Our children adore their companion Rocky!"'
                : '"ఎన్జీఓ ధృవీకరణ మరియు అధికారిక దత్తత సర్టిఫికెట్ మాకు ఎంతో సంతోషాన్ని ఇచ్చాయి. మా పిల్లలు రాకీతో ఎంతో ఆనందంగా గడుపుతున్నారు!"',
              pet: 'Adopted Beagle "Rocky"',
              image: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=400&q=80'
            }
          ].map((story, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 shadow-card border border-lavender-100 flex flex-col justify-between space-y-4">
              <p className="text-xs sm:text-sm text-charcoal/80 italic leading-relaxed">
                {story.story}
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-lavender-100">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-lavender-300"
                />
                <div>
                  <h4 className="text-xs font-bold text-charcoal">{story.name}</h4>
                  <p className="text-[11px] text-lavender-600 font-semibold">{story.pet} • {story.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. NGO Call-to-action Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="rounded-3xl bg-lavender-50 border border-lavender-200/80 p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="space-y-3 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-charcoal">
              {t('home.ctaTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-mutedgrey leading-relaxed">
              {t('home.ctaSubtitle')}
            </p>
          </div>
          <Link
            to="/register?role=ngo"
            className="px-8 py-3.5 rounded-full bg-lavender-500 hover:bg-lavender-600 text-white font-bold text-sm shadow-md shadow-lavender-500/30 transition-all hover:scale-105 shrink-0"
          >
            {t('home.joinAsNgo')}
          </Link>
        </div>
      </section>

    </div>
  );
};
