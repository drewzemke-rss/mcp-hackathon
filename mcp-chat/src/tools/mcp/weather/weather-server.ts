#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import z from 'zod';
import { getWeather } from '../../utils/get-weather.js';

// This is an example of an MCP server that runs over Stdio.

const server = new McpServer({ name: 'weather-server', version: '1.0.0' });

server.tool(
  // tool name
  'get-weather',

  // tool description
  'Get current weather for a location',

  // zod schema for the parameters
  {
    location: z.string().describe('The location to get weather for (city, region, country)'),
  },

  // tool executor -- runs when the tool is called
  // note that we have to return a specific format: { content: { type:'text', text:string }[] }
  async ({ location }) => {
    try {
      const weatherData = await getWeather(location);

      return {
        content: [
          {
            type: 'text',
            text: weatherData,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
