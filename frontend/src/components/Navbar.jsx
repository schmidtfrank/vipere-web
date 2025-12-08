const Navbar = ({ currentPage, setCurrentPage }) => {
  const styles = {
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
    }
  };

  return (
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
};

export default Navbar;