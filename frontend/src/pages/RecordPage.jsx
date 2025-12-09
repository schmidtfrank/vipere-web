import { useState, useEffect } from 'react';
import StarsBackground from "./PageComponents/StarsBackground";

const RecordPage = ({ stars, raidsData, scrimmagesData }) => {
  const [raidWinLoss, setRaidWinLoss] = useState({ wins: 0, losses: 0 });
  const [scrimWinLoss, setScrimWinLoss] = useState({ wins: 0, losses: 0 });

  useEffect(() => {
    // Fetch raid win/loss data
    fetch('http://localhost:8000/win_loss/raid')
      .then(res => res.json())
      .then(data => setRaidWinLoss(data))
      .catch(err => console.error('Error fetching raid win/loss:', err));

    // Fetch scrimmage win/loss data
    fetch('http://localhost:8000/win_loss/scrimmage')
      .then(res => res.json())
      .then(data => setScrimWinLoss(data))
      .catch(err => console.error('Error fetching scrimmage win/loss:', err));
  }, [raidsData, scrimmagesData]);

  const styles = {
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
    winLossCounter: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '20px'
    },
    winText: {
      color: '#32cd32'
    },
    lossText: {
      color: '#ff4444'
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
    }
  };

  return (
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
      
      <StarsBackground stars={stars} />

      <h1 className="record-title-glow" style={styles.recordTitle}>
        Viperia Record
      </h1>

      <div style={styles.recordContainer}>
        <div style={styles.recordSection}>
          <h2 style={styles.recordSectionTitle}>Raid Record</h2>
          <div style={styles.winLossCounter}>
            <span style={styles.winText}>{raidWinLoss.wins}</span>
            <span style={{ color: '#fff' }}> - </span>
            <span style={styles.lossText}>{raidWinLoss.losses}</span>
          </div>
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

        <div style={styles.recordSection}>
          <h2 style={styles.recordSectionTitle}>Scrimmage Record</h2>
          <div style={styles.winLossCounter}>
            <span style={styles.winText}>{scrimWinLoss.wins}</span>
            <span style={{ color: '#fff' }}> - </span>
            <span style={styles.lossText}>{scrimWinLoss.losses}</span>
          </div>
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
  );
};

export default RecordPage;