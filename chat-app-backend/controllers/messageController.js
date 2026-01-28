const messageService = require('../services/messageService');

const sendMessage = async (req, res, next) => {
    try {
        const { conversationId, content, senderId } = req.body;

        if (!conversationId || !senderId) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const messageData = {
            conversationId,
            content: content || "",
            senderId
        };

        const savedMessage = await messageService.createMessage(messageData);

        // Emit via Socket.io AFTER saving to ensure consistency (Real ID + Server Timestamp)
        if (req.io) {
            console.log(`Emitting receive_message to room: ${conversationId}`, savedMessage);
            req.io.to(conversationId).emit('receive_message', savedMessage);
        } else {
            console.warn("Socket.io instance not found in req");
        }

        res.status(201).json(savedMessage);
    } catch (e) {
        next(e);
    }
};

const getMessages = async (req, res, next) => {
    try {
        const { conversationId } = req.params;
        console.log(`[API] Fetching messages for conversationId: ${conversationId}`);
        const messages = await messageService.getMessages(conversationId);
        console.log(`[API] Found ${messages.length} messages for ${conversationId}`);
        res.json(messages);
    } catch (e) {
        next(e);
    }
};

module.exports = { sendMessage, getMessages };
