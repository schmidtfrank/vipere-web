import { useState, useEffect } from 'react';

export default function App() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showQuote, setShowQuote] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [stars, setStars] = useState([]);

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

    fetch('http://localhost:8000/quote')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Quote received:', data);
        setQuote(data);
        setLoading(false);
        
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            setShowQuote(false);
          }, 1000);
        }, 4000);
      })
      .catch(error => {
        console.error('Error fetching quote:', error);
        setQuote({ text: 'Error loading quote', author: error.message });
        setLoading(false);
      });
  }, []);

  const styles = {
    quoteScreen: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: fadeOut ? 0 : 1,
      transition: 'opacity 1s ease-in-out',
      overflow: 'hidden'
    },
    star: {
      position: 'absolute',
      backgroundColor: '#fff',
      borderRadius: '50%',
      animation: 'twinkle 3s infinite'
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
    landingPage: {
      minHeight: '100vh',
      backgroundColor: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    landingTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#111'
    }
  };

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
              animationDelay: star.animationDelay
            }}
          />
        ))}
        <div style={styles.quoteContainer}>
          {loading ? (
            <div style={{ color: '#fff', fontSize: '1.25rem' }}>Loading...</div>
          ) : quote ? (
            <>
              <p style={styles.quoteText}>
                "{quote.text}"
              </p>
              <p style={styles.quoteAuthor}>
                — {quote.author}
              </p>
            </>
          ) : (
            <div style={{ color: '#fff', fontSize: '1.25rem' }}>Failed to load quote</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.landingPage}>
      <h1 style={styles.landingTitle}>Landing Page</h1>
    </div>
  );
}