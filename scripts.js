// Password
const correctPassword = "7366062";
const overlay = document.getElementById('overlay');
const passwordInput = document.getElementById('passwordInput');
const passwordBtn = document.getElementById('passwordBtn');
const passwordError = document.getElementById('passwordError');
const jarvisContainer = document.getElementById('jarvisContainer');

passwordBtn.addEventListener('click', () => {
    if(passwordInput.value === correctPassword){
        overlay.classList.add('hidden');
        jarvisContainer.classList.remove('hidden');
        addMessage("Jarvis", "Hello Mamar Njie, Jarvis is online. How can I help you today?");
    } else {
        passwordError.textContent = "Incorrect password!";
    }
});

// Chat
const messages = document.getElementById('messages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

sendBtn.addEventListener('click', () => handleInput());
userInput.addEventListener('keypress', (e) => {
    if(e.key === "Enter") handleInput();
});

function handleInput(){
    const text = userInput.value.trim();
    if(!text) return;
    addMessage("You", text);
    userInput.value = "";

    // Custom responses
    if(text.toLowerCase().includes("who made you")){
        addMessage("Jarvis", "I was made by Mamar Njie.");
        return;
    }
    if(text.toLowerCase().includes("yo jarvis wake up daddy's home")){
        addMessage("Jarvis", "Oh, it's you, Mamar Njie. Father, how are you doing? How may I help you today?");
        return;
    }

    // Placeholder: internet/Wikipedia/Reddit/StackOverflow fetch
    addMessage("Jarvis", "Searching the internet... (Not implemented yet)");
}

// Helper to add messages
function addMessage(sender, text){
    const msg = document.createElement('div');
    msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
    msg.style.marginBottom = "8px";
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
}

// Buttons (mic, memory, code, image) - placeholder
document.getElementById('micBtn').addEventListener('click', ()=>{
    addMessage("Jarvis","Voice Chat not implemented yet");
});
document.getElementById('memoryBtn').addEventListener('click', ()=>{
    addMessage("Jarvis","View Memory not implemented yet");
});
document.getElementById('codeGenBtn').addEventListener('click', ()=>{
    addMessage("Jarvis","Code Generation not implemented yet");
});
document.getElementById('imageGenBtn').addEventListener('click', ()=>{
    addMessage("Jarvis","Image Generation not implemented yet");
});
