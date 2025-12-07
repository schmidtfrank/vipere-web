import { useState, useEffect } from 'react';

// --- IMPORT IMAGE FILES ---
import DeathVipereImg from './photos/deathvipere.png';
import VipereLogoImg from './photos/viperelogo.png';
import WrathHydraImg from './photos/wrathhydra.png';

export default function App() {
  // Intro/Quote State
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showQuote, setShowQuote] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [stars, setStars] = useState([]); // Used for both screens now

  // Landing Page Data State
  const [vipereData, setVipereData] = useState([]);
  const [hydrasData, setHydrasData] = useState([]);

  useEffect(() => {
    // 1. Generate random stars (used for both screens)
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

    // 2. Fetch Quote (Intro)
    fetch('http://localhost:8000/quote')
      .then(response => response.json())
      .then(data => {
        setQuote(data);
        setLoading(false);
        
        // Start fade out sequence
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            setShowQuote(false);
          }, 1000);
        }, 4000);
      })
      .catch(err => {
        console.error('Error fetching quote:', err);
        setQuote({ text: 'Error loading quote', author: 'System' });
        setLoading(false);
        setTimeout(() => { setFadeOut(true); setTimeout(() => setShowQuote(false), 1000); }, 4000);
      });

    // 3. Fetch Landing Page Data (Pre-load while intro plays)
    
    fetch('http://localhost:8000/vipere')
      .then(res => res.json())
      .then(data => setVipereData(data))
      .catch(err => console.error('Error fetching Vipere data:', err));

    fetch('http://localhost:8000/hydras')
      .then(res => res.json())
      .then(data => setHydrasData(data))
      .catch(err => console.error('Error fetching Hydras data:', err));

  }, []);

  const styles = {
    // --- Intro Styles (Unchanged) ---
    quoteScreen: {
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: fadeOut ? 0 : 1,
      transition: 'opacity 1s ease-in-out',
      overflow: 'hidden',
      zIndex: 10
    },
    star: {
      position: 'absolute',
      backgroundColor: '#fff',
      borderRadius: '50%',
      // We will remove animation for the static stars on the landing page
    },
    quoteContainer: {
      maxWidth: '800px',
      padding: '0 32px',
      textAlign: 'center',
      position: 'relative',
      zIndex: 1
    },
    quoteText: {
      color: '#fff',
      fontSize: '2rem',
      fontWeight: '300',
      fontStyle: 'italic',
      marginBottom: '24px',
      lineHeight: '1.6'
    },
    quoteAuthor: {
      color: '#999',
      fontSize: '1.5rem'
    },

    // --- Landing Page Styles (Updated for Static Stars) ---
    landingPage: {
      minHeight: '100vh',
      // SPACE BACKGROUND
      background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)', 
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 20px',
      overflow: 'hidden',
      position: 'relative' // Needed for the stars to position correctly
    },
    landingTitle: {
      fontSize: '4rem', 
      fontWeight: '900', 
      color: '#e0e0e0', 
      marginBottom: '60px',
      textTransform: 'uppercase',
      letterSpacing: '5px', 
      textAlign: 'center',
      zIndex: 2, // Ensure title is above stars
      position: 'relative'
    },
    contentRow: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      width: '100%',
      maxWidth: '1200px',
      gap: '40px',
      flexWrap: 'wrap',
      zIndex: 2, // Ensure content is above stars
      position: 'relative'
    },
    column: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minWidth: '300px'
    },
    columnImage: {
      width: '200px',
      height: '200px',
      objectFit: 'contain',
      marginBottom: '20px',
      // GLOW EFFECT for images
      filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.2))'
    },
    listContainer: {
      backgroundColor: 'rgba(42, 42, 42, 0.6)', 
      padding: '20px',
      borderRadius: '8px',
      width: '100%',
      boxShadow: '0 0 15px rgba(0,0,0,0.5)'
    },
    listItem: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 0',
      borderBottom: '1px solid #444',
      fontSize: '0.9rem'
    },
    rankText: {
      color: '#ff4444', 
      fontWeight: 'bold'
    },
    logoColumn: {
      flex: 0.8,
      display: 'flex',
      justifyContent: 'center'
    }
  };

  // --- Render Intro Screen (Unchanged) ---
  if (showQuote) {
    return (
      <div style={styles.quoteScreen}>
        <style>
          {`
            @keyframes twinkle {
              0%, 100% { opacity: 0.3; }
              50% { opacity: 1; }
            }
          `}
        </style>
        {stars.map((star, i) => (
          <div
            key={i}
            style={{
              ...styles.star,
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: star.animationDelay,
              animationName: 'twinkle' // Only animate here
            }}
          />
        ))}
        <div style={styles.quoteContainer}>
          {loading ? (
            <div style={{ color: '#fff', fontSize: '1.25rem' }}>Loading...</div>
          ) : quote ? (
            <>
              <p style={styles.quoteText}>"{quote.text}"</p>
              <p style={styles.quoteAuthor}>— {quote.author}</p>
            </>
          ) : (
            <div style={{ color: '#fff', fontSize: '1.25rem' }}>Failed to load quote</div>
          )}
        </div>
      </div>
    );
  }

  // --- Render Landing Page (Updated) ---
  return (
    <div style={styles.landingPage}>
        {/* CSS for Glowing Title Effect (Dark Green) */}
        <style>
          {`
            .kingdom-title {
              /* Ensure the base text color is bright for the glow to work */
              color: #aaffaa; 
              
              /* Base dark green glow effect */
              text-shadow: 0 0 10px rgba(0, 255, 0, 0.8), 
                           0 0 20px rgba(0, 255, 0, 0.6);
              
              /* Subtle breathing animation for a magical feel */
              animation: neon-glow-green 1.5s infinite alternate;
            }
            @keyframes neon-glow-green {
              from {
                text-shadow: 0 0 5px #fff, 0 0 10px #32cd32, 0 0 20px #008000;
              }
              to {
                text-shadow: 0 0 10px #fff, 0 0 15px #32cd32, 0 0 30px #008000, 0 0 40px #008000;
              }
            }
          `}
        </style>

        {/* Static Stars for Background Ambience */}
        {stars.map((star, i) => (
          <div
            key={i}
            style={{
              ...styles.star,
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              zIndex: 1 // Ensure stars are behind the content
            }}
          />
        ))}

      <h1 
        style={styles.landingTitle}
        className="kingdom-title" // Apply the glowing class
      >
        Kingdom of Viperia
      </h1>
      
      <div style={styles.contentRow}>
        
        {/* Left Column: DeathVipere */}
        <div style={styles.column}>
          <img 
            src={DeathVipereImg} 
            alt="Death Vipere" 
            style={styles.columnImage} 
          />
          <div style={styles.listContainer}>
            <h3 style={{textAlign: 'center', marginBottom: '15px', color: '#888'}}>Vipere Roster</h3>
            {vipereData.length > 0 ? (
              vipereData.map((user, index) => (
                <div key={index} style={styles.listItem}>
                  <span>{user.username || user.name}</span>
                  <span style={styles.rankText}>{user.rank}</span>
                </div>
              ))
            ) : (
              <div style={{textAlign: 'center', fontStyle: 'italic', color: '#666'}}>Loading Vipere Roster...</div>
            )}
          </div>
        </div>

        {/* Middle Column: Logo */}
        <div style={{...styles.column, ...styles.logoColumn}}>
          <img 
            src={VipereLogoImg} 
            alt="Vipere Logo" 
            style={{...styles.columnImage, width: '250px', height: '250px'}} 
          />
        </div>

        {/* Right Column: WrathHydra */}
        <div style={styles.column}>
          <img 
            src={WrathHydraImg} 
            alt="Wrath Hydra" 
            style={styles.columnImage} 
          />
          <div style={styles.listContainer}>
            <h3 style={{textAlign: 'center', marginBottom: '15px', color: '#888'}}>Royal Family</h3>
            {hydrasData.length > 0 ? (
              hydrasData.map((user, index) => (
                <div key={index} style={styles.listItem}>
                  <span>{user.username || user.name}</span>
                  <span style={styles.rankText}>{user.rank}</span>
                </div>
              ))
            ) : (
              <div style={{textAlign: 'center', fontStyle: 'italic', color: '#666'}}>Loading Hydra Roster...</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}