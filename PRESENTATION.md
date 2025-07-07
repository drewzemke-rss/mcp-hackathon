---
author: Rajesh and Drew,
date: MM-dd-YYYY
paging: Slide %d / %d
theme: ./themes/dracula.json
---

# MCP, LLMs, and You

AI Level Up 2025

---

<!-- ## Goals
After this session, attendees will be able to
1. Describe the MCP in broad terms, explain how it works, and explain what it is useful for. 
2. Construct simple MCP clients and servers and connect them to an LLM
3. Use MCP to solve problems in their project domains
--- -->

## What is MCP?

- Stands for *Model Context Protocol*, released by Anthropic in November 2024.

<br>

- from `modelcontextprotocol.io` (Anthropic's website):

> MCP is an open protocol that standardizes how applications provide context to LLMs. Think of MCP like a USB-C port for AI applications. Just as USB-C provides a standardized way to connect your devices to various peripherals and accessories, MCP provides a standardized way to connect AI models to different data sources and tools. 

---

## Why use MCP?

- Today's LLMs are excellent at understanding language and generating text, but *they can only generate text*!

<br>

- MCP gives LLMs a *standardized* way to interact with the non-text world by allowing them to ask that their client do something on their behalf (eg. read a file, run a shell command, search the web, etc.).

<br>

- **Another analogy**: It's like you're playing chess with someone who has both hands tied behind their back. They can't make their moves themselves, but they can decide on their moves and ask you to make the move for them.

---

## How Does MCP Work? (1/3)

- MCP functions using a client/server model.
  - The *server* the tools and resources that are available
  - The *client* controls the interaction with the LLM
  - The two parties using *JSON schema*

---

## How Does MCP Work? (2/3)

This diagram roughly describes a typical MCP interaction. (This looks *much* better in a browser!)

```mermaid
sequenceDiagram
    actor User
    participant Client
    participant MCP Client
    participant MCP Server
    participant LLM

    User->>Client: Submit prompt
    activate Client

    rect rgb(191, 223, 255)
    Note right of Client: MCP Initialization
      Client->>MCP Client: Initialize
      MCP Client->>MCP Server: Request available tools
      MCP Server-->>MCP Client: Return tools list
    end

    rect rgb(200, 255, 200)
    Note right of Client: Initial LLM Interaction
      Client->>LLM: Send prompt with tools
      activate LLM
      LLM-->>Client: Stream response text
      Client-->>User: Display response
    end

    rect rgb(255, 223, 191)
    Note right of Client: Tool Execution
      LLM->>Client: Request tool execution
      deactivate LLM
      Client->>MCP Client: Forward tool call
      MCP Client->>MCP Server: Execute tool
      activate MCP Server
      MCP Server-->>MCP Client: Return tool result
      deactivate MCP Server
      MCP Client-->>Client: Forward tool result
    end

    rect rgb(255, 200, 200)
    Note right of Client: Final Response
      Client->>LLM: Send tool result
      activate LLM
      LLM-->>Client: Stream final response
      deactivate LLM
      Client-->>User: Display response
      deactivate Client
    end

```
---

## How Does MCP Work? (3/3)

TODO: example of what a tool call actually looks like

