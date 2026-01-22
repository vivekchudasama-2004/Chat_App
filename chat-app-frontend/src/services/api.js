import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const fetchUsers = async () => {
    try {
        const res = await axios.get(`${API_URL}/users`);
        return res.data;
    } catch (err) {
        console.error("Failed to load users", err);
        throw err;
    }
};

export const fetchMessages = async (conversationId) => {
    try {
        const res = await axios.get(`${API_URL}/messages/${conversationId}`);
        return res.data;
    } catch (err) {
        console.error("Failed to load messages", err);
        throw err;
    }
};

export const sendMessageAPI = async (messageData) => {
    // messageData: { conversationId, senderId, content, file (optional) }
    const formData = new FormData();
    formData.append('conversationId', messageData.conversationId);
    formData.append('senderId', messageData.senderId);
    formData.append('content', messageData.content);

    if (messageData.file) {
        formData.append('file', messageData.file);
    }

    try {
        const res = await axios.post(`${API_URL}/messages`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (err) {
        console.error("Failed to send", err);
        throw err;
    }
};
