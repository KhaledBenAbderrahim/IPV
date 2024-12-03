import React from 'react';
import { BarChart2 } from 'lucide-react';

export default function PerformanceChart() {
  return (
    <div className="bg-white rounded-airbnb shadow-airbnb p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-dark">Performance Overview</h2>
        <select className="text-sm text-light border-0 cursor-pointer focus:ring-0">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
        </select>
      </div>

      <div className="relative h-64">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <BarChart2 className="h-12 w-12 text-light mx-auto" />
            <p className="mt-2 text-sm text-light">Chart visualization will be implemented with a charting library of your choice</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-2xl font-semibold text-dark">87%</p>
          <p className="text-sm text-light">Avg. Completion</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-semibold text-dark">92%</p>
          <p className="text-sm text-light">Satisfaction Rate</p>
        </div>
      </div>
    </div>
  );
}