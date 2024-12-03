import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const courses = [
  {
    id: 1,
    title: 'Advanced JavaScript Development',
    progress: 75,
    timeLeft: '2 weeks left',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    instructor: 'Alex Morgan',
    totalLessons: 24,
    completedLessons: 18,
  },
  {
    id: 2,
    title: 'UI/UX Design Fundamentals',
    progress: 45,
    timeLeft: '4 weeks left',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    instructor: 'Sarah Chen',
    totalLessons: 32,
    completedLessons: 14,
  },
  {
    id: 3,
    title: 'Data Science Essentials',
    progress: 90,
    timeLeft: '1 week left',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    instructor: 'Mike Johnson',
    totalLessons: 28,
    completedLessons: 25,
  },
];

export default function CourseGrid() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Current Courses</h2>
          <p className="mt-1 text-sm text-gray-500">Continue where you left off</p>
        </div>
        <Link 
          to="/courses" 
          className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          View All Courses
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            whileHover={{ y: -4 }}
            className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            <div className="aspect-w-16 aspect-h-9 relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-semibold text-white line-clamp-2">
                  {course.title}
                </h3>
                <p className="mt-1 text-sm text-white/80">{course.instructor}</p>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1 text-primary" />
                  {course.timeLeft}
                </div>
                <div className="flex items-center text-sm font-medium text-primary">
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  {course.completedLessons}/{course.totalLessons} Lessons
                </div>
              </div>

              <div className="relative mb-4">
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
                <span className="absolute right-0 top-4 text-sm font-medium text-primary">
                  {course.progress}% Complete
                </span>
              </div>

              <Link 
                to={`/courses/${course.id}`}
                className="mt-2 w-full inline-flex items-center justify-center px-4 py-2 border border-primary/20 text-sm font-medium rounded-lg text-primary hover:bg-primary hover:text-white transition-colors duration-200"
              >
                Continue Learning
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}