import { MemoryService } from "./MemoryService";
import { LLMService } from "./LLMService";

export class Agent {
  private memory: MemoryService;
  private llm: LLMService;

  constructor(memoryService: MemoryService, llmService: LLMService) {
    this.memory = memoryService;
    this.llm = llmService;
  }

  // Process user input and decide action
  public async processInput(input: string): Promise<string> {
    const lowerInput = input.toLowerCase().trim();

    // Check for custom commands
    if (lowerInput === "hi") return "Hello, Mamar Njie! How may I help you today?";
    if (lowerInput === "jarvis wake up daddy's home") return "Oh, it's you, Mamar Njie, father. How may I help you today?";
    if (lowerInput === "who made you") return "I was made by Mamar Njie.";
    if (lowerInput === "tell me about your maker") return "Mama Njie is a 17-year-old who is living in Gambia.";

    // Check for knowledge requests
    if (
      lowerInput.startsWith("who is") ||
      lowerInput.startsWith("tell me") ||
      lowerInput.startsWith("tell me about")
    ) {
      this.memory.addChatMessage("You", input);
      const response = await this.llm.query(lowerInput);
      this.memory.addChatMessage("Jarvis", response);
      return response;
    }

    // Default fallback
    this.memory.addChatMessage("You", input);
    return "I don't understand. Try 'who is' or 'tell me about' something.";
  }
}
