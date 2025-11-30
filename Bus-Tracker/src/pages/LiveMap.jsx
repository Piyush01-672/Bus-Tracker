import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { socket } from '../socket';
import 'leaflet/dist/leaflet.css';

function RecenterMap({ lat, lng }) {
  const map = useMap();
  useEffect(() => { map.setView([lat, lng]); }, [lat, lng]);
  return null;
}

function LiveMap() {
  const { busId } = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState({ lat: 30.9664, lng: 76.5331 });
  const [info, setInfo] = useState({ nextStop: 'Connecting...', driver: 'Unknown' });

  useEffect(() => {
    socket.emit('joinBus', busId);
    socket.on('receiveLocation', (data) => {
      setLocation({ lat: data.lat, lng: data.lng });
      if(data.nextStop) setInfo({ nextStop: data.nextStop, driver: data.driverName });
    });
    return () => socket.off('receiveLocation');
  }, [busId]);

  return (
    // FIX: 'fixed' position taaki ye Home page ke styles se affect na ho
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      zIndex: 9999, // Sabse upar
      background: '#fff' 
    }}>
      
      {/* Top Left Controls */}
      <div style={{ 
        position: 'absolute', top: 20, left: 20, zIndex: 10000, 
        display: 'flex', gap: '10px', alignItems: 'flex-start' 
      }}>
        
        <button onClick={() => navigate(-1)} style={{
          background: '#000', color: 'white', padding: '10px 20px', 
          border: '1px solid #444', borderRadius: '8px', cursor: 'pointer', 
          fontWeight: 'bold', boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
        }}>
          ⬅ Back
        </button>

        <div style={{
          background: 'rgba(255, 255, 255, 0.9)', padding: '10px 20px', 
          borderRadius: '8px', border: '1px solid #ccc',
          boxShadow: '0 4px 6px rgba(0,0,0,0.2)', minWidth: '150px'
        }}>
          <div style={{ fontSize: '10px', color: '#666', textTransform: 'uppercase' }}>NEXT STOP</div>
          <div style={{ fontWeight: 'bold', color: '#d97706', fontSize: '14px' }}>{info.nextStop}</div>
          <div style={{ fontSize: '12px', color: '#2563eb', marginTop: '2px' }}>Driver: {info.driver}</div>
        </div>

      </div>

      <MapContainer center={[location.lat, location.lng]} zoom={16} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[location.lat, location.lng]}>
          <Popup>Bus is Here!</Popup>
        </Marker>
        <RecenterMap lat={location.lat} lng={location.lng} />
      </MapContainer>
    </div>
  );
}

export default LiveMap;