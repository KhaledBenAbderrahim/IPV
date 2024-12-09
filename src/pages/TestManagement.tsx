import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Save, X, AlertCircle, BookOpen, Search, Filter, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../components/layouts/DashboardLayout';
import QuestionForm from '../components/test/QuestionForm';
import QuestionList from '../components/test/QuestionList';
import DeleteConfirmation from '../components/test/DeleteConfirmation';
import BookManagement from '../components/test/BookManagement';

export type QuestionType = 'multiple' | 'boolean' | 'text';

export interface Question {
  id: string;
  content: string;
  category: string;
  type: string;
  difficulty: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  points?: number;
  timeLimit?: number;
  tags?: string[];
}

const initialQuestions: Question[] = [
  {
    id: '1',
    type: 'multiple',
    content: 'Which inventory management method is best for perishable goods?',
    options: ['FIFO', 'LIFO', 'Average Cost', 'Specific Identification'],
    correctAnswer: 'FIFO',
    points: 10,
    category: 'Inventory Management',
    difficulty: 'medium',
  },
  {
    id: '2',
    type: 'boolean',
    content: 'Safety stock helps protect against stockouts during lead time.',
    correctAnswer: 'true',
    points: 5,
    category: 'Inventory Management',
    difficulty: 'easy',
  },
  {
    id: '3',
    type: 'text',
    content: 'What does FIFO stand for in inventory management?',
    correctAnswer: 'First In First Out',
    points: 8,
    category: 'Inventory Management',
    difficulty: 'easy',
  },
];

const difficultyColors = {
  easy: 'bg-green-500',
  medium: 'bg-yellow-500',
  hard: 'bg-red-500',
};

export default function TestManagement() {
  const [activeTab, setActiveTab] = useState<'questions' | 'books'>('questions');
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [deleteQuestion, setDeleteQuestion] = useState<Question | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [options, setOptions] = useState<string[]>([]);

  const categories = Array.from(new Set(questions.map(q => q.category)));
  
  // Calculate stats
  const stats = {
    total: questions.length,
    byDifficulty: {
      easy: questions.filter(q => q.difficulty === 'easy').length,
      medium: questions.filter(q => q.difficulty === 'medium').length,
      hard: questions.filter(q => q.difficulty === 'hard').length,
    },
    byType: {
      multiple: questions.filter(q => q.type === 'multiple').length,
      boolean: questions.filter(q => q.type === 'boolean').length,
      text: questions.filter(q => q.type === 'text').length,
    },
  };

  const handleSave = (question: Question) => {
    if (editingQuestion) {
      setQuestions(questions.map(q => 
        q.id === editingQuestion.id ? question : q
      ));
    } else {
      setQuestions([...questions, { ...question, id: Date.now().toString() }]);
    }
    setIsFormOpen(false);
    setEditingQuestion(null);
  };

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
    setIsFormOpen(true);
  };

  const handleDelete = (question: Question) => {
    setDeleteQuestion(question);
  };

  const confirmDelete = () => {
    if (deleteQuestion) {
      setQuestions(questions.filter(q => q.id !== deleteQuestion.id));
      setDeleteQuestion(null);
    }
  };

  const filteredQuestions = questions.filter(question => {
    const categoryMatch = selectedCategory === 'all' || question.category === selectedCategory;
    const typeMatch = selectedType === 'all' || question.type === selectedType;
    const searchMatch = !searchQuery || 
      question.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.category.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && typeMatch && searchMatch;
  });

  return (
    <DashboardLayout role="hr">
      <div className="p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8"
          >
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Test Management</h1>
              <p className="text-sm text-gray-500 mt-1">Manage test questions and learning materials</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setEditingQuestion(null);
                setIsFormOpen(true);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 sm:py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base"
            >
              <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Add Question
            </motion.button>
          </motion.div>

          <div className="flex border-b border-gray-200 mb-6 sm:mb-8 overflow-x-auto scrollbar-hide">
            {['questions', 'books'].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab as 'questions' | 'books')}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.button>
            ))}
          </div>

          {activeTab === 'questions' ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-500">Total Questions</h3>
                    <BarChart2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <p className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">{stats.total}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6"
                >
                  <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-3 sm:mb-4">By Difficulty</h3>
                  <div className="space-y-2">
                    {Object.entries(stats.byDifficulty).map(([difficulty, count]) => (
                      <div key={difficulty} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full ${difficultyColors[difficulty]} mr-2`} />
                          <span className="text-xs sm:text-sm text-gray-600 capitalize">{difficulty}</span>
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-gray-900">{count}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6"
                >
                  <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-3 sm:mb-4">By Type</h3>
                  <div className="space-y-2">
                    {Object.entries(stats.byType).map(([type, count]) => (
                      <div key={type} className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-gray-600 capitalize">{type}</span>
                        <span className="text-xs sm:text-sm font-medium text-gray-900">{count}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Desktop Table View - Hidden on Mobile */}
                <div className="hidden md:block">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Question
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Difficulty
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredQuestions.map((question) => (
                        <tr key={question.id}>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 max-w-xs truncate">{question.content}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {question.category}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-500 capitalize">{question.type}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                              question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {question.difficulty}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                            <button
                              onClick={() => handleEdit(question)}
                              className="text-primary hover:text-primary-dark"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(question)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View - Shown only on Mobile */}
                <div className="md:hidden">
                  <div className="divide-y divide-gray-200">
                    {filteredQuestions.map((question) => (
                      <div key={question.id} className="p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="text-sm text-gray-900 flex-1 pr-4">{question.content}</div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(question)}
                              className="text-primary hover:text-primary-dark p-1"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(question)}
                              className="text-red-600 hover:text-red-900 p-1"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-blue-100 text-blue-800">
                            {question.category}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-gray-100 text-gray-800 capitalize">
                            {question.type}
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-medium ${
                            question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                            question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {question.difficulty}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                    <input
                      type="text"
                      placeholder="Search questions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 sm:py-2 text-sm rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 sm:py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    <Filter className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Filters
                  </motion.button>
                </div>

                <AnimatePresence>
                  {isFilterOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 overflow-hidden"
                    >
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                          Category
                        </label>
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-2 text-sm rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                        >
                          <option value="all">All Categories</option>
                          {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                          Question Type
                        </label>
                        <select
                          value={selectedType}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-2 text-sm rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                        >
                          <option value="all">All Types</option>
                          <option value="multiple">Multiple Choice</option>
                          <option value="boolean">Yes/No</option>
                          <option value="text">Fill in the Blank</option>
                        </select>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {isFormOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 overflow-y-auto"
                  >
                    <div className="min-h-screen px-4 text-center">
                      <div className="fixed inset-0" aria-hidden="true" onClick={() => setIsFormOpen(false)} />
                      
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="inline-block w-full max-w-md my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-lg"
                      >
                        <div className="p-6 sm:p-8">
                          <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg sm:text-xl font-medium text-gray-900">
                              {editingQuestion ? 'Edit Question' : 'Add New Question'}
                            </h3>
                            <button
                              onClick={() => setIsFormOpen(false)}
                              className="text-gray-400 hover:text-gray-500 focus:outline-none"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>

                          <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            const question = {
                              id: editingQuestion?.id || '',
                              content: formData.get('content') as string,
                              category: formData.get('category') as string,
                              type: formData.get('type') as string,
                              difficulty: formData.get('difficulty') as string,
                              options: [],
                              correctAnswer: formData.get('correctAnswer') as string,
                            };
                            handleSave(question);
                          }}>
                            <div className="space-y-4 sm:space-y-6">
                              {/* Question Content */}
                              <div>
                                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                                  Question Content
                                </label>
                                <textarea
                                  id="content"
                                  name="content"
                                  rows={4}
                                  className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                                  defaultValue={editingQuestion?.content || ''}
                                  placeholder="Enter your question here..."
                                  required
                                />
                              </div>

                              {/* Category with Add New Option */}
                              <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                  Category
                                </label>
                                <div className="flex gap-2">
                                  <div className="relative flex-1">
                                    <select
                                      id="category"
                                      name="category"
                                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                                      defaultValue={editingQuestion?.category || categories[0]}
                                      required
                                    >
                                      {categories.map((category) => (
                                        <option key={category} value={category}>
                                          {category}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newCategory = prompt('Enter new category name:');
                                      if (newCategory && !categories.includes(newCategory)) {
                                        setCategories([...categories, newCategory]);
                                      }
                                    }}
                                    className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                  >
                                    <Plus className="h-5 w-5" />
                                  </button>
                                </div>
                              </div>

                              {/* Question Type */}
                              <div>
                                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                                  Question Type
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                  {['multiple', 'boolean', 'text'].map((type) => (
                                    <div
                                      key={type}
                                      className="relative flex items-center justify-center"
                                    >
                                      <input
                                        type="radio"
                                        name="type"
                                        value={type}
                                        id={`type-${type}`}
                                        className="sr-only"
                                        defaultChecked={editingQuestion?.type === type || (!editingQuestion && type === 'multiple')}
                                        onChange={(e) => setSelectedType(e.target.value)}
                                      />
                                      <label
                                        htmlFor={`type-${type}`}
                                        className={`w-full py-2 px-3 text-sm font-medium text-center rounded-md cursor-pointer focus:outline-none transition-colors
                                          ${editingQuestion?.type === type || (!editingQuestion && type === 'multiple')
                                            ? 'bg-primary text-white'
                                            : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50'
                                          }`}
                                      >
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Multiple Choice Options */}
                              {selectedType === 'multiple' && (
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Answer Options
                                  </label>
                                  <div className="space-y-2">
                                    {options.map((option, index) => (
                                      <div key={index} className="flex gap-2">
                                        <input
                                          type="text"
                                          value={option}
                                          onChange={(e) => {
                                            const newOptions = [...options];
                                            newOptions[index] = e.target.value;
                                            setOptions(newOptions);
                                          }}
                                          className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                                          placeholder={`Option ${index + 1}`}
                                        />
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const newOptions = options.filter((_, i) => i !== index);
                                            setOptions(newOptions);
                                          }}
                                          className="p-2 text-gray-400 hover:text-gray-500"
                                        >
                                          <Trash2 className="h-5 w-5" />
                                        </button>
                                      </div>
                                    ))}
                                    {options.length < 6 && (
                                      <button
                                        type="button"
                                        onClick={() => setOptions([...options, ''])}
                                        className="mt-2 w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                      >
                                        <Plus className="h-5 w-5 mr-2" />
                                        Add Option
                                      </button>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Difficulty */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Difficulty
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                  {['easy', 'medium', 'hard'].map((difficulty) => (
                                    <div
                                      key={difficulty}
                                      className="relative flex items-center justify-center"
                                    >
                                      <input
                                        type="radio"
                                        name="difficulty"
                                        value={difficulty}
                                        id={`difficulty-${difficulty}`}
                                        className="sr-only"
                                        defaultChecked={editingQuestion?.difficulty === difficulty || (!editingQuestion && difficulty === 'easy')}
                                      />
                                      <label
                                        htmlFor={`difficulty-${difficulty}`}
                                        className={`w-full py-2 px-3 text-sm font-medium text-center rounded-md cursor-pointer focus:outline-none transition-colors
                                          ${editingQuestion?.difficulty === difficulty || (!editingQuestion && difficulty === 'easy')
                                            ? difficulty === 'easy' ? 'bg-green-500 text-white'
                                              : difficulty === 'medium' ? 'bg-yellow-500 text-white'
                                              : 'bg-red-500 text-white'
                                            : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50'
                                          }`}
                                      >
                                        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Points */}
                              <div>
                                <label htmlFor="points" className="block text-sm font-medium text-gray-700 mb-1">
                                  Points
                                </label>
                                <input
                                  type="number"
                                  id="points"
                                  name="points"
                                  min="1"
                                  max="100"
                                  className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                                  defaultValue={editingQuestion?.points || '1'}
                                  required
                                />
                              </div>

                              {/* Time Limit */}
                              <div>
                                <label htmlFor="timeLimit" className="block text-sm font-medium text-gray-700 mb-1">
                                  Time Limit (seconds)
                                </label>
                                <input
                                  type="number"
                                  id="timeLimit"
                                  name="timeLimit"
                                  min="0"
                                  className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                                  defaultValue={editingQuestion?.timeLimit || '0'}
                                  placeholder="0 for no limit"
                                />
                              </div>

                              {/* Correct Answer */}
                              <div>
                                <label htmlFor="correctAnswer" className="block text-sm font-medium text-gray-700 mb-1">
                                  Correct Answer
                                </label>
                                {selectedType === 'multiple' ? (
                                  <select
                                    id="correctAnswer"
                                    name="correctAnswer"
                                    className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                                    defaultValue={editingQuestion?.correctAnswer || options[0]}
                                    required
                                  >
                                    {options.map((option, index) => (
                                      <option key={index} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                ) : selectedType === 'boolean' ? (
                                  <select
                                    id="correctAnswer"
                                    name="correctAnswer"
                                    className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                                    defaultValue={editingQuestion?.correctAnswer || 'true'}
                                    required
                                  >
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                  </select>
                                ) : (
                                  <input
                                    type="text"
                                    id="correctAnswer"
                                    name="correctAnswer"
                                    className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                                    defaultValue={editingQuestion?.correctAnswer || ''}
                                    required
                                  />
                                )}
                              </div>

                              {/* Explanation */}
                              <div>
                                <label htmlFor="explanation" className="block text-sm font-medium text-gray-700 mb-1">
                                  Explanation (Optional)
                                </label>
                                <textarea
                                  id="explanation"
                                  name="explanation"
                                  rows={3}
                                  className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                                  defaultValue={editingQuestion?.explanation || ''}
                                  placeholder="Explain why this answer is correct..."
                                />
                              </div>

                              {/* Tags */}
                              <div>
                                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                                  Tags (Optional)
                                </label>
                                <input
                                  type="text"
                                  id="tags"
                                  name="tags"
                                  className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                                  defaultValue={editingQuestion?.tags?.join(', ') || ''}
                                  placeholder="Enter tags separated by commas"
                                />
                              </div>
                            </div>

                            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                              <button
                                type="button"
                                onClick={() => setIsFormOpen(false)}
                                className="w-full sm:w-1/2 inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="w-full sm:w-1/2 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                              >
                                {editingQuestion ? 'Save Changes' : 'Add Question'}
                              </button>
                            </div>
                          </form>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {deleteQuestion && (
                  <DeleteConfirmation
                    question={deleteQuestion}
                    onConfirm={confirmDelete}
                    onCancel={() => setDeleteQuestion(null)}
                  />
                )}
              </AnimatePresence>
            </>
          ) : (
            <BookManagement />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}