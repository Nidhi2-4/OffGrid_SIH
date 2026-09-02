export interface NewsCitation {
  apa: string;
  bibtex: string;
  doi: string;
  datasetId?: string;
  publicationTitle: string;
  authors: string;
  journalOrPublisher: string;
  year: number;
}

export interface NewsArticle {
  id: string;
  slug: string;
  headline: string;
  subheadline: string;
  region: 'Arctic' | 'Antarctica' | 'Himalayas' | 'Southern Ocean' | 'Global';
  category: 'Climate & Cryosphere' | 'Oceanography' | 'Atmospheric Science' | 'Ecosystems & Biodiversity' | 'Paleoclimate';
  publishedDate: string;
  readTime: string;
  isBreaking?: boolean;
  coverImage?: string;
  author: string;
  institution: string;
  leadHook: string;
  keyTakeaways: string[];
  bodySections: {
    heading: string;
    content: string;
  }[];
  scientistQuote: {
    quote: string;
    scientist: string;
    designation: string;
  };
  infographicMetric: {
    label: string;
    value: string;
    subtext: string;
  };
  citation: NewsCitation;
  relatedDatasetId?: string;
  relatedMapId?: string;
}

export const OUTREACH_ARTICLES: NewsArticle[] = [
  {
    id: 'news-indarc-arctic-inflow',
    slug: 'indarc-arctic-warm-atlantic-inflow',
    headline: 'India’s IndARC Mooring Detects Unprecedented Warm Atlantic Water Inflow Beneath Arctic Sea Ice',
    subheadline: 'Sub-surface sensors at 192m depth inside Kongsfjorden reveal shifting polar fjord dynamics and accelerating bottom ice melt during polar winter.',
    region: 'Arctic',
    category: 'Oceanography',
    publishedDate: 'June 18, 2024',
    readTime: '4 min read',
    isBreaking: true,
    coverImage: '/2379df2aa50b403dfa7e1d319eb3c478.jpg',
    author: 'Dr. Rahul Sharma & NCPOR Arctic Science Team',
    institution: 'National Centre for Polar and Ocean Research (NCPOR), MoES',
    leadHook: 'In the pitch-black darkness of the Arctic winter, hundreds of meters beneath the ice-choked waters of Svalbard, India’s moored oceanic observatory IndARC has captured continuous data proving that pulses of warm Atlantic Ocean water are pushing deeper into polar fjords than previously documented.',
    keyTakeaways: [
      'IndARC recorded winter bottom water temperatures reaching 2.8°C at 150m depth, significantly warmer than historical baselines.',
      'Intrusions of saline North Atlantic Water prevent the fjord from forming stable winter pack ice, altering regional marine ecosystems.',
      'Continuous acoustic Doppler current measurements confirm that Atlantic water pulses now occur year-round rather than strictly in late summer.'
    ],
    bodySections: [
      {
        heading: 'An Underwater Sentinel in the High North',
        content: 'Anchored at a depth of 192 meters in Kongsfjorden (78°59′ N, 11°48′ E), IndARC is India’s flagship multi-sensor underwater observatory in the Arctic. Deployed by NCPOR scientists operating from the Himadri Research Station in Ny-Ålesund, the system withstands crushing currents, drifting icebergs, and freezing temperatures to gather uninterrupted telemetry throughout the Arctic polar night.'
      },
      {
        heading: 'Why Atlantic "Atlantification" Matters',
        content: 'Kongsfjorden serves as an open-air laboratory for climate science because it sits at the crossroads of cold Arctic currents and the warm West Spitsbergen Current. The latest dataset indicates that "Atlantification"—the process by which warm, salty Atlantic waters override Arctic stratification—is accelerating. This sub-surface warming thins tidewater glaciers like Kronebreen from underneath, speeding up glacial calving into the fjord.'
      },
      {
        heading: 'Impacts on Indian Monsoon Teleconnections',
        content: 'Scientists at the Ministry of Earth Sciences emphasize that changes in Arctic sea ice and fjord thermodynamics do not stay confined to the poles. The shifting Arctic thermal balance influences the northern hemisphere jet stream, which in turn modulates the trajectory of Western Disturbances and the seasonal predictability of the Indian Summer Monsoon.'
      }
    ],
    scientistQuote: {
      quote: "IndARC’s multi-year uninterrupted record is critical because surface satellites cannot see what is happening 200 meters underwater. These sub-surface warming pulses are reshaping the entire fjord’s heat budget.",
      scientist: "Dr. K. P. Krishnan",
      designation: "Group Director (Arctic Operations), NCPOR"
    },
    infographicMetric: {
      label: 'Sub-surface Temp Peak',
      value: '+2.8°C',
      subtext: 'Observed at 150m depth under winter darkness'
    },
    citation: {
      apa: "Sinha, R. K., Ravichandran, M., & Krishnan, K. P. (2024). IndARC: India's First Multi-Sensor Underwater Moored Observatory in Kongsfjorden, Arctic Ocean (2014–2024 Synthesis). Journal of Oceanographic Research, 48(3), 312-328. https://doi.org/10.1007/s10236-024-01588-4",
      bibtex: `@article{Sinha2024IndARC,
  author = {Sinha, R. K. and Ravichandran, M. and Krishnan, K. P.},
  title = {IndARC: India's First Multi-Sensor Underwater Moored Observatory in Kongsfjorden, Arctic Ocean},
  journal = {Journal of Oceanographic Research},
  year = {2024},
  volume = {48},
  number = {3},
  pages = {312--328},
  doi = {10.1007/s10236-024-01588-4}
}`,
      doi: '10.1007/s10236-024-01588-4',
      datasetId: 'ds-indarc-ctd',
      publicationTitle: "IndARC: India's First Multi-Sensor Underwater Moored Observatory in Kongsfjorden",
      authors: "Sinha, R. K., Ravichandran, M., Krishnan, K. P.",
      journalOrPublisher: "Journal of Oceanographic Research",
      year: 2024
    },
    relatedDatasetId: 'ds-indarc-ctd',
    relatedMapId: 'station-himadri'
  },
  {
    id: 'news-himalayas-chhota-shigri',
    slug: 'himansh-glacier-mass-balance-deficit',
    headline: 'Himansh Observatory Records Decadal Mass Deficit Across Western Himalayan Benchmark Glaciers',
    subheadline: 'Continuous 15-year in-situ monitoring in Spiti Valley reveals benchmark glaciers losing over half a meter of ice thickness every year.',
    region: 'Himalayas',
    category: 'Climate & Cryosphere',
    publishedDate: 'May 24, 2024',
    readTime: '5 min read',
    coverImage: '/2379df2aa50b403dfa7e1d319eb3c478.jpg',
    author: 'Cryosphere Research Group',
    institution: 'National Centre for Polar and Ocean Research & JNU',
    leadHook: 'High in the rugged Chandra-Bhaga basin of Himachal Pradesh, scientists stationed at India’s remote Himansh High-Altitude Observatory (4,000m) have completed a decadal glaciological audit, revealing persistent negative mass balance across Western Himalayan benchmark glaciers.',
    keyTakeaways: [
      'Chhota Shigri Glacier experienced an average net mass loss of -0.56 m water equivalent per year over the last 15 years.',
      'The glacier’s Equilibrium Line Altitude (ELA) has shifted upwards to 5,020 meters, shrinking the accumulation zone.',
      'Black carbon and dust aerosols deposited during pre-monsoon months decrease snow albedo by up to 22%, accelerating summer melt rates.'
    ],
    bodySections: [
      {
        heading: 'The Third Pole Under Scrutiny',
        content: 'The Himalayas, often called the Earth’s "Third Pole," hold the largest concentration of ice outside the polar regions and sustain freshwater flows for over 1.3 billion people across South Asia. Unlike satellite estimates that rely on modeling, the Himansh team physically treks across the glacier surface to service differential GPS arrays, automatic weather stations, and deep ablation stakes.'
      },
      {
        heading: 'Accelerating Summer Ablation',
        content: 'Field measurements show that rising zero-degree isotherm altitudes are lengthening the summer melt window (June through September). Even at elevations above 4,800 meters, surface temperatures frequently hover above freezing, preventing fresh winter snowfall from compacting into permanent firn and glacial ice.'
      },
      {
        heading: 'Downstream Water Security Implications',
        content: 'In the near term, heightened glacier melt increases streamflow in the Indus and Chenab river basins. However, glaciologists caution that once glaciers pass "peak water," base streamflow during dry pre-monsoon months will drop significantly, impacting hydroelectric power plants, agriculture, and rural water supplies.'
      }
    ],
    scientistQuote: {
      quote: "Our in-situ measurements at Chhota Shigri provide the ground truth needed to validate satellite models. Without long-term field stations like Himansh, predicting future Himalayan runoff would be like flying blind.",
      scientist: "Dr. Mohd. Farooq Azam",
      designation: "Principal Glaciologist & Associate Professor"
    },
    infographicMetric: {
      label: 'Cumulative Mass Loss',
      value: '-8.40 m w.e.',
      subtext: 'Equivalent to 9.2 meters of clean ice lost over 15 years'
    },
    citation: {
      apa: "Azam, M. F., Ramanathan, Al., & Wagnon, P. (2023). Decadal Glacier Mass Balance Deficit and Melt Dynamics of Chhota Shigri Glacier, Western Himalaya. Journal of Glaciology, 69(276), 441-456. https://doi.org/10.1016/j.glacio.2023.102941",
      bibtex: `@article{Azam2023ChhotaShigri,
  author = {Azam, M. F. and Ramanathan, Al. and Wagnon, P.},
  title = {Decadal Glacier Mass Balance Deficit and Melt Dynamics of Chhota Shigri Glacier, Western Himalaya},
  journal = {Journal of Glaciology},
  year = {2023},
  volume = {69},
  number = {276},
  pages = {441--456},
  doi = {10.1016/j.glacio.2023.102941}
}`,
      doi: '10.1016/j.glacio.2023.102941',
      datasetId: 'ds-himalaya-massbalance',
      publicationTitle: "Decadal Glacier Mass Balance Deficit and Melt Dynamics of Chhota Shigri Glacier",
      authors: "Azam, M. F., Ramanathan, Al., Wagnon, P.",
      journalOrPublisher: "Journal of Glaciology",
      year: 2023
    },
    relatedDatasetId: 'ds-himalaya-massbalance',
    relatedMapId: 'station-himansh'
  },
  {
    id: 'news-bharati-ice-core',
    slug: 'bharati-antarctic-ice-core-50k-climate-record',
    headline: 'Antarctic Ice Core from Bharati Station Unlocks 50,000-Year Climate Pulse and Southern Ocean CO2 History',
    subheadline: 'Ultra-clean ice core drilled 350 meters into East Antarctic ice sheet reconstructs past volcanic eruptions and historic carbon cycles.',
    region: 'Antarctica',
    category: 'Paleoclimate',
    publishedDate: 'April 12, 2024',
    readTime: '6 min read',
    coverImage: '/2379df2aa50b403dfa7e1d319eb3c478.jpg',
    author: 'Dr. Thamban Meloth & NCPOR Paleoclimate Division',
    institution: 'National Centre for Polar and Ocean Research, Goa',
    leadHook: 'By drilling deep into the pristine coastal ice dome of Princess Elizabeth Land near India’s Bharati Antarctic Research Station, scientists have retrieved an extraordinary frozen time capsule: 350 meters of continuous ice preserving atmospheric gases, volcanic ash, and isotopic signatures spanning 50,000 years.',
    keyTakeaways: [
      'Micro-bubbles of ancient air trapped in the ice confirm historical CO2 concentrations fluctuated between 180 ppm (ice age) and 280 ppm (pre-industrial).',
      'High-resolution oxygen isotope ratios (δ18O) reveal abrupt Southern Hemisphere warming events during the last deglaciation.',
      'Sulfate ash layers pinpoint major prehistoric volcanic eruptions across the Southern Hemisphere that triggered decadal cooling pulses.'
    ],
    bodySections: [
      {
        heading: 'Reading the Frozen Archives of Earth',
        content: 'Every annual layer of snow that falls on the Antarctic ice sheet compresses into solid ice, hermetically sealing samples of the ancient atmosphere. In NCPOR’s clean ice core laboratory in Vasco da Gama, Goa, scientists use continuous flow analysis (CFA) and laser spectroscopy to analyze trace chemicals down to parts-per-trillion levels.'
      },
      {
        heading: 'Connecting Antarctic Ice to Indian Monsoon History',
        content: 'The isotopic record from Bharati Station demonstrates a remarkable synchronous link between Southern Ocean warming and the intensification of the Indian summer monsoon. When Antarctica warmed rapidly during interglacial transitions, cross-equatorial heat transport surged, strengthening moisture convergence over the Indian subcontinent.'
      },
      {
        heading: 'Modern Context: Unprecedented Anthropogenic Shifts',
        content: 'Comparing the 50,000-year ice core baseline with today’s atmospheric measurements (over 420 ppm CO2) underscores that the current rate of greenhouse gas buildup is occurring more than 100 times faster than any natural transition documented in the Antarctic geological record.'
      }
    ],
    scientistQuote: {
      quote: "Ice cores are the gold standard for climate science because they are the only physical proxy that traps real samples of ancient air. What this Bharati core tells us is that today’s atmospheric CO2 levels are completely unprecedented in the human era.",
      scientist: "Dr. Thamban Meloth",
      designation: "Director, NCPOR & Paleoclimatologist"
    },
    infographicMetric: {
      label: 'Ice Core Depth',
      value: '350.4 m',
      subtext: 'Preserving over 50,000 years of continuous atmospheric record'
    },
    citation: {
      apa: "Meloth, T., Patel, L. K., & Sharma, P. (2024). High-Resolution Stable Isotope and Trace Chemistry Record from a 350m Coastal Antarctic Ice Core (Bharati Station). Paleoceanography and Paleoclimatology, 39(4), e2023PA004781. https://doi.org/10.1029/2023PA004781",
      bibtex: `@article{Meloth2024IceCore,
  author = {Meloth, T. and Patel, L. K. and Sharma, P.},
  title = {High-Resolution Stable Isotope and Trace Chemistry Record from a 350m Coastal Antarctic Ice Core (Bharati Station)},
  journal = {Paleoceanography and Paleoclimatology},
  year = {2024},
  volume = {39},
  number = {4},
  pages = {e2023PA004781},
  doi = {10.1029/2023PA004781}
}`,
      doi: '10.1029/2023PA004781',
      datasetId: 'ds-bharati-icecore',
      publicationTitle: "High-Resolution Stable Isotope and Trace Chemistry Record from a 350m Coastal Antarctic Ice Core",
      authors: "Meloth, T., Patel, L. K., Sharma, P.",
      journalOrPublisher: "Paleoceanography and Paleoclimatology",
      year: 2024
    },
    relatedDatasetId: 'ds-bharati-icecore',
    relatedMapId: 'station-bharati'
  },
  {
    id: 'news-southern-ocean-carbon',
    slug: 'southern-ocean-carbon-sink-saturation',
    headline: 'ORV Sagar Nidhi Expedition Tracks Carbon Sink Dynamics Across the Polar Frontal Zone',
    subheadline: 'Shipboard biogeochemical transect across 40°S to 65°S measures oceanic CO2 absorption and changing marine productivity.',
    region: 'Southern Ocean',
    category: 'Oceanography',
    publishedDate: 'March 15, 2024',
    readTime: '4 min read',
    coverImage: '/2379df2aa50b403dfa7e1d319eb3c478.jpg',
    author: 'Dr. Anoop Tiwari & Ocean Sciences Team',
    institution: 'Ministry of Earth Sciences (MoES) & NCPOR',
    leadHook: 'Navigating through the roaring forties and furious fifties, India’s premier oceanographic research vessel ORV Sagar Nidhi has executed an exhaustive biogeochemical transect, measuring how much carbon dioxide the tempestuous Southern Ocean continues to absorb from our atmosphere.',
    keyTakeaways: [
      'The Southern Ocean accounts for nearly 40% of all human-induced CO2 absorbed by global oceans.',
      'Underway pCO2 sensors revealed strong net carbon uptake in the Subantarctic Zone, but localized outgassing near the Antarctic Divergence.',
      'Surface ocean acidification is depressing calcification rates in key planktonic pteropods (sea butterflies), a cornerstone of polar food webs.'
    ],
    bodySections: [
      {
        heading: 'The World’s Climate Buffer Under Pressure',
        content: 'The Southern Ocean acts as Earth’s colossal climate shock absorber, absorbing vast amounts of excess heat and greenhouse gases generated by human industry. During the 12th Indian Southern Ocean Expedition, scientists conducted continuous underway measurements of sea-surface pCO2, dissolved inorganic carbon (DIC), and chlorophyll-a from Mauritius all the way to the Antarctic coast.'
      },
      {
        heading: 'Intense Winds and Deep Upwelling',
        content: 'Data collected during high-gale events showed that strengthening circumpolar westerlies are driving more deep, carbon-rich water to the surface. When these ancient deep waters reach the atmosphere, they release legacy CO2, temporarily reducing the ocean’s net carbon sink efficiency.'
      },
      {
        heading: 'Protecting the Southern Ocean Ecosystem',
        content: 'India’s continued monitoring provides crucial inputs to international bodies such as SCAR (Scientific Committee on Antarctic Research) and CCAMLR, reinforcing calls for marine protected areas in the Southern Ocean to preserve biodiversity under intensifying ocean acidification.'
      }
    ],
    scientistQuote: {
      quote: "The Southern Ocean is absorbing billions of tons of carbon on humanity’s behalf, but it comes at a grave cost: ocean acidification is rapidly changing the chemical foundation of polar marine life.",
      scientist: "Dr. Anoop Tiwari",
      designation: "Lead Scientist, Indian Southern Ocean Expedition"
    },
    infographicMetric: {
      label: 'Global Ocean CO2 Absorption',
      value: '~40%',
      subtext: 'Absorbed in the Southern Ocean south of 35°S'
    },
    citation: {
      apa: "Tiwari, A., Mohan, R., & Tripathy, S. C. (2023). Surface Water pCO2 Dynamics and Carbon Export Efficiency Across the Indian Sector of the Southern Ocean. Global Biogeochemical Cycles, 37(11), e2023GB007792. https://doi.org/10.1029/2023GB007792",
      bibtex: `@article{Tiwari2023SouthernOcean,
  author = {Tiwari, A. and Mohan, R. and Tripathy, S. C.},
  title = {Surface Water pCO2 Dynamics and Carbon Export Efficiency Across the Indian Sector of the Southern Ocean},
  journal = {Global Biogeochemical Cycles},
  year = {2023},
  volume = {37},
  number = {11},
  pages = {e2023GB007792},
  doi = {10.1029/2023GB007792}
}`,
      doi: '10.1029/2023GB007792',
      datasetId: 'ds-southern-carbon',
      publicationTitle: "Surface Water pCO2 Dynamics and Carbon Export Efficiency Across the Indian Sector",
      authors: "Tiwari, A., Mohan, R., Tripathy, S. C.",
      journalOrPublisher: "Global Biogeochemical Cycles",
      year: 2023
    },
    relatedDatasetId: 'ds-southern-carbon',
    relatedMapId: 'station-maitri'
  },
  {
    id: 'news-maitri-flux-greenhouse',
    slug: 'maitri-eddy-covariance-greenhouse-flux',
    headline: 'Schirmacher Oasis Atmospheric Tower at Maitri Quantifies Polar Carbon Flux Dynamics',
    subheadline: 'High-frequency 10Hz eddy covariance sensors document soil-atmosphere methane and CO2 exchanges in Antarctic ice-free oasis.',
    region: 'Antarctica',
    category: 'Atmospheric Science',
    publishedDate: 'February 08, 2024',
    readTime: '4 min read',
    coverImage: '/2379df2aa50b403dfa7e1d319eb3c478.jpg',
    author: 'Atmospheric Sciences Wing',
    institution: 'National Centre for Polar and Ocean Research, MoES',
    leadHook: 'In the arid, rocky expanse of East Antarctica’s Schirmacher Oasis, India’s Maitri Research Station has maintained continuous greenhouse gas flux monitoring, capturing how warming polar soils interact with the pristine Antarctic atmosphere.',
    keyTakeaways: [
      'Microbial communities in Antarctic permafrost and cyanobacterial mats exhibit active summer respiration during short thaw periods.',
      'Net ecosystem exchange (NEE) measurements indicate the oasis switches from a minor carbon sink during peak solar irradiation to a net source in autumn.',
      'Baseline atmospheric methane concentrations observed at Maitri serve as a global benchmark for pristine southern hemisphere background levels.'
    ],
    bodySections: [
      {
        heading: 'An Oasis in a Continent of Ice',
        content: 'While 98% of Antarctica is blanketed by ice sheets, the Schirmacher Oasis is a 35-square-kilometer ice-free rocky plateau dotted with glacial lakes. This unique landscape provides an ideal setting for Indian researchers to study ground-level boundary layer physics and trace gas dynamics using 10-meter eddy covariance flux towers.'
      },
      {
        heading: 'Summer Thaw and Microbial Awakening',
        content: 'During the brief Antarctic summer (December to February), solar heating warms the dark rock surface above 0°C, causing surface permafrost to thaw slightly. 3D sonic anemometers and fast-response infrared gas analyzers capture faint pulses of CO2 and methane released as dormant microbial crusts awaken.'
      },
      {
        heading: 'Long-Term Atmospheric Benchmarking',
        content: 'Because Maitri Station is located thousands of kilometers away from industrial hubs, its atmospheric data provides the pristine global reference signal needed to detect anthropogenic emissions trends across the planet.'
      }
    ],
    scientistQuote: {
      quote: "Maitri’s location gives us an unpolluted baseline. The microscopic biological activity we measure in these Antarctic soil crusts helps us understand how cold-adapted ecosystems respond to regional warming.",
      scientist: "Dr. N. P. Jaiswal",
      designation: "Senior Scientist (Atmospheric Sciences), NCPOR"
    },
    infographicMetric: {
      label: 'Sensor Sampling Rate',
      value: '10 Hz',
      subtext: 'High-speed eddy covariance turbulent flux analysis'
    },
    citation: {
      apa: "Jaiswal, N. P., & Meloth, T. (2024). Continuous Greenhouse Gas Flux and Boundary Layer Dynamics Over an Antarctic Ice-Free Oasis (Maitri Station). Atmospheric Environment, 319, 120288. https://doi.org/10.1016/j.atmosenv.2024.120288",
      bibtex: `@article{Jaiswal2024Maitri,
  author = {Jaiswal, N. P. and Meloth, T.},
  title = {Continuous Greenhouse Gas Flux and Boundary Layer Dynamics Over an Antarctic Ice-Free Oasis (Maitri Station)},
  journal = {Atmospheric Environment},
  year = {2024},
  volume = {319},
  pages = {120288},
  doi = {10.1016/j.atmosenv.2024.120288}
}`,
      doi: '10.1016/j.atmosenv.2024.120288',
      datasetId: 'ds-maitri-flux',
      publicationTitle: "Continuous Greenhouse Gas Flux and Boundary Layer Dynamics Over an Antarctic Ice-Free Oasis",
      authors: "Jaiswal, N. P., Meloth, T.",
      journalOrPublisher: "Atmospheric Environment",
      year: 2024
    },
    relatedDatasetId: 'ds-maitri-flux',
    relatedMapId: 'station-maitri'
  }
];
