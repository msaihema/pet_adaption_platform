import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, RotateCcw, Dog, Cat, Sparkles, MapPin, HeartPulse, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const SearchFilterSection = ({ onFilterChange, initialFilters = {}, isStandAlone = false }) => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  const [category, setCategory] = useState(initialFilters.category || 'all');
  const [breed, setBreed] = useState(initialFilters.breed || '');
  const [ageGroup, setAgeGroup] = useState(initialFilters.ageGroup || 'all');
  const [gender, setGender] = useState(initialFilters.gender || 'all');
  const [location, setLocation] = useState(initialFilters.location || 'all');
  const [healthStatus, setHealthStatus] = useState(initialFilters.healthStatus || 'all');
  const [vaccinated, setVaccinated] = useState(initialFilters.vaccinated || 'all');
  const [keyword, setKeyword] = useState(initialFilters.keyword || '');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const query = {
      category,
      breed,
      ageGroup,
      gender,
      location,
      healthStatus,
      vaccinated,
      keyword
    };

    if (onFilterChange) {
      onFilterChange(query);
    } else {
      // Build query params and navigate to /find-pets
      const params = new URLSearchParams();
      if (category !== 'all') params.append('category', category);
      if (breed) params.append('breed', breed);
      if (ageGroup !== 'all') params.append('ageGroup', ageGroup);
      if (gender !== 'all') params.append('gender', gender);
      if (location !== 'all') params.append('location', location);
      if (healthStatus !== 'all') params.append('healthStatus', healthStatus);
      if (vaccinated !== 'all') params.append('vaccinated', vaccinated);
      if (keyword) params.append('keyword', keyword);
      navigate(`/find-pets?${params.toString()}`);
    }
  };

  const handleReset = () => {
    setCategory('all');
    setBreed('');
    setAgeGroup('all');
    setGender('all');
    setLocation('all');
    setHealthStatus('all');
    setVaccinated('all');
    setKeyword('');
    if (onFilterChange) {
      onFilterChange({
        category: 'all',
        breed: '',
        ageGroup: 'all',
        gender: 'all',
        location: 'all',
        healthStatus: 'all',
        vaccinated: 'all',
        keyword: ''
      });
    }
  };

  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isStandAlone ? '' : '-mt-14 relative z-20'}`}>
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-lavender-100">
        
        {/* Top Category Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-lavender-100">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => { setCategory('all'); }}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                category === 'all'
                  ? 'bg-lavender-500 text-white shadow-md shadow-lavender-500/25'
                  : 'bg-lavender-50 text-charcoal hover:bg-lavender-100'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              {t('filters.allCategories')}
            </button>
            <button
              type="button"
              onClick={() => { setCategory('dog'); }}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                category === 'dog'
                  ? 'bg-lavender-500 text-white shadow-md shadow-lavender-500/25'
                  : 'bg-lavender-50 text-charcoal hover:bg-lavender-100'
              }`}
            >
              <Dog className="w-4 h-4" />
              {t('filters.dogs')}
            </button>
            <button
              type="button"
              onClick={() => { setCategory('cat'); }}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                category === 'cat'
                  ? 'bg-lavender-500 text-white shadow-md shadow-lavender-500/25'
                  : 'bg-lavender-50 text-charcoal hover:bg-lavender-100'
              }`}
            >
              <Cat className="w-4 h-4" />
              {t('filters.cats')}
            </button>
          </div>

          {/* Advanced toggle & reset */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs font-bold text-lavender-600 hover:text-lavender-700 flex items-center gap-1.5 transition-colors"
            >
              <Filter className="w-3.5 h-3.5" />
              {showAdvanced
                ? (lang === 'en' ? 'Fewer Filters' : 'తక్కువ ఫిల్టర్లు')
                : (lang === 'en' ? 'More Filters' : 'మరిన్ని ఫిల్టర్లు')}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-mutedgrey hover:text-charcoal flex items-center gap-1 transition-colors"
              title={t('filters.resetFilters')}
            >
              <RotateCcw className="w-3 h-3" />
              {t('filters.resetFilters')}
            </button>
          </div>
        </div>

        {/* Primary Filter Grid */}
        <form onSubmit={handleSearch} className="pt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Keyword Search Input */}
            <div className="relative">
              <label className="block text-xs font-bold text-charcoal mb-1">
                {lang === 'en' ? 'Search Keyword' : 'శోధన పదం'}
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-mutedgrey absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder={t('filters.keywordSearch')}
                  className="w-full pl-9 pr-3 py-2.5 bg-lavender-50/70 border border-lavender-200 rounded-2xl text-xs sm:text-sm text-charcoal placeholder:text-mutedgrey/70 focus:outline-none focus:ring-2 focus:ring-lavender-400 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Breed Filter */}
            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                {t('filters.breed')}
              </label>
              <select
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                className="w-full px-3 py-2.5 bg-lavender-50/70 border border-lavender-200 rounded-2xl text-xs sm:text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-lavender-400 focus:bg-white transition-all"
              >
                <option value="">{t('filters.allBreeds')}</option>
                <option value="Retriever">Golden Retriever</option>
                <option value="Beagle">Beagle</option>
                <option value="Labrador">Labrador</option>
                <option value="Persian">Persian Mix</option>
                <option value="Indie">Indie / Desi</option>
                <option value="Tabby">Tabby Kitten</option>
                <option value="Shih Tzu">Shih Tzu</option>
                <option value="German Shepherd">German Shepherd</option>
                <option value="British">British Shorthair</option>
                <option value="Cocker Spaniel">Cocker Spaniel</option>
                <option value="Siamese">Siamese Mix</option>
                <option value="Pomeranian">Pomeranian</option>
              </select>
            </div>

            {/* Age Filter */}
            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                {t('filters.age')}
              </label>
              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                className="w-full px-3 py-2.5 bg-lavender-50/70 border border-lavender-200 rounded-2xl text-xs sm:text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-lavender-400 focus:bg-white transition-all"
              >
                <option value="all">{t('filters.allAges')}</option>
                <option value="puppy">{t('filters.puppy')}</option>
                <option value="young">{t('filters.young')}</option>
                <option value="adult">{t('filters.adult')}</option>
                <option value="senior">{t('filters.senior')}</option>
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                {t('filters.location')}
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-mutedgrey absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-8 pr-3 py-2.5 bg-lavender-50/70 border border-lavender-200 rounded-2xl text-xs sm:text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-lavender-400 focus:bg-white transition-all"
                >
                  <option value="all">{t('filters.allLocations')}</option>
                  <option value="Hyderabad">Hyderabad, Telangana</option>
                  <option value="Bengaluru">Bengaluru, Karnataka</option>
                  <option value="Visakhapatnam">Visakhapatnam, AP</option>
                  <option value="Vijayawada">Vijayawada, AP</option>
                  <option value="Chennai">Chennai, Tamil Nadu</option>
                </select>
              </div>
            </div>

          </div>

          {/* Advanced Filters Expandable Row */}
          {showAdvanced && (
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-lavender-100 animate-in fade-in">
              {/* Gender */}
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">
                  {t('filters.gender')}
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-3 py-2 bg-lavender-50/70 border border-lavender-200 rounded-xl text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-lavender-400"
                >
                  <option value="all">{t('filters.allGenders')}</option>
                  <option value="male">{t('filters.male')}</option>
                  <option value="female">{t('filters.female')}</option>
                </select>
              </div>

              {/* Health Status */}
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">
                  {t('filters.healthStatus')}
                </label>
                <select
                  value={healthStatus}
                  onChange={(e) => setHealthStatus(e.target.value)}
                  className="w-full px-3 py-2 bg-lavender-50/70 border border-lavender-200 rounded-xl text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-lavender-400"
                >
                  <option value="all">{t('filters.allHealth')}</option>
                  <option value="healthy">{t('filters.healthy')}</option>
                  <option value="special_needs">{t('filters.specialNeeds')}</option>
                  <option value="under_treatment">{t('filters.underTreatment')}</option>
                </select>
              </div>

              {/* Vaccination Status */}
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">
                  {t('filters.vaccinationStatus')}
                </label>
                <select
                  value={vaccinated}
                  onChange={(e) => setVaccinated(e.target.value)}
                  className="w-full px-3 py-2 bg-lavender-50/70 border border-lavender-200 rounded-xl text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-lavender-400"
                >
                  <option value="all">{t('filters.allVaccination')}</option>
                  <option value="true">{t('filters.vaccinatedOnly')}</option>
                  <option value="false">{t('filters.notVaccinated')}</option>
                </select>
              </div>
            </div>
          )}

          {/* Search Action Button */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-lavender-500 hover:bg-lavender-600 text-white font-bold text-sm shadow-md shadow-lavender-500/30 hover:shadow-lavender-600/40 transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              {t('filters.searchButton')}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
