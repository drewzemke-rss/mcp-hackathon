import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

// This is an example of an MCP client that connects to a 3rd party server.
// See https://github.com/modelcontextprotocol/servers for a very long list of available servers!

export async function createFileSystemMcpClient() {
  const client = new Client({ name: 'filesystem', version: '1.0.0' });

  const transport = new StdioClientTransport({
    command: 'npx',
    args: [
      '-y',
      // see https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem for more info
      '@modelcontextprotocol/server-filesystem',
      // NOTE: this argument specifies in which directory the tool is allowed to act.
      // If you change it to `.`, then the LLM will be able to make changes to this very project,
      // which you may or may not want!
      './sandbox',
    ],
  });

  await client.connect(transport);

  return client;
}
