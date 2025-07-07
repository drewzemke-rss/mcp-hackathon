import { jsonSchema, type Tool, type ToolSet } from 'ai';
import { createWeatherMcpClient } from './weather/weather-client.js';
import { createFileSystemMcpClient } from './filesystem/filesystem-client.js';

// NOTE: you can add/remove/toggle mcp clients here
const mcpClientInitters = [
  createWeatherMcpClient,

  createFileSystemMcpClient,
];

export async function initializeTools(): Promise<ToolSet> {
  const toolList: [string, Tool][] = [];

  for (const createMcp of mcpClientInitters) {
    const mcpClient = await createMcp();

    // ask the mcp server for a list of available tools
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
