import * as readline from 'node:readline';
import chalk from 'chalk';

export class ChatInterface {
  private rl: readline.Interface;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    // Handle terminal resize
    process.stdout.on('resize', () => {
      // Force readline to update its understanding of terminal size
      this.rl.pause();
      this.rl.resume();
    });

    // Handle Ctrl+C gracefully
    process.on('SIGINT', () => {
      console.log('\n\nGoodbye!');
      this.rl.close();
      process.exit(0);
    });
  }

  showWelcome() {
    console.log('LLM Chat with MCP Tools');
    console.log('---');
  }

  showToolsReady() {
    console.log('---');
    console.log('Type your messages and press Enter. Use Ctrl+C to exit.');
  }

  getUserInput(): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(chalk.yellow('\nYou: '), (answer) => {
        resolve(answer);
      });
    });
  }

  showAssistantStart() {
    console.log(chalk.cyan('\nAssistant: '));
  }

  showError(message: string, error?: unknown) {
    console.error(`\n❌ ${message}`);
    if (error) {
      console.error('Error type:', typeof error);
      console.error('Error message:', error instanceof Error ? error.message : String(error));
      console.error('Full error:', error);

      if (error instanceof Error && error.stack) {
        console.error('Stack trace:', error.stack);
      }
    }
  }

  close() {
    this.rl.close();
  }
}
