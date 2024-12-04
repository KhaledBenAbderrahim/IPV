import React, { useState } from 'react';
import { Search, Filter, Plus, BookOpen, Users, Clock, ChevronDown, ChevronRight, Star } from 'lucide-react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const courses = [
  {
    id: 1,
    title: 'Advanced JavaScript Development',
    description: 'Master modern JavaScript concepts and best practices',
    instructor: 'Sarah Johnson',
    students: 128,
    duration: '8 weeks',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    progress: 50,
    rating: 4.5,
  },
  {
    id: 2,
    title: 'UI/UX Design Fundamentals',
    description: 'Learn the principles of user interface and experience design',
    instructor: 'Michael Chen',
    students: 95,
    duration: '6 weeks',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    progress: 30,
    rating: 4.2,
  },
  {
    id: 3,
    title: 'Data Science Essentials',
    description: 'Introduction to data analysis and machine learning',
    instructor: 'Emily Rodriguez',
    students: 156,
    duration: '10 weeks',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    progress: 20,
    rating: 4.8,
  },
];

export default function Courses() {
  const location = useLocation();
  const isHR = location.pathname.includes('hr-dashboard');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  return (
    <DashboardLayout role={isHR ? 'hr' : 'student'}>
      <div className="min-h-screen bg-gray-50/30">
        {/* Mobile Header */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-200 sm:hidden">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
              >
                Courses
                <span className="ml-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {courses.length}
                </span>
              </motion.h1>
              {isHR && (
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center p-2 rounded-lg bg-primary text-white shadow-sm"
                >
                  <Plus className="h-5 w-5" />
                </motion.button>
              )}
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-300 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-50/50 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
            >
              <option value="all">All Categories</option>
              <option value="development">Development</option>
              <option value="design">Design</option>
              <option value="business">Business</option>
            </select>
            
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-50/50 rounded-lg border border-gray-200"
            >
              <Filter className="h-4 w-4 mr-1.5" />
              Sort By
              <ChevronDown className={`h-4 w-4 ml-1.5 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="max-w-7xl mx-auto">
            {/* Desktop Header - Hidden on Mobile */}
            <div className="hidden sm:flex sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
              <div className="flex items-center flex-wrap gap-3">
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
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

            {/* Desktop Search and Filters - Hidden on Mobile */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden sm:block bg-white rounded-2xl shadow-lg shadow-gray-200/50 backdrop-blur-xl mb-6"
            >
              <div className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="relative w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search courses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 outline-none"
                    />
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-50/50 hover:bg-gray-50 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 appearance-none"
                      >
                        <option value="all">All Categories</option>
                        <option value="development">Development</option>
                        <option value="design">Design</option>
                        <option value="business">Business</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                    
                    <div className="relative">
                      <button 
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-primary bg-gray-50/50 hover:bg-gray-50 rounded-xl border border-gray-200 transition-all duration-300"
                      >
                        <Filter className="h-5 w-5 mr-2" />
                        Sort By
                        <ChevronDown className={`h-4 w-4 ml-2 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sort Options Dropdown - Absolute for Mobile */}
            {isFilterOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="sm:absolute sm:right-0 sm:mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-30"
              >
                <button 
                  onClick={() => {
                    setSortBy('newest');
                    setIsFilterOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-sm text-left ${sortBy === 'newest' ? 'text-primary bg-primary/5' : 'text-gray-700'} hover:bg-gray-50 transition-colors`}
                >
                  Newest First
                </button>
                <button 
                  onClick={() => {
                    setSortBy('popular');
                    setIsFilterOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-sm text-left ${sortBy === 'popular' ? 'text-primary bg-primary/5' : 'text-gray-700'} hover:bg-gray-50 transition-colors`}
                >
                  Most Popular
                </button>
              </motion.div>
            )}

            {/* Course Grid - Mobile Optimized */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="relative aspect-video">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    {course.progress !== undefined && (
                      <div className="absolute top-3 left-3 right-3">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full h-1.5 overflow-hidden">
                          <motion.div
                            className="h-full bg-primary rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${course.progress}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          />
                        </div>
                        <p className="text-white text-xs mt-1">{course.progress}% Complete</p>
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-base sm:text-lg font-semibold text-white line-clamp-2 group-hover:text-primary-light transition-colors">
                        {course.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-3 sm:p-4">
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-3 h-8 sm:h-10">{course.description}</p>
                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-3">
                      <div className="flex items-center text-xs text-gray-500">
                        <Users className="h-3.5 w-3.5 mr-1 text-primary" />
                        <span>{course.students} students</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3.5 w-3.5 mr-1 text-primary" />
                        <span>{course.duration}</span>
                      </div>
                      {course.rating && (
                        <div className="flex items-center text-xs text-gray-500">
                          <Star className="h-3.5 w-3.5 mr-1 text-yellow-400 fill-current" />
                          <span>{course.rating.toFixed(1)} Rating</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center">
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(course.instructor)}&background=random`}
                          alt={course.instructor}
                          className="h-6 w-6 sm:h-8 sm:w-8 rounded-full border-2 border-white shadow-sm"
                        />
                        <div className="ml-2">
                          <p className="text-xs font-medium text-gray-900 line-clamp-1">{course.instructor}</p>
                          <p className="text-xs text-gray-500">Instructor</p>
                        </div>
                      </div>
                      <Link
                        to={`/courses/${course.id}`}
                        className="inline-flex items-center px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium text-primary hover:bg-primary hover:text-white transition-all duration-200"
                      >
                        {isHR ? 'Edit' : 'View'}
                        <ChevronRight className="ml-1 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}