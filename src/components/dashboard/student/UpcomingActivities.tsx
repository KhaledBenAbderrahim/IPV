import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, BookOpen, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const activities = [
  {
    id: 1,
    type: 'exam',
    title: 'JavaScript Final Exam',
    date: 'March 15, 2024',
    time: '10:00 AM',
    course: 'Advanced JavaScript Development',
    link: '/exam',
    priority: 'high',
  },
  {
    id: 2,
    type: 'assignment',
    title: 'UI Design Project Submission',
    date: 'March 18, 2024',
    time: '11:59 PM',
    course: 'UI/UX Design Fundamentals',
    link: '/courses/2/assignments',
    priority: 'medium',
  },
  {
    id: 3,
    type: 'live',
    title: 'Data Analysis Workshop',
    date: 'March 20, 2024',
    time: '2:00 PM',
    course: 'Data Science Essentials',
    link: '/courses/3/workshop',
    priority: 'low',
  },
];

const priorityColors = {
  high: 'bg-red-50 text-red-700 ring-red-600/20',
  medium: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
  low: 'bg-green-50 text-green-700 ring-green-600/20',
};

export default function UpcomingActivities() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Upcoming Activities</h2>
          <p className="mt-1 text-sm text-gray-500">Your schedule for the next 7 days</p>
        </div>
        <Link 
          to="/calendar" 
          className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          View Calendar
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <motion.div
            key={activity.id}
            whileHover={{ x: 4 }}
            className="group relative bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="absolute top-0 left-0 w-1 h-full rounded-l-xl bg-primary transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
            
            <div className="relative flex items-start space-x-4">
              <div className={`flex-shrink-0 p-3 rounded-xl ${activity.type === 'exam' ? 'bg-red-50' : activity.type === 'assignment' ? 'bg-yellow-50' : 'bg-green-50'}`}>
                <Calendar className={`h-6 w-6 ${activity.type === 'exam' ? 'text-red-600' : activity.type === 'assignment' ? 'text-yellow-600' : 'text-green-600'}`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-gray-900 truncate">
                    {activity.title}
                  </h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[activity.priority]}`}>
                    {activity.priority.charAt(0).toUpperCase() + activity.priority.slice(1)} Priority
                  </span>
                </div>
                
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {activity.date} at {activity.time}
                </div>
                
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <BookOpen className="h-4 w-4 mr-1" />
                  {activity.course}
                </div>
              </div>

              <Link 
                to={activity.link}
                className="flex-shrink-0 self-center ml-2 px-3 py-1.5 text-sm font-medium text-primary hover:text-white hover:bg-primary rounded-lg transition-colors duration-200"
              >
                Details
                <ChevronRight className="inline-block h-4 w-4 ml-1" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {activities.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No Upcoming Activities</h3>
          <p className="mt-2 text-sm text-gray-500">
            You're all caught up! Check back later for new activities.
          </p>
        </div>
      )}
    </motion.div>
  );
}