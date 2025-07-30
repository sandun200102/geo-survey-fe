import React, { useEffect, useState } from 'react';
import { User, Briefcase, Activity, Shield, ArchiveRestore, UserRoundPen, Archive} from 'lucide-react'; // Add your icon imports
import NavBar from '../components/NavBar';
import UserProfile from "../components/UserProfile"
import EquipManagement from "../components/EquipManagement"


function AdminDashBoardPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Tab Navigation */}
      <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 mb-8">
        <div className="flex space-x-0 overflow-x-auto">
          {[
            { id: 'profile', label: 'Profile Details', icon: User },
            { id: 'Equipments_Management', label: 'Equipments Management', icon: Archive },
            { id: 'Bookings', label: 'Bookings', icon: ArchiveRestore },
            { id: 'Users_Management', label: 'Users Management', icon: UserRoundPen }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-4 text-sm font-medium transition-all duration-300 border-b-2 ${
                activeTab === tab.id
                  ? 'text-emerald-400 border-emerald-400 bg-emerald-500/10'
                  : 'text-white/60 border-transparent hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div >
        {activeTab === 'profile' && (
          
            <UserProfile />
          
        )}

        {activeTab === 'Equipments_Management' && (
            <EquipManagement />

        )
        }
        {activeTab === 'Bookings' && <div>
            <h2 className="text-xl font-semibold text-white">
            Recent activity content goes here...
            </h2>
            </div>}
        {activeTab === 'Users_Management' && <div>
            <h2 className="text-xl font-semibold text-white">
            Bookings content goes here...
            </h2>
            </div>}
      </div>
    </div>
    </div>
  );
}

export default AdminDashBoardPage;
