import React, { createContext, useState } from 'react';
import ProductList from './components/ProductList';
import ProductSearch from './components/ProductSearch';
import ThemeToggle from './components/ThemeToggle';
import { LanguageProvider } from "./contexts/LanguageContext";
import LanguageSelector from "./components/LanguageSelector";

export const ThemeContext = createContext();

const initialProducts = [
];

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Ajout de l'état pour la recherche
  const [products, setProducts] = useState(initialProducts); // État pour les produits

  function handleReload() {
    setProducts(initialProducts);
  }

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      <LanguageProvider>
        <div className={`container ${isDarkTheme ? 'bg-dark text-light' : 'bg-light'}`}>
          <header className="my-4">
            <h1 className="text-center">Catalogue de Produits</h1>
            <div className="d-flex justify-content-end gap-2">
              <ThemeToggle />
              <LanguageSelector />
            </div>
          </header>
          <main>
            <ProductSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <ProductList
              products={products}
              searchTerm={searchTerm}
              onReload={handleReload}
            />
          </main>
        </div>
      </LanguageProvider>
    </ThemeContext.Provider>
  );
};

export default App;
