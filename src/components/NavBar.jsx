import React, { useState } from 'react';
import { Menu, X, Search, Compass, UserCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { Link} from 'react-router-dom';

export default function GeologicalNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);


  const { user, logout } = useAuthStore();
  const handleLogout = () => {
		logout();
	};

  

  return (
    <nav className=" bg-gradient-to-r from-white-400 to-blue-100 backdrop-blur-md shadow-lg w-full top-0 z-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center group cursor-pointer">
            <Compass className="w-8 h-8 text-emerald-400 mr-1 transition-all duration-300 group-hover:rotate-45 group-hover:scale-110" />
            <div className="mr-3 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent text-2xl font-bold transition-all duration-300 group-hover:from-emerald-300 group-hover:to-blue-300">
              GeoSurvey.Com
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-black/80 hover:text-white px-3 py-2 text-lg font-medium transition-all duration-300 relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/equipments" className="text-black/80 hover:text-white px-3 py-2 text-lg font-medium transition-all duration-300 relative group">
              Equipment
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/project-management" className="text-black/80 hover:text-white px-3 py-2 text-lg font-medium transition-all duration-300 relative group">
              Projects
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/booking" className="text-black/80 hover:text-white px-3 py-2 text-lg font-medium transition-all duration-300 relative group">
              Booking
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/contact" className="text-black/80 hover:text-white px-3 py-2 text-lg font-medium transition-all duration-300 relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full group">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 pl-10 text-black placeholder-white/60 focus:outline-none focus:border-white-400 focus:bg-white/15 focus:shadow-lg focus:shadow-emerald-500/10 transition-all duration-300 hover:bg-white/12 hover:border-white/30"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60 group-focus-within:text-white-400 transition-colors duration-300" />
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          {!user && (
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-white">
            <button className="bg-gradient-to-r from-blue-200 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105 hover:shadow-xl active:scale-95">
              Login
            </button>
            </Link>
            <Link to="/signup" className="text-white">
            <button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105 hover:shadow-xl active:scale-95">
              Sign Up
            </button>
            </Link>
          </div>
          )}
          {/* User Menu Button desktop*/}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden md:flex">
      {user && (
        <button 
            onClick={toggleUserMenu}
            aria-haspopup="true"
            aria-expanded={isUserMenuOpen}
          className=" text-black p-2 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-110 active:scale-95"
        >
          <UserCircle className="w-7 h-7" />
          <span className="mt-1 text-sm mr-3">{user?.name}</span>
        </button>
        )}
        {/* User Menu */}
      
        {isUserMenuOpen && (
          <div className="absolute right-0 mt-17 w-48 bg-black/90 backdrop-blur-md rounded-lg shadow-lg p-4 space-y-2">
            <Link to="/user-dashboard" className="block text-white/80 hover:text-emerald-500 px-3 py-2 rounded-lg group-hover:w-full transition-all duration-300">Profile</Link>
            <Link to="/settings" className="block text-white/80 hover:text-emerald-500 px-3 py-2 rounded-lg group-hover:w-full transition-all duration-300">Settings</Link>
            <button className="block text-white/80 hover:text-emerald-500 px-3 py-2 rounded-lg group-hover:w-full transition-all duration-300" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>

         
{/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-110 active:scale-95"
          >
            <div className="relative w-6 h-6">
              <Menu className={`w-6 h-6 absolute transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
              <X className={`w-6 h-6 absolute transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-md rounded-lg mt-2 p-4 space-y-4 animate-in slide-in-from-top-5 duration-300">
            {/* Mobile Search */}
            <div className="relative group">
              <input
                type="text"
                placeholder="Search projects, equipment..."
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 pl-10 text-white placeholder-white/60 focus:outline-none focus:border-emerald-400 focus:bg-white/15 focus:shadow-lg focus:shadow-emerald-500/10 transition-all duration-300 hover:bg-white/12 hover:border-white/30"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60 group-focus-within:text-emerald-400 transition-colors duration-300" />
            </div>
            
            {/* Mobile Navigation Links */}
            <Link to="/" className="block text-white/80 hover:text-white py-2 px-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:translate-x-2 transform">
              Home
            </Link>
            <Link to="/equipment" className="block text-white/80 hover:text-white py-2 px-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:translate-x-2 transform">
              Equipment
            </Link>
            <Link to="/projects" className="block text-white/80 hover:text-white py-2 px-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:translate-x-2 transform">
              Projects
            </Link>
            <Link to="/reports" className="block text-white/80 hover:text-white py-2 px-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:translate-x-2 transform">
              Reports
            </Link>
            <Link to="/contact" className="block text-white/80 hover:text-white py-2 px-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:translate-x-2 transform">
              Contact
            </Link>
        {/* User Menu Button mobile */}
         {user && (   
        <button 
            onClick={toggleUserMenu}
            aria-haspopup="true"
            aria-expanded={isUserMenuOpen}
          className=" text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-110 active:scale-95">
          Settings
        </button>
        )}
        {isUserMenuOpen && (
          <div className="absolute left-0 md-1 w-full bg-black backdrop-blur-md rounded-lg shadow-lg p-4 space-y-2">
            <Link to="user-dashboard" className="block text-white/80 hover:text-emerald-500 px-3 py-2 rounded-lg group-hover:w-full transition-all duration-300">Profile</Link>
            <Link to="settings" className="block text-white/80 hover:text-emerald-500 px-3 py-2 rounded-lg group-hover:w-full transition-all duration-300">Settings</Link>
            <button className="block text-white/80 hover:text-emerald-500 px-3 py-2 rounded-lg group-hover:w-full transition-all duration-300" onClick={handleLogout}>Logout</button>
          </div>
        )}

            {/* Mobile Auth Buttons */}
            {!user && (
            <div className="pt-4 border-t border-white/20 space-y-2">
              <Link to="/login">
                <button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white py-2 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105 active:scale-95">
                  Login
                </button>
              </Link>
              <br />
              <br />
              <Link to="/signup">
                <button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white py-2 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105 active:scale-95">
                  Sign Up
              </button>
              </Link>
            </div>
            )}
            
          </div>
        )}
      </div>

      

    </nav>
  );
}