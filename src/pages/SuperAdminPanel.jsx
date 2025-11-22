import React, { useState } from 'react';
import SideBar from '../components/SideBar';     
import ContentArea from '../components/ContentArea'; 
import UserNav from '../components/UserNav';

const SuperAdminPanel = () => {
  // State to track which menu item is currently active.
  const [currentPath, setCurrentPath] = useState('/dashboard');

  // Function passed to the sidebar to update the path state
  const handleNavigation = (path) => {
    setCurrentPath(path);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-green-300 to-white">
      
      {/* 1. Sidebar Component (Fixed) */}
      <SideBar 
        activePath={currentPath} 
        onNavigate={handleNavigation} 
      />

      {/* 2. Main Content Wrapper: Pushed right by the sidebar width (ml-64) */}
      <div className="flex-1 ml-64 flex flex-col"> 
        <UserNav />
        {/* 3. Header Component (Sticky top bar) */}
        {/* <Header /> */}

        {/* 4. Main Content Area (Scrollable) */}
        <main className="p-8 flex-1 overflow-y-auto"> 
          <ContentArea activePath={currentPath} /> 
        </main>
      </div>
    </div>
  );
};

export default SuperAdminPanel;