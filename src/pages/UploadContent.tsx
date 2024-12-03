import React, { useState } from 'react';
import { Upload, File, X, Check } from 'lucide-react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { useLocation } from 'react-router-dom';

export default function UploadContent() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const location = useLocation();
  const isHR = location.pathname.includes('hr-dashboard');

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

  return (
    <DashboardLayout role={isHR ? 'hr' : 'student'}>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
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
              Supported formats: PDF, DOC, DOCX, PPT, PPTX, MP4, MP3
            </p>
          </div>

          {files.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-dark mb-4">Selected Files</h3>
              <div className="space-y-3">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center">
                      <File className="h-5 w-5 text-primary" />
                      <span className="ml-3 text-sm text-dark">{file.name}</span>
                      <span className="ml-2 text-xs text-light">
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-light hover:text-red-500 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>

              <button className="mt-6 btn-primary">
                <Check className="h-5 w-5 mr-2" />
                Upload Files
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}