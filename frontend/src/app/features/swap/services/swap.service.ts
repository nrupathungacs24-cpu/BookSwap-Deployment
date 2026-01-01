import { Injectable } from '@angular/core';
import { Book } from '../../../shared/models/book.model';

@Injectable({
    providedIn: 'root'
})
export class SwapService {

    constructor() { }

    initiateSwapRequest(receiverEmail: string, proposedBookTitle: string, proposedBookAuthor: string, currentUser: any, receiverUser: any) {
        const subject = `Book Exchange Proposal: ${proposedBookTitle}`;

        // Construct the message
        const senderName = `${currentUser.firstName} ${currentUser.lastName}`;
        const receiverName = `${receiverUser.firstName} ${receiverUser.lastName}`;

        const message = `
    Hi ${receiverName},

    I came across your book, "${proposedBookTitle}" by "${proposedBookAuthor}" listed on BookSwap, and I'd love to exchange books with you. 
    
    Here are the details of the book I'm willing to offer in exchange:
    Title: [Your Book Title]
    Author: [Your Book Author]
    ISBN: [Your Book ISBN]
    
    Please let me know if you're interested in this exchange.

    Best regards,
    ${senderName}
  `;
        const encodedSubject = encodeURIComponent(subject);
        const encodedMessage = encodeURIComponent(message);

        const mailtoLink = `mailto:${receiverEmail}?subject=${encodedSubject}&body=${encodedMessage}`;

        // Open the user's default email client with the mailto link
        window.location.href = mailtoLink;
    }
}
