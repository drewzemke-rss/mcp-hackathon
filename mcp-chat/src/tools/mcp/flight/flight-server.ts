#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import z from 'zod';

const flightServer = new McpServer({ name: 'flight-server', version: '1.0.0' });

flightServer.tool(
  'book-flight',
  'Book a flight between two locations, and return the flight details',
  {
    source: z.string().describe('The departure location (city, region, country)'),
    destination: z.string().describe('The arrival location (city, region, country)'),
  },
  async ({ source, destination }) => {
    const flightDetails = `Flight booked from ${source} to ${destination}.`;
    // Here you would typically call an external API or service to book the flight
    // For this example, we are just returning a mock response

    return {
      content: [
        {
          type: 'text',
          text: flightDetails,
        },
      ],
    };
  }
);

// Add a transport to enable communication after registering the tool
const transport = new StdioServerTransport();
console.log('Flight MCP Server running on stdio');
flightServer.connect(transport);
