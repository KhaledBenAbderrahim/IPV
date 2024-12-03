import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import StudentMetrics from './StudentMetrics';
import CourseGrid from './CourseGrid';
import UpcomingActivities from './UpcomingActivities';
import PerformanceAnalytics from './PerformanceAnalytics';
import QuickActions from './QuickActions';
import { Sparkles, Bell, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StudentDashboard() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <DashboardLayout role="student">
      <div className="min-h-screen bg-gray-50/50">
        {/* Top Bar */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex-1 flex items-center">
                <div className="max-w-xs w-full lg:max-w-lg relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-gray-50/50"
                    placeholder="Search courses, assignments..."
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-400 hover:text-gray-500">
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            {/* Welcome Section */}
            <motion.div
              variants={item}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-accent p-8"
            >
              <div className="absolute inset-0 bg-grid-white/10" />
              <div className="relative">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="mb-6 lg:mb-0">
                    <h1 className="text-4xl font-bold text-white mb-2">Welcome back, Sarah!</h1>
                    <p className="text-lg text-white/80">Ready to continue your learning journey?</p>
                  </div>
                  <button className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/20 shadow-lg">
                    <Sparkles className="h-5 w-5 mr-2" />
                    AI Study Recommendations
                  </button>
                </div>
                
                {/* Progress Overview */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20"
                  >
                    <h3 className="text-white/90 font-medium">Weekly Goal</h3>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-3xl font-bold text-white">8/10</span>
                      <div className="w-24 h-2 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '80%' }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-white"
                        />
                      </div>
                    </div>
                    <p className="mt-2 text-white/70">Hours completed</p>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20"
                  >
                    <h3 className="text-white/90 font-medium">Next Deadline</h3>
                    <p className="mt-3 text-2xl font-bold text-white">JavaScript Final</p>
                    <p className="mt-2 text-white/70">Due in 2 days</p>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20"
                  >
                    <h3 className="text-white/90 font-medium">Achievement Progress</h3>
                    <p className="mt-3 text-2xl font-bold text-white">Course Champion</p>
                    <p className="mt-2 text-white/70">2/5 courses completed</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <motion.div variants={item} className="lg:col-span-2 space-y-8">
                <QuickActions />
                <CourseGrid />
                <UpcomingActivities />
              </motion.div>
              <motion.div variants={item}>
                <PerformanceAnalytics />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}