#!/usr/bin/env node

import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import z from 'zod';

// This is an example of an MCP server that runs over Stdio.

const execAsync = promisify(exec);

// util function for the server tool
export async function getWeather(location: string) {
  if (!location) {
    throw new Error('Location is required');
  }

  // encode the location properly for URL
  const encodedLocation = encodeURIComponent(location);

  try {
    // use curl to fetch weather data from wttr.in
    const { stdout } = await execAsync(
      `curl -s "wttr.in/${encodedLocation}?format=%l:+%C+%t+%h+%w&m"`,
    );

    return `Weather for ${location}:\n${stdout.trim()}`;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to fetch weather data: ${errorMessage}`);
  }
}

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

// Remove flight logic and integrate flight server if needed

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
