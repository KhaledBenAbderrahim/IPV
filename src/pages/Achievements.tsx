import React from 'react';
import { Award, Trophy, Star, Medal, Download } from 'lucide-react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { useLocation } from 'react-router-dom';

const achievements = [
  {
    id: 1,
    title: 'Course Champion',
    description: 'Completed 5 courses with distinction',
    icon: Trophy,
    progress: 100,
    date: 'March 1, 2024',
  },
  {
    id: 2,
    title: 'Perfect Attendance',
    description: 'Attended all scheduled sessions for 3 months',
    icon: Star,
    progress: 75,
    date: 'In Progress',
  },
  {
    id: 3,
    title: 'Knowledge Master',
    description: 'Achieved top scores in 3 assessments',
    icon: Medal,
    progress: 60,
    date: 'In Progress',
  },
];

const certificates = [
  {
    id: 1,
    title: 'Advanced JavaScript Development',
    issueDate: 'February 15, 2024',
    instructor: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 2,
    title: 'UI/UX Design Fundamentals',
    issueDate: 'January 30, 2024',
    instructor: 'Michael Chen',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
];

export default function Achievements() {
  const location = useLocation();
  const isHR = location.pathname.includes('hr-dashboard');

  return (
    <DashboardLayout role={isHR ? 'hr' : 'student'}>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Achievements */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-semibold text-dark">Current Progress</h2>
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={achievement.id}
                    className="bg-white rounded-lg shadow-sm p-6 hover:shadow-airbnb transition-shadow"
                  >
                    <div className="flex items-start">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-dark">
                            {achievement.title}
                          </h3>
                          <span className="text-sm text-light">{achievement.date}</span>
                        </div>
                        <p className="mt-1 text-sm text-light">{achievement.description}</p>
                        <div className="mt-4">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="font-medium text-dark">Progress</span>
                            <span className="text-primary">{achievement.progress}%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all duration-300"
                              style={{ width: `${achievement.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Certificates */}
            <div>
              <h2 className="text-xl font-semibold text-dark mb-6">Certificates</h2>
              <div className="space-y-6">
                {certificates.map((certificate) => (
                  <div
                    key={certificate.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-airbnb transition-shadow"
                  >
                    <img
                      src={certificate.image}
                      alt={certificate.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-dark">{certificate.title}</h3>
                      <p className="text-sm text-light mt-1">
                        Instructor: {certificate.instructor}
                      </p>
                      <p className="text-sm text-light">
                        Issued: {certificate.issueDate}
                      </p>
                      <button className="mt-4 w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors border border-primary/20 rounded-lg hover:border-primary/40">
                        <Download className="h-4 w-4 mr-2" />
                        Download Certificate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}