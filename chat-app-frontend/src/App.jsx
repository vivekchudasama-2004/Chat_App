import { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import './App.css';
import Sidebar from './modules/chat/layout/sidebar/Sidebar';
import Header from './modules/chat/layout/header/Header';

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarExpanded(true);
        setIsMobileSidebarOpen(false);
      } else {
        setIsSidebarExpanded(true);
        setIsMobileSidebarOpen(false);
      }
    };

    handleResize();

  }, []);

  const toggleSidebarVisibility = () => {
    if (window.innerWidth < 768) {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    } else {
      setIsSidebarExpanded(!isSidebarExpanded);
    }
  };

  return (
    <Container fluid className="p-0 bg-light vh-100 overflow-hidden">
      <Row className="g-0 h-100">
        {/* Desktop Sidebar: Adjusts width based on collapsed state */}
        <div className={`d-none d-md-block h-100 bg-white border-end transition-width`} style={{ width: isSidebarExpanded ? '280px' : '80px', transition: 'width 0.3s ease' }}>
          <Sidebar isSidebarExpanded={isSidebarExpanded} isMobileOpen={false} />
        </div>

        {/* Mobile Sidebar: Hidden by default, slides in when active */}
        <div className={`d-md-none position-fixed top-0 start-0 h-100 z-3`} style={{ pointerEvents: 'none' }}>
          <div style={{ pointerEvents: 'auto' }}>
            <Sidebar isSidebarExpanded={true} isMobileOpen={isMobileSidebarOpen} />
          </div>
        </div>

        {/* Mobile Backdrop: Dimmed background when sidebar is open */}
        {isMobileSidebarOpen && (
          <div
            className="d-md-none position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50 z-2"
            onClick={() => setIsMobileSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content Area */}
        <Col className="d-flex flex-column h-100 min-vw-0">
          <Header toggleSidebarVisibility={toggleSidebarVisibility} />

          <main className="flex-grow-1 p-4 overflow-auto">
            {/* Dynamic content will be injected here */}
            <div className="text-center mt-5 text-muted">
            </div>
          </main>
        </Col>
      </Row>
    </Container>
  );
}

export default App;