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

### Interactive Chat Mode
Start a persistent chat session:
```bash
pnpm chat
```

Example conversation:
```
You: What files are in this directory?
Assistant: I'll check the files in the current directory for you.

[TOOL CALL: read_directory]

I can see several files including package.json, src/, README.md...

You: Create a new file called hello.txt with "Hello World"
Assistant: I'll create that file for you.

[TOOL CALL: write_file]

Done! I've created hello.txt with "Hello World".
```

### One-Shot Queries
Ask a single question and get an immediate response:
```bash
pnpm ask "list all TypeScript files in the src directory"
pnpm ask "create a simple package.json file"
```

The AI will stream its response and exit automatically.

## Development

- **Build**: `pnpm build`
- **Lint**: `pnpm lint:fix`
