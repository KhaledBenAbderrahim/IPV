import React from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, BookOpen, Star, ChevronRight } from 'lucide-react';

interface CourseCardProps {
  course: {
    id: number;
    title: string;
    description: string;
    instructor: string;
    students: number;
    duration: string;
    image: string;
    rating?: number;
    progress?: number;
  };
  isHR?: boolean;
  onClick?: () => void;
}

export default function CourseCard({ course, isHR, onClick }: CourseCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="relative aspect-[16/9]">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />
        
        {course.progress !== undefined && (
          <div className="absolute top-4 left-4 right-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${course.progress}%` }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </div>
            <p className="text-white text-sm mt-1">{course.progress}% Complete</p>
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white text-xl font-bold line-clamp-2 group-hover:text-primary-light transition-colors">
            {course.title}
          </h3>
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-600 line-clamp-2 mb-4 h-12">{course.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-gray-500 text-sm">
            <Users className="h-4 w-4 mr-2 text-primary" />
            <span>{course.students} students</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="h-4 w-4 mr-2 text-primary" />
            <span>{course.duration}</span>
          </div>
          {course.rating && (
            <div className="flex items-center text-gray-500 text-sm">
              <Star className="h-4 w-4 mr-2 text-yellow-400 fill-current" />
              <span>{course.rating.toFixed(1)} Rating</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                course.instructor
              )}&background=random`}
              alt={course.instructor}
              className="h-8 w-8 rounded-full border-2 border-white shadow-sm"
            />
            <div className="ml-2">
              <p className="text-sm font-medium text-gray-900">{course.instructor}</p>
              <p className="text-xs text-gray-500">Instructor</p>
            </div>
          </div>
          
          <button
            onClick={onClick}
            className="group inline-flex items-center px-4 py-2 rounded-xl bg-primary/5 hover:bg-primary text-primary hover:text-white transition-all duration-200"
          >
            <span className="text-sm font-medium">
              {isHR ? 'Edit Course' : 'View Course'}
            </span>
            <ChevronRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
