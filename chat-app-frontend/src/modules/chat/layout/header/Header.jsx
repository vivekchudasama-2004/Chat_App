import React from 'react';
import { Navbar, Form, InputGroup } from 'react-bootstrap';
import { BsSearch, BsList, BsPersonCircle } from 'react-icons/bs';
import { CgShoppingBag } from "react-icons/cg";

import './Header.css';
export const Toggle = ({ handleChange, isChecked }) => {
    return (
        <div className="toggle-container">
            <input
                type="checkbox"
                id="check"
                className="toggle"
                onChange={handleChange}
                checked={isChecked}
            />
            <label htmlFor="check">Dark Mode</label>
        </div>
    );
};

const Header = ({ toggleSidebarVisibility, currentUser, allUsers, onUserSwitch }) => {
    return (
        <Navbar bg="white" expand={false} className="header-navigation sticky-top shadow-sm">
            <div className="d-flex align-items-center w-100 h-100 flex-nowrap">

                {/* Toggle & Search Section */}
                <div className="d-flex align-items-center flex-grow-1">
                    <div className="icon-button me-3" onClick={toggleSidebarVisibility} title="Toggle Sidebar">
                        <BsList className="fs-4 text-secondary" />
                    </div>

                    <Form className="flex-grow-1 header-search-container d-none d-sm-flex" style={{
                        marginRight: '20px'
                    }}>
                        <InputGroup className="search-input-group">
                            <InputGroup.Text className="search-icon-container">
                                <BsSearch className="text-muted" />
                            </InputGroup.Text>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="search-text-field"
                                aria-label="Search"
                            />
                        </InputGroup>
                    </Form>
                </div>

                {/* Right Icons Section */}
                <div className="d-flex align-items-center gap-2">
                    <div className="icon-button text-warning fs-6" title="Theme Toggle">
                        <Form>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                            />
                        </Form>
                    </div>

                    <div className="icon-button position-relative text-secondary" title="Messages">
                        <CgShoppingBag className="fs-5" />
                    </div>

                    {/* User Profile */}
                    <div className="d-flex align-items-center gap-2 border-start ps-3 ms-2">
                        <BsPersonCircle className="fs-3 text-secondary" />
                        {currentUser && <span className="fw-semibold text-dark d-none d-md-block ms-1">{currentUser.username}</span>}
                    </div>
                </div>
            </div>
        </Navbar>
    );
};

export default Header;