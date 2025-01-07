import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../Services/chat.service';
import { User } from '../../Classes/user';
import { Chat } from '../../Classes/chat';
import { Message } from '../../Classes/message';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class HomeComponent implements OnInit {
  email: string | null = null;
  user: User | null = null;
  chats: Chat[] = [];
  messages: Message[] = [];
  selectedChatId: string | null = null;
  prompt: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      const password = params['password'];
      const username = params['username'];
      const id = params['id'];

      if (email && password) {
        this.user = new User(email, password);
        this.user.setUsername(username || '');
        this.user.setId(id || '');
      } else {
        this.router.navigate(['/login']);
      }
    });
    console.log('User in Home:', this.user);

    if (this.user) {
      this.loadChats(this.user.getId()!);
    }
  }

  loadChats(userId: number) {
    this.chatService.getAllChats(userId).subscribe({
      next: (chats: Chat[]) => {
        this.chats = chats;
        if (this.chats.length === 0) {
          this.createNewChat();
        }
      },
      error: (error) => {
        if (error.status === 204) {
          this.createNewChat();
        } else {
          // Handle other errors
          console.error('Error fetching chats:', error);
        }
      }
    });
  }
  logout() {
    // Clear user data and navigate to login page
    this.user = null;
    this.router.navigate(['/login']);
  }
  createNewChat() {
    if (this.user) {
      this.chatService.createNewChat(this.user.getId()!).subscribe((chat: Chat) => {
        this.chats.push(chat);
      });
    }
  }

  loadMessages(chatId: string) {
    this.selectedChatId = chatId;
    this.messages = []; // Clear the messages array before loading new messages
    this.chatService.getMessages(chatId).subscribe((messages: Message[]) => {
      this.messages = messages;
    });
  }

  submitPrompt() {
    if (this.prompt.trim() !== '' && this.selectedChatId) {
      const userMessage = new Message(
        Date.now().toString(),
        this.selectedChatId, // Send the message to the selected chat
        'user',
        this.prompt,
        Date.now()
      );
      this.messages.push(userMessage);

      this.chatService.sendMessage(this.selectedChatId, this.prompt).subscribe((message: Message) => {
        this.messages.push(message);
        this.prompt = '';
      });
    }
  }

  updateChat(chatId: string) {
    const chat = this.findChatById(chatId);
    const newTitle = prompt('Enter new title:', chat.title);
    if (newTitle && newTitle !== chat.title) {
      console.log(`Updating chat ${chatId} with new title: ${newTitle}`);
      this.chatService.updateChat(chatId, newTitle).subscribe({
        next: (updatedChat: Chat) => {
          console.log(`Chat ${chatId} updated successfully with title: ${updatedChat.title}`);
          const chatIndex = this.chats.findIndex(chat => chat.id === chatId);
          if (chatIndex !== -1) {
            this.chats[chatIndex].title = updatedChat.title;
          }
        },
        error: (error) => {
          console.error(`Error updating chat ${chatId}:`, error);
        }
      });
    }
  }

  deleteChat(chatId: string) {
    if (confirm('Are you sure you want to delete this chat?')) {
      this.chatService.deleteChat(chatId).subscribe(() => {
        this.chats = this.chats.filter(chat => chat.id !== chatId);
        if (this.selectedChatId === chatId) {
          this.messages = []; // Clear messages if the selected chat is deleted
          this.selectedChatId = null;
        }
      });
    }
  }

  private findChatById(chatId: string): Chat {
    return this.chats.find(chat => chat.id === chatId)!; 
  }
}