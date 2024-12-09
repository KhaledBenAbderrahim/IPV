import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, Users, FileText, BarChart2 } from 'lucide-react';

const actions = [
  {
    name: 'Upload Content',
    description: 'Add new courses or materials',
    icon: Upload,
    href: '/upload-content',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    name: 'Manage Students',
    description: 'View and manage enrollments',
    icon: Users,
    href: '/students',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    name: 'Generate Reports',
    description: 'Create detailed analytics reports',
    icon: FileText,
    href: '/reports',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
  {
    name: 'View Analytics',
    description: 'Track performance metrics',
    icon: BarChart2,
    href: '/analytics',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
];

export default function QuickActions() {
  return (
    <div>
      <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.name}
              to={action.href}
              className="group bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-300"
            >
              <div className="flex items-center">
                <div className={`p-2.5 sm:p-3 rounded-lg ${action.bgColor} group-hover:scale-110 transition-transform`}>
                  <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${action.color}`} />
                </div>
                <div className="ml-3 sm:ml-4">
                  <p className="text-sm sm:text-base font-semibold text-gray-900">{action.name}</p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5">{action.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}