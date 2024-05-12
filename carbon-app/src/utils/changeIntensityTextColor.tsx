export default function changeIntensityTextColor(intensity: unknown) {
  switch (intensity) {
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