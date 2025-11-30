import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { socket } from '../socket';

function BusList() {
  const [searchParams] = useSearchParams();
  const route = searchParams.get('route');
  const [buses, setBuses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit('getBuses', route);
    socket.on('busList', (data) => setBuses(data));
    return () => socket.off('busList');
  }, [route]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Available Buses on: {route}</h2>
      
      {buses.length === 0 && <p>No buses active right now.</p>}

      {buses.map((bus) => (
        <div 
          key={bus.id} 
          onClick={() => navigate(`/track/${bus.id}`)}
          style={{ 
            border: '1px solid #ddd', padding: '15px', margin: '10px auto', 
            maxWidth: '300px', cursor: 'pointer', borderRadius: '8px', 
            background: '#f9f9f9', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <h3>🚌 {bus.number}</h3>
          <p>Driver: <b>{bus.driver}</b></p>
          <small style={{ color: 'green', fontWeight: 'bold' }}>Click to Track Live</small>
        </div>
      ))}
    </div>
  );
}

export default BusList;