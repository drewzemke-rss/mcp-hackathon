import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

export async function createFlightMcpClient(): Promise<Client> {
  const client = new Client({
    name: 'flight-client',
    version: '1.0.0',
  });

  const transport = new StdioClientTransport({
    command: 'node',
    args: ['./dist/tools/mcp/flight/flight-server.js'],
  });
  
  try {
    await client.connect(transport);
    console.log('Connected to flight MCP server.');
  } catch (error) {
    console.error('Failed to connect to flight MCP server:', error);
    throw error;
  }

  return client;
}
