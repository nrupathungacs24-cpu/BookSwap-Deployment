import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, timer } from 'rxjs';
import { switchMap, tap, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface Chat {
    id: string;
    participants: string[];
    bookId: string;
    bookTitle: string;
    lastMessage: string;
    lastMessageTime: string;
    updatedAt: string;
    otherParticipantName?: string;
    otherParticipantAvatar?: string;
}

export interface Message {
    id: string;
    senderId: string;
    text: string;
    createdAt: string;
}

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private apiUrl = `${environment.apiUrl}/chats`;
    private activeChatMessagesSubject = new BehaviorSubject<Message[]>([]);

    activeChatMessages$ = this.activeChatMessagesSubject.asObservable();

    constructor(private http: HttpClient) { }

    getUserChats(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }

    getChatById(chatId: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${chatId}`);
    }

    getChatMessages(chatId: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${chatId}/messages`).pipe(
            tap(response => {
                if (response.success) {
                    this.activeChatMessagesSubject.next(response.data);
                }
            })
        );
    }

    sendMessage(chatId: string, text: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/${chatId}/messages`, { text }).pipe(
            tap(() => this.getChatMessages(chatId).subscribe())
        );
    }

    startMessagePolling(chatId: string): Observable<any> {
        return timer(0, 3000).pipe(
            switchMap(() => this.getChatMessages(chatId)),
            retry()
        );
    }
}
