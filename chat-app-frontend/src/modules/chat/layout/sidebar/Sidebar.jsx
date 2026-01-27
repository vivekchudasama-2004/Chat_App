import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import './Sidebar.css';
import { sidebarNavigationItems } from './SidebarMenu';

const Sidebar = ({ isSidebarExpanded, isMobileOpen }) => {
    // Local state to manage active item
    const [activePath, setActivePath] = useState('/messages');

    const handleItemClick = (e, path) => {
        e.preventDefault(); // Prevent actual navigation for UI demo purposes
        setActivePath(path);
    };

    return (
        <div className={`sidebar-navigation bg-white border-end d-flex flex-column ${!isSidebarExpanded ? 'collapsed' : ''} ${isMobileOpen ? 'show' : ''}`}>
            <div className="sidebar-brand-section border-bottom">
                {/* Full Logo */}
                <h4 className="fw-bold mb-0 brand-text text-nowrap">MAX<span className="text-primary">I</span>MUMLIFE</h4>
                {/* Collapsed Logo - Hidden as per user request for image placement */}
            </div>

            <Nav className="flex-column flex-grow-1 p-3 gap-2">
                {sidebarNavigationItems.map((item, index) => (
                    <Nav.Link
                        key={index}
                        href={item.path}
                        className={`sidebar-menu-item ${activePath === item.path ? 'active' : ''}`}
                        title={!isSidebarExpanded ? item.label : ''}
                        onClick={(e) => handleItemClick(e, item.path)}
                    >
                        <span className="fs-5 d-flex align-items-center">{item.icon}</span>
                        <span className="fw-medium sidebar-label">{item.label}</span>
                    </Nav.Link>
                ))}
            </Nav>
        </div>
    );
};

export default Sidebar;
