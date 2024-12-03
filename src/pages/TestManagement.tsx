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
  type: QuestionType;
  content: string;
  options?: string[];
  correctAnswer: string | boolean;
  points: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
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
    correctAnswer: true,
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

const QuestionStats = ({ questions }) => {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-500">Total Questions</h3>
          <BarChart2 className="h-5 w-5 text-primary" />
        </div>
        <p className="mt-2 text-3xl font-bold text-gray-900">{stats.total}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <h3 className="text-sm font-medium text-gray-500 mb-4">By Difficulty</h3>
        <div className="space-y-2">
          {Object.entries(stats.byDifficulty).map(([difficulty, count]) => (
            <div key={difficulty} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full ${difficultyColors[difficulty]} mr-2`} />
                <span className="text-sm text-gray-600 capitalize">{difficulty}</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{count}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <h3 className="text-sm font-medium text-gray-500 mb-4">By Type</h3>
        <div className="space-y-2">
          {Object.entries(stats.byType).map(([type, count]) => (
            <div key={type} className="flex items-center justify-between">
              <span className="text-sm text-gray-600 capitalize">{type}</span>
              <span className="text-sm font-medium text-gray-900">{count}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
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

  const categories = Array.from(new Set(questions.map(q => q.category)));
  
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
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Test Management</h1>
              <p className="text-gray-500 mt-1">Manage test questions and learning materials</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setEditingQuestion(null);
                setIsFormOpen(true);
              }}
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Question
            </motion.button>
          </motion.div>

          <div className="flex border-b border-gray-200 mb-8">
            {['questions', 'books'].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab as 'questions' | 'books')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
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
              <QuestionStats questions={questions} />

              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search questions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Filter className="h-5 w-5 mr-2" />
                    Filters
                  </motion.button>
                </div>

                <AnimatePresence>
                  {isFilterOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category
                        </label>
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                        >
                          <option value="all">All Categories</option>
                          {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Question Type
                        </label>
                        <select
                          value={selectedType}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
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

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <QuestionList
                  questions={filteredQuestions}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </motion.div>

              <AnimatePresence>
                {isFormOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-xl font-semibold text-gray-900">
                            {editingQuestion ? 'Edit Question' : 'Add New Question'}
                          </h2>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              setIsFormOpen(false);
                              setEditingQuestion(null);
                            }}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <X className="h-6 w-6" />
                          </motion.button>
                        </div>
                        <QuestionForm
                          initialQuestion={editingQuestion}
                          onSave={handleSave}
                          onCancel={() => {
                            setIsFormOpen(false);
                            setEditingQuestion(null);
                          }}
                        />
                      </div>
                    </motion.div>
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