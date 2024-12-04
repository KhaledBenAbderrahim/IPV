import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Github, Twitter, Linkedin, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const quickLinks = [
  { name: 'About', href: '/about' },
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Documentation', href: '/docs' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact Sales', href: '/contact-sales' },
  { name: 'Schedule Demo', href: '/schedule-demo' },
  { name: 'Success Stories', href: '/success-stories' },
  { name: 'Help Center', href: '/help' },
  { name: 'Careers', href: '/careers' }
];

const resources = [
  { name: 'Documentation', href: '/docs' },
  { name: 'API Reference', href: '/docs/api' },
  { name: 'Status', href: '/status' },
  { name: 'Release Notes', href: '/releases' }
];

const company = [
  { name: 'About Us', href: '/about' },
  { name: 'Careers', href: '/careers' },
  { name: 'Blog', href: '/blog' },
  { name: 'Press', href: '/press' }
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

export default function Footer() {
  return (
    <footer className="bg-white relative overflow-hidden">
      {/* Background decorations - optimized for mobile */}
      <div className="absolute inset-0 bg-grid-gray-900/[0.02]" />
      <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 sm:w-80 h-40 sm:h-80 bg-primary/5 rounded-full blur-2xl sm:blur-3xl" />
      <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 sm:w-80 h-40 sm:h-80 bg-accent/5 rounded-full blur-2xl sm:blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12"
        >
          {/* Company Info */}
          <motion.div variants={item} className="text-center sm:text-left">
            <Link to="/" className="group inline-flex items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-lg opacity-30 group-hover:opacity-40 transition-opacity" />
                <GraduationCap className="relative h-8 w-8 sm:h-10 sm:w-10 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <span className="ml-2 sm:ml-3 text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                EduMaster Pro
              </span>
            </Link>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-light/90 leading-relaxed">
              Transforming education through innovative technology and personalized learning experiences.
            </p>
            <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
              <motion.a
                whileHover={{ x: 5 }}
                href="mailto:contact@edumaster.pro"
                className="flex items-center justify-center sm:justify-start text-sm sm:text-base text-light hover:text-primary transition-colors group"
              >
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 group-hover:scale-110 transition-transform" />
                contact@edumaster.pro
              </motion.a>
              <motion.a
                whileHover={{ x: 5 }}
                href="tel:+1-555-000-0000"
                className="flex items-center justify-center sm:justify-start text-sm sm:text-base text-light hover:text-primary transition-colors group"
              >
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 group-hover:scale-110 transition-transform" />
                +1 (555) 000-0000
              </motion.a>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center justify-center sm:justify-start text-sm sm:text-base text-light group"
              >
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 group-hover:scale-110 transition-transform" />
                123 Education Street
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={item} className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold text-dark mb-4 sm:mb-6">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.slice(0, 6).map((link) => (
                <motion.li key={link.name} whileHover={{ x: 5 }}>
                  <Link
                    to={link.href}
                    className="group inline-flex items-center text-sm sm:text-base text-light hover:text-primary transition-colors"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1 opacity-0 group-hover:opacity-100 transition-all" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={item} className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold text-dark mb-4 sm:mb-6">Resources</h3>
            <ul className="space-y-2 sm:space-y-3">
              {resources.map((link) => (
                <motion.li key={link.name} whileHover={{ x: 5 }}>
                  <Link
                    to={link.href}
                    className="group inline-flex items-center text-sm sm:text-base text-light hover:text-primary transition-colors"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1 opacity-0 group-hover:opacity-100 transition-all" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={item} className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold text-dark mb-4 sm:mb-6">Company</h3>
            <ul className="space-y-2 sm:space-y-3">
              {company.map((link) => (
                <motion.li key={link.name} whileHover={{ x: 5 }}>
                  <Link
                    to={link.href}
                    className="group inline-flex items-center text-sm sm:text-base text-light hover:text-primary transition-colors"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1 opacity-0 group-hover:opacity-100 transition-all" />
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-6 sm:mt-8 flex justify-center sm:justify-start space-x-4 sm:space-x-5">
              <motion.a
                whileHover={{ y: -5 }}
                href="#"
                className="p-1.5 sm:p-2 rounded-lg bg-primary/5 text-primary hover:bg-primary/10 transition-colors active:scale-95"
              >
                <Github className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.a>
              <motion.a
                whileHover={{ y: -5 }}
                href="#"
                className="p-1.5 sm:p-2 rounded-lg bg-primary/5 text-primary hover:bg-primary/10 transition-colors active:scale-95"
              >
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.a>
              <motion.a
                whileHover={{ y: -5 }}
                href="#"
                className="p-1.5 sm:p-2 rounded-lg bg-primary/5 text-primary hover:bg-primary/10 transition-colors active:scale-95"
              >
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-8 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-200/50"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm sm:text-base text-light/80">
              {new Date().getFullYear()} EduMaster Pro. All rights reserved.
            </p>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-8">
              <Link to="/privacy" className="text-sm sm:text-base text-light hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm sm:text-base text-light hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-sm sm:text-base text-light hover:text-primary transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}