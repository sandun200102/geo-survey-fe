import React, { useState, useEffect } from 'react';
import { Search, Filter, UserX, Users, Mail, Phone, MapPin, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-hot-toast';

const UserManagement = () => {
  const { 
    getAllUsers, 
    removeUser, 
    updateUserStatus, 
    isLoading, 
    error,
    updatePermission,
    
  } = useAuthStore();

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all', // 'all', 'active', 'suspended'
    equipmentBooked: 'all', // 'all', 'booked', 'not-booked'
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await getAllUsers();
      
      // Process the actual user data from your backend
      const processedUsers = fetchedUsers.map(user => ({
        ...user,
        // Convert date strings to Date objects if needed
        lastLogin: user.lastLogin ? new Date(user.lastLogin) : null,
        createdAt: user.createdAt ? new Date(user.createdAt) : new Date(),
        // Set default status if not present
        status: user.status || 'active',
        // Set default role if not present
        role: user.role || 'user',
        // Add equipment booking status - you'll need to add this to your backend
        // For now, this is a placeholder - replace with actual field from your User model
        hasEquipmentBooked: user.hasEquipmentBooked || false
      }));
      
      setUsers(processedUsers);
      setFilteredUsers(processedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  

  // Filter and search users
  useEffect(() => {
    let filtered = users;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(user => user.status === filters.status);
    }

    // Equipment booking filter
    if (filters.equipmentBooked !== 'all') {
      const hasBooked = filters.equipmentBooked === 'booked';
      filtered = filtered.filter(user => user.hasEquipmentBooked === hasBooked);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, filters]);
  const handleRemoveUser = async (userId) => {
      const userToRemove = users.find(user => user._id === userId);
     if (userToRemove.role === 'admin') {
    alert("You cannot remove an admin user.");
    return;
  }

    if (window.confirm('Are you sure you want to remove this user?')) {
      try {
        await removeUser(userId);
        // Refresh the users list after successful removal
        await fetchUsers();
        alert('User removed successfully');
      } catch (error) {
        console.error('Error removing user:', error);
        alert('Error removing user: ' + error.message);
      }
    }
  };

  const handleStatusUpdate = async (userId, newStatus) => {
    const userToRemove = users.find(user => user._id === userId);
     if (userToRemove.role === 'admin') {
    alert("You cannot handled admin user.");
    return;
  }
    try {
      await updateUserStatus(userId, newStatus);
      // Update local state immediately for better UX
      setUsers(users.map(user => 
        user._id === userId ? { ...user, status: newStatus } : user
      ));
      alert(`User status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating user status:', error);
      alert('Error updating user status: ' + error);
    }
  };

    const handlePermission = async (userId, newPermission) => {  
      
    try {
      await updatePermission(userId, newPermission);
      // Update local state immediately for better UX
      setUsers(users.map(user => 
        user._id === userId ? { ...user, permission: newPermission } : user
      ));
      toast(`User status updated to ${newPermission}`);
    } catch (error) {
      console.error('Error updating user status:', error);
      toast('Error updating user status: ' + error);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      suspended: { color: 'bg-red-100 text-red-800', icon: XCircle },
    };
    
    const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', icon: AlertCircle };
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getRoleBadge = (role) => {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
      }`}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading users...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-red-800">{error}</span>
            </div>
            <button 
              onClick={fetchUsers}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">Manage and monitor user accounts</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-white/10 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border bg-white/10 text-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white-700 mb-2">
                    User Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="w-full p-2 border bg-white/10 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  >
                    <option value="all">All Users</option>
                    <option value="active">Active Users</option>
                    <option value="suspended">Suspended Users</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Equipment Booking
                  </label>
                  <select
                    value={filters.equipmentBooked}
                    onChange={(e) => setFilters({ ...filters, equipmentBooked: e.target.value })}
                    className="w-full bg-white/10 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  >
                    <option value="all">All Users</option>
                    <option value="booked">Has Equipment Booked</option>
                    <option value="not-booked">No Equipment Booked</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 ">
          <div className="p-4 rounded-lg shadow-sm border bg-black/30">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Total Users</p>
                <p className="text-2xl font-bold text-white">{users.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-black/30 p-4 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Active Users</p>
                <p className="text-2xl font-bold text-white">
                  {users.filter(u => u.status === 'active').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-black/30 p-4 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <XCircle className="w-8 h-8 text-red-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Suspended</p>
                <p className="text-2xl font-bold text-white">
                  {users.filter(u => u.status === 'inactive').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-black/30 p-4 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <AlertCircle className="w-8 h-8 text-orange-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-white">With Equipment</p>
                <p className="text-2xl font-bold text-white">
                  {users.filter(u => u.hasEquipmentBooked).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-black/30 rounded-lg shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-white">
              Users ({filteredUsers.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-black/20">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Permission
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Equipment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-white/5">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail className="w-3 h-3 mr-1" />
                            {user.email}
                          </div>
                          <div className="mt-1">
                            {getRoleBadge(user.role)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {user.contactNumber}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {user.address}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(user.status)}
                      {!user.isVerified && (
                        <div className="mt-1">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Unverified
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      
    
                        <div className="mt-1">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            { user.permission === 'pending' ? 'Pending' : user.permission  === 'accept' ? 'Accept' : 'null' }
                          </span>
                        </div>
                      
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.hasEquipmentBooked 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.hasEquipmentBooked ? 'Has Equipment' : 'No Equipment'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastLogin ? user.lastLogin.toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {user.role !== 'admin' && user.status === 'active' ? (
                          <button
                            onClick={() => handleStatusUpdate(user._id, 'inactive')}
                            className="bg-white/20 text-green-600 hover:text-red-900 px-2 py-1 rounded hover:bg-red-50"
                          >
                            Suspend
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStatusUpdate(user._id, 'active')}
                            className={`bg-white/20 text-red-600 px-2 py-1 rounded flex items-center ${
                                user.role === 'admin'
                                  ? 'opacity-50 cursor-not-allowed'
                                  : 'hover:text-red-900 hover:bg-red-50'
                              }`}      >
                            Activate
                          </button>
                        )}
                        
                        <button
                          onClick={() => handleRemoveUser(user._id)}
                          className="bg-white/20 text-blue-600 hover:text-red-900 px-2 py-1 rounded hover:bg-red-50 flex items-center"
                        >
                          <UserX className="w-4 h-4 mr-1" />
                          Remove
                        </button>
                          {user.role !== 'admin' && user.permission === 'pending' ? (
                          <button
                            onClick={() => handlePermission(user._id, 'accept')}
                            className="bg-white/20 text-green-600 hover:text-red-900 px-2 py-1 rounded hover:bg-red-50"
                          >
                            Accept
                          </button>
                        ) : (
                          <button
                            onClick={() => handlePermission(user._id, 'null')}
                            className={`bg-white/20 text-red-600 px-2 py-1 rounded flex items-center ${
                                user.role === 'admin'
                                  ? 'opacity-50 cursor-not-allowed'
                                  : 'hover:text-red-900 hover:bg-red-50'
                              }`}      >
                            pending
                          </button>
                        )}
                        
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;