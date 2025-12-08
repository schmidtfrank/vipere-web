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
  const [stars, setStars] = useState([]);

  // Page Navigation
  const [currentPage, setCurrentPage] = useState('home');

  // Landing Page Data State
  const [vipereData, setVipereData] = useState([]);
  const [hydrasData, setHydrasData] = useState([]);
  const [raidsData, setRaidsData] = useState([]);
  const [scrimmagesData, setScrimmagesData] = useState([]);
  const [medal1Data, setMedal1Data] = useState([]);
  const [medal2Data, setMedal2Data] = useState([]);
  const [medal3Data, setMedal3Data] = useState([]);

  useEffect(() => {
    // 1. Generate random stars
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

    // 2. Fetch Quote
    fetch('http://localhost:8000/quote')
      .then(response => response.json())
      .then(data => {
        setQuote(data);
        setLoading(false);
        
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

    // 3. Fetch Landing Page Data
    fetch('http://localhost:8000/vipere')
      .then(res => res.json())
      .then(data => setVipereData(data))
      .catch(err => console.error('Error fetching Vipere data:', err));

    fetch('http://localhost:8000/hydras')
      .then(res => res.json())
      .then(data => setHydrasData(data))
      .catch(err => console.error('Error fetching Hydras data:', err));

    // 4. Fetch Records Data
    fetch('http://localhost:8000/raids')
      .then(res => res.json())
      .then(data => setRaidsData(data))
      .catch(err => console.error('Error fetching Raids data:', err));

    fetch('http://localhost:8000/scrimmages')
      .then(res => res.json())
      .then(data => setScrimmagesData(data))
      .catch(err => console.error('Error fetching Scrimmages data:', err));

    // 5. Fetch Medal Data
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

  }, []);

  const styles = {
    // --- Intro Styles ---
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

    // --- Navigation Bar ---
    navbar: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '60px',
      background: 'transparent',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '30px',
      zIndex: 100
    },
    navButton: {
      background: 'none',
      border: 'none',
      color: '#aaffaa',
      fontSize: '1rem',
      fontWeight: '600',
      padding: '10px 20px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },

    // --- Landing Page Styles ---
    landingPage: {
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)', 
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '100px 20px 40px 20px',
      overflow: 'hidden',
      position: 'relative'
    },
    landingTitle: {
      fontSize: '4rem', 
      fontWeight: '900', 
      color: '#e0e0e0', 
      marginBottom: '60px',
      textTransform: 'uppercase',
      letterSpacing: '5px', 
      textAlign: 'center',
      zIndex: 2,
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
      zIndex: 2,
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
    },

    // --- Timeline Page Styles ---
    timelinePage: {
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)',
      color: '#fff',
      padding: '100px 40px 40px 40px',
      position: 'relative',
      overflow: 'hidden'
    },
    timelineTitle: {
      fontSize: '3.5rem',
      fontWeight: '900',
      color: '#aaffaa',
      textAlign: 'center',
      marginBottom: '80px',
      textTransform: 'uppercase',
      letterSpacing: '4px',
      zIndex: 2,
      position: 'relative'
    },
    timelineContainer: {
      maxWidth: '1000px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 2
    },
    timelineLine: {
      position: 'absolute',
      left: '50%',
      top: 0,
      height: 'calc(100% - 150px)',
      width: '4px',
      background: 'linear-gradient(to bottom, #32cd32, #008000)',
      transform: 'translateX(-50%)'
    },
    timelineEvent: {
      position: 'relative',
      marginBottom: '80px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    timelineDot: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      backgroundColor: '#32cd32',
      boxShadow: '0 0 20px #32cd32',
      zIndex: 3
    },
    timelineContent: {
      width: '45%',
      backgroundColor: 'rgba(42, 42, 42, 0.7)',
      padding: '25px',
      borderRadius: '10px',
      boxShadow: '0 0 20px rgba(0,0,0,0.5)'
    },
    timelineEventTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#aaffaa',
      marginBottom: '10px'
    },
    timelineEnd: {
      textAlign: 'center',
      fontSize: '2rem',
      fontStyle: 'italic',
      color: '#32cd32',
      marginTop: '60px',
      position: 'relative',
      zIndex: 2
    },

    // --- Record Page Styles ---
    recordPage: {
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)',
      color: '#fff',
      padding: '100px 40px 40px 40px',
      position: 'relative',
      overflow: 'hidden'
    },
    recordTitle: {
      fontSize: '3.5rem',
      fontWeight: '900',
      color: '#aaffaa',
      textAlign: 'center',
      marginBottom: '60px',
      textTransform: 'uppercase',
      letterSpacing: '4px',
      zIndex: 2,
      position: 'relative'
    },
    recordContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      gap: '40px',
      flexWrap: 'wrap',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 2
    },
    recordSection: {
      flex: 1,
      minWidth: '400px',
      backgroundColor: 'rgba(42, 42, 42, 0.7)',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 0 20px rgba(0,0,0,0.5)'
    },
    recordSectionTitle: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#32cd32',
      textAlign: 'center',
      marginBottom: '25px',
      textTransform: 'uppercase',
      letterSpacing: '2px'
    },
    recordTable: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    recordTableHeader: {
      backgroundColor: 'rgba(50, 205, 50, 0.2)',
      color: '#aaffaa',
      padding: '12px',
      textAlign: 'left',
      borderBottom: '2px solid #32cd32',
      fontWeight: 'bold',
      fontSize: '0.9rem'
    },
    recordTableRow: {
      borderBottom: '1px solid #444'
    },
    recordTableCell: {
      padding: '12px',
      fontSize: '0.9rem'
    },
    winCell: {
      color: '#32cd32',
      fontWeight: 'bold'
    },
    lossCell: {
      color: '#ff4444',
      fontWeight: 'bold'
    },

    // --- Awards Page Styles ---
    awardsPage: {
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)',
      color: '#fff',
      padding: '100px 40px 40px 40px',
      position: 'relative',
      overflow: 'hidden'
    },
    awardsTitle: {
      fontSize: '3.5rem',
      fontWeight: '900',
      color: '#aaffaa',
      textAlign: 'center',
      marginBottom: '60px',
      textTransform: 'uppercase',
      letterSpacing: '4px',
      zIndex: 2,
      position: 'relative'
    },
    awardsContainer: {
      maxWidth: '1400px',
      margin: '0 auto',
      display: 'flex',
      gap: '40px',
      flexWrap: 'wrap',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 2
    },
    medalCard: {
      flex: 1,
      minWidth: '350px',
      maxWidth: '450px',
      backgroundColor: 'rgba(42, 42, 42, 0.8)',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 0 30px rgba(50, 205, 50, 0.3)',
      border: '2px solid rgba(50, 205, 50, 0.5)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    medalTitle: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: '#FFD700',
      textAlign: 'center',
      marginBottom: '15px',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    medalDescription: {
      fontSize: '0.95rem',
      color: '#ccc',
      textAlign: 'center',
      marginBottom: '12px',
      fontStyle: 'italic',
      lineHeight: '1.5'
    },
    medalCriteria: {
      fontSize: '0.85rem',
      color: '#32cd32',
      textAlign: 'center',
      marginBottom: '25px',
      fontWeight: 'bold',
      padding: '10px',
      backgroundColor: 'rgba(50, 205, 50, 0.1)',
      borderRadius: '6px',
      border: '1px solid rgba(50, 205, 50, 0.3)'
    },
    medalRecipients: {
      width: '100%',
      marginTop: '10px'
    },
    recipientsTitle: {
      fontSize: '1.1rem',
      color: '#aaffaa',
      textAlign: 'center',
      marginBottom: '15px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    recipientsList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    recipientItem: {
      padding: '10px',
      marginBottom: '8px',
      backgroundColor: 'rgba(50, 205, 50, 0.1)',
      borderRadius: '6px',
      textAlign: 'center',
      fontSize: '0.95rem',
      color: '#e0e0e0',
      border: '1px solid rgba(50, 205, 50, 0.2)'
    },
    noRecipients: {
      textAlign: 'center',
      fontStyle: 'italic',
      color: '#666',
      padding: '20px',
      fontSize: '0.9rem'
    }
  };

  // --- Render Intro Screen ---
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
              animation: 'twinkle 3s infinite'
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

  // --- Navigation Bar Component ---
  const Navbar = () => (
    <div style={styles.navbar}>
      <style>
        {`
          .nav-btn:hover {
            color: #32cd32;
            text-shadow: 0 0 10px #32cd32;
            transform: translateY(-2px);
          }
          .nav-btn.active {
            color: #32cd32;
            text-shadow: 0 0 10px #32cd32;
          }
        `}
      </style>
      <button 
        className={`nav-btn ${currentPage === 'home' ? 'active' : ''}`}
        style={styles.navButton}
        onClick={() => setCurrentPage('home')}
      >
        Home
      </button>
      <button 
        className={`nav-btn ${currentPage === 'timeline' ? 'active' : ''}`}
        style={styles.navButton}
        onClick={() => setCurrentPage('timeline')}
      >
        Timeline
      </button>
      <button 
        className={`nav-btn ${currentPage === 'record' ? 'active' : ''}`}
        style={styles.navButton}
        onClick={() => setCurrentPage('record')}
      >
        Record
      </button>
      <button 
        className={`nav-btn ${currentPage === 'awards' ? 'active' : ''}`}
        style={styles.navButton}
        onClick={() => setCurrentPage('awards')}
      >
        Awards
      </button>
    </div>
  );

  // --- Render Timeline Page ---
  if (currentPage === 'timeline') {
    const events = [
      { title: 'Founding of Viperia', side: 'left' },
      { title: 'The Era of Genesis', side: 'right' },
      { title: 'Great Ouroboros War', side: 'left' },
      { title: 'The Dark Ages', side: 'right' },
      { title: 'Ascension of WrathHydra and Start of the Modern Era', side: 'left' },
      { title: 'Domination of the Modern Age', side: 'right' }
    ];

    return (
      <>
        <Navbar />
        <div style={styles.timelinePage}>
          <style>
            {`
              @keyframes glow-pulse {
                0%, 100% { text-shadow: 0 0 10px #32cd32, 0 0 20px #32cd32; }
                50% { text-shadow: 0 0 20px #32cd32, 0 0 40px #32cd32, 0 0 60px #008000; }
              }
              .timeline-title-glow {
                animation: glow-pulse 2s infinite;
              }
            `}
          </style>
          
          {/* Static Stars */}
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
                zIndex: 1
              }}
            />
          ))}

          <h1 className="timeline-title-glow" style={styles.timelineTitle}>
            History of Viperia
          </h1>

          <div style={styles.timelineContainer}>
            <div style={styles.timelineLine}></div>
            
            {events.map((event, index) => (
              <div key={index} style={styles.timelineEvent}>
                <div style={styles.timelineDot}></div>
                {event.side === 'left' ? (
                  <>
                    <div style={styles.timelineContent}>
                      <h3 style={styles.timelineEventTitle}>{event.title}</h3>
                    </div>
                    <div style={{width: '45%'}}></div>
                  </>
                ) : (
                  <>
                    <div style={{width: '45%'}}></div>
                    <div style={styles.timelineContent}>
                      <h3 style={styles.timelineEventTitle}>{event.title}</h3>
                    </div>
                  </>
                )}
              </div>
            ))}

            <div style={styles.timelineEnd}>The story continues...</div>
          </div>
        </div>
      </>
    );
  }

  // --- Render Record Page ---
  if (currentPage === 'record') {
    return (
      <>
        <Navbar />
        <div style={styles.recordPage}>
          <style>
            {`
              @keyframes glow-pulse {
                0%, 100% { text-shadow: 0 0 10px #32cd32, 0 0 20px #32cd32; }
                50% { text-shadow: 0 0 20px #32cd32, 0 0 40px #32cd32, 0 0 60px #008000; }
              }
              .record-title-glow {
                animation: glow-pulse 2s infinite;
              }
            `}
          </style>
          
          {/* Static Stars */}
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
                zIndex: 1
              }}
            />
          ))}

          <h1 className="record-title-glow" style={styles.recordTitle}>
            Viperia Record
          </h1>

          <div style={styles.recordContainer}>
            
            {/* Raid Wins Section */}
            <div style={styles.recordSection}>
              <h2 style={styles.recordSectionTitle}>Raid Wins</h2>
              <table style={styles.recordTable}>
                <thead>
                  <tr>
                    <th style={styles.recordTableHeader}>Opponent</th>
                    <th style={styles.recordTableHeader}>Outcome</th>
                  </tr>
                </thead>
                <tbody>
                  {raidsData.length > 0 ? (
                    raidsData.map((raid, index) => (
                      <tr key={index} style={styles.recordTableRow}>
                        <td style={styles.recordTableCell}>{raid.OppName}</td>
                        <td style={{
                          ...styles.recordTableCell,
                          ...(raid.Outcome === 'W' ? styles.winCell : styles.lossCell)
                        }}>
                          {raid.Outcome === 'W' ? 'Win' : 'Loss'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" style={{...styles.recordTableCell, textAlign: 'center', fontStyle: 'italic', color: '#666'}}>
                        Loading Raid data...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Scrimmage Wins Section */}
            <div style={styles.recordSection}>
              <h2 style={styles.recordSectionTitle}>Scrimmage Wins</h2>
              <table style={styles.recordTable}>
                <thead>
                  <tr>
                    <th style={styles.recordTableHeader}>Opponent</th>
                    <th style={styles.recordTableHeader}>Score</th>
                    <th style={styles.recordTableHeader}>Outcome</th>
                  </tr>
                </thead>
                <tbody>
                  {scrimmagesData.length > 0 ? (
                    scrimmagesData.map((scrim, index) => (
                      <tr key={index} style={styles.recordTableRow}>
                        <td style={styles.recordTableCell}>{scrim.OppName}</td>
                        <td style={styles.recordTableCell}>
                          {scrim.VipereScore} - {scrim.OppScore}
                        </td>
                        <td style={{
                          ...styles.recordTableCell,
                          ...(scrim.Outcome === 'W' ? styles.winCell : styles.lossCell)
                        }}>
                          {scrim.Outcome === 'W' ? 'Win' : 'Loss'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" style={{...styles.recordTableCell, textAlign: 'center', fontStyle: 'italic', color: '#666'}}>
                        Loading Scrimmage data...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </>
    );
  }

  // --- Render Awards Page ---
  if (currentPage === 'awards') {
    const medals = [
      {
        title: 'Neurobite Crest',
        description: 'A mark awarded to operatives whose rapid-strike precision floods the battlefield with instant, surgical lethality.',
        criteria: 'Awarded to individuals who have achieved 20 or more kills in a single scrimmage',
        recipients: medal1Data
      },
      {
        title: 'Hydravenom Insignia',
        description: 'Bestowed upon those who unleash overwhelming, sustained venom--cutting down enemy ranks with relentless, multi-front devastation.',
        criteria: 'Awarded to individuals who have achieved 100 or more kills in a single raid',
        recipients: medal2Data
      },
      {
        title: 'Umbra Serpent',
        description: 'An elite, nearly mythic recognition for Viperes who perform with flawless lethality across all operations.',
        criteria: 'Awarded to the select few to earn the HydraVenom Insignia and Neurobite Crest',
        recipients: medal3Data
      }
    ];

    return (
      <>
        <Navbar />
        <div style={styles.awardsPage}>
          <style>
            {`
              @keyframes glow-pulse {
                0%, 100% { text-shadow: 0 0 10px #32cd32, 0 0 20px #32cd32; }
                50% { text-shadow: 0 0 20px #32cd32, 0 0 40px #32cd32, 0 0 60px #008000; }
              }
              .awards-title-glow {
                animation: glow-pulse 2s infinite;
              }
            `}
          </style>
          
          {/* Static Stars */}
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
                zIndex: 1
              }}
            />
          ))}

          <h1 className="awards-title-glow" style={styles.awardsTitle}>
            Viperia Awards
          </h1>

          <div style={styles.awardsContainer}>
            {medals.map((medal, index) => (
              <div key={index} style={styles.medalCard}>
                <h2 style={styles.medalTitle}>{medal.title}</h2>
                <p style={styles.medalDescription}>{medal.description}</p>
                <p style={styles.medalCriteria}>{medal.criteria}</p>
                
                <div style={styles.medalRecipients}>
                  <h3 style={styles.recipientsTitle}>Recipients</h3>
                  {medal.recipients && medal.recipients.length > 0 ? (
                    <ul style={styles.recipientsList}>
                      {medal.recipients.map((recipient, idx) => (
                        <li key={idx} style={styles.recipientItem}>
                          {recipient.username || recipient.name || recipient}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div style={styles.noRecipients}>
                      No recipients yet. Will you be the first?
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  // --- Render Landing Page ---
  return (
    <>
      <Navbar />
      <div style={styles.landingPage}>
        <style>
          {`
            .kingdom-title {
              color: #aaffaa; 
              text-shadow: 0 0 10px rgba(0, 255, 0, 0.8), 
                           0 0 20px rgba(0, 255, 0, 0.6);
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

        {/* Static Stars */}
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
              zIndex: 1
            }}
          />
        ))}

        <h1 
          style={styles.landingTitle}
          className="kingdom-title"
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
    </>
  );
}