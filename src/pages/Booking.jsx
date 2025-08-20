import React, { useState } from "react";
import NavBar from '../components/NavBar';
import UploadImageswebsite from '../components/UploadImageswebsite';
import { useAuthStore } from '../store/authStore.jsx';
import TimeDif from '../components/TimeDif';
import { useTimeAgo } from "../utils/useTimeAgo";





function Booking() {
  const [loading, setLoading] = useState(false);
  const { user, updateUserBookingStatus} = useAuthStore();
  
  const handleSubmit = async () => {
    console.log(Date.now())
    console.log(useTimeAgo(user.lastLogin))
  };
 
  return (
    <div>
    <NavBar />
     <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    <TimeDif />
  
    </div>
  );
}

export default Booking;
