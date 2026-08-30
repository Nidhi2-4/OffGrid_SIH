'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi' | 'mr';

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

export const translations: Translations = {
  // Top utility bar
  govtOfIndia: {
    en: 'Government of India',
    hi: 'भारत सरकार',
    mr: 'भारत सरकार'
  },
  ministryName: {
    en: 'Ministry of Earth Sciences',
    hi: 'पृथ्वी विज्ञान मंत्रालय',
    mr: 'पृथ्वी विज्ञान मंत्रालय'
  },
  portalSubtitle: {
    en: 'National Centre for Polar and Ocean Research (NCPOR)',
    hi: 'राष्ट्रीय ध्रुवीय एवं महासागर अनुसंधान केंद्र (एनसीपीओआर)',
    mr: 'राष्ट्रीय ध्रुवीय आणि महासागर संशोधन केंद्र (एनसीपीओआर)'
  },
  screenReader: {
    en: 'Screen Reader Access',
    hi: 'स्क्रीन रीडर एक्सेस',
    mr: 'स्क्रीन रीडर प्रवेश'
  },
  skipToContent: {
    en: 'Skip to Main Content',
    hi: 'मुख्य सामग्री पर जाएं',
    mr: 'मुख्य सामग्रीवर जा'
  },
  
  // Navigation
  navHome: {
    en: 'Home',
    hi: 'होम',
    mr: 'मुख्यपृष्ठ'
  },
  navMap: {
    en: 'Stations & Map',
    hi: 'ध्रुवीय केंद्र और मानचित्र',
    mr: 'ध्रुवीय स्थानके आणि नकाशा'
  },
  navKnowledgeGraph: {
    en: 'Knowledge Graph',
    hi: 'ज्ञान आरेख',
    mr: 'ज्ञान आलेख'
  },
  navAssistant: {
    en: 'AI Research Assistant',
    hi: 'एआई अनुसंधान सहायक',
    mr: 'एआय संशोधन सहाय्यक'
  },
  navDataExplorer: {
    en: 'Data Explorer',
    hi: 'डेटा एक्सप्लोरर',
    mr: 'डेटा शोधक'
  },
  navResearchers: {
    en: 'Meet Scientists',
    hi: 'वैज्ञानिक परिचय',
    mr: 'शास्त्रज्ञांना भेटा'
  },
  navOutreach: {
    en: 'Public Outreach',
    hi: 'जनसंपर्क व लेख',
    mr: 'जनसंपर्क आणि लेख'
  },
  navLogin: {
    en: 'Researcher Login',
    hi: 'शोधकर्ता लॉगिन',
    mr: 'संशोधक लॉगिन'
  },
  
  // Hero section
  welcomeTitle: {
    en: 'Welcome to HimSagar',
    hi: 'हिमसागर में आपका स्वागत है',
    mr: 'हिमसागर मध्ये आपले स्वागत आहे'
  },
  heroTagline: {
    en: 'Integrated Polar & Ocean Science Knowledge Repository and AI Outreach Portal',
    hi: 'एकीकृत ध्रुवीय एवं महासागर विज्ञान ज्ञान भंडार और एआई जनसंपर्क पोर्टल',
    mr: 'एकात्मिक ध्रुवीय आणि महासागर विज्ञान ज्ञान भांडार आणि एआय जनसंपर्क पोर्टल'
  },
  searchPlaceholder: {
    en: 'Search expeditions, datasets, research publications, polar stations, species...',
    hi: 'अभियान, डेटासेट, अनुसंधान प्रकाशन, ध्रुवीय स्टेशन, प्रजातियां खोजें...',
    mr: 'मोहिमा, डेटासेट, संशोधन प्रकाशने, ध्रुवीय स्थानके, प्रजाती शोधा...'
  },
  searchBtn: {
    en: 'SEARCH',
    hi: 'खोजें',
    mr: 'शोधा'
  },
  trendingSearches: {
    en: 'Trending:',
    hi: 'लोकप्रिय खोज:',
    mr: 'लोकप्रिय शोध:'
  },
  
  // What's new ticker
  whatsNew: {
    en: "WHAT'S NEW",
    hi: 'नवीनतम समाचार',
    mr: 'नवीनतम घडामोडी'
  },
  
  // Quick Category Cards
  catStations: {
    en: 'Polar Stations',
    hi: 'ध्रुवीय केंद्र',
    mr: 'ध्रुवीय स्थानके'
  },
  catStationsDesc: {
    en: 'Maitri, Bharati, Himadri & Himansh',
    hi: 'मैत्री, भारती, हिमाद्रि और हिमांश',
    mr: 'मैत्री, भारती, हिमाद्री आणि हिमांश'
  },
  catExpeditions: {
    en: 'Scientific Expeditions',
    hi: 'वैज्ञानिक अभियान',
    mr: 'वैज्ञानिक मोहिमा'
  },
  catExpeditionsDesc: {
    en: '44+ Antarctic & Arctic Missions',
    hi: '44+ अंटार्कटिक और आर्कटिक मिशन',
    mr: '44+ अंटार्क्टिक आणि आर्क्टिक मोहिमा'
  },
  catAiAssistant: {
    en: 'AI Research Assistant',
    hi: 'एआई अनुसंधान सहायक',
    mr: 'एआय संशोधन सहाय्यक'
  },
  catAiAssistantDesc: {
    en: 'RAG Q&A with direct source citations',
    hi: 'प्रमाणित संदर्भों के साथ सटीक उत्तर',
    mr: 'प्रमाणित संदर्भांसह अचूक उत्तरे'
  },
  catDataExplorer: {
    en: 'Data Explorer',
    hi: 'डेटा विज़ुअलाइज़ेशन',
    mr: 'डेटा व्हिज्युअलायझेशन'
  },
  catDataExplorerDesc: {
    en: 'Instant in-browser climate & ice charts',
    hi: 'ब्राउज़र में त्वरित मौसम व बर्फ चार्ट',
    mr: 'ब्राउझरमध्ये हवामान आणि बर्फ चार्ट'
  },
  catKnowledgeGraph: {
    en: 'Research Story Graph',
    hi: 'ज्ञान आरेख नेटवर्क',
    mr: 'संशोधन कथा आलेख'
  },
  catKnowledgeGraphDesc: {
    en: 'Researcher ↔ Expedition ↔ Dataset',
    hi: 'शोधकर्ता ↔ अभियान ↔ डेटा ↔ शोधपत्र',
    mr: 'संशोधक ↔ मोहीम ↔ डेटासेट'
  },
  catOutreach: {
    en: 'Public Outreach & AI',
    hi: 'जनसंपर्क एवं सरल विज्ञान',
    mr: 'जनसंपर्क आणि सुलभ विज्ञान'
  },
  catOutreachDesc: {
    en: 'Explain-it-simply toggles & press kits',
    hi: 'सरल भाषा में विज्ञान और प्रेस विज्ञप्ति',
    mr: 'सुलभ भाषेत विज्ञान आणि प्रसिद्धीपत्रके'
  },

  // Key leadership titles
  ministerTitle: {
    en: 'Hon. Union Minister',
    hi: 'माननीय केंद्रीय मंत्री',
    mr: 'माननीय केंद्रीय मंत्री'
  },
  ministerName: {
    en: 'Ministry of Earth Sciences',
    hi: 'पृथ्वी विज्ञान मंत्रालय',
    mr: 'पृथ्वी विज्ञान मंत्रालय'
  },
  secretaryTitle: {
    en: 'Secretary, MoES',
    hi: 'सचिव, पृथ्वी विज्ञान मंत्रालय',
    mr: 'सचिव, एमओईएस'
  },
  directorTitle: {
    en: 'Director, NCPOR',
    hi: 'निदेशक, एनसीपीओआर',
    mr: 'संचालक, एनसीपीओआर'
  },
  stationLeaderTitle: {
    en: 'Station Leader, Bharati',
    hi: 'स्टेशन प्रमुख, भारती',
    mr: 'स्थानक प्रमुख, भारती'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
