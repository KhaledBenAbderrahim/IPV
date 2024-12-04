import React from 'react';
import { BookOpen, Users, Award, Brain, Zap, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Brain,
    title: 'Smart Learning',
    description: 'AI-powered personalized learning paths',
    color: 'bg-blue-500'
  },
  {
    icon: Target,
    title: 'Focus Mode',
    description: 'Targeted practice with instant feedback',
    color: 'bg-purple-500'
  },
  {
    icon: Award,
    title: 'Achievements',
    description: 'Track progress with gamified learning',
    color: 'bg-green-500'
  },
  {
    icon: Zap,
    title: 'Quick Tests',
    description: 'Rapid knowledge assessment tools',
    color: 'bg-yellow-500'
  },
  {
    icon: BookOpen,
    title: 'Study Plans',
    description: 'Customized learning schedules',
    color: 'bg-red-500'
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Learn together with peers',
    color: 'bg-indigo-500'
  }
];

const FloatingElement = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-48 h-48 sm:w-72 sm:h-72 rounded-full bg-primary/10 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 25, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          top: '10%',
          right: '5%',
        }}
      />
      <motion.div
        className="absolute w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-accent/10 blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, 50, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          bottom: '5%',
          left: '2%',
        }}
      />
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-start space-x-3 sm:space-x-4">
        <motion.div 
          className={`p-2 rounded-lg ${color} bg-opacity-10 group-hover:bg-opacity-20 transition-colors duration-300 flex-shrink-0`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${color.replace('bg-', 'text-')}`} />
        </motion.div>
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default function Features() {
  return (
    <div id="features" className="relative py-12 sm:py-16 lg:py-24 bg-background overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
      
      <FloatingElement />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl sm:text-2xl lg:text-4xl font-bold text-dark mb-3 sm:mb-4"
          >
            Powerful Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm sm:text-base lg:text-lg text-light/90 max-w-2xl mx-auto px-4"
          >
            Everything you need to enhance your learning experience and achieve your goals
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}