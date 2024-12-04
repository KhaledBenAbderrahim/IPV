import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Clock, CheckCircle2, Camera, Mic, Eye, BookOpen, ChevronRight, Timer, Loader2, Wifi, Globe, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../components/layouts/DashboardLayout';

const examRules = [
  {
    icon: Camera,
    title: 'Camera Required',
    description: 'Must have a working webcam for identity verification and proctoring',
  },
  {
    icon: Mic,
    title: 'Quiet Environment',
    description: 'Must be in a quiet room without any disturbances',
  },
  {
    icon: Clock,
    title: 'Time Commitment',
    description: 'Exam duration is 180 minutes. No breaks allowed.',
  },
  {
    icon: Eye,
    title: 'Proctoring',
    description: 'Your screen and webcam will be monitored during the exam',
  },
];

const examTopics = [
  'E-Commerce Fundamentals',
  'Digital Marketing',
  'Supply Chain Management',
  'Customer Service',
  'Payment Systems',
  'Data Analysis',
  'Legal Requirements',
  'International Trade',
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

export default function IHKExam() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'rules' | 'system-check' | 'confirmation'>('rules');
  const [isChecked, setIsChecked] = useState(false);
  const [systemChecks, setSystemChecks] = useState({
    camera: false,
    microphone: false,
    internet: false,
    browser: false,
  });

  useEffect(() => {
    const runSystemChecks = async () => {
      if (step === 'system-check') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSystemChecks(prev => ({ ...prev, browser: true }));
        await new Promise(resolve => setTimeout(resolve, 500));
        setSystemChecks(prev => ({ ...prev, internet: true }));
        await new Promise(resolve => setTimeout(resolve, 800));
        setSystemChecks(prev => ({ ...prev, camera: true }));
        await new Promise(resolve => setTimeout(resolve, 600));
        setSystemChecks(prev => ({ ...prev, microphone: true }));
      }
    };

    runSystemChecks();
  }, [step]);

  const startExam = () => {
    navigate('/student/exam');
  };

  return (
    <DashboardLayout role="student">
      <div className="min-h-screen bg-[#f8fafc] px-3 py-4 sm:p-8">
        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Timer Banner */}
          <motion.div 
            className="mb-3 sm:mb-6 bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center space-x-3">
                <Timer className="h-4 sm:h-6 w-4 sm:w-6 text-primary" />
                <div>
                  <h3 className="text-sm sm:text-base font-medium text-gray-900">Exam Duration</h3>
                  <p className="text-xs sm:text-sm text-gray-500">180 minutes</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs sm:text-sm text-gray-500">Current Time</p>
                <p className="text-sm sm:text-lg font-semibold text-gray-900">{new Date().toLocaleTimeString()}</p>
              </div>
            </div>
          </motion.div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-primary to-primary-dark p-4 sm:p-8 text-white">
              <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
              <div className="relative">
                <motion.h1 
                  className="text-xl sm:text-3xl md:text-4xl font-bold"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  IHK Practice Examination
                </motion.h1>
                <motion.p 
                  className="mt-1.5 sm:mt-2 text-sm md:text-base text-primary-light"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Official IHK certification practice examination environment
                </motion.p>
              </div>
            </div>

            <div className="p-3 sm:p-6 md:p-8">
              <AnimatePresence mode="wait">
                {step === 'rules' && (
                  <motion.div {...fadeInUp} className="space-y-4 sm:space-y-6">
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-3 sm:p-4">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="h-4 sm:h-5 w-4 sm:w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="text-sm font-medium text-yellow-800">
                            Important Examination Notice
                          </h3>
                          <p className="mt-1 text-xs sm:text-sm text-yellow-700">
                            This is an official practice examination that simulates the actual IHK certification environment.
                            Please ensure all requirements are met before proceeding.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6">
                      {examRules.map((rule, index) => (
                        <motion.div
                          key={rule.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group flex items-start p-3 sm:p-5 bg-white rounded-lg sm:rounded-xl border-2 border-gray-100 hover:border-primary/60 transition-all duration-200 active:bg-gray-50"
                        >
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <rule.icon className="h-4 sm:h-5 w-4 sm:w-5 text-primary group-hover:scale-110 transition-transform" />
                          </div>
                          <div className="flex-1 min-w-0 ml-3">
                            <h3 className="text-sm sm:text-base font-medium text-gray-900">{rule.title}</h3>
                            <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-gray-500">{rule.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div 
                      className="bg-white rounded-lg sm:rounded-xl border-2 border-gray-100 p-4 sm:p-6 hover:border-primary transition-all duration-200"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center mb-3 sm:mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <BookOpen className="h-4 sm:h-5 w-4 sm:w-5 text-primary" />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 ml-3">Examination Topics</h3>
                      </div>
                      <div className="grid grid-cols-1 gap-2 sm:gap-4">
                        {examTopics.map((topic, index) => (
                          <motion.div
                            key={topic}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center text-xs sm:text-sm text-gray-600 hover:text-primary transition-colors"
                          >
                            <CheckCircle2 className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-primary mr-2 flex-shrink-0" />
                            <span className="leading-tight">{topic}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <div className="mt-4 sm:mt-6 space-y-4">
                      <label className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => setIsChecked(e.target.checked)}
                          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="text-xs sm:text-sm text-gray-600">
                          I have read and agree to the examination rules and requirements. I understand that any violation
                          may result in disqualification.
                        </span>
                      </label>

                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                        <button
                          onClick={() => setStep('system-check')}
                          disabled={!isChecked}
                          className={`w-full sm:w-auto px-4 sm:px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                            isChecked
                              ? 'bg-primary text-white hover:bg-primary-dark active:bg-primary-darker'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          Continue
                        </button>
                        <button
                          onClick={() => navigate(-1)}
                          className="w-full sm:w-auto px-4 sm:px-6 py-2.5 rounded-lg font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-all duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 'system-check' && (
                  <motion.div {...fadeInUp} className="space-y-4 sm:space-y-6">
                    <div className="text-center">
                      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">System Compatibility Check</h2>
                      <p className="mt-1.5 sm:mt-2 text-sm text-gray-600">Please wait while we verify your system requirements</p>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                      <div className="bg-white rounded-lg sm:rounded-xl border-2 border-gray-100 p-3 sm:p-6">
                        <div className="space-y-3 sm:space-y-4">
                          {Object.entries(systemChecks).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                {key === 'camera' && <Camera className="h-4 sm:h-5 w-4 sm:w-5 text-gray-400" />}
                                {key === 'microphone' && <Mic className="h-4 sm:h-5 w-4 sm:w-5 text-gray-400" />}
                                {key === 'internet' && <Wifi className="h-4 sm:h-5 w-4 sm:w-5 text-gray-400" />}
                                {key === 'browser' && <Globe className="h-4 sm:h-5 w-4 sm:w-5 text-gray-400" />}
                                <span className="text-sm sm:text-base text-gray-900 capitalize">{key}</span>
                              </div>
                              {value ? (
                                <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5 text-green-500" />
                              ) : (
                                <Loader2 className="h-4 sm:h-5 w-4 sm:w-5 text-gray-400 animate-spin" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <button
                          onClick={() => setStep('confirmation')}
                          disabled={!Object.values(systemChecks).every(Boolean)}
                          className={`w-full sm:w-auto px-4 sm:px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                            Object.values(systemChecks).every(Boolean)
                              ? 'bg-primary text-white hover:bg-primary-dark active:bg-primary-darker'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          Continue
                        </button>
                        <button
                          onClick={() => setStep('rules')}
                          className="w-full sm:w-auto px-4 sm:px-6 py-2.5 rounded-lg font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-all duration-200"
                        >
                          Back
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 'confirmation' && (
                  <motion.div {...fadeInUp} className="text-center space-y-4 sm:space-y-6">
                    <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-3 sm:p-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="text-sm font-medium text-green-800">
                            Ready to Begin
                          </h3>
                          <p className="mt-1 text-xs sm:text-sm text-green-700">
                            All system checks have passed. You may now start your examination.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <button
                        onClick={startExam}
                        className="w-full sm:w-auto px-4 sm:px-6 py-2.5 rounded-lg font-medium bg-primary text-white hover:bg-primary-dark active:bg-primary-darker transition-all duration-200"
                      >
                        Start Exam
                      </button>
                      <button
                        onClick={() => setStep('system-check')}
                        className="w-full sm:w-auto px-4 sm:px-6 py-2.5 rounded-lg font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-all duration-200"
                      >
                        Back
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}