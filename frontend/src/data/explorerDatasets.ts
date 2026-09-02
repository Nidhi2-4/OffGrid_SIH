export type ScientificDomain = 
  | 'Oceanography'
  | 'Glaciology'
  | 'Paleoclimate'
  | 'Atmospheric Physics'
  | 'Marine Ecology'
  | 'Cryosphere';

export type PolarRegion = 'Arctic' | 'Antarctica' | 'Himalayas' | 'Southern Ocean';

export interface DatasetColumn {
  name: string;
  label: string;
  type: 'float64' | 'integer' | 'timestamp' | 'string';
  unit?: string;
  description: string;
  min?: number;
  max?: number;
  mean?: number;
  median?: number;
  missingCount: number;
}

export interface DatasetItem {
  id: string;
  title: string;
  shortName: string;
  region: PolarRegion;
  domain: ScientificDomain;
  description: string;
  abstract: string;
  authorOrLead: string;
  institution: string;
  doi: string;
  updateDate: string;
  temporalCoverage: string;
  spatialCoverage: string;
  coordinates: { lat: number; lng: number };
  station?: string;
  fileFormats: string[];
  sizeBytes: number;
  sizeStr: string;
  downloadCount: number;
  license: string;
  citation: string;
  columns: DatasetColumn[];
  sampleData: Record<string, any>[];
  tags: string[];
}

export const EXPLORER_DATASETS: DatasetItem[] = [
  // 1. IndARC CTD Mooring (Arctic)
  {
    id: 'ds-indarc-ctd',
    title: 'Kongsfjorden IndARC Mooring CTD Oceanographic Time-Series',
    shortName: 'IndARC CTD Arctic Hydrography',
    region: 'Arctic',
    domain: 'Oceanography',
    description: 'Multi-parameter high-frequency subsurface oceanographic time-series measuring Atlantic Water (AW) ingress into the Arctic fjord.',
    abstract: "India's first multi-sensor underwater moored observatory, IndARC, deployed in the inner basin of Kongsfjorden, Svalbard. Continuous CTD measurements capture the seasonal intrusion of warm, saline Atlantic Water into the Arctic fjord system and its influence on marine cryosphere dynamics.",
    authorOrLead: 'Dr. K.P. Krishnan & IndARC Mooring Team',
    institution: 'National Centre for Polar and Ocean Research (NCPOR), MoES',
    doi: '10.5067/NCPOR-ARC-CTD-2024',
    updateDate: 'August 2024',
    temporalCoverage: '2022-01 to 2024-06 (Seasonal cycles)',
    spatialCoverage: 'Kongsfjorden, Ny-Ålesund, Svalbard (78.960°N, 11.850°E)',
    coordinates: { lat: 78.960, lng: 11.850 },
    station: 'Himadri Station (Arctic)',
    fileFormats: ['CSV', 'NetCDF', 'GeoJSON'],
    sizeBytes: 1520435200,
    sizeStr: '1.42 GB',
    downloadCount: 3840,
    license: 'NCPOR Open Data Policy (CC BY 4.0)',
    citation: 'Krishnan, K.P., et al. (2024). Kongsfjorden IndARC Mooring CTD Oceanographic Time-Series. NCPOR Polar Data Repository. https://doi.org/10.5067/NCPOR-ARC-CTD-2024',
    tags: ['IndARC', 'Kongsfjorden', 'CTD', 'Salinity', 'Atlantic Water Ingress', 'Himadri'],
    columns: [
      { name: 'date', label: 'Observation Date', type: 'timestamp', description: 'Monthly sampling timestamp', missingCount: 0 },
      { name: 'depth_m', label: 'Mooring Depth', type: 'float64', unit: 'm', description: 'Nominal sensor depth below sea surface', min: 200, max: 215, mean: 208.5, median: 210, missingCount: 0 },
      { name: 'temp_c', label: 'Potential Temperature', type: 'float64', unit: '°C', description: 'In-situ seawater potential temperature', min: -1.82, max: 3.84, mean: 1.26, median: 1.35, missingCount: 0 },
      { name: 'salinity_psu', label: 'Practical Salinity', type: 'float64', unit: 'PSU', description: 'Practical salinity derived from conductivity', min: 34.12, max: 35.08, mean: 34.78, median: 34.82, missingCount: 0 },
      { name: 'oxygen_mgl', label: 'Dissolved Oxygen', type: 'float64', unit: 'mg/L', description: 'Dissolved oxygen concentration', min: 6.80, max: 11.45, mean: 8.92, median: 8.85, missingCount: 0 },
      { name: 'turbidity_ntu', label: 'Turbidity', type: 'float64', unit: 'NTU', description: 'Water turbidity indicator of glacial runoff', min: 0.18, max: 4.65, mean: 1.42, median: 0.95, missingCount: 0 },
    ],
    sampleData: [
      { date: '2022-01-15', depth_m: 212, temp_c: 0.42, salinity_psu: 34.65, oxygen_mgl: 9.85, turbidity_ntu: 0.32 },
      { date: '2022-03-15', depth_m: 210, temp_c: -0.85, salinity_psu: 34.80, oxygen_mgl: 10.42, turbidity_ntu: 0.25 },
      { date: '2022-05-15', depth_m: 211, temp_c: 0.18, salinity_psu: 34.72, oxygen_mgl: 11.20, turbidity_ntu: 0.85 },
      { date: '2022-07-15', depth_m: 208, temp_c: 2.95, salinity_psu: 34.45, oxygen_mgl: 8.75, turbidity_ntu: 3.90 },
      { date: '2022-09-15', depth_m: 207, temp_c: 3.84, salinity_psu: 34.92, oxygen_mgl: 7.65, turbidity_ntu: 2.10 },
      { date: '2022-11-15', depth_m: 212, temp_c: 1.75, salinity_psu: 34.98, oxygen_mgl: 8.40, turbidity_ntu: 0.65 },
      { date: '2023-01-15', depth_m: 212, temp_c: 0.15, salinity_psu: 34.70, oxygen_mgl: 9.95, turbidity_ntu: 0.30 },
      { date: '2023-03-15', depth_m: 210, temp_c: -1.25, salinity_psu: 34.88, oxygen_mgl: 10.85, turbidity_ntu: 0.22 },
      { date: '2023-05-15', depth_m: 209, temp_c: 0.65, salinity_psu: 34.62, oxygen_mgl: 11.45, turbidity_ntu: 1.15 },
      { date: '2023-07-15', depth_m: 207, temp_c: 3.45, salinity_psu: 34.35, oxygen_mgl: 8.35, turbidity_ntu: 4.65 },
      { date: '2023-09-15', depth_m: 208, temp_c: 3.65, salinity_psu: 35.08, oxygen_mgl: 7.15, turbidity_ntu: 2.45 },
      { date: '2023-11-15', depth_m: 211, temp_c: 1.95, salinity_psu: 34.95, oxygen_mgl: 8.20, turbidity_ntu: 0.75 },
      { date: '2024-01-15', depth_m: 212, temp_c: 0.35, salinity_psu: 34.75, oxygen_mgl: 9.70, turbidity_ntu: 0.28 },
      { date: '2024-03-15', depth_m: 210, temp_c: -0.95, salinity_psu: 34.85, oxygen_mgl: 10.60, turbidity_ntu: 0.20 },
      { date: '2024-05-15', depth_m: 209, temp_c: 0.85, salinity_psu: 34.68, oxygen_mgl: 11.10, turbidity_ntu: 1.45 },
      { date: '2024-07-15', depth_m: 207, temp_c: 3.75, salinity_psu: 34.50, oxygen_mgl: 8.10, turbidity_ntu: 4.25 },
    ],
  },

  // 2. Chandra Basin Glacial Mass Balance (Himalayas)
  {
    id: 'ds-himalaya-massbalance',
    title: 'Chandra Basin Glacial Mass Balance & Equilibrium Line Altitude',
    shortName: 'Himalayan Glacier Mass Balance',
    region: 'Himalayas',
    domain: 'Glaciology',
    description: 'Long-term annual glaciological mass balance, stake measurements, snow water equivalent (SWE), and snowline altitude tracking for benchmark glaciers.',
    abstract: 'Field-based and geodetic mass balance monitoring on Chhota Shigri, Samudra Tapu, and Batal glaciers in the western Himalayas (Spiti Basin). Monitored under NCPOR’s Third Pole cryospheric programme using automated weather stations, dGPS stake networks, and terrestrial LiDAR.',
    authorOrLead: 'Dr. Parmanand Sharma & Himalayan Cryosphere Group',
    institution: 'National Centre for Polar and Ocean Research (NCPOR), MoES',
    doi: '10.5067/NCPOR-HIM-GLAC-2024',
    updateDate: 'September 2024',
    temporalCoverage: '2008 - 2024 (Annual)',
    spatialCoverage: 'Chandra Basin, Lahaul-Spiti, Himachal Pradesh (32.450°N, 77.520°E)',
    coordinates: { lat: 32.450, lng: 77.520 },
    station: 'Himansh High-Altitude Observatory',
    fileFormats: ['CSV', 'GeoTIFF', 'Shapefile'],
    sizeBytes: 3328599040,
    sizeStr: '3.10 GB',
    downloadCount: 5120,
    license: 'NCPOR Open Data Policy (CC BY 4.0)',
    citation: 'Sharma, P., et al. (2024). Chandra Basin Glacial Mass Balance & Equilibrium Line Altitude. NCPOR Polar Data Repository. https://doi.org/10.5067/NCPOR-HIM-GLAC-2024',
    tags: ['Chhota Shigri', 'Mass Balance', 'Himalayas', 'Himansh', 'Glacier Retreat', 'Third Pole'],
    columns: [
      { name: 'year', label: 'Glaciological Year', type: 'integer', description: 'Annual hydrological cycle year', min: 2008, max: 2024, missingCount: 0 },
      { name: 'net_mass_balance_mm', label: 'Net Mass Balance', type: 'float64', unit: 'mm w.e.', description: 'Net annual specific mass balance in mm water equivalent', min: -1450, max: 320, mean: -580.6, median: -520, missingCount: 0 },
      { name: 'winter_accum_mm', label: 'Winter Accumulation', type: 'float64', unit: 'mm w.e.', description: 'Winter snow accumulation component', min: 650, max: 1540, mean: 1045.2, median: 1010, missingCount: 0 },
      { name: 'summer_ablation_mm', label: 'Summer Ablation', type: 'float64', unit: 'mm w.e.', description: 'Summer ice/snow melt loss component', min: -2350, max: -980, mean: -1625.8, median: -1580, missingCount: 0 },
      { name: 'ela_altitude_m', label: 'Equilibrium Line Alt', type: 'float64', unit: 'm a.s.l.', description: 'Altitude where accumulation equals ablation', min: 4850, max: 5240, mean: 5042.5, median: 5020, missingCount: 0 },
      { name: 'glacier_retreat_m', label: 'Terminus Retreat', type: 'float64', unit: 'm/yr', description: 'Frontal terminus retreat distance', min: 4.2, max: 18.5, mean: 11.4, median: 10.8, missingCount: 0 },
    ],
    sampleData: [
      { year: 2008, net_mass_balance_mm: -320, winter_accum_mm: 1250, summer_ablation_mm: -1570, ela_altitude_m: 4940, glacier_retreat_m: 6.8 },
      { year: 2009, net_mass_balance_mm: 180, winter_accum_mm: 1420, summer_ablation_mm: -1240, ela_altitude_m: 4870, glacier_retreat_m: 4.5 },
      { year: 2010, net_mass_balance_mm: 290, winter_accum_mm: 1540, summer_ablation_mm: -1250, ela_altitude_m: 4850, glacier_retreat_m: 4.2 },
      { year: 2011, net_mass_balance_mm: -410, winter_accum_mm: 1180, summer_ablation_mm: -1590, ela_altitude_m: 4980, glacier_retreat_m: 8.2 },
      { year: 2012, net_mass_balance_mm: -650, winter_accum_mm: 980, summer_ablation_mm: -1630, ela_altitude_m: 5050, glacier_retreat_m: 9.6 },
      { year: 2013, net_mass_balance_mm: -380, winter_accum_mm: 1210, summer_ablation_mm: -1590, ela_altitude_m: 4960, glacier_retreat_m: 7.9 },
      { year: 2014, net_mass_balance_mm: -520, winter_accum_mm: 1050, summer_ablation_mm: -1570, ela_altitude_m: 5010, glacier_retreat_m: 10.4 },
      { year: 2015, net_mass_balance_mm: -780, winter_accum_mm: 890, summer_ablation_mm: -1670, ela_altitude_m: 5090, glacier_retreat_m: 12.1 },
      { year: 2016, net_mass_balance_mm: -920, winter_accum_mm: 820, summer_ablation_mm: -1740, ela_altitude_m: 5120, glacier_retreat_m: 13.8 },
      { year: 2017, net_mass_balance_mm: -610, winter_accum_mm: 1080, summer_ablation_mm: -1690, ela_altitude_m: 5040, glacier_retreat_m: 11.2 },
      { year: 2018, net_mass_balance_mm: -840, winter_accum_mm: 940, summer_ablation_mm: -1780, ela_altitude_m: 5110, glacier_retreat_m: 12.9 },
      { year: 2019, net_mass_balance_mm: 110, winter_accum_mm: 1480, summer_ablation_mm: -1370, ela_altitude_m: 4890, glacier_retreat_m: 5.1 },
      { year: 2020, net_mass_balance_mm: -450, winter_accum_mm: 1120, summer_ablation_mm: -1570, ela_altitude_m: 4990, glacier_retreat_m: 8.8 },
      { year: 2021, net_mass_balance_mm: -890, winter_accum_mm: 860, summer_ablation_mm: -1750, ela_altitude_m: 5140, glacier_retreat_m: 14.5 },
      { year: 2022, net_mass_balance_mm: -1420, winter_accum_mm: 680, summer_ablation_mm: -2100, ela_altitude_m: 5240, glacier_retreat_m: 18.2 },
      { year: 2023, net_mass_balance_mm: -1150, winter_accum_mm: 790, summer_ablation_mm: -1940, ela_altitude_m: 5190, glacier_retreat_m: 16.7 },
      { year: 2024, net_mass_balance_mm: -1280, winter_accum_mm: 740, summer_ablation_mm: -2020, ela_altitude_m: 5210, glacier_retreat_m: 17.5 },
    ],
  },

  // 3. Larsemann Hills Ice Core Record (Antarctica)
  {
    id: 'ds-bharati-icecore',
    title: 'Larsemann Hills Ice Core Isotope & Paleoclimate Record',
    shortName: 'Antarctic Ice Core Paleoclimate',
    region: 'Antarctica',
    domain: 'Paleoclimate',
    description: 'High-resolution stable water isotopes (δ18O, δD) and major ion chemistry from an 85m shallow ice core drilled near Bharati station.',
    abstract: 'Continuous 85-meter ice core records drilled at the coastal margin of the Dronning Maud Land ice sheet adjacent to Larsemann Hills. Reconstructs sub-decadal climate variations, marine aerosol transport, and Southern Annular Mode (SAM) influence over the past 450 years.',
    authorOrLead: 'Dr. Thamban Meloth & Paleoclimate Group',
    institution: 'National Centre for Polar and Ocean Research (NCPOR), MoES',
    doi: '10.5067/NCPOR-ANT-ICE-2023',
    updateDate: 'December 2023',
    temporalCoverage: '1570 CE - 2020 CE (Annual down to 85m depth)',
    spatialCoverage: 'Larsemann Hills, East Antarctica (-69.412°S, 76.220°E)',
    coordinates: { lat: -69.412, lng: 76.220 },
    station: 'Bharati Station (Antarctica)',
    fileFormats: ['CSV', 'NetCDF'],
    sizeBytes: 251658240,
    sizeStr: '240 MB',
    downloadCount: 2940,
    license: 'NCPOR Open Data Policy (CC BY 4.0)',
    citation: 'Meloth, T., et al. (2023). Larsemann Hills Ice Core Isotope & Paleoclimate Record. NCPOR Polar Data Repository. https://doi.org/10.5067/NCPOR-ANT-ICE-2023',
    tags: ['Larsemann Hills', 'Ice Core', 'Isotopes', 'Paleoclimate', 'Bharati', 'Antarctica'],
    columns: [
      { name: 'depth_m', label: 'Core Depth', type: 'float64', unit: 'm', description: 'Depth below ice surface', min: 0, max: 85, mean: 42.5, median: 42.5, missingCount: 0 },
      { name: 'age_ce', label: 'Estimated Year (CE)', type: 'integer', description: 'Calibrated calendar year CE', min: 1570, max: 2020, missingCount: 0 },
      { name: 'delta_18o', label: 'δ18O Isotope', type: 'float64', unit: '‰', description: 'Oxygen-18 isotope ratio vs VSMOW', min: -38.4, max: -24.6, mean: -30.8, median: -31.2, missingCount: 0 },
      { name: 'delta_d', label: 'δD Deuterium', type: 'float64', unit: '‰', description: 'Deuterium isotope ratio vs VSMOW', min: -298.5, max: -190.2, mean: -238.4, median: -241.0, missingCount: 0 },
      { name: 'd_excess', label: 'Deuterium Excess', type: 'float64', unit: '‰', description: 'Deuterium excess (d = δD - 8*δ18O)', min: 4.8, max: 14.2, mean: 8.6, median: 8.4, missingCount: 0 },
      { name: 'dust_ppb', label: 'Microparticle Dust', type: 'float64', unit: 'ppb', description: 'Mineral dust aerosol concentration', min: 12.5, max: 145.0, mean: 38.2, median: 29.5, missingCount: 0 },
    ],
    sampleData: [
      { depth_m: 2.5, age_ce: 2018, delta_18o: -26.4, delta_d: -202.8, d_excess: 8.4, dust_ppb: 18.2 },
      { depth_m: 8.0, age_ce: 1995, delta_18o: -27.1, delta_d: -208.5, d_excess: 8.3, dust_ppb: 22.4 },
      { depth_m: 14.5, age_ce: 1970, delta_18o: -28.9, delta_d: -222.8, d_excess: 8.4, dust_ppb: 26.8 },
      { depth_m: 20.0, age_ce: 1945, delta_18o: -29.8, delta_d: -230.1, d_excess: 8.3, dust_ppb: 31.5 },
      { depth_m: 26.5, age_ce: 1915, delta_18o: -31.4, delta_d: -242.8, d_excess: 8.4, dust_ppb: 39.2 },
      { depth_m: 32.0, age_ce: 1885, delta_18o: -33.2, delta_d: -257.4, d_excess: 8.2, dust_ppb: 48.6 },
      { depth_m: 38.5, age_ce: 1850, delta_18o: -34.8, delta_d: -270.2, d_excess: 8.2, dust_ppb: 62.4 },
      { depth_m: 44.0, age_ce: 1815, delta_18o: -36.5, delta_d: -283.8, d_excess: 8.2, dust_ppb: 112.5 },
      { depth_m: 50.5, age_ce: 1780, delta_18o: -33.6, delta_d: -260.5, d_excess: 8.3, dust_ppb: 45.2 },
      { depth_m: 56.0, age_ce: 1740, delta_18o: -32.8, delta_d: -254.1, d_excess: 8.3, dust_ppb: 41.8 },
      { depth_m: 62.5, age_ce: 1700, delta_18o: -35.2, delta_d: -273.4, d_excess: 8.2, dust_ppb: 78.4 },
      { depth_m: 68.0, age_ce: 1660, delta_18o: -36.8, delta_d: -286.2, d_excess: 8.2, dust_ppb: 94.2 },
      { depth_m: 74.5, age_ce: 1615, delta_18o: -34.5, delta_d: -267.8, d_excess: 8.2, dust_ppb: 52.6 },
      { depth_m: 80.0, age_ce: 1570, delta_18o: -32.1, delta_d: -248.6, d_excess: 8.2, dust_ppb: 38.4 },
    ],
  },

  // 4. Maitri Greenhouse Gas Flux Record (Antarctica)
  {
    id: 'ds-maitri-flux',
    title: 'Schirmacher Oasis Atmospheric Greenhouse Gas Flux & Energy Balance',
    shortName: 'Antarctic GHG Flux & Radiation',
    region: 'Antarctica',
    domain: 'Atmospheric Physics',
    description: 'Continuous eddy covariance flux tower observations measuring boundary layer carbon dioxide (CO₂), methane (CH₄), and surface radiation energy balance.',
    abstract: 'High-frequency micrometeorological and eddy covariance flux observations over the ice-free terrestrial polar desert of Schirmacher Oasis near Maitri station. Examines soil microbial respiration, ozone seasonality, and radiative forcing in coastal East Antarctica.',
    authorOrLead: 'Atmospheric Physics Division',
    institution: 'NCPOR / Indian Institute of Tropical Meteorology (IITM)',
    doi: '10.5067/NCPOR-ANT-FLUX-2024',
    updateDate: 'July 2024',
    temporalCoverage: '2022-01 to 2024-06 (Continuous monthly means)',
    spatialCoverage: 'Schirmacher Oasis, Antarctica (-70.760°S, 11.745°E)',
    coordinates: { lat: -70.760, lng: 11.745 },
    station: 'Maitri Station (Antarctica)',
    fileFormats: ['CSV', 'NetCDF', 'JSON'],
    sizeBytes: 859832320,
    sizeStr: '820 MB',
    downloadCount: 2150,
    license: 'NCPOR Open Data Policy (CC BY 4.0)',
    citation: 'NCPOR Atmospheric Physics Division. (2024). Schirmacher Oasis Atmospheric Greenhouse Gas Flux Record. NCPOR Polar Data Repository. https://doi.org/10.5067/NCPOR-ANT-FLUX-2024',
    tags: ['Maitri', 'Schirmacher Oasis', 'GHG Flux', 'Atmospheric Physics', 'Carbon Cycle', 'Antarctica'],
    columns: [
      { name: 'month', label: 'Month/Year', type: 'timestamp', description: 'Monthly aggregated observation period', missingCount: 0 },
      { name: 'co2_ppm', label: 'CO₂ Mixing Ratio', type: 'float64', unit: 'ppm', description: 'Atmospheric carbon dioxide concentration', min: 416.2, max: 422.8, mean: 419.5, median: 419.8, missingCount: 0 },
      { name: 'ch4_ppb', label: 'CH₄ Methane', type: 'float64', unit: 'ppb', description: 'Atmospheric methane mixing ratio', min: 1810.5, max: 1845.2, mean: 1828.4, median: 1829.0, missingCount: 0 },
      { name: 'net_radiation_wm2', label: 'Net Solar Radiation', type: 'float64', unit: 'W/m²', description: 'Net all-wave surface radiation flux', min: -45.2, max: 185.4, mean: 52.6, median: 35.0, missingCount: 0 },
      { name: 'sensible_heat_wm2', label: 'Sensible Heat Flux', type: 'float64', unit: 'W/m²', description: 'Turbulent sensible heat flux', min: -25.0, max: 95.8, mean: 28.4, median: 18.2, missingCount: 0 },
      { name: 'soil_temp_c', label: 'Permafrost Temp', type: 'float64', unit: '°C', description: 'Active layer surface soil temperature', min: -28.4, max: 6.8, mean: -9.8, median: -8.5, missingCount: 0 },
    ],
    sampleData: [
      { month: '2023-01', co2_ppm: 417.8, ch4_ppb: 1821.5, net_radiation_wm2: 175.4, sensible_heat_wm2: 88.5, soil_temp_c: 5.8 },
      { month: '2023-02', co2_ppm: 418.1, ch4_ppb: 1822.0, net_radiation_wm2: 125.0, sensible_heat_wm2: 65.2, soil_temp_c: 2.1 },
      { month: '2023-03', co2_ppm: 418.5, ch4_ppb: 1824.2, net_radiation_wm2: 45.8, sensible_heat_wm2: 24.5, soil_temp_c: -6.4 },
      { month: '2023-04', co2_ppm: 419.2, ch4_ppb: 1826.8, net_radiation_wm2: -15.2, sensible_heat_wm2: -5.4, soil_temp_c: -14.8 },
      { month: '2023-05', co2_ppm: 419.8, ch4_ppb: 1829.5, net_radiation_wm2: -38.4, sensible_heat_wm2: -18.2, soil_temp_c: -21.5 },
      { month: '2023-06', co2_ppm: 420.4, ch4_ppb: 1832.1, net_radiation_wm2: -45.0, sensible_heat_wm2: -24.5, soil_temp_c: -26.2 },
      { month: '2023-07', co2_ppm: 420.9, ch4_ppb: 1834.0, net_radiation_wm2: -42.8, sensible_heat_wm2: -22.1, soil_temp_c: -27.8 },
      { month: '2023-08', co2_ppm: 421.2, ch4_ppb: 1836.5, net_radiation_wm2: -25.6, sensible_heat_wm2: -12.4, soil_temp_c: -24.5 },
      { month: '2023-09', co2_ppm: 420.8, ch4_ppb: 1833.8, net_radiation_wm2: 28.5, sensible_heat_wm2: 14.2, soil_temp_c: -16.2 },
      { month: '2023-10', co2_ppm: 419.9, ch4_ppb: 1830.2, net_radiation_wm2: 85.4, sensible_heat_wm2: 44.5, soil_temp_c: -7.8 },
      { month: '2023-11', co2_ppm: 419.1, ch4_ppb: 1826.5, net_radiation_wm2: 148.2, sensible_heat_wm2: 76.8, soil_temp_c: 0.5 },
      { month: '2023-12', co2_ppm: 418.6, ch4_ppb: 1823.4, net_radiation_wm2: 185.4, sensible_heat_wm2: 95.8, soil_temp_c: 6.8 },
      { month: '2024-01', co2_ppm: 419.2, ch4_ppb: 1824.5, net_radiation_wm2: 178.5, sensible_heat_wm2: 91.2, soil_temp_c: 6.2 },
      { month: '2024-03', co2_ppm: 420.1, ch4_ppb: 1828.0, net_radiation_wm2: 48.2, sensible_heat_wm2: 26.8, soil_temp_c: -5.8 },
      { month: '2024-05', co2_ppm: 421.5, ch4_ppb: 1835.4, net_radiation_wm2: -35.2, sensible_heat_wm2: -16.8, soil_temp_c: -20.8 },
      { month: '2024-07', co2_ppm: 422.4, ch4_ppb: 1841.2, net_radiation_wm2: -41.5, sensible_heat_wm2: -21.4, soil_temp_c: -27.1 },
    ],
  },

  // 5. Southern Ocean Carbon & Biogeochemistry
  {
    id: 'ds-southern-carbon',
    title: 'Southern Ocean Phytoplankton Biomass & Carbon Export Transect',
    shortName: 'Southern Ocean Carbon Sink',
    region: 'Southern Ocean',
    domain: 'Marine Ecology',
    description: 'Underway bio-optical sensors, fluorometry, HPLC pigments, and sediment trap carbon fluxes across Sub-Antarctic and Polar Frontal zones.',
    abstract: 'Cruise dataset collected aboard ORV Sagar Nidhi across a latitudinal transect from 25°S to 65°S in the Indian Ocean sector of the Southern Ocean. Quantifies the biological carbon pump, chlorophyll biomass, and micronutrient limitation (Fe, Si) across frontal boundaries.',
    authorOrLead: 'Dr. Anoop Tiwari & Ocean Sciences Team',
    institution: 'National Centre for Polar and Ocean Research (NCPOR), MoES',
    doi: '10.5067/NCPOR-SO-BIO-2024',
    updateDate: 'May 2024',
    temporalCoverage: 'Jan 2024 - March 2024 (Indian Southern Ocean Expedition)',
    spatialCoverage: 'Southern Ocean Transect: 25.0°S to 65.0°S along 57.5°E',
    coordinates: { lat: -55.200, lng: 57.400 },
    station: 'ORV Sagar Nidhi Vessel',
    fileFormats: ['CSV', 'NetCDF'],
    sizeBytes: 681574400,
    sizeStr: '650 MB',
    downloadCount: 1890,
    license: 'NCPOR Open Data Policy (CC BY 4.0)',
    citation: 'Tiwari, A., et al. (2024). Southern Ocean Phytoplankton Biomass & Carbon Export Transect. NCPOR Polar Data Repository. https://doi.org/10.5067/NCPOR-SO-BIO-2024',
    tags: ['Southern Ocean', 'ORV Sagar Nidhi', 'Carbon Sink', 'Polar Front', 'Chlorophyll', 'Nutrients'],
    columns: [
      { name: 'latitude', label: 'Latitude (°S)', type: 'float64', unit: '°S', description: 'South latitude position along 57.5°E meridian', min: -65.0, max: -25.0, mean: -45.0, median: -45.0, missingCount: 0 },
      { name: 'surface_temp_c', label: 'Sea Surface Temp', type: 'float64', unit: '°C', description: 'Sea surface temperature', min: -1.2, max: 24.5, mean: 8.4, median: 6.8, missingCount: 0 },
      { name: 'chlorophyll_a', label: 'Chlorophyll-a', type: 'float64', unit: 'mg/m³', description: 'Surface chlorophyll-a fluorescence biomass', min: 0.12, max: 2.85, mean: 0.86, median: 0.65, missingCount: 0 },
      { name: 'carbon_export', label: 'POC Export Flux', type: 'float64', unit: 'mg C/m²/d', description: 'Particulate organic carbon export at 100m depth', min: 14.5, max: 142.0, mean: 68.4, median: 58.0, missingCount: 0 },
      { name: 'nitrate_umoll', label: 'Nitrate (NO₃)', type: 'float64', unit: 'µmol/L', description: 'Dissolved nitrate nutrient concentration', min: 0.2, max: 32.5, mean: 18.2, median: 21.0, missingCount: 0 },
      { name: 'silicate_umoll', label: 'Silicate (SiO₄)', type: 'float64', unit: 'µmol/L', description: 'Dissolved silicate nutrient concentration', min: 1.5, max: 68.0, mean: 28.6, median: 22.5, missingCount: 0 },
    ],
    sampleData: [
      { latitude: -25.0, surface_temp_c: 24.2, chlorophyll_a: 0.15, carbon_export: 18.2, nitrate_umoll: 0.4, silicate_umoll: 1.8 },
      { latitude: -30.0, surface_temp_c: 21.5, chlorophyll_a: 0.22, carbon_export: 24.5, nitrate_umoll: 1.2, silicate_umoll: 2.5 },
      { latitude: -35.0, surface_temp_c: 17.8, chlorophyll_a: 0.45, carbon_export: 38.0, nitrate_umoll: 4.8, silicate_umoll: 3.9 },
      { latitude: -40.0, surface_temp_c: 13.5, chlorophyll_a: 0.95, carbon_export: 72.4, nitrate_umoll: 12.5, silicate_umoll: 6.8 },
      { latitude: -45.0, surface_temp_c: 8.8, chlorophyll_a: 1.65, carbon_export: 115.0, nitrate_umoll: 19.8, silicate_umoll: 11.2 },
      { latitude: -48.0, surface_temp_c: 5.4, chlorophyll_a: 2.45, carbon_export: 142.0, nitrate_umoll: 23.5, silicate_umoll: 18.4 },
      { latitude: -52.0, surface_temp_c: 3.1, chlorophyll_a: 1.85, carbon_export: 128.5, nitrate_umoll: 26.8, silicate_umoll: 32.5 },
      { latitude: -55.0, surface_temp_c: 1.4, chlorophyll_a: 1.25, carbon_export: 94.0, nitrate_umoll: 28.9, silicate_umoll: 48.0 },
      { latitude: -58.0, surface_temp_c: 0.2, chlorophyll_a: 0.85, carbon_export: 65.0, nitrate_umoll: 30.2, silicate_umoll: 58.5 },
      { latitude: -62.0, surface_temp_c: -0.8, chlorophyll_a: 0.55, carbon_export: 42.0, nitrate_umoll: 31.8, silicate_umoll: 64.2 },
      { latitude: -65.0, surface_temp_c: -1.2, chlorophyll_a: 0.38, carbon_export: 28.5, nitrate_umoll: 32.5, silicate_umoll: 68.0 },
    ],
  },

  // 6. Svalbard Sea Ice Thickness & Albedo Monitoring (Arctic)
  {
    id: 'ds-arctic-seaice',
    title: 'Svalbard Multi-Year Sea Ice Thickness & Albedo Monitoring',
    shortName: 'Arctic Sea Ice & Albedo Matrix',
    region: 'Arctic',
    domain: 'Cryosphere',
    description: 'Long-term electromagnetic sea ice thickness sounding, surface albedo measurements, and snow cover tracking in Kongsfjorden & Fram Strait.',
    abstract: 'Cryospheric satellite validation and in-situ ground electromagnetic induction measurements across coastal fjords of Western Spitsbergen. Captures the acceleration of sea ice thinning and surface albedo feedback in the high Arctic.',
    authorOrLead: 'Cryosphere & Remote Sensing Division',
    institution: 'National Centre for Polar and Ocean Research (NCPOR), MoES',
    doi: '10.5067/NCPOR-ARC-ICE-2024',
    updateDate: 'June 2024',
    temporalCoverage: '2005 - 2024 (Annual April Maxima)',
    spatialCoverage: 'Kongsfjorden & Fram Strait, Svalbard (79.0°N, 11.5°E)',
    coordinates: { lat: 79.000, lng: 11.500 },
    station: 'Himadri Station (Arctic)',
    fileFormats: ['CSV', 'GeoTIFF', 'NetCDF'],
    sizeBytes: 1288490188,
    sizeStr: '1.20 GB',
    downloadCount: 4210,
    license: 'NCPOR Open Data Policy (CC BY 4.0)',
    citation: 'NCPOR Cryosphere Division. (2024). Svalbard Multi-Year Sea Ice Thickness & Albedo Monitoring. NCPOR Polar Data Repository. https://doi.org/10.5067/NCPOR-ARC-ICE-2024',
    tags: ['Arctic', 'Sea Ice', 'Albedo', 'Fram Strait', 'Himadri', 'Cryosphere'],
    columns: [
      { name: 'year', label: 'Observation Year', type: 'integer', description: 'Year of spring maximum measurement', min: 2005, max: 2024, missingCount: 0 },
      { name: 'ice_thickness_m', label: 'Mean Ice Thickness', type: 'float64', unit: 'm', description: 'Mean sea ice thickness from EM-bird sensor', min: 0.65, max: 2.15, mean: 1.28, median: 1.20, missingCount: 0 },
      { name: 'snow_depth_cm', label: 'Snow Depth', type: 'float64', unit: 'cm', description: 'Snow accumulation on sea ice', min: 8.5, max: 38.0, mean: 21.4, median: 20.5, missingCount: 0 },
      { name: 'surface_albedo', label: 'Surface Albedo', type: 'float64', unit: 'ratio (0-1)', description: 'Solar broadband surface reflectance ratio', min: 0.48, max: 0.88, mean: 0.71, median: 0.72, missingCount: 0 },
      { name: 'air_temp_c', label: 'Spring Air Temp', type: 'float64', unit: '°C', description: 'Mean April surface air temperature', min: -18.5, max: -6.2, mean: -12.4, median: -12.1, missingCount: 0 },
    ],
    sampleData: [
      { year: 2005, ice_thickness_m: 2.15, snow_depth_cm: 36.5, surface_albedo: 0.88, air_temp_c: -18.5 },
      { year: 2006, ice_thickness_m: 1.95, snow_depth_cm: 32.0, surface_albedo: 0.85, air_temp_c: -16.8 },
      { year: 2007, ice_thickness_m: 1.65, snow_depth_cm: 28.5, surface_albedo: 0.81, air_temp_c: -14.2 },
      { year: 2008, ice_thickness_m: 1.55, snow_depth_cm: 26.0, surface_albedo: 0.79, air_temp_c: -13.5 },
      { year: 2009, ice_thickness_m: 1.48, snow_depth_cm: 24.5, surface_albedo: 0.77, air_temp_c: -13.0 },
      { year: 2010, ice_thickness_m: 1.62, snow_depth_cm: 29.0, surface_albedo: 0.82, air_temp_c: -15.1 },
      { year: 2011, ice_thickness_m: 1.38, snow_depth_cm: 22.0, surface_albedo: 0.74, air_temp_c: -12.2 },
      { year: 2012, ice_thickness_m: 1.15, snow_depth_cm: 18.5, surface_albedo: 0.68, air_temp_c: -10.5 },
      { year: 2013, ice_thickness_m: 1.28, snow_depth_cm: 20.0, surface_albedo: 0.72, air_temp_c: -11.8 },
      { year: 2014, ice_thickness_m: 1.20, snow_depth_cm: 19.5, surface_albedo: 0.70, air_temp_c: -11.2 },
      { year: 2015, ice_thickness_m: 1.25, snow_depth_cm: 21.0, surface_albedo: 0.71, air_temp_c: -11.9 },
      { year: 2016, ice_thickness_m: 0.95, snow_depth_cm: 14.5, surface_albedo: 0.62, air_temp_c: -8.4 },
      { year: 2017, ice_thickness_m: 1.05, snow_depth_cm: 16.0, surface_albedo: 0.65, air_temp_c: -9.6 },
      { year: 2018, ice_thickness_m: 1.12, snow_depth_cm: 17.5, surface_albedo: 0.68, air_temp_c: -10.1 },
      { year: 2019, ice_thickness_m: 0.88, snow_depth_cm: 12.0, surface_albedo: 0.58, air_temp_c: -7.8 },
      { year: 2020, ice_thickness_m: 0.92, snow_depth_cm: 13.5, surface_albedo: 0.60, air_temp_c: -8.2 },
      { year: 2021, ice_thickness_m: 0.98, snow_depth_cm: 15.0, surface_albedo: 0.63, air_temp_c: -8.9 },
      { year: 2022, ice_thickness_m: 0.75, snow_depth_cm: 10.5, surface_albedo: 0.52, air_temp_c: -6.8 },
      { year: 2023, ice_thickness_m: 0.70, snow_depth_cm: 9.8, surface_albedo: 0.50, air_temp_c: -6.5 },
      { year: 2024, ice_thickness_m: 0.65, snow_depth_cm: 8.5, surface_albedo: 0.48, air_temp_c: -6.2 },
    ],
  },
];
