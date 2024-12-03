import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, Sparkles, Zap, Building2, Trophy } from 'lucide-react';
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
    icon: Trophy,
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
    icon: Zap,
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
    icon: Building2,
    gradient: 'from-purple-500/20 via-pink-500/20 to-purple-500/20'
  },
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
    <section id="pricing" className="py-24 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-gray-900/[0.02] -z-10" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-8">
            <Sparkles className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Flexible Plans for Everyone</span>
          </span>

          <h2 className="text-4xl font-bold text-dark sm:text-5xl">
            Simple,
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Transparent </span>
            Pricing
          </h2>
          <p className="mt-6 text-xl text-light/90 max-w-2xl mx-auto">
            Choose the perfect plan for your e-commerce learning journey, with no hidden fees
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 flex justify-center items-center space-x-4"
        >
          <span className={`text-base ${!isAnnual ? 'text-dark font-medium' : 'text-light'}`}>
            Monthly
          </span>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none ${
              isAnnual ? 'bg-primary' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
                isAnnual ? 'translate-x-8' : 'translate-x-1'
              }`}
            />
          </motion.button>
          <span className={`text-base ${isAnnual ? 'text-dark font-medium' : 'text-light'}`}>
            Annually
            <span className="ml-1.5 inline-flex items-center text-primary text-sm font-medium">
              Save 20%
              <Sparkles className="h-3.5 w-3.5 ml-0.5" />
            </span>
          </span>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3"
        >
          {pricingTiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.name}
                variants={item}
                className={`relative rounded-2xl bg-white/50 backdrop-blur-sm p-1 transition-all duration-300 ${
                  tier.popular ? 'ring-2 ring-primary/50 hover:ring-primary' : ''
                }`}
              >
                <div className={`relative h-full rounded-xl bg-gradient-to-br ${tier.gradient} p-px overflow-hidden group`}>
                  <div className="relative h-full rounded-xl bg-white/95 p-8">
                    {tier.popular && (
                      <span className="absolute -top-px left-1/2 -translate-x-1/2 px-6 py-1.5 rounded-b-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-medium shadow-lg">
                        Most Popular
                      </span>
                    )}

                    <div className="text-center">
                      <div className="flex justify-center">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${tier.gradient}`}>
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <h3 className="mt-4 text-2xl font-bold text-dark">{tier.name}</h3>
                      <p className="mt-2 text-sm text-light/90">{tier.description}</p>
                      <div className="mt-6 flex items-center justify-center">
                        <span className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          ${isAnnual ? tier.price : Math.round(Number(tier.price) * 1.25)}
                        </span>
                        <span className="ml-2 text-light">/month</span>
                      </div>
                    </div>

                    <ul className="mt-8 space-y-4">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <div className="p-0.5 rounded-full bg-gradient-to-br from-primary to-accent">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                          <span className="ml-3 text-sm text-dark">{feature}</span>
                        </li>
                      ))}
                      {tier.notIncluded.map((feature) => (
                        <li key={feature} className="flex items-start opacity-50">
                          <X className="h-5 w-5 text-light shrink-0" />
                          <span className="ml-3 text-sm text-light">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <Link
                        to={tier.name === 'Enterprise' ? '/contact-sales' : '/register'}
                        className={`block w-full text-center py-4 px-6 rounded-xl font-medium transition-all duration-300 ${
                          tier.popular
                            ? 'bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:-translate-y-0.5'
                            : 'bg-primary/10 text-primary hover:bg-primary/20'
                        }`}
                      >
                        {tier.buttonText}
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}