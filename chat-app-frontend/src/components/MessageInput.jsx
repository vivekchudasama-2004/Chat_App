import React, { useState } from 'react';

const MessageInput = ({ onSendMessage, currentUser }) => {
    const [inputText, setInputText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        onSendMessage({ content: inputText });

        setInputText("");
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: '20px', backgroundColor: '#fff', borderTop: '1px solid #eee', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your message..."
                    style={{
                        flex: 1,
                        padding: '12px 15px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        outline: 'none',
                        fontSize: '15px'
                    }}
                />
                <button
                    type="submit"
                    disabled={!inputText.trim()}
                    style={{
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0 20px',
                        fontSize: '15px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        opacity: (!inputText.trim()) ? 0.7 : 1
                    }}
                >
                    Send
                </button>
            </div>
        </form>
    );
};

export default MessageInput;
