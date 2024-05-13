export default function changeIntensityTextColor(intensity: unknown) {

  const intensityString = intensity as string;
  switch (intensityString) {
    case 'very low':
      return 'very-low-intensity';
    case 'low':
      return 'low-intensity';
    case 'moderate':
      return 'moderate-intensity';
    case 'high':
      return 'high-intensity';
    case 'very high':
      return 'very-high-intensity';
    default:
      return 'black';
  }
}