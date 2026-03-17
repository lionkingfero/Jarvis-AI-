import fs from 'fs';
import path from 'path';

export interface ChatMessage {
  sender: string;
  message: string;
  timestamp: string;
}

export class MemoryService {
  private chatHistoryPath: string;
  private userDataPath: string;
  private chatHistory: ChatMessage[] = [];
  private userData: Record<string, any> = {};

  constructor(memoryFolder: string) {
    // Set file paths
    this.chatHistoryPath = path.join(memoryFolder, 'chatHistory.json');
    this.userDataPath = path.join(memoryFolder, 'userData.json');

    // Load existing files if they exist
    this.loadChatHistory();
    this.loadUserData();
  }

  // --- Chat History Methods ---
  private loadChatHistory() {
    if (fs.existsSync(this.chatHistoryPath)) {
      const data = fs.readFileSync(this.chatHistoryPath, 'utf8');
      try {
        this.chatHistory = JSON.parse(data);
      } catch {
        this.chatHistory = [];
      }
    } else {
      this.chatHistory = [];
    }
  }

  private saveChatHistory() {
    fs.writeFileSync(this.chatHistoryPath, JSON.stringify(this.chatHistory, null, 2));
  }

  public addChatMessage(sender: string, message: string) {
    const chatMsg: ChatMessage = {
      sender,
      message,
      timestamp: new Date().toISOString(),
    };
    this.chatHistory.push(chatMsg);
    this.saveChatHistory();
  }

  public getChatHistory(): ChatMessage[] {
    return this.chatHistory;
  }

  // --- User Data Methods ---
  private loadUserData() {
    if (fs.existsSync(this.userDataPath)) {
      const data = fs.readFileSync(this.userDataPath, 'utf8');
      try {
        this.userData = JSON.parse(data);
      } catch {
        this.userData = {};
      }
    } else {
      this.userData = {};
    }
  }

  private saveUserData() {
    fs.writeFileSync(this.userDataPath, JSON.stringify(this.userData, null, 2));
  }

  public setUserData(key: string, value: any) {
    this.userData[key] = value;
    this.saveUserData();
  }

  public getUserData(key: string) {
    return this.userData[key];
  }
}
