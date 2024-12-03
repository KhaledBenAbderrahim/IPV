import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: 'Mon', students: 2100, avgTime: 45 },
  { date: 'Tue', students: 2400, avgTime: 52 },
  { date: 'Wed', students: 2200, avgTime: 48 },
  { date: 'Thu', students: 2800, avgTime: 61 },
  { date: 'Fri', students: 2600, avgTime: 55 },
  { date: 'Sat', students: 1800, avgTime: 38 },
  { date: 'Sun', students: 1600, avgTime: 35 },
];

export default function EngagementChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="date" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
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
            dataKey="students"
            stroke="#2563eb"
            fillOpacity={1}
            fill="url(#colorStudents)"
          />
          <Area
            type="monotone"
            dataKey="avgTime"
            stroke="#60a5fa"
            fillOpacity={1}
            fill="url(#colorTime)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}