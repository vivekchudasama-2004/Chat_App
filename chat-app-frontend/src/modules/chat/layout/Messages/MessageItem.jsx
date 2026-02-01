import React from 'react';
import { Image } from 'react-bootstrap';
import './MessageItem.css';

const MessageItem = ({ message, isMe }) => {
    return (
        <div className={`d-flex flex-column ${isMe ? 'align-items-end' : 'align-items-start'} mb-3`}>
            {!isMe && (
                <div className="d-flex align-items-baseline mb-1 ms-1">
                    <span className="text-muted extra-small message-time">{message.time}</span>
                </div>
            )}

            {/* Message  */}
            <div
                className={`p-3 position-relative message-bubble ${isMe ? 'bg-primary text-white rounded-start-3 rounded-bottom-3 me' : 'bg-light text-dark rounded-end-3 rounded-bottom-3 other'}`}
            >
                {/* Image Content */}
                {message.type === 'image' && (
                    <div className="mb-2">
                        {/* Placeholder for noise image in screenshot */}
                        <div className="message-image-placeholder" style={{ background: message.content }}></div>
                    </div>
                )}

                {/* Text Content */}
                {message.type === 'text' && (
                    <p className="mb-0 text-break message-text">{message.content}</p>
                )}
            </div>
            {/* Time for Me */}
            {isMe && (
                <div className="d-flex align-items-center mt-1 me-1">
                    <span className="text-muted extra-small message-time">{message.time}</span>
                </div>
            )}
        </div>
    );
};

export default MessageItem;
