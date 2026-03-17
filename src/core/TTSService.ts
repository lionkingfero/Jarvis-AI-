export class TTSService {
  private synth: SpeechSynthesis;

  constructor() {
    this.synth = window.speechSynthesis;
  }

  // Speak text out loud
  public speak(text: string): void {
    if (!this.synth) {
      console.warn("Text-to-Speech not supported.");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    this.synth.speak(utterance);
  }

  // Stop speaking
  public stop(): void {
    if (this.synth.speaking) this.synth.cancel();
  }
}
