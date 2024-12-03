import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Clock, 
  Calendar,
  PlayCircle,
  FileText,
  MessageSquare,
  Star,
  Download
} from 'lucide-react';
import DashboardLayout from '../components/layouts/DashboardLayout';

const courseData = {
  id: 1,
  title: 'Advanced JavaScript Development',
  description: 'Master modern JavaScript concepts and best practices. Learn about ES6+, async programming, design patterns, and more.',
  instructor: {
    name: 'Sarah Johnson',
    title: 'Senior JavaScript Developer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  progress: 75,
  duration: '8 weeks',
  students: 128,
  rating: 4.8,
  reviews: 47,
  image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
  modules: [
    {
      id: 1,
      title: 'Introduction to Modern JavaScript',
      duration: '2h 30m',
      lessons: [
        { id: 1, title: 'Course Overview', duration: '10m', completed: true },
        { id: 2, title: 'ES6+ Features', duration: '45m', completed: true },
        { id: 3, title: 'Arrow Functions & Scope', duration: '35m', completed: true },
        { id: 4, title: 'Destructuring & Spread Operator', duration: '40m', completed: false },
      ],
    },
    {
      id: 2,
      title: 'Asynchronous Programming',
      duration: '3h 15m',
      lessons: [
        { id: 5, title: 'Promises Fundamentals', duration: '45m', completed: false },
        { id: 6, title: 'Async/Await', duration: '50m', completed: false },
        { id: 7, title: 'Error Handling', duration: '40m', completed: false },
        { id: 8, title: 'Real-world Examples', duration: '60m', completed: false },
      ],
    },
  ],
};

export default function CourseDetails() {
  const { id } = useParams();
  const [activeModule, setActiveModule] = useState(1);

  return (
    <DashboardLayout role="student">
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Course Header */}
          <div className="relative h-80 rounded-xl overflow-hidden mb-8">
            <img
              src={courseData.image}
              alt={courseData.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <h1 className="text-3xl font-bold text-white mb-4">{courseData.title}</h1>
              <div className="flex items-center space-x-6 text-white/80">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  {courseData.duration}
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  {courseData.students} students
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-2 fill-yellow-500 text-yellow-500" />
                  {courseData.rating} ({courseData.reviews} reviews)
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Content */}
            <div className="lg:col-span-2">
              {/* Progress */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-dark">Your Progress</h2>
                  <span className="text-primary font-medium">{courseData.progress}% Complete</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${courseData.progress}%` }}
                  />
                </div>
              </div>

              {/* Course Modules */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-dark mb-6">Course Content</h2>
                <div className="space-y-4">
                  {courseData.modules.map((module) => (
                    <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setActiveModule(module.id)}
                        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center">
                          <BookOpen className="h-5 w-5 text-primary mr-3" />
                          <div className="text-left">
                            <h3 className="font-medium text-dark">{module.title}</h3>
                            <p className="text-sm text-light">{module.duration}</p>
                          </div>
                        </div>
                      </button>
                      {activeModule === module.id && (
                        <div className="divide-y divide-gray-100">
                          {module.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex items-center">
                                <PlayCircle className={`h-5 w-5 mr-3 ${lesson.completed ? 'text-green-500' : 'text-light'}`} />
                                <span className={`text-sm ${lesson.completed ? 'text-green-500' : 'text-dark'}`}>
                                  {lesson.title}
                                </span>
                              </div>
                              <span className="text-sm text-light">{lesson.duration}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Instructor */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-dark mb-4">Instructor</h2>
                <div className="flex items-center">
                  <img
                    src={courseData.instructor.image}
                    alt={courseData.instructor.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <h3 className="font-medium text-dark">{courseData.instructor.name}</h3>
                    <p className="text-sm text-light">{courseData.instructor.title}</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-dark mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Link
                    to={`/courses/${id}/assignments`}
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FileText className="h-5 w-5 text-primary mr-3" />
                    <span className="text-dark">Assignments</span>
                  </Link>
                  <Link
                    to="/calendar"
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Calendar className="h-5 w-5 text-primary mr-3" />
                    <span className="text-dark">Schedule</span>
                  </Link>
                  <Link
                    to={`/courses/${id}/workshop`}
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <MessageSquare className="h-5 w-5 text-primary mr-3" />
                    <span className="text-dark">Discussion</span>
                  </Link>
                  <button className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors w-full">
                    <Download className="h-5 w-5 text-primary mr-3" />
                    <span className="text-dark">Resources</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}