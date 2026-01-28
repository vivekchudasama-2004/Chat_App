import axios from 'axios';

const API_URL = 'http://localhost:3001/api'; // Or your deployed URL

export const fetchUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};

export const fetchMessages = async (conversationId) => {
    try {
        const response = await axios.get(`${API_URL}/messages/${conversationId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching messages:", error);
        return [];
    }
};

export const sendMessage = async (messageData) => {
    try {
        const response = await axios.post(`${API_URL}/messages`, messageData);
        return response.data;
    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
}
