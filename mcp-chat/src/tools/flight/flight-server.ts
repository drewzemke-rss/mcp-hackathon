import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import z from 'zod';
import { getWeather } from '../weather/weather-server.js';
import { getPrecautions } from '../utils/precautions.js';

const flightServer = new McpServer({ name: 'flight-server', version: '1.0.0' });

flightServer.tool(
  'book-flight',
  'Book a flight between two locations and suggest weather and precautions at the destination',
  {
    source: z.string().describe('The departure location (city, region, country)'),
    destination: z.string().describe('The arrival location (city, region, country)'),
  },
  async ({ source, destination }) => {
    const flightDetails = `Flight booked from ${source} to ${destination}.`;
    const weatherData = await getWeather(destination);

    const precautions = getPrecautions(weatherData);

    return {
      content: [
        {
          type: 'text',
          text: `${flightDetails}\nWeather at destination:\n${weatherData}\nPrecautions: ${precautions}`,
        },
      ],
    };
  }
);

export default flightServer;
