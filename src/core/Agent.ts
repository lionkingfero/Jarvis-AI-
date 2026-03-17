// agent.ts
// This is the main AI agent logic (brain controller)

import { MemoryService } from '../go/memory_service';

export class Agent {
    private memory: MemoryService;

    constructor() {
        this.memory = new MemoryService();
        console.log("Agent initialized");
    }

    async processInput(input: string): Promise<string> {
        console.log(`User input: ${input}`);

        // Save to memory
        this.memory.saveChat(input, "user");

        // Basic custom responses (you can expand this later)
        let response = this.generateResponse(input);

        // Save AI response
        this.memory.saveChat(response, "ai");

        return response;
    }

    generateResponse(input: string): string {
        const lower = input.toLowerCase();

        if (lower.includes("who made you")) {
            return "I was made by Mamar Njie.";
        }

        if (lower.includes("hello") || lower.includes("hi")) {
            return "Hello Mamar Njie! How may I help you today?";
        }

        if (lower.includes("jarvis wake up")) {
            return "Oh, it's you Mamar Njie, father. How may I help you today?";
        }

        // Placeholder for future search system
        return `Searching for ${input}...`;
    }
}
