import { GenerationMix } from './regional-interface';
export interface IntensityData {
  from: string;
  to: string;
  intensity: {
    forecast: number;
    actual: number;
    index: string;
  };
}

export interface PowerData {
  Biomass: number;
  Coal: number;
  "Dutch Imports": number;
  "French Imports": number;
  "Gas (Combined Cycle)": number;
  "Gas (Open Cycle)": number;
  Hydro: number;
  "Irish Imports": number;
  Nuclear: number;
  Oil: number;
  Other: number;
  "Pumped Storage": number;
  Solar: number;
  Wind: number;
}

export interface CombinedData {
  intensityData: IntensityData[] | null;
  generationData: {
    from: string;
    generationmix: GenerationMix[]
  } | null
}