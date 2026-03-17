// memoryservice.ts
// Handles saving and loading memory (chat history + user data)

export class MemoryService {
    private chatHistory: any[] = [];

    constructor() {
        console.log("MemoryService initialized");
        this.loadMemory();
    }

    // Save chat messages
    saveChat(message: string, sender: "user" | "ai") {
        const chatEntry = {
            sender: sender,
            message: message,
            timestamp: new Date().toISOString()
        };

        this.chatHistory.push(chatEntry);

        console.log("Chat saved:", chatEntry);

        // In real app, this would write to memory/chatHistory.json
    }

    // Load existing memory (placeholder for now)
    loadMemory() {
        console.log("Loading memory...");
        // Later we connect this to actual JSON files
    }

    // Get all chat history
    getChatHistory() {
        return this.chatHistory;
    }

    // Save user data (name, preferences, etc.)
    saveUserData(data: any) {
        console.log("Saving user data:", data);
        // Later this will connect to memory/persistent/userData.json
    }

    // Load user data
    getUserData() {
        console.log("Getting user data...");
        return {};
    }
}
