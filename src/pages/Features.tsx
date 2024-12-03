import React from 'react';
import { 
  BookOpen, 
  Users, 
  Award, 
  Brain,
  Zap,
  Layout,
  BarChart2,
  FileText,
  MessageSquare,
  Video,
  Calendar,
  Clock,
  Target,
  Settings,
  Code,
  Server,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Dual Role System',
    description: 'Seamless experience for both HR managers and students with role-specific features.',
    icon: Users,
    details: [
      'Role-based dashboards',
      'Customized navigation',
      'Personalized content delivery'
    ]
  },
  {
    title: 'Interactive Learning',
    description: 'Engage with dynamic content and interactive lessons designed for maximum retention.',
    icon: Brain,
    details: [
      'Live sessions',
      'Interactive quizzes',
      'Practice tests',
      'Real-time feedback'
    ]
  },
  {
    title: 'Advanced Analytics',
    description: 'Comprehensive tracking and analysis of learning progress and performance.',
    icon: BarChart2,
    details: [
      'Performance metrics',
      'Progress tracking',
      'Custom reports',
      'Engagement analytics'
    ]
  }
];

const hrFeatures = [
  {
    title: 'Student Management',
    description: 'Complete control over student enrollments and progress tracking.',
    icon: Users,
    color: 'from-blue-500 to-blue-600',
    gradient: 'from-blue-500/10 to-blue-600/10'
  },
  {
    title: 'Course Administration',
    description: 'Create and manage course content with ease.',
    icon: BookOpen,
    color: 'from-green-500 to-green-600',
    gradient: 'from-green-500/10 to-green-600/10'
  },
  {
    title: 'Performance Analytics',
    description: 'In-depth insights into student performance and engagement.',
    icon: BarChart2,
    color: 'from-purple-500 to-purple-600',
    gradient: 'from-purple-500/10 to-purple-600/10'
  }
];

const studentFeatures = [
  {
    title: 'Interactive Learning',
    description: 'Engage with dynamic course content and materials.',
    icon: Brain,
    color: 'from-pink-500 to-pink-600',
    gradient: 'from-pink-500/10 to-pink-600/10'
  },
  {
    title: 'Progress Tracking',
    description: 'Monitor your learning journey and achievements.',
    icon: Target,
    color: 'from-yellow-500 to-yellow-600',
    gradient: 'from-yellow-500/10 to-yellow-600/10'
  },
  {
    title: 'Community Features',
    description: 'Connect and learn with fellow students.',
    icon: MessageSquare,
    color: 'from-indigo-500 to-indigo-600',
    gradient: 'from-indigo-500/10 to-indigo-600/10'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Features() {
  return (
    <div className="min-h-screen bg-background">
      {/* Back to Home Link */}
      <Link 
        to="/" 
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white/90 transition-all duration-300"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      {/* Hero Section */}
      <div className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Powerful Features for Modern Learning
            </motion.h1>
            <motion.p 
              className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Discover all the tools and features designed to make your learning journey effective and enjoyable
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Features Grid */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={item}
                className="group relative bg-white p-8 rounded-2xl shadow-airbnb hover:shadow-airbnb-hover transition-all duration-300"
              >
                {/* Card Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative">
                  {/* Icon */}
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6 text-primary group-hover:rotate-12 transition-transform duration-300" />
                  </div>

                  {/* Content */}
                  <h3 className="mt-6 text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Details List */}
                  <ul className="mt-4 space-y-2">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-center text-gray-500 group-hover:text-gray-600">
                        <ChevronRight className="h-4 w-4 text-primary mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Role-Specific Features */}
      <div className="bg-gray-50/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* HR Features */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              HR Management Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hrFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative bg-white p-8 rounded-2xl shadow-airbnb hover:shadow-airbnb-hover transition-all duration-300 overflow-hidden"
                  >
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    
                    <div className="relative">
                      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="mt-6 text-xl font-semibold text-gray-900 group-hover:text-gray-800">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-gray-500 group-hover:text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Student Features */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-24"
          >
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Student Learning Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {studentFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative bg-white p-8 rounded-2xl shadow-airbnb hover:shadow-airbnb-hover transition-all duration-300 overflow-hidden"
                  >
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    
                    <div className="relative">
                      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="mt-6 text-xl font-semibold text-gray-900 group-hover:text-gray-800">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-gray-500 group-hover:text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}