import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ConversationsList from '../layout/chat_list/ConversationsList';
import ChatWindow from '../layout/chat_window/ChatWindow';

const ChatLayout = ({ currentUser }) => {
    // State to track the currently selected user for chatting
    const [selectedChatUser, setSelectedChatUser] = useState(null);

    useEffect(() => {
        setSelectedChatUser(null);
    }, [currentUser]);

    // Handler to select a conversation
    const handleSelectConversation = (conversationUser) => {
        setSelectedChatUser(conversationUser);
    };

    // Handler to navigate back to the list (used on mobile/tablet)
    const handleBackToConversations = () => {
        setSelectedChatUser(null);
    };

    if (!currentUser) return <div>Loading...</div>;

    return (
        <Container fluid className="h-100 p-0 d-flex flex-column bg-light">
            <div className="flex-grow-1 d-flex overflow-hidden">

                {/* 
                   LEFT PANEL: Conversations List 
                */}
                <div
                    className={`flex-column border-end bg-white conversations-sidebar ${selectedChatUser ? 'd-none d-lg-flex' : 'd-flex'}`}
                >
                    <div className="h-100 w-100 d-lg-block">
                        <ConversationsList
                            currentUser={currentUser}
                            selectedId={selectedChatUser?.id}
                            onSelect={handleSelectConversation}
                        />
                    </div>
                </div>

                {/* 
                   RIGHT PANEL: Chat Window
                   */}
                <div className={`flex-grow-1 flex-column h-100 bg-white ${selectedChatUser ? 'd-flex' : 'd-none d-lg-flex'}`}>
                    <ChatWindow
                        currentUser={currentUser}
                        selectedUser={selectedChatUser}
                        onBack={handleBackToConversations}
                    />
                </div>
            </div>
        </Container>
    );
};

export default ChatLayout;
