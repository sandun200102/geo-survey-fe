import React, { useState, useEffect } from 'react';
import { Menu, X, Search, Compass, UserCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';
import Avatar from '../components/Avtar';

export default function GeologicalNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [screenSize, setScreenSize] = useState('large');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const { user, logout } = useAuthStore();
  const handleLogout = () => {
    logout();
  };
  

  // Monitor screen size changes with better breakpoints
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize('xs'); // Extra small screens
      } else if (width < 768) {
        setScreenSize('sm'); // Small screens
      } else if (width < 1024) {
        setScreenSize('md'); // Medium screens
      } else if (width < 1280) {
        setScreenSize('lg'); // Large screens
      } else {
        setScreenSize('xl'); // Extra large screens
      }
    };

    handleResize(); // Set initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine dashboard route based on role
  const dashboardRoute =
    user?.role === 'admin'
      ? '/admin-panel'
      : user?.role === 'user'
      ? '/user-dashboard'
      : user?.role === 'super-admin'
      ? '/super-admin-panel'
      : '/';

  // Better responsive sizing with minimum viable sizes
  const getSizeClasses = () => {
    switch (screenSize) {
      case 'xs':
        return {
          logo: 'w-6 h-6',
          logoText: 'text-base font-semibold', // Increased from text-lg
          navText: 'text-sm',
          padding: 'px-2 py-2', // Increased padding
          searchBar: 'hidden', // Hide search on extra small screens
          searchInput: '',
          searchIcon: '',
          button: 'px-3 py-2 text-xs min-w-[60px]', // Added minimum width
          avatar: 28, // Slightly smaller but still visible
          userName: 'hidden', // Hide username on very small screens
          showSearch: false
        };
      case 'sm':
        return {
          logo: 'w-6 h-6',
          logoText: 'text-lg font-semibold',
          navText: 'text-sm',
          padding: 'px-3 py-2',
          searchBar: 'hidden', // Hide search on small screens
          searchInput: '',
          searchIcon: '',
          button: 'px-4 py-2 text-sm min-w-[70px]',
          avatar: 32,
          userName: 'text-xs max-w-[60px] truncate',
          showSearch: false
        };
      case 'md':
        return {
          logo: 'w-7 h-7',
          logoText: 'text-xl font-bold',
          navText: 'text-base',
          padding: 'px-3 py-2',
          searchBar: 'max-w-[200px] mx-4', // Smaller search bar
          searchInput: 'px-3 py-1.5 pl-8 text-sm',
          searchIcon: 'w-4 h-4 left-2.5',
          button: 'px-4 py-2 text-sm',
          avatar: 36,
          userName: 'text-sm max-w-[80px] truncate',
          showSearch: true
        };
      case 'lg':
        return {
          logo: 'w-8 h-8',
          logoText: 'text-xl font-bold',
          navText: 'text-base',
          padding: 'px-4 py-2',
          searchBar: 'max-w-sm mx-6',
          searchInput: 'px-4 py-2 pl-10',
          searchIcon: 'w-4 h-4 left-3',
          button: 'px-5 py-2 text-sm',
          avatar: 38,
          userName: 'text-sm',
          showSearch: true
        };
      default: // xl
        return {
          logo: 'w-8 h-8',
          logoText: 'text-2xl font-bold',
          navText: 'text-lg',
          padding: 'px-4 py-2',
          searchBar: 'max-w-md mx-8',
          searchInput: 'px-4 py-2 pl-10',
          searchIcon: 'w-4 h-4 left-3',
          button: 'px-6 py-2',
          avatar: 40,
          userName: 'text-sm',
          showSearch: true
        };
    }
  };

  const sizeClasses = getSizeClasses();

  return (
    <nav className="bg-gradient-to-r from-white-400 to-blue-100 backdrop-blur-md shadow-lg w-full top-0 z-50 relative">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* Logo - Always visible with adequate size */}
          <div className="flex items-center group cursor-pointer flex-shrink-0 min-w-0">
            <Compass className={`${sizeClasses.logo} text-emerald-400 mr-2 transition-all duration-300 group-hover:rotate-45 group-hover:scale-110 flex-shrink-0`} />
            <div className={`bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent ${sizeClasses.logoText} transition-all duration-300 group-hover:from-emerald-300 group-hover:to-blue-300 whitespace-nowrap`}>
              {screenSize === 'xs' ? 'GeoSurvey' : 'GeoSurvey.Com'}
            </div>
          </div>

          {/* Desktop Navigation - Hide on medium and smaller screens */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            <Link
              to="/"
              className={`text-black/80 hover:text-white ${sizeClasses.padding} ${sizeClasses.navText} font-medium transition-all duration-300 relative group whitespace-nowrap`}
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/equipments"
              className={`text-black/80 hover:text-white ${sizeClasses.padding} ${sizeClasses.navText} font-medium transition-all duration-300 relative group whitespace-nowrap`}
            >
              Equipment
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/project-management"
              className={`text-black/80 hover:text-white ${sizeClasses.padding} ${sizeClasses.navText} font-medium transition-all duration-300 relative group whitespace-nowrap`}
            >
              Projects
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/booking"
              className={`text-black/80 hover:text-white ${sizeClasses.padding} ${sizeClasses.navText} font-medium transition-all duration-300 relative group whitespace-nowrap`}
            >
              LMS
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/contact"
              className={`text-black/80 hover:text-white ${sizeClasses.padding} ${sizeClasses.navText} font-medium transition-all duration-300 relative group whitespace-nowrap`}
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Search Bar - Responsive visibility */}
          {sizeClasses.showSearch && (
            <div className={`hidden md:flex flex-1 ${sizeClasses.searchBar}`}>
              <div className="relative w-full group">
                <input
                  type="text"
                  placeholder="Search..."
                  className={`w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-full ${sizeClasses.searchInput} text-black placeholder-white/60 focus:outline-none focus:border-white-400 focus:bg-white/15 focus:shadow-lg focus:shadow-emerald-500/10 transition-all duration-300 hover:bg-white/12 hover:border-white/30`}
                />
                <Search className={`absolute ${sizeClasses.searchIcon} top-1/2 transform -translate-y-1/2 text-white/60 group-focus-within:text-white-400 transition-colors duration-300`} />
              </div>
            </div>
          )}

          {/* Right side container */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Desktop Auth Buttons */}
            {!user && (
              <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
                <Link to="/login">
                  <button className={`bg-gradient-to-r from-blue-200 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white ${sizeClasses.button} rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105 hover:shadow-xl active:scale-95 whitespace-nowrap`}>
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className={`bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white ${sizeClasses.button} rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105 hover:shadow-xl active:scale-95 whitespace-nowrap`}>
                    Sign Up
                  </button>
                </Link>
              </div>
            )}

            {/* User Menu Button desktop */}
            {user && (
              <div className="hidden md:flex relative">
                <button
                  onClick={toggleUserMenu}
                  aria-haspopup="true"
                  aria-expanded={isUserMenuOpen}
                  className="transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center"
                >
                  <Avatar
                    fname={user.firstName}
                    lname={user.lastName}
                    size={sizeClasses.avatar}
                  />
                  {sizeClasses.userName !== 'hidden' && (
                    <span className={`${sizeClasses.userName} ml-2`}>
                      {user?.firstName.trim().split(' ')[0]}
                    </span>
                    
                  )}
                </button>
                
                {/* User Menu Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute mr-1 top-full mt-4 w-48 bg-gradient-to-br
   							 from-gray-600  to-gray-300 backdrop-blur-md rounded-lg shadow-lg p-4 space-y-2 z-50">
                    <Link
                      to={dashboardRoute}
                      className="block text-black/80 hover:text-emerald-500 px-3 py-2 rounded-lg transition-all duration-300"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    {/* <Link
                      to="/settings"
                      className="block text-black/80 hover:text-emerald-500 px-3 py-2 rounded-lg transition-all duration-300"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Settings
                    </Link> */}
                    <button
                      className="block w-full text-left text-black/80 hover:text-emerald-500 px-3 py-2 rounded-lg transition-all duration-300"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden lg:hidden text-black p-2 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-110 active:scale-95 flex-shrink-0"
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`w-6 h-6 absolute transition-all duration-300 ${
                    isMenuOpen
                      ? 'opacity-0 rotate-90'
                      : 'opacity-100 rotate-0'
                  }`}
                />
                <X
                  className={`w-6 h-6 absolute transition-all duration-300 ${
                    isMenuOpen
                      ? 'opacity-100 rotate-0'
                      : 'opacity-0 -rotate-90'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden lg:hidden bg-gradient-to-r from-green-400 to-blue-900 backdrop-blur-md rounded-lg mt-2 p-4 space-y-4 animate-in slide-in-from-top-5 duration-300 ">
            {/* Mobile Search - Always show in mobile menu */}
            <div className="relative group">
              <input
                type="text"
                placeholder="Search projects, equipment..."
                className="w-full bg-white/30  border border-white/20 rounded-full px-4 py-2 pl-10 text-white placeholder-white/60 focus:outline-none focus:border-emerald-400 focus:bg-white/15 focus:shadow-lg focus:shadow-emerald-500/10 transition-all duration-300 hover:bg-white/12 hover:border-white/30"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60 group-focus-within:text-emerald-400 transition-colors duration-300" />
            </div>

            {/* Mobile Navigation Links */}
            <Link
              to="/"
              className=" text-white font-bold hover:text-white py-2 px-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:translate-x-2 transform flex items-center justify-center relative overflow-hidden "
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <div className="pt-4 border-t border-white/20">
            <Link
              to="/equipments"
              className=" text-white/80 font-bold hover:text-white py-2 px-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:translate-x-2 transform flex items-center justify-center relative overflow-hidden"
              onClick={() => setIsMenuOpen(false)}
            >
              Equipment
            </Link>
            </div>
            <div className="pt-4 border-t border-white/20">
            <Link
              to="/project-management"
              className=" text-white/80 font-bold  hover:text-white py-2 px-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:translate-x-2 transform flex items-center justify-center relative overflow-hidden"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            </div>
            <div className="pt-4 border-t border-white/20">
            <Link
              to="/booking"
              className=" text-white/80 font-bold hover:text-white py-2 px-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:translate-x-2 transform flex items-center justify-center relative overflow-hidden border-amber-100"
              onClick={() => setIsMenuOpen(false)}
            >
              LMS
            </Link>
            </div>
            <div className="pt-4 border-t border-white/20">
            <Link
              to="/contact"
              className=" text-white/80 font-bold hover:text-white py-2 px-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:translate-x-2 transform flex items-center justify-center relative overflow-hidden"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            </div>

            {/* Mobile User Menu */}
            {user && (
              <>
                <div className="pt-4 border-t border-white/20">
                
                  <div className=" flex items-center justify-center relative overflow-hiddenr mb-3 px-3">
                    <Avatar
                      fname={user.firstName}
                      lname={user.lastName}
                      size={32}
                    />
                    <span className="text-emerald-950 ml-3 text-2xl font-bold">
                      {user?.firstName} {user?.lastName}
                    </span>
                   
                  </div>
                  <div className="pt-4 border-t border-white/20">
                  <Link
                    to={dashboardRoute}
                    className=" text-white/80 font-bold hover:text-emerald-500 px-3 py-2 rounded-lg transition-all duration-300 flex items-center justify-center relative overflow-hidden"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  </div>
                  {/* <div className="pt-4 border-t border-white/20">
                  <Link
                    to="/settings"
                    className=" text-white/80 font-bold  hover:text-emerald-500 px-3 py-2 rounded-lg transition-all duration-300 flex items-center justify-center relative overflow-hidden"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  </div> */}
                  <button
                    className=" w-full font-bold text-left bg-emerald-900  text-white/80 hover:text-emerald-500 px-3 py-2 rounded-lg transition-all duration-300 flex items-center justify-center relative overflow-hidden"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              </>
            )}

            {/* Mobile Auth Buttons */}
            {!user && (
              <div className="pt-4 border-t border-white/20 space-y-3">
                <Link to="/login">
                  <button 
                    className="w-full bg-gradient-to-r from-blue-200 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105 active:scale-95"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </button>
                </Link>
                <br></br>
                <br></br>
                <Link to="/signup">
                  <button 
                    className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105 active:scale-95"
                    onClick={() => setIsMenuOpen(false)}
                  >
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