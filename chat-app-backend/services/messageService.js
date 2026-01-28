const { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp } = require('firebase/firestore');
const { db } = require('../config/firebase');

const createMessage = async (message) => {
    try {
        // Add server timestamp for ordering
        const messageToSave = {
            ...message,
            message_at: serverTimestamp()
        };

        if (!db) {
            console.warn("Firestore db not initialized, cannot save message.");
            return { ...message, messageId: 'temp_id_' + Date.now() };
        }

        const docRef = await addDoc(collection(db, 'messages'), messageToSave);

        // Return the message with the new ID and a client-side friendly date
        return {
            ...message,
            messageId: docRef.id,
            message_at: new Date()
        };
    } catch (error) {
        console.error("Error creating message in Firestore:", error);
        throw error;
    }
};

const getMessages = async (conversationId) => {
    if (!db) return [];

    const q = query(
        collection(db, 'messages'),
        where('conversationId', '==', conversationId)
        // orderBy('message_at', 'asc') // Removed to avoid "Requires Index" error
    );

    const snapshot = await getDocs(q);
    console.log(`[DB] getMessages query snapshot empty? ${snapshot.empty}`);
    const messages = [];
    snapshot.forEach(doc => {
        const data = doc.data();
        messages.push({
            messageId: doc.id,
            ...data,
            // Normalize timestamp to ISO string/Date object
            message_at: data.message_at && data.message_at.toDate ? data.message_at.toDate() : (data.message_at ? new Date(data.message_at) : new Date())
        });
    });

    // Validates dates and Sorts in memory
    messages.sort((a, b) => {
        const dateA = new Date(a.message_at);
        const dateB = new Date(b.message_at);
        return dateA - dateB;
    });

    return messages;
};

module.exports = { createMessage, getMessages };
