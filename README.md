# 🚍 NaviBus - Intelligent Campus Transit System

> **A Hardware-Free, Real-Time Bus Tracking Solution built for IIT Ropar.**
> Bridging the gap between transit operators and commuters using low-latency WebSockets and Geospatial Intelligence.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Tech](https://img.shields.io/badge/tech-React%20|%20Node.js%20|%20Socket.io-green.svg)
![Data](https://img.shields.io/badge/storage-In--Memory-yellow.svg)

---

## 📖 Overview
**NaviBus** addresses the "Black Box" problem of campus shuttles. Unlike public transport, institutional buses often lack tracking, causing "Wait Anxiety" for students. 

Our solution utilizes a **"Driver-as-a-Beacon"** model. Instead of expensive GPS hardware, we use the driver's smartphone as a telemetry node, broadcasting location data via bi-directional WebSockets to students in real-time.

---

## ✨ Key Features
* **📍 Live Interpolated Tracking:** Smooth marker movement on the map (no jumping).
* **⚡ Sub-100ms Latency:** Powered by Socket.io for instant updates.
* **👨‍✈️ Driver Console & Simulator:** A dedicated interface for drivers to broadcast location (includes a Simulation Mode for testing without moving).
* **🌗 Modern Dark UI:** Glassmorphism design optimized for night-time visibility.
* **⚡ Zero-Config Setup:** No Database installation required (Uses In-Memory storage for prototype).

---

## 🏗️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React.js (Vite) | High-performance SPA with Client-side routing. |
| **Styling** | CSS3 (Modern) | Custom Dark Mode & Glassmorphism UI. |
| **Maps** | Leaflet.js + OSM | Open-source mapping engine (No API costs). |
| **Backend** | Node.js + Express | Event-driven server architecture. |
| **Real-Time** | Socket.io | WebSocket protocol for bi-directional communication. |

---

## ⚙️ Configuration (Environment)

*For this prototype version, no `.env` file is required. The system is pre-configured to run on local ports.*

* **Backend Port:** `3000` (Default)
* **Frontend Port:** `5173` (Default via Vite)
* **Database:** `None` (Data is stored in runtime memory for speed and simplicity)

---

## 🚀 Installation & Setup Guide

Since the project has separate Backend and Frontend folders, you need **two terminals**.

### Prerequisites
* Node.js (v16 or higher)
* npm (Node Package Manager)

### Step 1: Clone the Repository
```bash
git clone [https://github.com/Piyush01-672/Bus-Tracker.git](https://github.com/Piyush01-672/Bus-Tracker.git)

### Step 2: Clone the Repository
```bash
cd BusTracker
# Install backend dependencies
npm install

# Start the Server
node server.js

### Step 3: Setup Frontend (Bus-Tracker Folder)
```bash 
Open a second terminal, navigate to the inner folder:
cd Bus-Tracker

# Install frontend dependencies
npm install

# Start the React App
npm run dev