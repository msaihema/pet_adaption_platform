import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, ShieldCheck, Sparkles, Syringe, Calendar, UserCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';

export const PetCard = ({ pet }) => {
  const { t, lang } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();

  const favorite = isFavorite(pet._id);

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'adopted':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'available':
        return t('badges.available');
      case 'pending':
        return t('badges.pending');
      case 'adopted':
        return t('badges.adopted');
      default:
        return status;
    }
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-lavender-100 shadow-sm hover:shadow-card hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full">
      
      {/* Pet Image Frame */}
      <div className="relative aspect-[4/3] overflow-hidden bg-lavender-100">
        <img
          src={pet.images && pet.images[0] ? pet.images[0] : 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80'}
          alt={pet.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient overlay on bottom of image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

        {/* Favorite Heart Toggle Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(pet._id);
          }}
          className={`absolute top-3.5 right-3.5 p-2.5 rounded-full backdrop-blur-md transition-all ${
            favorite
              ? 'bg-red-500 text-white shadow-md shadow-red-500/30 scale-110'
              : 'bg-white/80 hover:bg-white text-charcoal hover:text-red-500 shadow-sm'
          }`}
          title={favorite ? t('petDetails.removeFromFavorites') : t('petDetails.addToFavorites')}
        >
          <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
        </button>

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 max-w-[80%]">
          {pet.ngoVerified && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 text-lavender-700 text-[11px] font-bold shadow-sm backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-lavender-500" />
              {t('badges.ngoVerified')}
            </span>
          )}

          {pet.featured && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400 text-amber-950 text-[11px] font-bold shadow-sm">
              <Sparkles className="w-3 h-3" />
              {t('badges.featured')}
            </span>
          )}
        </div>

        {/* Status Badge Over Image Bottom */}
        <div className="absolute bottom-3 left-3.5">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-sm ${getStatusColor(pet.adoptionStatus)}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5"></span>
            {getStatusLabel(pet.adoptionStatus)}
          </span>
        </div>
      </div>

      {/* Card Details Body */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        
        <div>
          {/* Pet Name & Gender */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-xl font-extrabold text-charcoal group-hover:text-lavender-600 transition-colors">
                {pet.name}
              </h3>
              <p className="text-xs font-semibold text-lavender-600 mt-0.5">
                {pet.breed}
              </p>
            </div>
            <span className={`px-2.5 py-1 rounded-xl text-xs font-bold capitalize ${
              pet.gender === 'female' ? 'bg-pink-50 text-pink-700 border border-pink-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
            }`}>
              {pet.gender === 'female' ? t('filters.female') : t('filters.male')}
            </span>
          </div>

          {/* Quick Specs Chips */}
          <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-medium text-mutedgrey">
            <div className="flex items-center gap-1.5 bg-lavender-50/60 p-2 rounded-xl">
              <Calendar className="w-3.5 h-3.5 text-lavender-500" />
              <span className="truncate">{pet.age}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-lavender-50/60 p-2 rounded-xl">
              <MapPin className="w-3.5 h-3.5 text-lavender-500" />
              <span className="truncate">{pet.location.split(',')[0]}</span>
            </div>
          </div>

          {/* Health & Vaccination Indicators */}
          <div className="flex items-center gap-2 mt-3 text-[11px] font-semibold">
            {pet.vaccinated && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100">
                <Syringe className="w-3 h-3 text-emerald-600" />
                {t('badges.vaccinated')}
              </span>
            )}
            <span className={`px-2.5 py-1 rounded-lg border capitalize ${
              pet.healthStatus === 'healthy'
                ? 'bg-lavender-50 text-lavender-700 border-lavender-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}>
              {pet.healthStatus === 'healthy' ? t('filters.healthy') : t('filters.specialNeeds')}
            </span>
          </div>
        </div>

        {/* View Details Action Button */}
        <div className="pt-2 border-t border-lavender-100">
          <Link
            to={`/pets/${pet._id}`}
            className="w-full py-2.5 px-4 rounded-2xl bg-lavender-50 group-hover:bg-lavender-500 text-lavender-700 group-hover:text-white font-bold text-xs sm:text-sm text-center transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm group-hover:shadow-lavender-500/25"
          >
            <span>{t('badges.viewDetails')}</span>
            <span className="text-xs transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

      </div>

    </div>
  );
};
