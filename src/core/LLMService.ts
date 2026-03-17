// LLMService.ts
// Handles AI thinking / responses (LLM = Large Language Model)

export class LLMService {
    constructor() {
        console.log("LLMService initialized");
    }

    async generateResponse(input: string): Promise<string> {
        console.log(`LLM processing: ${input}`);

        const lower = input.toLowerCase();

        // Custom responses
        if (lower.includes("who made you")) {
            return "I was made by Mamar Njie.";
        }

        if (lower.includes("hello") || lower.includes("hi")) {
            return "Hello Mamar Njie! How may I help you today?";
        }

        if (lower.includes("jarvis wake up")) {
            return "Oh, it's you Mamar Njie, father. How may I help you today?";
        }

        if (lower.includes("who is spiderman")) {
            return "Spider-Man is a fictional superhero created by Marvel.";
        }

        if (lower.includes("who made marvel")) {
            return "Marvel was created by Stan Lee and others.";
        }

        // Default behavior (search style like you wanted)
        return `Searching for ${input}...`;
    }
}
