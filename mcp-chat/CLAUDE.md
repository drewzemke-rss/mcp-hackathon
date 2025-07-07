# MCP Interactive Chat Demo

A terminal-based chat application using Vercel AI SDK with Model Context Protocol (MCP) filesystem tools.

## Architecture
- `src/chat.ts` - Main application coordinator
- `src/services/ai-service.ts` - AI model and MCP tool integration
- `src/services/chat-interface.ts` - User interface and terminal handling
- `src/tools/` - MCP tools

## Development Instructions
- **After every code change**: Run `pnpm build` to check TypeScript compilation
- **After every code change**: Run `pnpm lint:fix` to format and check code style

## Project Guidelines
- Use context7 MCP server to look up packages before using them in code
- Follow Single Responsibility Principle when adding new modules
