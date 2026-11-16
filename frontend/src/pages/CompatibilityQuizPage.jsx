import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sparkles, CheckCircle2, RotateCcw, Heart, ArrowRight } from 'lucide-react';
import { PetCard } from '../components/PetCard';
import { useLanguage } from '../context/LanguageContext';

export const CompatibilityQuizPage = () => {
  const { t, lang } = useLanguage();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [pets, setPets] = useState([]);
  const [matchedPets, setMatchedPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await axios.get('/api/pets');
        setPets(res.data.pets || []);
      } catch (err) {
        console.error('Quiz fetch error:', err);
      }
    };
    fetchPets();
  }, []);

  const questions = [
    {
      id: 'housing',
      title: t('quiz.q1'),
      options: [
        { id: 'apt_small', label: t('quiz.q1_opt1'), scoreCat: 'cat', preferSize: 'small' },
        { id: 'apt_balcony', label: t('quiz.q1_opt2'), scoreCat: 'both', preferSize: 'small' },
        { id: 'house_yard', label: t('quiz.q1_opt3'), scoreCat: 'dog', preferSize: 'large' }
      ]
    },
    {
      id: 'activity',
      title: t('quiz.q2'),
      options: [
        { id: 'low', label: t('quiz.q2_opt1'), preferLevel: 'low' },
        { id: 'med', label: t('quiz.q2_opt2'), preferLevel: 'moderate' },
        { id: 'high', label: t('quiz.q2_opt3'), preferLevel: 'high' }
      ]
    },
    {
      id: 'time_alone',
      title: t('quiz.q3'),
      options: [
        { id: 'rare', label: t('quiz.q3_opt1'), maxAlone: 'low' },
        { id: 'medium', label: t('quiz.q3_opt2'), maxAlone: 'moderate' },
        { id: 'long', label: t('quiz.q3_opt3'), maxAlone: 'high' }
      ]
    },
    {
      id: 'experience',
      title: t('quiz.q4'),
      options: [
        { id: 'first_time', label: t('quiz.q4_opt1'), easyGoing: true },
        { id: 'experienced', label: t('quiz.q4_opt2'), easyGoing: false },
        { id: 'trainer', label: t('quiz.q4_opt3'), easyGoing: false }
      ]
    },
    {
      id: 'household',
      title: t('quiz.q5'),
      options: [
        { id: 'kids', label: t('quiz.q5_opt1'), kidFriendly: true },
        { id: 'other_pets', label: t('quiz.q5_opt2'), socialPets: true },
        { id: 'adults_only', label: t('quiz.q5_opt3'), calm: true }
      ]
    }
  ];

  const handleSelectOption = (questionId, option) => {
    const updated = { ...answers, [questionId]: option };
    setAnswers(updated);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateMatches(updated);
    }
  };

  const calculateMatches = (finalAnswers) => {
    // Score each pet
    const scored = pets.map((pet) => {
      let score = 75; // baseline

      if (finalAnswers.housing?.preferSize === pet.size) score += 10;
      if (finalAnswers.activity?.preferLevel === pet.activityLevel) score += 10;
      if (pet.personality?.some(p => p.toLowerCase().includes('friendly') || p.toLowerCase().includes('gentle'))) score += 5;
      if (score > 98) score = 98;

      return {
        ...pet,
        matchScore: score
      };
    });

    scored.sort((a, b) => b.matchScore - a.matchScore);
    setMatchedPets(scored.slice(0, 3));
    setShowResults(true);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-lavender-100 text-lavender-700 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{lang === 'en' ? 'AI Compatibility Matcher' : 'స్నేహితుడి సరిపోలిక క్విజ్'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight">
          {t('quiz.title')}
        </h1>
        <p className="text-xs sm:text-sm text-mutedgrey leading-relaxed">
          {t('quiz.subtitle')}
        </p>
      </div>

      {!showResults ? (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-lavender-100 shadow-card space-y-8 animate-in fade-in">
          
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-mutedgrey">
              <span>Question {currentStep + 1} of {questions.length}</span>
              <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="h-2 rounded-full bg-lavender-100 overflow-hidden">
              <div
                className="h-full bg-lavender-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-charcoal">
              {questions[currentStep].title}
            </h2>

            <div className="space-y-3">
              {questions[currentStep].options.map((option, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(questions[currentStep].id, option)}
                  className="w-full text-left p-5 rounded-2xl border-2 border-lavender-100 hover:border-lavender-400 bg-lavender-50/40 hover:bg-lavender-50 transition-all font-semibold text-xs sm:text-sm text-charcoal flex items-center justify-between group"
                >
                  <span>{option.label}</span>
                  <div className="w-6 h-6 rounded-full border border-lavender-300 group-hover:bg-lavender-500 group-hover:border-lavender-500 transition-colors flex items-center justify-center shrink-0">
                    <ArrowRight className="w-3.5 h-3.5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {currentStep > 0 && (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="text-xs font-bold text-mutedgrey hover:text-charcoal"
            >
              ← {lang === 'en' ? 'Previous Question' : 'మునుపటి ప్రశ్న'}
            </button>
          )}

        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in">
          
          <div className="bg-lavender-50 rounded-3xl p-6 sm:p-8 border border-lavender-200/80 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-lavender-500 text-white flex items-center justify-center mx-auto shadow-md">
              <Sparkles className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-extrabold text-charcoal">
              {t('quiz.matchResults')}
            </h2>
            <p className="text-xs text-mutedgrey max-w-md mx-auto">
              Based on your residence type, activity schedule, and home routine, here are the companion souls who will thrive with you!
            </p>

            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-lavender-100 border border-lavender-300 text-lavender-800 text-xs font-bold shadow-sm transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('quiz.retakeQuiz')}</span>
            </button>
          </div>

          {/* Results Grid with match percentage badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {matchedPets.map((pet) => (
              <div key={pet._id} className="relative">
                <div className="absolute top-2 right-2 z-20 bg-lavender-600 text-white px-3 py-1 rounded-full text-xs font-extrabold shadow-md flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{pet.matchScore}% {t('quiz.matchScore')}</span>
                </div>
                <PetCard pet={pet} />
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
