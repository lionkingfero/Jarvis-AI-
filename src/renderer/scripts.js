import { MemoryService } from "./core/MemoryService";
import { LLMService } from "./core/LLMService";
import { Agent } from "./core/Agent";
import { TTSService } from "./core/TTSService";

// Initialize services
const memory = new MemoryService();
const llm = new LLMService(memory);
const agent = new Agent(memory, llm);
const tts = new TTSService();

// Elements
const userInput = document.getElementById("user-input") as HTMLInputElement;
const sendBtn = document.getElementById("send-btn") as HTMLButtonElement;
const messages = document.getElementById("messages") as HTMLDivElement;

const micBtn = document.getElementById("mic-btn") as HTMLButtonElement;
const imageBtn = document.getElementById("image-btn") as HTMLButtonElement;
const memoryBtn = document.getElementById("memory-btn") as HTMLButtonElement;
const generateBtn = document.getElementById("generate-btn") as HTMLButtonElement;

// Add message to chat window
function addMessage(sender: "You" | "Jarvis", text: string) {
  const div = document.createElement("div");
  div.classList.add("message", sender === "You" ? "user" : "ai");
  div.innerHTML = `<b>${sender}:</b> ${text}`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;

  // Jarvis speaks if it's him
  if (sender === "Jarvis") {
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
    addMessage("Jarvis", "Oops! Something went wrong while processing your request.");
  }

  userInput.value = "";
}

// Event listeners
sendBtn.addEventListener("click", processInput);
userInput.addEventListener("keypress", e => {
  if (e.key === "Enter") processInput();
});

// Placeholder buttons
micBtn.addEventListener("click", () => addMessage("Jarvis", "Voice input not implemented yet."));
imageBtn.addEventListener("click", () => addMessage("Jarvis", "Image generation not implemented yet."));
memoryBtn.addEventListener("click", () => addMessage("Jarvis", "Memory feature not implemented yet."));
generateBtn.addEventListener("click", () => addMessage("Jarvis", "Code generation not implemented yet."));
