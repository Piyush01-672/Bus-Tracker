import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [route, setRoute] = useState('Hostel-Campus');
  const navigate = useNavigate();

  // Nayi Function: Jo naye tab mein kholegi
  const openDriverMode = () => {
    window.open('/driver', '_blank'); // '_blank' ka matlab New Tab
  };

  return (
    <div className="home-container">
      
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>

      <div className="glass-card animate-fade-in">
        <div className="badge">✨ IIT ROPAR TRANSIT</div>
        <h1 className="hero-title">Navi<span className="highlight">Bus</span></h1>
        <p className="subtitle">Next-Gen Real-Time Shuttle Tracking</p>

        <div className="input-group">
          <label>SELECT ROUTE</label>
          <div className="select-wrapper">
            <select value={route} onChange={(e) => setRoute(e.target.value)}>
              <option value="Hostel-Campus">🏫 Hostel ⇄ Admin Block</option>
              <option value="City-Market">🏙️ City ⇄ Main Market</option>
            </select>
            <span className="custom-arrow">▼</span>
          </div>
        </div>

        <button onClick={() => navigate(`/buses?route=${route}`)} className="btn-primary glow-effect">
          Find Buses 🔍
        </button>
      </div>

      {/* YAHAN CHANGE KIYA HAI */}
      <button onClick={openDriverMode} className="btn-secondary">
        👨‍✈️ Launch Driver Console (New Tab)
      </button>

    </div>
  );
}

export default Home;