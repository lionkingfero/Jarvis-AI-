// agent.ts
// Main AI agent controller

import { MemoryService } from './memoryservice';
import { LLMService } from './LLMService';

export class Agent {
    private memory: MemoryService;
    private llm: LLMService;

    constructor() {
        this.memory = new MemoryService();
        this.llm = new LLMService();
        console.log("Agent initialized");
    }

    async processInput(input: string): Promise<string> {
        console.log(`User input: ${input}`);

        // Save user message
        this.memory.saveChat(input, "user");

        // Generate response using LLM
        const response = await this.llm.generateResponse(input);

        // Save AI response
        this.memory.saveChat(response, "ai");

        return response;
    }
}
