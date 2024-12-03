import React, { useState } from 'react';
import { Plus, Trash2, X, Upload } from 'lucide-react';
import BookForm from './BookForm';
import BookList from './BookList';
import DeleteBookConfirmation from './DeleteBookConfirmation';

export interface Book {
  id: string;
  title: string;
  author: string;
  subject: string;
  isbn: string;
  coverUrl?: string;
  file?: File;
}

const initialBooks: Book[] = [
  {
    id: '1',
    title: 'E-Commerce Fundamentals',
    author: 'John Smith',
    subject: 'Business',
    isbn: '978-3-16-148410-0',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: '2',
    title: 'Digital Marketing Strategy',
    author: 'Sarah Johnson',
    subject: 'Marketing',
    isbn: '978-3-16-148411-7',
    coverUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=300&q=80',
  },
];

export default function BookManagement() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [deleteBook, setDeleteBook] = useState<Book | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  const subjects = Array.from(new Set(books.map(book => book.subject)));

  const filteredBooks = books.filter(book => 
    selectedSubject === 'all' || book.subject === selectedSubject
  );

  const handleSave = (book: Book) => {
    if (editingBook) {
      setBooks(books.map(b => b.id === editingBook.id ? book : b));
    } else {
      setBooks([...books, { ...book, id: Date.now().toString() }]);
    }
    setIsFormOpen(false);
    setEditingBook(null);
  };

  const handleDelete = (book: Book) => {
    setDeleteBook(book);
  };

  const confirmDelete = () => {
    if (deleteBook) {
      setBooks(books.filter(b => b.id !== deleteBook.id));
      setDeleteBook(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Subjects</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => {
            setEditingBook(null);
            setIsFormOpen(true);
          }}
          className="btn-primary"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Book
        </button>
      </div>

      <BookList
        books={filteredBooks}
        onEdit={(book) => {
          setEditingBook(book);
          setIsFormOpen(true);
        }}
        onDelete={handleDelete}
      />

      {/* Book Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-dark">
                  {editingBook ? 'Edit Book' : 'Add New Book'}
                </h2>
                <button
                  onClick={() => {
                    setIsFormOpen(false);
                    setEditingBook(null);
                  }}
                  className="text-light hover:text-dark transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <BookForm
                initialBook={editingBook}
                onSave={handleSave}
                onCancel={() => {
                  setIsFormOpen(false);
                  setEditingBook(null);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteBook && (
        <DeleteBookConfirmation
          book={deleteBook}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteBook(null)}
        />
      )}
    </div>
  );
}