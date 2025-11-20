import React from 'react';
import { FaRegBell, FaRegEnvelope, FaBars, FaChevronDown } from 'react-icons/fa';

const Header = () => {
  // In a real app, you would manage the user menu dropdown state here

  return (
    // Fixed position, positioned right of the 64-width sidebar (left-64)
    <header className="bg-white shadow-sm h-16 fixed top-0 left-64 right-0 flex items-center justify-between px-6 z-20">
      
      {/* Left Side: Logo and Title */}
      <div className="flex items-center space-x-4">
        {/* Placeholder for a mobile toggle button if sidebar is hidden */}
        <button className="text-gray-500 hover:text-gray-700 lg:hidden">
          <FaBars className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-semibold text-gray-700">Dashboard</h1>
      </div>

      {/* Right Side: Icons and User Profile */}
      <div className="flex items-center space-x-6">
        
        {/* Notifications Icon with Badge */}
        <div className="relative">
          <FaRegBell className="w-5 h-5 text-gray-500 cursor-pointer hover:text-red-600" />
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
            2
          </span>
        </div>

        {/* Messages Icon with Badge */}
        <div className="relative">
          <FaRegEnvelope className="w-5 h-5 text-gray-500 cursor-pointer hover:text-red-600" />
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
            3
          </span>
        </div>

        {/* User Profile Dropdown */}
        <div className="flex items-center space-x-2 cursor-pointer border-l pl-4">
          <img 
            className="w-8 h-8 rounded-full object-cover" 
            src="/path/to/john_david_profile.jpg" // Replace with actual path
            alt="John David" 
          />
          <span className="text-gray-700 font-medium hidden sm:block">John David</span>
          <FaChevronDown className="w-3 h-3 text-gray-500" />
          
          {/* Dropdown Menu (Needs state management to show/hide) */}
          {/* <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">...</div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;