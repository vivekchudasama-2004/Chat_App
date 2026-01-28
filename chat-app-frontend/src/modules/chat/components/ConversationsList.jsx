import React, { useState, useEffect } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { fetchUsers } from '../../../services/apiObject';

const ConversationsList = ({ currentUser, selectedId, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const loadUsers = async () => {
            const users = await fetchUsers();
            const mappedUsers = users // Show all users including self
                .map(user => ({
                    id: user.uid,
                    user: {
                        name: user.username,
                        avatar: user.profile_image
                    },
                    lastMessage: '',
                    time: '',
                }));
            setConversations(mappedUsers);
        };
        if (currentUser) {
            loadUsers();
        }
    }, [currentUser]);

    const filteredConversations = conversations.filter(c =>
        c.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="d-flex flex-column h-100">
            {/* Header Area */}
            <div className="p-3 pb-2">
                <h5 className="fw-bold mb-3">My Messages</h5>

                {/* Search Bar */}
                <InputGroup className="mb-3">
                    <InputGroup.Text className="bg-light border-end-0 text-muted" style={{ borderRadius: '10px 0 0 10px' }}>
                        <FaSearch />
                    </InputGroup.Text>
                    <Form.Control
                        placeholder="Search"
                        className="bg-light border-start-0 shadow-none text-muted"
                        style={{ borderRadius: '0 10px 10px 0' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </InputGroup>
            </div>

            {/* List Area */}
            <div className="flex-grow-1 overflow-auto px-2">
                {filteredConversations.map((convo) => (
                    <div
                        key={convo.id}
                        onClick={() => onSelect(convo)}
                        className={`d-flex align-items-center p-3 mb-2 rounded-3 cursor-pointer transition-colors ${selectedId === convo.id ? 'bg-primary-subtle' : 'hover-bg-light'}`}
                        style={{ cursor: 'pointer', backgroundColor: selectedId === convo.id ? '#E8F0FE' : 'transparent' }}
                    >
                        {/* Avatar */}
                        <div className="me-3 position-relative">
                            {convo.user.avatar && !convo.user.avatar.includes('via.placeholder') ? (
                                <img
                                    src={convo.user.avatar}
                                    alt={convo.user.name}
                                    className="rounded-circle object-fit-cover"
                                    style={{ width: '48px', height: '48px' }}
                                />
                            ) : (
                                <div
                                    className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white"
                                    style={{ width: '48px', height: '48px' }}
                                >
                                    <span className="fs-5">{convo.user.name.substring(0, 2).toUpperCase()}</span>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-grow-1 overflow-hidden">
                            <div className="d-flex justify-content-between align-items-baseline mb-1">
                                <h6 className="mb-0 fw-semibold text-truncate">{convo.user.name}</h6>
                                <small className="text-muted ms-2" style={{ fontSize: '0.75rem' }}>{convo.time}</small>
                            </div>
                            <p className="mb-0 text-muted text-truncate small">
                                {convo.lastMessage || <span className="fst-italic">Start a conversation</span>}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default ConversationsList;
