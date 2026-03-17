// Get elements
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const messages = document.getElementById("messages");

const micBtn = document.getElementById("mic-btn");
const imageBtn = document.getElementById("image-btn");
const memoryBtn = document.getElementById("memory-btn");
const generateBtn = document.getElementById("generate-btn");

// Add message function using CSS classes
function addMessage(sender, text) {
  const div = document.createElement("div");
  div.classList.add("message");
  if (sender === "You") {
    div.classList.add("user");
    div.innerHTML = `<b>${sender}:</b> ${text}`;
  } else {
    div.classList.add("ai");
    div.innerHTML = `<b>${sender}:</b> ${text}`;
  }
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

// Process input
async function processInput() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage("You", text);

  try {
    // This assumes you have Agent class imported and initialized
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
