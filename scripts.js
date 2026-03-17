// Elements
const passwordScreen = document.getElementById('password-screen');
const jarvisScreen = document.getElementById('jarvis-screen');
const passwordInput = document.getElementById('password-input');
const passwordSubmit = document.getElementById('password-submit');

const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const messages = document.getElementById('messages');

const micBtn = document.getElementById('mic-btn');
const imageBtn = document.getElementById('image-btn');
const memoryBtn = document.getElementById('memory-btn');
const generateBtn = document.getElementById('generate-btn');

// Password logic
passwordSubmit.addEventListener('click', () => {
  if(passwordInput.value === "7366062"){
    passwordScreen.classList.add('hidden');
    jarvisScreen.classList.remove('hidden');
    addMessage("Jarvis", "Hello Mamar Njie! Jarvis is online. How may I help you today?");
  } else {
    alert("Incorrect password");
  }
});

// Custom responses
const customResponses = {
  "hi": "Hello, Mamar Njie! How may I help you today?",
  "jarvis wake up daddy's home": "Oh, it's you, Mamar Njie, father. How may I help you today?",
  "who made you": "I was made by Mamar Njie.",
  "tell me about your maker": "Mama Njie is a 17-year-old who is living in Gambia."
};

// Add message function
function addMessage(sender, text){
  const msg = document.createElement('div');
  msg.innerHTML = `<b>${sender}:</b> ${text}`;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

// Process input
function processInput(){
  const text = userInput.value.trim();
  if(!text) return;

  addMessage("You", text);
  const lowerText = text.toLowerCase();

  // Custom response check
  if(customResponses[lowerText]){
    addMessage("Jarvis", customResponses[lowerText]);
  } else if(
      lowerText.startsWith("tell me") ||
      lowerText.startsWith("who is") ||
      lowerText.startsWith("tell me about")
  ){
    // Placeholder for internet/Wikipedia/Reddit search
    addMessage("Jarvis", `Searching for "${text}" in Wikipedia, Reddit, Internet...`);
  } else {
    addMessage("Jarvis", "I don't understand. Try 'who is' or 'tell me about' something.");
  }

  userInput.value = "";
}

// Send button
sendBtn.addEventListener('click', processInput);
userInput.addEventListener('keypress', e => {
  if(e.key === "Enter") processInput();
});

// Placeholder buttons
micBtn.addEventListener('click', () => addMessage("Jarvis","Voice input not implemented yet."));
imageBtn.addEventListener('click', () => addMessage("Jarvis","Image generation not implemented yet."));
memoryBtn.addEventListener('click', () => addMessage("Jarvis","Memory feature not implemented yet."));
generateBtn.addEventListener('click', () => addMessage("Jarvis","Code generation not implemented yet."));
