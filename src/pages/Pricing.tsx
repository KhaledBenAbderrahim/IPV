import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import Navbar from '../components/Navbar';

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
  },
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-dark sm:text-5xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-5 text-xl text-light max-w-2xl mx-auto">
            Choose the perfect plan for your e-commerce learning journey. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="mt-12 flex justify-center items-center space-x-4">
          <span className={`text-sm ${!isAnnual ? 'text-dark font-medium' : 'text-light'}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors focus:outline-none"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isAnnual ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm ${isAnnual ? 'text-dark font-medium' : 'text-light'}`}>
            Annually <span className="text-primary">(Save 20%)</span>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-airbnb bg-white p-8 shadow-airbnb hover:shadow-airbnb-hover transition-all ${
                tier.popular ? 'ring-2 ring-primary' : ''
              }`}
            >
              {tier.popular && (
                <span className="absolute top-0 -translate-y-1/2 bg-primary text-white px-4 py-1 text-sm font-medium rounded-full">
                  Most Popular
                </span>
              )}

              <div className="text-center">
                <h3 className="text-xl font-semibold text-dark">{tier.name}</h3>
                <p className="mt-2 text-sm text-light">{tier.description}</p>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-dark">${isAnnual ? tier.price : Math.round(Number(tier.price) * 1.25)}</span>
                  <span className="text-light">/month</span>
                </div>
              </div>

              <ul className="mt-8 space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-primary shrink-0" />
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
                  className={`block w-full text-center py-3 px-6 rounded-lg font-medium transition-all ${
                    tier.popular
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'bg-primary/10 text-primary hover:bg-primary/20'
                  }`}
                >
                  {tier.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-dark text-center">Frequently Asked Questions</h2>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
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
              <div key={faq.question} className="bg-white rounded-lg p-6 shadow-airbnb">
                <h3 className="text-lg font-semibold text-dark">{faq.question}</h3>
                <p className="mt-2 text-light">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <h2 className="text-2xl font-bold text-dark">Still have questions?</h2>
          <p className="mt-4 text-light">
            Contact our team for more information about our enterprise solutions and custom pricing.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link
              to="/contact-sales"
              className="btn-primary"
            >
              Contact Sales
            </Link>
            <Link
              to="/schedule-demo"
              className="btn-outline"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}