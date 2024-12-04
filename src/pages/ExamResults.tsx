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
      <div className="min-h-screen bg-[#f8fafc] p-4 sm:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header with Score */}
          <div className="bg-gradient-to-br from-primary to-primary-dark rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 text-center mb-6 sm:mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:16px_16px]" />
            <div className="relative">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-white/95 shadow-lg flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-3xl sm:text-4xl font-bold text-primary">{examResults.score}%</span>
                      <p className="text-xs sm:text-sm font-medium text-primary/80">Final Score</p>
                    </div>
                  </div>
                  <CheckCircle2 className="absolute -top-2 -right-2 h-8 w-8 sm:h-10 sm:w-10 text-green-400 drop-shadow-md" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mt-4 sm:mt-6">IHK Practice Exam Completed!</h1>
                <p className="text-base sm:text-lg text-white/90 mt-2">Congratulations on completing your examination</p>
                
                <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                  <span className="px-2.5 sm:px-3 py-1 bg-white/20 rounded-full text-xs sm:text-sm font-medium text-white">
                    Exam ID: #IHK-2024-001
                  </span>
                  <span className="px-2.5 sm:px-3 py-1 bg-white/20 rounded-full text-xs sm:text-sm font-medium text-white">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 border border-gray-200/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm sm:text-base font-medium">Questions</span>
                <div className="p-1.5 sm:p-2 bg-primary/5 rounded-lg sm:rounded-xl">
                  <BarChart2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
              </div>
              <div className="mt-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900">{examResults.correctAnswers}</span>
                  <span className="text-gray-500">/ {examResults.totalQuestions}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Correct Answers</p>
              </div>
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Accuracy Rate</span>
                  <span className="font-medium text-gray-900">
                    {Math.round((examResults.correctAnswers / examResults.totalQuestions) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 border border-gray-200/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm sm:text-base font-medium">Time</span>
                <div className="p-1.5 sm:p-2 bg-amber-50 rounded-lg sm:rounded-xl">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                </div>
              </div>
              <div className="mt-1">
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">{examResults.timeSpent}</span>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Time Spent</p>
              </div>
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Avg. Time per Question</span>
                  <span className="font-medium text-gray-900">2.5 min</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 border border-gray-200/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm sm:text-base font-medium">Achievement</span>
                <div className="p-1.5 sm:p-2 bg-green-50 rounded-lg sm:rounded-xl">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                </div>
              </div>
              <div className="mt-1">
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">Advanced</span>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Performance Level</p>
              </div>
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Percentile Rank</span>
                  <span className="font-medium text-gray-900">Top 15%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Category Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-8">
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 border border-gray-200/60">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900">Performance by Category</h2>
                  <div className="flex items-center gap-2">
                    <span className="px-2 sm:px-2.5 py-1 bg-green-50 text-green-700 text-xs sm:text-sm font-medium rounded-lg">
                      Above Average
                    </span>
                  </div>
                </div>
                <div className="space-y-4 sm:space-y-5">
                  {examResults.categories.map((category) => (
                    <div key={category.name}>
                      <div className="flex items-center justify-between text-xs sm:text-sm mb-1.5 sm:mb-2">
                        <span className="font-medium text-gray-900">{category.name}</span>
                        <span className="font-medium text-primary">{category.score}%</span>
                      </div>
                      <div className="h-2 sm:h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-primary-light transition-all duration-300 rounded-full"
                          style={{ width: `${category.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 border border-gray-200/60">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Score Analysis</h2>
                <div className="space-y-3 sm:space-y-4">
                  <div className="p-3 sm:p-4 bg-green-50 rounded-lg sm:rounded-xl">
                    <h3 className="text-xs sm:text-sm font-medium text-green-800 mb-2">Strengths</h3>
                    <ul className="space-y-2">
                      {feedback.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0 text-green-600" />
                          <span className="text-xs sm:text-sm text-green-700">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-3 sm:p-4 bg-amber-50 rounded-lg sm:rounded-xl">
                    <h3 className="text-xs sm:text-sm font-medium text-amber-800 mb-2">Areas for Improvement</h3>
                    <ul className="space-y-2">
                      {feedback.improvements.map((improvement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertTriangle className="h-3.5 w-3.5 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0 text-amber-600" />
                          <span className="text-xs sm:text-sm text-amber-700">{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <button
              onClick={() => navigate('/student/dashboard')}
              className="flex items-center justify-center px-4 py-2 sm:px-6 sm:py-2.5 bg-white text-sm sm:text-base font-medium rounded-lg sm:rounded-xl text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors active:scale-95 touch-manipulation"
            >
              <Home className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Back to Dashboard
            </button>
            <button
              onClick={() => navigate('/student/practice-exam')}
              className="flex items-center justify-center px-4 py-2 sm:px-6 sm:py-2.5 bg-primary text-sm sm:text-base font-medium rounded-lg sm:rounded-xl text-white hover:bg-primary-dark transition-colors active:scale-95 touch-manipulation"
            >
              <RotateCcw className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Try Another Exam
            </button>
            <button
              onClick={() => {/* Handle download */}}
              className="flex items-center justify-center px-4 py-2 sm:px-6 sm:py-2.5 bg-white text-sm sm:text-base font-medium rounded-lg sm:rounded-xl text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors active:scale-95 touch-manipulation"
            >
              <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Download Results
            </button>
            <button
              onClick={() => {/* Handle share */}}
              className="flex items-center justify-center px-4 py-2 sm:px-6 sm:py-2.5 bg-white text-sm sm:text-base font-medium rounded-lg sm:rounded-xl text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors active:scale-95 touch-manipulation"
            >
              <Share2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Share Results
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}