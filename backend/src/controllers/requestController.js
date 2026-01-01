const { db } = require('../config/firebase');

// Send Exchange Request
exports.sendRequest = async (req, res, next) => {
    try {
        const { bookId, receiverId } = req.body;
        const senderId = req.user.uid;

        if (senderId === receiverId) {
            return res.status(400).json({ success: false, error: 'Cannot request your own book' });
        }

        // Check if book exists and is available
        const bookDoc = await db.collection('books').doc(bookId).get();
        if (!bookDoc.exists) {
            return res.status(404).json({ success: false, error: 'Book not found' });
        }
        const bookData = bookDoc.data();
        if (bookData.status !== 'available') {
            return res.status(400).json({ success: false, error: 'Book is not available' });
        }

        // Check for existing pending request
        const existingReq = await db.collection('requests')
            .where('senderId', '==', senderId)
            .where('bookId', '==', bookId)
            .where('status', '==', 'pending')
            .get();

        if (!existingReq.empty) {
            return res.status(400).json({ success: false, error: 'Request already sent' });
        }

        const requestData = {
            senderId,
            receiverId, // Book owner
            bookId,
            bookTitle: bookData.title,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        const docRef = await db.collection('requests').add(requestData);

        res.status(201).json({ success: true, message: 'Request sent successfully', requestId: docRef.id });
    } catch (error) {
        next(error);
    }
};

// Get Requests Sent by Me
exports.getSentRequests = async (req, res, next) => {
    try {
        const { uid } = req.user;
        const snapshot = await db.collection('requests').where('senderId', '==', uid).get();

        const requests = [];
        snapshot.forEach(doc => requests.push({ id: doc.id, ...doc.data() }));

        res.status(200).json({ success: true, count: requests.length, data: requests });
    } catch (error) {
        next(error);
    }
};

// Get Requests Received by Me
exports.getReceivedRequests = async (req, res, next) => {
    try {
        const { uid } = req.user;
        const snapshot = await db.collection('requests').where('receiverId', '==', uid).get();

        const requests = [];
        snapshot.forEach(doc => requests.push({ id: doc.id, ...doc.data() }));

        res.status(200).json({ success: true, count: requests.length, data: requests });
    } catch (error) {
        next(error);
    }
};

// Update Request Status (Accept/Reject)
exports.updateRequestStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'accepted' or 'rejected'
        const { uid } = req.user;

        const reqRef = db.collection('requests').doc(id);
        const reqDoc = await reqRef.get();

        if (!reqDoc.exists) {
            return res.status(404).json({ success: false, error: 'Request not found' });
        }

        const reqData = reqDoc.data();

        if (reqData.receiverId !== uid) {
            return res.status(403).json({ success: false, error: 'Unauthorized' });
        }

        await reqRef.update({ status });

        // If accepted, create a Chat
        if (status === 'accepted') {
            // Check if chat already exists for these participants (optional, but good practice)
            // For now, create a new chat linked to this request
            const chatData = {
                participants: [reqData.senderId, reqData.receiverId],
                requestId: id,
                lastMessage: '',
                updatedAt: new Date().toISOString()
            };
            await db.collection('chats').add(chatData);

            // Mark book as 'reserved' or 'swapped' if needed? 
            // Business logic: Keep available until confirm swap? 
            // Simplification: Mark reserved.
            await db.collection('books').doc(reqData.bookId).update({ status: 'reserved' });
        }

        res.status(200).json({ success: true, message: `Request ${status}` });
    } catch (error) {
        next(error);
    }
};
