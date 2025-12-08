import React, { useState, useEffect } from 'react';

const medalOptions = [
  'Neurobite Crest',
  'Hydravenom Insignia',
  'The Umbral Serpent Absolutum'
];

const InsertMedal = () => {
  const [vipereMembers, setVipereMembers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedMedal, setSelectedMedal] = useState('Neurobite Crest');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Vipere members for username dropdown
    fetch('http://localhost:8000/vipere')
      .then(res => res.json())
      .then(data => {
        setVipereMembers(data);
        if (data.length > 0) {
          setSelectedUser(data[0].username);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching Vipere members:', err);
        setMessage('Failed to load Vipere members');
        setLoading(false);
      });
  }, []);

  const handleSubmit = async () => {
    if (!selectedUser) {
      setMessage('Please select a user');
      return;
    }

    setMessage('Submitting...');

    const medalData = {
      user: selectedUser,
      medal: selectedMedal
    };

    try {
      const response = await fetch('http://localhost:8000/medal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(medalData)
      });

      if (response.ok) {
        setMessage('Medal successfully awarded!');
        // Reset to first user after successful submission
        if (vipereMembers.length > 0) {
          setSelectedUser(vipereMembers[0].username);
        }
        setSelectedMedal('Neurobite Crest');
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || 'Failed to award medal.'}`);
      }
    } catch (error) {
      console.error('Medal POST error:', error);
      setMessage('Failed to connect to server for medal recording.');
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

  if (loading) {
    return (
      <div style={formStyle}>
        <h2 style={{ textAlign: 'center', color: '#32cd32' }}>Insert Medal</h2>
        <p style={{ textAlign: 'center' }}>Loading Vipere members...</p>
      </div>
    );
  }

  if (vipereMembers.length === 0) {
    return (
      <div style={formStyle}>
        <h2 style={{ textAlign: 'center', color: '#32cd32' }}>Insert Medal</h2>
        <p style={{ textAlign: 'center', color: '#ff4d4d' }}>No Vipere members found</p>
      </div>
    );
  }

  return (
    <div style={formStyle}>
      <h2 style={{ textAlign: 'center', color: '#32cd32' }}>Insert Medal</h2>
      <div>
        <label style={labelStyle}>Select User:</label>
        <select 
          value={selectedUser} 
          onChange={(e) => setSelectedUser(e.target.value)} 
          required 
          style={selectStyle}
        >
          {vipereMembers.map((member) => (
            <option key={member.username} value={member.username}>
              {member.username}
            </option>
          ))}
        </select>

        <label style={labelStyle}>Select Medal:</label>
        <select 
          value={selectedMedal} 
          onChange={(e) => setSelectedMedal(e.target.value)} 
          required 
          style={selectStyle}
        >
          {medalOptions.map((medal) => (
            <option key={medal} value={medal}>
              {medal}
            </option>
          ))}
        </select>

        <button onClick={handleSubmit} style={{ ...buttonStyle, marginTop: '20px' }}>
          Award Medal
        </button>
      </div>
      {message && <p style={{ textAlign: 'center', marginTop: '15px' }}>{message}</p>}
    </div>
  );
};

export default InsertMedal;