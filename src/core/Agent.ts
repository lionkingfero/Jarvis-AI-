import { MemoryService } from "../core/MemoryService";
import { TTSService } from "../core/TTSService";

export class Agent {
  private memory: MemoryService;
  private tts: TTSService;

  // Define custom responses
  private customResponses: Record<string, string> = {
    "hi": "Hello, Mamar Njie! How may I help you today?",
    "jarvis wake up daddy's home": "Oh, it's you, Mamar Njie, father. How may I help you today?",
    "who made you": "I was made by Mamar Njie.",
    "tell me about your maker": "Mama Njie is a 17-year-old who is living in Gambia."
  };

  constructor(memoryService: MemoryService, ttsService: TTSService) {
    this.memory = memoryService;
    this.tts = ttsService;
  }

  // Main method to process user input
  public async processInput(input: string): Promise<string> {
    const text = input.trim();
    if (!text) return "";

    // Save user message in memory
    this.memory.addChatMessage("User", text);

    const lowerText = text.toLowerCase();

    // Check for custom responses
    if (this.customResponses[lowerText]) {
      const reply = this.customResponses[lowerText];
      this.memory.addChatMessage("Jarvis", reply);
      this.tts.speak(reply);
      return reply;
    }

    // Handle search-like commands
    if (
      lowerText.startsWith("tell me") ||
      lowerText.startsWith("who is") ||
      lowerText.startsWith("tell me about")
    ) {
      const reply = `Searching for "${text}" in Wikipedia, Reddit, Internet...`;
      this.memory.addChatMessage("Jarvis", reply);
      this.tts.speak(reply);
      return reply;
    }

    // Default fallback
    const defaultReply = "I don't understand. Try 'who is' or 'tell me about' something.";
    this.memory.addChatMessage("Jarvis", defaultReply);
    this.tts.speak(defaultReply);
    return defaultReply;
  }

  // Optional: get full chat history
  public getChatHistory() {
    return this.memory.getChatHistory();
  }
}
