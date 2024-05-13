export interface GenerationData {
  from: string;
  to: string;
  regions: Region[];
}

export interface Region {
  regionid: number;
  dnoregion: string;
  shortname: string;
  intensity: {
    forecast: number;
    index: string;
  };
  generationmix: GenerationMix[];
}

export interface GenerationMix {
  fuel: string;
  perc: number;
}


export interface RegionInterface {
  from: string;
  generationmix: GenerationMix[];
  intensity: {
    forecast: number;
    index: string;
  };
  to: string;
  [key: string]: any; 
}