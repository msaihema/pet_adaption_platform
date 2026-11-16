import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

import { HomePage } from './pages/HomePage';
import { FindPetsPage } from './pages/FindPetsPage';
import { PetDetailsPage } from './pages/PetDetailsPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AdopterDashboard } from './pages/AdopterDashboard';
import { NgoDashboard } from './pages/NgoDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { LostAndFoundPage } from './pages/LostAndFoundPage';
import { CompatibilityQuizPage } from './pages/CompatibilityQuizPage';
import { HowAdoptionWorksPage } from './pages/HowAdoptionWorksPage';
import { PetCarePage } from './pages/PetCarePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

// Scroll to top on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <FavoritesProvider>
          <Router>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col bg-white text-charcoal">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  {/* Public Core Pages */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/find-pets" element={<FindPetsPage />} />
                  <Route path="/pets/:id" element={<PetDetailsPage />} />
                  <Route path="/how-it-works" element={<HowAdoptionWorksPage />} />
                  <Route path="/pet-care" element={<PetCarePage />} />
                  <Route path="/lost-found" element={<LostAndFoundPage />} />
                  <Route path="/matchmaker" element={<CompatibilityQuizPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />

                  {/* Auth */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />

                  {/* Protected Dashboards */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute allowedRoles={['adopter', 'admin']}>
                        <AdopterDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/ngo-dashboard"
                    element={
                      <ProtectedRoute allowedRoles={['ngo', 'admin']}>
                        <NgoDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </FavoritesProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
