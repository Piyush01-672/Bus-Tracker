import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { socket } from '../socket';
import 'leaflet/dist/leaflet.css';

function RecenterMap({ lat, lng }) {
  const map = useMap();
  useEffect(() => map.setView([lat, lng]), [lat, lng]);
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
    <div style={{height:'100vh', width:'100%', position:'relative'}}>
      
      {/* Floating Info Box */}
      <div style={{
        position:'absolute', top: 20, right: 20, zIndex: 999,
        background: 'rgba(255,255,255,0.9)', padding: '15px', borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)', color: '#333', minWidth: '200px'
      }}>
        <h3 style={{margin:0, color:'#2563eb'}}>Live Tracking</h3>
        <p style={{margin:'5px 0 0 0', fontSize:'14px'}}>Driver: <b>{info.driver}</b></p>
        <p style={{margin:0, fontSize:'14px'}}>Next Stop: <b style={{color:'#d97706'}}>{info.nextStop}</b></p>
      </div>

      <button onClick={() => navigate(-1)} style={{
        position:'absolute', top: 20, left: 20, zIndex: 999,
        padding:'10px 20px', background:'#333', color:'white', border:'none', borderRadius:'8px', cursor:'pointer'
      }}>⬅ Back</button>

      <MapContainer center={[location.lat, location.lng]} zoom={16} style={{ height: '100%', width: '100%' }}>
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