import React, { useState } from 'react';
import { 
  FaTachometerAlt, 
  FaHome, 
  FaGraduationCap, 
  FaTools, 
  FaUsers, 
  FaProjectDiagram, 
  FaShieldAlt,
  FaSignOutAlt,
  FaCalendarCheck,
  FaUser
} from 'react-icons/fa';
  
import { Link } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', icon: FaTachometerAlt, href: '/dashboard' },
  { name: 'LMS', icon: FaGraduationCap, href: '/lms' },
  { name: 'Booking Management', icon: FaCalendarCheck, href: '/bookings' }, 
  { name: 'Equipment Management', icon: FaTools, href: '/equipment' },
  { name: 'User Management', icon: FaUsers, href: '/users' },
  { name: 'Project Management', icon: FaProjectDiagram, href: '/projects' },
  { name: 'Permission Management', icon: FaUser, href: '/permission' },
  { name: 'Profile', icon: FaUser, href: '/profile' },

];

const SideBar = ({ activePath, onNavigate }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null); 
  const handleSubmenuToggle = (name) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };


  return (
    <aside className="bg-gradient-to-b from-gray-600 to-green-950 w-64 fixed h-screen overflow-y-auto shadow-2xl z-30 transition-all duration-300 ease-in-out flex flex-col">
      
      {/* User Profile Section (Top) */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <img 
            className="w-10 h-10 rounded-full object-cover" 
            src="images\anura.png"
            alt="Anura Kumara" 
          />
          <div>
            <div className="text-white font-semibold text-sm">Anura Kumara</div>
            <div className="flex items-center text-xs text-green-400">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
              Online
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
     {/* Main Navigation */}
      <nav className="p-2 flex-1 overflow-y-auto">
        <div className="px-2 py-4 text-gray-400 font-semibold text-sm uppercase tracking-wider">
          MAIN MENU
        </div>

        {navItems.map((item, index) => (
          <div key={item.name}>
            <div
              onClick={() => onNavigate(item.href)}
              className={`
                flex items-center space-x-3 p-3 rounded-xl cursor-pointer 
                transition-all duration-300 ease-in-out transform 
                text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-[1.02] 

                ${activePath === item.href
                  ? 'bg-green-300 text-white shadow-xl shadow-green-800/50' 
                  : ''
                }
              `}
            >
              <item.icon className="w-5 h-5 transition-colors duration-300" />
              <span className="flex-1 font-medium">{item.name}</span>
            </div>

            {/* Divider Line Between Items */}
            {index !== navItems.length - 1 && (
              <div className="border-b border-gray-700 my-1"></div>
            )}
          </div>
        ))}
      </nav>

      
      
      <div className="p-2 mt-auto border-t border-gray-700">
        
        <Link to="/"
          className="flex items-center space-x-3 p-3 rounded-xl cursor-pointer 
                    transition-all duration-300 ease-in-out 
                    text-green-400 bg-gray-700 hover:bg-green-600 hover:text-white hover:shadow-lg"
        >
          <FaHome className="w-5 h-5" />
          <span className="flex-1 font-semibold">Go to Website</span>
        </Link>
      </div>

    </aside>
  );
};

export default SideBar;