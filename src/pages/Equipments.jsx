import PostCard from '../components/PostCard';
import NavBar from '../components/NavBar';
import React, { useEffect, useState } from 'react';
import equipmentStore from '../store/equipStore.jsx';
import GetOneImage from '../components/GetOneImage.jsx';
import { useAuthStore } from '../store/authStore.jsx';
import toast from "react-hot-toast";
import useBookingStore from '../store/bookingStore';


function Equipments() {
    const { createBooking } = useBookingStore();
    
  const [equipment, setEquipment] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [modalType, setModalType] = useState(null); // 'details' or 'hire'
  const { user, isAuthenticated, sendBookingEmail, updateUserBookingStatus} = useAuthStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    startDate: '',
    endDate: '',
    notes: ''
  });

  useEffect(() => {
    equipmentStore.fetchEquipment().then((data) => {
      setEquipment(data);
    });
  }, []);

  // Handler for View More button
  const handleViewMore = (item) => {
    setSelectedEquipment(item);
    setModalType('details');
  };

  // Handler for Hire button
  const handleHire = (item) => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to hire equipment");
      
      return;
    }
    setSelectedEquipment(item);
    setModalType('hire');
  };


  // Close modal
  const closeModal = () => {
    setSelectedEquipment(null);
    setModalType(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      startDate: '',
      endDate: '',
      notes: ''
    });
  };

  // Handle form submit
 const handleSubmit = async (e) => {
  e.preventDefault();
  
  console.log("HANDLE SUBMIT TRIGGERED");

  const newBooking = {
    equipmentname: selectedEquipment.name,
    equipmentId: selectedEquipment._id,
    userId: user._id,
    userName: formData.name,
    userEmail: formData.email,
    phone: formData.phone,
    startDate: formData.startDate,
    endDate: formData.endDate,
    amount: selectedEquipment.value
  };

  try {
    await createBooking(newBooking);

    await updateUserBookingStatus(user._id, true);

    await sendBookingEmail(
      formData.name,
      formData.email,
      formData.phone,
      formData.startDate,
      formData.endDate,
      formData.notes,
      selectedEquipment._id,
      selectedEquipment.name
    );

    console.log("Booking created and email sent");
    closeModal();
  } catch (err) {
    console.log("Error during submit:", err);
    toast.error("Failed to process request");
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 ">
      <NavBar />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
        {equipment.map((item) => (
          <PostCard
            key={item._id}
            image={item.imageKey}
            title={item.name}
            description={item.description}
            onViewMore={() => handleViewMore(item)}
            onHire={() => handleHire(item)}
          />
        ))}
      </div>

      {/* Modal Overlay */}
      {selectedEquipment && (
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-r from-blue-100 to-blue-300 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform animate-in fade-in duration-300">
            {/* Close Button */}
            <div className="flex justify-end p-4 pb-0">
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 pt-2 ">
              {modalType === 'details' && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    {selectedEquipment.name}
                  </h2>
                  <div className="mb-6">
                    <GetOneImage imageKey={selectedEquipment.imageKey} />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">Description</h3>
                      <p className="text-gray-600 leading-relaxed">{selectedEquipment.description}</p>
                    </div>
                    {selectedEquipment.specifications && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Specifications</h3>
                        <p className="text-gray-600">{selectedEquipment.specifications}</p>
                      </div>
                    )}
                    {selectedEquipment.price && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Price</h3>
                        <p className="text-2xl font-bold text-green-600">${selectedEquipment.price}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {modalType === 'hire' && (
                <div className="">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Hire {selectedEquipment.name}
                  </h2>
                  <div className="mb-6">
                    <GetOneImage imageKey={selectedEquipment.imageKey} />
                  </div>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 bg-white py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 bg-white py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                        <input
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                          className="w-full bg-white px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                        <input
                          type="date"
                          value={formData.endDate}
                          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                          className="w-full px-3 bg-white py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                      <textarea
                        rows="3"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full px-3 bg-white py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Any special requirements or notes..."
                      ></textarea>
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Submit Request
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Equipments;
