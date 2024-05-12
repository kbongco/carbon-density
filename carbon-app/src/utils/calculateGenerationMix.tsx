export default function calculateGenerationMixAverage(data:any) {
  const averageMix:any = {};
  const totalEntries = data.length;

  data.forEach((entry: any) => {
      entry.generationmix.forEach((mix: any) => {
          if (!averageMix[mix.fuel]) {
              averageMix[mix.fuel] = 0;
          }
          averageMix[mix.fuel] += mix.perc;
      });
  });

  for (let fuel in averageMix) {
      averageMix[fuel] /= totalEntries;
  }

  return averageMix;
}
