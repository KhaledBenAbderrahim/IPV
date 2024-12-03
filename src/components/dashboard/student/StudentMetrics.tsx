import React from 'react';
import { BookMarked, Clock, Award, TrendingUp } from 'lucide-react';

const metrics = [
  {
    id: 1,
    name: 'Enrolled Courses',
    value: '8',
    change: '2 in progress',
    icon: BookMarked,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    id: 2,
    name: 'Learning Hours',
    value: '47.5',
    change: 'This month',
    icon: Clock,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    id: 3,
    name: 'Certificates',
    value: '5',
    change: '2 pending',
    icon: Award,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
  {
    id: 4,
    name: 'Average Score',
    value: '92%',
    change: '+5% this month',
    icon: TrendingUp,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
];

export default function StudentMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <div
            key={metric.id}
            className="bg-white rounded-airbnb p-6 shadow-airbnb hover:shadow-airbnb-hover transition-all duration-300"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                <Icon className={`h-6 w-6 ${metric.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-light">{metric.name}</p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-dark">{metric.value}</p>
                  <span className="ml-2 text-sm font-medium text-light">
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