const { db } = require('../config/firebase');

exports.verifyUser = async (req, res, next) => {
    // This endpoint is just to confirm validity of the token (handled by middleware)
    // and optionally check/create user in Firestore if not exists (sync).

    try {
        const { uid, email, name, picture } = req.user;

        // Check if user exists in Firestore 'users' collection
        const userRef = db.collection('users').doc(uid);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            // Logic to create user in DB if they don't exist is handled in frontend Register, 
            // but we can ensure consistency here.
            // For now, we just return success.
            return res.status(200).json({ success: true, message: 'User is authenticated', user: req.user });
        }

        res.status(200).json({
            success: true,
            user: { uid, email, ...userDoc.data() }
        });

    } catch (error) {
        next(error);
    }
};
