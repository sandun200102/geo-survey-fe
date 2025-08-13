import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import React from 'react';
import { useAuthStore } from "../store/authStore";

const locations = [
  { id: 1, name: "Colombo", lat: 6.9271, lng: 79.8612 },
  { id: 2, name: "Kandy", lat: 7.2906, lng: 80.6337 }
];

export default function Map() {
  // Access user data from the auth store
  const { user, updatePermission, setAuthUser } = useAuthStore();

  const requestPermission = async (locationId) => {
    setAuthUser(user);
    if (!user) {
      alert("Please log in to request permission.");
      return;
    }
    const permissionData = "pending";
    console.log(`Requesting permission for user: ${user._id} at location ID: ${locationId}`);
    await updatePermission(user._id, permissionData);
    // Logic to handle permission request
    console.log(`Permission requested for location ID: ${locationId}`);
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Permission Status Display */}
      {user && user.permission === "pending" && (
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 1000,
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '4px',
          padding: '10px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
          <h3 style={{ margin: '0', color: '#856404', fontSize: '16px' }}>
            ⏳ Permission Pending
          </h3>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#856404' }}>
            Your location access request is being reviewed
          </p>
        </div>
      )}
      
      <MapContainer 
        center={[7.8731, 80.7718]} 
        zoom={7.3} 
        style={{ height: '650px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map(loc => (
          <Marker 
            key={loc.id} 
            position={[loc.lat, loc.lng]} 
            icon={L.icon({ 
              iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", 
              iconSize: [30, 30] 
            })}
          >
            <Popup>
              <b>{loc.name}</b><br />
              {user && user.permission === "pending" ? (
                <div style={{ color: '#856404', fontWeight: 'bold' }}>
                  Permission Request Pending...
                </div>
              ) : (
                <button onClick={() => requestPermission(loc.id)}>
                  Request Permission
                </button>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}