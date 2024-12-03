import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, TrendingUp, Award } from 'lucide-react';

const performanceData = [
  { date: 'Mon', score: 85, time: 2.5 },
  { date: 'Tue', score: 92, time: 3.2 },
  { date: 'Wed', score: 88, time: 2.8 },
  { date: 'Thu', score: 95, time: 4.0 },
  { date: 'Fri', score: 90, time: 3.5 },
  { date: 'Sat', score: 87, time: 2.0 },
  { date: 'Sun', score: 93, time: 2.7 },
];

const stats = [
  {
    id: 1,
    label: 'Study Time',
    value: '21.7h',
    change: '+2.5h',
    icon: Clock,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    id: 2,
    label: 'Avg. Score',
    value: '90%',
    change: '+5%',
    icon: TrendingUp,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    id: 3,
    label: 'Points',
    value: '850',
    change: '+120',
    icon: Award,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
];

export default function PerformanceAnalytics() {
  return (
    <div className="bg-white rounded-airbnb shadow-airbnb p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-dark">Performance Analytics</h2>
          <p className="text-sm text-light">Weekly progress overview</p>
        </div>
        <select className="text-sm border border-gray-200 rounded-lg px-3 py-2">
          <option>This Week</option>
          <option>Last Week</option>
          <option>Last Month</option>
        </select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className="text-center">
              <div className={`mx-auto w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center mb-2`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className="text-xl font-semibold text-dark">{stat.value}</p>
              <div className="flex items-center justify-center text-xs">
                <span className="text-green-600 font-medium">{stat.change}</span>
                <span className="text-light ml-1">{stat.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="timeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="date" 
              stroke="#94a3b8"
              tick={{ fontSize: 12 }}
              tickLine={false}
            />
            <YAxis 
              stroke="#94a3b8"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#2563eb"
              strokeWidth={2}
              fill="url(#scoreGradient)"
              name="Score"
            />
            <Area
              type="monotone"
              dataKey="time"
              stroke="#60a5fa"
              strokeWidth={2}
              fill="url(#timeGradient)"
              name="Study Time (hours)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-primary mr-2" />
          <span className="text-sm text-light">Score</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-accent mr-2" />
          <span className="text-sm text-light">Study Time</span>
        </div>
      </div>
    </div>
  );
}