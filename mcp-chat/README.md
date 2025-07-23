# MCP Demo

A terminal-based chat application using Vercel AI SDK with Model Context Protocol (MCP) filesystem tools.

## Quick Start

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Configure AWS credentials:**
   ```bash
   aws sso login
   ```

## Usage

### One-Shot Queries
Ask a single question and get an immediate response:
```bash
pnpm ask "What is a tetrahedron?"

# if you have a tool that can read your files:
pnpm ask "list all TypeScript files in the src directory"
```

### Interactive Chat Mode
Start a persistent chat session:
```bash
pnpm chat
```

## Development

- **Build**: `pnpm build`
- **Lint**: `pnpm lint:fix`
