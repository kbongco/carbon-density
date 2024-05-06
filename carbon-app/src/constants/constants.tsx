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