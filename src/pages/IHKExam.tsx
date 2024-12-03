import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Clock, CheckCircle2, Camera, Mic, Eye, BookOpen, ChevronRight, Timer } from 'lucide-react';
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
      <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8">
        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Timer Banner */}
          <motion.div 
            className="mb-6 bg-white rounded-xl shadow-sm border border-gray-100 p-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Timer className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Exam Duration</h3>
                  <p className="text-sm text-gray-500">180 minutes</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Current Time</p>
                <p className="text-lg font-semibold text-gray-900">{new Date().toLocaleTimeString()}</p>
              </div>
            </div>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-primary to-primary-dark p-8 text-white">
              <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
              <div className="relative">
                <motion.h1 
                  className="text-3xl md:text-4xl font-bold"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  IHK Practice Examination
                </motion.h1>
                <motion.p 
                  className="mt-2 text-primary-light text-sm md:text-base"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Official IHK certification practice examination environment
                </motion.p>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {step === 'rules' && (
                  <motion.div {...fadeInUp} className="space-y-6">
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4">
                      <div className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-yellow-800">
                            Important Examination Notice
                          </h3>
                          <p className="text-sm text-yellow-700 mt-1">
                            This is an official practice examination that simulates the actual IHK certification environment.
                            Please ensure all requirements are met before proceeding.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {examRules.map((rule, index) => (
                        <motion.div
                          key={rule.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group flex items-start p-5 bg-white rounded-xl border-2 border-gray-100 hover:border-primary hover:shadow-md transition-all duration-200"
                        >
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <rule.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                          </div>
                          <div className="ml-4">
                            <h3 className="text-sm font-semibold text-gray-900">{rule.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{rule.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div 
                      className="bg-white rounded-xl border-2 border-gray-100 p-6 hover:border-primary transition-all duration-200"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 ml-3">Examination Topics</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {examTopics.map((topic, index) => (
                          <motion.div
                            key={topic}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center text-sm text-gray-600 hover:text-primary transition-colors"
                          >
                            <CheckCircle2 className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                            <span className="leading-tight">{topic}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <div className="border-t border-gray-100 pt-6">
                      <label className="flex items-start cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => setIsChecked(e.target.checked)}
                          className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                          I confirm that I have read and agree to the examination rules and requirements. 
                          I understand that any violation of these rules may result in immediate disqualification.
                        </span>
                      </label>

                      <motion.button
                        onClick={() => setStep('system-check')}
                        disabled={!isChecked}
                        className={`mt-6 w-full py-3.5 px-4 rounded-xl flex items-center justify-center text-white font-medium transition-all duration-200 ${
                          isChecked
                            ? 'bg-primary hover:bg-primary-dark'
                            : 'bg-gray-200 cursor-not-allowed'
                        }`}
                        whileHover={isChecked ? { scale: 1.02 } : {}}
                        whileTap={isChecked ? { scale: 0.98 } : {}}
                      >
                        Proceed to System Check
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {step === 'system-check' && (
                  <motion.div {...fadeInUp} className="space-y-6">
                    <div className="text-center">
                      <h2 className="text-2xl font-semibold text-gray-900">System Compatibility Check</h2>
                      <p className="mt-2 text-gray-600">Please wait while we verify your system requirements</p>
                    </div>

                    <div className="space-y-4 max-w-md mx-auto">
                      {Object.entries(systemChecks).map(([key, value], index) => (
                        <motion.div
                          key={key}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.2 }}
                          className="flex items-center justify-between p-4 bg-white rounded-lg border-2 border-gray-100"
                        >
                          <span className="text-sm font-medium text-gray-700 capitalize">
                            {key.replace('_', ' ')}
                          </span>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: value ? 1 : 0 }}
                            transition={{ delay: index * 0.2 }}
                          >
                            <CheckCircle2 className={`h-5 w-5 ${value ? 'text-green-500' : 'text-gray-300'}`} />
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>

                    {Object.values(systemChecks).every(Boolean) && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="text-center"
                      >
                        <motion.button
                          onClick={() => setStep('confirmation')}
                          className="bg-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Continue to Final Confirmation
                        </motion.button>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {step === 'confirmation' && (
                  <motion.div {...fadeInUp} className="text-center space-y-6">
                    <div className="bg-green-50 rounded-xl p-8">
                      <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
                      <h2 className="mt-4 text-2xl font-semibold text-gray-900">Ready to Begin</h2>
                      <p className="mt-2 text-gray-600">All systems are ready. You may now start your examination.</p>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-4">
                      <p className="text-sm text-yellow-800">
                        Once you start, the exam timer will begin and cannot be paused.
                        Please ensure you have allocated sufficient time to complete the examination.
                      </p>
                    </div>

                    <motion.button
                      onClick={startExam}
                      className="bg-primary text-white px-8 py-3.5 rounded-xl font-medium hover:bg-primary-dark transition-colors w-full md:w-auto"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Start Examination
                    </motion.button>
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