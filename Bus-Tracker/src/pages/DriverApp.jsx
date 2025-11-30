import { useState, useEffect } from 'react';
import { socket } from '../socket';

// --- REAL ROUTE DATA (IIT Ropar Area) ---
const ROUTE_DATA = [
  { lat: 30.9664, lng: 76.5331, stop: 'Hostel Main Gate' },
  { lat: 30.9668, lng: 76.5335, stop: '' }, // Moving...
  { lat: 30.9672, lng: 76.5340, stop: 'Brahmaputra Hostel' },
  { lat: 30.9676, lng: 76.5345, stop: '' },
  { lat: 30.9680, lng: 76.5350, stop: 'Sports Complex' },
  { lat: 30.9685, lng: 76.5355, stop: '' },
  { lat: 30.9690, lng: 76.5360, stop: 'Lecture Hall Complex' },
  { lat: 30.9695, lng: 76.5365, stop: '' },
  { lat: 30.9700, lng: 76.5370, stop: 'Central Library' },
  { lat: 30.9705, lng: 76.5375, stop: '' },
  { lat: 30.9710, lng: 76.5380, stop: 'CSE Department' },
  { lat: 30.9715, lng: 76.5385, stop: '' },
  { lat: 30.9720, lng: 76.5390, stop: 'Admin Block' },
  { lat: 30.9725, lng: 76.5395, stop: '' },
  { lat: 30.9730, lng: 76.5400, stop: 'Main Exit Gate' }
];

function DriverApp() {
  const [isDriving, setIsDriving] = useState(false);
  const [currentStop, setCurrentStop] = useState('Not Started');
  
  useEffect(() => {
    let interval;
    let index = 0;

    if (isDriving) {
      interval = setInterval(() => {
        // 1. Get current point
        const point = ROUTE_DATA[index];
        
        // 2. Send to Server
        socket.emit('sendLocation', {
          busId: 'bus1',
          lat: point.lat,
          lng: point.lng,
          driverName: 'Ramesh Singh',
          nextStop: point.stop || 'Moving to next stop...'
        });

        // 3. Update UI
        if(point.stop) setCurrentStop(point.stop);

        // 4. Move to next point (Loop)
        index = (index + 1) % ROUTE_DATA.length;
        
      }, 2000); // 2 Seconds speed
    }

    return () => clearInterval(interval);
  }, [isDriving]);

  return (
    <div className="container">
      <div className="card">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h2 style={{margin:0}}>👨‍✈️ Driver Console</h2>
          <div style={{
            width: 15, height: 15, borderRadius: '50%', 
            background: isDriving ? '#4ade80' : '#f87171',
            boxShadow: '0 0 10px currentColor'
          }}></div>
        </div>

        <p style={{color:'#888', fontSize: 14}}>Bus ID: PB-12-T-8822</p>

        <div className="status-box">
          <p style={{fontSize: 12, textTransform:'uppercase', color:'#888', margin:0}}>Next Stop</p>
          <h1 style={{margin:'5px 0', color: '#fbbf24'}}>{currentStop}</h1>
          <p style={{fontSize: 12, color:'#666', margin:0}}>GPS Signal: Strong</p>
        </div>

        <button 
          onClick={() => setIsDriving(!isDriving)}
          className={`btn-primary ${isDriving ? 'btn-stop' : 'btn-start'}`}
        >
          {isDriving ? 'STOP TRIP ⏹' : 'START TRIP ▶'}
        </button>

      </div>
    </div>
  );
}

export default DriverApp;