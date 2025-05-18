import React, { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

const LanguageSelector = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <select value={language} onChange={e => setLanguage(e.target.value)}>
      <option value="fr">Français</option>
      <option value="en">English</option>
    </select>
  );
};

export default LanguageSelector;
