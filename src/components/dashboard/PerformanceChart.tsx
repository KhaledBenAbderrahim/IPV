import React from 'react';
import { BarChart2 } from 'lucide-react';

export default function PerformanceChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">Performance Overview</h2>
        <select className="text-xs sm:text-sm text-gray-600 bg-transparent border-0 cursor-pointer focus:ring-0 focus:outline-none active:scale-95 transition-transform pr-6">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
        </select>
      </div>

      <div className="relative h-48 sm:h-64">
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center">
            <BarChart2 className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto" />
            <p className="mt-2 text-xs sm:text-sm text-gray-500 max-w-[250px] sm:max-w-none">
              Chart visualization will be implemented with a charting library of your choice
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-3 sm:gap-4">
        <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-xl">
          <p className="text-xl sm:text-2xl font-semibold text-gray-900">87%</p>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">Avg. Completion</p>
        </div>
        <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-xl">
          <p className="text-xl sm:text-2xl font-semibold text-gray-900">92%</p>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">Satisfaction Rate</p>
        </div>
      </div>
    </div>
  );
}