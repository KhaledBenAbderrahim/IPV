import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

const data = [
  { subject: 'E-Commerce', score: 85 },
  { subject: 'Marketing', score: 78 },
  { subject: 'Analytics', score: 92 },
  { subject: 'Management', score: 82 },
  { subject: 'Finance', score: 75 },
  { subject: 'Operations', score: 88 },
];

export default function SkillProgressChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="subject" stroke="#94a3b8" />
          <PolarRadiusAxis stroke="#94a3b8" />
          <Radar
            name="Skills"
            dataKey="score"
            stroke="#2563eb"
            fill="#2563eb"
            fillOpacity={0.2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}