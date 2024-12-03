import React from 'react';
import { Book, Code, Server, Shield, Zap, Search } from 'lucide-react';

const sections = [
  {
    title: 'Getting Started',
    icon: Book,
    items: ['Installation', 'Quick Start', 'Configuration', 'Authentication']
  },
  {
    title: 'Frontend Guide',
    icon: Code,
    items: ['Components', 'Hooks', 'State Management', 'Routing']
  },
  {
    title: 'Backend API',
    icon: Server,
    items: ['REST API', 'WebSockets', 'Database', 'Caching']
  },
  {
    title: 'Security',
    icon: Shield,
    items: ['Authentication', 'Authorization', 'Data Protection', 'Best Practices']
  }
];

export default function Documentation() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary to-accent py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Documentation
            </h1>
            <p className="mt-6 text-xl text-white/80">
              Everything you need to integrate and customize EduMaster Pro
            </p>
          </div>
          
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-light" />
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                className="bg-white rounded-lg p-8 shadow-airbnb hover:shadow-airbnb-hover transition-all"
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="ml-4 text-xl font-semibold text-dark">
                    {section.title}
                  </h2>
                </div>
                
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-center text-light hover:text-dark transition-colors">
                      <Zap className="h-4 w-4 text-primary mr-2" />
                      <button className="text-left">{item}</button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}