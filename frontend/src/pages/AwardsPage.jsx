import StarsBackground from "./PageComponents/StarsBackground";

const AwardsPage = ({ stars, medal1Data, medal2Data, medal3Data }) => {
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
      title: 'The Umbral Serpent Absolutum',
      description: 'An elite, nearly mythic recognition for Viperes who perform with flawless lethality across all operations.',
      criteria: 'Awarded to the select few to earn the HydraVenom Insignia and Neurobite Crest',
      recipients: medal3Data
    }
  ];

  const styles = {
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

  return (
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
      
      <StarsBackground stars={stars} />

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
  );
};

export default AwardsPage;