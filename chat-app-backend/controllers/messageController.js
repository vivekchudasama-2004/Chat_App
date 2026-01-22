const messageService = require('../services/messageService');

const sendMessage = async (req, res, next) => {
    try {
        const { conversationId, content, senderId } = req.body;

        // Handle file if present
        let fileBase64 = null;
        let fileName = null;
        let fileType = null;

        if (req.file) {
            fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
            fileName = req.file.originalname;
            fileType = req.file.mimetype;
        }

        if (!conversationId || !senderId) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const messageData = {
            conversationId,
            content: content || "",
            senderId
        };

        if (fileBase64) {
            messageData.fileBase64 = fileBase64;
            messageData.fileName = fileName;
            messageData.fileType = fileType;
        }

        const savedMessage = await messageService.createMessage(messageData);

        // Emit via Socket.io
        // access io from req.io middleware
        if (req.io) {
            req.io.to(conversationId).emit('receive_message', savedMessage);
        }

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
