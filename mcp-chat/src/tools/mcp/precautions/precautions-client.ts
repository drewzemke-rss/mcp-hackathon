import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

export async function createPrecautionsMcpClient(): Promise<Client> {
  const client = new Client({
    name: 'precautions-client',
    version: '1.0.0',
  });

  const transport = new StdioClientTransport({
    command: 'node',
    args: ['./dist/tools/mcp/precautions/precautions-server.js'],
    cwd: process.cwd(),
  });
  
  try {
    await client.connect(transport);
    console.log('Connected to precautions MCP server.');
  } catch (error) {
    console.error('Failed to connect to precautions MCP server:', error);
    throw error;
  }

  return client;
}
