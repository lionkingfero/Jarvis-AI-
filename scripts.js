// PASSWORD
const passwordScreen = document.getElementById("password-screen");
const passwordInput = document.getElementById("password-input");
const passwordBtn = document.getElementById("password-btn");
const jarvisScreen = document.getElementById("jarvis-screen");

passwordBtn.addEventListener("click", () => {
  if(passwordInput.value === "7366062"){
    passwordScreen.classList.add("hidden");
    jarvisScreen.classList.remove("hidden");
    jarvisReply("Hello Mamar Njie, Jarvis is online. How can I help you today?");
  } else {
    alert("Incorrect password!");
  }
});

// MESSAGES
const messagesDiv = document.getElementById("messages");

function jarvisReply(text){
  const div = document.createElement("div");
  div.className = "message";
  div.innerText = text;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// SEND MESSAGE
function sendMessage(){
  const input = document.getElementById("input");
  const text = input.value;
  if(!text) return;
  const div = document.createElement("div");
  div.className = "message";
  div.innerText = "You: " + text;
  messagesDiv.appendChild(div);
  input.value = "";

  // CUSTOM RESPONSES
  const lower = text.toLowerCase();

  if(lower.includes("who made you")){
    jarvisReply("I was created by Mamar Njie.");
    return;
  }

  if(lower.includes("wake up")){
    jarvisReply("Oh, it's you Mamar Njie, my creator. How are you doing? How may I help you today?");
    return;
  }

  if(lower.includes("hi")){
    jarvisReply("Hello Mamar Njie! How may I help you today?");
    return;
  }

  // SEARCH PLACEHOLDER
  jarvisReply(`Searching Wikipedia & Internet for "${text}"... Functionality placeholder.`);
}

// MEMORY
let memory = [];

function remember(){
  const input = document.getElementById("input").value;
  if(input){
    memory.push(input);
    jarvisReply("I will remember that.");
  }
}

// IMAGE PLACEHOLDER
function generateImage(){
  const input = document.getElementById("input").value;
  if(input){
    jarvisReply("Generating image for: " + input + " (Functionality placeholder)");
  }
}

// CODE GENERATOR PLACEHOLDER
function generateCode(){
  const input = document.getElementById("input").value;
  if(input){
    jarvisReply("Generating code for: " + input + " (Functionality placeholder)");
  }
}

// VOICE
function startListening(){
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";

  recognition.onresult = function(event){
    let text = event.results[0][0].transcript;
    document.getElementById("input").value = text;
    sendMessage();
  }

  recognition.start();
}
