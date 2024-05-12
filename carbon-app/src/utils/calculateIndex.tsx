// Information found on Carbon API site:
// Very Low - 0 - 34;
// Low: 35 - 109
// Moderate: 110 - 189
// High: 190 - 270 
// Very High: 290+ 

export default function calculateIndex(value: number) {
  if (value >= 0 && value <= 34) {
    return "Very Low";
  } else if (value >= 35 && value <= 109) {
    return "Low";
  } else if (value >= 110 && value <= 189) {
    return "Moderate";
  } else if (value >= 190 && value <= 270) {
    return "High";
  } else {
    return "Very High";
  }
}