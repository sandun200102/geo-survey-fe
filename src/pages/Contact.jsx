import React from 'react'
import { useAuthStore } from '../store/authStore';
import Avatar from '../components/Avtar';
import Update from '../components/Update';
import ImageSelector from '../components/ImageSelector';
import NavBar from '../components/NavBar';


function Contact() {

  	const { user } = useAuthStore();
  

  return (
    <div>
      <NavBar />
      <Avatar fname={user.name} lname={"maduwa"} size={40} />
    
    <ImageSelector />
    
    </div>
    
    
  )
}

export default Contact