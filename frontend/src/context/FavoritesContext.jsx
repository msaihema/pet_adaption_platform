import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('petlove_favorites');
      return saved ? JSON.parse(saved) : ['pet_1', 'pet_3']; // initial samples
    } catch {
      return ['pet_1'];
    }
  });

  useEffect(() => {
    localStorage.setItem('petlove_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (petId) => {
    setFavorites(prev => {
      if (prev.includes(petId)) {
        return prev.filter(id => id !== petId);
      } else {
        return [...prev, petId];
      }
    });
  };

  const isFavorite = (petId) => favorites.includes(petId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
