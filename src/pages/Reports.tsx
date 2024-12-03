import React, { useState, useEffect } from 'react';
import { Download, Filter, Calendar, TrendingUp, X, Loader2, FileText, BarChart2, Users, Clock } from 'lucide-react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const reports = [
  {
    id: 1,
    name: 'Course Completion Report',
    description: 'Overview of student progress and completion rates',
    lastGenerated: '2024-03-10',
    type: 'Performance',
  },
  {
    id: 2,
    name: 'Student Engagement Analysis',
    description: 'Detailed analysis of student participation and interaction',
    lastGenerated: '2024-03-09',
    type: 'Analytics',
  },
  {
    id: 3,
    name: 'Assessment Results Summary',
    description: 'Comprehensive summary of exam and assignment results',
    lastGenerated: '2024-03-08',
    type: 'Academic',
  },
];

const reportTypes = [
  {
    id: 'performance',
    name: 'Performance Report',
    description: 'Student progress and completion rates',
    icon: BarChart2,
  },
  {
    id: 'engagement',
    name: 'Engagement Analysis',
    description: 'Student participation and interaction metrics',
    icon: Users,
  },
  {
    id: 'academic',
    name: 'Academic Results',
    description: 'Exam and assignment outcomes',
    icon: FileText,
  },
  {
    id: 'time',
    name: 'Time Analysis',
    description: 'Learning time and activity patterns',
    icon: Clock,
  },
];

export default function Reports() {
  const location = useLocation();
  const isHR = location.pathname.includes('hr-dashboard');
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [formData, setFormData] = useState({
    reportType: '',
    dateRange: 'last30',
    courses: [] as string[],
    format: 'pdf',
    includeCharts: true,
    scheduledDelivery: false,
    email: '',
  });

  useEffect(() => {
    // Simulate loading state
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    setShowGenerateModal(false);
    setFormData({
      reportType: '',
      dateRange: 'last30',
      courses: [],
      format: 'pdf',
      includeCharts: true,
      scheduledDelivery: false,
      email: '',
    });
  };

  const filteredReports = reports.filter(report => 
    selectedFilter === 'all' || report.type.toLowerCase() === selectedFilter.toLowerCase()
  );

  return (
    <DashboardLayout role={isHR ? 'hr' : 'student'}>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
          >
            <h1 className="text-2xl font-bold text-gray-900">Reports Dashboard</h1>
            <div className="flex flex-wrap gap-4">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-outline group transition-all duration-300 ease-in-out"
              >
                <Calendar className="h-5 w-5 mr-2 group-hover:text-primary transition-colors" />
                Schedule Report
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowGenerateModal(true)}
                className="btn-primary bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary transition-all duration-300"
              >
                <TrendingUp className="h-5 w-5 mr-2" />
                Generate New Report
              </motion.button>
            </div>
          </motion.div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex flex-wrap items-center gap-4">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  <select 
                    className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-700 hover:border-primary transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="Performance">Performance</option>
                    <option value="Analytics">Analytics</option>
                    <option value="Academic">Academic</option>
                  </select>
                  <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </motion.div>
              </div>
            </div>

            <AnimatePresence>
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-24 bg-gray-100 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  {filteredReports.map((report) => (
                    <motion.div
                      key={report.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      whileHover={{ scale: 1.01 }}
                      className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-white rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                          {report.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-3">
                          <span className="text-xs text-gray-500">
                            Last generated: {report.lastGenerated}
                          </span>
                          <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                            {report.type}
                          </span>
                        </div>
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-4 md:mt-0 flex items-center px-4 py-2 text-sm font-medium text-primary hover:text-white hover:bg-primary rounded-lg transition-all duration-300"
                      >
                        <Download className="h-5 w-5 mr-2" />
                        Download
                      </motion.button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showGenerateModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Generate New Report</h2>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowGenerateModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </motion.button>
                </div>

                <form onSubmit={handleGenerate} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-4">
                      Report Type
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {reportTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <motion.label
                            key={type.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              formData.reportType === type.id
                                ? 'border-primary bg-primary/5 shadow-md'
                                : 'border-gray-200 hover:border-primary/60'
                            }`}
                          >
                            <input
                              type="radio"
                              name="reportType"
                              value={type.id}
                              checked={formData.reportType === type.id}
                              onChange={(e) => setFormData({ ...formData, reportType: e.target.value })}
                              className="sr-only"
                            />
                            <Icon className={`h-6 w-6 ${
                              formData.reportType === type.id ? 'text-primary' : 'text-gray-400'
                            } transition-colors`} />
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">{type.name}</p>
                              <p className="text-sm text-gray-500 mt-1">{type.description}</p>
                            </div>
                          </motion.label>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-end gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setShowGenerateModal(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isGenerating}
                      className="btn-primary flex items-center"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <TrendingUp className="h-5 w-5 mr-2" />
                          Generate Report
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}