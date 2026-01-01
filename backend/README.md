# BookSwap Backend

This is the Node.js/Express backend for the BookSwap application. It replaces the direct-to-Firestore frontend logic with a secure, managed API layer.

## Features
- **Authentication**: Verifies Firebase ID Tokens.
- **Books**: CRUD operations with Google Books API caching.
- **Requests**: In-app swap request system (replaces `mailto`).
- **Chat**: Real-time messaging scaffold using Firestore sub-collections.

## Prerequisites
- Node.js (v16+)
- Firebase Service Account Key (JSON)

## Setup

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Configuration**
    Create a `.env` file in the root directory:
    ```env
    PORT=3000
    FIREBASE_SERVICE_ACCOUNT_PATH=./service-account-key.json
    ```

3.  **Firebase Credentials**
    -   Go to Firebase Console > Project Settings > Service Accounts.
    -   Generate a new private key.
    -   Save the JSON file as `service-account-key.json` in this directory (or update the path in `.env`).

4.  **Run Locally**
    ```bash
    npm run dev
    ```

## API Documentation

### Auth
-   `POST /api/auth/verify`: Verify token and sync user. Header: `Authorization: Bearer <token>`

### Books
-   `GET /api/books`: Get all available books.
-   `POST /api/books`: List a new book. Body: `{ isbn, title, author, condition }`
-   `DELETE /api/books/:id`: Delete a book.

### Requests
-   `POST /api/requests`: Send a swap request. Body: `{ bookId, receiverId }`
-   `GET /api/requests/sent`: Get requests sent by you.
-   `GET /api/requests/received`: Get requests received by you.
-   `PUT /api/requests/:id/status`: Accept/Reject. Body: `{ status: 'accepted' }`

### Chat
-   `GET /api/chats`: Get your active chats.
-   `GET /api/chats/:chatId/messages`: Get messages.
-   `POST /api/chats/:chatId/messages`: Send message. Body: `{ content }`

## Folder Structure
-   `src/controllers`: Request logic
-   `src/models`: Schema definitions (implicit in Firestore)
-   `src/routes`: API endpoints
-   `src/services`: Business logic (currently combined with controllers)
-   `src/middlewares`: Auth and Error handling
