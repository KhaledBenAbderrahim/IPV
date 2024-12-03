import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  BarChart2,
  ArrowLeft,
  Download,
  Share2
} from 'lucide-react';
import DashboardLayout from '../components/layouts/DashboardLayout';

interface TestResult {
  questionId: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timeSpent: string;
  explanation?: string;
}

export default function TestResults() {
  const navigate = useNavigate();

  // This would typically come from your test state or API
  const testResults = {
    score: 85,
    totalQuestions: 10,
    correctAnswers: 8,
    timeSpent: '15:30',
    results: [
      {
        questionId: '1',
        question: 'What is the capital of France?',
        userAnswer: 'Paris',
        correctAnswer: 'Paris',
        isCorrect: true,
        timeSpent: '1:20',
        explanation: 'Paris is the capital and largest city of France.'
      },
      {
        questionId: '2',
        question: 'Which planet is known as the Red Planet?',
        userAnswer: 'Jupiter',
        correctAnswer: 'Mars',
        isCorrect: false,
        timeSpent: '0:45',
        explanation: 'Mars is called the Red Planet due to its reddish appearance.'
      },
      // Add more test results as needed
    ] as TestResult[]
  };

  return (
    <DashboardLayout role="student">
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Tests
            </button>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Test Results</h1>
              <div className="flex gap-3">
                <button className="btn-outline">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share Results
                </button>
                <button className="btn-primary">
                  <Download className="h-5 w-5 mr-2" />
                  Download PDF
                </button>
              </div>
            </div>
          </motion.div>

          {/* Score Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full border-4 border-primary flex items-center justify-center">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">{testResults.score}%</span>
                    </div>
                  </div>
                  <CheckCircle2 className="absolute -top-2 -right-2 h-8 w-8 text-green-500" />
                </div>
                <p className="mt-2 text-sm text-gray-500">Final Score</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center h-16">
                  <BarChart2 className="h-8 w-8 text-primary" />
                </div>
                <div className="mt-2">
                  <span className="text-xl font-semibold text-gray-900">
                    {testResults.correctAnswers}/{testResults.totalQuestions}
                  </span>
                  <p className="text-sm text-gray-500">Correct Answers</p>
                </div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-16">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <div className="mt-2">
                  <span className="text-xl font-semibold text-gray-900">{testResults.timeSpent}</span>
                  <p className="text-sm text-gray-500">Time Spent</p>
                </div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-16">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <div className="mt-2">
                  <span className="text-xl font-semibold text-gray-900">Advanced</span>
                  <p className="text-sm text-gray-500">Performance Level</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Detailed Results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {testResults.results.map((result, index) => (
              <div
                key={result.questionId}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-500">
                        Question {index + 1}
                      </span>
                      {result.isCorrect ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Correct
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Incorrect
                        </span>
                      )}
                      <span className="text-xs text-gray-500">
                        Time: {result.timeSpent}
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">
                      {result.question}
                    </h3>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-500">Your Answer:</span>
                        <span className={`text-sm ${result.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                          {result.userAnswer}
                        </span>
                      </div>
                      {!result.isCorrect && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-500">Correct Answer:</span>
                          <span className="text-sm text-green-600">{result.correctAnswer}</span>
                        </div>
                      )}
                    </div>
                    {result.explanation && (
                      <div className="mt-4 text-sm text-gray-600 bg-gray-50 rounded-lg p-4">
                        <span className="font-medium">Explanation: </span>
                        {result.explanation}
                      </div>
                    )}
                  </div>
                  <div className="ml-6">
                    {result.isCorrect ? (
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-500" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex justify-center gap-4"
          >
            <button
              onClick={() => navigate('/practice-test')}
              className="btn-primary"
            >
              Take Another Test
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-outline"
            >
              Back to Dashboard
            </button>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
