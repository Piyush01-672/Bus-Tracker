# 🏗️ Technical Architecture & System Design

## 1. High-Level Overview
NaviBus operates on a **Publisher-Subscriber (Pub/Sub)** model utilizing **WebSockets** for real-time bi-directional communication. The system is designed to be **hardware-agnostic**, relying on smartphone telemetry rather than proprietary VTS (Vehicle Tracking System) hardware.

## 2. System Data Flow Diagram

The following diagram illustrates the lifecycle of a location packet from the Driver to the Passenger.

```mermaid
sequenceDiagram
    participant D as Driver App (Publisher)
    participant S as Node.js Server (Broker)
    participant P as Passenger App (Subscriber)
    
    Note over D: GPS Sensor captures Coords
    D->>S: Emits 'sendLocation' {lat, lng, busId}
    Note over S: Server identifies Room ID (busId)
    S->>P: Broadcasts 'receiveLocation' to Room
    Note over P: React State Updates
    Note over P: Leaflet Map Interpolates Marker