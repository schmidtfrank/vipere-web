import React from 'react';
import InsertRaid from './PageComponents/InsertRaid';
import InsertScrimmage from './PageComponents/InsertScrimmage';
import InsertMedal from './PageComponents/InsertMedal';


const AdminPage = ({ stars, currentAdminPage, setCurrentAdminPage }) => {
  
  const backgroundStyle = {
    background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)', 
    minHeight: '100vh', 
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
    paddingTop: '60px'
  };

  const starStyle = {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: '50%',
  };
  
  const adminNavStyle = {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderBottom: '1px solid #32cd32',
    position: 'relative',
    zIndex: 2 
  };

  const navItemStyle = (page) => ({
    padding: '10px 20px',
    margin: '0 10px',
    cursor: 'pointer',
    color: currentAdminPage === page ? '#32cd32' : '#aaffaa',
    borderBottom: currentAdminPage === page ? '2px solid #32cd32' : '2px solid transparent',
    fontWeight: currentAdminPage === page ? 'bold' : 'normal',
    transition: 'all 0.3s ease'
  });

  return (
    <div style={backgroundStyle}> {}
      <style>
        {`
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
        `}
      </style>
      
      {}
      {stars.map((star, i) => (
        <div
          key={i}
          style={{
            ...starStyle,
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: star.animationDelay,
            animation: 'twinkle 3s infinite',
            zIndex: 1 
          }}
        />
      ))}
      
      {}
      <div style={{ position: 'relative', zIndex: 3, paddingBottom: '40px' }}>
          <div style={adminNavStyle}>
            <div style={navItemStyle('insert-raid')} onClick={() => setCurrentAdminPage('insert-raid')}>
              INSERT RAID
            </div>
            <div style={navItemStyle('insert-scrimmage')} onClick={() => setCurrentAdminPage('insert-scrimmage')}>
              INSERT SCRIMMAGE
            </div>
            <div style={navItemStyle('insert-medal')} onClick={() => setCurrentAdminPage('insert-medal')}>
              INSERT MEDAL
            </div>
          </div>
          
          {}
          <div style={{ padding: '40px' }}>
            {currentAdminPage === 'insert-raid' && <InsertRaid />}
            {currentAdminPage === 'insert-scrimmage' && <InsertScrimmage />}
            {currentAdminPage === 'insert-medal' && <InsertMedal />}
          </div>
      </div>
    </div>
  );
};

export default AdminPage;