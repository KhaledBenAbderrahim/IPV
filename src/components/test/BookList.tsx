import React from 'react';
import { Book } from './BookManagement';
import { Pencil, Trash2, BookOpen } from 'lucide-react';

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
}

export default function BookList({ books, onEdit, onDelete }: BookListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <div
          key={book.id}
          className="bg-white rounded-lg shadow-sm hover:shadow-airbnb transition-all overflow-hidden"
        >
          <div className="aspect-[4/3] relative">
            {book.coverUrl ? (
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-light" />
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-dark">{book.title}</h3>
            <p className="text-light text-sm mt-1">by {book.author}</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-light">Subject:</span>
                <span className="text-dark">{book.subject}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-light">ISBN:</span>
                <span className="text-dark">{book.isbn}</span>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => onEdit(book)}
                className="p-2 text-light hover:text-primary transition-colors"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(book)}
                className="p-2 text-light hover:text-red-500 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}