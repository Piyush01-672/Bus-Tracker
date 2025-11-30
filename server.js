const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow frontend to connect

const server = http.createServer(app);

// Socket.io Setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"]
  }
});


const buses = [
  { id: 'bus1', route: 'Hostel-Campus', number: 'PB-12-X-1234', driver: 'Ramesh Kumar' },
  { id: 'bus2', route: 'City-Market', number: 'PB-65-A-9999', driver: 'Suresh Singh' }
];

io.on('connection', (socket) => {
  console.log('User Connected:', socket.id);

  // 1. Bus List Maangne par
  socket.on('getBuses', (route) => {
    const filtered = buses.filter(b => b.route === route);
    socket.emit('busList', filtered);
  });

  // 2. Specific Bus ko Track karne ke liye Room Join karna
  socket.on('joinBus', (busId) => {
    socket.join(busId);
    console.log(`User joined room: ${busId}`);
  });

  // 3. Driver Location Bhejega -> Server Passenger ko dega
  socket.on('sendLocation', (data) => {
    io.to(data.busId).emit('receiveLocation', data);
  });
});

server.listen(3000, () => {
  console.log('✅ Backend running on port 3000');
});