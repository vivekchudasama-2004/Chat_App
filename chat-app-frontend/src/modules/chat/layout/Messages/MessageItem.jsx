import React from 'react';
import { Image } from 'react-bootstrap';

const MessageItem = ({ message, isMe }) => {
    return (
        <div className={`d-flex flex-column ${isMe ? 'align-items-end' : 'align-items-start'} mb-3`}>
            {/* Sender Name & Time */}
            {/* Design shows name above message for receiver */}
            {/* Sender Name Removed */}
            {!isMe && (
                <div className="d-flex align-items-baseline mb-1 ms-1">
                    {/* Name removed, keeping time if needed or remove entire block if time acts weird alone */}
                    <span className="text-muted extra-small" style={{ fontSize: '0.7rem' }}>{message.time}</span>
                </div>
            )}

            {/* Message Bubble */}
            <div
                className={`p-3 position-relative ${isMe ? 'bg-primary text-white rounded-start-3 rounded-bottom-3' : 'bg-light text-dark rounded-end-3 rounded-bottom-3'}`}
                style={{
                    maxWidth: '70%',
                    borderRadius: '18px',
                    borderTopRightRadius: isMe ? '4px' : '18px',
                    borderTopLeftRadius: isMe ? '18px' : '4px'
                }}
            >
                {/* Image Content */}
                {message.type === 'image' && (
                    <div className="mb-2">
                        {/* Placeholder for noise image in screenshot */}
                        <div style={{ width: '200px', height: '200px', background: message.content, borderRadius: '12px' }}></div>
                    </div>
                )}

                {/* Text Content */}
                {message.type === 'text' && (
                    <p className="mb-0 text-break" style={{ fontSize: '0.95rem' }}>{message.content}</p>
                )}
            </div>
            {/* Time for Me */}
            {isMe && (
                <div className="d-flex align-items-center mt-1 me-1">
                    <span className="text-muted extra-small" style={{ fontSize: '0.7rem' }}>{message.time}</span>
                </div>
            )}
        </div>
    );
};

export default MessageItem;
