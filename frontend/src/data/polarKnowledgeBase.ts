export interface KnowledgeItem {
  id: string;
  citationId: number;
  title: string;
  category: 'cryosphere' | 'oceanography' | 'biology' | 'expeditions' | 'stations' | 'climate';
  authors: string;
  year: number;
  doi?: string;
  institution: string;
  region: 'Arctic' | 'Antarctica' | 'Himalayas' | 'Southern Ocean' | 'Global';
  mapEntityId?: string;
  summary: string;
  scientificContext: string;
  studentExplanation: string;
  keyMetrics?: { [key: string]: string };
  rawExcerpt: string;
  tags: string[];
}

export const POLAR_KNOWLEDGE_BASE: KnowledgeItem[] = [
  {
    id: 'chhota-shigri-mass-balance',
    citationId: 1,
    title: 'Decadal Glacier Mass Balance Deficit and Melt Dynamics of Chhota Shigri Glacier, Western Himalaya',
    category: 'cryosphere',
    authors: 'Azam, M. F., Ramanathan, Al., Wagnon, P., et al.',
    year: 2023,
    doi: '10.1016/j.glacio.2023.102941',
    institution: 'NCPOR & JNU School of Environmental Sciences',
    region: 'Himalayas',
    mapEntityId: 'data-chhota-shigri',
    summary: 'Continuous 15-year in-situ glaciological mass balance monitoring from Himansh Base (Spiti) reveals an average annual net mass loss rate of -0.56 ± 0.15 m w.e. a⁻¹.',
    scientificContext: 'Chhota Shigri Glacier (32.28° N, 77.52° E, area ~15.7 km², elevation 4050–6263 m a.s.l.) serves as the benchmark glacier for the Chandra-Bhaga basin. High-resolution stake networks and differential GPS measurements demonstrate accelerating summer ablation driven by rising 0°C isotherm altitudes and decreasing winter albedo caused by regional black carbon deposition.',
    studentExplanation: 'Think of the Chhota Shigri glacier like a giant ice bank account. Every winter, snowfall deposits new ice, but in the hot summers, ice melts away. Over the last 15 years, the glacier has been losing more ice than it gains every single year—losing about half a meter of ice thickness annually because of warmer mountain temperatures.',
    keyMetrics: {
      'Mean Mass Balance': '-0.56 m w.e. / yr',
      'Equilibrium Line Altitude (ELA)': '5,020 m a.s.l.',
      'Ablation Season': 'June – September',
      'Monitoring Station': 'Himansh (4,000m, Spiti Valley)'
    },
    rawExcerpt: 'Field observations conducted by the NCPOR Cryosphere Division at Chhota Shigri Glacier show a cumulative mass deficit of -8.4 m w.e. over the 2002–2022 observational window. Geodetic mass balance computed via TanDEM-X radar interferometry closely corroborates glaciological stake measurements.',
    tags: ['Chhota Shigri', 'Himansh', 'Himalayan Glaciers', 'Mass Balance', 'Cryosphere', 'Spiti']
  },
  {
    id: 'indarc-arctic-mooring',
    citationId: 2,
    title: 'IndARC: India\'s First Multi-Sensor Underwater Moored Observatory in Kongsfjorden, Arctic Ocean',
    category: 'oceanography',
    authors: 'Sinha, R. K., Ravichandran, M., et al.',
    year: 2024,
    doi: '10.1007/s10236-024-01588-4',
    institution: 'National Centre for Polar and Ocean Research (NCPOR)',
    region: 'Arctic',
    mapEntityId: 'dataset-indarc-fjord',
    summary: 'Moored at 192m depth in the Kongsfjorden fjord near Ny-Ålesund, IndARC measures year-round salinity, temperature, turbidity, dissolved oxygen, and ocean currents under total winter sea ice cover.',
    scientificContext: 'IndARC (78°59′ N, 11°48′ E) captures the seasonal interplay between fresh cold glacial meltwater runoff from Kronebreen and the pulsatile intrusion of warm, saline North Atlantic Water (NAW) carried by the West Spitsbergen Current (WSC). Continuous acoustic Doppler current profiling (ADCP) indicates winter Atlantic water pulses exceeding 2.8°C at 150m depth.',
    studentExplanation: 'IndARC is like an underwater weather station anchored deep inside an Arctic fjord. Even when the surface ocean is frozen solid in the freezing polar winter darkness, IndARC stays underwater measuring the water\'s temperature and saltiness to check if warm water from the Atlantic Ocean is creeping in and melting the glaciers from below.',
    keyMetrics: {
      'Mooring Depth': '192 meters',
      'Location': 'Kongsfjorden, Svalbard',
      'Instruments': 'Seabird CTD, ADCP Current Profiler, ParSci Sensor',
      'Key Discovery': 'Accelerating winter Atlantic water inflow pulses'
    },
    rawExcerpt: 'The IndARC moored observatory deployed in Kongsfjorden at 78°59.2′N, 11°48.6′E has continuously acquired oceanographic time-series since July 2014. The data revealed unseasonal mid-winter warming events with temperature jumps exceeding +3.2°C coinciding with extreme atmospheric river passages.',
    tags: ['IndARC', 'Arctic', 'Kongsfjorden', 'Himadri', 'CTD Mooring', 'Oceanography']
  },
  {
    id: '43-isea-antarctica-expedition',
    citationId: 3,
    title: 'Scientific Summary & Operational Log of the 43rd Indian Scientific Expedition to Antarctica (43-ISEA)',
    category: 'expeditions',
    authors: 'Beg, M. J., Lal, M., & 43-ISEA Science Team',
    year: 2024,
    doi: '10.5281/zenodo.10842190',
    institution: 'MoES & NCPOR',
    region: 'Antarctica',
    mapEntityId: 'expedition-43-isea',
    summary: 'The 43rd expedition onboard MV Vasiliy Golovnin conducted 48 scientific projects across Bharati (Larsemann Hills), Maitri (Schirmacher Oasis), and the Central Dronning Maud Land ice plateau.',
    scientificContext: 'The expedition executed deep ice-core drilling reaching 122m at sub-Antarctic ice dome sites, installed automated geomagnetic fluxgate sensors, retrieved year-long lichen physiological data, and conducted oceanographic CTD stations across the Southern Ocean 50°S–69°S frontal systems.',
    studentExplanation: '43-ISEA was India\'s 43rd polar mission to Antarctica in 2023–2024. A team of scientists sailed across stormy Southern Ocean waters on an icebreaker ship to live in the freezing cold. They drilled deep ice cores (like time capsules trapped in ice) to study ancient air from hundreds of years ago.',
    keyMetrics: {
      'Voyage Duration': '108 Days',
      'Vessel': 'MV Vasiliy Golovnin',
      'Scientific Projects': '48 peer-approved projects',
      'Participating Institutes': '18 national laboratories & universities'
    },
    rawExcerpt: 'During 43-ISEA, 42 wintering members and 46 summer scientists completed operational maintenance of Bharati and Maitri stations. A specialized ice-core drilling operation successfully extracted a 122m pristine firn core from the Amery Ice Shelf hinterland.',
    tags: ['43-ISEA', 'Antarctica', 'Bharati', 'Maitri', 'Expedition', 'Icebreaker']
  },
  {
    id: 'antarctic-ozone-hole-monitoring',
    citationId: 4,
    title: 'Long-term Total Column Ozone and Stratospheric Aerosol Optical Depth Measurements over Maitri Station',
    category: 'climate',
    authors: 'Purohit, A., Ghude, S. D., & NCPOR Atmospheric Group',
    year: 2023,
    doi: '10.1029/2023JD038712',
    institution: 'NCPOR & Indian Institute of Tropical Meteorology (IITM)',
    region: 'Antarctica',
    mapEntityId: 'station-maitri',
    summary: 'Dobson Spectrophotometer (No. 153) and ozonesonde soundings at Maitri Station (70°45′ S, 11°44′ E) track spring ozone depletion and recovery trends under the Montreal Protocol.',
    scientificContext: 'Weekly ozonesonde balloon ascents reveal that while Antarctic spring ozone minimum column values frequently dipped below 120 Dobson Units (DU) between 1995–2010, the post-2018 five-year mean exhibits a statistically significant upward recovery trajectory (+1.8 DU / yr) amidst stratospheric cooling.',
    studentExplanation: 'High above Antarctica, a natural layer of ozone gas shields Earth from harmful solar UV rays. In spring, cold chemical clouds over the South Pole trigger an "ozone hole". Indian scientists at Maitri station send special sensor balloons into the sky to measure the ozone layer, showing that international rules to ban harmful chemicals are finally helping the ozone heal.',
    keyMetrics: {
      'Instrument': 'Dobson Spectrophotometer #153 & Ozonesondes',
      'Record Span': '1989 – Present (35 years uninterrupted)',
      'Spring Minimum': '~135 Dobson Units (DU)',
      'Baseline Pre-Ozone Hole': '300–350 DU'
    },
    rawExcerpt: 'Ozonesonde soundings launched from Maitri Observatory during the 2023 austral spring detected the ozone minimum at 14.8 km altitude on 28 September 2023, with total column ozone reaching 131 DU. The polar vortex broke down two weeks earlier than the 2020 record.',
    tags: ['Maitri', 'Ozone Hole', 'Atmospheric Science', 'Dobson Spectrophotometer', 'Antarctica']
  },
  {
    id: 'southern-ocean-carbon-sink',
    citationId: 5,
    title: 'Southern Ocean Biogeochemical Carbon Sequestration and Phytoplankton Bloom Dynamics during Austral Summer',
    category: 'oceanography',
    authors: 'Anilkumar, N., Sabu, P., & SO-Expedition Team',
    year: 2023,
    doi: '10.1016/j.dsr2.2023.105219',
    institution: 'NCPOR Southern Ocean Studies Division',
    region: 'Southern Ocean',
    mapEntityId: 'data-ctd-salinity-transect',
    summary: 'Transect observations from Mauritius to Antarctica (40°S to 68°S) onboard ORV Sagar Kanya detail the biological carbon pump, pCO2 oceanic uptake, and chlorophyll blooms along the Sub-Tropical Front (STF).',
    scientificContext: 'Continuous underway pCO2 measurements indicate that the Southern Ocean sector between 45°S and 55°S acts as a net atmospheric CO2 sink of -2.4 mol C m⁻² yr⁻¹, driven by intense diatom blooms fertilized by micro-nutrient iron upwelling near the Crozet and Kerguelen oceanic plateaus.',
    studentExplanation: 'The Southern Ocean around Antarctica is like the lungs of our planet. Tiny microscopic marine plants called phytoplankton soak up massive amounts of carbon dioxide gas from the air. When these plants die, they sink to the bottom of the deep ocean, safely storing carbon away for hundreds of years.',
    keyMetrics: {
      'CO2 Uptake Flux': '-2.4 mol C m⁻² yr⁻¹',
      'Survey Vessel': 'ORV Sagar Nidhi / Sagar Kanya',
      'Key Fronts': 'Sub-Tropical Front (STF), Polar Front (PF)',
      'Primary Driver': 'Iron-fertilized diatom blooms'
    },
    rawExcerpt: 'Underway surface seawater pCO2 and atmospheric pCO2 measurements acquired along the 57.5°E transect in the Indian sector of the Southern Ocean demonstrate marked undersaturation in the Polar Frontal Zone (PFZ), with ΔpCO2 reaching -65 μatm during peak austral summer blooms.',
    tags: ['Southern Ocean', 'Carbon Sink', 'Phytoplankton', 'pCO2', 'Sagar Kanya', 'Oceanography']
  },
  {
    id: 'arctic-microbial-extremophiles',
    citationId: 6,
    title: 'Genomic Characterization and Cold-Active Enzyme Bioprospecting from Psychrophilic Bacteria in Ny-Ålesund Permafrost',
    category: 'biology',
    authors: 'Singh, P., Shivaji, S., et al.',
    year: 2024,
    doi: '10.3389/fmicb.2024.1357902',
    institution: 'NCPOR & Centre for Cellular and Molecular Biology (CCMB)',
    region: 'Arctic',
    mapEntityId: 'station-himadri',
    summary: 'Soil and cryoconite samples collected around Himadri Station isolated 64 novel strains of psychrophilic (cold-loving) bacteria producing cold-active proteases and lipases with industrial and medical potential.',
    scientificContext: 'High-throughput 16S rRNA gene sequencing and whole-genome assembly of strain *Pseudomonas polaris* HIM-14 revealed unique polyunsaturated fatty acid membrane modifications and cold-shock protein chaperone genes enabling enzymatic catalysis at temperatures as low as -4°C without freezing.',
    studentExplanation: 'Scientists at India\'s Arctic station Himadri dig into frozen soil to find tiny super-bacteria that thrive in freezing sub-zero temperatures. These cold-loving microbes make special biological chemicals that can wash clothes in cold water to save electricity or help create new eco-friendly medicines!',
    keyMetrics: {
      'Bacterial Strains Isolated': '64 distinct psychrophilic strains',
      'Optimal Catalytic Temp': '4°C to 15°C',
      'Sampling Location': 'Midtre Lovénbreen Cryoconite Holes, Svalbard',
      'Key Organisms': 'Pseudomonas, Arthrobacter, and Flavobacterium'
    },
    rawExcerpt: 'Psychrophilic bacterium isolates from Svalbard permafrost samples adjacent to Himadri Base demonstrated robust extracellular protease production at 4°C. Enzymatic assays confirmed 88% retention of catalytic activity compared to 25°C control baselines.',
    tags: ['Microbiology', 'Extremophiles', 'Himadri', 'Arctic', 'Biotechnology', 'Permafrost']
  },
  {
    id: 'bharati-oceanographic-station',
    citationId: 7,
    title: 'Bharati Station: Architecture, Renewable Integration, and Marine Oceanography at Larsemann Hills',
    category: 'stations',
    authors: 'NCPOR Engineering & Polar Logistics Group',
    year: 2023,
    doi: '10.1007/s40808-023-01822-1',
    institution: 'NCPOR & MoES',
    region: 'Antarctica',
    mapEntityId: 'station-bharati',
    summary: 'Bharati is India\'s ultra-modern Antarctic research station constructed using 134 modular prefabricated containers on stilts to minimize snow drift accumulation and ecological footprint.',
    scientificContext: 'Located at 69°24′ S, 76°11′ E in the ice-free Larsemann Hills, Bharati features 11 dedicated analytical laboratories for coastal oceanography, ocean acoustics, high-energy astrophysics, and satellite telemetry reception with the National Remote Sensing Centre (NRSC).',
    studentExplanation: 'Bharati looks like a futuristic spaceship resting on stilts on the rocky shores of Antarctica! Built on legs so ferocious blizzards can blow right underneath without burying the building in snow, it houses over 40 scientists with warm bedrooms, labs, and high-speed satellite links.',
    keyMetrics: {
      'Construction': '134 Modular Shipping Containers',
      'Winter Capacity': '25 Scientists',
      'Summer Capacity': '47 Scientists',
      'Elevation': '35 meters above sea level'
    },
    rawExcerpt: 'Commissioned on 18 March 2012, Bharati station provides continuous oceanographic observation of Prydz Bay and telemetry tracking for Indian Earth Observation Satellites (IRS, Oceansat, Cartosat).',
    tags: ['Bharati', 'Antarctica', 'Larsemann Hills', 'Observatory', 'Architecture', 'Oceanography']
  }
];

export interface SuggestedPromptItem {
  id: string;
  category: 'Cryosphere' | 'Ocean' | 'Ecology' | 'Expeditions' | 'Policy';
  icon: string;
  title: string;
  prompt: string;
}

export const SUGGESTED_RESEARCH_PROMPTS: SuggestedPromptItem[] = [
  {
    id: 'p1',
    category: 'Cryosphere',
    icon: '🏔️',
    title: 'Chhota Shigri Glacier Mass Deficit',
    prompt: 'What are the 15-year mass balance trends and summer ablation rates of Chhota Shigri Glacier monitored from Himansh station?'
  },
  {
    id: 'p2',
    category: 'Ocean',
    icon: '🌊',
    title: 'IndARC Arctic Underwater Mooring',
    prompt: 'How does India\'s IndARC moored observatory in Kongsfjorden detect Atlantic Water intrusions into the Arctic Ocean?'
  },
  {
    id: 'p3',
    category: 'Expeditions',
    icon: '🚢',
    title: '43rd Indian Antarctic Expedition (43-ISEA)',
    prompt: 'Provide a breakdown of the major scientific objectives, ice-core drilling, and vessel logistics of the 43rd Indian Scientific Expedition to Antarctica.'
  },
  {
    id: 'p4',
    category: 'Ecology',
    icon: '🦠',
    title: 'Arctic Microbial Extremophiles',
    prompt: 'What biotechnological discoveries and cold-active enzymes have Indian researchers isolated from Arctic permafrost near Himadri?'
  },
  {
    id: 'p5',
    category: 'Policy',
    icon: '🧊',
    title: 'Antarctic Ozone Recovery at Maitri',
    prompt: 'What do 35 years of Dobson spectrophotometer ozone measurements at Maitri Station tell us about the Antarctic ozone hole recovery?'
  },
  {
    id: 'p6',
    category: 'Ocean',
    icon: '🌐',
    title: 'Southern Ocean Carbon Sink',
    prompt: 'How much atmospheric carbon dioxide is sequestered by phytoplankton blooms in the Indian sector of the Southern Ocean?'
  }
];
