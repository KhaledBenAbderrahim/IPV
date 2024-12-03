import React from 'react';
import { Star, Award, TrendingUp, Users } from 'lucide-react';

const stories = [
  {
    id: 1,
    company: 'Tech Solutions Inc.',
    logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    title: 'Transforming Corporate Training',
    quote: 'EduMaster Pro revolutionized our training process, increasing completion rates by 85%.',
    author: 'Sarah Johnson',
    role: 'HR Director',
    metrics: [
      { label: 'Completion Rate', value: '95%' },
      { label: 'Employee Satisfaction', value: '4.8/5' },
      { label: 'Cost Reduction', value: '35%' }
    ]
  },
  {
    id: 2,
    company: 'Global Education Ltd.',
    logo: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    title: 'Scaling Online Learning',
    quote: 'We were able to scale our online courses to reach students globally with minimal overhead.',
    author: 'Michael Chen',
    role: 'Education Director',
    metrics: [
      { label: 'Student Growth', value: '300%' },
      { label: 'Course Completion', value: '92%' },
      { label: 'Student Satisfaction', value: '4.9/5' }
    ]
  }
];

export default function SuccessStories() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary to-accent py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Success Stories
          </h1>
          <p className="mt-6 text-xl text-white/80">
            See how organizations are transforming their learning experience with EduMaster Pro
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-lg shadow-airbnb overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12">
                  <img
                    src={story.logo}
                    alt={story.company}
                    className="h-12 w-auto mb-6"
                  />
                  <h2 className="text-2xl font-bold text-dark mb-4">
                    {story.title}
                  </h2>
                  <blockquote className="text-xl text-light italic mb-6">
                    "{story.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <div>
                      <p className="font-medium text-dark">{story.author}</p>
                      <p className="text-light">{story.role}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-8 lg:p-12">
                  <h3 className="text-lg font-semibold text-dark mb-6">Impact Metrics</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {story.metrics.map((metric) => (
                      <div key={metric.label} className="text-center">
                        <p className="text-3xl font-bold text-primary">
                          {metric.value}
                        </p>
                        <p className="text-light mt-1">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}