import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Heart, Lock, Mail, User, Phone, MapPin, Building2, AlertCircle, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export const RegisterPage = () => {
  const { t, lang } = useLanguage();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [role, setRole] = useState(searchParams.get('role') === 'ngo' ? 'ngo' : 'adopter');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // NGO specific
  const [orgName, setOrgName] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [website, setWebsite] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        name,
        email,
        password,
        role,
        phone,
        address,
        ngoDetails: role === 'ngo' ? {
          organizationName: orgName || name,
          registrationNumber: regNumber,
          website
        } : undefined
      };

      const data = await register(payload);
      if (data.user.role === 'ngo') {
        navigate('/ngo-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Register error:', err);
      setError(err.response?.data?.message || (lang === 'en' ? 'Registration failed. Email may already be in use.' : 'నమోదు విఫలమైంది. ఈ ఈమెయిల్ ఇప్పటికే వాడుకలో ఉండవచ్చు.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 space-y-6">
      
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-lavender-500 text-white flex items-center justify-center mx-auto shadow-md">
          <Heart className="w-6 h-6 fill-current" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal">
          {t('auth.createAccount')}
        </h1>
        <p className="text-xs sm:text-sm text-mutedgrey">
          {t('auth.registerSubtitle')}
        </p>
      </div>

      {/* Main Register Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-lavender-100 shadow-card space-y-6">
        
        {/* Role Selector Tabs */}
        <div>
          <label className="block text-xs font-bold text-charcoal mb-2">
            {t('auth.iAmA')}
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRole('adopter')}
              className={`py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border transition-all ${
                role === 'adopter'
                  ? 'bg-lavender-500 text-white border-lavender-500 shadow-md shadow-lavender-500/20'
                  : 'bg-lavender-50/60 border-lavender-200 text-charcoal hover:bg-lavender-100'
              }`}
            >
              <User className="w-4 h-4" />
              <span>{t('auth.roleAdopter')}</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('ngo')}
              className={`py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border transition-all ${
                role === 'ngo'
                  ? 'bg-lavender-500 text-white border-lavender-500 shadow-md shadow-lavender-500/20'
                  : 'bg-lavender-50/60 border-lavender-200 text-charcoal hover:bg-lavender-100'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>{t('auth.roleNgo')}</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                {role === 'ngo' ? t('auth.fullName') + ' (Contact Person)' : t('auth.fullName')} *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-mutedgrey absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Varma"
                  required
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-lavender-200 text-xs sm:text-sm focus:ring-2 focus:ring-lavender-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                {t('auth.email')} *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-mutedgrey absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-lavender-200 text-xs sm:text-sm focus:ring-2 focus:ring-lavender-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                {t('auth.phone')} *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-mutedgrey absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-lavender-200 text-xs sm:text-sm focus:ring-2 focus:ring-lavender-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                {t('auth.password')} *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-mutedgrey absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  required
                  minLength={6}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-lavender-200 text-xs sm:text-sm focus:ring-2 focus:ring-lavender-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal mb-1">
              {t('auth.address')}
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-mutedgrey absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="City, State (e.g. Hyderabad, Telangana)"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-lavender-200 text-xs sm:text-sm focus:ring-2 focus:ring-lavender-400 focus:outline-none"
              />
            </div>
          </div>

          {/* NGO Specific Fields */}
          {role === 'ngo' && (
            <div className="pt-3 border-t border-lavender-100 space-y-4">
              <p className="text-xs font-extrabold text-lavender-700 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                {lang === 'en' ? 'Shelter / Organization Credentials' : 'ఆశ్రమం / సంస్థ వివరాలు'}
              </p>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">
                  {t('auth.ngoOrgName')} *
                </label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="e.g. Paws & Hope Animal Welfare Society"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-lavender-200 text-xs sm:text-sm focus:ring-2 focus:ring-lavender-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">
                    {t('auth.ngoRegNumber')} *
                  </label>
                  <input
                    type="text"
                    value={regNumber}
                    onChange={(e) => setRegNumber(e.target.value)}
                    placeholder="TS/HYD/NGO/2021/8892"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-lavender-200 text-xs sm:text-sm focus:ring-2 focus:ring-lavender-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">
                    {t('auth.ngoWebsite')}
                  </label>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://pawshope.org"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-lavender-200 text-xs sm:text-sm focus:ring-2 focus:ring-lavender-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-lavender-500 hover:bg-lavender-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-lavender-500/25 transition-all"
            >
              {loading ? 'Registering...' : t('auth.registerBtn')}
            </button>
          </div>
        </form>

      </div>

      <p className="text-center text-xs text-mutedgrey">
        {t('auth.alreadyHaveAccount')}{' '}
        <Link to="/login" className="font-bold text-lavender-600 hover:text-lavender-700">
          {t('auth.loginBtn')}
        </Link>
      </p>

    </div>
  );
};
