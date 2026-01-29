import { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import './App.css';
import Sidebar from "../src/modules/chat/layout/sidebar/Sidebar";
import Header from '../src/modules/chat/layout//header/Header';
import ChatLayout from './modules/chat/layout/ChatLayout';
import { fetchUsers } from './services/apiObject';

function App() {
  const [SidebarExpanded, setSidebarExpanded] = useState(true);
  const [MobileSidebar, setMobileSidebar] = useState(false);
  const [activePath, setActivePath] = useState('/messages');

  // Authenticated User State (Lifted from ChatLayout)
  const [currentUser, setCurrentUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await fetchUsers();
        setAllUsers(users);

        if (users && users.length > 0) {
          // Logic to determine current user
          const urlParams = new URLSearchParams(window.location.search);
          const uidParam = urlParams.get('uid');
          const storedUserStr = localStorage.getItem('chat_app_current_user');

          let selected = null;

          // 1. URL Param
          if (uidParam) {
            selected = users.find(u => u.uid === uidParam);
          }

          // 2. Local Storage
          if (!selected && storedUserStr) {
            try {
              const parsed = JSON.parse(storedUserStr);
              selected = users.find(u => u.uid === parsed.uid);
            } catch (e) {
              console.error("Storage parse error", e);
            }
          }

          // 3. Default (Admin or First)
          if (!selected) {
            const admin = users.find(u => u.username === 'admin');
            selected = admin || users[0];
          }

          setCurrentUser(selected);
          if (selected) {
            localStorage.setItem('chat_app_current_user', JSON.stringify(selected));
          }
        }
      } catch (err) {
        console.error("Failed to load users", err);
      }
    };
    loadUsers();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      // ... existing resize logic
      if (window.innerWidth < 768) {
        setSidebarExpanded(true);
        setMobileSidebar(false);
      } else {
        setSidebarExpanded(true);
        setMobileSidebar(false);
      }
    };

    handleResize();

  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setMobileSidebar(!MobileSidebar);
    } else {
      setSidebarExpanded(!SidebarExpanded);
    }
  };

  const handleUserSwitch = (user) => {
    setCurrentUser(user);
    localStorage.setItem('chat_app_current_user', JSON.stringify(user));
  };

  return (
    <Container fluid className="p-0 bg-light vh-100 overflow-hidden">
      <Row className="g-0 h-100">
        <div className={`d-none d-md-block h-100 bg-white border-end transition-width`} style={{ width: SidebarExpanded ? '280px' : '80px', transition: 'width 0.3s ease' }}>
          <Sidebar
            isSidebarExpanded={SidebarExpanded}
            isMobileOpen={false}
            activePath={activePath}
            setActivePath={setActivePath}
          />
        </div>

        <div className={`d-md-none position-fixed top-0 start-0 h-100 z-3`} style={{ pointerEvents: 'none' }}>
          <div style={{ pointerEvents: 'auto' }}>
            <Sidebar
              isSidebarExpanded={true}
              isMobileOpen={MobileSidebar}
              activePath={activePath}
              setActivePath={setActivePath}
            />
          </div>
        </div>

        {MobileSidebar && (
          <div
            className="d-md-none position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50 z-2"
            onClick={() => setMobileSidebar(false)}
          ></div>
        )}

        {/* Main Content Area */}
        <Col className="d-flex flex-column h-100 min-vw-0">
          <Header
            toggleSidebarVisibility={toggleSidebar}
            currentUser={currentUser}
          />

          <main className="flex-grow-1 p-0 overflow-hidden d-flex flex-column">
            {activePath === '/messages' ? (
              <div className="h-100 w-100">
                <ChatLayout currentUser={currentUser} />
              </div>
            ) : (
              <div className="text-center mt-5 text-muted">
                Content for {activePath}
              </div>
            )}
          </main>
        </Col>
      </Row>
    </Container>
  );
}

export default App;