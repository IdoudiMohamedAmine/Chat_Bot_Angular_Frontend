export class Message {
    id: string;
    chatId: string;
    sender: string;
    content: string;
    timestamp: number;
  
    constructor(id: string, chatId: string, sender: string, content: string, timestamp: number) {
      this.id = id;
      this.chatId = chatId;
      this.sender = sender;
      this.content = content;
      this.timestamp = timestamp;
    }
  }