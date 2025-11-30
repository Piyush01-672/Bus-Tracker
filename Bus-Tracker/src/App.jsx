import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BusList from './pages/BusList';
import LiveMap from './pages/LiveMap';
import DriverApp from './pages/DriverApp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buses" element={<BusList />} />
        <Route path="/track/:busId" element={<LiveMap />} />
        <Route path="/driver" element={<DriverApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;