import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Upload, File, X, Calendar, Clock, Check } from 'lucide-react';
import DashboardLayout from '../components/layouts/DashboardLayout';

const assignmentData = {
  id: 1,
  title: 'Final Project: Building a Full-Stack Application',
  course: 'Advanced JavaScript Development',
  dueDate: 'March 20, 2024',
  timeLeft: '2 days',
  description: `
    Create a full-stack web application that demonstrates your understanding of modern JavaScript development.
    Your project should include:
    - Frontend built with React
    - RESTful API implementation
    - Database integration
    - Authentication system
    - Responsive design
  `,
  requirements: [
    'Use React for the frontend',
    'Implement at least 3 CRUD operations',
    'Include user authentication',
    'Add form validation',
    'Write unit tests',
  ],
  maxFileSize: '10MB',
  allowedFormats: ['pdf', 'zip', 'doc', 'docx'],
};

export default function AssignmentSubmission() {
  const { id } = useParams();
  const [files, setFiles] = useState<File[]>([]);
  const [comment, setComment] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    // Redirect to success page or show success message
  };

  return (
    <DashboardLayout role="student">
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          {/* Assignment Details */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-dark">{assignmentData.title}</h1>
                <p className="text-light mt-1">{assignmentData.course}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center text-light mb-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  Due: {assignmentData.dueDate}
                </div>
                <div className="flex items-center text-primary font-medium">
                  <Clock className="h-4 w-4 mr-1" />
                  {assignmentData.timeLeft} remaining
                </div>
              </div>
            </div>

            <div className="prose max-w-none">
              <h2 className="text-lg font-semibold text-dark">Description</h2>
              <p className="text-light whitespace-pre-line">{assignmentData.description}</p>

              <h2 className="text-lg font-semibold text-dark mt-6">Requirements</h2>
              <ul className="list-disc pl-5 space-y-2">
                {assignmentData.requirements.map((req, index) => (
                  <li key={index} className="text-light">{req}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Submission Form */}
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-dark mb-4">Submit Your Work</h2>

              {/* File Upload */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload className="mx-auto h-12 w-12 text-light" />
                <h3 className="mt-4 text-lg font-medium text-dark">
                  Drag and drop your files here
                </h3>
                <p className="mt-2 text-sm text-light">
                  or{' '}
                  <label className="text-primary hover:text-primary/80 cursor-pointer">
                    browse from your computer
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileInput}
                    />
                  </label>
                </p>
                <p className="mt-2 text-xs text-light">
                  Maximum file size: {assignmentData.maxFileSize}
                  <br />
                  Allowed formats: {assignmentData.allowedFormats.join(', ')}
                </p>
              </div>

              {/* Selected Files */}
              {files.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-dark mb-3">Selected Files</h3>
                  <div className="space-y-3">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                      >
                        <div className="flex items-center">
                          <File className="h-5 w-5 text-primary" />
                          <span className="ml-3 text-sm text-dark">{file.name}</span>
                          <span className="ml-2 text-xs text-light">
                            ({(file.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-light hover:text-red-500 transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comment */}
              <div className="mt-6">
                <label htmlFor="comment" className="block text-sm font-medium text-dark mb-2">
                  Additional Comments (Optional)
                </label>
                <textarea
                  id="comment"
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                  placeholder="Add any comments or notes about your submission..."
                />
              </div>

              {/* Submit Button */}
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={files.length === 0 || isSubmitting}
                  className="btn-primary"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Check className="h-5 w-5 mr-2" />
                      Submit Assignment
                    </span>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}