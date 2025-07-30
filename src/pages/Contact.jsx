import React from 'react'
import { useAuthStore } from '../store/authStore';
import Avatar from '../components/Avtar';
import Update from '../components/Update';

function Contact() {

  	const { user } = useAuthStore();
  

  return (
    <div><Avatar fname={user.name} lname={"maduwa"} size={40} />
    <Update /></div>
    
    
  )
}

export default Contact