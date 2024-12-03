import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Question } from '../../pages/TestManagement';

interface QuestionListProps {
  questions: Question[];
  onEdit: (question: Question) => void;
  onDelete: (question: Question) => void;
}

export default function QuestionList({ questions, onEdit, onDelete }: QuestionListProps) {
  const getDifficultyColor = (difficulty: Question['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'hard':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getQuestionTypeLabel = (type: Question['type']) => {
    switch (type) {
      case 'multiple':
        return 'Multiple Choice';
      case 'boolean':
        return 'Yes/No';
      case 'text':
        return 'Fill in the Blank';
      default:
        return type;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-4 text-sm font-medium text-light">Question</th>
              <th className="text-center p-4 text-sm font-medium text-light">Type</th>
              <th className="text-center p-4 text-sm font-medium text-light">Category</th>
              <th className="text-center p-4 text-sm font-medium text-light">Points</th>
              <th className="text-center p-4 text-sm font-medium text-light">Difficulty</th>
              <th className="text-right p-4 text-sm font-medium text-light">Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => (
              <tr key={question.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4">
                  <p className="text-sm text-dark">{question.content}</p>
                  {question.type === 'multiple' && question.options && (
                    <div className="mt-1 text-xs text-light">
                      {question.options.map((option, index) => (
                        <span
                          key={index}
                          className={`inline-block mr-2 ${
                            option === question.correctAnswer ? 'text-primary font-medium' : ''
                          }`}
                        >
                          • {option}
                        </span>
                      ))}
                    </div>
                  )}
                </td>
                <td className="p-4">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                    {getQuestionTypeLabel(question.type)}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <span className="text-sm text-dark">{question.category}</span>
                </td>
                <td className="p-4 text-center">
                  <span className="text-sm text-dark">{question.points}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center">
                    <div className={`w-2 h-2 rounded-full ${getDifficultyColor(question.difficulty)} mr-2`} />
                    <span className="text-sm text-dark capitalize">{question.difficulty}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onEdit(question)}
                      className="p-1 text-light hover:text-primary transition-colors"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(question)}
                      className="p-1 text-light hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}