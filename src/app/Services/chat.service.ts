import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Chat } from '../Classes/chat';
import { Message } from '../Classes/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl: string = 'http://localhost:8080/api/chat';

  constructor(private http: HttpClient) { }

  createNewChat(userId: number): Observable<Chat> {
    return this.http.post<Chat>(this.baseUrl + "/new/" + userId, { title: 'New Chat' });
  }

  getAllChats(userId: number): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.baseUrl + "/" + userId);
  }

  sendMessage(chatId: string, prompt: string): Observable<Message> {
    return this.http.post<Message>(this.baseUrl + "/" + chatId + "/message", { prompt });
  }

  getMessages(chatId: string): Observable<Message[]> {
    return this.http.get<Message[]>(this.baseUrl + "/" + chatId + "/message");
  }

  deleteChat(chatId: string): Observable<any> {
    return this.http.delete(this.baseUrl + "/" + chatId);
  }

  updateChat(chatId: string, title: string): Observable<Chat> {
    return this.http.put<Chat>(this.baseUrl + "/update/" + chatId, { title });
  }
}