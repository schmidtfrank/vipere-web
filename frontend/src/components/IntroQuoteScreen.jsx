const IntroQuoteScreen = ({ quote, loading, fadeOut, stars }) => {
  const styles = {
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
    }
  };

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
};

export default IntroQuoteScreen;