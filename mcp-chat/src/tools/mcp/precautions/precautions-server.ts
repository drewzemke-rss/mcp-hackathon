#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import z from 'zod';
import { getPrecautions } from './precautions.js';

const precautionsServer = new McpServer({ name: 'precautions-server', version: '1.0.0' });

precautionsServer.tool(
  'get-precautions',
  'Get precautions based on weather data',
  {
    weatherData: z.string().describe('The weather data to analyze'),
  },
  async ({ weatherData }) => {
    const precautions = getPrecautions(weatherData);

    return {
      content: [
        {
          type: 'text',
          text: precautions,
        },
      ],
    };
  }
);

// Add a transport to enable communication after registering the tool
const transport = new StdioServerTransport();
console.log('Precautions MCP Server running on stdio');
precautionsServer.connect(transport);
