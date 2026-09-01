export type EntityCategory = 'station' | 'expedition' | 'dataset' | 'publication' | 'media';

export interface ConnectedEntityRef {
  id: string;
  title: string;
  category: EntityCategory;
  relation: string;
}

export interface MapEntity {
  id: string;
  title: string;
  category: EntityCategory;
  region: 'Arctic' | 'Antarctica' | 'Himalayas' | 'Southern Ocean';
  lat: number;
  lng: number;
  elevationMeters?: number;
  depthMeters?: number;
  year: number;
  dateStr: string;
  status?: 'Active' | 'Operational' | 'Completed' | 'Archived' | 'Published';
  description: string;
  coverImage?: string;
  authorOrLead?: string;
  institution?: string;
  doi?: string;
  fileFormat?: string;
  dataSize?: string;
  sensorModel?: string;
  telemetry?: {
    temperature?: string;
    windSpeed?: string;
    humidity?: string;
    iceThickness?: string;
    salinity?: string;
    radiation?: string;
    co2Ppm?: string;
  };
  tags: string[];
  routeCoordinates?: [number, number][];
  connectedEntities: ConnectedEntityRef[];
}

export const POLAR_REGIONS = [
  { id: 'all', label: 'Global Polar View', lat: 20.0, lng: 30.0, zoom: 2 },
  { id: 'arctic', label: '❄️ Arctic (Ny-Ålesund)', lat: 78.923, lng: 11.928, zoom: 8 },
  { id: 'antarctica_bharati', label: '🧊 Bharati (Larsemann Hills)', lat: -69.407, lng: 76.195, zoom: 7 },
  { id: 'antarctica_maitri', label: '🧊 Maitri (Schirmacher Oasis)', lat: -70.767, lng: 11.733, zoom: 7 },
  { id: 'himalayas', label: '🏔️ Himalayas (Spiti / Himansh)', lat: 32.404, lng: 77.611, zoom: 9 },
  { id: 'southern_ocean', label: '🌊 Southern Ocean Transect', lat: -55.0, lng: 57.0, zoom: 4 },
];

export const MAP_ENTITIES: MapEntity[] = [
  // ================= STATIONS =================
  {
    id: 'station-himadri',
    title: 'Himadri Station (Arctic)',
    category: 'station',
    region: 'Arctic',
    lat: 78.923,
    lng: 11.928,
    elevationMeters: 14,
    year: 2008,
    dateStr: 'Operational since July 2008',
    status: 'Operational',
    description: "India's first permanent Arctic research station located at the International Arctic Research base in Ny-Ålesund, Svalbard, Norway. Spearheads long-term monitoring of atmospheric physics, marine flora/fauna, fjord hydrography, and cryospheric dynamics.",
    coverImage: '/images/2379df2aa50b403dfa7e1d319eb3c478.jpg',
    authorOrLead: 'National Centre for Polar and Ocean Research (NCPOR)',
    institution: 'MoES / NCPOR',
    sensorModel: 'Vaisala Weather Station + IndARC Telemetry Buoy',
    telemetry: {
      temperature: '-12.4°C',
      windSpeed: '14 kt NW',
      humidity: '82%',
      iceThickness: '1.2 m (Kongsfjorden)',
      radiation: '18 W/m² (Winter Diffuse)',
    },
    tags: ['Arctic', 'Ny-Ålesund', 'Kongsfjorden', 'Atmospheric Physics', 'Marine Ecology'],
    connectedEntities: [
      { id: 'exp-arctic-17', title: '17th Indian Arctic Expedition', category: 'expedition', relation: 'Operating Base' },
      { id: 'ds-indarc-ctd', title: 'Kongsfjorden IndARC Mooring CTD Time-Series', category: 'dataset', relation: 'Deployed Sensor' },
      { id: 'pub-arctic-ice', title: 'Kongsfjorden Multi-Year Sea Ice Dynamics', category: 'publication', relation: 'Research Output' },
      { id: 'media-polar-bear', title: 'Arctic Apex Fauna (Polar Bear) Sea-Ice Observation', category: 'media', relation: 'Field Media' },
    ],
  },
  {
    id: 'station-bharati',
    title: 'Bharati Station (Antarctica)',
    category: 'station',
    region: 'Antarctica',
    lat: -69.407,
    lng: 76.195,
    elevationMeters: 35,
    year: 2012,
    dateStr: 'Commissioned March 2012',
    status: 'Operational',
    description: "India's cutting-edge polar research base located between Thala Fjord & Quilty Bay at Larsemann Hills, East Antarctica. Features a self-contained green energy structure with satellite ground station capabilities.",
    coverImage: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
    authorOrLead: 'Dr. Thamban Meloth (Director NCPOR)',
    institution: 'MoES / NCPOR',
    sensorModel: 'Campbell CR1000X + GNSS Ionospheric Receiver',
    telemetry: {
      temperature: '-18.2°C',
      windSpeed: '22 kt SE',
      humidity: '58%',
      iceThickness: '1.8 m fast ice',
      radiation: '210 W/m²',
    },
    tags: ['Antarctica', 'Larsemann Hills', 'Prydz Bay', 'Satellite Ground Station', 'Oceanography'],
    connectedEntities: [
      { id: 'exp-isea-43', title: '43rd Indian Scientific Expedition to Antarctica', category: 'expedition', relation: 'Active Base' },
      { id: 'ds-bharati-icecore', title: 'Larsemann Hills Ice Core Isotope Record', category: 'dataset', relation: 'Field Dataset' },
      { id: 'pub-permafrost-microbes', title: 'Microbial Diversity in Larsemann Hills Permafrost', category: 'publication', relation: 'Published Research' },
      { id: 'media-adelie-penguin', title: 'Adélie Penguin Colony Census at Larsemann Hills', category: 'media', relation: 'Ecological Survey' },
    ],
  },
  {
    id: 'station-maitri',
    title: 'Maitri Station (Antarctica)',
    category: 'station',
    region: 'Antarctica',
    lat: -70.767,
    lng: 11.733,
    elevationMeters: 117,
    year: 1989,
    dateStr: 'Operational since 1989',
    status: 'Operational',
    description: "India's second Antarctic station located at the rocky mountainous region of Schirmacher Oasis. Adjacent to the pristine freshwater Lake Priyadarshini, hosting experiments in geomagnetism, atmospheric ozone, and geology.",
    coverImage: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=1200&q=80',
    authorOrLead: 'NCPOR Polar Logistics Division',
    institution: 'MoES / NCPOR',
    sensorModel: 'Fluxgate Magnetometer + Brewer Ozone Spectrophotometer',
    telemetry: {
      temperature: '-22.8°C',
      windSpeed: '18 kt E',
      humidity: '46%',
      iceThickness: 'Continental Ice Sheet Border',
      co2Ppm: '421.2 ppm',
    },
    tags: ['Antarctica', 'Schirmacher Oasis', 'Lake Priyadarshini', 'Geomagnetism', 'Ozone Monitoring'],
    connectedEntities: [
      { id: 'exp-isea-43', title: '43rd Indian Scientific Expedition to Antarctica', category: 'expedition', relation: 'Logistics Hub' },
      { id: 'ds-maitri-flux', title: 'Schirmacher Oasis Greenhouse Gas Flux', category: 'dataset', relation: 'Telemetry Stream' },
      { id: 'pub-ozone-dynamics', title: 'Antarctic Ozone Hole & Stratospheric Dynamics', category: 'publication', relation: 'Science Output' },
      { id: 'media-skua-nest', title: 'South Polar Skua Ecology Survey', category: 'media', relation: 'Fauna Documentation' },
    ],
  },
  {
    id: 'station-himansh',
    title: 'Himansh High-Altitude Observatory',
    category: 'station',
    region: 'Himalayas',
    lat: 32.404,
    lng: 77.611,
    elevationMeters: 4080,
    year: 2016,
    dateStr: 'Commissioned 2016',
    status: 'Operational',
    description: "High-altitude Himalayan cryosphere observatory located at Sutri Dhaka in the Chandra Basin, Lahaul-Spiti, Himachal Pradesh. Investigates glaciers as the Third Pole water towers of Asia.",
    coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    authorOrLead: 'Dr. Parmanand Sharma (Cryosphere Division)',
    institution: 'MoES / NCPOR',
    sensorModel: 'Automatic Weather Station (AWS) + Terrestrial LiDAR Scanner',
    telemetry: {
      temperature: '-4.1°C',
      windSpeed: '9 kt W',
      humidity: '34%',
      iceThickness: 'Glacial Ice Thickness (Chhota Shigri: 120m)',
      radiation: '680 W/m²',
    },
    tags: ['Himalayas', 'Third Pole', 'Chandra Basin', 'Glaciology', 'Water Security'],
    connectedEntities: [
      { id: 'exp-himansh-glacier', title: 'Chandra Basin Cryosphere Campaign', category: 'expedition', relation: 'Field Base' },
      { id: 'ds-himalaya-massbalance', title: 'Chandra Basin Glacial Mass Balance Time Series', category: 'dataset', relation: 'Glacial Sensor' },
      { id: 'pub-himalayan-cryo', title: 'Cryospheric Response to Warming in Western Himalayas', category: 'publication', relation: 'Key Report' },
      { id: 'media-drone-glacier', title: 'Samudra Tapu Glacier Moraine 3D Drone Survey', category: 'media', relation: 'Aerial Photogrammetry' },
    ],
  },
  {
    id: 'station-dakshin-gangotri',
    title: 'Dakshin Gangotri (Historical First Base)',
    category: 'station',
    region: 'Antarctica',
    lat: -70.091,
    lng: 12.000,
    elevationMeters: 0,
    year: 1983,
    dateStr: 'Established 1983 - Decommissioned 1990',
    status: 'Archived',
    description: "India's historic first permanent base on the ice shelf of Antarctica, established during the 3rd Indian Scientific Expedition. Submerged by ice over time and commemorated as an Indian Polar Heritage Site.",
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    authorOrLead: 'Dr. S.Z. Qasim (Expedition Pioneer)',
    institution: 'Department of Ocean Development (DOD)',
    tags: ['Antarctica', 'Historic Heritage', 'Ice Shelf', 'First Expedition'],
    connectedEntities: [
      { id: 'exp-isea-1', title: '1st Indian Scientific Expedition to Antarctica (1981)', category: 'expedition', relation: 'Precursor Mission' },
    ],
  },

  // ================= EXPEDITIONS / VESSELS =================
  {
    id: 'exp-isea-43',
    title: '43rd Indian Scientific Expedition to Antarctica (43-ISEA)',
    category: 'expedition',
    region: 'Antarctica',
    lat: -69.800,
    lng: 50.000,
    year: 2023,
    dateStr: 'Nov 2023 - April 2024',
    status: 'Completed',
    description: 'Flagship national expedition deployment involving over 45 scientists across atmospheric science, geophysics, geology, glaciology, and polar medicine across Maitri & Bharati.',
    coverImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    authorOrLead: 'Expedition Leader: Dr. Yogesh Ray',
    institution: 'MoES / NCPOR',
    tags: ['43-ISEA', 'Antarctica', 'Maitri', 'Bharati', 'Southern Ocean'],
    routeCoordinates: [
      [-33.924, 18.424], // Cape Town
      [-50.000, 30.000],
      [-60.000, 45.000],
      [-69.407, 76.195], // Bharati
      [-70.767, 11.733], // Maitri
    ],
    connectedEntities: [
      { id: 'station-bharati', title: 'Bharati Station', category: 'station', relation: 'Primary Destination' },
      { id: 'station-maitri', title: 'Maitri Station', category: 'station', relation: 'Secondary Destination' },
      { id: 'ds-bharati-icecore', title: 'Larsemann Hills Ice Core Isotope Record', category: 'dataset', relation: 'Harvested Data' },
    ],
  },
  {
    id: 'exp-arctic-17',
    title: '17th Indian Arctic Expedition (Himadri Summer & Winter)',
    category: 'expedition',
    region: 'Arctic',
    lat: 78.923,
    lng: 11.928,
    year: 2024,
    dateStr: 'March 2024 - October 2024',
    status: 'Active',
    description: 'Year-round Indian scientific presence in the high Arctic. Focuses on marine biodiversity shifts, fjord water mass dynamics, biogeochemical cycling, and sea-ice albedo monitoring.',
    coverImage: '/images/2379df2aa50b403dfa7e1d319eb3c478.jpg',
    authorOrLead: 'Team Leader: Dr. K.P. Krishnan',
    institution: 'MoES / NCPOR',
    tags: ['Arctic Expedition', 'Svalbard', 'Kongsfjorden', 'Marine Ecology'],
    routeCoordinates: [
      [59.913, 10.752], // Oslo
      [69.649, 18.955], // Tromso
      [78.223, 15.646], // Longyearbyen
      [78.923, 11.928], // Ny-Ålesund Himadri
    ],
    connectedEntities: [
      { id: 'station-himadri', title: 'Himadri Station (Arctic)', category: 'station', relation: 'Operational Base' },
      { id: 'ds-indarc-ctd', title: 'Kongsfjorden IndARC Mooring CTD Time-Series', category: 'dataset', relation: 'Collected Sensor Data' },
      { id: 'pub-arctic-ice', title: 'Kongsfjorden Multi-Year Sea Ice Dynamics', category: 'publication', relation: 'Science Publication' },
    ],
  },
  {
    id: 'exp-southern-ocean',
    title: 'Southern Ocean Expedition: ORV Sagar Nidhi Transect',
    category: 'expedition',
    region: 'Southern Ocean',
    lat: -55.200,
    lng: 57.400,
    depthMeters: 4200,
    year: 2024,
    dateStr: 'Jan 2024 - March 2024',
    status: 'Completed',
    description: 'Oceanographic transect from Mauritius to the Antarctic Polar Front on India’s ice-class research vessel ORV Sagar Nidhi, measuring biological pump and carbon dioxide drawdowns.',
    coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    authorOrLead: 'Chief Scientist: Dr. Anoop Tiwari',
    institution: 'MoES / NCPOR / NIOT',
    tags: ['Southern Ocean', 'ORV Sagar Nidhi', 'Carbon Sink', 'Polar Front'],
    routeCoordinates: [
      [-20.160, 57.501], // Port Louis
      [-35.000, 57.200], // Subtropical Front
      [-48.000, 57.300], // Sub-Antarctic Front
      [-55.200, 57.400], // Polar Front
      [-64.000, 57.500], // Marginal Ice Zone
    ],
    connectedEntities: [
      { id: 'ds-southern-carbon', title: 'Southern Ocean Phytoplankton & Carbon Sequestration', category: 'dataset', relation: 'Cruise Dataset' },
      { id: 'media-whale-sighting', title: 'Humpback Whale Pod Sighting in Polar Front', category: 'media', relation: 'Cruise Observation' },
    ],
  },
  {
    id: 'exp-himansh-glacier',
    title: 'Chandra Basin Glaciological Campaign',
    category: 'expedition',
    region: 'Himalayas',
    lat: 32.404,
    lng: 77.611,
    elevationMeters: 4400,
    year: 2024,
    dateStr: 'May 2024 - September 2024',
    status: 'Completed',
    description: 'Annual benchmark field measurements on Chhota Shigri, Samudra Tapu, and Batal glaciers to quantify snow ablation, glacier retreat rates, and runoff discharge.',
    coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    authorOrLead: 'Lead Glaciologist: Dr. Parmanand Sharma',
    institution: 'MoES / NCPOR',
    tags: ['Himalayas', 'Chhota Shigri', 'Mass Balance', 'Glacier Runoff'],
    routeCoordinates: [
      [32.239, 77.188], // Manali
      [32.355, 77.400], // Rohtang Pass
      [32.404, 77.611], // Himansh Base
      [32.450, 77.520], // Chhota Shigri Glacier
    ],
    connectedEntities: [
      { id: 'station-himansh', title: 'Himansh High-Altitude Observatory', category: 'station', relation: 'Observatory Base' },
      { id: 'ds-himalaya-massbalance', title: 'Chandra Basin Glacial Mass Balance Time Series', category: 'dataset', relation: 'Derived Dataset' },
    ],
  },
  {
    id: 'exp-isea-1',
    title: '1st Indian Scientific Expedition to Antarctica (1981)',
    category: 'expedition',
    region: 'Antarctica',
    lat: -69.980,
    lng: 11.900,
    year: 1981,
    dateStr: 'Dec 1981 - Feb 1982',
    status: 'Archived',
    description: "India's pioneering historic expedition led by Dr. S.Z. Qasim on chartered vessel MV Polar Circle, marking India's entry into polar science and accession to the Antarctic Treaty.",
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    authorOrLead: 'Dr. S.Z. Qasim',
    institution: 'Department of Ocean Development',
    tags: ['1-ISEA', 'Historic', 'Antarctic Treaty', 'Pioneer'],
    connectedEntities: [
      { id: 'station-dakshin-gangotri', title: 'Dakshin Gangotri', category: 'station', relation: 'Foundational Base' },
    ],
  },

  // ================= DATASETS =================
  {
    id: 'ds-indarc-ctd',
    title: 'Kongsfjorden IndARC Mooring CTD Time-Series (Arctic)',
    category: 'dataset',
    region: 'Arctic',
    lat: 78.960,
    lng: 11.850,
    depthMeters: 212,
    year: 2024,
    dateStr: 'Updated Aug 2024',
    status: 'Active',
    description: "Multi-parameter high-frequency oceanographic time-series measuring Atlantic Water (AW) ingress into the Arctic fjord. Includes salinity, temperature, turbidity, and dissolved oxygen.",
    doi: '10.5067/NCPOR-ARC-CTD-2024',
    fileFormat: 'NetCDF / CSV / GeoJSON',
    dataSize: '1.42 GB (10-min resolution)',
    authorOrLead: 'Dr. K.P. Krishnan & IndARC Mooring Team',
    institution: 'NCPOR Ocean Sciences Division',
    sensorModel: 'Sea-Bird SBE 37-SM MicroCAT CTD',
    telemetry: {
      salinity: '34.82 PSU',
      temperature: '1.45°C (Subsurface Fjord)',
    },
    tags: ['IndARC', 'Kongsfjorden', 'CTD', 'Salinity', 'Atlantic Water Ingress'],
    connectedEntities: [
      { id: 'station-himadri', title: 'Himadri Station (Arctic)', category: 'station', relation: 'Managing Station' },
      { id: 'exp-arctic-17', title: '17th Indian Arctic Expedition', category: 'expedition', relation: 'Cruise Deployment' },
      { id: 'pub-arctic-ice', title: 'Kongsfjorden Multi-Year Sea Ice Dynamics', category: 'publication', relation: 'Cited in Study' },
    ],
  },
  {
    id: 'ds-bharati-icecore',
    title: 'Larsemann Hills Ice Core Isotope & Paleoclimate Record',
    category: 'dataset',
    region: 'Antarctica',
    lat: -69.412,
    lng: 76.220,
    depthMeters: 85,
    year: 2023,
    dateStr: 'Published Dec 2023',
    status: 'Operational',
    description: 'High-resolution stable water isotopes (δ18O, δD) and major ion chemistry from an 85m shallow ice core drilled near Bharati station, reconstructing 450 years of climate variability.',
    doi: '10.5067/NCPOR-ANT-ICE-2023',
    fileFormat: 'CSV / NetCDF',
    dataSize: '240 MB',
    authorOrLead: 'Dr. Thamban Meloth',
    institution: 'NCPOR Paleoclimate Group',
    sensorModel: 'Picarro L2130-i Cavity Ring-Down Spectrometer',
    tags: ['Larsemann Hills', 'Ice Core', 'Isotopes', 'Paleoclimate', 'Bharati'],
    connectedEntities: [
      { id: 'station-bharati', title: 'Bharati Station (Antarctica)', category: 'station', relation: 'Drill Site Base' },
      { id: 'exp-isea-43', title: '43rd Indian Scientific Expedition to Antarctica', category: 'expedition', relation: 'Expedition Collection' },
    ],
  },
  {
    id: 'ds-maitri-flux',
    title: 'Schirmacher Oasis Atmospheric Greenhouse Gas Flux Record',
    category: 'dataset',
    region: 'Antarctica',
    lat: -70.760,
    lng: 11.745,
    elevationMeters: 120,
    year: 2024,
    dateStr: 'Updated July 2024',
    status: 'Active',
    description: 'Continuous eddy covariance flux tower observations measuring boundary layer carbon dioxide (CO₂), methane (CH₄), and surface radiation energy balance in ice-free Antarctic oasis.',
    doi: '10.5067/NCPOR-ANT-FLUX-2024',
    fileFormat: 'NetCDF / JSON',
    dataSize: '820 MB',
    authorOrLead: 'Atmospheric Physics Division',
    institution: 'NCPOR / IITM Pune',
    sensorModel: 'LI-COR LI-7500DS Open-Path CO2/H2O Analyzer',
    telemetry: {
      co2Ppm: '421.2 ppm',
      radiation: '22 W/m² (Winter Net)',
    },
    tags: ['Maitri', 'Schirmacher Oasis', 'GHG Flux', 'Atmospheric Physics', 'Carbon Cycle'],
    connectedEntities: [
      { id: 'station-maitri', title: 'Maitri Station (Antarctica)', category: 'station', relation: 'Tower Location' },
      { id: 'pub-ozone-dynamics', title: 'Antarctic Ozone Hole & Stratospheric Dynamics', category: 'publication', relation: 'Atmospheric Study' },
    ],
  },
  {
    id: 'ds-himalaya-massbalance',
    title: 'Chandra Basin Glacial Mass Balance & Equilibrium Line Altitude',
    category: 'dataset',
    region: 'Himalayas',
    lat: 32.450,
    lng: 77.520,
    elevationMeters: 4850,
    year: 2024,
    dateStr: 'Updated Sep 2024',
    status: 'Active',
    description: 'Long-term glaciological mass balance, stake measurements, snow water equivalent (SWE), and snowline altitude tracking for Chhota Shigri & Samudra Tapu glaciers.',
    doi: '10.5067/NCPOR-HIM-GLAC-2024',
    fileFormat: 'GeoTIFF / CSV / Shapefile',
    dataSize: '3.1 GB',
    authorOrLead: 'Dr. Parmanand Sharma',
    institution: 'NCPOR Himalayan Cryosphere Group',
    sensorModel: 'Geodetic DGPS + Campbell Scientific Snow Depth Sensor',
    tags: ['Chhota Shigri', 'Mass Balance', 'Himalayas', 'Himansh', 'Glacier Retreat'],
    connectedEntities: [
      { id: 'station-himansh', title: 'Himansh High-Altitude Observatory', category: 'station', relation: 'Base Station' },
      { id: 'pub-himalayan-cryo', title: 'Cryospheric Response to Warming in Western Himalayas', category: 'publication', relation: 'Published in Paper' },
      { id: 'media-drone-glacier', title: 'Samudra Tapu Glacier Moraine 3D Drone Survey', category: 'media', relation: 'Geospatial Asset' },
    ],
  },
  {
    id: 'ds-southern-carbon',
    title: 'Southern Ocean Phytoplankton Biomass & Carbon Export Transect',
    category: 'dataset',
    region: 'Southern Ocean',
    lat: -55.200,
    lng: 57.400,
    depthMeters: 1000,
    year: 2024,
    dateStr: 'Published May 2024',
    status: 'Completed',
    description: 'Underway bio-optical sensors, fluorometry, HPLC pigments, and sediment trap carbon fluxes across the Sub-Antarctic and Polar Frontal zones.',
    doi: '10.5067/NCPOR-SO-BIO-2024',
    fileFormat: 'CSV / NetCDF',
    dataSize: '510 MB',
    authorOrLead: 'Dr. Anoop Tiwari',
    institution: 'MoES / NCPOR',
    tags: ['Southern Ocean', 'Carbon Export', 'Phytoplankton', 'ORV Sagar Nidhi'],
    connectedEntities: [
      { id: 'exp-southern-ocean', title: 'Southern Ocean Expedition: ORV Sagar Nidhi', category: 'expedition', relation: 'Cruise Record' },
      { id: 'media-whale-sighting', title: 'Humpback Whale Pod Sighting', category: 'media', relation: 'Associated Fauna' },
    ],
  },

  // ================= PUBLICATIONS / REPORTS =================
  {
    id: 'pub-arctic-ice',
    title: 'Kongsfjorden Multi-Year Sea Ice Dynamics & Apex Predator Habitat',
    category: 'publication',
    region: 'Arctic',
    lat: 78.930,
    lng: 11.940,
    year: 2024,
    dateStr: 'August 2024',
    status: 'Published',
    description: 'Peer-reviewed research investigating the correlation between Atlantic water warming pulses and seasonal sea-ice retreat in Kongsfjorden, and its cascading effect on Ursus maritimus foraging behavior.',
    doi: '10.1017/jog.2024.184',
    authorOrLead: 'Krishnan, K.P., Sharma, P., & Mohan, R.',
    institution: 'NCPOR & Polar Science Forum',
    tags: ['Peer-Reviewed', 'Journal of Glaciology', 'Sea Ice', 'Polar Bear', 'Kongsfjorden'],
    connectedEntities: [
      { id: 'station-himadri', title: 'Himadri Station (Arctic)', category: 'station', relation: 'Research Institution' },
      { id: 'ds-indarc-ctd', title: 'Kongsfjorden IndARC Mooring CTD Time-Series', category: 'dataset', relation: 'Analyzed Dataset' },
      { id: 'media-polar-bear', title: 'Arctic Apex Fauna Sea-Ice Observation', category: 'media', relation: 'Field Evidence' },
    ],
  },
  {
    id: 'pub-permafrost-microbes',
    title: 'Microbial Diversity & Cold-Active Enzymes in Larsemann Hills Permafrost',
    category: 'publication',
    region: 'Antarctica',
    lat: -69.410,
    lng: 76.210,
    year: 2023,
    dateStr: 'November 2023',
    status: 'Published',
    description: 'Metagenomic profiling of extremophilic bacteria recovered from 2-meter deep permafrost cores near Bharati station, identifying psychrophilic enzymes with industrial bio-catalysis potential.',
    doi: '10.1007/s00300-023-03189-y',
    authorOrLead: 'Dr. Archana Singh et al.',
    institution: 'NCPOR Bio-Sciences Division',
    tags: ['Antarctica', 'Bharati', 'Microbiology', 'Permafrost', 'Polar Biology'],
    connectedEntities: [
      { id: 'station-bharati', title: 'Bharati Station (Antarctica)', category: 'station', relation: 'Sample Collection Base' },
      { id: 'exp-isea-43', title: '43rd Indian Scientific Expedition to Antarctica', category: 'expedition', relation: 'Expedition Project' },
    ],
  },
  {
    id: 'pub-himalayan-cryo',
    title: 'Cryospheric Response to Warming in Western Himalayas (Chandra Basin)',
    category: 'publication',
    region: 'Himalayas',
    lat: 32.420,
    lng: 77.580,
    elevationMeters: 4200,
    year: 2024,
    dateStr: 'June 2024',
    status: 'Published',
    description: 'Comprehensive 10-year synthesis of high-altitude meteorological and glaciological data from Himansh Observatory showing accelerated terminus retreat and debris-cover thickening.',
    doi: '10.18520/cs/v126/i11/1342-1351',
    authorOrLead: 'Sharma, P., Patel, L.K., & Meloth, T.',
    institution: 'Current Science / MoES',
    tags: ['Himalayas', 'Himansh', 'Current Science', 'Glacier Melt', 'Climate Change'],
    connectedEntities: [
      { id: 'station-himansh', title: 'Himansh Observatory', category: 'station', relation: 'Observatory Source' },
      { id: 'ds-himalaya-massbalance', title: 'Chandra Basin Glacial Mass Balance Time Series', category: 'dataset', relation: 'Source Data' },
    ],
  },
  {
    id: 'pub-ozone-dynamics',
    title: 'Antarctic Ozone Hole Recovery Patterns & Stratospheric Dynamics at Maitri',
    category: 'publication',
    region: 'Antarctica',
    lat: -70.767,
    lng: 11.733,
    year: 2024,
    dateStr: 'January 2024',
    status: 'Published',
    description: 'Analysis of ozonesonde profiles and Brewer spectrophotometer measurements over Schirmacher Oasis examining the 2023 polar vortex anomalies and stratospheric wave driving.',
    doi: '10.5194/acp-24-118-2024',
    authorOrLead: 'Atmospheric Sciences Team',
    institution: 'NCPOR / IMD New Delhi',
    tags: ['Maitri', 'Ozone Hole', 'Stratosphere', 'Polar Vortex', 'ACP Journal'],
    connectedEntities: [
      { id: 'station-maitri', title: 'Maitri Station (Antarctica)', category: 'station', relation: 'Ozonesonde Launch Site' },
      { id: 'ds-maitri-flux', title: 'Schirmacher Oasis Atmospheric Flux Record', category: 'dataset', relation: 'Boundary Layer Data' },
    ],
  },

  // ================= MEDIA / OBSERVATIONS =================
  {
    id: 'media-polar-bear',
    title: 'Arctic Apex Fauna (Polar Bear) Sea-Ice Observation',
    category: 'media',
    region: 'Arctic',
    lat: 78.918,
    lng: 11.910,
    year: 2024,
    dateStr: '14 August 2024',
    status: 'Active',
    description: 'High-definition telephoto observation of a healthy adult polar bear traversing drifting sea-ice pack near the Kongsfjorden mouth during the 17th Indian Arctic Expedition.',
    coverImage: '/images/2379df2aa50b403dfa7e1d319eb3c478.jpg',
    authorOrLead: 'Dr. K.P. Krishnan (Photographer & Biologist)',
    institution: 'NCPOR Field Telemetry Unit',
    sensorModel: 'Nikon D850 + AF-S NIKKOR 500mm f/4E FL ED VR',
    tags: ['Polar Bear', 'Ursus maritimus', 'Ny-Ålesund', '17th Indian Arctic Expedition', 'Himadri'],
    connectedEntities: [
      { id: 'station-himadri', title: 'Himadri Station (Arctic)', category: 'station', relation: 'Proximity Base' },
      { id: 'pub-arctic-ice', title: 'Kongsfjorden Multi-Year Sea Ice Dynamics', category: 'publication', relation: 'Documented Subject' },
      { id: 'exp-arctic-17', title: '17th Indian Arctic Expedition', category: 'expedition', relation: 'Field Expedition' },
    ],
  },
  {
    id: 'media-adelie-penguin',
    title: 'Adélie Penguin Colony Census at Larsemann Hills',
    category: 'media',
    region: 'Antarctica',
    lat: -69.390,
    lng: 76.170,
    year: 2024,
    dateStr: 'January 2024',
    status: 'Active',
    description: 'Drone-assisted colony survey documenting over 1,400 breeding pairs of Pygoscelis adeliae on rocky coastal outcrops adjacent to Bharati station.',
    coverImage: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
    authorOrLead: 'Polar Wildlife Census Group',
    institution: 'NCPOR / Zoological Survey of India (ZSI)',
    sensorModel: 'DJI Matrice 300 RTK + Zenmuse H20T Thermal',
    tags: ['Adélie Penguin', 'Bharati', 'Larsemann Hills', 'Wildlife Census', 'Antarctica'],
    connectedEntities: [
      { id: 'station-bharati', title: 'Bharati Station (Antarctica)', category: 'station', relation: 'Survey Zone' },
      { id: 'exp-isea-43', title: '43rd Indian Scientific Expedition to Antarctica', category: 'expedition', relation: 'Expedition Survey' },
    ],
  },
  {
    id: 'media-drone-glacier',
    title: 'Samudra Tapu Glacier Moraine 3D Drone Survey',
    category: 'media',
    region: 'Himalayas',
    lat: 32.480,
    lng: 77.560,
    elevationMeters: 4600,
    year: 2024,
    dateStr: 'July 2024',
    status: 'Active',
    description: 'Centimeter-precision structure-from-motion (SfM) photogrammetry model mapping glacial lake expansion and moraine dam stability in Chandra Basin.',
    coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    authorOrLead: 'Himansh Geospatial Drone Team',
    institution: 'NCPOR Cryosphere Division',
    sensorModel: 'WingtraOne GEN II VTOL Drone',
    tags: ['Samudra Tapu', 'Drone Survey', 'Himansh', 'Glacial Lake', 'Himalayas'],
    connectedEntities: [
      { id: 'station-himansh', title: 'Himansh Observatory', category: 'station', relation: 'Operational Base' },
      { id: 'ds-himalaya-massbalance', title: 'Chandra Basin Glacial Mass Balance Dataset', category: 'dataset', relation: '3D DEM Grounding' },
    ],
  },
  {
    id: 'media-skua-nest',
    title: 'South Polar Skua Ecology & Breeding Survey at Schirmacher Oasis',
    category: 'media',
    region: 'Antarctica',
    lat: -70.750,
    lng: 11.720,
    elevationMeters: 130,
    year: 2023,
    dateStr: 'December 2023',
    status: 'Active',
    description: 'High-resolution telemetry tracking and nesting pair mapping of Catharacta maccormicki in the rocky ice-free valleys around Maitri station.',
    coverImage: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=1200&q=80',
    authorOrLead: 'Avian Ecology Wing',
    institution: 'MoES / NCPOR',
    tags: ['South Polar Skua', 'Maitri', 'Schirmacher Oasis', 'Antarctic Birds'],
    connectedEntities: [
      { id: 'station-maitri', title: 'Maitri Station (Antarctica)', category: 'station', relation: 'Habitat Vicinity' },
    ],
  },
  {
    id: 'media-whale-sighting',
    title: 'Humpback Whale Pod Sighting at Antarctic Polar Front',
    category: 'media',
    region: 'Southern Ocean',
    lat: -55.200,
    lng: 57.400,
    year: 2024,
    dateStr: 'February 2024',
    status: 'Completed',
    description: 'Marine mammal observation log and acoustic hydrophone recordings of Megaptera novaeangliae feeding on Antarctic krill swarms during ORV Sagar Nidhi cruise.',
    coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    authorOrLead: 'Cruise Science Team',
    institution: 'NCPOR / NIOT',
    tags: ['Humpback Whale', 'Southern Ocean', 'Polar Front', 'Hydrophone Audio', 'ORV Sagar Nidhi'],
    connectedEntities: [
      { id: 'exp-southern-ocean', title: 'Southern Ocean Expedition: ORV Sagar Nidhi', category: 'expedition', relation: 'Cruise Log' },
    ],
  },
];
