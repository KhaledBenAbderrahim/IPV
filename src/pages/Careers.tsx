import React from 'react';
import { Briefcase, MapPin, Clock, Send } from 'lucide-react';

const jobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: "We're looking for an experienced frontend developer to help build the next generation of our learning platform.",
    requirements: [
      '5+ years of React experience',
      'Strong TypeScript skills',
      'Experience with modern frontend tools',
      'Understanding of UX principles'
    ]
  },
  {
    id: 2,
    title: 'Product Manager',
    department: 'Product',
    location: 'San Francisco, CA',
    type: 'Full-time',
    description: 'Join our product team to help shape the future of online education.',
    requirements: [
      '3+ years of product management experience',
      'Experience with educational technology',
      'Strong analytical skills',
      'Excellent communication abilities'
    ]
  },
  {
    id: 3,
    title: 'UX Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    description: 'Help create intuitive and engaging learning experiences for our users.',
    requirements: [
      '3+ years of UX design experience',
      'Strong portfolio of web applications',
      'Experience with Figma',
      'Understanding of accessibility standards'
    ]
  }
];

export default function Careers() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary to-accent py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Join Our Team
          </h1>
          <p className="mt-6 text-xl text-white/80">
            Help us transform the future of education
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Values Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-dark">Why Join Us?</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Innovation',
                description: 'Work on cutting-edge educational technology'
              },
              {
                title: 'Impact',
                description: 'Transform how people learn and grow'
              },
              {
                title: 'Growth',
                description: 'Continuous learning and development opportunities'
              }
            ].map((value) => (
              <div key={value.title} className="bg-white p-6 rounded-lg shadow-airbnb">
                <h3 className="text-xl font-semibold text-dark mb-2">
                  {value.title}
                </h3>
                <p className="text-light">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-dark mb-12">Open Positions</h2>
          <div className="space-y-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-airbnb hover:shadow-airbnb-hover transition-all p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-dark">{job.title}</h3>
                    <p className="text-light">{job.department}</p>
                  </div>
                  <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    <div className="flex items-center text-light">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-light">
                      <Clock className="h-4 w-4 mr-1" />
                      {job.type}
                    </div>
                  </div>
                </div>

                <p className="text-light mb-4">{job.description}</p>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-dark mb-2">Requirements:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="text-light text-sm">
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="btn-primary">
                  <Send className="h-5 w-5 mr-2" />
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}