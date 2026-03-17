// main.ts
// Entry point of your AI application

import { Agent } from '../core/agent';
import { TTSService } from '../core/TTSService';

const agent = new Agent();
const tts = new TTSService();

// Simulated input (for now)
async function start() {
    console.log("Jarvis AI starting...");

    const userInput = "Hello Jarvis";

    const response = await agent.processInput(userInput);

    console.log("AI:", response);

    // Speak the response
    tts.speak(response);
}

start();
