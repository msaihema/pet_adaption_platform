import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, Globe, User, Menu, X, ShieldCheck, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';

export const Navbar = () => {
  const { lang, setLanguage, t } = useLanguage();
  const { user, isAuthenticated, logout, isAdopter, isNgo, isAdmin } = useAuth();
  const { favorites } = useFavorites();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/find-pets', label: t('nav.findPet') },
    { path: '/how-it-works', label: t('nav.howItWorks') },
    { path: '/pet-care', label: t('nav.petCare') },
    { path: '/lost-found', label: t('nav.lostFound') },
    { path: '/matchmaker', label: t('nav.quiz') },
    { path: '/about', label: t('nav.aboutUs') },
    { path: '/contact', label: t('nav.contactUs') },
  ];

  const getDashboardPath = () => {
    if (isAdmin) return '/admin';
    if (isNgo) return '/ngo-dashboard';
    return '/dashboard';
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-lavender-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-lavender-500 to-lavender-400 flex items-center justify-center text-white shadow-md shadow-lavender-500/25 group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-charcoal flex items-center gap-1.5 font-sans">
                Pet Love
                <span className="w-2 h-2 rounded-full bg-lavender-500 inline-block"></span>
              </span>
              <span className="text-[11px] font-medium text-mutedgrey -mt-1 hidden sm:block">
                {t('tagline')}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  isActive(link.path)
                    ? 'text-lavender-600 bg-lavender-50'
                    : 'text-charcoal hover:text-lavender-600 hover:bg-lavender-50/60'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Icons: Language, Favorites & Auth */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Language Selector Pill */}
            <div className="flex items-center bg-lavender-100/80 p-1 rounded-full border border-lavender-200">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  lang === 'en'
                    ? 'bg-lavender-500 text-white shadow-sm'
                    : 'text-charcoal hover:text-lavender-600'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage('te')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  lang === 'te'
                    ? 'bg-lavender-500 text-white shadow-sm'
                    : 'text-charcoal hover:text-lavender-600'
                }`}
              >
                తెలుగు
              </button>
            </div>

            {/* Favorites Icon */}
            <Link
              to="/dashboard?tab=favorites"
              className="relative p-2.5 rounded-full text-charcoal hover:text-lavender-600 hover:bg-lavender-50 transition-colors"
              title={t('nav.favorites')}
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-lavender-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* User Profile or Login/Register */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-lavender-50 border border-lavender-200 hover:border-lavender-400 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-lavender-500 text-white flex items-center justify-center font-bold text-sm">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-xs font-bold text-charcoal leading-tight truncate max-w-[100px]">
                      {user?.name}
                    </p>
                    <span className="text-[10px] text-lavender-600 font-semibold uppercase">
                      {user?.role}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-mutedgrey" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-card border border-lavender-100 py-2 z-50 animate-in fade-in"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs font-semibold text-charcoal">{user?.name}</p>
                      <p className="text-[11px] text-mutedgrey truncate">{user?.email}</p>
                      {user?.verificationStatus && (
                        <div className="mt-1 flex items-center gap-1 text-[11px] text-lavender-600 font-medium">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span className="capitalize">{user.verificationStatus}</span>
                        </div>
                      )}
                    </div>

                    <Link
                      to={getDashboardPath()}
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-charcoal hover:bg-lavender-50 hover:text-lavender-600 font-medium"
                    >
                      <LayoutDashboard className="w-4 h-4 text-lavender-500" />
                      {isAdmin ? t('nav.adminPortal') : isNgo ? t('nav.ngoPortal') : t('nav.dashboard')}
                    </Link>

                    {isAdopter && (
                      <Link
                        to="/dashboard?tab=applications"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-charcoal hover:bg-lavender-50 hover:text-lavender-600 font-medium"
                      >
                        <Heart className="w-4 h-4 text-lavender-500" />
                        {t('nav.myApplications')}
                      </Link>
                    )}

                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                        navigate('/');
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      {t('nav.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-bold text-charcoal hover:text-lavender-600 transition-colors"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-full bg-lavender-500 hover:bg-lavender-600 text-white text-sm font-bold shadow-md shadow-lavender-500/20 hover:shadow-lavender-500/35 transition-all"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 xl:hidden">
            {/* Quick Mobile Language Switcher */}
            <button
              onClick={() => setLanguage(lang === 'en' ? 'te' : 'en')}
              className="p-2 text-xs font-bold rounded-lg bg-lavender-100 text-lavender-700"
            >
              {lang === 'en' ? 'తెలుగు' : 'EN'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-charcoal hover:bg-lavender-50 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-lavender-100 px-6 py-5 space-y-4 shadow-xl">
          <div className="flex justify-between items-center pb-3 border-b border-lavender-100">
            <span className="text-xs font-semibold text-mutedgrey uppercase tracking-wider">
              {lang === 'en' ? 'Select Language' : 'భాషను ఎంచుకోండి'}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  lang === 'en' ? 'bg-lavender-500 text-white' : 'bg-lavender-100 text-charcoal'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('te')}
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  lang === 'te' ? 'bg-lavender-500 text-white' : 'bg-lavender-100 text-charcoal'
                }`}
              >
                తెలుగు
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive(link.path)
                    ? 'text-lavender-600 bg-lavender-50'
                    : 'text-charcoal hover:bg-lavender-50/60'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-lavender-100 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <Link
                  to={getDashboardPath()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-4 rounded-xl bg-lavender-500 text-white text-center font-bold text-sm shadow-sm"
                >
                  {isAdmin ? t('nav.adminPortal') : isNgo ? t('nav.ngoPortal') : t('nav.dashboard')}
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                    navigate('/');
                  }}
                  className="w-full py-2.5 text-red-600 font-bold text-sm text-center"
                >
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2.5 text-center font-bold text-charcoal bg-lavender-100 rounded-xl text-sm"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2.5 text-center font-bold text-white bg-lavender-500 rounded-xl text-sm shadow-sm"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
