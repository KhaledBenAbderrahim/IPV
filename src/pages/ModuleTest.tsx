import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, ArrowRight, Sparkles, Brain, Target } from 'lucide-react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import SwipeableYesNo from '../components/test/SwipeableYesNo';

interface Question {
  id: number;
  type: 'multiple' | 'fill' | 'boolean';
  question: string;
  options?: string[];
  correctAnswer: string;
  hint: string;
  points: number;
}

const testData = {
  moduleId: 4,
  title: 'Inventory Management',
  description: 'Test your knowledge of inventory management principles',
  questions: [
    {
      id: 1,
      type: 'multiple',
      question: 'Which inventory management method is best for perishable goods?',
      options: ['FIFO', 'LIFO', 'Average Cost', 'Specific Identification'],
      correctAnswer: 'FIFO',
      hint: 'First In, First Out (FIFO) ensures older stock is sold first.',
      points: 10,
    },
    {
      id: 2,
      type: 'fill',
      question: 'The formula for Economic Order Quantity is EOQ = sqrt(2DS/H), where D is annual demand, S is setup cost, and ____ is holding cost.',
      correctAnswer: 'H',
      hint: 'H represents the annual holding cost per unit.',
      points: 15,
    },
    {
      id: 3,
      type: 'boolean',
      question: 'Safety stock helps protect against stockouts during lead time.',
      correctAnswer: 'true',
      hint: 'Safety stock acts as a buffer against uncertainty in demand and lead time.',
      points: 5,
    },
  ] as Question[],
};

export default function ModuleTest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [points, setPoints] = useState(0);

  const question = testData.questions[currentQuestion];

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [question.id]: answer });
    checkAnswer(answer);
  };

  const checkAnswer = (answer: string) => {
    const isAnswerCorrect = answer.toLowerCase() === question.correctAnswer.toLowerCase();
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);
    if (isAnswerCorrect) {
      setPoints(points + question.points);
    }
  };

  const handleTestComplete = () => {
    const results = {
      moduleId: id,
      totalQuestions: testData.questions.length,
      correctAnswers: Object.entries(answers).filter(
        ([qId, answer]) => 
          answer.toLowerCase() === testData.questions.find(q => q.id === parseInt(qId))?.correctAnswer.toLowerCase()
      ).length,
      earnedPoints: points,
      maxPoints: testData.questions.reduce((sum, q) => sum + q.points, 0),
      answers
    };
    navigate('/student/test/results', { state: { results } });
  };

  const handleNext = () => {
    if (currentQuestion < testData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
      setShowHint(false);
    } else {
      handleTestComplete();
    }
  };

  const renderQuestion = () => {
    switch (question.type) {
      case 'multiple':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.options?.map((option, index) => (
              <motion.label
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-2xl border-2 transition-all cursor-pointer
                  ${answers[question.id] === option
                    ? 'border-primary bg-primary/5 shadow-lg'
                    : 'border-gray-200 hover:border-primary/60 hover:shadow-md'
                  }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={(e) => handleAnswer(e.target.value)}
                  className="sr-only"
                />
                <div className="p-6">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"
                    initial={false}
                    animate={{
                      opacity: answers[question.id] === option ? 1 : 0,
                      scale: answers[question.id] === option ? 1 : 0.8,
                    }}
                  />
                  <div className="relative flex items-center justify-between">
                    <span className="text-lg font-medium text-gray-800">{option}</span>
                    {answers[question.id] === option && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex-shrink-0 ml-2"
                      >
                        <CheckCircle className="w-6 h-6 text-primary" />
                      </motion.div>
                    )}
                  </div>
                </div>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
                  initial={false}
                  animate={{
                    scaleX: answers[question.id] === option ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.label>
            ))}
          </div>
        );

      case 'fill':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <div className="relative">
              <input
                type="text"
                value={answers[question.id] || ''}
                onChange={(e) => handleAnswer(e.target.value)}
                className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none bg-white/50 backdrop-blur-sm"
                placeholder="Type your answer..."
              />
              <motion.div
                className="absolute inset-x-0 bottom-0 h-1 bg-primary"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: answers[question.id] ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </motion.div>
        );

      case 'boolean':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <SwipeableYesNo
              question={question.question}
              value={answers[question.id] === 'true'}
              onChange={(value) => handleAnswer(value ? 'true' : 'false')}
            />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout role="student">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-8 relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/5 to-transparent rounded-full transform translate-x-32 -translate-y-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-gray-100 to-transparent rounded-full transform -translate-x-32 translate-y-32" />

            <div className="relative">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <Brain className="w-6 h-6 text-primary" />
                    <h1 className="text-3xl font-bold text-gray-800">{testData.title}</h1>
                  </div>
                  <p className="text-gray-600">{testData.description}</p>
                </div>
                <div className="flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-xl">
                  <Target className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-600">Points</p>
                    <p className="text-2xl font-bold text-primary">{points}</p>
                  </div>
                </div>
              </div>

              <div className="relative mb-8">
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / testData.questions.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                  <span>Question {currentQuestion + 1} of {testData.questions.length}</span>
                  <span>{Math.round((currentQuestion + 1) / testData.questions.length * 100)}% Complete</span>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-6">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-medium">{currentQuestion + 1}</span>
                      </div>
                      <h2 className="text-xl font-medium text-gray-800 leading-relaxed">
                        {question.question}
                      </h2>
                    </div>
                    {renderQuestion()}
                  </div>

                  {showFeedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-6 rounded-2xl ${
                        isCorrect ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'
                      }`}
                    >
                      <div className="flex items-center">
                        {isCorrect ? (
                          <>
                            <CheckCircle className="h-6 w-6 text-green-500" />
                            <div className="ml-3">
                              <p className="text-green-700 font-medium">Correct!</p>
                              <p className="text-green-600 text-sm">+{question.points} points</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-6 w-6 text-red-500" />
                            <div className="ml-3">
                              <p className="text-red-700 font-medium">Incorrect</p>
                              <button
                                onClick={() => setShowHint(true)}
                                className="text-red-600 text-sm flex items-center mt-1 hover:text-red-700"
                              >
                                <AlertCircle className="h-4 w-4 mr-1" />
                                Need a hint?
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                      {showHint && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-3 pl-9"
                        >
                          <p className="text-gray-600 text-sm">
                            {question.hint}
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {showFeedback && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-end"
                    >
                      <button
                        onClick={handleNext}
                        className="group relative inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <span className="relative flex items-center">
                          {currentQuestion < testData.questions.length - 1 ? (
                            <>
                              Next Question
                              <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                            </>
                          ) : (
                            <>
                              Complete Test
                              <Sparkles className="ml-2 h-5 w-5 animate-pulse" />
                            </>
                          )}
                        </span>
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}