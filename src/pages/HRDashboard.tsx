import React from 'react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { Users, BookOpen, Award, TrendingUp, ArrowRight, Clock, Calendar, Bell } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Link } from 'react-router-dom';

const performanceData = [
  { month: 'Jan', students: 2100, completion: 85 },
  { month: 'Feb', students: 2400, completion: 88 },
  { month: 'Mar', students: 2200, completion: 90 },
  { month: 'Apr', students: 2800, completion: 87 },
  { month: 'May', students: 2600, completion: 92 },
  { month: 'Jun', students: 3000, completion: 95 },
];

const courseDistribution = [
  { name: 'Active', value: 63, color: '#2563eb' },
  { name: 'Completed', value: 27, color: '#16a34a' },
  { name: 'Upcoming', value: 10, color: '#6b7280' },
];

const recentActivities = [
  {
    id: 1,
    user: 'Sarah Johnson',
    action: 'completed',
    subject: 'Advanced JavaScript Development',
    time: '2 hours ago',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    user: 'Michael Chen',
    action: 'enrolled in',
    subject: 'UI/UX Design Fundamentals',
    time: '4 hours ago',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 3,
    user: 'Emily Rodriguez',
    action: 'submitted',
    subject: 'Data Science Project',
    time: '6 hours ago',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

const metrics = [
  {
    id: 1,
    name: 'Total Students',
    value: '2,847',
    change: '+12.5%',
    icon: Users,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    id: 2,
    name: 'Active Courses',
    value: '184',
    change: '+8.2%',
    icon: BookOpen,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    id: 3,
    name: 'Completion Rate',
    value: '94.2%',
    change: '+5.4%',
    icon: Award,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
  {
    id: 4,
    name: 'Average Score',
    value: '87.3',
    change: '+3.2%',
    icon: TrendingUp,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
];

export default function HRDashboard() {
  return (
    <DashboardLayout role="hr">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-accent rounded-2xl p-8">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Admin! 👋</h1>
            <p className="text-white/90 text-lg">Here's what's happening with your learning platform today.</p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.id}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl ${metric.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                  <span className={`text-sm font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-600 group-hover:scale-105 transition-transform duration-300`}>
                    {metric.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mt-4 group-hover:translate-x-1 transition-transform duration-300">
                  {metric.value}
                </h3>
                <p className="text-gray-600 mt-1">{metric.name}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Performance Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Performance Overview</h2>
                <p className="text-gray-600 text-sm mt-1">Student engagement and completion rates</p>
              </div>
              <select className="text-sm border border-gray-200 bg-gray-50 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
                <option>Last 6 months</option>
                <option>Last year</option>
                <option>All time</option>
              </select>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCompletion" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16a34a" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                      padding: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="students"
                    stroke="#2563eb"
                    strokeWidth={2}
                    fill="url(#colorStudents)"
                    name="Active Students"
                  />
                  <Area
                    type="monotone"
                    dataKey="completion"
                    stroke="#16a34a"
                    strokeWidth={2}
                    fill="url(#colorCompletion)"
                    name="Completion Rate"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Course Distribution */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Course Distribution</h2>
            <p className="text-gray-600 text-sm mb-6">Overview of course statuses</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={courseDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {courseDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                      padding: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 space-y-2">
              {courseDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
              <p className="text-gray-600 text-sm mt-1">Latest updates from students</p>
            </div>
            <Link
              to="/hr/activities"
              className="flex items-center text-sm text-primary hover:text-primary-dark transition-colors"
            >
              View all
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-6">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <img
                  src={activity.image}
                  alt={activity.user}
                  className="w-10 h-10 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span>
                    {' '}{activity.action}{' '}
                    <span className="font-medium">{activity.subject}</span>
                  </p>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}