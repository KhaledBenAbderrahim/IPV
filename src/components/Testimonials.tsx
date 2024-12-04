import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'HR Director',
    company: 'Tech Solutions Inc.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    content: 'EduMaster Pro has transformed how we handle employee training. The analytics and progress tracking are invaluable for our HR team.',
    rating: 5,
    bgColor: 'from-blue-500/20 to-purple-500/20',
    highlight: '95% improvement in training efficiency'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Graduate Student',
    company: 'Stanford University',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    content: 'The interactive learning features and exam system have made my studies much more engaging and effective. Highly recommended!',
    rating: 5,
    bgColor: 'from-emerald-500/20 to-teal-500/20',
    highlight: '40% better exam scores'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Learning Manager',
    company: 'Global Enterprises',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    content: "The platform's dual role system makes it incredibly easy to manage both corporate training and individual learning paths.",
    rating: 5,
    bgColor: 'from-amber-500/20 to-orange-500/20',
    highlight: '2x faster onboarding time'
  }
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95
  })
};

export default function Testimonials() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const paginate = (newDirection: number) => {
    if (!isAnimating) {
      setPage([page + newDirection, newDirection]);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [page]);

  useEffect(() => {
    const autoPlayTimer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(autoPlayTimer);
  }, []);

  const currentIndex = ((page % testimonials.length) + testimonials.length) % testimonials.length;
  const testimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-24 bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_14px] sm:bg-[size:24px_24px]" />
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[200px] w-[200px] sm:h-[310px] sm:w-[310px] rounded-full bg-primary/5 opacity-70 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-3 sm:px-4 py-1.5 rounded-full bg-primary/10 text-primary mb-4 sm:mb-8"
          >
            <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 fill-primary" />
            <span className="text-xs sm:text-sm font-medium">Trusted by Thousands</span>
          </motion.div>
          
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 px-4">
            What Our Users
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Say About Us</span>
          </h2>
        </motion.div>

        <div className="relative px-2 sm:px-6 lg:px-8">
          <div className="relative max-w-4xl mx-auto" style={{ height: 'auto', minHeight: '450px', sm: { minHeight: '600px' } }}>
            <div className="absolute inset-0">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={page}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.2 }
                  }}
                  className="absolute inset-0 flex items-center justify-center px-2"
                  onAnimationStart={() => setIsAnimating(true)}
                  onAnimationComplete={() => setIsAnimating(false)}
                >
                  <div className="w-full">
                    <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-8 lg:p-12 overflow-hidden">
                      {/* Background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br opacity-5"
                           style={{ background: `linear-gradient(to bottom right, var(--${testimonial.bgColor}))` }} />
                      
                      {/* Quote decoration */}
                      <div className="absolute -right-4 -top-4 sm:-right-6 sm:-top-6 text-gray-100">
                        <Quote className="w-16 h-16 sm:w-24 sm:h-24 transform rotate-12" />
                      </div>

                      {/* Content */}
                      <div className="relative">
                        <div className="flex flex-col items-center gap-4 sm:gap-6">
                          {/* Avatar */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="relative flex-shrink-0"
                          >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
                              <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-primary text-white rounded-full p-1 sm:p-1.5">
                              <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            </div>
                          </motion.div>

                          <div className="text-center sm:text-left">
                            <motion.blockquote
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              className="text-sm sm:text-base lg:text-lg text-gray-700 mb-4"
                            >
                              "{testimonial.content}"
                            </motion.blockquote>

                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.3 }}
                              className="space-y-1"
                            >
                              <div className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</div>
                              <div className="text-xs sm:text-sm text-gray-500">
                                {testimonial.role} • {testimonial.company}
                              </div>
                              <div className="text-xs sm:text-sm font-medium text-primary">
                                {testimonial.highlight}
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Buttons and Indicators */}
          <div className="relative mt-6">
            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mb-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setPage([index, index > currentIndex ? 1 : -1])}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? 'bg-primary w-6'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  disabled={isAnimating}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-8 left-0 right-0 flex justify-between items-center px-2 sm:px-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => paginate(-1)}
                className="p-2 sm:p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg text-gray-800 hover:text-primary transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => paginate(1)}
                className="p-2 sm:p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg text-gray-800 hover:text-primary transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.button>
            </div>
          </div>

          {/* Current/Total Indicator */}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-500">
              {currentIndex + 1} of {testimonials.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}