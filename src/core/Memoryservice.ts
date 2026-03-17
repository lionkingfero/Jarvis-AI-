import fs from 'fs';
import path from 'path';

interface ChatMessage {
  sender: string;
  message: string;
  timestamp: string;
}

interface UserData {
  [key: string]: any;
}

export class MemoryService {
  private chatFile = path.join(__dirname, '../../memory/chatHistory.json');
  private userFile = path.join(__dirname, '../../memory/userData.json');

  constructor() {
    // Ensure files exist
    if (!fs.existsSync(this.chatFile)) fs.writeFileSync(this.chatFile, JSON.stringify([]));
    if (!fs.existsSync(this.userFile)) fs.writeFileSync(this.userFile, JSON.stringify({}));
  }

  // Chat memory
  getChatHistory(): ChatMessage[] {
    const data = fs.readFileSync(this.chatFile, 'utf-8');
    return JSON.parse(data);
  }

  addChatMessage(sender: string, message: string) {
    const chats = this.getChatHistory();
    chats.push({ sender, message, timestamp: new Date().toISOString() });
    fs.writeFileSync(this.chatFile, JSON.stringify(chats, null, 2));
  }

  // User data memory
  getUserData(): UserData {
    const data = fs.readFileSync(this.userFile, 'utf-8');
    return JSON.parse(data);
  }

  updateUserData(key: string, value: any) {
    const userData = this.getUserData();
    userData[key] = value;
    fs.writeFileSync(this.userFile, JSON.stringify(userData, null, 2));
  }
}
