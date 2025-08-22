import React, { useState } from "react";
import NavBar from '../components/NavBar';
import UploadImageswebsite from '../components/UploadImageswebsite';
import { useAuthStore } from '../store/authStore.jsx';
import TimeDif from '../components/TimeDif';
import { useTimeAgo } from "../utils/useTimeAgo";
import StudentDashBoard from '../components/Lms/StudentDashBoard.jsx';






function Booking() {
  // const [loading, setLoading] = useState(false);
  // const { user, updateUserBookingStatus} = useAuthStore();
  
  // const handleSubmit = async () => {
  //   console.log(Date.now())
  //   console.log(useTimeAgo(user.lastLogin))
  // };
 
  return (
    <div>
    <StudentDashBoard />
    </div>
  );
}

export default Booking;
