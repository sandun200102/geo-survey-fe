import React from 'react'
import NavBar from '../components/NavBar';
import EquipmentBarChart from '../components/EquipmentBarChart';
import EquipmentPieChart from '../components/EquipmentPieChart';
import BookingStatusChart from '../components/BookingStatusChart';
import PermissionManagement from '../components/PermissionManagement';
import AllPermissions from '../components/AllPermission';
import AdminManage from '../components/AdminManage';
import TabArea from '../components/TabArea';



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
      <AdminManage />
      <TabArea />

    </div>
  )
}

export default Settings