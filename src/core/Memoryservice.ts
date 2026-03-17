import fs from "fs";
import path from "path";

interface ChatMessage {
  sender: string;
  message: string;
  timestamp: string;
}

interface UserData {
  username?: string;
  [key: string]: any;
}

export class MemoryService {
  private chatHistoryFile: string;
  private userDataFile: string;
  private chatHistory: ChatMessage[] = [];
  private userData: UserData = {};

  constructor() {
    // Paths to your JSON files
    this.chatHistoryFile = path.join(__dirname, "../../memory/chatHistory.json");
    this.userDataFile = path.join(__dirname, "../../memory/userdata.json");

    this.loadMemory();
  }

  // Load chat history and user data from files
  private loadMemory() {
    try {
      if (fs.existsSync(this.chatHistoryFile)) {
        const data = fs.readFileSync(this.chatHistoryFile, "utf-8");
        this.chatHistory = JSON.parse(data) || [];
      }

      if (fs.existsSync(this.userDataFile)) {
        const data = fs.readFileSync(this.userDataFile, "utf-8");
        this.userData = JSON.parse(data) || {};
      }
    } catch (err) {
      console.error("Error loading memory:", err);
    }
  }

  // Save chat history to file
  private saveChatHistory() {
    try {
      fs.writeFileSync(this.chatHistoryFile, JSON.stringify(this.chatHistory, null, 2));
    } catch (err) {
      console.error("Error saving chat history:", err);
    }
  }

  // Save user data to file
  private saveUserData() {
    try {
      fs.writeFileSync(this.userDataFile, JSON.stringify(this.userData, null, 2));
    } catch (err) {
      console.error("Error saving user data:", err);
    }
  }

  // Add a message to chat history
  public addChatMessage(sender: string, message: string) {
    const chatMessage: ChatMessage = {
      sender,
      message,
      timestamp: new Date().toISOString(),
    };
    this.chatHistory.push(chatMessage);
    this.saveChatHistory();
  }

  // Retrieve full chat history
  public getChatHistory(): ChatMessage[] {
    return this.chatHistory;
  }

  // Get user data
  public getUserData(): UserData {
    return this.userData;
  }

  // Update user data
  public updateUserData(data: UserData) {
    this.userData = { ...this.userData, ...data };
    this.saveUserData();
  }

  // Optional: clear memory
  public clearMemory() {
    this.chatHistory = [];
    this.userData = {};
    this.saveChatHistory();
    this.saveUserData();
  }
}
