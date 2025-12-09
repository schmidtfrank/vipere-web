import React, { useState, useEffect } from 'react';

const DeleteMenu = () => {
  const [deleteType, setDeleteType] = useState('raid');
  const [raids, setRaids] = useState([]);
  const [scrimmages, setScrimmages] = useState([]);
  const [selectedMedalType, setSelectedMedalType] = useState(1);
  const [medalRecipients, setMedalRecipients] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const medalTypes = [
    { id: 1, name: 'Neurobite Crest' },
    { id: 2, name: 'Hydravenom Insignia' },
    { id: 3, name: 'Umbra Serpent' }
  ];

  // Fetch data based on delete type
  useEffect(() => {
    setSelectedItem('');
    setMessage('');
    setLoading(true);

    if (deleteType === 'raid') {
      fetch('http://localhost:8000/raids')
        .then(res => res.json())
        .then(data => {
          setRaids(data);
          if (data.length > 0) {
            setSelectedItem(JSON.stringify(data[0]));
          }
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching raids:', err);
          setMessage('Failed to load raids');
          setLoading(false);
        });
    } else if (deleteType === 'scrimmage') {
      fetch('http://localhost:8000/scrimmages')
        .then(res => res.json())
        .then(data => {
          setScrimmages(data);
          if (data.length > 0) {
            setSelectedItem(JSON.stringify(data[0]));
          }
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching scrimmages:', err);
          setMessage('Failed to load scrimmages');
          setLoading(false);
        });
    } else if (deleteType === 'medal') {
      fetchMedalRecipients(selectedMedalType);
    }
  }, [deleteType]);

  // Fetch medal recipients when medal type changes
  useEffect(() => {
    if (deleteType === 'medal') {
      fetchMedalRecipients(selectedMedalType);
    }
  }, [selectedMedalType]);

  const fetchMedalRecipients = (medalId) => {
    setLoading(true);
    setSelectedItem('');
    fetch(`http://localhost:8000/medal/${medalId}`)
      .then(res => res.json())
      .then(data => {
        setMedalRecipients(data);
        if (data.length > 0) {
          setSelectedItem(JSON.stringify(data[0]));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching medal recipients:', err);
        setMessage('Failed to load medal recipients');
        setLoading(false);
      });
  };

  const handleDelete = async () => {
    if (!selectedItem) {
      setMessage('Please select an item to delete');
      return;
    }

    setMessage('Deleting...');

    try {
      const itemData = JSON.parse(selectedItem);
      let deleteData;
      
      if (deleteType === 'medal') {
        // For medals, send user as string and medal id
        deleteData = {
          user: itemData.name,
          medal: selectedMedalType
        };
      } else if (deleteType === 'raid') {
        // For raids, send RaidID
        deleteData = {
          RaidID: itemData.RaidID
        };
      } else if (deleteType === 'scrimmage') {
        // For scrimmages, send ScrimID
        deleteData = {
          ScrimID: itemData.ScrimID
        };
      }

      const response = await fetch(`http://localhost:8000/delete/${deleteType}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deleteData)
      });

      if (response.ok) {
        setMessage(`${deleteType.charAt(0).toUpperCase() + deleteType.slice(1)} successfully deleted!`);
        
        // Refresh the data after deletion
        if (deleteType === 'raid') {
          const updatedRaids = raids.filter(r => JSON.stringify(r) !== selectedItem);
          setRaids(updatedRaids);
          if (updatedRaids.length > 0) {
            setSelectedItem(JSON.stringify(updatedRaids[0]));
          } else {
            setSelectedItem('');
          }
        } else if (deleteType === 'scrimmage') {
          const updatedScrims = scrimmages.filter(s => JSON.stringify(s) !== selectedItem);
          setScrimmages(updatedScrims);
          if (updatedScrims.length > 0) {
            setSelectedItem(JSON.stringify(updatedScrims[0]));
          } else {
            setSelectedItem('');
          }
        } else if (deleteType === 'medal') {
          const updatedRecipients = medalRecipients.filter(m => JSON.stringify(m) !== selectedItem);
          setMedalRecipients(updatedRecipients);
          if (updatedRecipients.length > 0) {
            setSelectedItem(JSON.stringify(updatedRecipients[0]));
          } else {
            setSelectedItem('');
          }
        }
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || 'Failed to delete.'}`);
      }
    } catch (error) {
      console.error('Delete error:', error);
      setMessage('Failed to connect to server for deletion.');
    }
  };

  const formStyle = { 
    maxWidth: '600px', 
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
    backgroundColor: '#ff4d4d', 
    color: '#fff', 
    border: 'none', 
    borderRadius: '4px', 
    cursor: 'pointer', 
    fontWeight: 'bold', 
    display: 'block', 
    width: '100%' 
  };

  const toggleStyle = (type) => ({
    padding: '10px 20px',
    margin: '5px',
    cursor: 'pointer',
    backgroundColor: deleteType === type ? '#32cd32' : 'rgba(255, 255, 255, 0.2)',
    color: deleteType === type ? '#090A0F' : '#fff',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease'
  });

  const renderItemDisplay = (item) => {
    if (deleteType === 'raid') {
      return `${item.OppName} - ${item.Outcome === 'W' ? 'Win' : 'Loss'}`;
    } else if (deleteType === 'scrimmage') {
      return `${item.OppName} - Vipere ${item.VipereScore} : ${item.OppScore} Opponent (${item.Outcome === 'W' ? 'Win' : 'Loss'})`;
    } else if (deleteType === 'medal') {
      return item.name;
    }
    return '';
  };

  const getCurrentList = () => {
    if (deleteType === 'raid') return raids;
    if (deleteType === 'scrimmage') return scrimmages;
    if (deleteType === 'medal') return medalRecipients;
    return [];
  };

  return (
    <div style={formStyle}>
      <h2 style={{ textAlign: 'center', color: '#ff4d4d' }}>Delete Menu</h2>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <button style={toggleStyle('raid')} onClick={() => setDeleteType('raid')}>
          Raid
        </button>
        <button style={toggleStyle('scrimmage')} onClick={() => setDeleteType('scrimmage')}>
          Scrimmage
        </button>
        <button style={toggleStyle('medal')} onClick={() => setDeleteType('medal')}>
          Medal
        </button>
      </div>

      {deleteType === 'medal' && (
        <>
          <label style={labelStyle}>Medal Type:</label>
          <select 
            value={selectedMedalType} 
            onChange={(e) => setSelectedMedalType(parseInt(e.target.value))} 
            style={selectStyle}
          >
            {medalTypes.map((medal) => (
              <option key={medal.id} value={medal.id}>
                {medal.name}
              </option>
            ))}
          </select>
        </>
      )}

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : getCurrentList().length === 0 ? (
        <p style={{ textAlign: 'center', color: '#ffaa00' }}>
          No {deleteType}s found to delete
        </p>
      ) : (
        <>
          <label style={labelStyle}>
            Select {deleteType.charAt(0).toUpperCase() + deleteType.slice(1)} to Delete:
          </label>
          <select 
            value={selectedItem} 
            onChange={(e) => setSelectedItem(e.target.value)} 
            style={selectStyle}
          >
            {getCurrentList().map((item, index) => (
              <option key={index} value={JSON.stringify(item)}>
                {renderItemDisplay(item)}
              </option>
            ))}
          </select>

          <button onClick={handleDelete} style={{ ...buttonStyle, marginTop: '20px' }}>
            Delete {deleteType.charAt(0).toUpperCase() + deleteType.slice(1)}
          </button>
        </>
      )}

      {message && <p style={{ textAlign: 'center', marginTop: '15px' }}>{message}</p>}
    </div>
  );
};

export default DeleteMenu;