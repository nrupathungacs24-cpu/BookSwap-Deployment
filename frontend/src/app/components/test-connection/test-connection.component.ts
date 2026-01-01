import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-connection',
  template: `
    <div class="test-container">
      <h2>Backend Connection Test</h2>
      
      <!-- API Connectivity Test -->
      <div class="test-section">
        <h3>1. Server Health Check</h3>
        <button (click)="testConnection()">Test Server Connection</button>
        
        <div *ngIf="response" class="response-box success">
          <h4>Server Response:</h4>
          <pre>{{ response | json }}</pre>
        </div>

        <div *ngIf="error" class="response-box error">
          <h4>Error:</h4>
          <pre>{{ error | json }}</pre>
        </div>
      </div>

      <hr>

      <!-- Database Connectivity Test -->
      <div class="test-section">
        <h3>2. Database Test (Fetch Books)</h3>
        <button (click)="fetchBooks()" class="btn-db">Fetch Books from DB</button>
        
        <div *ngIf="booksResponse" class="response-box success">
          <h4>Database Response:</h4>
          <p><strong>Success:</strong> {{ booksResponse.success }}</p>
          <p><strong>Count:</strong> {{ booksResponse.count }}</p>
          <pre>{{ (booksResponse.data | json) || 'No books found (Empty Array)' }}</pre>
        </div>

        <div *ngIf="booksError" class="response-box error">
          <h4>Database Error:</h4>
          <pre>{{ booksError | json }}</pre>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .test-container { padding: 40px; font-family: 'Segoe UI', sans-serif; max-width: 800px; margin: 0 auto; background: #fff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .test-section { margin-bottom: 30px; }
    button { padding: 12px 24px; cursor: pointer; background: #0DBE5E; color: white; border: none; border-radius: 6px; font-size: 16px; transition: background 0.3s; }
    button:hover { background: #0a994b; }
    .btn-db { background: #3B82F6; }
    .btn-db:hover { background: #2563EB; }
    .response-box { margin-top: 15px; padding: 20px; border-radius: 8px; font-family: monospace; white-space: pre-wrap; word-wrap: break-word; }
    .success { background-color: #ecfdf5; color: #065f46; border: 1px solid #10b981; }
    .error { background-color: #fef2f2; color: #991b1b; border: 1px solid #ef4444; }
    hr { margin: 30px 0; border: 0; border-top: 1px solid #e5e7eb; }
    h2 { color: #1f2937; margin-bottom: 30px; text-align: center; }
    h3 { color: #374151; margin-bottom: 15px; }
  `]
})
export class TestConnectionComponent implements OnInit {
  response: any;
  error: any;

  booksResponse: any;
  booksError: any;

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  testConnection() {
    this.response = null;
    this.error = null;
    this.http.get(`${environment.apiUrl}/test`).subscribe({
      next: (data) => this.response = data,
      error: (err) => this.error = err
    });
  }

  fetchBooks() {
    this.booksResponse = null;
    this.booksError = null;
    this.http.get(`${environment.apiUrl}/books`).subscribe({
      next: (data) => this.booksResponse = data,
      error: (err) => this.booksError = err
    });
  }
}
