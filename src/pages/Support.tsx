import React, { useState } from 'react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { MessageSquare, Phone, Mail, Send, Upload, HelpCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Support() {
  const location = useLocation();
  const isHR = location.pathname.includes('hr');
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle support ticket submission
    setMessage('');
    setFiles(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = e.dataTransfer.files;
    setFiles(droppedFiles);
  };

  return (
    <DashboardLayout role={isHR ? 'hr' : 'student'}>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Mobile Header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-slate-200 px-3 py-2.5 sm:hidden">
          <div className="flex items-center space-x-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            <h1 className="text-base font-semibold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">Support</h1>
          </div>
        </div>

        <div className="p-3 sm:p-4 lg:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Desktop Header */}
            <div className="hidden sm:flex items-center space-x-3 mb-6 lg:mb-8">
              <HelpCircle className="h-6 w-6 lg:h-8 lg:w-8 text-primary" />
              <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                Support Center
              </h1>
            </div>

            {/* Support Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <motion.button 
                whileHover={{ scale: 1.02, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group bg-white rounded-xl shadow-sm border border-slate-200 p-3 sm:p-4 text-left transition-all duration-200 hover:shadow-md hover:border-primary/20"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-2 sm:mb-3 group-hover:bg-primary/20 transition-colors">
                  <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-slate-800 text-xs sm:text-sm mb-0.5 sm:mb-1">Live Chat</h3>
                <p className="text-slate-600 text-[10px] sm:text-xs">Available 24/7</p>
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.02, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group bg-white rounded-xl shadow-sm border border-slate-200 p-3 sm:p-4 text-left transition-all duration-200 hover:shadow-md hover:border-purple-500/20"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-2 sm:mb-3 group-hover:bg-purple-100 transition-colors">
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-800 text-xs sm:text-sm mb-0.5 sm:mb-1">Phone Support</h3>
                <p className="text-slate-600 text-[10px] sm:text-xs">Mon-Fri, 9am-5pm</p>
                <p className="text-purple-600 text-xs sm:text-sm font-medium mt-1 sm:mt-2">+1 (555) 000-0000</p>
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.02, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group bg-white rounded-xl shadow-sm border border-slate-200 p-3 sm:p-4 text-left transition-all duration-200 hover:shadow-md hover:border-amber-500/20"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-2 sm:mb-3 group-hover:bg-amber-100 transition-colors">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
                </div>
                <h3 className="font-semibold text-slate-800 text-xs sm:text-sm mb-0.5 sm:mb-1">Email Support</h3>
                <p className="text-slate-600 text-[10px] sm:text-xs">Response within 24h</p>
                <p className="text-amber-600 text-xs sm:text-sm font-medium mt-1 sm:mt-2">support@edumaster.com</p>
              </motion.button>
            </div>

            {/* Support Ticket Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
            >
              <div className="p-3 sm:p-4 border-b border-slate-200">
                <h2 className="text-sm sm:text-base font-semibold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                  Submit a Support Ticket
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-slate-700 mb-1 sm:mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-2.5 sm:px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder-slate-400"
                    placeholder="Brief description of your issue"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-slate-700 mb-1 sm:mb-1.5">
                    Category
                  </label>
                  <select className="w-full px-2.5 sm:px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-slate-600">
                    <option value="">Select a category</option>
                    <option>Technical Issue</option>
                    <option>Account Access</option>
                    <option>Course Content</option>
                    <option>Billing</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-slate-700 mb-1 sm:mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-2.5 sm:px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder-slate-400 resize-none"
                    placeholder="Describe your issue in detail..."
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-slate-700 mb-1 sm:mb-1.5">
                    Attachments (Optional)
                  </label>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-lg p-3 sm:p-4 text-center transition-all ${
                      isDragging
                        ? 'border-primary bg-primary/5'
                        : 'border-slate-200 hover:border-primary hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="file"
                      className="hidden"
                      id="file-upload"
                      multiple
                      onChange={(e) => setFiles(e.target.files)}
                    />
                    <div className="flex flex-col items-center">
                      <Upload className={`h-5 w-5 sm:h-6 sm:w-6 mb-1.5 sm:mb-2 ${isDragging ? 'text-primary' : 'text-slate-400'}`} />
                      <label
                        htmlFor="file-upload"
                        className="text-primary hover:text-primary-dark text-xs sm:text-sm font-medium cursor-pointer transition-colors"
                      >
                        Click to upload
                      </label>
                      <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1">
                        or drag and drop files here
                      </p>
                      {files && (
                        <div className="mt-2 sm:mt-3 text-[10px] sm:text-xs text-slate-600">
                          {files.length} file(s) selected
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full inline-flex items-center justify-center px-4 py-2 sm:py-2.5 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white text-xs sm:text-sm font-medium hover:from-primary-dark hover:to-primary transform transition-all duration-200 hover:shadow-lg hover:shadow-primary/25"
                >
                  <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                  Submit Ticket
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}