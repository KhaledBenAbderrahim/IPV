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
        className="absolute w-72 h-72 rounded-full bg-primary/10 blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          top: '20%',
          right: '10%',
        }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-accent/10 blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          bottom: '10%',
          left: '5%',
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
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-center space-x-4">
        <motion.div 
          className={`p-2 rounded-lg ${color} bg-opacity-10 group-hover:bg-opacity-20 transition-colors duration-300`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </motion.div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default function Features() {
  return (
    <section id="features" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Animated Background Elements */}
      <FloatingElement />
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-primary/5 text-primary">
              Features
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl"
          >
            Everything you need to excel
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
            />
          ))}
        </div>
      </div>
    </section>
  );
}