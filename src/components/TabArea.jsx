import React, { useState } from 'react';
import { User, Briefcase } from 'lucide-react';
import UserManagement from './UserManagement';
import AdminManage from './AdminManage';
import { useAuthStore } from '../store/authStore';

export default function UserProfile({ userRole }) {
  // Set default tab to 'all'
  const [activeTab, setActiveTab] = useState('all');
  const{ user } = useAuthStore();

  // Build tabs conditionally
  const tabs = [
    { id: 'all', label: 'User details', icon: User, component: <UserManagement /> },
    ...(user.role === 'super-admin'
      ? [
          {
            id: 'admin',
            label: 'Admin management',
            icon: Briefcase,
            component: <AdminManage />,
          },
        ]
      : []),
  ];

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 mb-8">
          <div className="flex space-x-0 overflow-x-auto">
            {tabs.map(tab => (
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
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-white/10 min-h-[200px]">
          {activeTabContent}
        </div>
      </div>
    </div>
  );
}
