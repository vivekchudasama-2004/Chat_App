const express = require('express');
const router = express.Router();
const multer = require('multer');
const messageController = require('../controllers/messageController');

// Configure Multer (Memory Storage)
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('file'), messageController.sendMessage);
router.get('/:conversationId', messageController.getMessages);

module.exports = router;
