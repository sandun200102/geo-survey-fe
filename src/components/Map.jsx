import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import React from 'react';
import { useAuthStore } from "../store/authStore";
import 'leaflet/dist/leaflet.css';

const locations = [
  { id: 1, name: "Colombo", lat: 6.9271, lng: 79.8612 },
  { id: 2, name: "Kandy", lat: 7.2906, lng: 80.6337 }
];

export default function Map() {
  const { user, updatePermission, setAuthUser } = useAuthStore();

  const requestPermission = async (locationId) => {
    if (!user) {
      alert("Please log in to request permission.");
      return;
    }

    const permissionData = "pending";
    console.log(`Requesting permission for user: ${user._id} at location ID: ${locationId}`);

    // Call the API/store update
    await updatePermission(user._id, permissionData);

    // Update the local user state to reflect the new permission
    setAuthUser({ ...user, permission: permissionData });
  };

  return (
    <div className="relative">
      {/* Permission Status Notification */}
      {user && user.permission === "pending" && (
        <div className="absolute top-3 left-12 items-center justify-center z-50 bg-yellow-100 border border-yellow-300 rounded-lg p-3 shadow-md max-w-xs animate-pulse transition-all duration-500">
          <h3 className="m-0 text-yellow-800 text-sm font-semibold flex items-center gap-1">
            ⏳ Permission Pending
          </h3>
          <p className="mt-1 text-xs text-yellow-800">
            Your location access request is being reviewed
          </p>
        </div>
      )}

      <MapContainer
        center={[7.8731, 80.7718]}
        zoom={7.3}
        className="h-[650px] w-full border-2 z-0 border-gray-200 rounded-lg shadow-lg transition-shadow duration-500 hover:shadow-2xl"
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
              iconSize: [35, 35],
              iconAnchor: [17, 35],
              popupAnchor: [0, -35]
            })}
          >
            <Popup className="transition-all duration-300 transform hover:scale-105">
              <div className="flex flex-col gap-2">
                <p className="text-lg font-medium text-red-700">
                  Click the button below to view projects and send a request....
                </p>
                <b className="text-gray-900">{loc.name}</b>
                <span className="text-gray-500 text-xs">#{loc.id}</span>

                {user && user.permission === "pending" && (
                  <span className="text-yellow-800 font-semibold text-xs">
                    (Permission Request Pending...)
                  </span>
                )}

                {/* Show button only if permission not pending */}
                {!(user && user.permission === "pending") && (
                  <button
                    className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                    onClick={() => requestPermission(loc.id)}
                  >
                    Request Permission
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
