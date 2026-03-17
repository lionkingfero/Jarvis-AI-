// ======== V6 Upgrade Scripts ========

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

// ======== PASSWORD LOGIC ========
function checkPassword(){
  if(passwordInput.value === "7366062"){
    passwordScreen.classList.add('hidden');
    jarvisScreen.classList.remove('hidden');
    addMessage("Jarvis", "Hello Mamar Njie! Jarvis is online. How may I help you today?");
  } else {
    alert("Incorrect password");
    passwordInput.value = "";
  }
}
passwordSubmit.addEventListener('click', checkPassword);
passwordInput.addEventListener('keypress', e => { if(e.key === "Enter") checkPassword(); });

// ======== MEMORY OBJECT ========
const memory = [];

// ======== CUSTOM RESPONSES ========
const customResponses = {
  "hi": "Hello, Mamar Njie! How may I help you today?",
  "jarvis wake up daddy's home": "Oh, it's you, Mamar Njie, father. How may I help you today?",
  "who made you": "I was made by Mamar Njie.",
  "tell me about your maker": "Mamar Njie is a 17-year-old living in Gambia."
};

// ======== ADD MESSAGE FUNCTION ========
function addMessage(sender, text){
  const msg = document.createElement('div');
  msg.innerHTML = `<b>${sender}:</b> ${text}`;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
  if(sender === "You") memory.push({sender, text}); // store memory
}

// ======== FETCH WIKIPEDIA ========
async function fetchWikipedia(query){
  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
    const response = await fetch(url);
    if(!response.ok) throw new Error("Page not found");
    const data = await response.json();
    return data.extract || "No summary found.";
  } catch(e) {
    return "Could not find a better answer.";
  }
}

// ======== PROCESS INPUT ========
async function processInput(){
  const text = userInput.value.trim();
  if(!text) return;
  addMessage("You", text);
  const lowerText = text.toLowerCase();

  // Custom responses first
  if(customResponses[lowerText]){
    addMessage("Jarvis", customResponses[lowerText]);
  }
  // Search triggers
  else if(lowerText.startsWith("tell me") || lowerText.startsWith("who is") || lowerText.startsWith("tell me about") || lowerText.startsWith("lookup")){
    addMessage("Jarvis", `Searching for "${text}" in Wikipedia, Reddit, Internet...`);
    const query = text.replace(/(tell me|who is|tell me about|lookup)/i,'').trim();
    if(query){
      const wikiResult = await fetchWikipedia(query);
      addMessage("Jarvis", wikiResult);
    }
  }
  else {
    addMessage("Jarvis", "I don't understand. Try 'who is', 'tell me about', or 'lookup X'.");
  }

  userInput.value = "";
}

// ======== SEND BUTTON ========
sendBtn.addEventListener('click', processInput);
userInput.addEventListener('keypress', e => { if(e.key === "Enter") processInput(); });

// ======== BUTTON PLACEHOLDER FUNCTIONS ========
micBtn.addEventListener('click', () => {
  if('webkitSpeechRecognition' in window){
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();
    recognition.onresult = e => {
      userInput.value = e.results[0][0].transcript;
      processInput();
    }
    recognition.onerror = e => addMessage("Jarvis","Voice recognition failed.");
  } else {
    addMessage("Jarvis","Voice input not supported in this browser.");
  }
});

imageBtn.addEventListener('click', () => addMessage("Jarvis","Image generation placeholder."));
memoryBtn.addEventListener('click', () => addMessage("Jarvis",`Memory size: ${memory.length} entries.`));
generateBtn.addEventListener('click', () => addMessage("Jarvis","Code generation placeholder."));
