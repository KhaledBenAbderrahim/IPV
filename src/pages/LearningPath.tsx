import React, { useState } from 'react';
import { BookOpen, Award, ArrowRight, CheckCircle, ChevronDown, Trophy, Star, Clock, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { Link, useNavigate } from 'react-router-dom';

const learningPaths = [
  {
    id: 1,
    title: 'E-Commerce Fundamentals',
    description: 'Learn the basics of e-commerce and online business',
    progress: 60,
    totalPoints: 1000,
    earnedPoints: 600,
    estimatedTime: '12 weeks',
    difficulty: 'Intermediate',
    category: 'Business',
    modules: [
      {
        id: 1,
        title: 'Introduction to E-Commerce',
        completed: true,
        points: 200,
        duration: '2 weeks',
      },
      {
        id: 2,
        title: 'Online Store Setup',
        completed: true,
        points: 200,
        duration: '3 weeks',
      },
      {
        id: 3,
        title: 'Payment Processing',
        completed: true,
        points: 200,
        duration: '2 weeks',
      },
      {
        id: 4,
        title: 'Inventory Management',
        completed: false,
        points: 200,
        duration: '3 weeks',
      },
      {
        id: 5,
        title: 'Customer Service',
        completed: false,
        points: 200,
        duration: '2 weeks',
      },
    ],
  },
  {
    id: 2,
    title: 'Digital Marketing',
    description: 'Master digital marketing strategies for e-commerce',
    progress: 40,
    totalPoints: 800,
    earnedPoints: 320,
    estimatedTime: '8 weeks',
    difficulty: 'Beginner',
    category: 'Marketing',
    modules: [
      {
        id: 6,
        title: 'SEO Basics',
        completed: true,
        points: 200,
        duration: '2 weeks',
      },
      {
        id: 7,
        title: 'Social Media Marketing',
        completed: true,
        points: 200,
        duration: '2 weeks',
      },
      {
        id: 8,
        title: 'Email Marketing',
        completed: false,
        points: 200,
        duration: '2 weeks',
      },
      {
        id: 9,
        title: 'Analytics & Reporting',
        completed: false,
        points: 200,
        duration: '2 weeks',
      },
    ],
  },
];

const PathCard = ({ path }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleStartTest = (moduleId) => {
    navigate(`/student/test/${moduleId}`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300"
    >
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{path.title}</h2>
              <span className="px-2 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full">
                {path.difficulty}
              </span>
            </div>
            <p className="text-sm sm:text-base text-gray-600">{path.description}</p>
          </div>
          <div className="flex items-center sm:flex-col sm:items-end gap-2">
            <div className="flex items-center space-x-1">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="text-primary font-medium">{path.earnedPoints}</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-400">{path.totalPoints} pts</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center text-xs sm:text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            {path.estimatedTime}
          </div>
          <div className="flex items-center text-xs sm:text-sm text-gray-500">
            <BookOpen className="h-4 w-4 mr-1" />
            {path.modules.length} modules
          </div>
          <div className="flex items-center text-xs sm:text-sm text-gray-500">
            <Star className="h-4 w-4 mr-1" />
            {path.category}
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs sm:text-sm mb-1">
            <span className="text-gray-500">Progress</span>
            <span className="text-primary font-medium">{path.progress}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${path.progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-primary"
            />
          </div>
        </div>

        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors"
        >
          {isExpanded ? 'Hide Modules' : 'Show Modules'}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-4 w-4 ml-1" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-2 sm:space-y-3 overflow-hidden"
            >
              {path.modules.map((module) => (
                <motion.div
                  key={module.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center flex-1 min-w-0">
                    <div className="flex-shrink-0">
                      {module.completed ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="rounded-full bg-green-100 p-1"
                        >
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                        </motion.div>
                      ) : (
                        <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full border-2 border-gray-300" />
                      )}
                    </div>
                    <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{module.title}</h3>
                      <div className="flex items-center mt-1 space-x-3 sm:space-x-4">
                        <span className="text-xs text-gray-500 flex items-center">
                          <Clock className="inline h-3 w-3 mr-1" />
                          {module.duration}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center">
                          <Trophy className="inline h-3 w-3 mr-1" />
                          {module.points} pts
                        </span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleStartTest(module.id)}
                      className="ml-4 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors flex items-center"
                    >
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Start Test
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default function LearningPath() {
  return (
    <DashboardLayout role="student">
      <div className="min-h-screen bg-background p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center justify-between mb-6 sm:mb-8"
          >
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Learning Paths</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Master e-commerce skills through guided learning paths</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-4 bg-white p-3 sm:p-4 rounded-xl shadow-sm"
            >
              <div className="text-right">
                <p className="text-xs sm:text-sm text-gray-500">Total Points</p>
                <p className="text-lg sm:text-2xl font-bold text-primary">920</p>
              </div>
              <div className="p-2 sm:p-3 bg-primary/10 rounded-xl">
                <Award className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:gap-8">
            {learningPaths.map((path) => (
              <PathCard key={path.id} path={path} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}