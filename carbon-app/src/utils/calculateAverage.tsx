export default function calculateAverage(data:any) {
  if (data && data.length > 0) {
    const totalForecast = data.reduce((accumulator:number, entry: { intensity: { forecast: number; }; }) => accumulator + entry.intensity.forecast, 0);
    const averageForecast = totalForecast / data.length;
    return averageForecast;
  } else {
    return 0;
  }
}