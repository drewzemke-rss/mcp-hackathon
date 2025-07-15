export function getPrecautions(weatherData: string): string {
  if (weatherData.includes('rain')) {
    return 'Carry an umbrella.';
  } else if (weatherData.includes('hot')) {
    return 'Stay hydrated and wear light clothing.';
  } else if (weatherData.includes('cold')) {
    return 'Wear warm clothing.';
  } else {
    return 'No special precautions needed.';
  }
}
