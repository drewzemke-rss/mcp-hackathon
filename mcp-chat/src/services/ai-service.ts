import { createAmazonBedrock } from '@ai-sdk/amazon-bedrock';
import { fromNodeProviderChain } from '@aws-sdk/credential-providers';
import { smoothStream, streamText, type ToolSet } from 'ai';
import chalk from 'chalk';
import { initializeTools } from '../tools/init.js';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export class AIService {
  private tools: ToolSet | undefined;

  constructor() {
    // AWS Configuration
    process.env.AWS_PROFILE = 'dev';
    process.env.AWS_REGION = 'us-west-2';
  }

  async initializeTools() {
    if (!this.tools) {
      this.tools = await initializeTools();
    }
  }

  async streamResponse(messages: ChatMessage[]): Promise<string> {
    const bedrock = createAmazonBedrock({
      credentialProvider: fromNodeProviderChain(),
    });

    const result = streamText({
      model: bedrock('us.anthropic.claude-sonnet-4-20250514-v1:0'),
      messages,
      temperature: 0.7,
      tools: this.tools,
      maxSteps: 200,
      onError: (err) => console.error('Error:', err),
      experimental_transform: smoothStream({ delayInMs: 20 }),
    });

    let assistantResponse = '';

    // Stream the response with proper handling of different message parts
    for await (const part of result.fullStream) {
      switch (part.type) {
        case 'text-delta':
          process.stdout.write(part.textDelta);
          assistantResponse += part.textDelta;
          break;

        case 'tool-call':
          console.log(chalk.magenta(`\n[TOOL CALL: ${part.toolName}]\n`));
          break;

        case 'step-start':
          break;

        case 'step-finish':
          break;

        case 'finish':
          if (!assistantResponse.endsWith('\n')) {
            process.stdout.write('\n');
          }
          break;
      }
    }

    return assistantResponse;
  }
}
