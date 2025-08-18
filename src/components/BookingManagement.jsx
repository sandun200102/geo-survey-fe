import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  DollarSign, 
  Edit, 
  Eye, 
  Plus,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader
} from 'lucide-react';
import useBookingStore from '../store/bookingStore';

const BookingManagement = () => {
  const {
    bookings,
    loading,
    error,
    getAllBookings,
    updateBookingStatus,
    createBooking,
    getBookingStats,
    getBookingsByStatus,
    clearError
  } = useBookingStore();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [newBooking, setNewBooking] = useState({
    equipmentname: '',
    equipmentId: '',
    userId: '',
    userName: '',
    userEmail: '',
    phone: '',
    startDate: '',
    endDate: '',
    amount: ''
  });

  useEffect(() => {
    getAllBookings();
  }, [getAllBookings]);

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    const result = await createBooking(newBooking);
    if (result.success) {
      setShowCreateModal(false);
      setNewBooking({
        equipmentname: '',
        equipmentId: '',
        userId: '',
        userName: '',
        userEmail: '',
        phone: '',
        startDate: '',
        endDate: '',
        amount: ''
      });
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    await updateBookingStatus(bookingId, { status: newStatus });
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.equipmentname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = getBookingStats();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 ">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong className="font-bold">Error: </strong>
          <span>{error}</span>
          <button 
            onClick={clearError}
            className="float-right text-red-700 hover:text-red-900"
          >
            ×
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Booking Management</h1>
          <p className="text-gray-300">Manage equipment bookings and reservations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4  bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-white/10 mb-8">
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-white/10 mb-8">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-100">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-400">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className=" bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-white/10 mb-8">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-100">Pending</p>
                <p className="text-2xl font-bold text-gray-400">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-white/10 mb-8">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-100">Confirmed</p>
                <p className="text-2xl font-bold text-gray-400">{stats.confirmed}</p>
              </div>
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-white/10 mb-8">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-100">Completed</p>
                <p className="text-2xl font-bold text-gray-400">{stats.completed}</p>
              </div>
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-white/10 mb-8">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-100">Cancelled</p>
                <p className="text-2xl font-bold text-gray-400">{stats.cancelled}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-white/10 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-100 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border text-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
                />
              </div>

              {/* Filter */}
              <div className="relative bg-black/30 ">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-red text-gray-600 pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-48 appearance-none "
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Create Booking Button */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Booking
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
            <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600">Loading bookings...</p>
          </div>
        )}

        {/* Bookings Table */}
        {!loading && (
          <div className=" overflow-hidden bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-white/10 mb-8">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-black/30 backdrop-blur-sm ">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                      Equipment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                      Dates
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-200 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-transparent backdrop-blur-sm  divide-y divide-gray-200">
                  {filteredBookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-900">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-300">{booking.equipmentname}</div>
                        <div className="text-sm text-gray-400">ID: {booking.equipmentId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <User className="w-5 h-5 text-gray-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{booking.userName}</div>
                            <div className="text-sm text-gray-500">{booking.userEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          <div>
                            <div>{new Date(booking.startDate).toLocaleDateString()}</div>
                            <div className="text-gray-500">to {new Date(booking.endDate).toLocaleDateString()}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1 text-gray-400" />
                          {booking.amount}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          <span className="ml-1 capitalize">{booking.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleViewDetails(booking)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          
                          {booking.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleStatusUpdate(booking._id, 'confirmed')}
                                className="text-green-600 hover:text-green-900 px-2 py-1 text-xs rounded"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(booking._id, 'cancelled')}
                                className="text-red-600 hover:text-red-900 px-2 py-1 text-xs rounded"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                          
                          {booking.status === 'confirmed' && (
                            <button
                              onClick={() => handleStatusUpdate(booking._id, 'completed')}
                              className="text-blue-600 hover:text-blue-900 px-2 py-1 text-xs rounded"
                            >
                              Complete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredBookings.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Get started by creating a new booking.'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Create Booking Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Create New Booking</h2>
                <form onSubmit={handleCreateBooking} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Equipment Name
                    </label>
                    <input
                      type="text"
                      required
                      value={newBooking.equipmentname}
                      onChange={(e) => setNewBooking({...newBooking, equipmentname: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Equipment ID
                    </label>
                    <input
                      type="text"
                      required
                      value={newBooking.equipmentId}
                      onChange={(e) => setNewBooking({...newBooking, equipmentId: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      User ID
                    </label>
                    <input
                      type="text"
                      required
                      value={newBooking.userId}
                      onChange={(e) => setNewBooking({...newBooking, userId: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      User Name
                    </label>
                    <input
                      type="text"
                      required
                      value={newBooking.userName}
                      onChange={(e) => setNewBooking({...newBooking, userName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={newBooking.userEmail}
                      onChange={(e) => setNewBooking({...newBooking, userEmail: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      required
                      value={newBooking.phone}
                      onChange={(e) => setNewBooking({...newBooking, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                      </label>
                      <input
                        type="datetime-local"
                        required
                        value={newBooking.startDate}
                        onChange={(e) => setNewBooking({...newBooking, startDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date
                      </label>
                      <input
                        type="datetime-local"
                        required
                        value={newBooking.endDate}
                        onChange={(e) => setNewBooking({...newBooking, endDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={newBooking.amount}
                      onChange={(e) => setNewBooking({...newBooking, amount: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
                    >
                      {loading ? <Loader className="w-4 h-4 animate-spin" /> : 'Create Booking'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Booking Details Modal */}
        {showDetailsModal && selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Booking Details</h2>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedBooking.status)}`}>
                      {getStatusIcon(selectedBooking.status)}
                      <span className="ml-2 capitalize">{selectedBooking.status}</span>
                    </span>
                    {selectedBooking.bookingId && (
                      <span className="text-sm text-gray-500">ID: {selectedBooking.bookingId}</span>
                    )}
                  </div>

                  {/* Equipment Information */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Edit className="w-5 h-5 mr-2" />
                      Equipment Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-600">Equipment Name</label>
                        <p className="font-medium">{selectedBooking.equipmentname}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Equipment ID</label>
                        <p className="font-medium">{selectedBooking.equipmentId}</p>
                      </div>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Customer Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-600">Name</label>
                        <p className="font-medium">{selectedBooking.userName}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">User ID</label>
                        <p className="font-medium">{selectedBooking.userId}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          Email
                        </label>
                        <p className="font-medium">{selectedBooking.userEmail}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          Phone
                        </label>
                        <p className="font-medium">{selectedBooking.phone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Booking Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-600">Start Date</label>
                        <p className="font-medium">
                          {new Date(selectedBooking.startDate).toLocaleDateString()} at{' '}
                          {new Date(selectedBooking.startDate).toLocaleTimeString()}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">End Date</label>
                        <p className="font-medium">
                          {new Date(selectedBooking.endDate).toLocaleDateString()} at{' '}
                          {new Date(selectedBooking.endDate).toLocaleTimeString()}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          Amount
                        </label>
                        <p className="font-medium text-lg">${selectedBooking.amount}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Duration</label>
                        <p className="font-medium">
                          {Math.ceil((new Date(selectedBooking.endDate) - new Date(selectedBooking.startDate)) / (1000 * 60 * 60 * 24))} days
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Timestamps */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Timestamps
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-600">Created At</label>
                        <p className="font-medium">
                          {new Date(selectedBooking.createdAt).toLocaleDateString()} at{' '}
                          {new Date(selectedBooking.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                      {selectedBooking.updatedAt && selectedBooking.updatedAt !== selectedBooking.createdAt && (
                        <div>
                          <label className="text-sm text-gray-600">Last Updated</label>
                          <p className="font-medium">
                            {new Date(selectedBooking.updatedAt).toLocaleDateString()} at{' '}
                            {new Date(selectedBooking.updatedAt).toLocaleTimeString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t">
                    {selectedBooking.status === 'pending' && (
                      <>
                        <button
                          onClick={() => {
                            handleStatusUpdate(selectedBooking._id, 'confirmed');
                            setShowDetailsModal(false);
                          }}
                          className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Confirm Booking
                        </button>
                        <button
                          onClick={() => {
                            handleStatusUpdate(selectedBooking._id, 'cancelled');
                            setShowDetailsModal(false);
                          }}
                          className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Cancel Booking
                        </button>
                      </>
                    )}
                    
                    {selectedBooking.status === 'confirmed' && (
                      <button
                        onClick={() => {
                          handleStatusUpdate(selectedBooking._id, 'completed');
                          setShowDetailsModal(false);
                        }}
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark as Completed
                      </button>
                    )}
                    
                    <button
                      onClick={() => setShowDetailsModal(false)}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingManagement;