import React, { useState } from 'react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { Zap, Book, RotateCw, ThumbsUp, ThumbsDown } from 'lucide-react';

const flashcards = [
  {
    id: 1,
    front: 'What is React?',
    back: 'A JavaScript library for building user interfaces, developed by Facebook.',
    category: 'React',
  },
  {
    id: 2,
    front: 'What is a React Component?',
    back: 'A reusable piece of UI that can contain its own content, styling, and functionality.',
    category: 'React',
  },
  {
    id: 3,
    front: 'What are React Hooks?',
    back: 'Functions that allow you to use state and other React features in functional components.',
    category: 'React',
  },
];

export default function QuickReview() {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleNext = () => {
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
    setIsFlipped(false);
  };

  const handlePrevious = () => {
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setIsFlipped(false);
  };

  return (
    <DashboardLayout role="student">
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-dark">Quick Review</h1>
              <p className="text-light mt-1">Review key concepts with flashcards</p>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">All Categories</option>
              <option value="React">React</option>
              <option value="JavaScript">JavaScript</option>
              <option value="CSS">CSS</option>
            </select>
          </div>

          {/* Flashcard */}
          <div className="relative h-80 perspective-1000">
            <div
              className={`absolute inset-0 transition-transform duration-500 preserve-3d cursor-pointer ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {/* Front */}
              <div className="absolute inset-0 backface-hidden bg-white rounded-lg shadow-airbnb p-8 flex flex-col items-center justify-center">
                <Book className="h-8 w-8 text-primary mb-4" />
                <h2 className="text-xl font-semibold text-dark text-center">
                  {flashcards[currentCard].front}
                </h2>
                <p className="mt-4 text-light text-center">Click to reveal answer</p>
              </div>

              {/* Back */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-lg shadow-airbnb p-8 flex flex-col items-center justify-center">
                <p className="text-lg text-dark text-center">
                  {flashcards[currentCard].back}
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={handlePrevious}
              className="btn-outline"
            >
              Previous
            </button>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors">
                <ThumbsDown className="h-6 w-6" />
              </button>
              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
              >
                <RotateCw className="h-6 w-6" />
              </button>
              <button className="p-2 text-green-500 hover:bg-green-50 rounded-full transition-colors">
                <ThumbsUp className="h-6 w-6" />
              </button>
            </div>
            <button
              onClick={handleNext}
              className="btn-primary"
            >
              Next
            </button>
          </div>

          {/* Progress */}
          <div className="mt-8 flex items-center justify-between">
            <span className="text-light">
              Card {currentCard + 1} of {flashcards.length}
            </span>
            <div className="flex-1 mx-4 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{
                  width: `${((currentCard + 1) / flashcards.length) * 100}%`,
                }}
              />
            </div>
            <span className="text-primary font-medium">
              {Math.round(((currentCard + 1) / flashcards.length) * 100)}%
            </span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}