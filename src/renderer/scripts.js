// Import your core services (TypeScript compiled to JS)
import { MemoryService } from "./core/MemoryService";
import { LLMService } from "./core/LLMService";
import { Agent } from "./core/Agent";
import { TTSService } from "./core/TTSService";

// Initialize core services
const memory = new MemoryService();
const llm = new LLMService(memory);
const agent = new Agent(memory, llm);
const tts = new TTSService();

// DOM elements
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const messages = document.getElementById("messages");
const micBtn = document.getElementById("mic-btn");
const imageBtn = document.getElementById("image-btn");
const memoryBtn = document.getElementById("memory-btn");
const generateBtn = document.getElementById("generate-btn");

// Helper: add message to chat
function addMessage(sender, text) {
    const msg = document.createElement("div");
    msg.className = `message ${sender.toLowerCase()}`;
    msg.innerHTML = `<b>${sender}:</b> ${text}`;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;

    // Automatically speak Jarvis responses
    if(sender.toLowerCase() === "jarvis") {
        tts.speak(text);
    }
}

// Process user input
async function processInput() {
    const text = userInput.value.trim();
    if (!text) return;

    addMessage("You", text);

    try {
        const response = await agent.processInput(text);
        addMessage("Jarvis", response);
    } catch (err) {
        console.error(err);
        addMessage("Jarvis", "Oops! Something went wrong.");
    }

    userInput.value = "";
}

// Event listeners
sendBtn.addEventListener("click", processInput);
userInput.addEventListener("keypress", e => {
    if(e.key === "Enter") processInput();
});

// Mic button: stop TTS
micBtn.addEventListener("click", () => {
    tts.stop();
    addMessage("Jarvis", "Stopped speaking.");
});

// Memory button: show chat history
memoryBtn.addEventListener("click", () => {
    const history = memory.getChatHistory();
    if(history.length === 0) {
        addMessage("Jarvis", "Memory is empty.");
        return;
    }

    history.forEach(msg => addMessage(msg.sender, msg.message));
});

// Image button placeholder
imageBtn.addEventListener("click", () => {
    addMessage("Jarvis", "Image generation not implemented yet.");
});

// Generate button placeholder
generateBtn.addEventListener("click", () => {
    addMessage("Jarvis", "Code generation not implemented yet.");
});
