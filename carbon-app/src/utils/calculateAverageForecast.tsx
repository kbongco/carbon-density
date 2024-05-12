import { RegionInterface } from "../interfaces/regional-interface";

interface AverageIntensity {
  date: string;
  average: number;
}

export default function calculateAverageIntensity(data:RegionInterface[]): AverageIntensity[] {
  const sameData = data.reduce((acc, entry) => {
    const date = entry.from.substring(0, 10);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(entry.intensity.forecast);
    return acc;
  });

  const averages: AverageIntensity[] = Object.entries(sameData).map(([date, forecasts]) => {
    const average = forecasts.reduce((sum:number, value:number) => sum + value, 0) / forecasts.length;
    return { date, average }
  })

  return averages;
}