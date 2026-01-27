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

        // Emit via Socket.io immediately (Optimistic UI)
        if (req.io) {
            const optimisticMessage = {
                ...messageData,
                message_at: new Date(), 
            };
            req.io.to(conversationId).emit('receive_message', optimisticMessage);
        }

        const savedMessage = await messageService.createMessage(messageData);

        res.status(201).json(savedMessage);
    } catch (e) {
        next(e);
    }
};

const getMessages = async (req, res, next) => {
    try {
        const { conversationId } = req.params;
        const messages = await messageService.getMessages(conversationId);
        res.json(messages);
    } catch (e) {
        next(e);
    }
};

module.exports = { sendMessage, getMessages };
