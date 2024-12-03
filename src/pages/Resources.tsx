import React, { useState } from 'react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { 
  FileText, Download, ExternalLink, Search, Filter, Book, FileSpreadsheet,
  Archive, Clock, Grid, List, ChevronDown, BookOpen, Folder
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

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
      <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <CategoryIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Learning Resources</h1>
                  <p className="text-gray-500 mt-1">Access study materials and templates</p>
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="relative flex-grow max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                />
              </div>
              
              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white"
                >
                  <option value="newest">Newest First</option>
                  <option value="popular">Most Popular</option>
                </select>
                
                <div className="flex items-center bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
                  >
                    <Grid className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex overflow-x-auto gap-3 mb-8 pb-2 scrollbar-hide">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
                    selectedCategory === category.name
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{category.label}</span>
                </button>
              );
            })}
          </div>

          {/* Resources Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <div
                  key={resource.id}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-video relative overflow-hidden bg-gray-100">
                    <img
                      src={resource.thumbnail}
                      alt={resource.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 text-gray-900">
                        {resource.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{resource.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{resource.lastUpdated}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>{resource.downloads}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <span className="text-sm font-medium text-gray-500">{resource.type} • {resource.size}</span>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-500 hover:text-primary rounded-lg hover:bg-gray-50 transition-colors">
                          <Download className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-primary rounded-lg hover:bg-gray-50 transition-colors">
                          <ExternalLink className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Category</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Type</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Size</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Downloads</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Last Updated</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResources.map((resource) => (
                      <tr
                        key={resource.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-primary mr-3" />
                            <div>
                              <div className="text-gray-900 font-medium">{resource.title}</div>
                              <div className="text-sm text-gray-500">{resource.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {resource.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500">{resource.type}</td>
                        <td className="px-6 py-4 text-gray-500">{resource.size}</td>
                        <td className="px-6 py-4 text-gray-500">{resource.downloads}</td>
                        <td className="px-6 py-4 text-gray-500">{resource.lastUpdated}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end space-x-3">
                            <button className="p-2 text-gray-500 hover:text-primary transition-colors">
                              <Download className="h-5 w-5" />
                            </button>
                            <button className="p-2 text-gray-500 hover:text-primary transition-colors">
                              <ExternalLink className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}