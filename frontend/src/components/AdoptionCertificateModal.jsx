import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, Printer, Award, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AdoptionCertificateModal = ({ certificate, isOpen, onClose }) => {
  const { t, lang } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      // Trigger festive celebratory confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isOpen]);

  if (!isOpen || !certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl border-4 border-lavender-200 animate-in fade-in zoom-in-95">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="print:hidden absolute top-5 right-5 p-2 rounded-full text-mutedgrey hover:text-charcoal hover:bg-lavender-50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Border & Background watermark */}
        <div className="border-2 border-lavender-400 p-6 sm:p-8 rounded-2xl relative bg-gradient-to-b from-lavender-50/50 via-white to-lavender-50/40 text-center space-y-6">
          
          {/* Header & Logo */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-lavender-500 text-white flex items-center justify-center shadow-md">
              <Award className="w-7 h-7" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-lavender-700">
              Pet Love Adoption & Care Platform
            </h4>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-charcoal font-serif tracking-tight">
              {t('certificate.officialTitle')}
            </h1>
            <p className="text-xs font-semibold text-mutedgrey">
              Registration No: <span className="text-lavender-600 font-mono">{certificate.certificateId}</span>
            </p>
          </div>

          <div className="w-24 h-0.5 bg-lavender-300 mx-auto"></div>

          {/* Body Content */}
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-mutedgrey uppercase tracking-wider">
              {t('certificate.presentedTo')}
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-lavender-700 font-serif border-b border-lavender-200 pb-2 max-w-md mx-auto">
              {certificate.adopterName}
            </h2>
            <p className="text-xs sm:text-sm text-charcoal max-w-lg mx-auto leading-relaxed">
              {t('certificate.hasAdopted')}
            </p>
          </div>

          {/* Pet Highlight Card inside certificate */}
          <div className="flex items-center justify-center gap-4 py-2">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-lavender-400 shadow-md">
              <img
                src={certificate.petImage || 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=300&q=80'}
                alt={certificate.petName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left">
              <h3 className="text-2xl font-extrabold text-charcoal">
                {certificate.petName}
              </h3>
              <p className="text-xs font-semibold text-lavender-600">
                {certificate.petBreed}
              </p>
              <p className="text-[11px] text-mutedgrey mt-0.5 font-mono">
                Microchip: {certificate.microchipId}
              </p>
            </div>
          </div>

          {/* Footer Seals & Signatures */}
          <div className="pt-6 border-t border-lavender-200 grid grid-cols-2 gap-4 items-end text-xs">
            <div className="text-left space-y-1">
              <p className="text-[10px] text-mutedgrey uppercase font-bold">{t('certificate.issuedBy')}</p>
              <p className="font-bold text-charcoal">{certificate.ngoName}</p>
              <p className="text-mutedgrey text-[11px]">
                {t('certificate.date')}: {new Date(certificate.adoptionDate).toLocaleDateString()}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-lavender-400 bg-lavender-100/70 flex flex-col items-center justify-center p-1 text-center shadow-inner">
                <ShieldCheck className="w-5 h-5 text-lavender-600" />
                <span className="text-[7px] font-extrabold text-lavender-800 uppercase tracking-tighter leading-none mt-1">
                  OFFICIAL SEAL
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Print / Close Buttons */}
        <div className="print:hidden pt-6 flex justify-between items-center">
          <p className="text-xs text-mutedgrey flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-lavender-500" />
            <span>{t('certificate.congrats')}</span>
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="px-6 py-2.5 rounded-full bg-lavender-500 hover:bg-lavender-600 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>{t('certificate.printBtn')}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
