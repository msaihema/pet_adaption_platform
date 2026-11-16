import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Instagram, Facebook, Twitter, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer = () => {
  const { lang, setLanguage, t } = useLanguage();

  return (
    <footer className="bg-lavender-100 text-charcoal border-t border-lavender-200/70 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-lavender-500 flex items-center justify-center text-white shadow-md">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-charcoal font-sans">
                Pet Love
              </span>
            </Link>
            <p className="text-sm text-mutedgrey leading-relaxed max-w-sm">
              {t('footer.aboutText')}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#instagram" className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-lavender-600 hover:bg-lavender-500 hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#facebook" className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-lavender-600 hover:bg-lavender-500 hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#twitter" className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-lavender-600 hover:bg-lavender-500 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-charcoal">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2.5 text-sm text-mutedgrey font-medium">
              <li>
                <Link to="/find-pets" className="hover:text-lavender-600 transition-colors">
                  {t('nav.findPet')}
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-lavender-600 transition-colors">
                  {t('nav.howItWorks')}
                </Link>
              </li>
              <li>
                <Link to="/lost-found" className="hover:text-lavender-600 transition-colors">
                  {t('nav.lostFound')}
                </Link>
              </li>
              <li>
                <Link to="/matchmaker" className="hover:text-lavender-600 transition-colors">
                  {t('nav.quiz')}
                </Link>
              </li>
              <li>
                <Link to="/register?role=ngo" className="hover:text-lavender-600 transition-colors">
                  {t('explorePets') ? t('registerAsNgo') : 'Register Shelter'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Care Resources */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-charcoal">
              {t('footer.careResources')}
            </h4>
            <ul className="space-y-2.5 text-sm text-mutedgrey font-medium">
              <li>
                <Link to="/pet-care" className="hover:text-lavender-600 transition-colors">
                  {t('home.passportHighlightTitle')}
                </Link>
              </li>
              <li>
                <Link to="/pet-care#vaccination-guide" className="hover:text-lavender-600 transition-colors">
                  {lang === 'en' ? 'Vaccination Guide' : 'టీకాల మార్గదర్శి'}
                </Link>
              </li>
              <li>
                <Link to="/pet-care#nutrition" className="hover:text-lavender-600 transition-colors">
                  {lang === 'en' ? 'Pet Nutrition & Diet' : 'పోషకాహారం & డైట్'}
                </Link>
              </li>
              <li>
                <Link to="/how-it-works#guidelines" className="hover:text-lavender-600 transition-colors">
                  {t('footer.guidelines')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-charcoal">
              {t('footer.contactHeading')}
            </h4>
            <ul className="space-y-3 text-sm text-mutedgrey">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-lavender-600 shrink-0 mt-0.5" />
                <span>Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-lavender-600 shrink-0" />
                <span>+91 94401 23456 / +91 40 2300 8899</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-lavender-600 shrink-0" />
                <span>care@petlove.org</span>
              </li>
            </ul>

            {/* Language Switcher in Footer */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-mutedgrey block mb-1.5">
                {lang === 'en' ? 'Language / భాష:' : 'భాష / Language:'}
              </span>
              <div className="inline-flex rounded-lg border border-lavender-200 bg-white p-1">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                    lang === 'en' ? 'bg-lavender-500 text-white' : 'text-charcoal hover:text-lavender-600'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('te')}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                    lang === 'te' ? 'bg-lavender-500 text-white' : 'text-charcoal hover:text-lavender-600'
                  }`}
                >
                  తెలుగు
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-lavender-200/60 flex flex-col sm:flex-row items-center justify-between text-xs text-mutedgrey gap-4">
          <p>© {new Date().getFullYear()} Pet Love. {t('footer.rightsReserved')}</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-lavender-600 transition-colors">
              {t('nav.aboutUs')}
            </Link>
            <Link to="/contact" className="hover:text-lavender-600 transition-colors">
              {t('nav.contactUs')}
            </Link>
            <span className="text-lavender-400">|</span>
            <span className="flex items-center gap-1 text-lavender-700 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              100% Verified Pet Adoptions
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
