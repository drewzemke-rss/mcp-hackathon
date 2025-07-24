import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

// This is an example of an MCP client that connects to a locally-built MCP server over Stdio.

export async function createWeatherMcpClient() {
  const client = new Client({ name: 'weather-client', version: '1.0.0' });

  const transport = new StdioClientTransport({
    command: 'node',
    args: ['./dist/tools/mcp/weather/weather-server.js'],
  });

  await client.connect(transport);
  console.log('Connected to weather MCP server.');

  return client;
}
