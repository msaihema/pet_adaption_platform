import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Heart, Share2, MapPin, ShieldCheck, Calendar, Activity,
  Utensils, Stethoscope, Building2, AlertCircle, ArrowLeft,
  CheckCircle2, Info
} from 'lucide-react';
import { HealthPassportView } from '../components/HealthPassportView';
import { AdoptionModal } from '../components/AdoptionModal';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';

export const PetDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [pet, setPet] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAdoptionModalOpen, setIsAdoptionModalOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchPet = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/pets/${id}`);
        setPet(res.data.pet);

        // Check if current user already has active application for this pet
        if (isAuthenticated) {
          try {
            const appsRes = await axios.get('/api/adoptions/my');
            const match = appsRes.data.applications?.find(
              app => app.petId === id && !['rejected', 'cancelled'].includes(app.status)
            );
            if (match) setHasApplied(true);
          } catch (e) {
            console.error('Error checking user applications:', e);
          }
        }
      } catch (err) {
        console.error('Error fetching pet details:', err);
        setError('Pet profile not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [id, isAuthenticated]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${pet?.name} - Pet Love Adoption`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/pets/' + id);
      return;
    }
    setIsAdoptionModalOpen(true);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full border-4 border-lavender-200 border-t-lavender-500 animate-spin mx-auto mb-4" />
        <p className="text-sm font-semibold text-mutedgrey">Loading pet profile...</p>
      </div>
    );
  }

  if (error || !pet) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="text-2xl font-bold text-charcoal">{error || 'Pet not found'}</h2>
        <Link
          to="/find-pets"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-lavender-500 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('petDetails.backToList')}
        </Link>
      </div>
    );
  }

  const favorite = isFavorite(pet._id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Back button & top bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/find-pets"
          className="inline-flex items-center gap-2 text-xs font-bold text-mutedgrey hover:text-lavender-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('petDetails.backToList')}</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="p-2.5 rounded-full bg-lavender-50 text-charcoal hover:bg-lavender-100 transition-colors flex items-center gap-1.5 text-xs font-bold"
            title={t('petDetails.sharePet')}
          >
            <Share2 className="w-4 h-4 text-lavender-600" />
            <span className="hidden sm:inline">{copied ? (lang === 'en' ? 'Link Copied!' : 'లింక్ కాపీ అయింది!') : t('petDetails.sharePet')}</span>
          </button>

          <button
            type="button"
            onClick={() => toggleFavorite(pet._id)}
            className={`p-2.5 rounded-full border transition-all ${
              favorite
                ? 'bg-red-500 border-red-500 text-white shadow-sm'
                : 'bg-white border-lavender-200 text-charcoal hover:text-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Profile Header Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Photographs Gallery (lg: 7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image */}
          <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-lavender-100 border border-lavender-200 shadow-card relative">
            <img
              src={pet.images?.[selectedImage] || pet.images?.[0]}
              alt={pet.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            
            {pet.ngoVerified && (
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-lavender-700 shadow-sm flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-lavender-500" />
                <span>{t('badges.ngoVerified')}</span>
              </div>
            )}
          </div>

          {/* Thumbnails row */}
          {pet.images && pet.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {pet.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === idx ? 'border-lavender-500 shadow-md scale-105' : 'border-lavender-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Key Specs & Adoption CTA (lg: 5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-lavender-100 shadow-card space-y-6">
          
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-lavender-600">
                {pet.category === 'dog' ? t('filters.dogs') : pet.category === 'cat' ? t('filters.cats') : t('filters.other')}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize border ${
                pet.adoptionStatus === 'available' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-purple-50 text-purple-700 border-purple-200'
              }`}>
                {pet.adoptionStatus === 'available' ? t('badges.available') : t('badges.adopted')}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal mt-1 tracking-tight">
              {pet.name}
            </h1>
            <p className="text-sm font-semibold text-lavender-600 mt-0.5">
              {pet.breed}
            </p>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs font-medium">
            <div className="p-3 bg-lavender-50/70 rounded-2xl">
              <span className="text-[10px] text-mutedgrey uppercase font-bold block">{t('petDetails.ageLabel')}</span>
              <span className="text-sm font-extrabold text-charcoal">{pet.age}</span>
            </div>
            <div className="p-3 bg-lavender-50/70 rounded-2xl">
              <span className="text-[10px] text-mutedgrey uppercase font-bold block">{t('petDetails.genderLabel')}</span>
              <span className="text-sm font-extrabold text-charcoal capitalize">
                {pet.gender === 'female' ? t('filters.female') : t('filters.male')}
              </span>
            </div>
            <div className="p-3 bg-lavender-50/70 rounded-2xl">
              <span className="text-[10px] text-mutedgrey uppercase font-bold block">{t('petDetails.sizeLabel')}</span>
              <span className="text-sm font-extrabold text-charcoal capitalize">{pet.size}</span>
            </div>
            <div className="p-3 bg-lavender-50/70 rounded-2xl">
              <span className="text-[10px] text-mutedgrey uppercase font-bold block">{t('petDetails.locationLabel')}</span>
              <span className="text-sm font-extrabold text-charcoal truncate block">{pet.location}</span>
            </div>
          </div>

          {/* Personality Pills */}
          {pet.personality && pet.personality.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-charcoal uppercase tracking-wider block">
                {t('petDetails.personalityHeading')}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {pet.personality.map((trait, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-lavender-100 text-lavender-800 text-xs font-bold"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Shelter Card info */}
          <div className="p-4 rounded-2xl bg-lavender-50/60 border border-lavender-200/80 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-lavender-500 text-white flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <p className="text-[10px] text-mutedgrey uppercase font-bold">{t('petDetails.ngoLabel')}</p>
              <p className="font-extrabold text-charcoal">{pet.ngoName || 'Paws & Hope Animal Shelter'}</p>
              <p className="text-mutedgrey mt-0.5">{pet.location}</p>
            </div>
          </div>

          {/* Prominent Lavender Adoption Button */}
          <div className="space-y-2 pt-2">
            {hasApplied ? (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{t('petDetails.alreadyApplied')}</span>
              </div>
            ) : pet.adoptionStatus === 'adopted' ? (
              <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold text-center">
                {lang === 'en' ? 'This pet has already found their forever home!' : 'ఈ నేస్తం ఇప్పటికే ఆనందంగా దత్తత తీసుకోబడింది!'}
              </div>
            ) : (
              <button
                type="button"
                onClick={handleApplyClick}
                className="w-full py-4 rounded-full bg-lavender-500 hover:bg-lavender-600 text-white font-extrabold text-sm sm:text-base shadow-lavender transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5 fill-current" />
                <span>{t('petDetails.applyNowButton')}</span>
              </button>
            )}

            <p className="text-[11px] text-center text-mutedgrey font-medium">
              {lang === 'en' ? '100% free adoption procedure. No hidden purchase fees.' : '100% ఉచిత దత్తత ప్రక్రియ. ఎలాంటి కొనుగోలు రుసుము ఉండదు.'}
            </p>
          </div>

        </div>

      </div>

      {/* Description & Care Details */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-lavender-100 shadow-sm space-y-6">
        <h3 className="text-xl font-extrabold text-charcoal flex items-center gap-2">
          <Info className="w-5 h-5 text-lavender-600" />
          {t('petDetails.aboutHeading')} {pet.name}
        </h3>
        <p className="text-sm text-charcoal/80 leading-relaxed font-normal">
          {pet.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-lavender-100">
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
              <Utensils className="w-4 h-4 text-lavender-600" />
              {t('petDetails.dietHeading')}
            </h4>
            <p className="text-xs text-mutedgrey leading-relaxed">
              {pet.diet || 'Nutritious balanced dry kibble twice daily with fresh clean water.'}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-lavender-600" />
              {lang === 'en' ? 'Activity & Exercise Level' : 'వ్యాయామం & చురుకుదనం'}
            </h4>
            <p className="text-xs text-mutedgrey leading-relaxed capitalize">
              {pet.activityLevel || 'Moderate'} {lang === 'en' ? 'energy. Enjoys playful sessions and regular neighborhood strolls.' : 'శక్తి స్థాయి. నడకలు మరియు ఆటలను ఇష్టపడుతుంది.'}
            </p>
          </div>
        </div>
      </div>

      {/* Section 11: Pet Health Passport Component */}
      <HealthPassportView pet={pet} />

      {/* Modal for Application */}
      <AdoptionModal
        pet={pet}
        isOpen={isAdoptionModalOpen}
        onClose={() => setIsAdoptionModalOpen(false)}
        onSuccess={() => {
          setHasApplied(true);
        }}
      />

    </div>
  );
};
