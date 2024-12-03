import React, { useState, useEffect } from 'react';
import { BarChart2, TrendingUp, Users, Award, Clock, Calendar, Download, Filter, BookOpen, Target, Brain, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../components/layouts/DashboardLayout';
import EngagementChart from '../components/analytics/EngagementChart';
import ScoreDistributionChart from '../components/analytics/ScoreDistributionChart';
import CompletionRateChart from '../components/analytics/CompletionRateChart';
import SkillProgressChart from '../components/analytics/SkillProgressChart';

const performanceMetrics = [
  {
    id: 1,
    title: 'Average Course Completion',
    value: '87%',
    change: '+5.2%',
    trend: 'up',
    icon: Target,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    description: 'Overall course completion rate across all students',
  },
  {
    id: 2,
    title: 'Active Students',
    value: '2,847',
    change: '+12.5%',
    trend: 'up',
    icon: Users,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    description: 'Number of students actively engaging with courses',
  },
  {
    id: 3,
    title: 'Average Test Score',
    value: '92.3%',
    change: '+3.7%',
    trend: 'up',
    icon: Brain,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    description: 'Mean score across all assessments and tests',
  },
  {
    id: 4,
    title: 'Learning Hours',
    value: '12,458',
    change: '+8.3%',
    trend: 'up',
    icon: Clock,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    description: 'Total hours spent learning across all students',
  },
];

const chartContainerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const metricCardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export default function Analytics() {
  const [dateRange, setDateRange] = useState('last30Days');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout role="hr">
      <div className="min-h-screen bg-gray-50 p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header with Filters */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Learning Analytics</h1>
              <p className="text-gray-600 mt-1">Track and analyze student performance metrics</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-700 hover:border-primary transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="last7Days">Last 7 Days</option>
                  <option value="last30Days">Last 30 Days</option>
                  <option value="last3Months">Last 3 Months</option>
                  <option value="lastYear">Last Year</option>
                </select>
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </motion.div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary transition-all duration-300"
              >
                <Download className="h-5 w-5 mr-2" />
                Export Report
              </motion.button>
            </div>
          </motion.div>

          {/* Key Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <AnimatePresence>
              {performanceMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <motion.div
                    key={metric.id}
                    variants={metricCardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, translateY: -5 }}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg p-6 transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl ${metric.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className={`h-6 w-6 ${metric.color}`} />
                        </div>
                        <motion.span 
                          className={`text-sm font-medium ${
                            metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                          } px-2 py-1 rounded-full bg-opacity-10 ${
                            metric.trend === 'up' ? 'bg-green-50' : 'bg-red-50'
                          }`}
                        >
                          {metric.change}
                        </motion.span>
                      </div>
                      <h3 className="text-gray-600 text-sm font-medium">{metric.title}</h3>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                      <p className="text-sm text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {metric.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Student Engagement Chart */}
            <motion.div
              variants={chartContainerVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-xl shadow-sm hover:shadow-lg p-6 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Student Engagement</h2>
                  <p className="text-sm text-gray-500 mt-1">Daily active participation trends</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">vs previous period</span>
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+12.5%</span>
                </div>
              </div>
              {!isLoading && <EngagementChart />}
              {isLoading && (
                <div className="animate-pulse">
                  <div className="h-64 bg-gray-100 rounded-lg"></div>
                </div>
              )}
            </motion.div>

            {/* Score Distribution */}
            <motion.div
              variants={chartContainerVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-xl shadow-sm hover:shadow-lg p-6 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Score Distribution</h2>
                  <p className="text-sm text-gray-500 mt-1">Performance across all assessments</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Average Score</span>
                  <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">92.3%</span>
                </div>
              </div>
              {!isLoading && <ScoreDistributionChart />}
              {isLoading && (
                <div className="animate-pulse">
                  <div className="h-64 bg-gray-100 rounded-lg"></div>
                </div>
              )}
            </motion.div>

            {/* Course Completion Rate */}
            <motion.div
              variants={chartContainerVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-xl shadow-sm hover:shadow-lg p-6 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Course Completion Rate</h2>
                  <p className="text-sm text-gray-500 mt-1">Progress tracking across courses</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Total Courses</span>
                  <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">24</span>
                </div>
              </div>
              {!isLoading && <CompletionRateChart />}
              {isLoading && (
                <div className="animate-pulse">
                  <div className="h-64 bg-gray-100 rounded-lg"></div>
                </div>
              )}
            </motion.div>

            {/* Skill Progress */}
            <motion.div
              variants={chartContainerVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-xl shadow-sm hover:shadow-lg p-6 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Skill Progress</h2>
                  <p className="text-sm text-gray-500 mt-1">Competency development tracking</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Overall Progress</span>
                  <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">83.3%</span>
                </div>
              </div>
              {!isLoading && <SkillProgressChart />}
              {isLoading && (
                <div className="animate-pulse">
                  <div className="h-64 bg-gray-100 rounded-lg"></div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}