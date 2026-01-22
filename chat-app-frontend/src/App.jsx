import React, { useState, useEffect } from 'react';
import './index.css';

// Services
import socket from './services/socket';
import { fetchUsers, fetchMessages, sendMessageAPI } from './services/api';

// Components
import ChatHeader from './components/ChatHeader';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';

const CONVERSATION_ID = 'conv_user1_user2';

function App() {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]); // Dynamic users
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Join Room
    socket.emit('join_conversation', CONVERSATION_ID);

    // Initial Load: Users & Messages
    loadUsers();
    loadMessages();

    // Socket Listener
    socket.on('receive_message', (newMessage) => {
      setMessages((prev) => {
        // Avoid duplicates if my message
        if (prev.find(m => m.messageId === newMessage.messageId)) return prev;
        return [...prev, newMessage];
      });
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  const loadUsers = async () => {
    try {
      const userList = await fetchUsers();
      if (userList.length > 0) {
        setUsers(userList);
        // Default to first user if not set
        setCurrentUser(userList[0]);
      }
    } catch (err) {
      // Error handled in service
    }
  }

  const loadMessages = async () => {
    try {
      const msgs = await fetchMessages(CONVERSATION_ID);
      setMessages(msgs);
    } catch (err) {
      // Error handled in service
    }
  };

  const handleSendMessage = async ({ content, file }) => {
    if (!currentUser) return;

    try {
      await sendMessageAPI({
        conversationId: CONVERSATION_ID,
        senderId: currentUser.uid,
        content,
        file
      });
      // Message will be added via socket listener or optimistic update could be added here
    } catch (err) {
      alert("Failed to send message.");
    }
  };

  // Helper to Switch User
  const switchUser = () => {
    if (users.length < 2) return;
    const currentIndex = users.findIndex(u => u.uid === currentUser.uid);
    const nextIndex = (currentIndex + 1) % users.length;
    setCurrentUser(users[nextIndex]);
  }

  if (!currentUser) return <div style={{ padding: 20 }}>Loading Chat...</div>;

  return (
    <div className="app-container" style={{ margin: 'auto', width: '100%', maxWidth: '800px', height: '90vh', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      <ChatHeader
        currentUser={currentUser}
        users={users}
        onSwitchUser={switchUser}
      />

      <MessageList
        messages={messages}
        currentUser={currentUser}
        users={users}
      />

      <MessageInput
        onSendMessage={handleSendMessage}
        currentUser={currentUser}
      />

    </div>
  );
}

export default App;