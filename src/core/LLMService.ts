import { MemoryService } from "./MemoryService";

export class LLMService {
  private memory: MemoryService;

  constructor(memoryService: MemoryService) {
    this.memory = memoryService;
  }

  /**
   * Generate a response for the user input.
   * Currently uses placeholder logic but ready for AI/Web API integration.
   */
  public async generateResponse(input: string): Promise<string> {
    const text = input.trim();
    if (!text) return "";

    // Save user message in memory
    this.memory.addChatMessage("User", text);

    const lowerText = text.toLowerCase();

    // Custom commands handled here (optional redundancy with Agent)
    if (lowerText.includes("who made you")) {
      const reply = "I was made by Mamar Njie.";
      this.memory.addChatMessage("Jarvis", reply);
      return reply;
    }

    // Handle general search commands
    if (
      lowerText.startsWith("tell me") ||
      lowerText.startsWith("who is") ||
      lowerText.startsWith("tell me about")
    ) {
      // Placeholder for future AI/Web search
      const reply = `Searching for "${text}" in Wikipedia, Reddit, Internet...`;
      this.memory.addChatMessage("Jarvis", reply);
      return reply;
    }

    // Default fallback
    const defaultReply = "I don't understand. Try asking 'who is' or 'tell me about' something.";
    this.memory.addChatMessage("Jarvis", defaultReply);
    return defaultReply;
  }

  /**
   * Optional: retrieve past chat history
   */
  public getChatHistory() {
    return this.memory.getChatHistory();
  }
}
