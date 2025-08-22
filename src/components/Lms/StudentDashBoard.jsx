import React, { useState } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  FileText, 
  Award, 
  Bell, 
  User, 
  Play, 
  Download,
  MessageSquare,
  BarChart3,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New assignment posted in Mathematics', time: '2 hours ago', type: 'assignment' },
    { id: 2, title: 'Physics lecture starts in 30 minutes', time: '30 min', type: 'reminder' },
    { id: 3, title: 'Grade posted for Chemistry Quiz', time: '1 day ago', type: 'grade' }
  ]);

  // Mock data
  const studentInfo = {
    name: 'John Doe',
    studentId: 'ST2024001',
    year: '2nd Year',
    program: 'Computer Science',
    gpa: 3.75
  };

  const enrolledCourses = [
    { id: 1, name: 'Mathematics', code: 'MATH201', progress: 78, grade: 'B+', instructor: 'Dr. Smith' },
    { id: 2, name: 'Physics', code: 'PHYS101', progress: 65, grade: 'A-', instructor: 'Prof. Johnson' },
    { id: 3, name: 'Chemistry', code: 'CHEM101', progress: 82, grade: 'A', instructor: 'Dr. Brown' },
    { id: 4, name: 'Programming', code: 'CS201', progress: 90, grade: 'A+', instructor: 'Prof. Wilson' }
  ];

  const upcomingAssignments = [
    { id: 1, title: 'Calculus Problem Set 3', course: 'Mathematics', dueDate: '2024-03-25', status: 'pending' },
    { id: 2, title: 'Physics Lab Report', course: 'Physics', dueDate: '2024-03-27', status: 'in-progress' },
    { id: 3, title: 'Chemistry Quiz 2', course: 'Chemistry', dueDate: '2024-03-30', status: 'pending' }
  ];

  const recentLectures = [
    { id: 1, title: 'Linear Algebra Fundamentals', course: 'Mathematics', date: '2024-03-20', duration: '1h 30m', watched: true },
    { id: 2, title: 'Quantum Mechanics Intro', course: 'Physics', date: '2024-03-19', duration: '1h 15m', watched: false },
    { id: 3, title: 'Organic Chemistry Basics', course: 'Chemistry', date: '2024-03-18', duration: '1h 45m', watched: true }
  ];

  const TabButton = ({ id, label, icon: Icon, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
        active 
          ? 'bg-blue-600 text-white shadow-lg' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );

  const StatCard = ({ title, value, icon: Icon, color = 'blue' }) => (
    <div className={`bg-white rounded-xl p-6 shadow-lg border-l-4 border-${color}-500`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className={`text-2xl font-bold text-${color}-600 mt-1`}>{value}</p>
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
          <p className="text-gray-600 text-sm">{course.code}</p>
          <p className="text-gray-500 text-xs mt-1">Instructor: {course.instructor}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          course.grade === 'A+' ? 'bg-green-100 text-green-800' :
          course.grade.startsWith('A') ? 'bg-blue-100 text-blue-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {course.grade}
        </span>
      </div>
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium">{course.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${course.progress}%` }}
          ></div>
        </div>
      </div>
      <div className="flex space-x-2">
        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          View Course
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <MessageSquare size={16} />
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
          assignment.status === 'completed' ? 'bg-green-100 text-green-800' :
          assignment.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {assignment.status}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500 flex items-center">
          <Calendar size={14} className="mr-1" />
          Due: {assignment.dueDate}
        </span>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View Details
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
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <BookOpen size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">EduPortal</h1>
                <p className="text-gray-600 text-sm">Student Dashboard</p>
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
                  <p className="font-semibold text-gray-800">{studentInfo.name}</p>
                  <p className="text-sm text-gray-600">{studentInfo.studentId}</p>
                </div>
                <div className="bg-blue-600 text-white p-2 rounded-full">
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
          <TabButton id="lectures" label="Lectures" icon={Play} active={activeTab === 'lectures'} onClick={setActiveTab} />
          <TabButton id="grades" label="Grades" icon={Award} active={activeTab === 'grades'} onClick={setActiveTab} />
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard title="Enrolled Courses" value={enrolledCourses.length} icon={BookOpen} color="blue" />
              <StatCard title="Current GPA" value={studentInfo.gpa} icon={Award} color="green" />
              <StatCard title="Pending Assignments" value="3" icon={FileText} color="orange" />
              <StatCard title="Completed Lectures" value="24" icon={Play} color="purple" />
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Assignments */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Assignments</h2>
                <div className="space-y-4">
                  {upcomingAssignments.map(assignment => (
                    <AssignmentCard key={assignment.id} assignment={assignment} />
                  ))}
                </div>
              </div>

              {/* Notifications */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Notifications</h2>
                <div className="space-y-3">
                  {notifications.map(notification => (
                    <div key={notification.id} className="bg-white rounded-lg p-4 shadow-md">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-800 text-sm">{notification.title}</h4>
                        {notification.type === 'assignment' && <FileText size={16} className="text-blue-500" />}
                        {notification.type === 'reminder' && <Clock size={16} className="text-orange-500" />}
                        {notification.type === 'grade' && <Award size={16} className="text-green-500" />}
                      </div>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Browse Courses
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {enrolledCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}

        {/* Assignments Tab */}
        {activeTab === 'assignments' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Assignments</h2>
              <div className="flex space-x-2">
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>All Courses</option>
                  <option>Mathematics</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingAssignments.map(assignment => (
                <div key={assignment.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{assignment.title}</h3>
                      <p className="text-gray-600 text-sm">{assignment.course}</p>
                    </div>
                    {assignment.status === 'pending' && <AlertCircle className="text-red-500" size={20} />}
                    {assignment.status === 'in-progress' && <Clock className="text-yellow-500" size={20} />}
                    {assignment.status === 'completed' && <CheckCircle className="text-green-500" size={20} />}
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Due Date: {assignment.dueDate}</p>
                    <div className="flex items-center space-x-2">
                      <Clock size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-500">3 days remaining</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      Start Assignment
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Download size={16} />
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
              <h2 className="text-2xl font-bold text-gray-800">Recent Lectures</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Schedule View
              </button>
            </div>
            <div className="space-y-4">
              {recentLectures.map(lecture => (
                <div key={lecture.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${lecture.watched ? 'bg-green-100' : 'bg-blue-100'}`}>
                        <Play className={lecture.watched ? 'text-green-600' : 'text-blue-600'} size={20} />
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
                            {lecture.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {lecture.watched && (
                        <span className="text-green-600 text-sm font-medium flex items-center">
                          <CheckCircle size={16} className="mr-1" />
                          Watched
                        </span>
                      )}
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        {lecture.watched ? 'Rewatch' : 'Watch Now'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Grades Tab */}
        {activeTab === 'grades' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Grades & Performance</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Download Transcript
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="font-bold text-lg text-gray-800 mb-4">Course Grades</h3>
                  <div className="space-y-4">
                    {enrolledCourses.map(course => (
                      <div key={course.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-semibold text-gray-800">{course.name}</h4>
                          <p className="text-gray-600 text-sm">{course.code}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                            course.grade === 'A+' ? 'bg-green-100 text-green-800' :
                            course.grade.startsWith('A') ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {course.grade}
                          </span>
                          <p className="text-gray-500 text-xs mt-1">{course.progress}% Complete</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="font-bold text-lg text-gray-800 mb-4">Academic Summary</h3>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-blue-600">{studentInfo.gpa}</p>
                      <p className="text-gray-600">Current GPA</p>
                    </div>
                    <div className="border-t pt-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Credits</span>
                          <span className="font-semibold">48</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Completed</span>
                          <span className="font-semibold">36</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">In Progress</span>
                          <span className="font-semibold">12</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;