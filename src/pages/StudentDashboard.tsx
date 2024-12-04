import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Calendar, 
  Trophy, 
  Clock, 
  Target, 
  TrendingUp,
  Bell,
  Users,
  Zap
} from 'lucide-react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import StudentMetrics from '../components/dashboard/student/StudentMetrics';
import CourseGrid from '../components/dashboard/student/CourseGrid';
import UpcomingActivities from '../components/dashboard/student/UpcomingActivities';
import PerformanceAnalytics from '../components/dashboard/student/PerformanceAnalytics';
import QuickActions from '../components/dashboard/student/QuickActions';

const WelcomeCard = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-accent p-4 sm:p-8"
  >
    <div className="relative z-10">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Welcome back, Sarah! 👋</h1>
        <p className="mt-2 text-sm sm:text-base text-white/90">Your learning journey continues. You're making great progress!</p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-4 sm:mt-6 flex flex-wrap gap-3"
      >
        <div className="flex items-center space-x-2 bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg">
          <Target className="h-4 sm:h-5 w-4 sm:w-5 text-white" />
          <span className="text-sm text-white">85% Progress</span>
        </div>
        <div className="flex items-center space-x-2 bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg">
          <Trophy className="h-4 sm:h-5 w-4 sm:w-5 text-white" />
          <span className="text-sm text-white">12 Achievements</span>
        </div>
      </motion.div>
    </div>
    
    {/* Decorative Elements */}
    <div className="absolute top-0 right-0 w-32 sm:w-48 h-32 sm:h-48 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
    <div className="absolute bottom-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-black/10 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2" />
  </motion.div>
);

const QuickStatsCard = ({ icon: Icon, label, value, trend, color }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300"
  >
    <div className="flex items-center justify-between">
      <div className={`p-2 sm:p-3 rounded-lg ${color} bg-opacity-10`}>
        <Icon className={`h-5 sm:h-6 w-5 sm:w-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      {trend && (
        <span className="text-xs sm:text-sm text-green-500 font-medium flex items-center gap-1">
          <TrendingUp className="h-3 sm:h-4 w-3 sm:w-4" />
          {trend}
        </span>
      )}
    </div>
    <div className="mt-3 sm:mt-4">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{value}</h3>
      <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">{label}</p>
    </div>
  </motion.div>
);

const NotificationCard = ({ title, time, type, read }) => (
  <motion.div
    whileHover={{ x: 5 }}
    className={`p-3 sm:p-4 rounded-lg border-l-4 ${
      read ? 'border-gray-200 bg-gray-50' : 'border-primary bg-primary/5'
    } mb-2 sm:mb-3`}
  >
    <div className="flex items-center justify-between">
      <h4 className="text-sm sm:text-base font-medium text-gray-900">{title}</h4>
      <span className="text-xs sm:text-sm text-gray-500">{time}</span>
    </div>
    <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">{type}</p>
  </motion.div>
);

export default function StudentDashboard() {
  return (
    <DashboardLayout role="student">
      <div className="min-h-screen bg-gray-50/50">
        <div className="max-w-7xl mx-auto p-3 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
          {/* Welcome Section */}
          <WelcomeCard />

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <QuickStatsCard
              icon={BookOpen}
              label="Active Courses"
              value="4"
              trend="+2"
              color="bg-blue-500"
            />
            <QuickStatsCard
              icon={Clock}
              label="Study Hours"
              value="32.5h"
              trend="+5.2h"
              color="bg-green-500"
            />
            <QuickStatsCard
              icon={Target}
              label="Completion"
              value="85%"
              trend="+12%"
              color="bg-purple-500"
            />
            <QuickStatsCard
              icon={Trophy}
              label="Achievements"
              value="12"
              trend="2 new"
              color="bg-yellow-500"
            />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-sm"
              >
                <h2 className="text-lg sm:text-xl font-bold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {[
                    { icon: BookOpen, label: 'Continue Learning', color: 'bg-blue-500' },
                    { icon: Calendar, label: 'Schedule Session', color: 'bg-purple-500' },
                    { icon: Users, label: 'Join Study Group', color: 'bg-green-500' },
                    { icon: Zap, label: 'Take Practice Test', color: 'bg-yellow-500' },
                  ].map((action) => (
                    <motion.button
                      key={action.label}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center p-3 sm:p-4 rounded-xl hover:bg-gray-50 transition-colors active:bg-gray-100"
                    >
                      <div className={`${action.color} bg-opacity-10 p-2 sm:p-3 rounded-lg mb-2 sm:mb-3`}>
                        <action.icon className={`h-5 sm:h-6 w-5 sm:w-6 ${action.color.replace('bg-', 'text-')}`} />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">
                        {action.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Course Progress */}
              <CourseGrid />

              {/* Upcoming Activities */}
              <UpcomingActivities />
            </div>

            {/* Right Column */}
            <div className="space-y-6 sm:space-y-8">
              {/* Performance Analytics */}
              <PerformanceAnalytics />

              {/* Recent Notifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-bold">Recent Notifications</h2>
                  <Bell className="h-4 sm:h-5 w-4 sm:w-5 text-gray-400" />
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <NotificationCard
                    title="New Course Available"
                    time="2h ago"
                    type="Advanced JavaScript Patterns"
                    read={false}
                  />
                  <NotificationCard
                    title="Assignment Due"
                    time="1d ago"
                    type="React Fundamentals - Final Project"
                    read={false}
                  />
                  <NotificationCard
                    title="Achievement Unlocked"
                    time="2d ago"
                    type="Completed 5 courses milestone"
                    read={true}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}