import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  X,
  AlertTriangle,
  Eye,
  BarChart
} from 'lucide-react';

interface Question {
  id: number;
  type: 'multiple' | 'text' | 'boolean';
  content: string;
  options?: string[];
  answer?: string | boolean;
}

const mockIHKExam = {
  title: 'IHK E-Commerce Practice Exam',
  course: 'E-Commerce Professional Certification',
  duration: 120, // minutes
  questions: [
    {
      id: 1,
      type: 'multiple',
      content: 'Which of the following is a key advantage of e-commerce?',
      options: [
        'Limited market reach',
        'Global market accessibility',
        'Higher operational costs',
        'Slower transaction processing'
      ]
    },
    {
      id: 2,
      type: 'text',
      content: 'Explain the concept of conversion rate in e-commerce.',
    },
    {
      id: 3,
      type: 'boolean',
      content: 'SSL certificates are essential for secure e-commerce transactions.',
    },
    {
      id: 4,
      type: 'multiple',
      content: 'Which payment system is most commonly used in B2B e-commerce?',
      options: [
        'Credit Cards',
        'Wire Transfers',
        'Digital Wallets',
        'Cash on Delivery'
      ]
    }
  ] as Question[]
};

export default function ExamPage() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | boolean>>({});
  const [flagged, setFlagged] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(mockIHKExam.duration * 60); // in seconds
  const [showExitModal, setShowExitModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (answer: string | boolean) => {
    setAnswers((prev) => ({
      ...prev,
      [mockIHKExam.questions[currentQuestion].id]: answer
    }));
  };

  const toggleFlag = () => {
    const questionId = mockIHKExam.questions[currentQuestion].id;
    setFlagged((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleSubmit = () => {
    setShowSubmitModal(false);
    navigate('/student/exam-results', {
      state: {
        score: 85,
        timeSpent: formatTime(mockIHKExam.duration * 60 - timeLeft),
        totalQuestions: mockIHKExam.questions.length,
        correctAnswers: Object.keys(answers).length,
        categories: [
          { name: 'E-Commerce Fundamentals', score: 90 },
          { name: 'Digital Marketing', score: 85 },
          { name: 'Payment Systems', score: 80 },
          { name: 'Legal Requirements', score: 85 },
        ]
      }
    });
  };

  const renderQuestion = () => {
    const question = mockIHKExam.questions[currentQuestion];
    const answer = answers[question.id];

    switch (question.type) {
      case 'multiple':
        return (
          <div className="space-y-4">
            {question.options?.map((option, index) => (
              <label
                key={index}
                className={`block p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  answer === option
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-primary/60'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={answer === option}
                  onChange={(e) => handleAnswer(e.target.value)}
                  className="sr-only"
                />
                <span className="text-dark">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'text':
        return (
          <textarea
            value={answer as string || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full h-32 p-4 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
          />
        );

      case 'boolean':
        return (
          <div className="flex space-x-4">
            {['True', 'False'].map((option) => (
              <label
                key={option}
                className={`flex-1 p-4 rounded-lg border-2 text-center transition-all cursor-pointer ${
                  answer === (option === 'True')
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-primary/60'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={answer === (option === 'True')}
                  onChange={() => handleAnswer(option === 'True')}
                  className="sr-only"
                />
                <span className="text-dark">{option}</span>
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 bg-white/80 border-b border-slate-200 backdrop-blur-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-slate-800 tracking-tight">{mockIHKExam.title}</h1>
              <div className="hidden md:flex items-center px-3 py-1 bg-blue-50 rounded-full">
                <span className="text-sm font-medium text-blue-700">Official Exam Environment</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center px-4 py-2.5 bg-slate-800 text-white rounded-xl shadow-sm">
                <Clock className="h-5 w-5 mr-2 text-slate-300" />
                <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
              </div>
              <button
                onClick={() => setShowExitModal(true)}
                className="p-2 rounded-lg hover:bg-red-50 text-slate-600 hover:text-red-600 transition-all duration-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Question navigation */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-800">Questions</h2>
                  <div className="flex items-center px-3 py-1 bg-blue-50 rounded-lg">
                    <BarChart className="h-4 w-4 text-blue-600 mr-1" />
                    <span className="text-sm font-medium text-blue-700">
                      {Object.keys(answers).length}/{mockIHKExam.questions.length}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {mockIHKExam.questions.map((question, index) => (
                    <button
                      key={question.id}
                      onClick={() => setCurrentQuestion(index)}
                      className={`relative p-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                        currentQuestion === index
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200/50 transform scale-105 ring-2 ring-blue-600 ring-offset-2'
                          : answers[question.id]
                          ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {index + 1}
                      {flagged.includes(question.id) && (
                        <Flag className="absolute -top-1 -right-1 h-3 w-3 text-amber-500" fill="currentColor" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="mt-6 space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center text-sm">
                    <div className="w-4 h-4 rounded-lg bg-blue-50 border border-blue-200 mr-3" />
                    <span className="text-slate-600">Answered</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-4 h-4 rounded-lg bg-slate-100 border border-slate-200 mr-3" />
                    <span className="text-slate-600">Unanswered</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Flag className="h-4 w-4 text-amber-500 mr-3" fill="currentColor" />
                    <span className="text-slate-600">Flagged for Review</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-amber-800">Exam Guidelines</h3>
                    <ul className="mt-2 text-sm text-amber-700 space-y-1">
                      <li>• Stay focused on your screen</li>
                      <li>• No external resources allowed</li>
                      <li>• Complete all questions</li>
                      <li>• Review before submission</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Question content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <div className="flex items-center space-x-3">
                      <span className="px-3 py-1 bg-blue-50 rounded-full text-sm font-medium text-blue-700">
                        Question {currentQuestion + 1} of {mockIHKExam.questions.length}
                      </span>
                      {flagged.includes(mockIHKExam.questions[currentQuestion].id) && (
                        <span className="px-3 py-1 bg-amber-50 rounded-full text-sm font-medium text-amber-700 flex items-center">
                          <Flag className="h-3.5 w-3.5 mr-1" />
                          Flagged
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mt-3">
                      {mockIHKExam.course}
                    </h3>
                  </div>
                  <button
                    onClick={toggleFlag}
                    className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      flagged.includes(mockIHKExam.questions[currentQuestion].id)
                        ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Flag className="h-4 w-4 mr-2" />
                    {flagged.includes(mockIHKExam.questions[currentQuestion].id) ? 'Unflag' : 'Flag for Review'}
                  </button>
                </div>

                <div className="prose max-w-none">
                  <p className="text-slate-700 text-lg leading-relaxed mb-8">
                    {mockIHKExam.questions[currentQuestion].content}
                  </p>
                </div>

                <div className="mt-8">
                  {renderQuestion()}
                </div>

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
                  <button
                    onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
                    disabled={currentQuestion === 0}
                    className="flex items-center px-5 py-2.5 text-sm font-medium rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </button>

                  {currentQuestion === mockIHKExam.questions.length - 1 ? (
                    <button
                      onClick={() => setShowSubmitModal(true)}
                      className="flex items-center px-6 py-2.5 text-sm font-medium rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200/50 transition-all duration-200"
                    >
                      Submit Exam
                      <CheckCircle2 className="h-4 w-4 ml-2" />
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        setCurrentQuestion((prev) =>
                          Math.min(mockIHKExam.questions.length - 1, prev + 1)
                        )
                      }
                      className="flex items-center px-5 py-2.5 text-sm font-medium rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200/50 transition-all duration-200"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exit Modal */}
      {showExitModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 transform transition-all duration-200">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-red-100 mx-auto">
              <AlertCircle className="h-7 w-7 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 text-center mt-4">
              Exit Examination?
            </h3>
            <p className="text-slate-600 text-center mt-2">
              Warning: All progress will be lost if you exit now. This action cannot be undone.
            </p>
            <div className="flex items-center justify-end space-x-4 mt-8">
              <button
                onClick={() => setShowExitModal(false)}
                className="px-5 py-2.5 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
              >
                Continue Exam
              </button>
              <Link 
                to="/student-dashboard" 
                className="px-5 py-2.5 text-sm font-medium rounded-xl bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-200/50 transition-all duration-200"
              >
                Exit Exam
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 transform transition-all duration-200">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-100 mx-auto">
              <CheckCircle2 className="h-7 w-7 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 text-center mt-4">
              Submit Examination?
            </h3>
            <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Questions Answered</span>
                  <span className="font-medium text-slate-900">{Object.keys(answers).length}/{mockIHKExam.questions.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Time Remaining</span>
                  <span className="font-medium text-slate-900">{formatTime(timeLeft)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Flagged Questions</span>
                  <span className="font-medium text-slate-900">{flagged.length}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-4 mt-8">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-5 py-2.5 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
              >
                Review Answers
              </button>
              <button 
                onClick={handleSubmit}
                className="px-6 py-2.5 text-sm font-medium rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200/50 transition-all duration-200"
              >
                Submit Exam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}