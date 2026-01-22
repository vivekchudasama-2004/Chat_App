const { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp } = require('firebase/firestore');
const { db } = require('../config/firebase');

const createMessage = async (messageData) => {
    const dataToSave = {
        ...messageData,
        message_at: serverTimestamp()
    };


    let savedDocs = { ...messageData, message_at: new Date() };

    if (db) {
        const docRef = await addDoc(collection(db, 'messages'), dataToSave);
        savedDocs.messageId = docRef.id;
    } else {
        savedDocs.messageId = 'mock_id_' + Date.now();
    }
    return savedDocs;
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
