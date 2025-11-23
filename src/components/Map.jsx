import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import "leaflet/dist/leaflet.css";
import projectStore from "../store/projectStore";
import permissionStore from "../store/permissionStore";
import ProjectDisplay from "./ProjectDisplay";


export default function Map() {
  const { user, updatePermission, setAuthUser } = useAuthStore();

  const [locations, setLocations] = useState([]);
  const [projId, setProjId] = useState(null);
  const [projName, setProjName] = useState(null);
    const [proName, setProName] = useState(null);
    const [usId, setUId] = useState(null);


  const [userPermission, setUserPermission] = useState(null);

  // ---------------------------------------------------------
  // 1. Load user permission if exists
  // ---------------------------------------------------------
  useEffect(() => {
    const fetchPermission = async () => {
      
        const perm = await permissionStore.getPermissionStatus(user._id);
        const pro = await permissionStore.getPermissionProjectName(user._id);
        const uId = await permissionStore.getPermissionUserId(user._id);
        setUserPermission(perm);
        setProName(pro);
        setUId(uId);
      
    };

    fetchPermission();
  }, [user]);
  // console.log("User Permission:", userPermission);
  // console.log("Project Name:", proName);
  // console.log("User Info:", usId?.userId);
  // console.log("Current User ID:", user?._id);

  // ---------------------------------------------------------
  // 2. Auto redirect to ProjectDisplay if permission approved
  // ---------------------------------------------------------

  // ---------------------------------------------------------
  // 3. Fetch all projects and map them
  // ---------------------------------------------------------
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await projectStore.fetchProject();

        const locs = projects.map((proj) => ({
          id: proj._id,
          name: proj.projectName,
          lat: parseFloat(proj.longitude),
          lng: parseFloat(proj.latitude),
        }));

        setLocations(locs);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    };

    fetchProjects();
  }, []);

  // ---------------------------------------------------------
  // 4. Marker click handler
  // ---------------------------------------------------------
  const handleMarkerClick = (loc) => {
    setProjId(loc.id);
    setProjName(loc.name);
  };

  // ---------------------------------------------------------
  // 5. Request Permission handler
  // ---------------------------------------------------------
  const requestPermission = async (locationId) => {
    if (!user) {
      alert("Please log in to request permission.");
      return;
    }

    const generatePermissionId = () => {
      return Math.floor(100000 + Math.random() * 900000);
    };

    const permissionData = "pending";

    await updatePermission(user._id, permissionData);

    await permissionStore.createPermission({
      userId: user._id,
      userName: user.firstName + " " + user.lastName,
      permissionId: generatePermissionId(),
      userEmail: user.email,
      projectId: projId,
      projectName: projName,
      permissionStatus: permissionData,
    });

    setAuthUser({ ...user, permission: permissionData });
  };


console.log("userPermission:", userPermission?.permissionStatus);

    if ( usId?.userId === user?._id && userPermission?.permissionStatus === "accept") {
    // console.log("Redirecting to ProjectDisplay for project:", proName);
    return <ProjectDisplay projectName={proName?.projectName} />;
  }


  // ---------------------------------------------------------
  // 6. Map UI (shown only when no permission)
  // ---------------------------------------------------------
  return (
    <div className="relative">
      {/* Permission Pending Notification */}
      {user && user.permission === "pending" && (
        <div className="absolute top-3 left-12 z-50 bg-yellow-100 border border-yellow-300 rounded-lg p-3 shadow-md max-w-xs animate-pulse z-50">
          <h3 className="text-yellow-800 text-sm font-semibold">⏳ Permission Pending</h3>
          <p className="text-xs text-yellow-800">
            Your location access request is being reviewed
          </p>
        </div>
      )}

      <MapContainer
        center={[7.8731, 80.7718]}
        zoom={7.3}
        className="h-[650px] w-full border-2 border-gray-200 rounded-lg shadow-lg hover:shadow-2xl "
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.lat, loc.lng]}
            eventHandlers={{
              click: () => handleMarkerClick(loc),
            }}
            icon={L.icon({
              iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
              iconSize: [35, 35],
              iconAnchor: [17, 35],
              popupAnchor: [0, -35],
            })}
          >
            <Popup>
              <div className="flex flex-col gap-2">
                <p className="text-lg font-medium text-red-700">
                  Click the button below to view project or request access
                </p>

                <b className="text-gray-900">{loc.name}</b>
                <span className="text-gray-500 text-xs">#{loc.id}</span>

                {user && user.permission === "pending" && (
                  <span className="text-yellow-800 font-semibold text-xs">
                    (Permission Request Pending…)
                  </span>
                )}

                {!(user && user.permission === "pending") && (
                  <button
                    className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 hover:scale-105 shadow-md"
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
