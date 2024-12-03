import React, { useState, useEffect } from 'react';
import { Book } from './BookManagement';
import { Upload, X } from 'lucide-react';

interface BookFormProps {
  initialBook?: Book | null;
  onSave: (book: Book) => void;
  onCancel: () => void;
}

const defaultBook: Book = {
  id: '',
  title: '',
  author: '',
  subject: '',
  isbn: '',
};

export default function BookForm({ initialBook, onSave, onCancel }: BookFormProps) {
  const [book, setBook] = useState<Book>(initialBook || defaultBook);
  const [error, setError] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (initialBook) {
      setBook(initialBook);
    }
  }, [initialBook]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
    } else {
      setError('Please upload a PDF file');
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      setError('Please upload a PDF file');
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!book.title.trim()) {
      setError('Title is required');
      return;
    }

    if (!book.author.trim()) {
      setError('Author is required');
      return;
    }

    if (!book.subject.trim()) {
      setError('Subject is required');
      return;
    }

    if (!book.isbn.trim()) {
      setError('ISBN is required');
      return;
    }

    if (!file) {
      setError('Please upload a PDF file');
      return;
    }

    onSave(book);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-dark mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={book.title}
          onChange={(e) => setBook(prev => ({ ...prev, title: e.target.value }))}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div>
        <label htmlFor="author" className="block text-sm font-medium text-dark mb-2">
          Author
        </label>
        <input
          type="text"
          id="author"
          value={book.author}
          onChange={(e) => setBook(prev => ({ ...prev, author: e.target.value }))}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-dark mb-2">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          value={book.subject}
          onChange={(e) => setBook(prev => ({ ...prev, subject: e.target.value }))}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div>
        <label htmlFor="isbn" className="block text-sm font-medium text-dark mb-2">
          ISBN
        </label>
        <input
          type="text"
          id="isbn"
          value={book.isbn}
          onChange={(e) => setBook(prev => ({ ...prev, isbn: e.target.value }))}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-2">
          Cover Image URL (Optional)
        </label>
        <input
          type="text"
          value={book.coverUrl || ''}
          onChange={(e) => setBook(prev => ({ ...prev, coverUrl: e.target.value }))}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
          placeholder="https://example.com/book-cover.jpg"
        />
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-dark mb-2">
          Book File (PDF)
        </label>
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center ${
            isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {file ? (
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center">
                <Upload className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm text-dark">{file.name}</span>
                <span className="ml-2 text-xs text-light">
                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="text-light hover:text-red-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <>
              <Upload className="mx-auto h-12 w-12 text-light" />
              <p className="mt-2 text-sm text-dark">
                Drag and drop your PDF file here, or{' '}
                <label className="text-primary hover:text-primary/80 cursor-pointer">
                  browse
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                </label>
              </p>
              <p className="mt-1 text-xs text-light">Maximum file size: 50MB</p>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-light hover:text-dark transition-colors"
        >
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          {initialBook ? 'Update Book' : 'Add Book'}
        </button>
      </div>
    </form>
  );
}