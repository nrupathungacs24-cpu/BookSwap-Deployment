# Production Environment Configuration

Since environment files are gitignored, you'll need to create `environment.prod.ts` manually before deploying.

## Create the file:

**Path**: `frontend/src/environments/environment.prod.ts`

**Content**:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://YOUR-BACKEND-URL.onrender.com/api',
  firebaseConfig: {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  }
};
```

## Instructions:

1. Copy your Firebase config from `environment.development.ts`
2. Replace `YOUR-BACKEND-URL` with your actual Render backend URL
3. Commit this file to Git before deploying to Render

**Note**: You may need to temporarily remove `environment.prod.ts` from `.gitignore` or create it directly on your deployment platform.
