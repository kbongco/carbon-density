import axios from 'axios';

export default async function getDataByDate(startDate: string, endDate: string, regionid: number) {
  try {
    const response = await axios.get(`https://api.carbonintensity.org.uk/regional/intensity/${startDate}/${endDate}/regionid/${regionid}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
