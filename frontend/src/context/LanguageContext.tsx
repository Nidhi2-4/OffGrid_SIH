'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi' | 'bn' | 'ta';

export interface Translations {
  // Top utility bar
  govtIndia: string;
  moesTitle: string;
  ncporTitle: string;
  skipToMain: string;
  screenReader: string;
  accessibility: string;
  langSelect: string;
  
  // Navigation
  home: string;
  expeditions: string;
  stations: string;
  aiAssistant: string;
  interactiveMap: string;
  dataExplorer: string;
  articles: string;
  researchers: string;
  login: string;
  searchPlaceholder: string;

  // Hero Section
  portalBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  exploreMapBtn: string;
  askAssistantBtn: string;
  exploreDataBtn: string;
  latestNotice: string;
  
  // Featured Arctic / Polar Showcase (for the attached image)
  featuredImageTitle: string;
  featuredImageSubtitle: string;
  featuredImageCaption: string;
  imageLocationTag: string;
  imageStationTag: string;
  imageExpeditionTag: string;
  imageCoordsTag: string;
  explainSimplyBtn: string;
  explainDetailedBtn: string;
  simpleExplanation: string;
  detailedExplanation: string;
  viewSourceDocument: string;
  
  // Stations Section
  stationsTitle: string;
  stationsSubtitle: string;
  stationMaitriTitle: string;
  stationMaitriDesc: string;
  stationBharatiTitle: string;
  stationBharatiDesc: string;
  stationHimadriTitle: string;
  stationHimadriDesc: string;
  stationHimanshTitle: string;
  stationHimanshDesc: string;
  viewAllStations: string;
  stationActiveStatus: string;
  
  // Platform Features
  featuresTitle: string;
  featuresSubtitle: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  feature4Title: string;
  feature4Desc: string;

  // Stats
  statStations: string;
  statExpeditions: string;
  statDatasets: string;
  statPublications: string;
  statScientists: string;

  // Footer
  footerAboutTitle: string;
  footerAboutDesc: string;
  quickLinks: string;
  legalLinks: string;
  termsOfUse: string;
  privacyPolicy: string;
  copyrightNotice: string;
  lastUpdated: string;
  helpline: string;
}

const translations: Record<Language, Translations> = {
  en: {
    govtIndia: 'Government of India',
    moesTitle: 'Ministry of Earth Sciences (MoES)',
    ncporTitle: 'National Centre for Polar and Ocean Research (NCPOR)',
    skipToMain: 'Skip to Main Content',
    screenReader: 'Screen Reader Access',
    accessibility: 'Accessibility Options',
    langSelect: 'Language / भाषा',

    home: 'Home',
    expeditions: 'Expeditions',
    stations: 'Polar Stations',
    aiAssistant: 'AI Research Assistant',
    interactiveMap: 'Interactive Map',
    dataExplorer: 'Data Explorer',
    articles: 'Science Outreach',
    researchers: 'Scientists Directory',
    login: 'Researcher Login',
    searchPlaceholder: 'Search reports, datasets, expeditions, or species...',

    portalBadge: 'National Polar & Ocean Science Gateway',
    heroTitle: 'Integrated Polar Science Outreach & Knowledge Repository',
    heroSubtitle: 'A unified portal connecting Arctic & Antarctic expeditions, climate datasets, and AI-driven scientific outreach for researchers, educators, and the public.',
    exploreMapBtn: 'Explore Polar Stations Map',
    askAssistantBtn: 'Ask AI Research Assistant',
    exploreDataBtn: 'Explore Datasets & Charts',
    latestNotice: 'Latest: 44th Indian Scientific Expedition to Antarctica (ISEA) data ingestion complete.',

    featuredImageTitle: 'Featured Polar Observation: Arctic Apex Marine Fauna',
    featuredImageSubtitle: 'Visual Documentation from the Indian Arctic Scientific Research Base',
    featuredImageCaption: 'Adult Polar Bear (Ursus maritimus) observed during high-latitude sea-ice extent monitoring near Ny-Ålesund, Svalbard.',
    imageLocationTag: 'Ny-Ålesund, Svalbard',
    imageStationTag: 'Himadri Station (Arctic)',
    imageExpeditionTag: '17th Indian Arctic Expedition',
    imageCoordsTag: '78°55′ N, 11°56′ E',
    explainSimplyBtn: 'Explain Simply (Students)',
    explainDetailedBtn: 'Scientific Overview (Researchers)',
    simpleExplanation: 'Polar bears rely on sea ice to hunt seals and travel. Indian scientists at Himadri Station track sea ice changes in the Arctic to understand how melting ice affects Arctic animals and global weather patterns including Indian monsoons.',
    detailedExplanation: 'Long-term monitoring of Arctic apex fauna (Ursus maritimus) correlates with seasonal multi-year sea ice pack variability in the Kongsfjorden fjord system. Ingestion via HimSagar AI auto-tagging pipeline indexes this specimen under Arctic Marine Biodiversity Dataset MoES-ARC-2024-08.',
    viewSourceDocument: 'View Verified Source Report (MoES-NCPOR-2024-R12)',

    stationsTitle: 'India\'s Polar & Cryosphere Research Outposts',
    stationsSubtitle: 'Continuous scientific monitoring across the Arctic, Antarctic, and the High Himalayas.',
    stationMaitriTitle: 'Maitri Station (Antarctica)',
    stationMaitriDesc: 'Established in 1989 in the Schirmacher Oasis. Focuses on geology, atmospheric physics, and meteorology.',
    stationBharatiTitle: 'Bharati Station (Antarctica)',
    stationBharatiDesc: 'Operational since 2012 in the Larsemann Hills. State-of-the-art facility for oceanographic and satellite telemetry studies.',
    stationHimadriTitle: 'Himadri Station (Arctic)',
    stationHimadriDesc: 'India’s permanent Arctic base at Ny-Ålesund, Spitsbergen, Norway, established in 2008 for atmospheric and marine biology research.',
    stationHimanshTitle: 'Himansh Station (Himalayas)',
    stationHimanshDesc: 'High-altitude research facility in the Spiti Valley, Himachal Pradesh at 4,000m for glaciological and climate monitoring.',
    viewAllStations: 'Explore Stations on Interactive Map →',
    stationActiveStatus: 'Operational / All-Weather Active',

    featuresTitle: 'Core Capabilities of the HimSagar Platform',
    featuresSubtitle: 'Bridging the gap between specialized polar science and public engagement through artificial intelligence.',
    feature1Title: 'Traceable Knowledge Graph',
    feature1Desc: 'Connect researchers, expeditions, ice-core datasets, research papers, and media assets in a unified relational web.',
    feature2Title: 'Cited AI Research Assistant',
    feature2Desc: 'Query thousands of polar scientific reports using natural language with guaranteed source citations and page-level references.',
    feature3Title: 'In-Browser Data Visualization',
    feature3Desc: 'Render interactive temperature, salinity, and ice-thickness charts instantly without downloading heavy files or running code.',
    feature4Title: 'Automated Multilingual Outreach',
    feature4Desc: 'AI transforms complex scientific publications into student explainers, press releases, and regional language translations.',

    statStations: 'Permanent Polar Stations',
    statExpeditions: 'Scientific Expeditions Conducted',
    statDatasets: 'Open Research Datasets',
    statPublications: 'Peer-Reviewed Publications',
    statScientists: 'Active Polar Researchers',

    footerAboutTitle: 'About NCPOR & HimSagar',
    footerAboutDesc: 'The National Centre for Polar and Ocean Research (NCPOR) is an autonomous research institution under the Ministry of Earth Sciences, Government of India, leading polar and Southern Ocean expeditions.',
    quickLinks: 'Quick Links',
    legalLinks: 'Compliance & Legal',
    termsOfUse: 'Terms of Use',
    privacyPolicy: 'Privacy Policy',
    copyrightNotice: '© 2026 National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences, Government of India. All Rights Reserved.',
    lastUpdated: 'Page Last Updated: September 1, 2026',
    helpline: 'Toll Free Citizen Helpdesk: 1800-11-MOES (1800-11-6637)',
  },
  hi: {
    govtIndia: 'भारत सरकार',
    moesTitle: 'पृथ्वी विज्ञान मंत्रालय (MoES)',
    ncporTitle: 'राष्ट्रीय ध्रुवीय एवं महासागर अनुसंधान केंद्र (NCPOR)',
    skipToMain: 'मुख्य सामग्री पर जाएं',
    screenReader: 'स्क्रीन रीडर एक्सेस',
    accessibility: 'सुगमता विकल्प',
    langSelect: 'भाषा / Language',

    home: 'मुख्य पृष्ठ',
    expeditions: 'अभियान',
    stations: 'ध्रुवीय अनुसंधान स्टेशन',
    aiAssistant: 'AI अनुसंधान सहायक',
    interactiveMap: 'इंटरैक्टिव मानचित्र',
    dataExplorer: 'डेटा अन्वेषक',
    articles: 'विज्ञान आउटरीच',
    researchers: 'वैज्ञानिक निर्देशिका',
    login: 'शोधकर्ता लॉगिन',
    searchPlaceholder: 'रिपोर्ट, डेटासेट, अभियान या प्रजातियों की खोज करें...',

    portalBadge: 'राष्ट्रीय ध्रुवीय एवं महासागर विज्ञान पोर्टल',
    heroTitle: 'एकीकृत ध्रुवीय विज्ञान आउटरीच एवं ज्ञान भंडार',
    heroSubtitle: 'आर्कटिक और अंटार्कटिक अभियानों, जलवायु डेटासेट और शोधकर्ताओं, शिक्षकों और नागरिकों के लिए AI-संचालित आउटरीच को जोड़ने वाला राष्ट्रीय मंच।',
    exploreMapBtn: 'ध्रुवीय स्टेशन मानचित्र देखें',
    askAssistantBtn: 'AI सहायक से प्रश्न पूछें',
    exploreDataBtn: 'डेटासेट एवं चार्ट देखें',
    latestNotice: 'नवीनतम: अंटार्कटिका में 44वें भारतीय वैज्ञानिक अभियान (ISEA) का डेटा अंतर्ग्रहण पूर्ण।',

    featuredImageTitle: 'विशेष ध्रुवीय अवलोकन: आर्कटिक समुद्री जीवजंतु',
    featuredImageSubtitle: 'भारतीय आर्कटिक वैज्ञानिक अनुसंधान केंद्र से प्रत्यक्ष फोटोग्राफिक साक्ष्य',
    featuredImageCaption: 'नाय-आलेसुंड, स्वालबार्ड के पास समुद्री बर्फ विस्तार की निगरानी के दौरान देखा गया ध्रुवीय भालू (Ursus maritimus)।',
    imageLocationTag: 'नाय-आलेसुंड, स्वालबार्ड',
    imageStationTag: 'हिमाद्री स्टेशन (आर्कटिक)',
    imageExpeditionTag: '17वां भारतीय आर्कटिक अभियान',
    imageCoordsTag: '78°55′ उत्तर, 11°56′ पूर्व',
    explainSimplyBtn: 'सरल भाषा में समझें (छात्रों के लिए)',
    explainDetailedBtn: 'वैज्ञानिक अवलोकन (शोधकर्ताओं के लिए)',
    simpleExplanation: 'ध्रुवीय भालू शिकार और यात्रा के लिए समुद्री बर्फ पर निर्भर होते हैं। हिमाद्री स्टेशन पर भारतीय वैज्ञानिक आर्कटिक में पिघलती बर्फ का अध्ययन करते हैं ताकि यह समझा जा सके कि इसका असर वैश्विक मौसम और भारतीय मानसून पर कैसे पड़ता है।',
    detailedExplanation: 'आर्कटिक शीर्ष शिकारी (Ursus maritimus) का दीर्घकालिक अध्ययन कोंग्सफ्योर्डन फ्योर्ड प्रणाली में मौसमी बर्फ की स्थिति से संबंधित है। यह अवलोकन हिमसागर AI पाइपलाइन द्वारा आर्कटिक समुद्री जैव विविधता डेटासेट MoES-ARC-2024-08 में अनुक्रमित है।',
    viewSourceDocument: 'सत्यापित स्रोत रिपोर्ट देखें (MoES-NCPOR-2024-R12)',

    stationsTitle: 'भारत के ध्रुवीय एवं क्रायोस्फीयर अनुसंधान केंद्र',
    stationsSubtitle: 'आर्कटिक, अंटार्कटिक और उच्च हिमालय में निरंतर वैज्ञानिक निगरानी।',
    stationMaitriTitle: 'मैत्री स्टेशन (अंटार्कटिका)',
    stationMaitriDesc: '1989 में शिर्माकर ओएसिस में स्थापित। भूविज्ञान, वायुमंडलीय भौतिकी और मौसम विज्ञान पर केंद्रित।',
    stationBharatiTitle: 'भारती स्टेशन (अंटार्कटिका)',
    stationBharatiDesc: '2012 से लार्समैन हिल्स में सक्रिय। समुद्र विज्ञान और उपग्रह टेलीमेट्री अध्ययन के लिए अत्याधुनिक सुविधा।',
    stationHimadriTitle: 'हिमाद्री स्टेशन (आर्कटिक)',
    stationHimadriDesc: 'नाय-आलेसुंड, स्पिट्सबर्गेन, नॉर्वे में 2008 में स्थापित भारत का स्थायी अनुसंधान आधार।',
    stationHimanshTitle: 'हिमांशु स्टेशन (हिमालय)',
    stationHimanshDesc: 'हिमाचल प्रदेश की स्पीति घाटी में 4,000 मीटर की ऊंचाई पर स्थित ग्लेशियोलॉजिकल अनुसंधान केंद्र।',
    viewAllStations: 'इंटरैक्टिव मानचित्र पर सभी स्टेशन देखें →',
    stationActiveStatus: 'सक्रिय / सभी मौसमों में कार्यरत',

    featuresTitle: 'हिमसागर मंच की प्रमुख क्षमताएं',
    featuresSubtitle: 'कृत्रिम बुद्धिमत्ता (AI) के माध्यम से ध्रुवीय विज्ञान को जन-जन तक पहुंचाना।',
    feature1Title: 'सत्यापनीय ज्ञान नेटवर्क',
    feature1Desc: 'शोधकर्ताओं, अभियानों, आइस-कोर डेटासेट और शोध पत्रों को एक एकीकृत संबंधपरक नेटवर्क में जोड़ें।',
    feature2Title: 'सटीक संदर्भों वाला AI सहायक',
    feature2Desc: 'हजारों ध्रुवीय वैज्ञानिक रिपोर्टों से सीधे उद्धृत और सत्यापित उत्तर प्राप्त करें।',
    feature3Title: 'ब्राउज़र में डेटा विज़ुअलाइज़ेशन',
    feature3Desc: 'बिना कोई सॉफ्टवेयर डाउनलोड किए सीधे तापमान, लवणता और बर्फ की मोटाई के लाइव चार्ट देखें।',
    feature4Title: 'स्वचालित बहुभाषी आउटरीच',
    feature4Desc: 'AI जटिल वैज्ञानिक अध्ययनों को सरल व्याख्याओं, प्रेस विज्ञप्तियों और भारतीय भाषाओं में अनुवादित करता है।',

    statStations: 'स्थायी ध्रुवीय स्टेशन',
    statExpeditions: 'संपन्न वैज्ञानिक अभियान',
    statDatasets: 'खुले अनुसंधान डेटासेट',
    statPublications: 'समीक्षित शोध पत्र',
    statScientists: 'सक्रिय ध्रुवीय वैज्ञानिक',

    footerAboutTitle: 'NCPOR एवं हिमसागर के बारे में',
    footerAboutDesc: 'राष्ट्रीय ध्रुवीय एवं महासागर अनुसंधान केंद्र (NCPOR) भारत सरकार के पृथ्वी विज्ञान मंत्रालय के अधीन एक स्वायत्त अनुसंधान संस्थान है।',
    quickLinks: 'त्वरित लिंक',
    legalLinks: 'कानूनी एवं नीतियां',
    termsOfUse: 'उपयोग की शर्तें',
    privacyPolicy: 'गोपनीयता नीति',
    copyrightNotice: '© 2026 राष्ट्रीय ध्रुवीय एवं महासागर अनुसंधान केंद्र (NCPOR), पृथ्वी विज्ञान मंत्रालय, भारत सरकार। सर्वाधिकार सुरक्षित।',
    lastUpdated: 'पृष्ठ अंतिम अद्यतन: 1 सितंबर 2026',
    helpline: 'नागरिक हेल्पलाइन (टोल फ्री): 1800-11-MOES (1800-11-6637)',
  },
  bn: {
    govtIndia: 'ভারত সরকার',
    moesTitle: 'ভূ-বিজ্ঞান মন্ত্রক (MoES)',
    ncporTitle: 'জাতীয় মেরু ও মহাসাগর গবেষণা কেন্দ্র (NCPOR)',
    skipToMain: 'প্রধান সামগ্রীতে যান',
    screenReader: 'স্ক্রিন রিডার এক্সেস',
    accessibility: 'অ্যাক্সেসিবিলিটি বিকল্প',
    langSelect: 'ভাষা / Language',

    home: 'হোম',
    expeditions: 'অভিযান',
    stations: 'মেরু স্টেশনসমূহ',
    aiAssistant: 'AI গবেষণা সহকারী',
    interactiveMap: 'ইন্টারেক্টিভ মানচিত্র',
    dataExplorer: 'ডেটা এক্সপ্লোরার',
    articles: 'বিজ্ঞান প্রচার',
    researchers: 'বিজ্ঞানী ডিরেক্টরি',
    login: 'গবেষক লগইন',
    searchPlaceholder: 'প্রতিবেদন, ডেটাবেস, বা প্রজাতি খুঁজুন...',

    portalBadge: 'জাতীয় মেরু ও মহাসাগর বিজ্ঞান পোর্টাল',
    heroTitle: 'সমন্বিত মেরু বিজ্ঞান প্রচার ও জ্ঞান ভাণ্ডার',
    heroSubtitle: 'আর্কটিক ও অ্যান্টার্কটিক অভিযান, জলবায়ু ডেটাসেট এবং বিজ্ঞানী ও সাধারণ মানুষের জন্য AI-চালিত প্ল্যাটফর্ম।',
    exploreMapBtn: 'মেরু মানচিত্র দেখুন',
    askAssistantBtn: 'AI সহকারীকে প্রশ্ন করুন',
    exploreDataBtn: 'ডেটাসেট ও চার্ট এক্সপ্লোর করুন',
    latestNotice: 'সর্বশেষ: অ্যান্টার্কটিকায় ৪৪তম ভারতীয় বৈজ্ঞানিক অভিযানের ডেটা সংকলিত হয়েছে।',

    featuredImageTitle: 'বিশেষ মেরু পর্যবেক্ষণ: আর্কটিক সামুদ্রিক প্রাণী',
    featuredImageSubtitle: 'ভারতীয় আর্কটিক বৈজ্ঞানিক গবেষণা কেন্দ্র থেকে সরাসরি ছবি',
    featuredImageCaption: 'স্ভালবার্ডের নি-অলেসুন্ডে বরফ পর্যবেক্ষণের সময় পরিলক্ষিত মেরু ভালুক (Ursus maritimus)।',
    imageLocationTag: 'নি-অলেসুন্ড, স্ভালবার্ড',
    imageStationTag: 'হিমাদ্রি স্টেশন (আর্কটিক)',
    imageExpeditionTag: '১৭তম ভারতীয় আর্কটিক অভিযান',
    imageCoordsTag: '৭৮°৫৫′ উত্তর, ১১°৫৬′ পূর্ব',
    explainSimplyBtn: 'সহজ ভাষায় বুঝুন (শিক্ষার্থীদের জন্য)',
    explainDetailedBtn: 'বিজ্ঞানী বিশ্লেষণ (গবেষকদের জন্য)',
    simpleExplanation: 'মেরু ভালুক বেঁচে থাকার জন্য সামুদ্রিক বরফের ওপর নির্ভর করে। হিমাদ্রি স্টেশনে ভারতীয় বিজ্ঞানীরা বরফ গলার প্রভাব ও ভারতীয় মৌসুমি বায়ুর পরিবর্তন নিয়ে গবেষণা করছেন।',
    detailedExplanation: 'আর্কটিক শীর্ষ শিকারী প্রাণীর উপর দীর্ঘমেয়াদী গবেষণা কংগসফজোর্ডেন বরফ কাঠামোর পরিবর্তনের সাথে সম্পর্কিত।',
    viewSourceDocument: 'যাচাইকৃত মূল প্রতিবেদন দেখুন (MoES-NCPOR-2024-R12)',

    stationsTitle: 'ভারতের মেরু ও হিমবাহ গবেষণা স্টেশন',
    stationsSubtitle: 'আর্কটিক, অ্যান্টার্কটিকা ও উচ্চ হিমালয়ে অবিচ্ছিন্ন বৈজ্ঞানিক পর্যবেক্ষণ।',
    stationMaitriTitle: 'মৈত্রী স্টেশন (অ্যান্টার্কটিকা)',
    stationMaitriDesc: '১৯৮৯ সালে প্রতিষ্ঠিত। ভূতত্ত্ব ও বায়ুমণ্ডলীয় বিজ্ঞানের উপর দৃষ্টি নিবদ্ধ।',
    stationBharatiTitle: 'ভারতী স্টেশন (অ্যান্টার্কটিকা)',
    stationBharatiDesc: '২০১২ সাল থেকে কার্যকর অত্যাধুনিক সমুদ্রবিজ্ঞান গবেষণা কেন্দ্র।',
    stationHimadriTitle: 'হিমাদ্রি স্টেশন (আর্কটিক)',
    stationHimadriDesc: 'নরওয়ের স্ভালবার্ডে ২০০৮ সালে প্রতিষ্ঠিত ভারতের স্থায়ী মেরু গবেষণা কেন্দ্র।',
    stationHimanshTitle: 'হিমাংশ স্টেশন (হিমালয়)',
    stationHimanshDesc: 'হিমাচল প্রদেশের স্পিতি উপত্যকায় ৪,০০০ মিটার উচ্চতায় অবস্থিত গ্লেসিওলজি কেন্দ্র।',
    viewAllStations: 'মানচিত্রে সমস্ত স্টেশন দেখুন →',
    stationActiveStatus: 'সক্রিয় / সর্বদা কার্যকর',

    featuresTitle: 'হিমসাগর পোর্টালের মূল বৈশিষ্ট্য',
    featuresSubtitle: 'কৃত্রিম বুদ্ধিমত্তার মাধ্যমে মেরু বিজ্ঞানকে সহজবোধ্য করে তোলা।',
    feature1Title: 'তথ্যসূত্রযুক্ত নলেজ গ্রাফ',
    feature1Desc: 'বিজ্ঞানী, অভিযান এবং ডেটাসেটকে একটি সমন্বিত নেটওয়ার্কে যুক্ত করুন।',
    feature2Title: 'সঠিক সাইটেশনযুক্ত AI সহকারী',
    feature2Desc: 'হাজার হাজার মেরু বৈজ্ঞানিক প্রতিবেদন থেকে তাৎক্ষণিক ও নির্ভুল উত্তর পান।',
    feature3Title: 'ব্রাউজারেই লাইভ ডেটা চার্ট',
    feature3Desc: 'কোনো সফটওয়্যার ছাড়াই সরাসরি তাপমাত্রা ও বরফের গভীরতার গ্রাফ দেখুন।',
    feature4Title: 'স্বয়ংক্রিয় বহুভাষিক প্রচার',
    feature4Desc: 'জটিল বৈজ্ঞানিক গবেষণাকে সহজ ভাষায় এবং আঞ্চলিক ভাষায় রূপান্তর।',

    statStations: 'স্থায়ী মেরু স্টেশন',
    statExpeditions: 'সম্পন্ন বৈজ্ঞানিক অভিযান',
    statDatasets: 'গবেষণা ডেটাসেট',
    statPublications: 'প্রকাশিত গবেষণাপত্র',
    statScientists: 'সক্রিয় মেরু বিজ্ঞানী',

    footerAboutTitle: 'NCPOR ও হিমসাগর সম্পর্কে',
    footerAboutDesc: 'জাতীয় মেরু ও মহাসাগর গবেষণা কেন্দ্র (NCPOR) ভারত সরকারের ভূ-বিজ্ঞান মন্ত্রকের অধীনস্থ একটি স্বায়ত্তশাসিত প্রতিষ্ঠান।',
    quickLinks: 'প্রয়োজনীয় লিঙ্ক',
    legalLinks: 'আইনি শর্তাবলী',
    termsOfUse: 'ব্যবহারের শর্তাবলী',
    privacyPolicy: 'গোপনীয়তা নীতি',
    copyrightNotice: '© ২০২৬ জাতীয় মেরু ও মহাসাগর গবেষণা কেন্দ্র (NCPOR), ভারত সরকার।',
    lastUpdated: 'পৃষ্ঠা হালনাগাদ: ১ সেপ্টেম্বর ২০২৬',
    helpline: 'টোল ফ্রি হেল্পলাইন: 1800-11-MOES (1800-11-6637)',
  },
  ta: {
    govtIndia: 'இந்திய அரசு',
    moesTitle: 'புவி அறிவியல் அமைச்சகம் (MoES)',
    ncporTitle: 'துருவ மற்றும் கடல் ஆராய்ச்சிக்கான தேசிய மையம் (NCPOR)',
    skipToMain: 'முக்கிய பகுதிக்குச் செல்க',
    screenReader: 'திரை வாசிப்பான் அணுகல்',
    accessibility: 'அணுகல்தன்மை விருப்பங்கள்',
    langSelect: 'மொழி / Language',

    home: 'முகப்பு',
    expeditions: 'ஆய்வுப் பயணங்கள்',
    stations: 'துருவ நிலையங்கள்',
    aiAssistant: 'AI ஆராய்ச்சி உதவியாளர்',
    interactiveMap: 'ஊடாடும் வரைபடம்',
    dataExplorer: 'தரவு ஆய்வாளர்',
    articles: 'அறிவியல் பரப்புரை',
    researchers: 'விஞ்ஞானிகள் பட்டியல்',
    login: 'ஆராய்ச்சியாளர் உள்நுழைவு',
    searchPlaceholder: 'அறிக்கைகள், தரவுத்தொகுப்புகள், துருவப் பயணங்களைத் தேடுங்கள்...',

    portalBadge: 'தேசிய துருவ மற்றும் கடல் அறிவியல் தளம்',
    heroTitle: 'ஒருங்கிணைந்த துருவ அறிவியல் பரப்புரை மற்றும் அறிவு களஞ்சியம்',
    heroSubtitle: 'ஆர்க்டிக் & அண்டார்டிக் பயணங்கள், காலநிலை தரவுகள் மற்றும் AI அறிவியல் தளத்தை இணைக்கும் தளம்.',
    exploreMapBtn: 'துருவ வரைபடத்தை ஆராய்க',
    askAssistantBtn: 'AI உதவியாளரிடம் கேளுங்கள்',
    exploreDataBtn: 'தரவுகள் மற்றும் விளக்கப்படங்கள்',
    latestNotice: 'சமீபத்திய தகவல்: அண்டார்டிகாவிற்கான 44வது இந்திய அறிவியல் பயணம் வெற்றிகரமாக பதிவு செய்யப்பட்டது.',

    featuredImageTitle: 'சிறப்பு துருவ கண்காணிப்பு: ஆர்க்டிக் கடல்வாழ் உயிரினங்கள்',
    featuredImageSubtitle: 'இந்திய ஆர்க்டிக் ஆராய்ச்சி தளத்தில் இருந்து நேரடி புகைப்பட பதிவு',
    featuredImageCaption: 'ஸ்வால்பார்டில் கடல் பனி கண்காணிப்பின் போது காணப்பட்ட துருவ கரடி (Ursus maritimus).',
    imageLocationTag: 'நியூ-அலேசுண்ட், ஸ்வால்பார்ட்',
    imageStationTag: 'ஹிமாத்ரி நிலையம் (ஆர்க்டிக்)',
    imageExpeditionTag: '17வது இந்திய ஆர்க்டிக் பயணம்',
    imageCoordsTag: '78°55′ N, 11°56′ E',
    explainSimplyBtn: 'எளிய விளக்கம் (மாணவர்களுக்கு)',
    explainDetailedBtn: 'அறிவியல் விளக்கம் (ஆராய்ச்சியாளர்களுக்கு)',
    simpleExplanation: 'துருவக் கரடிகள் வாழ்வதற்கு கடல் பனி மிகவும் அவசியமானது. ஹிமாத்ரி நிலையத்தில் உள்ள இந்திய விஞ்ஞானிகள் பனி உருகுவதையும் அது இந்திய பருவமழையை எவ்வாறு பாதிக்கிறது என்பதையும் ஆய்வு செய்கிறார்கள்.',
    detailedExplanation: 'ஆர்க்டிக் கடல் பனி மாற்றங்களுடன் துருவக் கரடிகளின் வாழ்விட மாறுபாடுகள் ஆய்வு செய்யப்பட்டு MoES-ARC-2024-08 தரவுத்தொகுப்பில் பதிவு செய்யப்பட்டுள்ளன.',
    viewSourceDocument: 'ஆதார அறிக்கையைப் பார்க்கவும் (MoES-NCPOR-2024-R12)',

    stationsTitle: 'இந்தியாவின் துருவ ஆராய்ச்சி நிலையங்கள்',
    stationsSubtitle: 'ஆர்க்டிக், அண்டார்டிகா மற்றும் இமயமலையில் தொடர்ச்சியான அறிவியல் கண்காணிப்பு.',
    stationMaitriTitle: 'மைத்ரி நிலையம் (அண்டார்டிகா)',
    stationMaitriDesc: '1989 இல் நிறுவப்பட்டது. புவியியல் மற்றும் வளிமண்டல இயற்பியலில் கவனம் செலுத்துகிறது.',
    stationBharatiTitle: 'பாரதி நிலையம் (அண்டார்டிகா)',
    stationBharatiDesc: '2012 முதல் செயல்படும் அதிநவீன கடல்சார் ஆய்வு மையம்.',
    stationHimadriTitle: 'ஹிமாத்ரி நிலையம் (ஆர்க்டிக்)',
    stationHimadriDesc: 'நார்வேயில் 2008 இல் நிறுவப்பட்ட இந்தியாவின் நிரந்தர ஆர்க்டிக் ஆராய்ச்சி தளம்.',
    stationHimanshTitle: 'ஹிமான்ஷ் நிலையம் (இமயமலை)',
    stationHimanshDesc: 'இமாச்சலப் பிரதேசத்தில் 4,000 மீட்டர் உயரத்தில் உள்ள பனிப்பாறை ஆராய்ச்சி நிலையம்.',
    viewAllStations: 'அனைத்து நிலையங்களையும் வரைபடத்தில் காண்க →',
    stationActiveStatus: 'செயலில் உள்ள நிலையம்',

    featuresTitle: 'ஹிம்சாகர் தளத்தின் முக்கிய அம்சங்கள்',
    featuresSubtitle: 'செயற்கை நுண்ணறிவு மூலம் துருவ அறிவியலை எளிதாக அனைவரும் அறிந்துகொள்ளும் வசதி.',
    feature1Title: 'அறிவு வரைபடம் (Knowledge Graph)',
    feature1Desc: 'விஞ்ஞானிகள், பயணங்கள் மற்றும் ஆய்வுக் கட்டுரைகளை ஒருங்கிணைக்கும் அமைப்பு.',
    feature2Title: 'ஆதாரங்களுடன் கூடிய AI உதவியாளர்',
    feature2Desc: 'ஆயிரக்கணக்கான அறிவியல் அறிக்கைகளில் இருந்து சரியான பதில்களை உடனடியாகப் பெறுங்கள்.',
    feature3Title: 'நேரடி தரவு வரைபடங்கள்',
    feature3Desc: 'எந்த மென்பொருளும் இல்லாமல் நேரடியாக வெப்பநிலை மற்றும் பனி தடிமன் வரைபடங்களை ஆராயுங்கள்.',
    feature4Title: 'பன்மொழி அறிவியல் விளக்கம்',
    feature4Desc: 'கடினமான அறிவியல் ஆய்வுகளை எளிய மொழியிலும் பிராந்திய இந்திய மொழிகளிலும் மாற்றும் AI.',

    statStations: 'நிரந்தர துருவ நிலையங்கள்',
    statExpeditions: 'நடத்தப்பட்ட அறிவியல் பயணங்கள்',
    statDatasets: 'திறந்த ஆராய்ச்சி தரவுத்தொகுப்புகள்',
    statPublications: 'வெளியிடப்பட்ட ஆய்வுக் கட்டுரைகள்',
    statScientists: 'துருவ ஆராய்ச்சியாளர்கள்',

    footerAboutTitle: 'NCPOR மற்றும் ஹிம்சாகர் பற்றி',
    footerAboutDesc: 'தேசிய துருவ மற்றும் கடல் ஆராய்ச்சிக்கான மையம் (NCPOR) இந்திய அரசின் புவி அறிவியல் அமைச்சகத்தின் கீழ் இயங்கும் தன்னாட்சி நிறுவனம்.',
    quickLinks: 'முக்கிய இணைப்புகள்',
    legalLinks: 'சட்ட வழிகாட்டுதல்கள்',
    termsOfUse: 'பயன்பாட்டு விதிமுறைகள்',
    privacyPolicy: 'தனியுரிமைக் கொள்கை',
    copyrightNotice: '© 2026 தேசிய துருவ மற்றும் கடல் ஆராய்ச்சிக்கான மையம் (NCPOR), இந்திய அரசு.',
    lastUpdated: 'பக்கம் புதுப்பிக்கப்பட்டது: செப்டம்பர் 1, 2026',
    helpline: 'உதவி எண்: 1800-11-MOES (1800-11-6637)',
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  availableLanguages: { code: Language; label: string; nativeName: string }[];
}

const availableLanguages: { code: Language; label: string; nativeName: string }[] = [
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', label: 'Bengali', nativeName: 'বাংলা' },
  { code: 'ta', label: 'Tamil', nativeName: 'தமிழ்' },
];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('himsagar_language') as Language;
    if (saved && (saved === 'en' || saved === 'hi' || saved === 'bn' || saved === 'ta')) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('himsagar_language', lang);
    }
  };

  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
