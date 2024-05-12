interface RegionInterface {
  from: string;
  intensity: { forecast: number };
}

interface SameDataObject {
  [date: string]: number[];
}

export default function calculateAverageIntensity(data: RegionInterface[]) {
  // Initialize an object to hold the intensity values for each date
  const sameData: SameDataObject = data.reduce((acc:any, entry) => {
    const date = entry.from.substring(0, 10);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(entry.intensity.forecast);
    return acc;
  }, {});

  console.log(sameData, 'no');

  // Calculate the average intensity for each date
  const averages: { date: string; average: number }[] = Object.entries(sameData).map(
    ([date, forecasts]) => {
      const average =
        forecasts.reduce((sum: number, value: number) => sum + value, 0) / forecasts.length;
      return { date, average };
    }
  );

  return averages;
}
