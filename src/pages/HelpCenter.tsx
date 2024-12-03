import React, { useState } from 'react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { Search, Book, MessageCircle, FileText, ChevronDown, ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How do I reset my password?',
    answer: 'Go to the login page and click on "Forgot Password". Follow the instructions sent to your email to reset your password.',
    category: 'Account',
  },
  {
    question: 'How do I track my progress?',
    answer: 'You can view your progress in the Learning Path section or check individual course progress on your dashboard.',
    category: 'Learning',
  },
  {
    question: 'How do I download my certificates?',
    answer: 'Visit the Achievements page and click on the download button next to each certificate.',
    category: 'Certificates',
  },
];

const categories = [
  { name: 'Getting Started', icon: Book },
  { name: 'Account', icon: FileText },
  { name: 'Learning', icon: MessageCircle },
  { name: 'Certificates', icon: FileText },
];

export default function HelpCenter() {
  const location = useLocation();
  const isHR = location.pathname.includes('hr');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout role={isHR ? 'hr' : 'student'}>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-dark">How can we help you?</h1>
            <p className="mt-2 text-light">Search our help center or browse categories below</p>
            
            {/* Search Bar */}
            <div className="mt-6 max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-light" />
                <input
                  type="text"
                  placeholder="Search for help..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
                  className={`p-6 rounded-lg text-left transition-all ${
                    selectedCategory === category.name
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white hover:shadow-airbnb'
                  }`}
                >
                  <Icon className={`h-6 w-6 ${
                    selectedCategory === category.name ? 'text-white' : 'text-primary'
                  }`} />
                  <h3 className="mt-4 font-medium">{category.name}</h3>
                </button>
              );
            })}
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-dark mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <div
                    key={faq.question}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedQuestion(
                        expandedQuestion === faq.question ? null : faq.question
                      )}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-dark">{faq.question}</span>
                      {expandedQuestion === faq.question ? (
                        <ChevronDown className="h-5 w-5 text-light" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-light" />
                      )}
                    </button>
                    {expandedQuestion === faq.question && (
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <p className="text-light">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-12 text-center">
            <p className="text-light">
              Can't find what you're looking for?{' '}
              <button className="text-primary hover:text-primary/80 font-medium">
                Contact Support
              </button>
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}