import { MemoryService } from './MemoryService';

export class LLMService {
  private memory: MemoryService;

  constructor(memoryService: MemoryService) {
    this.memory = memoryService;
  }

  /**
   * Mock function to simulate AI response.
   * In the future, you can connect this to real AI APIs.
   */
  public async getAnswer(query: string): Promise<string> {
    // Save the user query
    this.memory.addChatMessage("You", query);

    // For now, simulate searching the web/Wikipedia/Reddit
    let response = `Searching for "${query}" on Wikipedia, Reddit, and the Internet...`;

    // Save the AI response
    this.memory.addChatMessage("Jarvis", response);

    return response;
  }
}
