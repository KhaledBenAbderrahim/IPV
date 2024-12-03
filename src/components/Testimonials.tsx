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
    <section id="testimonials" className="relative py-24 mb-24 overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/5 opacity-70 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary mb-8"
          >
            <Star className="h-4 w-4 mr-2 fill-primary" />
            <span className="text-sm font-medium">Trusted by Thousands</span>
          </motion.div>
          
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
            What Our Users
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Say About Us</span>
          </h2>
        </motion.div>

        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-4xl mx-auto" style={{ height: '600px' }}>
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
                  className="absolute inset-0 flex items-center justify-center"
                  onAnimationStart={() => setIsAnimating(true)}
                  onAnimationComplete={() => setIsAnimating(false)}
                >
                  <div className="w-full">
                    <div className="relative bg-white rounded-2xl shadow-lg p-8 sm:p-12 overflow-hidden">
                      {/* Background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br opacity-5"
                           style={{ background: `linear-gradient(to bottom right, var(--${testimonial.bgColor}))` }} />
                      
                      {/* Quote decoration */}
                      <div className="absolute -right-6 -top-6 text-gray-100">
                        <Quote className="w-24 h-24 transform rotate-12" />
                      </div>

                      {/* Content */}
                      <div className="relative">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                          {/* Avatar */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="relative flex-shrink-0"
                          >
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
                              <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-primary text-white p-1.5 rounded-full shadow-lg">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                          </motion.div>

                          {/* Text Content */}
                          <div className="flex-1 text-center sm:text-left">
                            <div className="flex items-center justify-center sm:justify-start mb-2">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                              ))}
                            </div>
                            <blockquote className="text-xl sm:text-2xl font-medium text-gray-900 leading-relaxed mb-6">
                              "{testimonial.content}"
                            </blockquote>
                            <div className="space-y-2">
                              <div className="font-semibold text-gray-900">{testimonial.name}</div>
                              <div className="text-gray-600">{testimonial.role} at {testimonial.company}</div>
                              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                                {testimonial.highlight}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
              <button
                onClick={() => paginate(-1)}
                className="pointer-events-auto transform -translate-x-4 sm:-translate-x-8 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg text-gray-800 hover:text-primary hover:scale-110 transition-all duration-200"
                disabled={isAnimating}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => paginate(1)}
                className="pointer-events-auto transform translate-x-4 sm:translate-x-8 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg text-gray-800 hover:text-primary hover:scale-110 transition-all duration-200"
                disabled={isAnimating}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 pb-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setPage([index, index > currentIndex ? 1 : -1])}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-primary w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                disabled={isAnimating}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}