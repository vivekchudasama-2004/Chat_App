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
        where('conversationId', '==', conversationId),
        orderBy('message_at', 'asc')
    );

    const snapshot = await getDocs(q);
    const messages = [];
    snapshot.forEach(doc => {
        messages.push({
            messageId: doc.id,
            ...doc.data()
        });
    });
    return messages;
};

module.exports = { createMessage, getMessages };
