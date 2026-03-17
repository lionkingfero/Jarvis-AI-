// Password
const passwordOverlay = document.getElementById("passwordOverlay");
const passwordInput = document.getElementById("passwordInput");
const passwordBtn = document.getElementById("passwordBtn");
const passwordError = document.getElementById("passwordError");
const jarvisContainer = document.getElementById("jarvisContainer");

const correctPassword = "7366062";

passwordBtn.addEventListener("click", () => {
    if(passwordInput.value === correctPassword){
        passwordOverlay.style.display = "none";
        jarvisContainer.style.display = "flex";
        addMessage("Jarvis", "Hello Mamar Njie, Jarvis is online. How can I help you today?");
    } else {
        passwordError.textContent = "Incorrect password!";
    }
});

// Messages
const messages = document.getElementById("messages");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

function addMessage(sender, text){
    const msg = document.createElement("div");
    msg.className = "message";
    msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
}

// Handle input
sendBtn.addEventListener("click", handleInput);
userInput.addEventListener("keypress", (e)=>{ if(e.key==="Enter") handleInput(); });

function handleInput(){
    const text = userInput.value.trim();
    if(!text) return;
    addMessage("You", text);
    userInput.value = "";

    // Custom responses
    if(text.toLowerCase() === "hi"){
        addMessage("Jarvis","Hello, how can I help you?");
        return;
    }
    if(text.toLowerCase() === "yo jarvis wake up daddy's home"){
        addMessage("Jarvis","Oh, it's you, Mamar Njie. Father, how are you doing? How may I help you today?");
        return;
    }
    if(text.toLowerCase().includes("who made you")){
        addMessage("Jarvis","I was made by Mamar Njie.");
        return;
    }

    // Wikipedia search
    searchWikipedia(text);
}

// Wikipedia Search
function searchWikipedia(query){
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
        if(data.extract){
            addMessage("Jarvis", data.extract);
        } else {
            addMessage("Jarvis", "I couldn't find it on Wikipedia.");
        }
    }).catch(err=>{
        addMessage("Jarvis", "Error searching Wikipedia.");
    });
}

// Placeholders for Reddit / general internet search
const redditBtn = document.getElementById("memoryBtn");
redditBtn.addEventListener("click", ()=>{
    addMessage("Jarvis","Reddit search feature not implemented yet.");
});

const codeBtn = document.getElementById("codeBtn");
codeBtn.addEventListener("click", ()=>{
    addMessage("Jarvis","Code generation feature not implemented yet.");
});

const imageBtn = document.getElementById("imageBtn");
imageBtn.addEventListener("click", ()=>{
    addMessage("Jarvis","Image generation feature not implemented yet.");
});

const voiceBtn = document.getElementById("voiceBtn");
voiceBtn.addEventListener("click", ()=>{
    addMessage("Jarvis","Voice feature not implemented yet.");
});
