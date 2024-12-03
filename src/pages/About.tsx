import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Award, 
  Code, 
  Server, 
  Database,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Github,
  Globe,
  Cpu,
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
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Advanced Learning Management',
    description: 'Comprehensive course management with interactive content delivery',
    icon: BookOpen,
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Dual Role System',
    description: 'Seamless experience for both HR managers and students',
    icon: Users,
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    title: 'AI-Powered Learning',
    description: 'Personalized learning paths and recommendations',
    icon: Brain,
    gradient: 'from-green-500 to-green-600',
  },
  {
    title: 'Real-time Analytics',
    description: 'Detailed insights into learning progress and performance',
    icon: Cpu,
    gradient: 'from-pink-500 to-pink-600',
  },
];

const techStack = [
  { 
    name: 'Frontend', 
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    icon: Layout,
    gradient: 'from-blue-500 to-indigo-500'
  },
  { 
    name: 'Backend', 
    items: ['Node.js', 'Express', 'PostgreSQL', 'Redis'],
    icon: Server,
    gradient: 'from-green-500 to-emerald-500'
  },
  { 
    name: 'DevOps', 
    items: ['Docker', 'AWS', 'CI/CD', 'Monitoring'],
    icon: Settings,
    gradient: 'from-orange-500 to-red-500'
  },
  { 
    name: 'Testing', 
    items: ['Jest', 'React Testing Library', 'Cypress'],
    icon: Target,
    gradient: 'from-purple-500 to-pink-500'
  },
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

export default function About() {
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
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-64 w-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl"
              animate={{
                y: [0, -50, 0],
                x: [0, 30, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 2,
              }}
              style={{
                top: `${20 + i * 30}%`,
                left: `${10 + i * 40}%`,
              }}
            />
          ))}
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              About EduMaster Pro
            </motion.h1>
            <motion.p 
              className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              A next-generation learning management system designed to transform educational experiences
              through advanced technology and intuitive design.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Platform Overview */}
        <motion.div 
          className="prose prose-lg max-w-none"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Platform Overview</h2>
          <p className="text-gray-600">
            EduMaster Pro is a comprehensive learning management system that bridges the gap between
            traditional education and modern technology. Our platform offers a dual-interface system
            catering to both HR managers and students, providing tools for course management,
            assessment, and performance tracking.
          </p>
          <p className="text-gray-600">
            Built with scalability and user experience in mind, EduMaster Pro leverages cutting-edge
            technologies to deliver a seamless learning experience. From AI-powered recommendations
            to real-time analytics, every feature is designed to enhance the educational journey.
          </p>
        </motion.div>

        {/* Core Features */}
        <motion.div 
          className="mt-24"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Core Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={item}
                  className="group relative bg-white p-8 rounded-2xl shadow-airbnb hover:shadow-airbnb-hover transition-all duration-300"
                >
                  {/* Card Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient}/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative">
                    {/* Icon */}
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    {/* Content */}
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

        {/* Tech Stack */}
        <motion.div 
          className="mt-24 bg-gray-50/50 rounded-3xl p-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Technology Stack</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techStack.map((stack, index) => {
              const Icon = stack.icon;
              return (
                <motion.div
                  key={stack.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-white p-8 rounded-2xl shadow-airbnb hover:shadow-airbnb-hover transition-all duration-300"
                >
                  {/* Card Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stack.gradient}/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative">
                    {/* Icon */}
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${stack.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="mt-6 text-xl font-semibold text-gray-900 group-hover:text-gray-800">
                      {stack.name}
                    </h3>
                    <ul className="mt-4 space-y-2">
                      {stack.items.map((item, i) => (
                        <li key={i} className="flex items-center text-gray-500 group-hover:text-gray-600">
                          <ChevronRight className="h-4 w-4 text-primary mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div 
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Have questions about EduMaster Pro? We'd love to hear from you. Our team is ready to help you get started.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors duration-300"
            >
              Contact Us
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              to="/demo"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 transition-colors duration-300"
            >
              Request Demo
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}