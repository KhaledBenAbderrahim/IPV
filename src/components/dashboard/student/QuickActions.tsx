import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, FileText, GraduationCap, Brain, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const actions = [
  {
    name: 'Continue Learning',
    description: 'Resume your last course',
    icon: BookOpen,
    href: '/student/courses',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    progress: 75,
  },
  {
    name: 'Practice Test',
    description: 'Prepare for your exam',
    icon: Brain,
    href: '/student/practice-test',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    new: true,
  },
  {
    name: 'Quick Review',
    description: 'Flashcards & summaries',
    icon: Zap,
    href: '/student/quick-review',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    new: true,
  },
  {
    name: 'Learning Path',
    description: 'Track your progress',
    icon: FileText,
    href: '/student/learning-path',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
];

export default function QuickActions() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
        <Link 
          to="/student/all-actions"
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative"
            >
              <Link
                to={action.href}
                className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl ${action.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                        <Icon className={`h-6 w-6 ${action.color}`} />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="text-base font-semibold text-gray-900">{action.name}</h3>
                          {action.new && (
                            <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                              New
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{action.description}</p>
                      </div>
                    </div>
                    {action.progress && (
                      <div className="relative w-12 h-12">
                        <svg className="w-12 h-12 transform -rotate-90">
                          <circle
                            className="text-gray-100"
                            strokeWidth="3"
                            stroke="currentColor"
                            fill="transparent"
                            r="20"
                            cx="24"
                            cy="24"
                          />
                          <circle
                            className="text-primary"
                            strokeWidth="3"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="20"
                            cx="24"
                            cy="24"
                            strokeDasharray={`${action.progress * 1.25}, 125`}
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-primary">
                          {action.progress}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}