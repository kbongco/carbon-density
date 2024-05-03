export const countries = ['England', 'Scotland', 'Wales'];

export const carbonIntensityAPI = 'https://api.carbonintensity.org.uk/intensity';
export const carbonIntensityRegional = 'https://api.carbonintensity.org.uk/regional';

export const getRegionalLocationData = (country: string) => {
  return `https://api.carbonintensity.org.uk/regional/${country}`
}