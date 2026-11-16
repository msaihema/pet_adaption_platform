import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ContactPage = () => {
  const { t, lang } = useLanguage();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Intro */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight">
          {t('footer.contactHeading')}
        </h1>
        <p className="text-xs sm:text-sm text-mutedgrey leading-relaxed">
          {lang === 'en'
            ? 'Have a question about the adoption process, partnering as a shelter, or need pet health assistance? Reach out to our compassionate care team.'
            : 'దత్తత ప్రక్రియ గురించి లేదా భాగస్వామ్యం గురించి ఏవైనా సందేహాలు ఉంటే మా సంరక్షణ బృందాన్ని సంప్రదించండి.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info (md: 5 cols) */}
        <div className="md:col-span-5 bg-lavender-50/80 rounded-3xl p-8 border border-lavender-200/70 space-y-6">
          <h3 className="text-lg font-extrabold text-charcoal">
            {lang === 'en' ? 'Pet Love Support Center' : 'పెట్ లవ్ సహాయ కేంద్రం'}
          </h3>

          <div className="space-y-4 text-xs text-charcoal/90">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-lavender-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Headquarters</p>
                <p className="text-mutedgrey">Plot 18, Road No 36, Jubilee Hills, Hyderabad, Telangana 500033</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-lavender-600 shrink-0" />
              <div>
                <p className="font-bold">Adoption Helpline</p>
                <p className="text-mutedgrey">+91 94401 23456 / +91 40 2300 8899</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-lavender-600 shrink-0" />
              <div>
                <p className="font-bold">Email Inquiries</p>
                <p className="text-mutedgrey">care@petlove.org</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-lavender-200 text-[11px] text-mutedgrey leading-relaxed">
            {lang === 'en'
              ? 'Our adoption counselors are available Monday through Saturday from 9:00 AM to 7:00 PM IST.'
              : 'మా దత్తత సలహాదారులు సోమవారం నుండి శనివారం వరకు ఉదయం 9:00 నుండి సాయంత్రం 7:00 గంటల వరకు అందుబాటులో ఉంటారు.'}
          </div>
        </div>

        {/* Contact Form (md: 7 cols) */}
        <div className="md:col-span-7 bg-white rounded-3xl p-8 border border-lavender-100 shadow-card">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-charcoal">
                {lang === 'en' ? 'Message Sent Successfully!' : 'సందేశం విజయవంతంగా పంపబడింది!'}
              </h3>
              <p className="text-xs text-mutedgrey max-w-sm mx-auto">
                {lang === 'en' ? 'Thank you for reaching out. A representative from our team will respond within 24 hours.' : 'మమ్మల్ని సంప్రదించినందుకు ధన్యవాదాలు. మా బృందం 24 గంటల్లో మీకు ప్రత్యుత్తరం ఇస్తుంది.'}
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-6 py-2 rounded-full bg-lavender-500 text-white font-bold text-xs"
              >
                {lang === 'en' ? 'Send Another Message' : 'మరొక సందేశం పంపండి'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">
                    {t('auth.fullName')} *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 text-xs border rounded-xl focus:ring-2 focus:ring-lavender-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">
                    {t('auth.email')} *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 text-xs border rounded-xl focus:ring-2 focus:ring-lavender-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">
                  {lang === 'en' ? 'Subject' : 'విషయం'} *
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Adoption procedure inquiry"
                  required
                  className="w-full px-3.5 py-2.5 text-xs border rounded-xl focus:ring-2 focus:ring-lavender-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">
                  {lang === 'en' ? 'Message' : 'సందేశం'} *
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="How can we assist you today?"
                  className="w-full px-3.5 py-2.5 text-xs border rounded-xl focus:ring-2 focus:ring-lavender-400 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-full bg-lavender-500 hover:bg-lavender-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-lavender-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Send Message' : 'సందేశం పంపండి'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
