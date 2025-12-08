import DeathVipereImg from "./photos/deathvipere.png";
import VipereLogoImg from "./photos/viperelogo.png";
import WrathHydraImg from "./photos/wrathhydra.png";

import StarsBackground from "./PageComponents/StarsBackground";

const LandingPage = ({ stars, vipereData, hydrasData }) => {
  const styles = {
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
    }
  };

  return (
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

      <StarsBackground stars={stars} />

      <h1 style={styles.landingTitle} className="kingdom-title">
        Kingdom of Viperia
      </h1>
      
      <div style={styles.contentRow}>
        <div style={styles.column}>
          <img src={DeathVipereImg} alt="Death Vipere" style={styles.columnImage} />
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

        <div style={{...styles.column, ...styles.logoColumn}}>
          <img src={VipereLogoImg} alt="Vipere Logo" style={{...styles.columnImage, width: '250px', height: '250px'}} />
        </div>

        <div style={styles.column}>
          <img src={WrathHydraImg} alt="Wrath Hydra" style={styles.columnImage} />
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
};

export default LandingPage;