import { Options } from "../interfaces/component-interfaces";

export const countries = ['England', 'Scotland', 'Wales'];

export const carbonIntensityAPI = 'https://api.carbonintensity.org.uk/intensity/date';
export const carbonIntensityRegional = 'https://api.carbonintensity.org.uk/regional';
export const carbonIntensityFactors = 'https://api.carbonintensity.org.uk/generation';

export const getRegionalLocationData = (country: string) => {
  return `https://api.carbonintensity.org.uk/regional/${country}`
}

export const getRegionalDataByOneWeek = (todayDateISO:string, oneWeekAgo:string, regionid: number) => {
  return `https://api.carbonintensity.org.uk/regional/intensity/${oneWeekAgo}/${todayDateISO}/regionid/${regionid}`
}

export const getRegionalDataByOneMonth = (todayDateISO: string, oneMonthAgo: string, regionid: number) => {
  return `https://api.carbonintensity.org.uk/regional/intensity/${oneMonthAgo}/${todayDateISO}/regionid/${regionid}`
}

export const regionalColumns = [
  { key: 'dnoregion', label: 'Region' },
  { key: 'intensity.forecast', label: 'Forecast' },
  { key: 'intensity.index', label: 'Index' },
  { key: 'viewDetails', label: 'View Details' } 
];

export const specificRegions = [
  { key: 'intensity.forecast', label: 'Forecast' },
  { key: 'intensity.index', label: 'Index' },
]

export const dateOptions: Options[] = [
  {
    value: '24hours',
    label: '24 hours'
  },
  {
    value: '48hours',
    label: '48 hours'
  },
  {
    value: '1week',
    label: '1 week'
  },
  {
    value: '1month',
    label: '1 month'
  },
  {
    value: '2months',
    label: '2 months'
  },
  {
    value: '3months',
    label: '3 months'
  },
  {
    value: '4months',
    label: '4 months'
  },
  {
    value: '5months',
    label: '5 months'
  },
  {
    value: '6months',
    label: '6 months'
  },
  {
    value: '7months',
    label: '7 months'
  },
  {
    value: '8months',
    label: '8 months'
  },
  {
    value: '9months',
    label: '9 months'
  },
  {
    value: '10months',
    label: '10 months'
  },
  {
    value: '11months',
    label: '11 months'
  },
  {
    value: '1year',
    label: '1 year'
  },
  {
    value: '2years',
    label: '2 years'
  },
  {
    value: '3years',
    label: '3 years'
  },
  {
    value: '4years',
    label: '4 years'
  },
  {
    value: '5years',
    label: '5 years'
  },
];
