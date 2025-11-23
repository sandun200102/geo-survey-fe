import { useEffect } from "react";
import { 
  FaUsers, 
  FaUserCheck, 
  FaUserSlash, 
  FaClipboardCheck 
} from "react-icons/fa";
import StatCard from "./StatCard";
import EquipmentManagement from "../components/EquipManagement";
import BookingManagement from "../components/BookingManagement";
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile";
import EquipmentBarChart from "./EquipmentBarChart";
import BookingStatsBarChart from "./BookingStatusChart";
import { useAuthStore } from "../store/authStore";
import TabArea from "./TabArea";
import Permission from "./Permission";
import ProjectManagement from "./ProjctManagement";
const ContentArea = ({ activePath }) => {
  const { allUsers, getAllUsers, user } = useAuthStore();

  useEffect(() => {
    getAllUsers();
  }, []);

  // Derived Stats
  const totalUsers = allUsers.length;
  const activeUsers = allUsers.filter(u => u.status === "active").length;
  const inactiveUsers = allUsers.filter(u => u.status === "inactive").length;
  const usersWithBookings = allUsers.filter(u => u.hasEquipmentBooked).length;
  const bookingsToday = allUsers.filter(u => u.bookingDate === new Date().toISOString().slice(0,10)).length; 

  let content;

  switch (activePath) {
    case "/dashboard":
      content = (
        <div>
          <h2 className="text-3xl font-bold text-white mb-6">
            Dashboard Analytics Overview
          </h2>

          {/* ================= CHARTS ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <EquipmentBarChart />
            </div>
            <div className="mt-7">
              <BookingStatsBarChart />
            </div>
          </div>

          {/* ================= STAT CARDS ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <StatCard
              icon={<FaUserCheck size={28} />}
              title="Active Users"
              value={activeUsers}
              change={12.5}
              color="blue"
            />

            <StatCard
              icon={<FaUsers size={28} />}
              title="Total Users"
              value={totalUsers}
              change={-3.2}
              color="red"
            />

            <StatCard
              icon={<FaClipboardCheck size={28} />}
              title="Booked Users"
              value={usersWithBookings}
              change={7.1}
              color="yellow"
            />

            <StatCard
              icon={<FaUserSlash size={28} />}
              title="Inactive Users"
              value={inactiveUsers}
              change={0.9}
              color="green"
            />
          </div>
        </div>
      );
      break;

    case "/users":
      content = (
        <div>
          <TabArea />
        </div>
      );
      break;

    case "/projects":
      content = (
        <div>
          <ProjectManagement  userRole={user.role}/>
        </div>
      );
      break;

    case "/profile":
      content = (
        <div>
          <UserProfile />
        </div>
      );
      break;

    case "/bookings":
      content = (
        <div>
          <BookingManagement />
        </div>
      );
      break;

    case "/equipment":
      content = (
        <div>
          <EquipmentManagement />
        </div>
      );
      break;

      case "/permission":
      content = (
        <div>
          <Permission />
        </div>
      );
      break;

    case "/":
      content = (
        <div>
          <Link to="/dashboard" className="text-blue-600 underline">
            Go to Dashboard
          </Link>
        </div>
      );
      break;

    case "/logout":
      content = null;
      break;

    default:
      content = (
        <h2 className="text-2xl font-semibold text-white">Page Not Found</h2>
      );
  }

  return (
    <div className="bg-gradient-to-r from-green-600 to-gray-800 p-6 rounded-xl shadow-xl mt-8">
      {content}
    </div>
  );
};

export default ContentArea;
