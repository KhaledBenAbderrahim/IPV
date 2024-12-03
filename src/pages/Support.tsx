import React, { useState } from 'react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { MessageSquare, Phone, Mail, Send, Upload, HelpCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

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
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-3 mb-8">
            <HelpCircle className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-slate-800">Support Center</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center transform transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-1">Live Chat</h3>
              <p className="text-slate-600 text-sm mb-4">Available 24/7</p>
              <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                Start Chat
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center transform transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
              <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Phone className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-1">Phone Support</h3>
              <p className="text-slate-600 text-sm mb-4">Mon-Fri, 9am-5pm</p>
              <p className="text-purple-600 font-medium hover:text-purple-700 transition-colors duration-200">
                +1 (555) 000-0000
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center transform transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
              <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="h-7 w-7 text-amber-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-1">Email Support</h3>
              <p className="text-slate-600 text-sm mb-4">Response within 24h</p>
              <p className="text-amber-600 font-medium hover:text-amber-700 transition-colors duration-200">
                support@edumaster.com
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Submit a Support Ticket</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 placeholder-slate-400"
                    placeholder="Brief description of your issue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Category
                  </label>
                  <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 text-slate-600">
                    <option value="">Select a category</option>
                    <option>Technical Issue</option>
                    <option>Account Access</option>
                    <option>Course Content</option>
                    <option>Billing</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 placeholder-slate-400 resize-none"
                  placeholder="Describe your issue in detail..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Attachments (Optional)
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                    isDragging
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-blue-500 hover:bg-slate-50'
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
                    <Upload className={`h-8 w-8 mb-3 ${isDragging ? 'text-blue-500' : 'text-slate-400'}`} />
                    <label
                      htmlFor="file-upload"
                      className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer transition-colors duration-200"
                    >
                      Click to upload
                    </label>
                    <p className="text-sm text-slate-500 mt-1">
                      or drag and drop files here
                    </p>
                    {files && (
                      <div className="mt-4 text-sm text-slate-600">
                        {files.length} file(s) selected
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transform transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <Send className="h-5 w-5 mr-2" />
                Submit Ticket
              </button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}