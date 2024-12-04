import React, { useState } from 'react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { MessageSquare, ThumbsUp, Share2, Search, Filter, Users, Hash, TrendingUp, Clock, Bookmark, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const discussions = [
  {
    id: 1,
    title: 'Tips for passing the IHK exam?',
    content: "Hey everyone! I'm preparing for the IHK exam and would love to hear your tips and strategies...",
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    category: 'Exam Prep',
    replies: 15,
    likes: 24,
    lastActivity: '2h',
    isHot: true,
  },
  {
    id: 2,
    title: 'Best resources for learning JavaScript?',
    content: 'Looking for recommendations on the best resources to learn JavaScript from scratch...',
    author: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    category: 'Programming',
    replies: 32,
    likes: 45,
    lastActivity: '1d',
    isHot: true,
  },
];

const categories = [
  { name: 'All Topics', icon: Hash },
  { name: 'Exam Prep', icon: TrendingUp },
  { name: 'Programming', icon: MessageSquare },
  { name: 'Study Groups', icon: Users },
];

export default function Community() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [view, setView] = useState<'latest' | 'trending'>('latest');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || discussion.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout role="student">
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Mobile Header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-slate-200 px-3 py-2 sm:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <h1 className="text-lg font-semibold text-slate-800">Community</h1>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-slate-500 hover:text-blue-600"
            >
              <Menu className="h-5 w-5" />
            </motion.button>
          </div>
        </div>

        <div className="p-3 sm:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Desktop Header */}
            <div className="hidden sm:flex sm:items-center justify-between gap-6 mb-8">
              <div>
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-blue-600" />
                  <h1 className="text-2xl font-bold text-slate-800">Community</h1>
                </div>
                <p className="text-slate-600 mt-2">Connect and learn with fellow students</p>
              </div>
            </div>

            {/* Search and Filter Section */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white shadow-sm"
                />
              </div>
              
              {/* Categories - Horizontal Scrollable on Mobile */}
              <div className="flex overflow-x-auto pb-2 -mx-3 px-3 sm:mx-0 sm:px-0 hide-scrollbar">
                <div className="flex space-x-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <motion.button
                        key={category.name}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedCategory(category.name.toLowerCase())}
                        className={`flex-shrink-0 inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium ${
                          selectedCategory === category.name.toLowerCase()
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-slate-600 hover:bg-slate-50'
                        } border border-slate-200 shadow-sm`}
                      >
                        <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5" />
                        {category.name}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* View Toggle and Create Button */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center bg-white rounded-lg border border-slate-200 p-1 shadow-sm">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setView('latest')}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs sm:text-sm ${
                      view === 'latest'
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>Latest</span>
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setView('trending')}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs sm:text-sm ${
                      view === 'trending'
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>Trending</span>
                  </motion.button>
                </div>
                
                <Link
                  to="/create-discussion"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-blue-700 shadow-sm transition-colors"
                >
                  <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5" />
                  New Discussion
                </Link>
              </div>
            </div>

            {/* Discussions List */}
            <div className="space-y-3">
              {filteredDiscussions.map((discussion) => (
                <Link
                  key={discussion.id}
                  to={`/community/discussion/${discussion.id}`}
                  className="block"
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:border-blue-200 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <img
                        src={discussion.author.avatar}
                        alt={discussion.author.name}
                        className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover ring-2 ring-white"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm sm:text-base text-slate-900 mb-1">
                          {discussion.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">
                          {discussion.content}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-slate-500">
                          <span className="font-medium">{discussion.author.name}</span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs bg-blue-50 text-blue-600">
                            {discussion.category}
                          </span>
                          <div className="flex items-center space-x-3">
                            <span className="flex items-center">
                              <MessageSquare className="h-3.5 w-3.5 mr-1" />
                              {discussion.replies}
                            </span>
                            <span className="flex items-center">
                              <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                              {discussion.likes}
                            </span>
                            <span>{discussion.lastActivity}</span>
                          </div>
                        </div>
                      </div>
                      {discussion.isHot && (
                        <span className="flex-shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-50 text-red-600">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Hot
                        </span>
                      )}
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                className="fixed top-0 right-0 bottom-0 w-64 bg-white shadow-lg z-50"
              >
                <div className="flex items-center justify-between p-4 border-b border-slate-200">
                  <h2 className="font-semibold text-slate-900">Menu</h2>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 text-slate-500 hover:text-slate-700"
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>
                <div className="p-4">
                  <nav className="space-y-1">
                    {categories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <button
                          key={category.name}
                          onClick={() => {
                            setSelectedCategory(category.name.toLowerCase());
                            setIsSidebarOpen(false);
                          }}
                          className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
                            selectedCategory === category.name.toLowerCase()
                              ? 'bg-blue-50 text-blue-600'
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{category.name}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}