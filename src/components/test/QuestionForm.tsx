import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, AlertCircle } from 'lucide-react';
import { Question, QuestionType } from '../../pages/TestManagement';
import SwipeableYesNo from './SwipeableYesNo';

interface QuestionFormProps {
  initialQuestion?: Question | null;
  onSave: (question: Question) => void;
  onCancel: () => void;
}

const defaultQuestion: Question = {
  id: '',
  type: 'boolean',
  content: '',
  options: undefined,
  correctAnswer: false,
  points: 5,
  category: '',
  difficulty: 'medium',
};

export default function QuestionForm({ initialQuestion, onSave, onCancel }: QuestionFormProps) {
  const [question, setQuestion] = useState<Question>(initialQuestion || defaultQuestion);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (initialQuestion) {
      setQuestion(initialQuestion);
    }
  }, [initialQuestion]);

  const handleTypeChange = (type: QuestionType) => {
    setQuestion(prev => ({
      ...prev,
      type,
      options: type === 'multiple' ? ['', ''] : undefined,
      correctAnswer: type === 'boolean' ? false : '',
    }));
  };

  const addOption = () => {
    if (question.options && question.options.length < 6) {
      setQuestion(prev => ({
        ...prev,
        options: [...(prev.options || []), ''],
      }));
    }
  };

  const removeOption = (index: number) => {
    if (question.options && question.options.length > 2) {
      setQuestion(prev => ({
        ...prev,
        options: prev.options?.filter((_, i) => i !== index),
      }));
    }
  };

  const updateOption = (index: number, value: string) => {
    if (question.options) {
      const newOptions = [...question.options];
      newOptions[index] = value;
      setQuestion(prev => ({
        ...prev,
        options: newOptions,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!question.content.trim()) {
      setError('Question content is required');
      return;
    }

    if (!question.category.trim()) {
      setError('Category is required');
      return;
    }

    if (question.type === 'multiple') {
      if (!question.options?.every(option => option.trim())) {
        setError('All options must be filled');
        return;
      }
      if (!question.correctAnswer) {
        setError('Correct answer must be selected');
        return;
      }
    }

    onSave(question);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onSubmit={handleSubmit}
      className="space-y-8 bg-white rounded-xl shadow-sm p-8"
    >
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-start p-4 bg-red-50 text-red-600 rounded-lg text-sm"
          >
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question Type */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Question Type
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(['multiple', 'boolean', 'text'] as const).map((type) => (
            <motion.button
              key={type}
              type="button"
              onClick={() => handleTypeChange(type)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-xl border-2 text-center transition-all ${
                question.type === type
                  ? 'border-primary bg-primary/5 text-primary shadow-sm'
                  : 'border-gray-200 text-gray-600 hover:border-primary/60 hover:bg-gray-50'
              }`}
            >
              {type === 'multiple' && 'Multiple Choice'}
              {type === 'boolean' && 'Yes/No'}
              {type === 'text' && 'Fill in the Blank'}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Question Content */}
      <div className="space-y-3">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Question Content
        </label>
        <textarea
          id="content"
          value={question.content}
          onChange={(e) => setQuestion(prev => ({ ...prev, content: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-vertical"
          rows={3}
          placeholder="Enter your question here..."
        />
      </div>

      {/* Options for Multiple Choice */}
      {question.type === 'multiple' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-3"
        >
          <label className="block text-sm font-medium text-gray-700">
            Answer Options
          </label>
          <div className="space-y-4">
            {question.options?.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-4"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-medium">
                  {String.fromCharCode(65 + index)}
                </div>
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={question.correctAnswer === option}
                  onChange={() => setQuestion(prev => ({ ...prev, correctAnswer: option }))}
                  className="h-5 w-5 rounded-full border-gray-300 text-primary focus:ring-primary/20"
                />
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder={`Option ${index + 1}`}
                />
                {question.options && question.options.length > 2 && (
                  <motion.button
                    type="button"
                    onClick={() => removeOption(index)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Minus className="h-5 w-5" />
                  </motion.button>
                )}
              </motion.div>
            ))}
            {question.options && question.options.length < 6 && (
              <motion.button
                type="button"
                onClick={addOption}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center px-4 py-2 rounded-xl border-2 border-dashed border-gray-200 text-gray-600 hover:border-primary hover:text-primary transition-all w-full justify-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Another Option
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* Yes/No Answer with Swipeable Interface */}
      {question.type === 'boolean' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-3"
        >
          <label className="block text-sm font-medium text-gray-700">
            Correct Answer
          </label>
          <div className="mt-2">
            <SwipeableYesNo
              value={question.correctAnswer as boolean}
              onChange={(value) => setQuestion(prev => ({ ...prev, correctAnswer: value }))}
            />
          </div>
          <p className="text-sm text-gray-500 text-center mt-4">
            Tip: You can also use keyboard arrows ← → to change the answer
          </p>
        </motion.div>
      )}

      {/* Correct Answer for Text Questions */}
      {question.type === 'text' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-3"
        >
          <label htmlFor="correctAnswer" className="block text-sm font-medium text-gray-700">
            Correct Answer
          </label>
          <input
            type="text"
            id="correctAnswer"
            value={question.correctAnswer as string}
            onChange={(e) => setQuestion(prev => ({ ...prev, correctAnswer: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            placeholder="Enter the correct answer..."
          />
        </motion.div>
      )}

      {/* Additional Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={question.category}
            onChange={(e) => setQuestion(prev => ({ ...prev, category: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            placeholder="e.g., Mathematics, Science..."
          />
        </div>
        <div className="space-y-3">
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
            Difficulty Level
          </label>
          <select
            id="difficulty"
            value={question.difficulty}
            onChange={(e) => setQuestion(prev => ({ ...prev, difficulty: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end space-x-4 pt-4">
        <motion.button
          type="button"
          onClick={onCancel}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-2 rounded-xl border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
        >
          Cancel
        </motion.button>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition-all"
        >
          Save Question
        </motion.button>
      </div>
    </motion.form>
  );
}