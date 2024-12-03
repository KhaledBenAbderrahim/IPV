import React, { useState } from 'react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { MessageSquare, ThumbsUp, Share2, Search, Filter, Users, Hash, TrendingUp, Clock, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    lastActivity: '2 hours ago',
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
    lastActivity: '1 day ago',
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

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || discussion.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout role="student">
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-slate-800">Community</h1>
              </div>
              <p className="text-slate-600 mt-2">Connect and learn with fellow students</p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 placeholder-slate-400"
                />
              </div>
              <button className="flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md shadow-blue-500/25 transition-all duration-200">
                Start Discussion
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-200">
                  <h2 className="font-semibold text-slate-800">Categories</h2>
                </div>
                <div className="p-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.name}
                        onClick={() => setSelectedCategory(category.name === 'All Topics' ? 'all' : category.name)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                          (category.name === 'All Topics' && selectedCategory === 'all') ||
                          category.name === selectedCategory
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{category.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-200">
                  <h2 className="font-semibold text-slate-800">Views</h2>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => setView('latest')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      view === 'latest' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Clock className="h-5 w-5" />
                    <span className="font-medium">Latest</span>
                  </button>
                  <button
                    onClick={() => setView('trending')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      view === 'trending' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <TrendingUp className="h-5 w-5" />
                    <span className="font-medium">Trending</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Discussions List */}
            <div className="lg:col-span-3 space-y-4">
              {filteredDiscussions.map((discussion) => (
                <div
                  key={discussion.id}
                  className="group bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200 p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <img
                        src={discussion.author.avatar}
                        alt={discussion.author.name}
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-white"
                      />
                      <div>
                        <Link
                          to={`/student/community/${discussion.id}`}
                          className="inline-flex items-center space-x-2 group-hover:text-blue-600 transition-colors duration-200"
                        >
                          <h3 className="font-semibold text-slate-800 text-lg">
                            {discussion.title}
                          </h3>
                          {discussion.isHot && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                              Hot 🔥
                            </span>
                          )}
                        </Link>
                        <p className="mt-1 text-slate-600 text-sm line-clamp-2">{discussion.content}</p>
                        <div className="flex items-center mt-2 space-x-4">
                          <span className="text-sm text-slate-500">{discussion.author.name}</span>
                          <span className="text-sm text-slate-400">•</span>
                          <span className="text-sm text-slate-500">{discussion.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {discussion.category}
                      </span>
                      <button className="text-slate-400 hover:text-blue-600 transition-colors duration-200">
                        <Bookmark className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex items-center space-x-6">
                      <button className="flex items-center text-slate-500 hover:text-blue-600 transition-colors duration-200">
                        <MessageSquare className="h-5 w-5 mr-1.5" />
                        <span className="text-sm font-medium">{discussion.replies}</span>
                      </button>
                      <button className="flex items-center text-slate-500 hover:text-blue-600 transition-colors duration-200">
                        <ThumbsUp className="h-5 w-5 mr-1.5" />
                        <span className="text-sm font-medium">{discussion.likes}</span>
                      </button>
                      <button className="flex items-center text-slate-500 hover:text-blue-600 transition-colors duration-200">
                        <Share2 className="h-5 w-5 mr-1.5" />
                        <span className="text-sm font-medium">Share</span>
                      </button>
                    </div>
                    <Link
                      to={`/student/community/${discussion.id}`}
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 text-sm font-medium"
                    >
                      View Discussion
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}