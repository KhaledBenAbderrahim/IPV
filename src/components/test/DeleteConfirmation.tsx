import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Question } from '../../pages/TestManagement';

interface DeleteConfirmationProps {
  question: Question;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmation({
  question,
  onConfirm,
  onCancel,
}: DeleteConfirmationProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto">
          <AlertTriangle className="h-6 w-6 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-dark text-center mt-4">
          Delete Question?
        </h3>
        <p className="text-light text-center mt-2">
          Are you sure you want to delete this question? This action cannot be undone.
        </p>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-light hover:text-dark transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            Delete Question
          </button>
        </div>
      </div>
    </div>
  );
}