import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Mail, Phone, MapPin, BookOpen, Award, Clock, Calendar, ChevronDown, Info } from 'lucide-react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';

const studentData = {
  id: 1,
  name: 'Sarah Johnson',
  email: 'sarah.j@example.com',
  phone: '+1 (555) 000-0001',
  location: 'San Francisco, CA',
  enrollmentDate: 'January 15, 2024',
  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  education: {
    degree: 'Bachelor of Science',
    major: 'Computer Science',
    university: 'Stanford University',
    graduationYear: '2023',
  },
  stats: [
    { label: 'Enrolled Courses', value: '3' },
    { label: 'Completed Courses', value: '5' },
    { label: 'Avg. Score', value: '92%' },
    { label: 'Certificates', value: '4' },
  ],
  courses: [
    {
      id: 1,
      title: 'Advanced JavaScript Development',
      progress: 75,
      lastAccessed: '2 hours ago',
    },
    {
      id: 2,
      title: 'UI/UX Design Fundamentals',
      progress: 45,
      lastAccessed: '1 day ago',
    },
    {
      id: 3,
      title: 'Data Science Essentials',
      progress: 90,
      lastAccessed: '3 hours ago',
    },
  ],
  achievements: [
    {
      id: 1,
      title: 'Course Champion',
      description: 'Completed 5 courses with distinction',
      date: 'March 1, 2024',
    },
    {
      id: 2,
      title: 'Perfect Attendance',
      description: 'Attended all scheduled sessions for 3 months',
      date: 'February 15, 2024',
    },
  ],
};

export default function StudentProfile() {
  const { id } = useParams();
  const [expandedSections, setExpandedSections] = useState({
    contact: false,
    education: false,
    courses: true,
    achievements: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <DashboardLayout role="hr">
      <div className="p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header - Simplified for mobile */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
            <div className="h-20 sm:h-32 bg-primary/10" />
            <div className="px-4 py-4 sm:px-8 sm:pb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between -mt-14 sm:-mt-16">
                <div className="flex items-center flex-col sm:flex-row">
                  <img
                    src={studentData.image}
                    alt={studentData.name}
                    className="h-20 w-20 sm:h-32 sm:w-32 rounded-lg border-4 border-white shadow-sm"
                  />
                  <div className="mt-3 sm:mt-0 sm:ml-6 text-center sm:text-left">
                    <h1 className="text-lg sm:text-2xl font-bold text-dark">{studentData.name}</h1>
                    <p className="text-light text-sm">#{id} • {studentData.education.major}</p>
                  </div>
                </div>
                <div className="flex justify-center gap-2 mt-4 sm:mt-0">
                  <button className="btn-primary text-sm px-3 py-1.5">Message</button>
                  <button className="btn-outline text-sm px-3 py-1.5">Report</button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats - Always visible */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4">
            {studentData.stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-3 text-center">
                <p className="text-lg sm:text-2xl font-semibold text-primary">{stat.value}</p>
                <p className="text-xs text-light">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Collapsible Sections */}
          <div className="space-y-3">
            {/* Contact Information */}
            <motion.div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('contact')}
                className="w-full px-4 py-3 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <Info className="h-4 w-4 text-primary mr-2" />
                  <h2 className="text-sm font-semibold">Contact Info</h2>
                </div>
                <motion.div
                  animate={{ rotate: expandedSections.contact ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {expandedSections.contact && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-2">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-light mr-2" />
                        <span className="text-sm text-dark">{studentData.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-light mr-2" />
                        <span className="text-sm text-dark">{studentData.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-light mr-2" />
                        <span className="text-sm text-dark">{studentData.location}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Current Courses - Expanded by default */}
            <motion.div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('courses')}
                className="w-full px-4 py-3 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 text-primary mr-2" />
                  <h2 className="text-sm font-semibold">Current Courses</h2>
                </div>
                <motion.div
                  animate={{ rotate: expandedSections.courses ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {expandedSections.courses && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-3">
                      {studentData.courses.map((course) => (
                        <div
                          key={course.id}
                          className="bg-gray-50 rounded-lg p-3"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-dark">{course.title}</h3>
                            <span className="text-sm font-medium text-primary">{course.progress}%</span>
                          </div>
                          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all duration-300"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                          <div className="flex items-center mt-2 text-xs text-light">
                            <Clock className="h-3 w-3 mr-1" />
                            {course.lastAccessed}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Achievements */}
            <motion.div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('achievements')}
                className="w-full px-4 py-3 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <Award className="h-4 w-4 text-primary mr-2" />
                  <h2 className="text-sm font-semibold">Achievements</h2>
                </div>
                <motion.div
                  animate={{ rotate: expandedSections.achievements ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {expandedSections.achievements && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-3">
                      {studentData.achievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className="bg-gray-50 rounded-lg p-3"
                        >
                          <div className="flex items-start">
                            <Award className="h-4 w-4 text-primary mt-0.5" />
                            <div className="ml-2">
                              <h3 className="text-sm font-medium text-dark">{achievement.title}</h3>
                              <p className="text-xs text-light mt-0.5">{achievement.description}</p>
                              <div className="flex items-center mt-1 text-xs text-light">
                                <Calendar className="h-3 w-3 mr-1" />
                                {achievement.date}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}