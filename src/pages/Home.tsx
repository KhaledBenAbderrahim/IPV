import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Users, Award, BarChart2, Brain, Zap, QrCode } from 'lucide-react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';
import QRCode from 'react-qr-code';

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
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative">
        <Hero />
      </div>

      {/* Features Section */}
      <div className="relative">
        <Features />
      </div>

      {/* About Section */}
      <div className="relative">
        <About />
      </div>

      {/* Testimonials Section */}
      <div className="relative">
        <Testimonials />
      </div>

      {/* Pricing Section */}
      <div className="relative">
        <Pricing />
      </div>

      <Footer />

      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => setShowQR(!showQR)}
          className="bg-primary hover:bg-primary/90 text-white rounded-full p-4 shadow-lg transition-all duration-300 flex items-center gap-2"
        >
          <QrCode className="w-6 h-6" />
          <span>Scan QR</span>
        </button>

        {showQR && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowQR(false)}>
            <div className="bg-white p-6 rounded-xl shadow-xl" onClick={e => e.stopPropagation()}>
              <div className="flex flex-col items-center gap-4">
                <h3 className="text-xl font-semibold">Scan to visit our website</h3>
                <div className="p-4 bg-white rounded-lg">
                  <QRCode 
                    value="https://ipv-gules.vercel.app/" 
                    size={200}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    viewBox={`0 0 256 256`}
                  />
                </div>
                <button
                  onClick={() => setShowQR(false)}
                  className="mt-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}