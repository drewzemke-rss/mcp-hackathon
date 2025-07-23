export function getPrecautions(weatherData: string): string {
  if (weatherData.includes('rain')) {
    return 'Carry an umbrella.';
  }
  if (weatherData.includes('hot')) {
    return 'Stay hydrated and wear light clothing.';
  }
  if (weatherData.includes('cold')) {
    return 'Wear warm clothing.';
  }
  return 'No special precautions needed.';
}
