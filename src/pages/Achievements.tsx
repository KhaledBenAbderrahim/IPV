import React from 'react';
import { Award, Trophy, Star, Medal, Download } from 'lucide-react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const achievements = [
  {
    id: 1,
    title: 'Course Champion',
    description: 'Completed 5 courses with distinction',
    icon: Trophy,
    progress: 100,
    date: 'March 1, 2024',
  },
  {
    id: 2,
    title: 'Perfect Attendance',
    description: 'Attended all scheduled sessions for 3 months',
    icon: Star,
    progress: 75,
    date: 'In Progress',
  },
  {
    id: 3,
    title: 'Knowledge Master',
    description: 'Achieved top scores in 3 assessments',
    icon: Medal,
    progress: 60,
    date: 'In Progress',
  },
];

const certificates = [
  {
    id: 1,
    title: 'Advanced JavaScript Development',
    issueDate: 'February 15, 2024',
    instructor: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 2,
    title: 'UI/UX Design Fundamentals',
    issueDate: 'January 30, 2024',
    instructor: 'Michael Chen',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
];

export default function Achievements() {
  const location = useLocation();
  const isHR = location.pathname.includes('hr-dashboard');

  return (
    <DashboardLayout role={isHR ? 'hr' : 'student'}>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-3 sm:p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-8">
            {/* Achievements */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg lg:text-xl font-semibold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                  Current Progress
                </h2>
                <span className="text-xs sm:text-sm text-slate-500">
                  {achievements.length} Achievements
                </span>
              </div>

              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.01, translateY: -2 }}
                    whileTap={{ scale: 0.99 }}
                    className="group bg-white rounded-xl shadow-sm hover:shadow-lg p-3 sm:p-4 lg:p-6 transition-all duration-200 border border-slate-100"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="p-2 sm:p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                          <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-slate-900">
                            {achievement.title}
                          </h3>
                          <span className="text-[10px] sm:text-xs lg:text-sm text-slate-500">{achievement.date}</span>
                        </div>
                        <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-slate-600 line-clamp-2">
                          {achievement.description}
                        </p>
                        <div className="mt-2 sm:mt-3">
                          <div className="flex items-center justify-between text-xs sm:text-sm mb-1.5">
                            <span className="font-medium text-slate-700">Progress</span>
                            <span className="text-primary font-medium">{achievement.progress}%</span>
                          </div>
                          <div className="h-1.5 sm:h-2 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${achievement.progress}%` }}
                              transition={{ duration: 0.5, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-primary to-primary-dark"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Certificates */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg lg:text-xl font-semibold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                  Certificates
                </h2>
                <span className="text-xs sm:text-sm text-slate-500">
                  {certificates.length} Earned
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {certificates.map((certificate) => (
                  <motion.div
                    key={certificate.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02, translateY: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-200 border border-slate-100"
                  >
                    <div className="relative aspect-video sm:aspect-[3/2] overflow-hidden bg-slate-100">
                      <img
                        src={certificate.image}
                        alt={certificate.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="font-semibold text-slate-900 text-sm sm:text-base lg:text-lg line-clamp-1">
                        {certificate.title}
                      </h3>
                      <div className="mt-1 space-y-0.5">
                        <p className="text-[10px] sm:text-xs lg:text-sm text-slate-600">
                          Instructor: {certificate.instructor}
                        </p>
                        <p className="text-[10px] sm:text-xs lg:text-sm text-slate-600">
                          Issued: {certificate.issueDate}
                        </p>
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-2 sm:mt-3 w-full flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-primary hover:text-white bg-white hover:bg-primary active:bg-primary-dark transition-all duration-200 border border-primary/20 rounded-lg hover:border-primary group"
                      >
                        <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 transition-transform duration-200 group-hover:translate-y-0.5" />
                        Download Certificate
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}