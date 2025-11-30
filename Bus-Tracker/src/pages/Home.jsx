import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [route, setRoute] = useState('Hostel-Campus');
  const navigate = useNavigate();

  return (
    <div className="container">
      
      {/* Background Blobs for Visual Effect */}
      <div style={{
        position:'absolute', top:'10%', left:'10%', width:'300px', height:'300px',
        background:'rgba(37, 99, 235, 0.2)', borderRadius:'50%', filter:'blur(80px)', zIndex:-1
      }}></div>

      <div className="card">
        <span style={{
          background:'rgba(96, 165, 250, 0.2)', color:'#60a5fa', 
          padding:'4px 10px', borderRadius:'20px', fontSize:'12px', fontWeight:'bold'
        }}>
          IIT ROPAR TRANSIT
        </span>
        
        <h1 className="title">NaviBus</h1>
        <p style={{color:'#ccc', marginBottom:'30px'}}>Real-time shuttle tracking system.</p>

        <div style={{textAlign:'left'}}>
          <label style={{fontSize:'14px', color:'#aaa', marginLeft:'5px'}}>Select Route</label>
          <select value={route} onChange={(e) => setRoute(e.target.value)}>
            <option value="Hostel-Campus">Hostel ⇄ Admin Block</option>
            <option value="City-Market">City ⇄ Main Market</option>
          </select>
        </div>

        <button onClick={() => navigate(`/buses?route=${route}`)} className="btn-primary">
          Find Buses 🔍
        </button>
      </div>

      <button onClick={() => navigate('/driver')} className="btn-secondary">
        Launch Driver Simulator 👨‍✈️
      </button>

    </div>
  );
}

export default Home;