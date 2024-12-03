import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  CheckCircle2, 
  Clock, 
  Award, 
  Home, 
  RotateCcw, 
  Download, 
  BarChart2, 
  ChevronRight,
  AlertTriangle,
  Share2
} from 'lucide-react';
import DashboardLayout from '../components/layouts/DashboardLayout';

export default function ExamResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const examResults = location.state || {
    score: 85,
    timeSpent: '2h 15m',
    totalQuestions: 10,
    correctAnswers: 8,
    categories: [
      { name: 'E-Commerce Fundamentals', score: 90 },
      { name: 'Digital Marketing', score: 85 },
      { name: 'Payment Systems', score: 80 },
      { name: 'Legal Requirements', score: 85 },
    ]
  };

  const feedback = {
    strengths: [
      'Strong understanding of e-commerce fundamentals',
      'Excellent grasp of digital marketing concepts'
    ],
    improvements: [
      'Review payment processing systems',
      'Focus more on international trade regulations'
    ]
  };

  return (
    <DashboardLayout role="student">
      <div className="min-h-screen bg-[#f8fafc] p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header with Score */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-8 text-center mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:16px_16px]" />
            <div className="relative">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-36 h-36 rounded-full bg-white/95 shadow-lg flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-4xl font-bold text-blue-600">{examResults.score}%</span>
                      <p className="text-sm font-medium text-blue-600/80">Final Score</p>
                    </div>
                  </div>
                  <CheckCircle2 className="absolute -top-2 -right-2 h-10 w-10 text-green-400 drop-shadow-md" />
                </div>
                <h1 className="text-3xl font-bold text-white mt-6">IHK Practice Exam Completed!</h1>
                <p className="text-lg text-white/90 mt-2">Congratulations on completing your examination</p>
                
                <div className="flex items-center gap-2 mt-4">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium text-white">
                    Exam ID: #IHK-2024-001
                  </span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium text-white">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-200/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-600 font-medium">Questions</span>
                <div className="p-2 bg-blue-50 rounded-xl">
                  <BarChart2 className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="mt-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-slate-900">{examResults.correctAnswers}</span>
                  <span className="text-slate-500">/ {examResults.totalQuestions}</span>
                </div>
                <p className="text-sm text-slate-600 mt-1">Correct Answers</p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Accuracy Rate</span>
                  <span className="font-medium text-slate-900">
                    {Math.round((examResults.correctAnswers / examResults.totalQuestions) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-200/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-600 font-medium">Time</span>
                <div className="p-2 bg-amber-50 rounded-xl">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <div className="mt-1">
                <span className="text-3xl font-bold text-slate-900">{examResults.timeSpent}</span>
                <p className="text-sm text-slate-600 mt-1">Time Spent</p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Avg. Time per Question</span>
                  <span className="font-medium text-slate-900">2.5 min</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-200/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-600 font-medium">Achievement</span>
                <div className="p-2 bg-green-50 rounded-xl">
                  <Award className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="mt-1">
                <span className="text-3xl font-bold text-slate-900">Advanced</span>
                <p className="text-sm text-slate-600 mt-1">Performance Level</p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Percentile Rank</span>
                  <span className="font-medium text-slate-900">Top 15%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Category Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-200/60">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-slate-900">Performance by Category</h2>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-lg">
                      Above Average
                    </span>
                  </div>
                </div>
                <div className="space-y-5">
                  {examResults.categories.map((category) => (
                    <div key={category.name}>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="font-medium text-slate-900">{category.name}</span>
                        <span className="font-medium text-blue-600">{category.score}%</span>
                      </div>
                      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300 rounded-full"
                          style={{ width: `${category.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-200/60">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Score Analysis</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-xl">
                    <h3 className="text-sm font-medium text-green-800 mb-2">Strengths</h3>
                    <ul className="space-y-2">
                      {feedback.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-green-700">
                          <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-amber-50 rounded-xl">
                    <h3 className="text-sm font-medium text-amber-800 mb-2">Areas for Improvement</h3>
                    <ul className="space-y-2">
                      {feedback.improvements.map((improvement, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-amber-700">
                          <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-200/60">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate('/student-dashboard')}
                  className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all duration-200 flex items-center gap-2"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </button>
                <button 
                  onClick={() => navigate('/student/ihk-exam')}
                  className="px-6 py-2.5 bg-slate-800 text-white font-medium rounded-xl hover:bg-slate-900 shadow-lg shadow-slate-800/20 transition-all duration-200 flex items-center gap-2"
                >
                  <RotateCcw className="h-5 w-5" />
                  Retake Exam
                </button>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                  <Share2 className="h-5 w-5" />
                </button>
                <button className="p-2.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}