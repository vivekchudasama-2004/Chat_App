import React from 'react';

const ChatHeader = ({ currentUser, users, onSwitchUser }) => {
    return (
        <div style={{ padding: '10px 20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontWeight: 600 }}>Chat</h3>
            <div>
                <span style={{ fontSize: '12px', color: '#888', marginRight: '10px' }}>Current User: <b>{currentUser?.username}</b></span>
                {users.length > 1 && (
                    <button onClick={onSwitchUser} style={{ fontSize: '12px', padding: '4px 8px', cursor: 'pointer' }}>
                        Switch User
                    </button>
                )}
            </div>
        </div>
    );
};

export default ChatHeader;
