import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';

const activities = [
  {
    id: 1,
    user: 'Sarah Johnson',
    action: 'completed',
    subject: 'Introduction to Python Programming',
    time: '2 hours ago',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    link: '/students/sarah-johnson'
  },
  {
    id: 2,
    user: 'Michael Chen',
    action: 'enrolled in',
    subject: 'Advanced Data Analytics',
    time: '4 hours ago',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    link: '/students/michael-chen'
  },
  {
    id: 3,
    user: 'Emily Rodriguez',
    action: 'submitted',
    subject: 'Final Project: Machine Learning',
    time: '6 hours ago',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    link: '/students/emily-rodriguez'
  },
];

export default function RecentActivities() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
      <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Recent Activities</h2>
      <div className="space-y-4 sm:space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 sm:space-x-4">
            <Link 
              to={activity.link}
              className="flex-shrink-0 active:scale-95 transition-transform"
            >
              <img
                src={activity.image}
                alt={activity.user}
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl object-cover"
              />
            </Link>
            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base text-gray-900 line-clamp-2">
                <Link 
                  to={activity.link} 
                  className="font-medium hover:text-primary active:text-primary/80 transition-colors"
                >
                  {activity.user}
                </Link>
                {' '}{activity.action}{' '}
                <span className="font-medium">{activity.subject}</span>
              </p>
              <div className="flex items-center mt-1">
                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500" />
                <span className="ml-1.5 text-xs sm:text-sm text-gray-500">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link 
        to="/activities"
        className="mt-4 sm:mt-6 block w-full text-center py-2 text-sm sm:text-base font-medium text-primary hover:text-primary/80 active:scale-95 transition-all rounded-lg hover:bg-primary/5"
      >
        View All Activities
      </Link>
    </div>
  );
}