# Deployment Guide

## Production Checklist

1.  **Environment Variables**
    -   Ensure `NODE_ENV=production`.
    -   Do NOT commit `.env` or `service-account-key.json` to version control.
    -   Use a secure secrets manager (like Google Secret Manager) or platform-specific env var injection.

2.  **Security**
    -   **CORS**: Update `src/app.js` to allow only your frontend domain in `cors()`.
    -   **Rate Limiting**: Install `express-rate-limit` to prevent abuse.
    -   **Firestore Rules**: Even with a backend, ensure Firestore rules prevent public writes to collections associated with the backend (users, books, requests) to prevent bypass.

## Deployment Options

### 1. Google Cloud Run (Recommended)
Since you are using Firebase, Cloud Run is a natural fit.
1.  **Dockerize** the application (Create a `Dockerfile`).
2.  Build and push the image to Google Container Registry.
3.  Deploy to Cloud Run.
4.  Set Environment Variables in the Cloud Run console.

### 2. Heroku / Render / Railway
1.  Connect your GitHub repository.
2.  Set `FIREBASE_SERVICE_ACCOUNT_PATH` env var (Note: For these platforms, you might need to stringify the JSON content into a variable like `FIREBASE_CREDENTIALS` and parse it in `src/config/firebase.js` instead of reading a file).
3.  Deploy.

## Frontend Integration
Update your Angular environment files (`src/environments/environment.ts`) to point to the new backend URL:

```typescript
export const environment = {
  production: false,
  firebase: { ... },
  apiUrl: 'http://localhost:3000/api' // or your production URL
};
```
Then update `AuthService` and `BookService` to use `this.http.get(environment.apiUrl + '/books')` instead of direct Firestore calls.
