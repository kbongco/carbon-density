export const countries = ['England', 'Scotland', 'Wales'];

export const carbonIntensityAPI = 'https://api.carbonintensity.org.uk/intensity/date';
export const carbonIntensityRegional = 'https://api.carbonintensity.org.uk/regional';
export const carbonIntensityFactors = 'https://api.carbonintensity.org.uk/generation';

export const getRegionalLocationData = (country: string) => {
  return `https://api.carbonintensity.org.uk/regional/${country}`
}