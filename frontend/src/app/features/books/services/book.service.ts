import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Firestore, collection, getDocs, addDoc, doc, deleteDoc, query, where } from '@angular/fire/firestore';
import { Observable, from, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Book } from '../../../shared/models/book.model';

@Injectable({
    providedIn: 'root',
})
export class BookService {
    private googleApiUrl = 'https://www.googleapis.com/books/v1/volumes';

    constructor(private http: HttpClient, private firestore: Firestore) { }

    // Google Books API
    getBookDetailsByISBN(isbn: string): Observable<any> {
        return this.http.get(`${this.googleApiUrl}?q=isbn:${isbn}`);
    }

    // Firestore Operations (Temporary until Backend integration)
    getAllBooks(): Observable<Book[]> {
        const bookCollection = collection(this.firestore, 'books');
        return from(getDocs(bookCollection)).pipe(
            map(snapshot => {
                return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Book));
            })
        );
    }

    getBooksByUser(uid: string): Observable<Book[]> {
        const bookCollection = collection(this.firestore, 'books');
        const q = query(bookCollection, where('userUID', '==', uid));
        return from(getDocs(q)).pipe(
            map(snapshot => snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Book)))
        );
    }

    addBook(book: Book): Observable<any> {
        // Check if book has userUID
        if (!book.userUID) throw new Error('User UID required');
        const bookCollection = collection(this.firestore, 'books');
        return from(addDoc(bookCollection, book));
    }

    deleteBook(bookId: string): Observable<void> {
        const bookRef = doc(this.firestore, 'books', bookId);
        return from(deleteDoc(bookRef));
    }
}
