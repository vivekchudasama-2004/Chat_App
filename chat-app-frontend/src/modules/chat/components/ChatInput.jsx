import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { FaPaperPlane, FaPaperclip, FaMicrophone, FaSmile } from 'react-icons/fa';

const ChatInput = ({ onSend }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSend(message);
            setMessage('');
        }
    };

    return (
        <div className="p-3 bg-white border-top">
            <Form onSubmit={handleSubmit}>
                <InputGroup className="align-items-center bg-light rounded-pill px-2 py-1">
                    {/* Attachment Button */}
                    <Button variant="link" className="text-secondary shadow-none border-0 text-decoration-none">
                        <FaPaperclip size={18} />
                    </Button>

                    {/* Text Input */}
                    <Form.Control
                        placeholder="Type your message..."
                        className="bg-transparent border-0 shadow-none"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        style={{ fontSize: '0.95rem' }}
                    />

                    {/* Right Side Icons */}
                    <div className="d-flex align-items-center gap-2">
                        <Button variant="link" className="text-primary shadow-none border-0 p-1 text-decoration-none">
                            <FaSmile size={18} />
                        </Button>
                        <Button variant="link" className="text-secondary shadow-none border-0 p-1 text-decoration-none">
                            <FaMicrophone size={18} />
                        </Button>

                        {/* Send Button */}
                        <Button
                            type="submit"
                            className="btn btn-primary rounded-3 text-white d-flex align-items-center justify-content-center ms-2"
                            style={{ width: '40px', height: '40px', padding: 0 }}
                            disabled={!message.trim()}
                        >
                            <span className="small fw-bold">Send</span>
                            {/* Note: Design shows just "Send" or Icon. Using simple button for now matching screenshot somewhat */}
                        </Button>
                    </div>
                </InputGroup>
            </Form>
        </div>
    );
};

export default ChatInput;
