import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const pricingTiers = [
  {
    name: 'Basic',
    price: '29',
    description: 'Perfect for individual learners',
    features: [
      'Access to basic e-commerce courses',
      'Basic quizzes and assessments',
      'Email support',
      'Course completion certificates',
      'Mobile app access',
    ],
    notIncluded: [
      'Advanced course materials',
      'Live mentoring sessions',
      'Industry certification',
      'Custom learning paths',
    ],
    buttonText: 'Start Free Trial',
    popular: false,
    gradient: 'from-blue-500/20 via-cyan-500/20 to-blue-500/20'
  },
  {
    name: 'Professional',
    price: '99',
    description: 'Ideal for serious e-commerce entrepreneurs',
    features: [
      'Everything in Basic, plus:',
      'Advanced e-commerce courses',
      'Priority email & chat support',
      'Live mentoring sessions',
      'Industry certification',
      'Custom learning paths',
      'Progress analytics',
      'Group learning sessions',
    ],
    notIncluded: [
      'Enterprise-level support',
      'Custom course creation',
    ],
    buttonText: 'Get Started',
    popular: true,
    gradient: 'from-primary/20 via-accent/20 to-primary/20'
  },
  {
    name: 'Enterprise',
    price: '299',
    description: 'For organizations and large teams',
    features: [
      'Everything in Professional, plus:',
      'Custom course creation',
      'Dedicated account manager',
      'API access',
      'SSO integration',
      'Advanced analytics & reporting',
      'Custom branding',
      'Unlimited users',
      'SLA support',
    ],
    notIncluded: [],
    buttonText: 'Contact Sales',
    popular: false,
    gradient: 'from-purple-500/20 via-pink-500/20 to-purple-500/20'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16 sm:pb-24">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl -z-10" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative text-center"
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 text-sm">
            <Sparkles className="h-4 w-4 mr-2" />
            Flexible Plans for Everyone
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark">
            Simple, <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Transparent</span> Pricing
          </h1>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg lg:text-xl text-light max-w-2xl mx-auto">
            Choose the perfect plan for your e-commerce learning journey. All plans include a 14-day free trial.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 sm:mt-12 flex justify-center items-center space-x-4"
        >
          <span className={`text-sm sm:text-base ${!isAnnual ? 'text-dark font-medium' : 'text-light'}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative inline-flex h-6 sm:h-7 w-11 sm:w-14 items-center rounded-full transition-colors focus:outline-none"
            style={{ backgroundColor: isAnnual ? 'var(--color-primary)' : '#D1D5DB' }}
          >
            <motion.span
              initial={false}
              animate={{
                translateX: isAnnual ? '24px' : '2px'
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="inline-block h-5 sm:h-6 w-5 sm:w-6 rounded-full bg-white shadow-lg"
            />
          </button>
          <span className={`text-sm sm:text-base ${isAnnual ? 'text-dark font-medium' : 'text-light'}`}>
            Annually <span className="text-primary">(-20%)</span>
          </span>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-8 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {pricingTiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={item}
              className={`relative rounded-2xl bg-white/50 backdrop-blur-sm p-1 transition-all duration-300 ${
                tier.popular ? 'ring-2 ring-primary/50 hover:ring-primary' : ''
              }`}
            >
              <div className={`relative h-full rounded-xl bg-gradient-to-br ${tier.gradient} p-px overflow-hidden group`}>
                <div className="relative h-full rounded-xl bg-white/95 p-6 sm:p-8">
                  {tier.popular && (
                    <span className="absolute -top-px left-1/2 -translate-x-1/2 px-4 sm:px-6 py-1 sm:py-1.5 rounded-b-xl bg-gradient-to-r from-primary to-accent text-white text-xs sm:text-sm font-medium shadow-lg">
                      Most Popular
                    </span>
                  )}

                  <div className="text-center">
                    <h3 className="text-lg sm:text-xl font-bold text-dark">{tier.name}</h3>
                    <p className="mt-2 text-sm text-light/90">{tier.description}</p>
                    <div className="mt-4 sm:mt-6">
                      <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        ${isAnnual ? tier.price : Math.round(Number(tier.price) * 1.25)}
                      </span>
                      <span className="text-sm sm:text-base text-light">/month</span>
                    </div>
                  </div>

                  <ul className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start text-sm sm:text-base">
                        <Check className="h-5 w-5 text-primary shrink-0" />
                        <span className="ml-3 text-dark">{feature}</span>
                      </li>
                    ))}
                    {tier.notIncluded.map((feature) => (
                      <li key={feature} className="flex items-start opacity-50 text-sm sm:text-base">
                        <X className="h-5 w-5 text-light shrink-0" />
                        <span className="ml-3 text-light">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 sm:mt-8">
                    <Link
                      to={tier.name === 'Enterprise' ? '/contact-sales' : '/register'}
                      className={`block w-full text-center py-3 px-6 rounded-lg text-sm sm:text-base font-medium transition-all ${
                        tier.popular
                          ? 'bg-primary text-white hover:bg-primary/90'
                          : 'bg-primary/10 text-primary hover:bg-primary/20'
                      }`}
                    >
                      {tier.buttonText}
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 sm:mt-24"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-dark text-center mb-8 sm:mb-12">Frequently Asked Questions</h2>
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
            {[
              {
                question: 'Can I switch plans later?',
                answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, PayPal, and bank transfers for enterprise customers.'
              },
              {
                question: 'Is there a free trial?',
                answer: 'Yes, all plans come with a 14-day free trial. No credit card required.'
              },
              {
                question: 'Can I cancel anytime?',
                answer: 'Yes, you can cancel your subscription at any time. No questions asked.'
              }
            ].map((faq) => (
              <motion.div
                key={faq.question}
                variants={item}
                className="bg-white/50 backdrop-blur-sm rounded-xl p-6 sm:p-8"
              >
                <h3 className="text-base sm:text-lg font-semibold text-dark mb-2 sm:mb-3">{faq.question}</h3>
                <p className="text-sm sm:text-base text-light">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}