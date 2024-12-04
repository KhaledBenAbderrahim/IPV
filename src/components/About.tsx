import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Target, Users, Star } from 'lucide-react';

const AboutCard = ({ icon: Icon, title, description }: { 
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <motion.div
    whileHover={{ y: -5 }}
    whileTap={{ scale: 0.98 }}
    className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white shadow-lg shadow-primary/5 border border-gray-100 transition-all duration-200 hover:shadow-xl"
  >
    <div className="bg-gradient-to-br from-primary to-accent w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 transform transition-transform group-hover:scale-110">
      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
    </div>
    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1.5 sm:mb-2">{title}</h3>
    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
);

export default function About() {
  const cards = [
    {
      icon: GraduationCap,
      title: "Expert-Led Education",
      description: "Learn from industry professionals with years of experience in exam preparation and teaching."
    },
    {
      icon: Target,
      title: "Focused Learning",
      description: "Targeted curriculum designed specifically for exam success with proven methodologies."
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join a thriving community of learners and get support whenever you need it."
    },
    {
      icon: Star,
      title: "Quality Content",
      description: "Access premium study materials and practice tests crafted by experts."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.span
            variants={itemVariants}
            className="inline-block text-sm sm:text-base text-primary font-semibold tracking-wider uppercase mb-2 sm:mb-3"
          >
            Why Choose Us
          </motion.span>
          
          <motion.h2 
            variants={itemVariants}
            className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4"
          >
            About EduMaster Pro
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed mx-auto max-w-2xl"
          >
            We're dedicated to transforming exam preparation through innovative technology
            and expert guidance, helping students achieve their academic goals.
          </motion.p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-0"
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              variants={itemVariants}
              className="group"
            >
              <AboutCard {...card} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile-optimized decorative elements */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl opacity-50 pointer-events-none" />
      </div>
    </section>
  );
}
