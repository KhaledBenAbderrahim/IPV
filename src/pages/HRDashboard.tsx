import React, { useState } from 'react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { Users, BookOpen, Award, TrendingUp, ArrowRight, Clock, Calendar, Bell, ChevronDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [selectedTimeRange, setSelectedTimeRange] = useState('6months');
  const [showMetricDetails, setShowMetricDetails] = useState<number | null>(null);

  return (
    <DashboardLayout role="hr">
      <div className="min-h-screen space-y-3 sm:space-y-6 px-3 sm:px-6 py-3 sm:py-6">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-accent rounded-lg sm:rounded-xl p-4 sm:p-6"
        >
          <div className="relative z-10">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">Welcome back, Admin! 👋</h1>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">Here's what's happening with your learning platform today.</p>
          </div>
          <div className="absolute top-0 right-0 w-24 sm:w-48 h-24 sm:h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-16 sm:w-32 h-16 sm:h-32 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl"></div>
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowMetricDetails(metric.id)}
                className="group bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 sm:p-2.5 rounded-lg ${metric.bgColor} group-hover:scale-105 transition-transform duration-200`}>
                    <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${metric.color}`} />
                  </div>
                  <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full bg-green-50 text-green-600 group-hover:scale-105 transition-transform duration-200`}>
                    {metric.change}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mt-2 group-hover:translate-x-0.5 transition-transform duration-200">
                  {metric.value}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-0.5">{metric.name}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Performance Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-4">
              <div>
                <h2 className="text-sm sm:text-base font-semibold text-gray-900">Performance Overview</h2>
                <p className="text-xs text-gray-600 mt-0.5">Student engagement and completion rates</p>
              </div>
              <select 
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="w-full sm:w-auto text-xs sm:text-sm border border-gray-200 bg-gray-50 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option value="6months">Last 6 months</option>
                <option value="1year">Last year</option>
                <option value="all">All time</option>
              </select>
            </div>
            <div className="h-40 sm:h-48 lg:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickMargin={8} />
                  <YAxis stroke="#94a3b8" fontSize={10} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                      padding: '8px',
                      fontSize: '12px'
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
          </motion.div>

          {/* Course Distribution */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4"
          >
            <h2 className="text-sm sm:text-base font-semibold text-gray-900">Course Distribution</h2>
            <p className="text-xs text-gray-600 mt-0.5 mb-3">Overview of course statuses</p>
            <div className="h-32 sm:h-40 lg:h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={courseDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={45}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {courseDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {courseDistribution.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center">
                    <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: item.color }}></div>
                    <span className="text-xs font-medium text-gray-700 ml-1">{item.name}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{item.value}%</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Activities */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4"
        >
          <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">Recent Activities</h2>
          <div className="space-y-2 sm:space-y-3">
            {recentActivities.map((activity) => (
              <motion.div
                key={activity.id}
                whileHover={{ scale: 1.01 }}
                className="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                <img
                  src={activity.image}
                  alt={activity.user}
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                    {activity.user}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {activity.action} <span className="font-medium">{activity.subject}</span>
                  </p>
                </div>
                <div className="flex items-center text-xs text-gray-500 whitespace-nowrap">
                  <Clock className="h-3 w-3 mr-1" />
                  {activity.time}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}