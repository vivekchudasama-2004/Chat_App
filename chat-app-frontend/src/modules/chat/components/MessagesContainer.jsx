import React, { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import ConversationsList from './ConversationsList';
import ChatWindow from './ChatWindow';
import { fetchUsers } from '../../../services/apiObject';

const MessagesContainer = ({ currentUser }) => {
    // Selected user to chat with
    const [selectedChatUser, setSelectedChatUser] = useState(null);

    // Reset selected chat if currentUser changes to avoid confusion
    useEffect(() => {
        setSelectedChatUser(null);
    }, [currentUser]);

    const handleSelectConversation = (conversationUser) => {
        setSelectedChatUser(conversationUser);
    };

    if (!currentUser) return <div>Loading...</div>;

    return (
        <Container fluid className="h-100 p-0 d-flex flex-column bg-light">
            {/* Account Switcher Removed as per request */}

            <div className="flex-grow-1 d-flex overflow-hidden">
                {/* Left Panel: Conversations List */}
                <div
                    className="d-none d-md-flex flex-column border-end bg-white"
                    style={{ width: '350px', minWidth: '300px' }}
                >
                    <ConversationsList
                        currentUser={currentUser}
                        selectedId={selectedChatUser?.id}
                        onSelect={handleSelectConversation}
                    />
                </div>

                {/* Right Panel: Chat Window */}
                <div className="flex-grow-1 d-flex flex-column h-100 bg-white">
                    <ChatWindow
                        currentUser={currentUser}
                        selectedUser={selectedChatUser}
                    />
                </div>
            </div>
        </Container>
    );
};

export default MessagesContainer;
