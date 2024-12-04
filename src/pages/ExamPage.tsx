import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center">
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                {mockIHKExam.title}
              </h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/5 text-primary rounded-lg">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="ml-2 text-sm sm:text-base font-medium">{formatTime(timeLeft)}</span>
              </div>
              <button
                onClick={() => setShowExitModal(true)}
                className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors active:scale-95 touch-manipulation"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
          {/* Question Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <span className="text-sm sm:text-base text-gray-600">
              Question {currentQuestion + 1} of {mockIHKExam.questions.length}
            </span>
            <button
              onClick={toggleFlag}
              className={`flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base transition-colors active:scale-95 touch-manipulation ${
                flagged.includes(mockIHKExam.questions[currentQuestion].id)
                  ? 'bg-yellow-50 text-yellow-600'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Flag className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="ml-2">Flag</span>
            </button>
          </div>

          {/* Question Content */}
          <div className="space-y-4 sm:space-y-6">
            <p className="text-base sm:text-lg text-gray-900">
              {mockIHKExam.questions[currentQuestion].content}
            </p>
            <div className="mt-4 sm:mt-6">{renderQuestion()}</div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
            <button
              onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
              className="flex items-center px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base font-medium text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors active:scale-95 touch-manipulation"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
              Previous
            </button>
            {currentQuestion === mockIHKExam.questions.length - 1 ? (
              <button
                onClick={() => setShowSubmitModal(true)}
                className="px-4 py-1.5 sm:px-6 sm:py-2 bg-primary text-sm sm:text-base font-medium rounded-lg text-white hover:bg-primary-dark transition-colors active:scale-95 touch-manipulation"
              >
                Submit Exam
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion((prev) => Math.min(mockIHKExam.questions.length - 1, prev + 1))}
                className="flex items-center px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base font-medium text-gray-600 hover:text-gray-900 transition-colors active:scale-95 touch-manipulation"
              >
                Next
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 ml-1" />
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Exit Modal */}
      <AnimatePresence>
        {showExitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg max-w-md w-full p-4 sm:p-6"
            >
              <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-50 mx-auto">
                <AlertTriangle className="h-6 w-6 sm:h-7 sm:w-7 text-red-600" />
              </div>
              <h3 className="mt-4 text-lg sm:text-xl font-semibold text-gray-900 text-center">Exit Exam?</h3>
              <p className="mt-2 text-sm sm:text-base text-gray-600 text-center">
                Are you sure you want to exit? Your progress will be lost.
              </p>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-2 sm:gap-4">
                <button
                  onClick={() => setShowExitModal(false)}
                  className="flex-1 px-4 py-2 sm:px-6 sm:py-2.5 border border-gray-300 text-sm sm:text-base font-medium rounded-lg text-gray-700 hover:bg-gray-50 transition-colors active:scale-95 touch-manipulation"
                >
                  Cancel
                </button>
                <button
                  onClick={() => navigate('/student/dashboard')}
                  className="flex-1 px-4 py-2 sm:px-6 sm:py-2.5 bg-red-600 text-sm sm:text-base font-medium rounded-lg text-white hover:bg-red-700 transition-colors active:scale-95 touch-manipulation"
                >
                  Exit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit Modal */}
      <AnimatePresence>
        {showSubmitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg max-w-md w-full p-4 sm:p-6"
            >
              <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 mx-auto">
                <AlertCircle className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
              </div>
              <h3 className="mt-4 text-lg sm:text-xl font-semibold text-gray-900 text-center">Submit Exam?</h3>
              <p className="mt-2 text-sm sm:text-base text-gray-600 text-center">
                Are you sure you want to submit? You can't change your answers after submission.
              </p>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-2 sm:gap-4">
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 px-4 py-2 sm:px-6 sm:py-2.5 border border-gray-300 text-sm sm:text-base font-medium rounded-lg text-gray-700 hover:bg-gray-50 transition-colors active:scale-95 touch-manipulation"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 sm:px-6 sm:py-2.5 bg-primary text-sm sm:text-base font-medium rounded-lg text-white hover:bg-primary-dark transition-colors active:scale-95 touch-manipulation"
                >
                  Submit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}