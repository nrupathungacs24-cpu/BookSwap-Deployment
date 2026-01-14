import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RequestService {
    private apiUrl = `${environment.apiUrl}/requests`;

    constructor(private http: HttpClient) { }

    sendInterest(bookId: string, receiverId: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/`, { bookId, receiverId });
    }

    getSentRequests(): Observable<any> {
        return this.http.get(`${this.apiUrl}/sent`);
    }

    getReceivedRequests(): Observable<any> {
        return this.http.get(`${this.apiUrl}/received`);
    }

    updateRequestStatus(requestId: string, status: 'accepted' | 'rejected'): Observable<any> {
        return this.http.put(`${this.apiUrl}/${requestId}/status`, { status });
    }
}
