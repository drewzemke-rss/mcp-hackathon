import type { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { jsonSchema, type Tool, type ToolSet } from 'ai';

export async function initializeMcpTools(initters: (() => Promise<Client>)[]): Promise<ToolSet> {
  const toolList: [string, Tool][] = [];

  for (const createMcp of initters) {
    const mcpClient = await createMcp();

    // ask each mcp server for a list of available tools
    const { tools } = await mcpClient.listTools();

    // convert MCP tools to Vercel AI SDK tool format
    const toolSchemas = tools.map(
      (tool) =>
        [
          tool.name,
          {
            description: tool.description,
            parameters: jsonSchema(tool.inputSchema),
            execute: (input: { [x: string]: unknown }) =>
              mcpClient.callTool({ name: tool.name, arguments: input }),
          },
        ] as [string, Tool],
    );

    toolList.push(...toolSchemas);
  }

  return Object.fromEntries(toolList);
}
