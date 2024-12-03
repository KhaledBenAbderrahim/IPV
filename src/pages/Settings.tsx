import React, { useState } from 'react';
import { Bell, Lock, User, Globe, Eye, EyeOff } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardLayout from '../components/layouts/DashboardLayout';

export default function Settings() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHR = location.pathname.includes('hr-dashboard');
  const [showPassword, setShowPassword] = useState(false);
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
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-airbnb">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-dark">Account Settings</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Profile Section */}
              <div>
                <h3 className="text-base font-medium text-dark mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Profile Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-dark mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notifications Section */}
              <div>
                <h3 className="text-base font-medium text-dark mb-4 flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notification Preferences
                </h3>
                <div className="space-y-4">
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
                    <span className="ml-2 text-sm text-dark">Email notifications</span>
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
                    <span className="ml-2 text-sm text-dark">Push notifications</span>
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
                    <span className="ml-2 text-sm text-dark">SMS notifications</span>
                  </label>
                </div>
              </div>

              {/* Localization Section */}
              <div>
                <h3 className="text-base font-medium text-dark mb-4 flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Language & Region
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="language" className="block text-sm font-medium text-dark mb-2">
                      Language
                    </label>
                    <select
                      id="language"
                      value={formData.language}
                      onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="timezone" className="block text-sm font-medium text-dark mb-2">
                      Timezone
                    </label>
                    <select
                      id="timezone"
                      value={formData.timezone}
                      onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="UTC">UTC</option>
                      <option value="EST">Eastern Time</option>
                      <option value="CST">Central Time</option>
                      <option value="PST">Pacific Time</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate(isHR ? '/hr-dashboard' : '/student-dashboard')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}