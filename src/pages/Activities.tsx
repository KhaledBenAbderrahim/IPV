import React from 'react';
import { Calendar, Clock, BookOpen, Award, Filter } from 'lucide-react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { useLocation, Link } from 'react-router-dom';

const activities = [
  {
    id: 1,
    type: 'course_completion',
    title: 'Completed Advanced JavaScript Development',
    description: 'Successfully finished all modules and assignments',
    date: 'March 15, 2024',
    time: '2:30 PM',
    icon: Award,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    link: '/courses/1'
  },
  {
    id: 2,
    type: 'assignment',
    title: 'Submitted UI Design Project',
    description: 'Final project for UI/UX Design Fundamentals',
    date: 'March 14, 2024',
    time: '11:45 AM',
    icon: BookOpen,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    link: '/courses/2/assignments'
  },
  {
    id: 3,
    type: 'exam',
    title: 'Completed Data Science Final Exam',
    description: 'Scored 95% on the final assessment',
    date: 'March 13, 2024',
    time: '10:00 AM',
    icon: Calendar,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    link: '/exam-results'
  }
];

export default function Activities() {
  const location = useLocation();
  const isHR = location.pathname.includes('hr-dashboard');

  return (
    <DashboardLayout role={isHR ? 'hr' : 'student'}>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-dark">Recent Activities</h1>
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-4 py-2 text-sm font-medium text-light hover:text-dark transition-colors">
                <Filter className="h-5 w-5 mr-2" />
                Filter
              </button>
              <select className="text-sm border border-gray-200 rounded-lg px-4 py-2">
                <option>All Activities</option>
                <option>Courses</option>
                <option>Assignments</option>
                <option>Exams</option>
              </select>
            </div>
          </div>

          <div className="space-y-6">
            {activities.map((activity) => {
              const Icon = activity.icon;
              return (
                <Link
                  key={activity.id}
                  to={activity.link}
                  className="block bg-white rounded-lg shadow-sm hover:shadow-airbnb transition-all p-6"
                >
                  <div className="flex items-start">
                    <div className={`p-3 rounded-lg ${activity.bgColor}`}>
                      <Icon className={`h-6 w-6 ${activity.color}`} />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-dark">
                            {activity.title}
                          </h3>
                          <p className="mt-1 text-light">{activity.description}</p>
                        </div>
                        <div className="flex items-center text-sm text-light">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{activity.time}</span>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-light">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{activity.date}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              Load More Activities
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}