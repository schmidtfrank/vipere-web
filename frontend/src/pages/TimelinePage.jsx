import StarsBackground from "./PageComponents/StarsBackground";

const TimelinePage = ({ stars }) => {
  const events = [
    { title: 'Founding of Viperia', side: 'left' },
    { title: 'The Era of Genesis', side: 'right' },
    { title: 'Great Ouroboros War', side: 'left' },
    { title: 'The Dark Ages', side: 'right' },
    { title: 'Ascension of WrathHydra and Start of the Modern Era', side: 'left' },
    { title: 'Domination of the Modern Age', side: 'right' }
  ];

  const styles = {
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
    }
  };

  return (
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
      
      <StarsBackground stars={stars} />

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
  );
};

export default TimelinePage;