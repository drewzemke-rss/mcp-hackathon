import { AIService, type ChatMessage } from './services/ai-service.js';
import { ChatInterface } from './services/chat-interface.js';

class InteractiveChat {
  private messages: ChatMessage[] = [];
  private aiService: AIService;
  private chatInterface: ChatInterface;

  constructor() {
    this.aiService = new AIService();
    this.chatInterface = new ChatInterface();
  }

  async start() {
    this.chatInterface.showWelcome();
    await this.aiService.initializeTools();
    this.chatInterface.showToolsReady();

    try {
      await this.chatLoop();
    } catch (error) {
      this.chatInterface.showError('Chat loop error:', error);
    }
  }

  private async chatLoop() {
    while (true) {
      try {
        const userInput = await this.chatInterface.getUserInput();

        if (!userInput.trim()) {
          continue;
        }

        // Add user message to history
        this.messages.push({ role: 'user', content: userInput });

        // Stream AI response
        await this.streamAIResponse();
      } catch (error) {
        this.chatInterface.showError('Error in chat loop:', error);
      }
    }
  }

  private async streamAIResponse() {
    try {
      this.chatInterface.showAssistantStart();
      const assistantResponse = await this.aiService.streamResponse(this.messages);

      // Add assistant response to history
      this.messages.push({ role: 'assistant', content: assistantResponse });
    } catch (error) {
      this.chatInterface.showError('Error occurred:', error);
    }
  }

  close() {
    this.chatInterface.close();
  }
}

// Start the chat application
async function main() {
  try {
    const chat = new InteractiveChat();
    await chat.start();
  } catch (error) {
    console.error('❌ Main function error:', error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('❌ Unhandled error in main:', error);
  process.exit(1);
});
