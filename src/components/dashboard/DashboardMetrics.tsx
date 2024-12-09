import React from 'react';
import { Users, BookOpen, Award, TrendingUp } from 'lucide-react';

const metrics = [
  {
    id: 1,
    name: 'Total Students',
    value: '2,847',
    change: '+12.5%',
    changeType: 'increase',
    icon: Users,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    id: 2,
    name: 'Active Courses',
    value: '184',
    change: '+8.2%',
    changeType: 'increase',
    icon: BookOpen,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    id: 3,
    name: 'Completion Rate',
    value: '94.2%',
    change: '+5.4%',
    changeType: 'increase',
    icon: Award,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
  {
    id: 4,
    name: 'Average Score',
    value: '87.3',
    change: '+3.2%',
    changeType: 'increase',
    icon: TrendingUp,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
];

export default function DashboardMetrics() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <div
            key={metric.id}
            className="bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center">
              <div className={`p-2.5 sm:p-3 rounded-lg ${metric.bgColor}`}>
                <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${metric.color}`} />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                <div className="flex items-baseline mt-0.5 sm:mt-1">
                  <p className="text-xl sm:text-2xl font-semibold text-gray-900">{metric.value}</p>
                  <span className="ml-2 text-xs sm:text-sm font-medium text-green-600">
                    {metric.change}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}