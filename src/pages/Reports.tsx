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
      <div className="min-h-screen bg-gray-50/30">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto">
            {/* Mobile Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-4 mb-6 sm:mb-8"
            >
              <div className="flex items-center justify-between">
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Reports Dashboard
                </h1>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center px-4 py-2.5 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:border-primary/60 hover:text-primary transition-all duration-200 shadow-sm"
                >
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Schedule Report
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowGenerateModal(true)}
                  className="flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-primary to-primary/80 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Generate Report
                </motion.button>
              </div>
            </motion.div>

            {/* Reports Section */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <motion.div whileTap={{ scale: 0.97 }} className="relative flex-1 sm:flex-none">
                      <select 
                        className="w-full sm:w-auto appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 pr-9 text-sm font-medium text-gray-700 hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
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
              </div>

              <div className="p-4 sm:p-6">
                <AnimatePresence>
                  {isLoading ? (
                    <div className="space-y-3 sm:space-y-4">
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
                      className="space-y-3 sm:space-y-4"
                    >
                      {filteredReports.map((report) => (
                        <motion.div
                          key={report.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          whileHover={{ scale: 1.01 }}
                          className="group flex flex-col p-4 sm:p-6 bg-white rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all duration-200"
                        >
                          <div className="flex-1 mb-4 sm:mb-0">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                              {report.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 mt-1">{report.description}</p>
                            <div className="flex flex-wrap items-center gap-2 mt-3">
                              <span className="text-[10px] sm:text-xs text-gray-500">
                                Last generated: {report.lastGenerated}
                              </span>
                              <span className="text-[10px] sm:text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium">
                                {report.type}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <motion.button 
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-primary hover:text-white hover:bg-primary rounded-lg transition-all duration-200"
                            >
                              <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
                              Download
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Generate Report Modal - Mobile Optimized */}
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
              <div className="sticky top-0 bg-white border-b border-gray-100 p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">Generate New Report</h2>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowGenerateModal(false)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-5 w-5 sm:h-6 sm:w-6" />
                  </motion.button>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <form onSubmit={handleGenerate} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-4">
                      Report Type
                    </label>
                    <div className="grid grid-cols-1 gap-3 sm:gap-4">
                      {reportTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <motion.label
                            key={type.id}
                            whileTap={{ scale: 0.98 }}
                            className={`flex items-start p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              formData.reportType === type.id
                                ? 'border-primary bg-primary/5 shadow-sm'
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
                            <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${
                              formData.reportType === type.id ? 'text-primary' : 'text-gray-400'
                            } transition-colors`} />
                            <div className="ml-3 sm:ml-4">
                              <p className="text-sm font-medium text-gray-900">{type.name}</p>
                              <p className="text-xs sm:text-sm text-gray-500 mt-1">{type.description}</p>
                            </div>
                          </motion.label>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4 border-t border-gray-100">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => setShowGenerateModal(false)}
                      className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      disabled={isGenerating}
                      className="w-full sm:w-auto flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-primary to-primary/80 rounded-lg shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
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