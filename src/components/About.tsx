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
    className="p-6 rounded-2xl bg-white shadow-xl shadow-primary/5 border border-gray-100"
  >
    <div className="bg-gradient-to-br from-primary to-accent w-12 h-12 rounded-xl flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-white" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
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

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            About EduMaster Pro
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            We're dedicated to transforming exam preparation through innovative technology
            and expert guidance, helping students achieve their academic goals.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <AboutCard {...card} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
