// Password Logic
const passwordScreen = document.getElementById("password-screen");
const jarvisContainer = document.getElementById("jarvis-container");
const passwordInput = document.getElementById("password-input");
const passwordSubmit = document.getElementById("password-submit");
const passwordError = document.getElementById("password-error");
const PASSWORD = "7366062";

// Chat Elements
const messages = document.getElementById("messages");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const voiceButton = document.getElementById("voice-button");
const memoryButton = document.getElementById("memory-button");
const imageButton = document.getElementById("image-button");
const codeButton = document.getElementById("code-button");

// Local Memory Storage
let memory = JSON.parse(localStorage.getItem("jarvisMemory")) || [];

// Custom Responses
const customResponses = {
  "hi": "Hello, how can I help you today?",
  "yo jarvis wake up daddy's home": "Oh, it's you, Mamar Njie. Father, how are you doing? How may I help you today?",
  "who made you": "I was made by Mamar Njie."
};

// Password Event
passwordSubmit.addEventListener("click", () => {
  if(passwordInput.value === PASSWORD){
    passwordScreen.classList.add("hidden");
    jarvisContainer.classList.remove("hidden");
    addJarvisMessage("Hello Mamar Njie, Jarvis is online. How can I help you today?");
  } else {
    passwordError.textContent = "Wrong password, try again.";
  }
});

// Send Message Function
function addUserMessage(text){
  memory.push({type:"user", text});
  localStorage.setItem("jarvisMemory", JSON.stringify(memory));
  const msg = document.createElement("div");
  msg.classList.add("message", "user");
  msg.textContent = text;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

// Jarvis Reply Function
function addJarvisMessage(text){
  memory.push({type:"jarvis", text});
  localStorage.setItem("jarvisMemory", JSON.stringify(memory));
  const msg = document.createElement("div");
  msg.classList.add("message", "jarvis");
  msg.textContent = text;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

// Process Input
function processInput(text){
  text = text.toLowerCase();
  if(customResponses[text]){
    addJarvisMessage(customResponses[text]);
  } else {
    addJarvisMessage(`Searching Wikipedia/Internet for "${text}"... (functionality placeholder)`);
  }
}

// Event Listeners
sendButton.addEventListener("click", () => {
  const text = userInput.value.trim();
  if(text === "") return;
  addUserMessage(text);
  processInput(text);
  userInput.value = "";
});
userInput.addEventListener("keypress", (e) => {
  if(e.key === "Enter") sendButton.click();
});

// Placeholder Button Functions
voiceButton.addEventListener("click", () => alert("Voice feature not implemented yet"));
memoryButton.addEventListener("click", () => alert("Memory feature not implemented yet"));
imageButton.addEventListener("click", () => alert("Image feature not implemented yet"));
codeButton.addEventListener("click", () => alert("Code generation not implemented yet"));

// Load previous memory
memory.forEach(m => {
  if(m.type === "user") addUserMessage(m.text);
  else addJarvisMessage(m.text);
});
