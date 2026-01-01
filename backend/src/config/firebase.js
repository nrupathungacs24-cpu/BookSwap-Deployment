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
const serviceAccountRaw = process.env.FIREBASE_SERVICE_ACCOUNT;

if (serviceAccountRaw) {
    try {
        const serviceAccount = JSON.parse(serviceAccountRaw);
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        console.log('Firebase Admin initialized using raw JSON from environment variable.');
    } catch (error) {
        console.error('Error parsing FIREBASE_SERVICE_ACCOUNT env var:', error.message);
        process.exit(1);
    }
} else if (serviceAccountPath) {
    // Resolve path relative to the process current working directory (project root)
    const absolutePath = path.resolve(process.cwd(), serviceAccountPath);
    const serviceAccount = require(absolutePath);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log(`Firebase Admin initialized using service account key at: ${absolutePath}`);
} else {
    // Fallback for local dev or GOOGLE_APPLICATION_CREDENTIALS
    admin.initializeApp();
    console.log('Firebase Admin initialized using default credentials.');
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };
