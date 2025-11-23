import React from 'react'
import NavBar from '../components/NavBar';
import EquipmentBarChart from '../components/EquipmentBarChart';
import EquipmentPieChart from '../components/EquipmentPieChart';
import BookingStatusChart from '../components/BookingStatusChart';
import PermissionManagement from '../components/PermissionManagement';
import AllPermissions from '../components/AllPermission';
import AdminManage from '../components/AdminManage';
import TabArea from '../components/TabArea';
import LargeFileUpload from '../components/LargeFileUpload';
import ProjectList from '../components/ProjectList';
import ProjectViewer from '../components/ProjectViewer';
import ProjectDisplay from '../components/ProjectDisplay';



function Settings() {
  return (
    <div>
      <NavBar />
      <h1>Settings</h1>
      {/* <EquipmentBarChart />
      <EquipmentPieChart />
      <BookingStatusChart />
      <PermissionManagement />
      <AllPermissions />
      <AdminManage />
      <TabArea /> */}
      {/* <LargeFileUpload />
      <ProjectList />
      <ProjectViewer /> */}
      <ProjectDisplay projectName="qw23" />

    </div>
  )
}

export default Settings