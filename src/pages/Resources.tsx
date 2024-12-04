import React, { useState } from 'react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { 
  FileText, Download, ExternalLink, Search, Filter, Book, FileSpreadsheet,
  Archive, Clock, Grid, List, ChevronDown, BookOpen, Folder
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const resources = [
  {
    id: 1,
    title: 'E-Commerce Best Practices Guide',
    description: 'Comprehensive guide covering modern e-commerce strategies and implementations.',
    type: 'PDF',
    size: '2.4 MB',
    category: 'Guides',
    lastUpdated: '2024-03-10',
    downloads: 234,
    thumbnail: 'https://images.unsplash.com/photo-1526280760714-f9e8b26f318f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 2,
    title: 'Digital Marketing Strategy Template',
    description: 'Ready-to-use template for planning and executing digital marketing campaigns.',
    type: 'XLSX',
    size: '1.8 MB',
    category: 'Templates',
    lastUpdated: '2024-03-08',
    downloads: 156,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 3,
    title: 'Customer Service Training Materials',
    description: 'Complete training package including presentations, worksheets, and assessments.',
    type: 'ZIP',
    size: '5.2 MB',
    category: 'Training',
    lastUpdated: '2024-03-05',
    downloads: 89,
    thumbnail: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
];

const categories = [
  { name: 'all', icon: Folder, label: 'All Resources' },
  { name: 'Guides', icon: Book, label: 'Guides' },
  { name: 'Templates', icon: FileSpreadsheet, label: 'Templates' },
  { name: 'Training', icon: BookOpen, label: 'Training' },
];

export default function Resources() {
  const location = useLocation();
  const isHR = location.pathname.includes('hr');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    }
    return b.downloads - a.downloads;
  });

  const CategoryIcon = categories.find(cat => cat.name === selectedCategory)?.icon || Folder;

  return (
    <DashboardLayout role={isHR ? 'hr' : 'student'}>
      <div className="min-h-screen bg-slate-50">
        {/* Mobile Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-200 px-4 py-3 sm:hidden"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <CategoryIcon className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-base font-semibold text-gray-900">Resources</h1>
            </div>
            <div className="flex items-center space-x-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="p-2 text-gray-500 hover:text-primary rounded-lg hover:bg-gray-50 active:bg-gray-100"
              >
                <Filter className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 text-gray-500 hover:text-primary rounded-lg hover:bg-gray-50 active:bg-gray-100"
              >
                {viewMode === 'grid' ? <List className="h-5 w-5" /> : <Grid className="h-5 w-5" />}
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="p-3 sm:p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Desktop Header - Hidden on Mobile */}
            <div className="hidden sm:block bg-white rounded-xl p-6 mb-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <CategoryIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Learning Resources</h1>
                    <p className="text-sm text-gray-500 mt-1">Access study materials and templates</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filters - Mobile Optimized */}
            <div className="bg-white rounded-lg shadow-sm mb-3 sm:mb-4 overflow-hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border-b border-gray-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm"
                />
              </div>
              
              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-gray-100"
                  >
                    <div className="p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Sort by</span>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="text-sm px-2 py-1 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white"
                        >
                          <option value="newest">Newest First</option>
                          <option value="popular">Most Popular</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Categories - Mobile Optimized */}
            <div className="flex overflow-x-auto gap-2 mb-3 sm:mb-4 pb-1 scrollbar-hide -mx-3 px-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <motion.button
                    key={category.name}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all text-sm ${
                      selectedCategory === category.name
                        ? 'bg-primary text-white shadow-md shadow-primary/30'
                        : 'bg-white text-gray-600 hover:bg-gray-50 active:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{category.label}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Resources Grid/List - Mobile Optimized */}
            <div className={`grid gap-3 sm:gap-4 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredResources.map((resource) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  <div className={`relative ${
                    viewMode === 'list' 
                      ? 'w-24 sm:w-32' 
                      : 'aspect-video'
                  }`}>
                    <img
                      src={resource.thumbnail}
                      alt={resource.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-2 left-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white/90 text-gray-900">
                        {resource.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-3 flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{resource.title}</h3>
                    <p className="text-xs text-gray-500 mb-2 line-clamp-2">{resource.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{resource.lastUpdated}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Download className="h-3.5 w-3.5" />
                        <span>{resource.downloads}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                      <span className="text-xs font-medium text-gray-500">{resource.type} • {resource.size}</span>
                      <div className="flex items-center space-x-1">
                        <motion.button 
                          whileTap={{ scale: 0.95 }}
                          className="p-1.5 text-gray-500 hover:text-primary rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-all"
                        >
                          <Download className="h-4 w-4" />
                        </motion.button>
                        <motion.button 
                          whileTap={{ scale: 0.95 }}
                          className="p-1.5 text-gray-500 hover:text-primary rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-all"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}