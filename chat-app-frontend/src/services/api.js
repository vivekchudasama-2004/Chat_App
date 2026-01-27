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
    // messageData: { conversationId, senderId, content }
    try {
        const res = await axios.post(`${API_URL}/messages`, messageData);
        return res.data;
    } catch (err) {
        console.error("Failed to send message:", err);
        throw err;
    }
};
