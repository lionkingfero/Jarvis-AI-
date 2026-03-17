export class TTSService {
  private synth: SpeechSynthesis;

  constructor() {
    this.synth = window.speechSynthesis;
  }

  /**
   * Speak the text out loud
   * @param text Text to speak
   */
  public speak(text: string): void {
    if (!this.synth) {
      console.warn("Text-to-Speech not supported in this browser.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1; // speed of speech
    utterance.pitch = 1; // pitch of voice

    this.synth.speak(utterance);
  }

  /**
   * Stop any ongoing speech
   */
  public stop(): void {
    if (this.synth.speaking) {
      this.synth.cancel();
    }
  }
}
