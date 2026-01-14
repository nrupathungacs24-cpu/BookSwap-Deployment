import { Component, OnInit } from '@angular/core';
import { ChatService, Chat } from '../../../books/services/chat.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
    selector: 'app-chat-list',
    templateUrl: './chat-list.component.html',
    styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
    chats: Chat[] = [];
    isLoading: boolean = true;
    currentUserUid: string = '';

    constructor(
        private chatService: ChatService,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.authService.user$.subscribe(user => {
            if (user) {
                this.currentUserUid = user.uid;
                this.loadChats();
            }
        });
    }

    loadChats() {
        this.chatService.getUserChats().subscribe({
            next: (res: any) => {
                this.chats = res.data;
                this.isLoading = false;
            },
            error: (err: any) => {
                console.error('Error loading chats:', err);
                this.isLoading = false;
            }
        });
    }

    openChat(chatId: string) {
        this.router.navigate(['/chat', chatId]);
    }
}
