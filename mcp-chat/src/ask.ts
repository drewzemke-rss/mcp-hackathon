import { AIService, type ChatMessage } from './services/ai-service.js';

class OneShot {
  private aiService: AIService;

  constructor() {
    this.aiService = new AIService();
  }

  async ask(message: string) {
    try {
      await this.aiService.initializeTools();

      const messages: ChatMessage[] = [{ role: 'user', content: message }];

      await this.aiService.streamResponse(messages);
      process.exit(0);
    } catch (error) {
      console.error('❌ Error:', error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: pnpm ask "your message here"');
    process.exit(1);
  }

  const message = args.join(' ');
  const oneShot = new OneShot();
  await oneShot.ask(message);
}

main().catch((error) => {
  console.error('❌ Unhandled error:', error);
  process.exit(1);
});
