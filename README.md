# MCP Hackathon

The goal of this workshop for you to familiarize yourself with how LLMs can be augmented using tools and MCP.

## Exercises

### Ex. 0: Make Sure It Works

1. Clone this repo.
2. Go to the `mcp-chat` directory, follow the instructions in [the readme](./mcp-chat/README.md) to set it up.
3. Run `pnpm ask "Oh, hello"` to confirm that you can communicate with the LLM.

### Ex. 1A: Add a (Non-MCP) Tool

First, we'll briefly see how tools work with LLMs.

1. Go to [ai-service.ts](`./mcp-chat/src/services/ai-service.ts`) and uncomment the two lines that are preceeded by `EXERCISE 1A`. This will provide a simple weather fetching tool to the LLM.

2. Run `pnpm ask "Oh, hello"` again. Do you notice a difference in output?

3. Run `pnpm ask "What's the weather in Davis?"` to see the tool in action.

### Ex. 1B: Make Your Own Tool

Next, you're going to make your own tool! The goal is **to have the LLM be able to write a file to your filesystem**.

1. Uncomment the line in [ai-service.ts](`./mcp-chat/src/services/ai-service.ts`) that is preceeded by `EXERCISE 1B`.

2. Go to [file-write-tool.ts](`./mcp-chat/src/tools/basic/file-write-tool.ts`). You need to fill this in!

   - Write a description that will help the LLM decide _when_ it should call this tool. It doesn't need to be complicated!
   - Decide what information the LLM needs to provide to the tool. You might need to look up [JSON Schema](https://ai-sdk.dev/docs/reference/ai-sdk-core/json-schema#jsonschema) to get the format correct.
   - For the executor function, you can use `fs.writeFileSync()` from the Node standard library. See [here](https://nodejs.org/en/learn/manipulating-files/writing-files-with-nodejs) for an example. Also consider: what text do you want to return to the LLM?

3. To test:

```sh
pnpm ask "write 'Hello world' to './hello.md'"
```

4. Once you've got it working, see how it works in conjunction with the other tool:

```sh
pnpm ask "Get the weather in Davis, CA and write out a report to './weather-report.md'."
pnpm ask "Get the weather in New York City, San Francisco, and Houston, and write a weather report for each in a separate markdown file in the current directory."
```

---

Some things you may have noticed about the (non-MCP) tools you've interacted with so far:

- JSON Schema isn't the most fun to work with.
- The `input` parameter to the executor functions is untyped.
- We can only call tools like this that are TS/JS functions that are defined or imported into our project. There's no way to call tools that are defined elsewhere (such as in other projects or computers).

### Ex. 2: Add Some MCP Tools

Let's replace our existing tools with MCP equivalents.

1. Back in [ai-service.ts](`./mcp-chat/src/services/ai-service.ts`), comment out or delete the current assignment of `this.tools` that we've been working on, and replace it with the content below that's preceeded by `EXERCISE 2`.

2. Run `pnpm ask "What's the weather in Davis?"` again, it should work the same as before.

3. Take a few minutes to explore what's going on in [weather-client.ts](`./mcp-chat/src/tools/mcp/weather/weather-client.ts`) and [weather-server.ts](`./mcp-chat/src/tools/mcp/weather/weather-server.ts`). Here are some guiding questions:

   - What transport is being used?
   - What is the purpose of the very first line of the [weather-server.ts](`./mcp-chat/src/tools/mcp/weather/weather-server.ts`)?

4. In [ai-service.ts](`./mcp-chat/src/services/ai-service.ts`), uncomment `createFileSystemMcpClient` (and its import). This will enable an MCP tool from a third-party! See [here](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem).

5. Verify that this works as before before moving on:

```sh
pnpm ask "Get the weather in Davis, CA and write out a report to './weather-report.md'."
```

6. Briefly check out [filesystem-client.ts](`./mcp-chat/src/tools/mcp/filesystem/filesystem-client.ts`) to get a sense for what's involved.

### Ex. 3: MCP Party Time

Your goal for the remainder of the time is design, plan, and create a tool that uses any number of MCP tools to solve a complex task. The choice is yours!

Before making your own mcp tool's, you can check sample ask like below example:

pnpm chat 
you: book a flight from SFO to HYD and store the ticket confirmation with precautions based on destination weather, in a file.

If you observe the console, LLM is smart enough to understand the user request and call the available tools in such a sequence to make the task done. that is the beauty and power of MCP tools.

Here's a [giant list of MCP servers](https://github.com/modelcontextprotocol/servers) that you can use.

And here are some ideas of what you can make:
- a coding agent (easier than you think!)
- a local task management system with Jira integration
- a trip planning tool that gets realtime flight data
- an agent that integrates with your LLM classifier from Tuesday's session

*<insert obvious warning about giving LLMs access to your filesystem, GitHub account, wallet, etc.>*

We'll spend the last 10-15 minuntes of our time together showing off what we've created. Have fun!

## About the Presentation

Run using [`slides`](https://github.com/maaslalani/slides) :)
