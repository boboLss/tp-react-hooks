import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import useDebounce from '../hooks/useDebounce';
import { LanguageContext } from '../contexts/LanguageContext';

const translations = {
  fr: {
    placeholder: 'Rechercher un produit...',
  },
  en: {
    placeholder: 'Search for a product...',
  },
};

const ProductSearch = ({ searchTerm, setSearchTerm }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const debouncedSearchTerm = useDebounce(searchTerm, 100);
  
  return (
    <div className="mb-4">
      <input
        type="text"
        value={debouncedSearchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={translations[language].placeholder}
        className={`form-control ${isDarkTheme ? 'bg-dark text-light' : ''}`}
      />
    </div>
  );
};

export default ProductSearch;