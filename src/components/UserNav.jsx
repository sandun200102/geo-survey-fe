import React from 'react';
import Avatar from '../components/Avtar';
import { useAuthStore } from '../store/authStore';

const UserNav = () => {
    const { user } = useAuthStore();
  return (
    <nav className="fixed top-0 right-4 w-full sm:w-2/3 lg:w-4/5 bg-gray-800/80 backdrop-blur-md py-2 px-8 shadow-xl border-b border-gray-700 z-50 transition-all duration-500 rounded-b-xl">
      
      <div className="flex justify-between items-center text-white">
        
        {/* === Heading === */}
        <h1 className="text-lg sm:text-xl font-bold transition-colors duration-300 hover:text-blue-400">
          Welcome To Admin Panel
        </h1>

        {/* === Right-side items === */}
        <div className="flex justify-end items-center space-x-6">

          {/* 1. Search Bar */}
          <div className="flex-1 max-w-sm hidden sm:block transition-all duration-300">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-400 transition-colors duration-300">🔍</span>
              </span>
              <input
                type="search"
                placeholder="Search..."
                className="w-full py-2 pl-10 pr-4 text-sm rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-900 transition-all duration-300"
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    console.log('Search for:', e.target.value);
                  }
                }}
              />
            </div>
          </div>

          {/* 2. Notification Button */}
          <button 
            className="relative p-2 rounded-full hover:bg-gray-700/70 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 transform hover:scale-110"
            title="Notifications"
            onClick={() => console.log('Show Notifications')}
          >
            <span className="text-xl transition-transform duration-300">🔔</span>
            <span className="absolute top-0 right-0 block h-3.5 w-3.5 rounded-full ring-2 ring-gray-800 bg-red-500 transform scale-100 hover:scale-125 transition-all duration-300"></span>
          </button>

          {/* 3. Profile/Settings */}
          <button 
            className="flex items-center space-x-2 p-1 pl-2 rounded-full hover:bg-gray-700/70 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 transform hover:scale-105 group"
            title="Profile & Settings"
            onClick={() => console.log('Go to Profile')}
          >
            <Avatar
                    fname={user.firstName}
                    lname={user.lastName}
                    size={35}
                  />
            <span className="hidden sm:inline text-sm font-semibold group-hover:text-blue-300 transition-colors duration-300">
              Profile
            </span>
            <span className="hidden sm:inline text-xs ml-1 transition-transform duration-300 group-hover:rotate-180">
              ▼
            </span>
          </button>

        </div>
      </div>
    </nav>
  );
};

export default UserNav;
