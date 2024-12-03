import React, { useState } from 'react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { Brain, Clock, Target, CheckCircle2, AlertTriangle } from 'lucide-react';

const practiceTests = [
  {
    id: 1,
    title: 'JavaScript Fundamentals',
    questions: 25,
    timeLimit: '30 minutes',
    difficulty: 'Intermediate',
    topics: ['Variables', 'Functions', 'Objects', 'Arrays'],
    lastScore: 85,
  },
  {
    id: 2,
    title: 'React Components',
    questions: 20,
    timeLimit: '25 minutes',
    difficulty: 'Advanced',
    topics: ['Props', 'State', 'Hooks', 'Lifecycle'],
    lastScore: null,
  },
  {
    id: 3,
    title: 'Web Development Basics',
    questions: 30,
    timeLimit: '35 minutes',
    difficulty: 'Beginner',
    topics: ['HTML', 'CSS', 'JavaScript', 'DOM'],
    lastScore: 92,
  },
];

export default function PracticeTest() {
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  return (
    <DashboardLayout role="student">
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-dark">Practice Tests</h1>
              <p className="text-light mt-1">Prepare for your exams with practice tests</p>
            </div>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Test Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceTests
              .filter(test => selectedDifficulty === 'all' || test.difficulty === selectedDifficulty)
              .map((test) => (
                <div
                  key={test.id}
                  className="bg-white rounded-lg shadow-airbnb hover:shadow-airbnb-hover transition-all p-6"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-dark">{test.title}</h3>
                      <div className="flex items-center mt-2 text-light">
                        <Brain className="h-4 w-4 mr-1" />
                        <span className="text-sm">{test.difficulty}</span>
                      </div>
                    </div>
                    {test.lastScore && (
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-primary">{test.lastScore}%</span>
                        <CheckCircle2 className="h-4 w-4 text-primary ml-1" />
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between text-sm text-light">
                    <div className="flex items-center">
                      <Target className="h-4 w-4 mr-1" />
                      {test.questions} questions
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {test.timeLimit}
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {test.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="mt-6 w-full btn-primary">
                    Start Practice Test
                  </button>
                </div>
              ))}
          </div>

          {/* Tips Section */}
          <div className="mt-12 bg-white rounded-lg shadow-airbnb p-6">
            <div className="flex items-start">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-dark">Practice Test Tips</h3>
                <ul className="mt-2 space-y-2 text-light">
                  <li>• Take tests in a quiet environment</li>
                  <li>• Time yourself according to the given limits</li>
                  <li>• Review incorrect answers after completion</li>
                  <li>• Practice regularly to improve performance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}