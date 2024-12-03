import React from 'react';
import { ArrowRight, Sparkles, Users, GraduationCap, Award, BarChart2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[90vh] bg-background overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-32 w-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl"
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
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-8">
              <Sparkles className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Revolutionizing Education</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark leading-tight">
              Transform Your
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block mt-2">
                Learning Journey
              </span>
            </h1>
            
            <p className="mt-8 text-xl text-light/90 leading-relaxed">
              The ultimate platform for educational excellence, empowering both HR managers
              and students to achieve their learning goals with cutting-edge tools.
            </p>
            
            <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/register')}
                className="btn-primary flex items-center justify-center group px-8 py-4 rounded-xl text-lg"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className="btn-outline px-8 py-4 rounded-xl text-lg border-2"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            {/* Hero Image Container */}
            <div className="relative w-full aspect-square max-w-2xl mx-auto">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl transform -rotate-6" />
              
              {/* Image */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative z-0"
              >
                <img
                  src="https://raw.githubusercontent.com/KhaledBenAbderrahim/CSRD/main/images/learning-2.png"
                  alt="Learning Illustration"
                  className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-300"
                  loading="eager"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = '/fallback-image.png'; // Add a fallback image if needed
                  }}
                />
              </motion.div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -right-8 top-1/4 bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl p-4 flex items-center gap-3 z-10"
              >
                <div className="p-2 bg-primary/10 rounded-xl">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-dark">Active Users</p>
                  <p className="text-2xl font-bold text-primary">2.5k+</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute -left-8 bottom-1/4 bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl p-4 flex items-center gap-3 z-10"
              >
                <div className="p-2 bg-accent/10 rounded-xl">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-dark">Success Rate</p>
                  <p className="text-2xl font-bold text-accent">94%</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}