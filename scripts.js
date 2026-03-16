// -----------------------------
// Jarvis AI V4 - scripts.js
// -----------------------------

// Password setup
const passwordOverlay = document.getElementById('passwordOverlay');
const passwordInput = document.getElementById('passwordInput');
const passwordSubmit = document.getElementById('passwordSubmit');
const passwordError = document.getElementById('passwordError');

const aiInterface = document.getElementById('aiInterface');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const voiceBtn = document.getElementById('voiceBtn');
const generateCodeBtn = document.getElementById('generateCodeBtn');
const generateImageBtn = document.getElementById('generateImageBtn');
const memoryBtn = document.getElementById('memoryBtn');
const messages = document.getElementById('messages');

const PASSWORD = "7366062";

// -----------------------------
// Password Check
// -----------------------------
passwordSubmit.addEventListener('click', () => {
    if (passwordInput.value === PASSWORD) {
        passwordOverlay.style.display = 'none';
        aiInterface.classList.remove('hidden');
        addAIMessage("Hello MAMAR NJIE! Jarvis is online. How can I help you today?");
    } else {
        passwordError.textContent = "Wrong password! Try again.";
    }
});

// -----------------------------
// Utility: Add Messages
// -----------------------------
function addUserMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'message user';
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
}

function addAIMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'message ai';
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
}

// -----------------------------
// Custom Responses
// -----------------------------
const customResponses = {
    "who made you": "I was made by MAMAR NJIE.",
    "yo jarvis wake up daddy's home": "Oh, it's you, MAMAR NJIE. Father, how are you doing? How may I help you today, Father?"
};

// -----------------------------
// Button Click Functions
// -----------------------------
sendBtn.addEventListener('click', () => {
    handleInput(userInput.value);
    userInput.value = '';
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleInput(userInput.value);
        userInput.value = '';
    }
});

// -----------------------------
// Voice Chat Button
// -----------------------------
voiceBtn.addEventListener('click', () => {
    addAIMessage("Voice chat not implemented yet.");
    // Placeholder for real voice input integration
});

// -----------------------------
// Generate Code Button
// -----------------------------
generateCodeBtn.addEventListener('click', () => {
    const codePrompt = prompt("Enter the type of code you want Jarvis to generate:");
    if (codePrompt) {
        addAIMessage(`Generating code for: ${codePrompt}...`);
        // Placeholder for AI code generation logic
    }
});

// -----------------------------
// Generate Image Button
// -----------------------------
generateImageBtn.addEventListener('click', () => {
    const imagePrompt = prompt("Enter what kind of image you want Jarvis to generate:");
    if (imagePrompt) {
        addAIMessage(`Generating image for: ${imagePrompt}...`);
        // Placeholder for AI image generation logic
    }
});

// -----------------------------
// Memory Button
// -----------------------------
memoryBtn.addEventListener('click', () => {
    const memory = JSON.parse(localStorage.getItem('jarvisMemory') || '[]');
    alert("Jarvis Memory:\n\n" + (memory.join("\n") || "No memory yet."));
});

// -----------------------------
// Main Input Handler
// -----------------------------
function handleInput(input) {
    if (!input) return;
    addUserMessage(input);

    const lowerInput = input.toLowerCase();

    // Check custom responses
    for (const key in customResponses) {
        if (lowerInput.includes(key)) {
            addAIMessage(customResponses[key]);
            saveMemory(`User: ${input}`);
            saveMemory(`Jarvis: ${customResponses[key]}`);
            return;
        }
    }

    // Fallback: Wikipedia / Internet search
    addAIMessage(`Searching Wikipedia/Internet for: "${input}"...`);
    // Placeholder for fetch Wikipedia & internet
    // Example: call your own API or fetch logic here

    saveMemory(`User: ${input}`);
    saveMemory(`Jarvis: Could not find "${input}" online yet.`);
}

// -----------------------------
// Memory Storage
// -----------------------------
function saveMemory(text) {
    let memory = JSON.parse(localStorage.getItem('jarvisMemory') || '[]');
    memory.push(text);
    localStorage.setItem('jarvisMemory', JSON.stringify(memory));
                           }
