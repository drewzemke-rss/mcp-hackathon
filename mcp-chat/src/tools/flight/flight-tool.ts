import { jsonSchema, type Tool } from 'ai';
import { getWeather } from '../weather/weather-server.js';

export const bookFlightTool: [string, Tool] = [
  'book-flight',
  {
    description: 'Book a flight between two locations and suggest weather and precautions at the destination',
    parameters: jsonSchema({
      type: 'object',
      properties: {
        source: { type: 'string', description: 'The departure location' },
        destination: { type: 'string', description: 'The arrival location' },
      },
      required: ['source', 'destination'],
    }),
    execute: async (input) => {
      const { source, destination } = input;
      const flightDetails = `Flight booked from ${source} to ${destination}.`;
      const weatherData = await getWeather(destination);

      let precautions = '';
      if (weatherData.includes('rain')) {
        precautions = 'Carry an umbrella.';
      } else if (weatherData.includes('hot')) {
        precautions = 'Stay hydrated and wear light clothing.';
      } else if (weatherData.includes('cold')) {
        precautions = 'Wear warm clothing.';
      } else {
        precautions = 'No special precautions needed.';
      }

      return `${flightDetails}\nWeather at destination:\n${weatherData}\nPrecautions: ${precautions}`;
    },
  },
];
