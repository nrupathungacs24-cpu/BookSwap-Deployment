const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

// Initialize Firebase Admin SDK
// Ideally, use a service account key file referenced by GOOGLE_APPLICATION_CREDENTIALS
// or pass the object directly from env vars if securely managed.

// For this setup, we will expect a path to the service account JSON in .env
// OR standard default credentials if running in GCP.

const path = require('path');

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

if (serviceAccountPath) {
    // Resolve path relative to the process current working directory (project root)
    const absolutePath = path.resolve(process.cwd(), serviceAccountPath);
    const serviceAccount = require(absolutePath);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
} else {
    // Fallback for local dev without specific key path (might fail if not authorized via gcloud)
    // or checks for GOOGLE_APPLICATION_CREDENTIALS env var automatically
    admin.initializeApp();
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };
