import React, { useState } from 'react';

const InsertRaid = () => {
  const [opponent, setOpponent] = useState('');
  const [isWin, setIsWin] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Submitting...');
    
    const raidData = {
      opponent: opponent,
      outcome: isWin ? 'W' : 'L'
    };

    try {
      const response = await fetch('http://localhost:8000/raid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(raidData)
      });

      if (response.ok) {
        setMessage('Raid successfully recorded!');
        setOpponent('');
        setIsWin(false);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || 'Failed to record raid.'}`);
      }
    } catch (error) {
      console.error('Raid POST error:', error);
      setMessage('Failed to connect to server for raid recording.');
    }
  };

  const formStyle = { 
      maxWidth: '500px', margin: '0 auto', padding: '20px', 
      backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px', 
      color: '#fff' 
  };
  const inputStyle = { width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: 'none' };
  const labelStyle = { display: 'block', margin: '10px 0 5px 0', fontWeight: 'bold' };
  const buttonStyle = { padding: '10px 20px', backgroundColor: '#32cd32', color: '#090A0F', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', display:'block', width:'100%' };

  return (
    <div style={formStyle}>
      <h2 style={{ textAlign: 'center', color: '#32cd32' }}>Insert Raid Result</h2>
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Opponent:</label>
        <input 
          type="text" 
          value={opponent} 
          onChange={(e) => setOpponent(e.target.value)} 
          required 
          style={inputStyle} 
        />
        
        <label style={labelStyle}>Outcome:</label>
        <input 
          type="checkbox" 
          checked={isWin} 
          onChange={(e) => setIsWin(e.target.checked)} 
          style={{ transform: 'scale(1.5)', margin: '0 10px' }}
        />
        <span style={{ color: isWin ? '#32cd32' : '#ff4d4d' }}>{isWin ? 'Win' : 'Loss'}</span>
        
        <button type="submit" style={{ ...buttonStyle, marginTop: '20px' }}>Record Raid</button>
      </form>
      {message && <p style={{ textAlign: 'center', marginTop: '15px' }}>{message}</p>}
    </div>
  );
};

export default InsertRaid;