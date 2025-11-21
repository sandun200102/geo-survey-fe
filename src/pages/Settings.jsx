import React from 'react'
import NavBar from '../components/NavBar';
import EquipmentBarChart from '../components/EquipmentBarChart';
import EquipmentPieChart from '../components/EquipmentPieChart';
import BookingStatusChart from '../components/BookingStatusChart';
import PermissionManagement from '../components/PermissionManagement';
import AllPermissions from '../components/AllPermission';



function Settings() {
  return (
    <div>
      <NavBar />
      <h1>Settings</h1>
      <EquipmentBarChart />
      <EquipmentPieChart />
      <BookingStatusChart />
      <PermissionManagement />
      <AllPermissions />

    </div>
  )
}

export default Settings