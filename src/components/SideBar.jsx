import React, { useState } from 'react';
import { FaTachometerAlt, FaCogs, FaTable, FaCube, FaChartBar, FaMapMarkerAlt } from 'react-icons/fa';

// Data structure for the menu items
const navItems = [
  { name: 'Dashboard', icon: FaTachometerAlt, href: '/dashboard', sub: true },
  { name: 'Widgets', icon: FaCogs, href: '/widgets' },
  { name: 'Elements', icon: FaCube, href: '/elements', sub: true },
  { name: 'Tables', icon: FaTable, href: '/tables' },
  { name: 'Apps', icon: FaCogs, href: '/apps', sub: true },
  { name: 'Pricing Tables', icon: FaTable, href: '/pricing' },
  { name: 'Contact', icon: FaCogs, href: '/contact' },
  { name: 'Additional Pages', icon: FaCube, href: '/pages' },
  { name: 'Map', icon: FaMapMarkerAlt, href: '/map' },
  { name: 'Charts', icon: FaChartBar, href: '/charts' },
  { name: 'Settings', icon: FaCogs, href: '/settings' },
];

const SideBar = ({ activePath }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const handleSubmenuToggle = (name) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  return (
    // Fixed, full height, dark background, shadow for depth
    <aside className="bg-gray-800 w-64 fixed h-screen overflow-y-auto shadow-2xl z-30">
      
      {/* User Profile Section (Top) */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <img 
            className="w-10 h-10 rounded-full object-cover" 
            src="/path/to/john_david_profile.jpg" // Replace with actual path
            alt="John David" 
          />
          <div>
            <div className="text-white font-semibold text-sm">John David</div>
            <div className="flex items-center text-xs text-green-400">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
              Online
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="p-2">
        <div className="px-2 py-4 text-gray-400 font-semibold text-sm uppercase">General</div>
        {navItems.map((item) => (
          <div key={item.name}>
            <a
              // Apply active link styles based on the item and the active path prop
              onClick={() => item.sub && handleSubmenuToggle(item.name)}
              className={`
                flex items-center space-x-3 p-3 rounded-md cursor-pointer transition-colors duration-200 
                ${activePath === item.href || openSubmenu === item.name
                  ? 'bg-red-600 text-white shadow-lg' // Active/Selected Style
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white' // Default Style
                }
              `}
            >
              <item.icon className="w-5 h-5" />
              <span className="flex-1">{item.name}</span>
              {/* Dropdown Indicator for Submenus */}
              {item.sub && (
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${openSubmenu === item.name ? 'transform rotate-180' : ''}`}
                  fill="currentColor" viewBox="0 0 20 20"
                >
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              )}
            </a>
            
            {/* Submenu (Hidden/Shown) */}
            {item.sub && openSubmenu === item.name && (
              <div className="pl-8 py-1 bg-gray-700/50">
                <a href={`${item.href}/sub1`} className="block p-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
                  Sub Link 1
                </a>
                <a href={`${item.href}/sub2`} className="block p-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
                  Sub Link 2
                </a>
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default SideBar;