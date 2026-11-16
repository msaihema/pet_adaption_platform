import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Search, Filter, RotateCcw, Dog, Cat, Sparkles, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { PetCard } from '../components/PetCard';
import { useLanguage } from '../context/LanguageContext';

export const FindPetsPage = () => {
  const { t, lang } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states initialized from URL or defaults
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [breed, setBreed] = useState(searchParams.get('breed') || '');
  const [ageGroup, setAgeGroup] = useState(searchParams.get('ageGroup') || 'all');
  const [gender, setGender] = useState(searchParams.get('gender') || 'all');
  const [location, setLocation] = useState(searchParams.get('location') || 'all');
  const [healthStatus, setHealthStatus] = useState(searchParams.get('healthStatus') || 'all');
  const [vaccinated, setVaccinated] = useState(searchParams.get('vaccinated') || 'all');
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'name_asc', 'age'

  // Sync state if searchParams in URL change
  useEffect(() => {
    if (searchParams.get('category')) setCategory(searchParams.get('category'));
    if (searchParams.get('breed')) setBreed(searchParams.get('breed'));
    if (searchParams.get('ageGroup')) setAgeGroup(searchParams.get('ageGroup'));
    if (searchParams.get('gender')) setGender(searchParams.get('gender'));
    if (searchParams.get('location')) setLocation(searchParams.get('location'));
    if (searchParams.get('healthStatus')) setHealthStatus(searchParams.get('healthStatus'));
    if (searchParams.get('vaccinated')) setVaccinated(searchParams.get('vaccinated'));
    if (searchParams.get('keyword')) setKeyword(searchParams.get('keyword'));
  }, [searchParams]);

  const fetchPets = async () => {
    setLoading(true);
    try {
      const params = {};
      // Public search defaults to available pets
      params.adoptionStatus = 'available';

      if (category !== 'all') params.category = category;
      if (breed) params.breed = breed;
      if (ageGroup !== 'all') params.ageGroup = ageGroup;
      if (gender !== 'all') params.gender = gender;
      if (location !== 'all') params.location = location;
      if (healthStatus !== 'all') params.healthStatus = healthStatus;
      if (vaccinated !== 'all') params.vaccinated = vaccinated;
      if (keyword) params.keyword = keyword;

      const res = await axios.get('/api/pets', { params });
      let list = res.data.pets || [];

      // Sorting
      if (sortBy === 'name_asc') {
        list.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortBy === 'newest') {
        list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      setPets(list);
    } catch (err) {
      console.error('Error fetching pets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, [category, breed, ageGroup, gender, location, healthStatus, vaccinated, keyword, sortBy]);

  const handleReset = () => {
    setCategory('all');
    setBreed('');
    setAgeGroup('all');
    setGender('all');
    setLocation('all');
    setHealthStatus('all');
    setVaccinated('all');
    setKeyword('');
    setSortBy('newest');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="rounded-3xl bg-lavender-100/80 p-8 sm:p-10 border border-lavender-200/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-lavender-700">
            {t('nav.findPet')}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight">
            {lang === 'en' ? 'Adoptable Pets Ready for Love' : 'దత్తతకు సిద్ధంగా ఉన్న ముద్దుల నేస్తాలు'}
          </h1>
          <p className="text-xs sm:text-sm text-mutedgrey leading-relaxed">
            {lang === 'en'
              ? 'Filter by breed, personality, age and location. Every pet is vaccinated and certified by shelter partners.'
              : 'జాతి, వయస్సు, స్వభావం మరియు ప్రాంతం ఆధారంగా ఎంచుకోండి. ప్రతి జంతువుకు టీకాలు మరియు ఆశ్రమ ధృవీకరణ పూర్తయింది.'}
          </p>
        </div>

        {/* Live Counter Badge */}
        <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-lavender-200/80 text-center min-w-[180px]">
          <span className="text-3xl font-extrabold text-lavender-600 font-sans block">
            {pets.length}
          </span>
          <span className="text-xs font-bold text-mutedgrey uppercase tracking-wider">
            {t('filters.resultsFound')}
          </span>
        </div>
      </div>

      {/* Main Filter and Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Filter Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-lavender-100 shadow-card sticky top-28 space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-lavender-100">
              <h3 className="text-sm font-extrabold text-charcoal flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-lavender-600" />
                {t('filters.title')}
              </h3>
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

            {/* Keyword Input */}
            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                {lang === 'en' ? 'Keyword' : 'శోధన పదం'}
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-mutedgrey absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder={t('filters.keywordSearch')}
                  className="w-full pl-8 pr-3 py-2 text-xs bg-lavender-50/70 border border-lavender-200 rounded-xl focus:ring-2 focus:ring-lavender-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                {t('filters.petCategory')}
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setCategory('all')}
                  className={`py-2 rounded-xl text-center transition-all ${
                    category === 'all' ? 'bg-lavender-500 text-white shadow-sm' : 'bg-lavender-50 text-charcoal hover:bg-lavender-100'
                  }`}
                >
                  {t('filters.allCategories')}
                </button>
                <button
                  type="button"
                  onClick={() => setCategory('dog')}
                  className={`py-2 rounded-xl text-center transition-all ${
                    category === 'dog' ? 'bg-lavender-500 text-white shadow-sm' : 'bg-lavender-50 text-charcoal hover:bg-lavender-100'
                  }`}
                >
                  {t('filters.dogs')}
                </button>
                <button
                  type="button"
                  onClick={() => setCategory('cat')}
                  className={`py-2 rounded-xl text-center transition-all ${
                    category === 'cat' ? 'bg-lavender-500 text-white shadow-sm' : 'bg-lavender-50 text-charcoal hover:bg-lavender-100'
                  }`}
                >
                  {t('filters.cats')}
                </button>
              </div>
            </div>

            {/* Breed */}
            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                {t('filters.breed')}
              </label>
              <select
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-lavender-50/70 border border-lavender-200 rounded-xl focus:ring-2 focus:ring-lavender-400"
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

            {/* Age */}
            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                {t('filters.age')}
              </label>
              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-lavender-50/70 border border-lavender-200 rounded-xl focus:ring-2 focus:ring-lavender-400"
              >
                <option value="all">{t('filters.allAges')}</option>
                <option value="puppy">{t('filters.puppy')}</option>
                <option value="young">{t('filters.young')}</option>
                <option value="adult">{t('filters.adult')}</option>
                <option value="senior">{t('filters.senior')}</option>
              </select>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                {t('filters.gender')}
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-lavender-50/70 border border-lavender-200 rounded-xl focus:ring-2 focus:ring-lavender-400"
              >
                <option value="all">{t('filters.allGenders')}</option>
                <option value="male">{t('filters.male')}</option>
                <option value="female">{t('filters.female')}</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                {t('filters.location')}
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-lavender-50/70 border border-lavender-200 rounded-xl focus:ring-2 focus:ring-lavender-400"
              >
                <option value="all">{t('filters.allLocations')}</option>
                <option value="Hyderabad">Hyderabad, Telangana</option>
                <option value="Bengaluru">Bengaluru, Karnataka</option>
                <option value="Visakhapatnam">Visakhapatnam, Andhra Pradesh</option>
                <option value="Vijayawada">Vijayawada, Andhra Pradesh</option>
                <option value="Chennai">Chennai, Tamil Nadu</option>
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
                className="w-full px-3 py-2 text-xs bg-lavender-50/70 border border-lavender-200 rounded-xl focus:ring-2 focus:ring-lavender-400"
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
                className="w-full px-3 py-2 text-xs bg-lavender-50/70 border border-lavender-200 rounded-xl focus:ring-2 focus:ring-lavender-400"
              >
                <option value="all">{t('filters.allVaccination')}</option>
                <option value="true">{t('filters.vaccinatedOnly')}</option>
                <option value="false">{t('filters.notVaccinated')}</option>
              </select>
            </div>

          </div>
        </div>

        {/* Right Results Grid */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Sorting and Active filter counts bar */}
          <div className="bg-white rounded-2xl p-4 border border-lavender-100 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-semibold text-mutedgrey">
              {lang === 'en' ? `Showing ${pets.length} companion profiles` : `${pets.length} ప్రొఫైల్స్ కనిపిస్తున్నాయి`}
            </span>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-mutedgrey" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 text-xs font-bold rounded-xl border border-lavender-200 bg-lavender-50/50 text-charcoal focus:outline-none"
              >
                <option value="newest">{lang === 'en' ? 'Recently Rescued' : 'ఇటీవల రక్షించినవి'}</option>
                <option value="name_asc">{lang === 'en' ? 'Alphabetical (A-Z)' : 'అక్షరక్రమం (A-Z)'}</option>
              </select>
            </div>
          </div>

          {/* Cards Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="h-96 rounded-3xl bg-lavender-100/60 animate-pulse" />
              ))}
            </div>
          ) : pets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pets.map((pet) => (
                <PetCard key={pet._id} pet={pet} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center rounded-3xl bg-lavender-50 border border-lavender-100 space-y-4">
              <div className="w-14 h-14 rounded-full bg-lavender-200 text-lavender-700 flex items-center justify-center mx-auto">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-charcoal">
                {lang === 'en' ? 'No pets match your criteria' : 'మీ ఎంపికకు సరిపోయే జంతువులు లభించలేదు'}
              </h3>
              <p className="text-xs text-mutedgrey max-w-sm mx-auto">
                {lang === 'en' ? 'Try adjusting or clearing your filters to see more adorable companions.' : 'మరిన్ని జంతువులను చూడటానికి దయచేసి ఫిల్టర్లను రీసెట్ చేయండి.'}
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full bg-lavender-500 text-white font-bold text-xs"
              >
                {t('filters.resetFilters')}
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
