import fetch from "node-fetch"; // placeholder for future web requests
import { MemoryService } from "./MemoryService";

export class LLMService {
  private memory: MemoryService;

  constructor(memoryService: MemoryService) {
    this.memory = memoryService;
  }

  // Main query function
  public async query(input: string): Promise<string> {
    // Normalize input
    const lowerInput = input.toLowerCase().trim();

    // Custom responses that are quick
    const customResponses: { [key: string]: string } = {
      "hi": "Hello, Mamar Njie! How may I help you today?",
      "jarvis wake up daddy's home": "Oh, it's you, Mamar Njie, father. How may I help you today?",
      "who made you": "I was made by Mamar Njie.",
      "tell me about your maker": "Mama Njie is a 17-year-old who is living in Gambia."
    };

    if (customResponses[lowerInput]) {
      return customResponses[lowerInput];
    }

    // Placeholder: simulate searching Wikipedia, Reddit, Internet
    if (
      lowerInput.startsWith("who is") ||
      lowerInput.startsWith("tell me") ||
      lowerInput.startsWith("tell me about")
    ) {
      // Add placeholder response to memory
      const placeholder = `Searching for "${input}" in Wikipedia, Reddit, Internet... (Functionality placeholder)`;
      return placeholder;
    }

    // Fallback
    return "I couldn't find a better answer. Try rephrasing your question or ask about someone or something specific.";
  }
}
