import { useState, useEffect } from 'react';

import IntroQuoteScreen from "./components/IntroQuoteScreen";
import Navbar from "./components/Navbar";
import LoginPopup from "./components/LoginPopup";

import LandingPage from "./pages/LandingPage";
import TimelinePage from "./pages/TimelinePage";
import RecordPage from "./pages/RecordPage";
import AwardsPage from "./pages/AwardsPage";
import AdminPage from "./pages/AdminPage";

export default function App() {
  // Intro/Quote State
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showQuote, setShowQuote] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [stars, setStars] = useState([]);

  // Page Navigation
  const [currentPage, setCurrentPage] = useState('home');
  const [currentAdminPage, setCurrentAdminPage] = useState('insert-raid')
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Landing Page Data State
  const [vipereData, setVipereData] = useState([]);
  const [hydrasData, setHydrasData] = useState([]);
  const [raidsData, setRaidsData] = useState([]);
  const [scrimmagesData, setScrimmagesData] = useState([]);
  const [medal1Data, setMedal1Data] = useState([]);
  const [medal2Data, setMedal2Data] = useState([]);
  const [medal3Data, setMedal3Data] = useState([]);

  // Function to fetch Records page data
  const fetchRecordsData = () => {
    fetch('http://localhost:8000/raids')
      .then(res => res.json())
      .then(data => setRaidsData(data))
      .catch(err => console.error('Error fetching Raids data:', err));

    fetch('http://localhost:8000/scrimmages')
      .then(res => res.json())
      .then(data => setScrimmagesData(data))
      .catch(err => console.error('Error fetching Scrimmages data:', err));
  };

  // Function to fetch Awards page data
  const fetchAwardsData = () => {
    fetch('http://localhost:8000/medal/1')
      .then(res => res.json())
      .then(data => setMedal1Data(data))
      .catch(err => console.error('Error fetching Medal 1 data:', err));

    fetch('http://localhost:8000/medal/2')
      .then(res => res.json())
      .then(data => setMedal2Data(data))
      .catch(err => console.error('Error fetching Medal 2 data:', err));

    fetch('http://localhost:8000/medal/3')
      .then(res => res.json())
      .then(data => setMedal3Data(data))
      .catch(err => console.error('Error fetching Medal 3 data:', err));
  };

  // Function to fetch Landing page data
  const fetchLandingData = () => {
    fetch('http://localhost:8000/vipere')
      .then(res => res.json())
      .then(data => setVipereData(data))
      .catch(err => console.error('Error fetching Vipere data:', err));

    fetch('http://localhost:8000/hydras')
      .then(res => res.json())
      .then(data => setHydrasData(data))
      .catch(err => console.error('Error fetching Hydras data:', err));
  };

  // Initial data load
  useEffect(() => {
    // Generate random stars
    const newStars = [];
    for (let i = 0; i < 200; i++) {
      newStars.push({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.7 + 0.3,
        animationDelay: `${Math.random() * 3}s`
      });
    }
    setStars(newStars);

    // Fetch Quote
    fetch('http://localhost:8000/quote')
      .then(response => response.json())
      .then(data => {
        setQuote(data);
        setLoading(false);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => setShowQuote(false), 1000);
        }, 4000);
      })
      .catch(err => {
        console.error('Error fetching quote:', err);
        setQuote({ text: 'Error loading quote', author: 'System' });
        setLoading(false);
        setTimeout(() => { setFadeOut(true); setTimeout(() => setShowQuote(false), 1000); }, 4000);
      });

    // Fetch all initial data
    fetchLandingData();
    fetchRecordsData();
    fetchAwardsData();
  }, []);

  // Refetch data when navigating to specific pages
  useEffect(() => {
    if (currentPage === 'record') {
      fetchRecordsData();
    } else if (currentPage === 'awards') {
      fetchAwardsData();
    } else if (currentPage === 'home') {
      fetchLandingData();
    }
  }, [currentPage]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: loginUsername, password: loginPassword })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsAdmin(true);
        setShowLoginPopup(false);
        setLoginUsername('');
        setLoginPassword('');
        setCurrentPage('admin');
      } else {
        setLoginError(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Failed to connect to server');
    }
  };

  const handleCloseLogin = () => {
    setShowLoginPopup(false);
    setLoginError('');
    setLoginUsername('');
    setLoginPassword('');
  };

  const adminButtonStyle = {
    position: 'fixed',
    top: '15px',
    right: '20px',
    backgroundColor: 'rgba(50, 205, 50, 0.3)',
    border: '2px solid #32cd32',
    color: '#aaffaa',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    zIndex: 101,
    transition: 'all 0.3s ease'
  };

  // Show intro quote screen
  if (showQuote) {
    return <IntroQuoteScreen quote={quote} loading={loading} fadeOut={fadeOut} stars={stars} />;
  }

  // Show appropriate page
  return (
    <>
      <style>
        {`
          .admin-btn:hover {
            backgroundColor: rgba(50, 205, 50, 0.5);
            boxShadow: 0 0 15px rgba(50, 205, 50, 0.6);
          }
        `}
      </style>
      {!isAdmin && <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />}
      <LoginPopup 
        show={showLoginPopup}
        onClose={handleCloseLogin}
        onSubmit={handleLogin}
        username={loginUsername}
        setUsername={setLoginUsername}
        password={loginPassword}
        setPassword={setLoginPassword}
        error={loginError}
      />
      <button 
        className="admin-btn"
        style={adminButtonStyle}
        onClick={() => {
          if (isAdmin) {
            setIsAdmin(false);
            setCurrentPage('home');
          } else {
            setShowLoginPopup(true);
          }
        }}
      >
        {isAdmin ? 'Logout' : 'Admin'}
      </button>

      {currentPage === 'home' && (
        <LandingPage stars={stars} vipereData={vipereData} hydrasData={hydrasData} />
      )}
      {currentPage === 'timeline' && <TimelinePage stars={stars} />}
      {currentPage === 'record' && (
        <RecordPage stars={stars} raidsData={raidsData} scrimmagesData={scrimmagesData} />
      )}
      {currentPage === 'awards' && (
        <AwardsPage stars={stars} medal1Data={medal1Data} medal2Data={medal2Data} medal3Data={medal3Data} />
      )}

      {currentPage === 'admin' && isAdmin && (
        <AdminPage 
        stars={stars}
        currentAdminPage={currentAdminPage}
        setCurrentAdminPage={setCurrentAdminPage}
        />
      )}
    </>
  );
}