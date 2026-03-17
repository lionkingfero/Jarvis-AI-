// Password protection
const passwordScreen = document.getElementById("password-screen");
const jarvisContainer = document.getElementById("jarvis-container");
const passwordInput = document.getElementById("password-input");
const passwordSubmit = document.getElementById("password-submit");
const passwordError = document.getElementById("password-error");
const PASSWORD = "7366062";

passwordSubmit.addEventListener("click", () => {
  if(passwordInput.value === PASSWORD){
    passwordScreen.classList.add("hidden");
    jarvisContainer.classList.remove("hidden");
    addJarvisMessage("Hello Mamar Njie, Jarvis is online. How can I help you today?");
  } else {
    passwordError.textContent = "Wrong password, try again.";
  }
});

// Elements
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const messagesDiv = document.getElementById("messages");

// Custom responses
const customResponses = {
  "hi": "Hello! How can I help you today?",
  "yo jarvis wake up daddy's home": "Oh, it's you, Mamar Njie. Father, how are you doing? How may I assist you today?",
  "who made you": "I was made by Mamar Njie."
};

// Helper: add message
function addMessage(text, sender){
  const div = document.createElement("div");
  div.className = "message " + sender;
  div.textContent = text;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Add Jarvis message
function addJarvisMessage(text){
  addMessage(text, "jarvis-msg");
}

// Add user message
function addUserMessage(text){
  addMessage(text, "user-msg");
}

// Process input
function processInput(input){
  const text = input.toLowerCase().trim();

  // Custom response
  if(customResponses[text]){
    addJarvisMessage(customResponses[text]);
    return;
  }

  // Extract main keyword for Wikipedia
  let keyword = text.replace(/(who is |tell me about |what is |please )/gi, "").trim();

  if(keyword.length === 0){
    addJarvisMessage("I couldn't understand. Can you rephrase?");
    return;
  }

  // Wikipedia fetch
  fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(keyword)}`)
    .then(res => res.json())
    .then(data => {
      if(data.extract){
        addJarvisMessage(data.extract);
      } else {
        addJarvisMessage(`I couldn't find information about "${keyword}".`);
      }
    })
    .catch(() => {
      addJarvisMessage("Error fetching information.");
    });
}

// Send message
sendBtn.addEventListener("click", () => {
  const text = userInput.value;
  if(text === "") return;
  addUserMessage(text);
  processInput(text);
  userInput.value = "";
});

userInput.addEventListener("keypress", (e) => {
  if(e.key === "Enter") sendBtn.click();
});

// Buttons placeholders
document.getElementById("voice-btn").addEventListener("click", () => {
  addJarvisMessage("Voice chat not implemented yet.");
});
document.getElementById("memory-btn").addEventListener("click", () => {
  addJarvisMessage("Memory view not implemented yet.");
});
document.getElementById("code-btn").addEventListener("click", () => {
  addJarvisMessage("Code generation not implemented yet.");
});
document.getElementById("image-btn").addEventListener("click", () => {
  addJarvisMessage("Image generation not implemented yet.");
});
