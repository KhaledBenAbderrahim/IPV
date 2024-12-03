import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Users, Award, BarChart2, Brain, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

const features = [
  {
    title: 'Interactive Learning',
    description: 'Engage with dynamic content and interactive lessons',
    icon: Brain,
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Smart Analytics',
    description: 'Track progress with detailed insights and reports',
    icon: BarChart2,
    color: 'from-purple-500 to-purple-600',
  },
  {
    title: 'Expert Mentorship',
    description: 'Learn from industry professionals and experts',
    icon: Users,
    color: 'from-green-500 to-green-600',
  },
  {
    title: 'Certifications',
    description: 'Earn recognized certificates upon completion',
    icon: Award,
    color: 'from-yellow-500 to-yellow-600',
  },
];

const stats = [
  { value: '15K+', label: 'Active Students' },
  { value: '500+', label: 'Expert Mentors' },
  { value: '1000+', label: 'Course Hours' },
  { value: '95%', label: 'Success Rate' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <Features />

      {/* About Section */}
      <About />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Pricing Section */}
      <Pricing />

      <Footer />
    </div>
  );
}