// TTSService.ts
// Handles Text-To-Speech (voice output)

export class TTSService {
    constructor() {
        console.log("TTSService initialized");
    }

    speak(text: string) {
        console.log(`Speaking: ${text}`);

        // Browser-based TTS (works later when connected to frontend)
        if (typeof window !== "undefined" && 'speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "en-US";
            speechSynthesis.speak(utterance);
        } else {
            // Fallback (for environments without speech support)
            console.log("TTS not supported in this environment");
        }
    }
}
