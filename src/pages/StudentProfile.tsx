import React from 'react';
import { useParams } from 'react-router-dom';
import { Mail, Phone, MapPin, BookOpen, Award, Clock, Calendar } from 'lucide-react';
import DashboardLayout from '../components/layouts/DashboardLayout';

const studentData = {
  id: 1,
  name: 'Sarah Johnson',
  email: 'sarah.j@example.com',
  phone: '+1 (555) 000-0001',
  location: 'San Francisco, CA',
  enrollmentDate: 'January 15, 2024',
  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  education: {
    degree: 'Bachelor of Science',
    major: 'Computer Science',
    university: 'Stanford University',
    graduationYear: '2023',
  },
  stats: [
    { label: 'Enrolled Courses', value: '3' },
    { label: 'Completed Courses', value: '5' },
    { label: 'Avg. Score', value: '92%' },
    { label: 'Certificates', value: '4' },
  ],
  courses: [
    {
      id: 1,
      title: 'Advanced JavaScript Development',
      progress: 75,
      lastAccessed: '2 hours ago',
    },
    {
      id: 2,
      title: 'UI/UX Design Fundamentals',
      progress: 45,
      lastAccessed: '1 day ago',
    },
    {
      id: 3,
      title: 'Data Science Essentials',
      progress: 90,
      lastAccessed: '3 hours ago',
    },
  ],
  achievements: [
    {
      id: 1,
      title: 'Course Champion',
      description: 'Completed 5 courses with distinction',
      date: 'March 1, 2024',
    },
    {
      id: 2,
      title: 'Perfect Attendance',
      description: 'Attended all scheduled sessions for 3 months',
      date: 'February 15, 2024',
    },
  ],
};

export default function StudentProfile() {
  const { id } = useParams();

  return (
    <DashboardLayout role="hr">
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="h-32 bg-primary/10" />
            <div className="px-8 pb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center -mt-16">
                  <img
                    src={studentData.image}
                    alt={studentData.name}
                    className="h-32 w-32 rounded-lg border-4 border-white shadow-sm"
                  />
                  <div className="ml-6 mt-16">
                    <h1 className="text-2xl font-bold text-dark">{studentData.name}</h1>
                    <p className="text-light">Student ID: #{id}</p>
                  </div>
                </div>
                <div className="mt-6 lg:mt-0 flex flex-wrap gap-4">
                  <button className="btn-primary">Send Message</button>
                  <button className="btn-outline">Download Report</button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-dark mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-light mr-3" />
                    <span className="text-dark">{studentData.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-light mr-3" />
                    <span className="text-dark">{studentData.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-light mr-3" />
                    <span className="text-dark">{studentData.location}</span>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-dark mb-4">Education</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-dark">{studentData.education.degree}</h3>
                    <p className="text-light">{studentData.education.major}</p>
                    <p className="text-sm text-light mt-1">
                      {studentData.education.university} • {studentData.education.graduationYear}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {studentData.stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-6 text-center">
                    <p className="text-2xl font-semibold text-primary">{stat.value}</p>
                    <p className="text-sm text-light mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Current Courses */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-dark mb-4">Current Courses</h2>
                <div className="space-y-4">
                  {studentData.courses.map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium text-dark">{course.title}</h3>
                        <div className="flex items-center mt-1 text-sm text-light">
                          <Clock className="h-4 w-4 mr-1" />
                          Last accessed {course.lastAccessed}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-primary font-medium">{course.progress}%</span>
                        <div className="mt-1 h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Achievements */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-dark mb-4">Recent Achievements</h2>
                <div className="space-y-4">
                  {studentData.achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex items-start p-4 bg-gray-50 rounded-lg"
                    >
                      <Award className="h-6 w-6 text-primary mt-1" />
                      <div className="ml-3">
                        <h3 className="font-medium text-dark">{achievement.title}</h3>
                        <p className="text-sm text-light mt-1">{achievement.description}</p>
                        <div className="flex items-center mt-2 text-sm text-light">
                          <Calendar className="h-4 w-4 mr-1" />
                          {achievement.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}