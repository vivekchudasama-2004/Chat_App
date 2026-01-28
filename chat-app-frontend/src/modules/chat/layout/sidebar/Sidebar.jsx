import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import './Sidebar.css';
import { sidebarItems } from './SidebarMenu';
// import logo from '../../../../../public/logo.PNG'; 


const Sidebar = ({ isSidebarExpanded: SidebarExpanded, isMobileOpen, activePath, setActivePath }) => {

    const handleItemClick = (e, path) => {
        e.preventDefault();
        setActivePath(path);
    };

    return (
        <div className={`sidebar-navigation bg-white d-flex flex-column ${!SidebarExpanded ? 'collapsed' : ''} ${isMobileOpen ? 'show' : ''}`}>
            <div className="sidebar-brand-section ">
                {/* Logo */}
                <h4 className="fw-bold mb-0 brand-text text-nowrap">MA<span className="text-primary">X</span>IMUMLIFE</h4>
                {/* <img src={logo} style={
                    {
                        height:"auto",
                        width:"auto"
                    }
                } /> */}
            </div>

            <Nav className="flex-column flex-grow-1 p-3 gap-2">
                {sidebarItems.map((item, index) => (
                    <Nav.Link
                        key={index}
                        href={item.path}
                        className={`sidebar-menu-item ${activePath === item.path ? 'active' : ''}`}
                        title={!SidebarExpanded ? item.label : ''}
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