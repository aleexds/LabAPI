/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Agregar o quitar de favoritos
  const toggleFavorite = (character) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === character.id);
      if (exists) {
        return prev.filter((item) => item.id !== character.id);
      } else {
        return [...prev, character];
      }
    });
  };

  const isFavorite = (id) => {
    return favorites.some((item) => item.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);