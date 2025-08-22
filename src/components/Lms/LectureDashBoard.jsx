import React, { useState } from 'react';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  Clock, 
  FileText, 
  Award, 
  Bell, 
  User, 
  Plus,
  Edit,
  Eye,
  MessageSquare,
  BarChart3,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Upload,
  Video,
  Settings
} from 'lucide-react';

const LecturerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New student enrolled in Mathematics', time: '1 hour ago', type: 'enrollment' },
    { id: 2, title: 'Assignment submission deadline tomorrow', time: '4 hours ago', type: 'deadline' },
    { id: 3, title: 'Student inquiry about Physics concepts', time: '1 day ago', type: 'message' }
  ]);

  // Mock data
  const lecturerInfo = {
    name: 'Dr. Sarah Johnson',
    employeeId: 'LEC2024001',
    department: 'Computer Science',
    title: 'Associate Professor',
    email: 'sarah.johnson@university.edu'
  };

  const teachingCourses = [
    { 
      id: 1, 
      name: 'Data Structures & Algorithms', 
      code: 'CS301', 
      students: 45, 
      schedule: 'Mon, Wed, Fri 10:00 AM',
      semester: 'Spring 2024',
      progress: 65,
      assignments: 3,
      lectures: 12
    },
    { 
      id: 2, 
      name: 'Database Systems', 
      code: 'CS401', 
      students: 38, 
      schedule: 'Tue, Thu 2:00 PM',
      semester: 'Spring 2024',
      progress: 70,
      assignments: 2,
      lectures: 10
    },
    { 
      id: 3, 
      name: 'Software Engineering', 
      code: 'CS501', 
      students: 32, 
      schedule: 'Mon, Wed 3:00 PM',
      semester: 'Spring 2024',
      progress: 55,
      assignments: 4,
      lectures: 8
    }
  ];

  const recentAssignments = [
    { id: 1, title: 'Binary Search Tree Implementation', course: 'CS301', submissions: 42, total: 45, dueDate: '2024-03-25' },
    { id: 2, title: 'Database Design Project', course: 'CS401', submissions: 35, total: 38, dueDate: '2024-03-27' },
    { id: 3, title: 'Requirements Analysis Report', course: 'CS501', submissions: 28, total: 32, dueDate: '2024-03-30' }
  ];

  const upcomingLectures = [
    { id: 1, title: 'Graph Algorithms', course: 'CS301', date: '2024-03-25', time: '10:00 AM', room: 'Room 201' },
    { id: 2, title: 'SQL Advanced Queries', course: 'CS401', date: '2024-03-26', time: '2:00 PM', room: 'Lab 301' },
    { id: 3, title: 'Agile Methodology', course: 'CS501', date: '2024-03-27', time: '3:00 PM', room: 'Room 105' }
  ];

  const studentPerformance = [
    { course: 'CS301', avgGrade: 'B+', passRate: 89, attendance: 92 },
    { course: 'CS401', avgGrade: 'A-', passRate: 94, attendance: 88 },
    { course: 'CS501', avgGrade: 'B', passRate: 85, attendance: 85 }
  ];

  const TabButton = ({ id, label, icon: Icon, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
        active 
          ? 'bg-purple-600 text-white shadow-lg' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );

  const StatCard = ({ title, value, icon: Icon, color = 'purple', subtitle }) => (
    <div className={`bg-white rounded-xl p-6 shadow-lg border-l-4 border-${color}-500`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className={`text-2xl font-bold text-${color}-600 mt-1`}>{value}</p>
          {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
        </div>
        <Icon className={`w-8 h-8 text-${color}-500`} />
      </div>
    </div>
  );

  const CourseCard = ({ course }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg text-gray-800">{course.name}</h3>
          <p className="text-gray-600 text-sm">{course.code} • {course.semester}</p>
          <p className="text-gray-500 text-xs mt-1">{course.schedule}</p>
        </div>
        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
          {course.students} Students
        </span>
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Course Progress</span>
          <span className="font-medium">{course.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${course.progress}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-center">
        <div className="bg-gray-50 rounded-lg p-2">
          <p className="text-xs text-gray-600">Lectures</p>
          <p className="font-bold text-purple-600">{course.lectures}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-2">
          <p className="text-xs text-gray-600">Assignments</p>
          <p className="font-bold text-purple-600">{course.assignments}</p>
        </div>
      </div>

      <div className="flex space-x-2">
        <button className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
          Manage Course
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Eye size={16} />
        </button>
      </div>
    </div>
  );

  const AssignmentCard = ({ assignment }) => (
    <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-semibold text-gray-800">{assignment.title}</h4>
          <p className="text-gray-600 text-sm">{assignment.course}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          assignment.submissions === assignment.total ? 'bg-green-100 text-green-800' :
          assignment.submissions / assignment.total > 0.8 ? 'bg-blue-100 text-blue-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {assignment.submissions}/{assignment.total}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500 flex items-center">
          <Calendar size={14} className="mr-1" />
          Due: {assignment.dueDate}
        </span>
        <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
          Review Submissions
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-600 text-white p-2 rounded-lg">
                <BookOpen size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">EduPortal</h1>
                <p className="text-gray-600 text-sm">Lecturer Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-800">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{lecturerInfo.name}</p>
                  <p className="text-sm text-gray-600">{lecturerInfo.title}</p>
                </div>
                <div className="bg-purple-600 text-white p-2 rounded-full">
                  <User size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8 overflow-x-auto">
          <TabButton id="overview" label="Overview" icon={BarChart3} active={activeTab === 'overview'} onClick={setActiveTab} />
          <TabButton id="courses" label="My Courses" icon={BookOpen} active={activeTab === 'courses'} onClick={setActiveTab} />
          <TabButton id="assignments" label="Assignments" icon={FileText} active={activeTab === 'assignments'} onClick={setActiveTab} />
          <TabButton id="lectures" label="Lectures" icon={Video} active={activeTab === 'lectures'} onClick={setActiveTab} />
          <TabButton id="students" label="Students" icon={Users} active={activeTab === 'students'} onClick={setActiveTab} />
          <TabButton id="analytics" label="Analytics" icon={TrendingUp} active={activeTab === 'analytics'} onClick={setActiveTab} />
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard title="Teaching Courses" value={teachingCourses.length} icon={BookOpen} color="purple" />
              <StatCard title="Total Students" value="115" icon={Users} color="blue" />
              <StatCard title="Pending Reviews" value="12" icon={FileText} color="orange" />
              <StatCard title="This Week Lectures" value="9" icon={Video} color="green" />
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Assignments */}
              <div className="lg:col-span-2">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Recent Assignments</h2>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                    <Plus size={16} className="mr-1 inline" />
                    New Assignment
                  </button>
                </div>
                <div className="space-y-4">
                  {recentAssignments.map(assignment => (
                    <AssignmentCard key={assignment.id} assignment={assignment} />
                  ))}
                </div>
              </div>

              {/* Upcoming Lectures */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Lectures</h2>
                <div className="space-y-3">
                  {upcomingLectures.map(lecture => (
                    <div key={lecture.id} className="bg-white rounded-lg p-4 shadow-md">
                      <h4 className="font-medium text-gray-800 text-sm mb-1">{lecture.title}</h4>
                      <p className="text-xs text-gray-600 mb-2">{lecture.course}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span className="flex items-center">
                          <Calendar size={12} className="mr-1" />
                          {lecture.date}
                        </span>
                        <span className="flex items-center">
                          <Clock size={12} className="mr-1" />
                          {lecture.time}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{lecture.room}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
                  <Plus className="text-purple-600 mb-2" size={24} />
                  <span className="text-sm font-medium">Create Assignment</span>
                </button>
                <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
                  <Video className="text-purple-600 mb-2" size={24} />
                  <span className="text-sm font-medium">Schedule Lecture</span>
                </button>
                <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
                  <Upload className="text-purple-600 mb-2" size={24} />
                  <span className="text-sm font-medium">Upload Materials</span>
                </button>
                <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
                  <MessageSquare className="text-purple-600 mb-2" size={24} />
                  <span className="text-sm font-medium">Message Students</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                <Plus size={16} className="mr-2 inline" />
                New Course
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {teachingCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}

        {/* Assignments Tab */}
        {activeTab === 'assignments' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Assignments Management</h2>
              <div className="flex space-x-2">
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                  <option>All Courses</option>
                  <option>CS301</option>
                  <option>CS401</option>
                  <option>CS501</option>
                </select>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  <Plus size={16} className="mr-2 inline" />
                  Create Assignment
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentAssignments.map(assignment => (
                <div key={assignment.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{assignment.title}</h3>
                      <p className="text-gray-600 text-sm">{assignment.course}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-gray-600 hover:text-gray-800">
                        <Edit size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Submissions</span>
                      <span className="font-medium">{assignment.submissions}/{assignment.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${(assignment.submissions / assignment.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                    <span className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      Due: {assignment.dueDate}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                      Review Submissions
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lectures Tab */}
        {activeTab === 'lectures' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Lecture Management</h2>
              <div className="flex space-x-2">
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  <Plus size={16} className="mr-2 inline" />
                  Schedule Lecture
                </button>
                <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <Calendar size={16} className="mr-2 inline" />
                  Calendar View
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {upcomingLectures.map(lecture => (
                <div key={lecture.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <Video className="text-purple-600" size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{lecture.title}</h3>
                        <p className="text-gray-600">{lecture.course}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            {lecture.date}
                          </span>
                          <span className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            {lecture.time}
                          </span>
                          <span>{lecture.room}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button className="text-gray-600 hover:text-gray-800">
                        <Edit size={16} />
                      </button>
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                        Start Lecture
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Student Management</h2>
              <div className="flex space-x-2">
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                  <option>All Courses</option>
                  <option>CS301 - Data Structures</option>
                  <option>CS401 - Database Systems</option>
                  <option>CS501 - Software Engineering</option>
                </select>
                <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Export List
                </button>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b">
                <h3 className="font-semibold text-gray-800">Student List - CS301 Data Structures</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince', 'Eve Wilson'].map((name, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium">
                              {name.charAt(0)}
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">{name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          ST2024{String(index + 100).padStart(3, '0')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-600">{95 - index * 5}%</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            index === 0 ? 'bg-green-100 text-green-800' :
                            index === 1 ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {index === 0 ? 'A' : index === 1 ? 'B+' : 'B'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {index === 0 ? '2 hours ago' : `${index + 1} days ago`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button className="text-purple-600 hover:text-purple-700">
                              <MessageSquare size={16} />
                            </button>
                            <button className="text-purple-600 hover:text-purple-700">
                              <Eye size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Course Analytics</h2>
              <div className="flex space-x-2">
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                  <option>This Semester</option>
                  <option>Last Semester</option>
                  <option>All Time</option>
                </select>
                <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Export Report
                </button>
              </div>
            </div>

            {/* Performance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard title="Average Grade" value="B+" icon={Award} color="green" subtitle="Across all courses" />
              <StatCard title="Pass Rate" value="89%" icon={TrendingUp} color="blue" subtitle="This semester" />
              <StatCard title="Attendance Rate" value="88%" icon={Users} color="orange" subtitle="Average attendance" />
            </div>

            {/* Course Performance Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="px-6 py-4 bg-gray-50 border-b">
                <h3 className="font-semibold text-gray-800">Course Performance Summary</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Grade</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pass Rate</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {studentPerformance.map((course, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{course.course}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {teachingCourses.find(c => c.code === course.course)?.students}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            course.avgGrade.startsWith('A') ? 'bg-green-100 text-green-800' :
                            course.avgGrade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {course.avgGrade}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {course.passRate}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {course.attendance}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <TrendingUp className="text-green-500" size={16} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LecturerDashboard;