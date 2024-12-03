import React from 'react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { Bell, CheckCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useNotifications } from '../contexts/NotificationContext';

export default function Notifications() {
  const location = useLocation();
  const isHR = location.pathname.includes('hr');
  const { notifications, markAsRead, clearNotifications } = useNotifications();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <DashboardLayout role={isHR ? 'hr' : 'student'}>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Bell className="h-6 w-6 text-primary mr-3" />
              <h1 className="text-2xl font-bold text-dark">Notifications</h1>
            </div>
            <button
              onClick={clearNotifications}
              className="text-light hover:text-dark transition-colors"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-lg shadow-sm p-4 transition-all ${
                  notification.read ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-start">
                  {getNotificationIcon(notification.type)}
                  <div className="ml-3 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-dark">{notification.title}</p>
                        <p className="text-light mt-1">{notification.message}</p>
                      </div>
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-light hover:text-dark transition-colors ml-4"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="text-xs text-light mt-2">
                      {notification.timestamp.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {notifications.length === 0 && (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 text-light mx-auto mb-4" />
                <p className="text-light">No notifications yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}