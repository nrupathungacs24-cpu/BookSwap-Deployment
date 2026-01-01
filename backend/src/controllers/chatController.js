const { db } = require('../config/firebase');

// Get My Chats
exports.getUserChats = async (req, res, next) => {
    try {
        const { uid } = req.user;

        const snapshot = await db.collection('chats')
            .where('participants', 'array-contains', uid)
            .get(); // Note: orderBy with array-contains requires specific index

        const chats = [];
        snapshot.forEach(doc => chats.push({ id: doc.id, ...doc.data() }));

        res.status(200).json({ success: true, data: chats });
    } catch (error) {
        next(error);
    }
};

// Get Messages
exports.getChatMessages = async (req, res, next) => {
    try {
        const { chatId } = req.params;

        // Verify participation (security)
        // In a real app, strict check here.

        const snapshot = await db.collection('chats').doc(chatId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .get();

        const messages = [];
        snapshot.forEach(doc => messages.push({ id: doc.id, ...doc.data() }));

        res.status(200).json({ success: true, data: messages });
    } catch (error) {
        next(error);
    }
};

// Send Message
exports.sendMessage = async (req, res, next) => {
    try {
        const { chatId } = req.params;
        const { content } = req.body;
        const { uid } = req.user;

        const messageData = {
            senderId: uid,
            content,
            timestamp: new Date().toISOString(),
            read: false
        };

        // Add to sub-collection
        await db.collection('chats').doc(chatId).collection('messages').add(messageData);

        // Update parent chat
        await db.collection('chats').doc(chatId).update({
            lastMessage: content,
            updatedAt: new Date().toISOString()
        });

        res.status(201).json({ success: true, message: 'Message sent' });
    } catch (error) {
        next(error);
    }
};
