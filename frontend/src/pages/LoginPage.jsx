import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Heart, Lock, Mail, AlertCircle, Sparkles, Building2, User, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  const { t, lang } = useLanguage();
  const { login, demoLogin, isAdopter, isNgo, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [forgotModal, setForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(email, password);
      if (data.user.role === 'admin') navigate('/admin');
      else if (data.user.role === 'ngo') navigate('/ngo-dashboard');
      else navigate(redirect);
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || (lang === 'en' ? 'Invalid email or password.' : 'ఈమెయిల్ లేదా పాస్‌వర్డ్ సరైనది కాదు.'));
    } finally {
      setLoading(false);
    }
  };

  const handleDemoClick = async (role) => {
    setError('');
    setLoading(true);
    try {
      const data = await demoLogin(role);
      if (role === 'admin') navigate('/admin');
      else if (role === 'ngo') navigate('/ngo-dashboard');
      else navigate('/dashboard');
    } catch (err) {
      setError('Demo login failed. Make sure server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setForgotSuccess(lang === 'en' ? 'A password reset link has been dispatched to your email.' : 'పాస్‌వర్డ్ రీసెట్ లింక్ మీ ఈమెయిల్‌కు పంపబడింది.');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-lavender-500 text-white flex items-center justify-center mx-auto shadow-md">
          <Heart className="w-6 h-6 fill-current" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal">
          {t('auth.welcomeBack')}
        </h1>
        <p className="text-xs sm:text-sm text-mutedgrey">
          {t('auth.loginSubtitle')}
        </p>
      </div>

      {/* Main Login Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-lavender-100 shadow-card space-y-6">
        
        {error && (
          <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-charcoal mb-1">
              {t('auth.email')}
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

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-charcoal">
                {t('auth.password')}
              </label>
              <button
                type="button"
                onClick={() => setForgotModal(true)}
                className="text-[11px] font-semibold text-lavender-600 hover:text-lavender-700"
              >
                {t('auth.forgotPassword')}
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-mutedgrey absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-lavender-200 text-xs sm:text-sm focus:ring-2 focus:ring-lavender-400 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-lavender-500 hover:bg-lavender-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-lavender-500/25 transition-all"
          >
            {loading ? 'Signing In...' : t('auth.loginBtn')}
          </button>
        </form>

        {/* Demo 1-Click Logins */}
        <div className="pt-4 border-t border-lavender-100 space-y-2.5">
          <p className="text-[11px] font-bold text-mutedgrey uppercase tracking-wider text-center">
            {t('auth.demoLogins')}
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleDemoClick('adopter')}
              className="py-2 px-1 text-[11px] font-bold rounded-xl bg-lavender-50 hover:bg-lavender-100 text-lavender-700 border border-lavender-200/80 transition-colors flex flex-col items-center gap-1"
            >
              <User className="w-3.5 h-3.5" />
              <span>{t('auth.demoAdopter')}</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoClick('ngo')}
              className="py-2 px-1 text-[11px] font-bold rounded-xl bg-lavender-50 hover:bg-lavender-100 text-lavender-700 border border-lavender-200/80 transition-colors flex flex-col items-center gap-1"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{t('auth.demoNgo')}</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoClick('admin')}
              className="py-2 px-1 text-[11px] font-bold rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 transition-colors flex flex-col items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('auth.demoAdmin')}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Register redirect */}
      <p className="text-center text-xs text-mutedgrey">
        {t('auth.dontHaveAccount')}{' '}
        <Link to="/register" className="font-bold text-lavender-600 hover:text-lavender-700">
          {t('auth.registerBtn')}
        </Link>
      </p>

      {/* Forgot Password Modal */}
      {forgotModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-lavender-100 animate-in fade-in">
            <h3 className="text-base font-extrabold text-charcoal">
              {t('auth.resetPasswordTitle')}
            </h3>
            <p className="text-xs text-mutedgrey">
              {t('auth.resetPasswordSubtitle')}
            </p>

            {forgotSuccess ? (
              <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl font-medium">
                {forgotSuccess}
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-3">
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full px-3 py-2 text-xs border rounded-xl focus:outline-none focus:ring-2 focus:ring-lavender-400"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-lavender-500 text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  {t('auth.sendResetLink')}
                </button>
              </form>
            )}

            <button
              type="button"
              onClick={() => { setForgotModal(false); setForgotSuccess(''); }}
              className="w-full text-center text-xs text-mutedgrey hover:text-charcoal pt-2"
            >
              {lang === 'en' ? 'Close' : 'ముగించండి'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
