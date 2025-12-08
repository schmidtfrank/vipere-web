const LoginPopup = ({ show, onClose, onSubmit, username, setUsername, password, setPassword, error }) => {
  if (!show) return null;

  const styles = {
    popupOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 200
    },
    popupContainer: {
      backgroundColor: '#1a1a1a',
      padding: '40px',
      borderRadius: '12px',
      border: '2px solid #32cd32',
      boxShadow: '0 0 40px rgba(50, 205, 50, 0.5)',
      minWidth: '350px'
    },
    popupTitle: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: '#32cd32',
      textAlign: 'center',
      marginBottom: '25px',
      textTransform: 'uppercase'
    },
    popupForm: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    },
    popupInput: {
      padding: '12px',
      backgroundColor: '#2a2a2a',
      border: '1px solid #444',
      borderRadius: '6px',
      color: '#fff',
      fontSize: '1rem'
    },
    popupButton: {
      padding: '12px',
      backgroundColor: '#32cd32',
      border: 'none',
      borderRadius: '6px',
      color: '#000',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '10px',
      transition: 'all 0.3s ease'
    },
    popupError: {
      color: '#ff4444',
      textAlign: 'center',
      fontSize: '0.9rem',
      marginTop: '10px'
    },
    popupClose: {
      marginTop: '15px',
      padding: '10px',
      backgroundColor: 'transparent',
      border: '1px solid #666',
      borderRadius: '6px',
      color: '#999',
      cursor: 'pointer',
      fontSize: '0.9rem'
    }
  };

  return (
    <div style={styles.popupOverlay} onClick={onClose}>
      <style>
        {`
          .popup-btn:hover {
            backgroundColor: #28a828;
          }
        `}
      </style>
      <div style={styles.popupContainer} onClick={(e) => e.stopPropagation()}>
        <h2 style={styles.popupTitle}>Admin Login</h2>
        <form style={styles.popupForm} onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.popupInput}
            autoComplete="username"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.popupInput}
            autoComplete="current-password"
            required
          />
          <button type="submit" style={styles.popupButton} className="popup-btn">
            Login
          </button>
          {error && <div style={styles.popupError}>{error}</div>}
        </form>
        <button type="button" style={styles.popupClose} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;