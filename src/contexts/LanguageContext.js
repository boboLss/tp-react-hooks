import React, { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useLocalStorage("language", "fr");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
