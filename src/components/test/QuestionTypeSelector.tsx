import React from 'react';
import { motion } from 'framer-motion';
import { QuestionType } from '../../pages/TestManagement';

interface QuestionTypeSelectorProps {
  selectedType: QuestionType;
  onTypeChange: (type: QuestionType) => void;
}

export default function QuestionTypeSelector({
  selectedType,
  onTypeChange,
}: QuestionTypeSelectorProps) {
  const types: { type: QuestionType; label: string; description: string }[] = [
    {
      type: 'boolean',
      label: 'Yes/No',
      description: 'Simple true or false questions with swipe interaction',
    },
    {
      type: 'multiple',
      label: 'Multiple Choice',
      description: 'Create questions with multiple options',
    },
    {
      type: 'text',
      label: 'Fill in the Blank',
      description: 'Questions with text input answers',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {types.map(({ type, label, description }) => (
        <motion.button
          key={type}
          type="button"
          onClick={() => onTypeChange(type)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`p-4 rounded-xl border-2 text-left transition-all ${
            selectedType === type
              ? 'border-primary bg-primary/5 text-primary shadow-sm'
              : 'border-gray-200 text-gray-600 hover:border-primary/60 hover:bg-gray-50'
          }`}
        >
          <h3 className="font-medium mb-1">{label}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </motion.button>
      ))}
    </div>
  );
}
