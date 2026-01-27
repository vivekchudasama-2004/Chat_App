import React from 'react';
import { Navbar, Form, InputGroup } from 'react-bootstrap';
import { BsSearch, BsList, BsPersonCircle, BsEnvelope, BsToggleOn } from 'react-icons/bs';
import './Header.css';

const Header = ({ toggleSidebarVisibility }) => {
    return (
        <Navbar bg="white" expand={false} className="header-navigation border-bottom sticky-top shadow-sm">
            <div className="d-flex align-items-center w-100 h-100">

                {/* Toggle & Search Section */}
                <div className="d-flex align-items-center flex-grow-1">
                    <div className="icon-button me-3" onClick={toggleSidebarVisibility} title="Toggle Sidebar">
                        <BsList className="fs-4 text-secondary" />
                    </div>

                    <Form className="flex-grow-1 header-search-container d-none d-sm-flex">
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
                <div className="d-flex align-items-center gap-2 ms-3">
                    <div className="icon-button text-warning fs-4" title="Theme Toggle">
                        <BsToggleOn />
                    </div>
                    <div className="icon-button position-relative text-secondary" title="Messages">
                        <BsEnvelope className="fs-5" />
                    </div>
                    <div className="d-flex align-items-center gap-2 ms-2">
                        <BsPersonCircle className="fs-3 text-secondary" />
                        <span className="fw-semibold text-dark d-none d-md-block">admin</span>
                    </div>
                </div>
            </div>
        </Navbar>
    );
};

export default Header;
