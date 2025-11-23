import React, { useState, useEffect } from 'react';
import { Camera, Mail, Phone, Calendar, BadgeCheck, Save, User, Briefcase, Activity, Shield ,Lock, Link, ArrowLeft, Loader} from 'lucide-react';
import NavBar from '../components/NavBar';
import { useAuthStore } from '../store/authStore';
import Avatar from '../components/Avtar';
import axios from 'axios';
import ForgotPassword from '../components/ForgotPassword';
import useBookingStore from '../store/bookingStore';


export default function UserDashBoard() {
  const { user,  setAuthUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [message, setMessage] = useState('');
  const { userBookings, getBookingsByUserId, loading: bookingLoading } = useBookingStore();


  // Form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [primaryEmail, setPrimaryEmail] = useState('');
  const [secondaryEmail, setSecondaryEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [secondaryContactNumber, setSecondaryContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');
  

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setPrimaryEmail(user.email || '');
      setSecondaryEmail(user.secondaryEmail || '');
      setContactNumber(user.contactNumber || '');
      setSecondaryContactNumber(user.secondaryContactNumber || '');
      setAddress(user.address || '');
      setBio(user.bio || '');
    }
  }, [user]);

  useEffect(() => {
  if (user?._id) {
    getBookingsByUserId(user._id);
  }
}, [user]);


  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/api/auth/update/${user._id}`, {
        firstName,
        lastName,
        email: primaryEmail,
        secondaryEmail,
        contactNumber,
        secondaryContactNumber,
        address,
        bio,
      });
      setAuthUser(res.data.updatedUser);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error(err);
      setMessage('Update failed!');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-white/10 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative group">
              <Avatar fname={firstName} lname={lastName} size={128} />
              <button className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Camera className="w-8 h-8 text-white" />
              </button>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {firstName} {lastName}
                </h1>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-white/80">
                <div className="flex items-center"><Mail className="w-4 h-4 mr-2" />{primaryEmail}</div>
                <div className="flex items-center"><Phone className="w-4 h-4 mr-2" />{contactNumber}</div>
                <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" />Joined {new Date(user.createdAt).toDateString()}</div>
                <div className="flex items-center"><BadgeCheck className="w-4 h-4 mr-2" />{user.isVerified ? 'Verified' : 'Not Verified'}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 text-center">
              <div><p className="text-2xl font-bold text-white">47</p><p className="text-white/60 text-sm">Total Bookings</p></div>
              <div><p className="text-2xl font-bold text-white">156</p><p className="text-white/60 text-sm">Total Days</p></div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 mb-8">
          <div className="flex space-x-0 overflow-x-auto">
            {[
              { id: 'profile', label: 'Profile Details', icon: User },
              { id: 'bookings', label: 'Bookings', icon: Briefcase },
              // { id: 'activity', label: 'Recent Activity', icon: Activity },
              { id: 'security', label: 'Security', icon: Shield }
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
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-white/10">
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSave} className="space-y-8">
              <h2 className="text-2xl font-bold text-white">Profile Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/60 text-sm mb-2">First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm mb-2">Primary Email</label>
                    <input
                      type="email"
                      value={primaryEmail}
                      onChange={(e) => setPrimaryEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm mb-2">Primary Phone</label>
                    <input
                      type="text"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm mb-2">Address</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/60 text-sm mb-2">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm mb-2">Secondary Email</label>
                    <input
                      type="email"
                      value={secondaryEmail}
                      onChange={(e) => setSecondaryEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm mb-2">Secondary Phone</label>
                    <input
                      type="text"
                      value={secondaryContactNumber}
                      onChange={(e) => setSecondaryContactNumber(e.target.value)}
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm mb-2">Bio</label>
                    <textarea
                      rows={4}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white resize-none"
                    />
                  </div>
                </div>
              </div>

              {message && <p className="text-sm text-green-500">{message}</p>}

              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </form>
          )}

          {activeTab === 'bookings' && (
  <div>
    <h2 className="text-2xl font-bold text-white mb-6">Your Bookings</h2>

    {bookingLoading && (
      <div className="flex justify-center py-10">
        <Loader className="animate-spin w-10 h-10 text-white" />
      </div>
    )}

    {!bookingLoading && userBookings.length === 0 && (
      <p className="text-white/70 text-center py-10">No bookings found.</p>
    )}

    {/* Booking List */}
    <div className="space-y-4">
      {userBookings.map((booking) => (
        <div
          key={booking._id}
          className="bg-white/5 border border-white/10 p-5 rounded-xl flex flex-col md:flex-row justify-between md:items-center"
        >
          <div className="space-y-1">
            <p className="text-white text-lg font-semibold">{booking.equipmentName}</p>
            <p className="text-white/70 text-sm">
              From: <span className="text-white">{new Date(booking.startDate).toDateString()}</span>
            </p>
            <p className="text-white/70 text-sm">
              To: <span className="text-white">{new Date(booking.endDate).toDateString()}</span>
            </p>
            <p className="text-white/70 text-sm">
              Status:{" "}
              <span
                className={`font-semibold ${
                  booking.status === "confirmed"
                    ? "text-green-400"
                    : booking.status === "pending"
                    ? "text-yellow-400"
                    : booking.status === "cancelled"
                    ? "text-red-400"
                    : "text-blue-400"
                }`}
              >
                {booking.status}
              </span>
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

          {activeTab === 'activity' && <div>Recent activity content goes here...</div>}
          {activeTab === 'security' && <div>

            
              <div className="flex items-center justify-center">
              <ForgotPassword />
              </div>
          </div>
          }
        </div>
      </div>
    </div>
  );
}
