import React, { useState } from 'react';
import { Search, Filter, Plus, BookOpen, Users, Clock, ChevronDown } from 'lucide-react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const courses = [
  {
    id: 1,
    title: 'Advanced JavaScript Development',
    description: 'Master modern JavaScript concepts and best practices',
    instructor: 'Sarah Johnson',
    students: 128,
    duration: '8 weeks',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 2,
    title: 'UI/UX Design Fundamentals',
    description: 'Learn the principles of user interface and experience design',
    instructor: 'Michael Chen',
    students: 95,
    duration: '6 weeks',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 3,
    title: 'Data Science Essentials',
    description: 'Introduction to data analysis and machine learning',
    instructor: 'Emily Rodriguez',
    students: 156,
    duration: '10 weeks',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
];

export default function Courses() {
  const location = useLocation();
  const isHR = location.pathname.includes('hr-dashboard');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <DashboardLayout role={isHR ? 'hr' : 'student'}>
      <div className="min-h-screen bg-gray-50/30">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center space-x-3">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
              >
                Courses
              </motion.h1>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {courses.length} Total
              </span>
            </div>
            {isHR && (
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn bg-gradient-to-r from-primary to-primary/80 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Course
              </motion.button>
            )}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 backdrop-blur-xl"
          >
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 outline-none"
                  />
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <div className="relative">
                    <button 
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                      className="w-full sm:w-auto flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-primary bg-gray-50/50 hover:bg-gray-50 rounded-xl border border-gray-200 transition-all duration-300"
                    >
                      <Filter className="h-5 w-5 mr-2" />
                      Filter
                      <ChevronDown className={`h-4 w-4 ml-2 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isFilterOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10"
                      >
                        <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">
                          Newest First
                        </button>
                        <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">
                          Most Popular
                        </button>
                        <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">
                          Duration
                        </button>
                      </motion.div>
                    )}
                  </div>
                  <select className="px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 outline-none">
                    <option>All Categories</option>
                    <option>Programming</option>
                    <option>Design</option>
                    <option>Data Science</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -5 }}
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <h3 className="text-white font-semibold line-clamp-2 text-lg">
                          {course.title}
                        </h3>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                        {course.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2 mb-4">{course.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1.5 text-primary" />
                            <span>{course.students} students</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1.5 text-primary" />
                            <span>{course.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                        <div className="flex items-center">
                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                              course.instructor
                            )}&background=random`}
                            alt={course.instructor}
                            className="h-8 w-8 rounded-full ring-2 ring-white"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-700">{course.instructor}</span>
                        </div>
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 text-sm font-medium text-primary hover:text-white hover:bg-primary rounded-lg transition-all duration-300"
                        >
                          {isHR ? 'Edit Course' : 'View Course'}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}