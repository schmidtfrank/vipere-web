import React, { useState } from 'react';

const scoreOptions = Array.from({ length: 10 }, (_, i) => i);

const InsertScrimmage = () => {
  const [opponentName, setOpponentName] = useState('');
  const [opponentScore, setOpponentScore] = useState(0);
  const [vipereScore, setVipereScore] = useState(0);
  const [isWin, setIsWin] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Submitting...');

    const scrimmageData = {
      opponentName: opponentName.trim(),
      opponentScore: parseInt(opponentScore, 10),
      vipereScore: parseInt(vipereScore, 10),
      outcome: isWin ? 'W' : 'L'
    };

    try {
      const response = await fetch('http://localhost:8000/scrimmage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scrimmageData)
      });

      if (response.ok) {
        setMessage('Scrimmage successfully recorded!');
        setOpponentName('');
        setOpponentScore(0);
        setVipereScore(0);
        setIsWin(false);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || 'Failed to record scrimmage.'}`);
      }
    } catch (error) {
      console.error('Scrimmage POST error:', error);
      setMessage('Failed to connect to server for scrimmage recording.');
    }
  };

  const formStyle = { 
    maxWidth: '500px', 
    margin: '0 auto', 
    padding: '20px', 
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    borderRadius: '8px', 
    color: '#fff' 
  };

  const inputStyle = { 
    width: '100%', 
    padding: '10px', 
    margin: '10px 0', 
    borderRadius: '4px', 
    border: 'none',
    boxSizing: 'border-box'
  };

  const selectStyle = { 
    width: '100%', 
    padding: '10px', 
    margin: '10px 0', 
    borderRadius: '4px', 
    border: 'none' 
  };

  const labelStyle = { 
    display: 'block', 
    margin: '10px 0 5px 0', 
    fontWeight: 'bold' 
  };

  const buttonStyle = { 
    padding: '10px 20px', 
    backgroundColor: '#32cd32', 
    color: '#090A0F', 
    border: 'none', 
    borderRadius: '4px', 
    cursor: 'pointer', 
    fontWeight: 'bold', 
    display: 'block', 
    width: '100%' 
  };

  return (
    <div style={formStyle}>
      <h2 style={{ textAlign: 'center', color: '#32cd32' }}>Insert Scrimmage Result</h2>
      <div onSubmit={handleSubmit}>
        <label style={labelStyle}>Opponent Name:</label>
        <input 
          type="text"
          value={opponentName} 
          onChange={(e) => setOpponentName(e.target.value)} 
          placeholder="Enter opponent team name"
          required 
          style={inputStyle}
        />

        <label style={labelStyle}>Opponent Score (0-9):</label>
        <select 
          value={opponentScore} 
          onChange={(e) => setOpponentScore(e.target.value)} 
          required 
          style={selectStyle}
        >
          {scoreOptions.map(score => <option key={score} value={score}>{score}</option>)}
        </select>

        <label style={labelStyle}>Vipere Score (0-9):</label>
        <select 
          value={vipereScore} 
          onChange={(e) => setVipereScore(e.target.value)} 
          required 
          style={selectStyle}
        >
          {scoreOptions.map(score => <option key={score} value={score}>{score}</option>)}
        </select>

        <label style={labelStyle}>Outcome (Check if won)</label>
        <input 
          type="checkbox" 
          checked={isWin} 
          onChange={(e) => setIsWin(e.target.checked)} 
          style={{ transform: 'scale(1.5)', margin: '0 10px' }}
        />
        <span style={{ color: isWin ? '#32cd32' : '#ff4d4d' }}>{isWin ? 'Win' : 'Loss'}</span>

        <button onClick={handleSubmit} style={{ ...buttonStyle, marginTop: '20px' }}>Record Scrimmage</button>
      </div>
      {message && <p style={{ textAlign: 'center', marginTop: '15px' }}>{message}</p>}
    </div>
  );
};

export default InsertScrimmage;