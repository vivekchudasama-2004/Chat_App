import React, { useState, useRef } from 'react';

const MAX_FILE_SIZE_BYTES = 700 * 1024; // 700 KB

const MessageInput = ({ onSendMessage, currentUser }) => {
    const [inputText, setInputText] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > MAX_FILE_SIZE_BYTES) {
            alert("File size exceeds 700KB limit.");
            e.target.value = null;
            return;
        }
        setSelectedFile(file);
    };

    const removeFile = () => {
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputText.trim() && !selectedFile) return;

        onSendMessage({ content: inputText, file: selectedFile });

        setInputText("");
        removeFile();
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: '20px', backgroundColor: '#fff', borderTop: '1px solid #eee', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {selectedFile && (
                <div style={{ fontSize: '12px', color: '#666', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9f9f9', padding: '8px 12px', borderRadius: '6px' }}>
                    <span>Selected: <b>{selectedFile.name}</b> ({(selectedFile.size / 1024).toFixed(1)} KB)</span>
                    <button type="button" onClick={removeFile} style={{ border: 'none', background: 'transparent', color: 'red', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
                </div>
            )}

            <div style={{ display: 'flex', gap: '10px' }}>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileSelect}
                    accept="image/*,application/pdf"
                />
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                        border: '1px solid #ddd',
                        background: '#f9f9f9',
                        padding: '0 15px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '18px'
                    }}
                    title="Upload File"
                >
                    📎
                </button>

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
                    disabled={!inputText.trim() && !selectedFile}
                    style={{
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0 20px',
                        fontSize: '15px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        opacity: (!inputText.trim() && !selectedFile) ? 0.7 : 1
                    }}
                >
                    Send
                </button>
            </div>
        </form>
    );
};

export default MessageInput;
