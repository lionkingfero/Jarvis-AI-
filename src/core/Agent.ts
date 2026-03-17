import { MemoryService } from './MemoryService';

interface CustomResponses {
  [key: string]: string;
}

export class Agent {
  private memory: MemoryService;
  private customResponses: CustomResponses;

  constructor(memoryService: MemoryService) {
    this.memory = memoryService;

    // Predefined custom responses
    this.customResponses = {
      "hi": "Hello, Mamar Njie! How may I help you today?",
      "jarvis wake up daddy's home": "Oh, it's you, Mamar Njie, father. How may I help you today?",
      "who made you": "I was made by Mamar Njie.",
      "tell me about your maker": "Mamar Njie is a 17-year-old living in Gambia."
    };
  }

  // Main process input function
  public async processInput(userInput: string): Promise<string> {
    const lowerInput = userInput.toLowerCase().trim();

    // Check for custom responses first
    if (this.customResponses[lowerInput]) {
      this.memory.addChatMessage("You", userInput);
      this.memory.addChatMessage("Jarvis", this.customResponses[lowerInput]);
      return this.customResponses[lowerInput];
    }

    // Handle search commands
    if (
      lowerInput.startsWith("tell me") ||
      lowerInput.startsWith("who is") ||
      lowerInput.startsWith("tell me about")
    ) {
      const response = `Searching for "${userInput}" on Wikipedia, Reddit, and the Internet...`;
      this.memory.addChatMessage("You", userInput);
      this.memory.addChatMessage("Jarvis", response);
      return response;
    }

    // Default fallback
    const fallback = "I don't understand. Try asking 'who is' or 'tell me about' something.";
    this.memory.addChatMessage("You", userInput);
    this.memory.addChatMessage("Jarvis", fallback);
    return fallback;
  }
}
