// import { motion } from "framer-motion";
// import { useAuthStore } from "../store/authStore";
// import { formatDate } from "../utils/date";
// import Avatar from "../components/Avtar";
// import PostCard from "../components/PostCard";

// import TransitionPostcard from "../components/TransitionPostcard";
// import VideoBanner from "../components/Video";
// import GoogleDrive from "../components/GoogleDrive";



// const DashboardPage = () => {
// 	const { user, logout } = useAuthStore();

// 	const handleLogout = () => {
// 		logout();

		
// 	};
// 	return (
// 		<div>
// 		<motion.div
// 			initial={{ opacity: 0, scale: 0.9 }}
// 			animate={{ opacity: 1, scale: 1 }}
// 			exit={{ opacity: 0, scale: 0.9 }}
// 			transition={{ duration: 0.5 }}
// 			className='max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800'
// 		>
// 			<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text'>
// 				Dashboard
// 			</h2>
			

// 			<div className='space-y-6'>
// 				<motion.div
// 					className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
// 					initial={{ opacity: 0, y: 20 }}
// 					animate={{ opacity: 1, y: 0 }}
// 					transition={{ delay: 0.2 }}
// 				>
// 					<h3 className='text-xl font-semibold text-green-400 mb-3'>Profile Information</h3>
// 					<p className='text-gray-300'>Name: {user.name}</p>
// 					<p className='text-gray-300'>Email: {user.email}</p>
// 					<p className='text-gray-300'>Role: {user.role}</p>
// 				</motion.div>
// 				<motion.div
// 					className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
// 					initial={{ opacity: 0, y: 20 }}
// 					animate={{ opacity: 1, y: 0 }}
// 					transition={{ delay: 0.4 }}
// 				>
// 					<h3 className='text-xl font-semibold text-green-400 mb-3'>Account Activity</h3>
// 					<p className='text-gray-300'>
// 						<span className='font-bold'>Joined: </span>
// 						{new Date(user.createdAt).toLocaleDateString("en-US", {
// 							year: "numeric",
// 							month: "long",
// 							day: "numeric",
// 						})}
// 					</p>
// 					<p className='text-gray-300'>
// 						<span className='font-bold'>Last Login: </span>

// 						{formatDate(user.lastLogin)}
// 					</p>
// 				</motion.div>
// 			</div>

// 			<motion.div
// 				initial={{ opacity: 0, y: 20 }}
// 				animate={{ opacity: 1, y: 0 }}
// 				transition={{ delay: 0.6 }}
// 				className='mt-4'
// 			>
// 				<motion.button
// 					whileHover={{ scale: 1.05 }}
// 					whileTap={{ scale: 0.95 }}
// 					onClick={handleLogout}
// 					className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
// 				font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700
// 				 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900'
// 				>
// 					Logout
// 				</motion.button>
// 			</motion.div>
			
// 		</motion.div>
// 		{/* <div className="mt-10 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// 		<PostCard
// 				title="Full Stack Web Developer"
// 				image={sampleImage}
// 				description="Experienced in MERN stack development with responsive design and API integration."
// 				onViewMore={() => alert('View More clicked')}
// 				onHire={() => alert('Hire clicked')}
//      		 />
// 		</div>	  */}

// 		{/* <TransitionPostcard /> */}
// 		<VideoBanner videoName="images/vid1.mp4" />
// 		<GoogleDrive />
// 		</div>
// 	);
// };
// export default DashboardPage;
// import React, { useState } from 'react';
// import { Menu, X, Search, Compass, MapPin, TrendingUp, Users, FileText, Settings, Bell, Download, Calendar, ChevronRight, AlertTriangle, CheckCircle, Clock, Map, Layers, Activity } from 'lucide-react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// // Navbar Component
// function GeologicalNavbar({ onMenuToggle }) {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//     onMenuToggle(!isMenuOpen);
//   };

//   return (
//     <nav className="bg-black/80 backdrop-blur-md shadow-lg w-full top-0 z-50 relative">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center group cursor-pointer">
//             <Compass className="w-8 h-8 text-emerald-400 mr-2 transition-all duration-300 group-hover:rotate-45 group-hover:scale-110" />
//             <div className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent text-2xl font-bold transition-all duration-300 group-hover:from-emerald-300 group-hover:to-blue-300">
//               GeoSurvey Pro
//             </div>
//           </div>
          
//           <div className="hidden md:flex items-center space-x-8">
//             <a href="#" className="text-white/80 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 relative group">
//               Dashboard
//               <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400"></span>
//             </a>
//             <a href="#" className="text-white/80 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 relative group">
//               Equipment
//               <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
//             </a>
//             <a href="#" className="text-white/80 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 relative group">
//               Projects
//               <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
//             </a>
//             <a href="#" className="text-white/80 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 relative group">
//               Reports
//               <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
//             </a>
//           </div>

//           <div className="flex items-center space-x-4">
//             <div className="hidden md:flex relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 pl-10 text-white placeholder-white/60 focus:outline-none focus:border-emerald-400 focus:bg-white/15 transition-all duration-300 w-64"
//               />
//             </div>
            
//             <button className="relative p-2 text-white/80 hover:text-white transition-colors">
//               <Bell className="w-5 h-5" />
//               <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
//             </button>
            
//             <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"></div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// // Sample data
// const projectData = [
//   { month: 'Jan', surveys: 45, completed: 40 },
//   { month: 'Feb', surveys: 52, completed: 48 },
//   { month: 'Mar', surveys: 48, completed: 45 },
//   { month: 'Apr', surveys: 61, completed: 58 },
//   { month: 'May', surveys: 55, completed: 52 },
//   { month: 'Jun', surveys: 67, completed: 63 },
// ];

// const equipmentStatus = [
//   { name: 'Active', value: 78, color: '#10b981' },
//   { name: 'Maintenance', value: 12, color: '#f59e0b' },
//   { name: 'Offline', value: 10, color: '#ef4444' },
// ];

// const recentProjects = [
//   { id: 1, name: 'Coastal Erosion Survey - Phase 2', location: 'Cornwall, UK', status: 'In Progress', progress: 75, team: 'Team Alpha' },
//   { id: 2, name: 'Mineral Exploration - Site A', location: 'Nevada, USA', status: 'Completed', progress: 100, team: 'Team Beta' },
//   { id: 3, name: 'Groundwater Assessment', location: 'Queensland, AU', status: 'Planning', progress: 25, team: 'Team Gamma' },
//   { id: 4, name: 'Seismic Risk Analysis', location: 'Tokyo, Japan', status: 'In Progress', progress: 60, team: 'Team Delta' },
// ];

// export default function DashboardPage() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
//       <GeologicalNavbar onMenuToggle={setSidebarOpen} />
      
//       <div className="flex">
//         {/* Sidebar */}
//         <div className="hidden lg:flex lg:flex-shrink-0">
//           <div className="flex flex-col w-64">
//             <div className="flex flex-col h-0 flex-1 bg-black/40 backdrop-blur-sm border-r border-white/10">
//               <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
//                 <nav className="mt-5 flex-1 px-2 space-y-1">
//                   <a href="#" className="bg-emerald-500/20 text-emerald-300 group flex items-center px-2 py-2 text-sm font-medium rounded-md border border-emerald-500/30">
//                     <Activity className="mr-3 h-5 w-5" />
//                     Dashboard
//                   </a>
//                   <a href="#" className="text-white/70 hover:bg-white/10 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200">
//                     <Map className="mr-3 h-5 w-5" />
//                     Survey Maps
//                   </a>
//                   <a href="#" className="text-white/70 hover:bg-white/10 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200">
//                     <Layers className="mr-3 h-5 w-5" />
//                     Data Layers
//                   </a>
//                   <a href="#" className="text-white/70 hover:bg-white/10 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200">
//                     <Users className="mr-3 h-5 w-5" />
//                     Team Management
//                   </a>
//                   <a href="#" className="text-white/70 hover:bg-white/10 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200">
//                     <FileText className="mr-3 h-5 w-5" />
//                     Reports & Analytics
//                   </a>
//                   <a href="#" className="text-white/70 hover:bg-white/10 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200">
//                     <Settings className="mr-3 h-5 w-5" />
//                     Settings
//                   </a>
//                 </nav>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex flex-col w-0 flex-1 overflow-hidden">
//           <main className="flex-1 relative overflow-y-auto focus:outline-none">
//             <div className="py-6">
//               <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
//                 {/* Header */}
//                 <div className="mb-8">
//                   <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//                     Dashboard Overview
//                   </h1>
//                   <p className="text-white/60 mt-2">Monitor your geological surveys and equipment status</p>
//                 </div>

//                 {/* Stats Cards */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                   <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 group">
//                     <div className="flex items-center">
//                       <div className="p-2 bg-emerald-500/20 rounded-lg group-hover:bg-emerald-500/30 transition-colors">
//                         <MapPin className="w-6 h-6 text-emerald-400" />
//                       </div>
//                       <div className="ml-4">
//                         <p className="text-white/60 text-sm">Active Surveys</p>
//                         <p className="text-2xl font-bold text-white">24</p>
//                       </div>
//                     </div>
//                     <div className="mt-4">
//                       <div className="flex items-center text-sm">
//                         <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
//                         <span className="text-green-400">+12%</span>
//                         <span className="text-white/60 ml-1">from last month</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300 group">
//                     <div className="flex items-center">
//                       <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
//                         <Users className="w-6 h-6 text-blue-400" />
//                       </div>
//                       <div className="ml-4">
//                         <p className="text-white/60 text-sm">Field Teams</p>
//                         <p className="text-2xl font-bold text-white">8</p>
//                       </div>
//                     </div>
//                     <div className="mt-4">
//                       <div className="flex items-center text-sm">
//                         <CheckCircle className="w-4 h-4 text-green-400 mr-1" />
//                         <span className="text-green-400">All deployed</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300 group">
//                     <div className="flex items-center">
//                       <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
//                         <FileText className="w-6 h-6 text-purple-400" />
//                       </div>
//                       <div className="ml-4">
//                         <p className="text-white/60 text-sm">Reports Generated</p>
//                         <p className="text-2xl font-bold text-white">156</p>
//                       </div>
//                     </div>
//                     <div className="mt-4">
//                       <div className="flex items-center text-sm">
//                         <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
//                         <span className="text-green-400">+8%</span>
//                         <span className="text-white/60 ml-1">this week</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-orange-500/30 transition-all duration-300 group">
//                     <div className="flex items-center">
//                       <div className="p-2 bg-orange-500/20 rounded-lg group-hover:bg-orange-500/30 transition-colors">
//                         <AlertTriangle className="w-6 h-6 text-orange-400" />
//                       </div>
//                       <div className="ml-4">
//                         <p className="text-white/60 text-sm">Equipment Issues</p>
//                         <p className="text-2xl font-bold text-white">3</p>
//                       </div>
//                     </div>
//                     <div className="mt-4">
//                       <div className="flex items-center text-sm">
//                         <Clock className="w-4 h-4 text-orange-400 mr-1" />
//                         <span className="text-orange-400">Needs attention</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Charts Section */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//                   {/* Survey Progress Chart */}
//                   <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
//                     <div className="flex items-center justify-between mb-4">
//                       <h3 className="text-lg font-semibold text-white">Survey Progress</h3>
//                       <button className="text-emerald-400 hover:text-emerald-300 transition-colors">
//                         <Download className="w-5 h-5" />
//                       </button>
//                     </div>
//                     <ResponsiveContainer width="100%" height={300}>
//                       <LineChart data={projectData}>
//                         <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//                         <XAxis dataKey="month" stroke="#9CA3AF" />
//                         <YAxis stroke="#9CA3AF" />
//                         <Tooltip 
//                           contentStyle={{ 
//                             backgroundColor: '#1F2937', 
//                             border: '1px solid #374151',
//                             borderRadius: '8px'
//                           }} 
//                         />
//                         <Line type="monotone" dataKey="surveys" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }} />
//                         <Line type="monotone" dataKey="completed" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }} />
//                       </LineChart>
//                     </ResponsiveContainer>
//                   </div>

//                   {/* Equipment Status */}
//                   <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
//                     <h3 className="text-lg font-semibold text-white mb-4">Equipment Status</h3>
//                     <div className="flex items-center justify-center">
//                       <ResponsiveContainer width="100%" height={300}>
//                         <PieChart>
//                           <Pie
//                             data={equipmentStatus}
//                             cx="50%"
//                             cy="50%"
//                             outerRadius={100}
//                             fill="#8884d8"
//                             dataKey="value"
//                           >
//                             {equipmentStatus.map((entry, index) => (
//                               <Cell key={`cell-${index}`} fill={entry.color} />
//                             ))}
//                           </Pie>
//                           <Tooltip 
//                             contentStyle={{ 
//                               backgroundColor: '#1F2937', 
//                               border: '1px solid #374151',
//                               borderRadius: '8px'
//                             }} 
//                           />
//                         </PieChart>
//                       </ResponsiveContainer>
//                     </div>
//                     <div className="flex justify-center space-x-6 mt-4">
//                       {equipmentStatus.map((item, index) => (
//                         <div key={index} className="flex items-center">
//                           <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
//                           <span className="text-white/80 text-sm">{item.name}: {item.value}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Recent Projects */}
//                 <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
//                   <div className="flex items-center justify-between mb-6">
//                     <h3 className="text-lg font-semibold text-white">Recent Projects</h3>
//                     <button className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center">
//                       View All <ChevronRight className="w-4 h-4 ml-1" />
//                     </button>
//                   </div>
                  
//                   <div className="space-y-4">
//                     {recentProjects.map((project) => (
//                       <div key={project.id} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-white/20">
//                         <div className="flex items-center justify-between">
//                           <div className="flex-1">
//                             <h4 className="text-white font-medium">{project.name}</h4>
//                             <p className="text-white/60 text-sm mt-1">
//                               <MapPin className="w-4 h-4 inline mr-1" />
//                               {project.location} • {project.team}
//                             </p>
//                           </div>
//                           <div className="flex items-center space-x-4">
//                             <div className="text-right">
//                               <p className={`text-sm font-medium ${
//                                 project.status === 'Completed' ? 'text-green-400' :
//                                 project.status === 'In Progress' ? 'text-blue-400' :
//                                 'text-yellow-400'
//                               }`}>
//                                 {project.status}
//                               </p>
//                               <p className="text-white/60 text-sm">{project.progress}% complete</p>
//                             </div>
//                             <div className="w-20">
//                               <div className="bg-white/10 rounded-full h-2">
//                                 <div 
//                                   className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full transition-all duration-500"
//                                   style={{ width: `${project.progress}%` }}
//                                 ></div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { Menu, X, Search, Compass, MapPin, TrendingUp, Users, FileText, Settings, Bell, Download, Calendar, ChevronRight, AlertTriangle, CheckCircle, Clock, Map, Layers, Activity, User, Mail, Phone, Edit3, Save, Camera, Award, Briefcase, Globe, Shield, Key, Eye, EyeOff } from 'lucide-react';
import NavBar from '../components/NavBar';
import { useAuthStore } from '../store/authStore';



export default function UserProfile() {
	const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleLogout = () => {
		logout();
	};
  const [profileData, setProfileData] = useState({
    userName: user.name,
    email: user.email,
    // phone: user.phone,
    // location: user.location,
    // joinDate: user.joinDate,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    emailNotifications: true,
    smsAlerts: false,
    dataBackup: true
  });

  const recentActivity = [
    { id: 1, action: 'Completed survey report', project: 'Coastal Erosion Study', date: '2 hours ago', type: 'report' },
    { id: 2, action: 'Updated equipment status', project: 'Seismic Equipment Check', date: '1 day ago', type: 'equipment' },
    { id: 3, action: 'Submitted field data', project: 'Mineral Survey Phase 3', date: '2 days ago', type: 'data' },
    { id: 4, action: 'Attended team meeting', project: 'Project Planning Session', date: '3 days ago', type: 'meeting' },
    { id: 5, action: 'Generated analysis report', project: 'Groundwater Assessment', date: '1 week ago', type: 'report' }
  ];

  const projects = [
    { id: 1, name: 'Coastal Erosion Survey - Phase 2', role: 'Lead Geologist', status: 'Active', completion: 85 },
    { id: 2, name: 'Mineral Exploration Project', role: 'Senior Analyst', status: 'Completed', completion: 100 },
    { id: 3, name: 'Environmental Impact Study', role: 'Consultant', status: 'Planning', completion: 15 },
    { id: 4, name: 'Seismic Risk Assessment', role: 'Team Lead', status: 'Active', completion: 60 }
  ];

  const handleProfileSave = () => {
    setIsEditingProfile(false);
    // Here you would typically save to a backend
  };

  const handleSecurityToggle = (setting) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'report': return <FileText className="w-4 h-4 text-blue-400" />;
      case 'equipment': return <Settings className="w-4 h-4 text-orange-400" />;
      case 'data': return <Upload className="w-4 h-4 text-green-400" />;
      case 'meeting': return <Users className="w-4 h-4 text-purple-400" />;
      default: return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <NavBar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-white/10 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Picture */}
            <div className="relative group">
              <div className="w-32 h-32 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center text-4xl font-bold text-white">
                SM
              </div>
              <button className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Camera className="w-8 h-8 text-white" />
              </button>
            </div>
            
            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {profileData.userName} 
                </h1>
                <button
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="p-2 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-lg transition-all duration-300"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
              </div>
              
              
              <div className="flex flex-wrap gap-4 text-sm text-white/80">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  {profileData.email}
                </div>
                {/* <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  {profileData.phone}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Joined {profileData.joinDate}
                </div> */}
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-2xl font-bold text-white">47</p>
                <p className="text-white/60 text-sm">Toatal Bookings</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">156</p>
                <p className="text-white/60 text-sm">Total Days</p>
              </div>
              
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 mb-8">
          <div className="flex space-x-0 overflow-x-auto">
            {[
              { id: 'profile', label: 'Profile Details', icon: User },
              { id: 'bookings', label: 'Bookings', icon: Briefcase },
              { id: 'activity', label: 'Recent Activity', icon: Activity },
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
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Profile Information</h2>
                {isEditingProfile && (
                  <button
                    onClick={handleProfileSave}
                    className="flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-6">Personal Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/60 text-sm mb-2">First Name</label>
                      <input
                        type="text"
                        value={profileData.firstName}
                        disabled={!isEditingProfile}
                        onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-400 disabled:opacity-60 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 text-sm mb-2">Last Name</label>
                      <input
                        type="text"
                        value={profileData.lastName}
                        disabled={!isEditingProfile}
                        onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-400 disabled:opacity-60 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 text-sm mb-2">Email</label>
                      <input
                        type="email"
                        value={profileData.email}
                        disabled={!isEditingProfile}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-400 disabled:opacity-60 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 text-sm mb-2">Phone</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        disabled={!isEditingProfile}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-400 disabled:opacity-60 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Bookings</h2>
              <div className="space-y-4">
                {projects.map(project => (
                  <div key={project.id} className="bg-white/5 rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                        <p className="text-white/60">Role: {project.role}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        project.status === 'Active' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                        project.status === 'Completed' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                        'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${project.completion}%` }}
                        ></div>
                      </div>
                      <span className="text-white/80 text-sm font-medium">{project.completion}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="p-2 bg-white/10 rounded-lg">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{activity.action}</p>
                      <p className="text-white/60 text-sm">{activity.project}</p>
                      <p className="text-white/40 text-xs mt-1">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Security Settings</h2>
              
              <div className="space-y-6">
                {/* Password Section */}
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4">Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/60 text-sm mb-2">Current Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-400 transition-all duration-300"
                          placeholder="Enter current password"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">
                      Change Password
                    </button>
                  </div>
                </div>

                {/* Security Preferences */}
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4">Security Preferences</h3>
                  <div className="space-y-4">
                    {Object.entries(securitySettings).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">
                            {key === 'twoFactorEnabled' ? 'Two-Factor Authentication' :
                             key === 'emailNotifications' ? 'Email Notifications' :
                             key === 'smsAlerts' ? 'SMS Security Alerts' :
                             'Automatic Data Backup'}
                          </p>
                          <p className="text-white/60 text-sm">
                            {key === 'twoFactorEnabled' ? 'Add an extra layer of security to your account' :
                             key === 'emailNotifications' ? 'Receive security notifications via email' :
                             key === 'smsAlerts' ? 'Get SMS alerts for suspicious activity' :
                             'Automatically backup your data and settings'}
                          </p>
                        </div>
                        <button
                          onClick={() => handleSecurityToggle(key)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            value ? 'bg-emerald-500' : 'bg-white/20'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              value ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}