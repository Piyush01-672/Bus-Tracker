import { io } from 'socket.io-client';

// Backend se connect karne ke liye
export const socket = io('http://localhost:3000');