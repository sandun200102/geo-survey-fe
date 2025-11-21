import React, { useState, useEffect } from 'react';
import { Search, Filter, UserX, Users, Mail, Phone, MapPin, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import Avatar from './Avtar';


// Mock toast for demo
const toast = {
  success: (message) => console.log('Success:', message),
  error: (message) => console.log('Error:', message)
};

// Fixed Confirmation Dialog Component
const ConfirmationDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirm", cancelText = "Cancel", type = "default" }) => {
  if (!isOpen) return null;

  const getButtonStyles = () => {
    switch (type) {
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white';
      case 'success':
        return 'bg-green-600 hover:bg-green-700 text-white';
      case 'warning':
        return 'bg-yellow-600 hover:bg-yellow-700 text-white';
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Background overlay */}
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" 
          aria-hidden="true"
          onClick={onClose}
        ></div>
        
        {/* Center the modal */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        {/* Modal panel */}
        <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {title}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {message}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onConfirm}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm ${getButtonStyles()}`}
            >
              {confirmText}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

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
    status: 'all',
    equipmentBooked: 'all',
  });
  const [showFilters, setShowFilters] = useState(false);

  // Dialog state
  const [dialog, setDialog] = useState({
    isOpen: false,
    type: 'default',
    title: '',
    message: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    onConfirm: null,
    actionType: null,
    userId: null,
    userData: null
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await getAllUsers();
      
      const processedUsers = fetchedUsers.map(user => ({
        ...user,
        lastLogin: user.lastLogin ? new Date(user.lastLogin) : null,
        createdAt: user.createdAt ? new Date(user.createdAt) : new Date(),
        status: user.status || 'active',
        role: user.role || 'user',
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

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter(user => user.status === filters.status);
    }

    if (filters.equipmentBooked !== 'all') {
      const hasBooked = filters.equipmentBooked === 'booked';
      filtered = filtered.filter(user => user.hasEquipmentBooked === hasBooked);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, filters]);

  // Dialog handlers
  const openDialog = (config) => {
    setDialog({
      isOpen: true,
      ...config
    });
  };

  const closeDialog = () => {
    setDialog({
      isOpen: false,
      type: 'default',
      title: '',
      message: '',
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      onConfirm: null,
      actionType: null,
      userId: null,
      userData: null
    });
  };

  const handleDialogConfirm = async () => {
    const { actionType, userId, userData } = dialog;
    
    try {
      switch (actionType) {
        case 'removeUser':
          await removeUser(userId);
          await fetchUsers();
          toast.success('User removed successfully');
          break;
          
        case 'updateStatus':
          await updateUserStatus(userId, userData.newStatus);
          setUsers(users.map(user => 
            user._id === userId ? { ...user, status: userData.newStatus } : user
          ));
          toast.success(`User status updated to ${userData.newStatus}`);
          break;
          
        case 'updatePermission':
          await updatePermission(userId, userData.newPermission);
          setUsers(users.map(user => 
            user._id === userId ? { ...user, permission: userData.newPermission } : user
          ));
          toast.success(`User permission updated to ${userData.newPermission}`);
          break;
          
        default:
          break;
      }
    } catch (error) {
      console.error(`Error with ${actionType}:`, error);
      toast.error(`Error: ${error.message || error}`);
    }
    
    closeDialog();
  };

  const handleRemoveUser = (userId) => {
    const userToRemove = users.find(user => user._id === userId);
    
    if (userToRemove.role === 'admin') {
      toast.error("You cannot remove an admin user.");
      return;
    }

    openDialog({
      type: 'danger',
      title: 'Remove User',
      message: `Are you sure you want to remove ${userToRemove.firstName} ${userToRemove.lastName}? This action cannot be undone.`,
      confirmText: 'Remove',
      cancelText: 'Cancel',
      actionType: 'removeUser',
      userId: userId,
      userData: { user: userToRemove }
    });
  };

  const handleStatusUpdate = (userId, newStatus) => {
    const userToUpdate = users.find(user => user._id === userId);
    
    if (userToUpdate.role === 'admin') {
      toast.error("You cannot modify admin user status.");
      return;
    }

    const actionText = newStatus === 'active' ? 'activate' : 'suspend';
    const statusText = newStatus === 'active' ? 'activated' : 'suspended';

    openDialog({
      type: newStatus === 'active' ? 'success' : 'warning',
      title: `${actionText.charAt(0).toUpperCase() + actionText.slice(1)} User`,
      message: `Are you sure you want to ${actionText} ${userToUpdate.firstName} ${userToUpdate.lastName}? They will be ${statusText}.`,
      confirmText: actionText.charAt(0).toUpperCase() + actionText.slice(1),
      cancelText: 'Cancel',
      actionType: 'updateStatus',
      userId: userId,
      userData: { newStatus, user: userToUpdate }
    });
  };

  const handlePermission = (userId, newPermission) => {
    const userToUpdate = users.find(user => user._id === userId);
    
    if (userToUpdate.role === 'admin') {
      toast.error("You cannot modify admin user permissions.");
      return;
    }

    const permissionText = newPermission === 'accept' ? 'accept' : 'set to pending';
    const actionText = newPermission === 'accept' ? 'Accept' : 'Set to Pending';

    openDialog({
      type: newPermission === 'accept' ? 'success' : 'warning',
      title: `${actionText} User Permission`,
      message: `Are you sure you want to ${permissionText} ${userToUpdate.firstName} ${userToUpdate.lastName}'s permission?`,
      confirmText: actionText,
      cancelText: 'Cancel',
      actionType: 'updatePermission',
      userId: userId,
      userData: { newPermission, user: userToUpdate }
    });
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
        <div className="max-w-6xl mx-auto">
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
    <div className="min-h-screen bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
          <p className="text-gray-300">Manage and monitor user accounts</p>
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
                className="w-full pl-10 pr-4 py-2 border bg-white/10 text-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-white/20 text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    User Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="w-full p-2 border bg-white/10 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
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
                    className="w-full bg-white/10 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-lg shadow-sm border bg-black/30 backdrop-blur-sm border-white/10">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-400" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-300">Total Users</p>
                <p className="text-2xl font-bold text-white">{users.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-sm border-white/10 p-4 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-300">Active Users</p>
                <p className="text-2xl font-bold text-white">
                  {users.filter(u => u.status === 'active').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-sm border-white/10 p-4 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <XCircle className="w-8 h-8 text-red-400" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-300">Suspended</p>
                <p className="text-2xl font-bold text-white">
                  {users.filter(u => u.status === 'inactive').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-sm border-white/10 p-4 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <AlertCircle className="w-8 h-8 text-orange-400" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-300">With Equipment</p>
                <p className="text-2xl font-bold text-white">
                  {users.filter(u => u.hasEquipmentBooked).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-black/30 backdrop-blur-sm border-white/10 rounded-lg shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="text-lg font-semibold text-white">
              Users ({filteredUsers.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10">
              <thead className="bg-black/20">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Permission
                  </th> */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Equipment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-white/5">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {/* <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                            </span>
                          </div> */}
                          <Avatar fname={user.firstName} lname={user.lastName} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-gray-400 flex items-center">
                            <Mail className="w-3 h-3 mr-1" />
                            {user.email}
                          </div>
                          <div className="mt-1">
                            {getRoleBadge(user.role)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
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
                          {user.permission === 'pending' ? 'Pending' : user.permission === 'accept' ? 'Accept' : 'null'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.hasEquipmentBooked 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.hasEquipmentBooked ? 'Has Equipment' : 'No Equipment'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {user.lastLogin ? user.lastLogin.toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {user.role !== 'admin' && user.status === 'active' ? (
                          <button
                            onClick={() => handleStatusUpdate(user._id, 'inactive')}
                            className="bg-white/20 text-yellow-400 hover:text-yellow-300 px-2 py-1 rounded hover:bg-white/30 transition-colors"
                          >
                            Suspend
                          </button>
                        ) : user.role !== 'admin' ? (
                          <button
                            onClick={() => handleStatusUpdate(user._id, 'active')}
                            className="bg-white/20 text-green-400 hover:text-green-300 px-2 py-1 rounded hover:bg-white/30 transition-colors"
                          >
                            Activate
                          </button>
                        ) : (
                          <button className="bg-white/10 text-gray-500 px-2 py-1 rounded cursor-not-allowed">
                            Activate
                          </button>
                        )}
                        
                        <button
                          onClick={() => handleRemoveUser(user._id)}
                          className={`bg-white/20 px-2 py-1 rounded flex items-center transition-colors ${
                            user.role === 'admin'
                              ? 'text-gray-500 cursor-not-allowed'
                              : 'text-red-400 hover:text-red-300 hover:bg-white/30'
                          }`}
                          disabled={user.role === 'admin'}
                        >
                          <UserX className="w-4 h-4 mr-1" />
                          Remove
                        </button>

                        {user.role !== 'admin' && user.permission === 'pending' ? (
                          <button
                            onClick={() => handlePermission(user._id, 'accept')}
                            className="bg-white/20 text-green-400 hover:text-green-300 px-2 py-1 rounded hover:bg-white/30 transition-colors"
                          >
                            Accept
                          </button>
                        ) : user.role !== 'admin' ? (
                          <button
                            onClick={() => handlePermission(user._id, 'pending')}
                            className="bg-white/20 text-yellow-400 hover:text-yellow-300 px-2 py-1 rounded hover:bg-white/30 transition-colors"
                          >
                            Pending
                          </button>
                        ) : (
                          <button className="bg-white/10 text-gray-500 px-2 py-1 rounded cursor-not-allowed">
                            Pending
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
              <h3 className="mt-2 text-sm font-medium text-white">No users found</h3>
              <p className="mt-1 text-sm text-gray-400">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={dialog.isOpen}
        onClose={closeDialog}
        onConfirm={handleDialogConfirm}
        title={dialog.title}
        message={dialog.message}
        confirmText={dialog.confirmText}
        cancelText={dialog.cancelText}
        type={dialog.type}
      />
    </div>
  );
};

export default UserManagement;