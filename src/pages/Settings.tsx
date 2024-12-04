import React, { useState } from 'react';
import { Bell, Lock, User, Globe, Eye, EyeOff, ChevronDown, Save, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';

export default function Settings() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHR = location.pathname.includes('hr-dashboard');
  const [showPassword, setShowPassword] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    profile: true,
    notifications: false,
    localization: false
  });
  const [formData, setFormData] = useState({
    email: 'user@example.com',
    password: '',
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    language: 'en',
    timezone: 'UTC',
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    
    // Redirect based on user role
    if (isHR) {
      navigate('/hr-dashboard');
    } else {
      navigate('/student-dashboard');
    }
  };

  return (
    <DashboardLayout role={isHR ? 'hr' : 'student'}>
      <div className="p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Profile Section */}
            <motion.div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={() => toggleSection('profile')}
                className="w-full px-4 py-3 flex items-center justify-between border-b border-gray-100"
              >
                <div className="flex items-center">
                  <User className="h-4 w-4 text-primary mr-2" />
                  <h2 className="text-sm font-semibold">Profile</h2>
                </div>
                <motion.div
                  animate={{ rotate: expandedSections.profile ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {expandedSections.profile && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 space-y-4">
                      <div>
                        <label htmlFor="email" className="block text-xs font-medium text-dark mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div>
                        <label htmlFor="password" className="block text-xs font-medium text-dark mb-1">
                          Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Notifications Section */}
            <motion.div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={() => toggleSection('notifications')}
                className="w-full px-4 py-3 flex items-center justify-between border-b border-gray-100"
              >
                <div className="flex items-center">
                  <Bell className="h-4 w-4 text-primary mr-2" />
                  <h2 className="text-sm font-semibold">Notifications</h2>
                </div>
                <motion.div
                  animate={{ rotate: expandedSections.notifications ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {expandedSections.notifications && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.notifications.email}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              notifications: { ...formData.notifications, email: e.target.checked },
                            })
                          }
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="ml-2 text-sm">Email</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.notifications.push}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              notifications: { ...formData.notifications, push: e.target.checked },
                            })
                          }
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="ml-2 text-sm">Push</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.notifications.sms}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              notifications: { ...formData.notifications, sms: e.target.checked },
                            })
                          }
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="ml-2 text-sm">SMS</span>
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Localization Section */}
            <motion.div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={() => toggleSection('localization')}
                className="w-full px-4 py-3 flex items-center justify-between border-b border-gray-100"
              >
                <div className="flex items-center">
                  <Globe className="h-4 w-4 text-primary mr-2" />
                  <h2 className="text-sm font-semibold">Language & Region</h2>
                </div>
                <motion.div
                  animate={{ rotate: expandedSections.localization ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {expandedSections.localization && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 space-y-4">
                      <div>
                        <label htmlFor="language" className="block text-xs font-medium text-dark mb-1">
                          Language
                        </label>
                        <select
                          id="language"
                          value={formData.language}
                          onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="timezone" className="block text-xs font-medium text-dark mb-1">
                          Timezone
                        </label>
                        <select
                          id="timezone"
                          value={formData.timezone}
                          onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                        >
                          <option value="UTC">UTC</option>
                          <option value="EST">Eastern Time</option>
                          <option value="CST">Central Time</option>
                          <option value="PST">Pacific Time</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Action Buttons - Fixed to bottom on mobile */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex gap-3 sm:relative sm:bg-transparent sm:border-0 sm:justify-end sm:p-0">
              <button
                type="button"
                onClick={() => navigate(isHR ? '/hr-dashboard' : '/student-dashboard')}
                className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 sm:flex-none btn-primary text-sm px-4 py-2"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}