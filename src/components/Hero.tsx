import React from 'react';
import { ArrowRight, Sparkles, Users, GraduationCap, Award, BarChart2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.6, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Floating elements - Optimized for mobile */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-24 w-24 sm:h-32 sm:w-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl sm:blur-3xl"
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 1.5,
            }}
            style={{
              top: `${15 + i * 25}%`,
              left: `${5 + i * 30}%`,
            }}
          />
        ))}
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-32 pb-12 sm:pb-16">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-3 sm:px-4 py-1.5 rounded-full bg-primary/10 text-primary mb-4 sm:mb-6"
            >
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
              <span className="text-xs sm:text-sm font-medium">Revolutionizing Education</span>
            </motion.div>
            
            {/* Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-dark leading-tight"
            >
              Transform Your
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block mt-1">
                Learning Journey
              </span>
            </motion.h1>
            
            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-light/90 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              The ultimate platform for educational excellence, empowering both HR managers
              and students to achieve their learning goals with cutting-edge tools.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/register')}
                className="btn-primary flex items-center justify-center group px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/login')}
                className="btn-outline px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base border-2"
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>
          
          {/* Hero Image - Show on mobile and optimize */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative mt-8 sm:mt-0"
          >
            {/* Hero Image Container */}
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl sm:blur-3xl transform -rotate-6" />
              
              {/* Image */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="relative z-0 p-4"
              >
                <img
                  src="https://raw.githubusercontent.com/KhaledBenAbderrahim/CSRD/main/images/learning-2.png"
                  alt="Learning Illustration"
                  className="w-full h-full object-contain transform hover:scale-102 transition-transform duration-300"
                  loading="eager"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = '/fallback-image.png';
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}