import React, { useState } from 'react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { 
  Upload, 
  File, 
  X, 
  Check, 
  Calendar,
  Clock,
  Link as LinkIcon,
  Github,
  ExternalLink,
  AlertTriangle
} from 'lucide-react';

interface ProjectFile {
  file: File;
  type: string;
  progress: number;
}

export default function ProjectSubmission() {
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [projectTitle, setProjectTitle] = useState('');
  const [description, setDescription] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [demoLink, setDemoLink] = useState('');
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
    const droppedFiles = Array.from(e.dataTransfer.files).map(file => ({
      file,
      type: file.type,
      progress: 0
    }));
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).map(file => ({
        file,
        type: file.type,
        progress: 0
      }));
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate file upload progress
    const uploadPromises = files.map((file, index) => {
      return new Promise<void>(resolve => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setFiles(prev => prev.map((f, i) => 
            i === index ? { ...f, progress } : f
          ));
          if (progress >= 100) {
            clearInterval(interval);
            resolve();
          }
        }, 300);
      });
    });

    await Promise.all(uploadPromises);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    // Handle successful submission
  };

  return (
    <DashboardLayout role="student">
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h1 className="text-2xl font-bold text-dark">Project Submission</h1>
            <p className="text-light mt-2">Submit your final project for review</p>
            <div className="mt-4 flex items-center space-x-4 text-sm text-light">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Due: March 20, 2024
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                11:59 PM
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Project Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-dark mb-6">Project Details</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-dark mb-2">
                    Project Title *
                  </label>
                  <input
                    id="title"
                    type="text"
                    required
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Enter your project title"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-dark mb-2">
                    Project Description *
                  </label>
                  <textarea
                    id="description"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                    placeholder="Describe your project and its features..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="github" className="block text-sm font-medium text-dark mb-2">
                      GitHub Repository
                    </label>
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-light" />
                      <input
                        id="github"
                        type="url"
                        value={githubLink}
                        onChange={(e) => setGithubLink(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                        placeholder="https://github.com/username/repo"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="demo" className="block text-sm font-medium text-dark mb-2">
                      Live Demo URL
                    </label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-light" />
                      <input
                        id="demo"
                        type="url"
                        value={demoLink}
                        onChange={(e) => setDemoLink(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                        placeholder="https://your-demo-url.com"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* File Upload */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-dark mb-6">Project Files</h2>
              
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
                  Maximum file size: 50MB
                  <br />
                  Supported formats: ZIP, PDF, DOC, DOCX
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
                        <div className="flex items-center flex-1 mr-4">
                          <File className="h-5 w-5 text-primary" />
                          <span className="ml-3 text-sm text-dark">{file.file.name}</span>
                          <span className="ml-2 text-xs text-light">
                            ({(file.file.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        {file.progress > 0 && (
                          <div className="w-24 h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all duration-300"
                              style={{ width: `${file.progress}%` }}
                            />
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="ml-4 text-light hover:text-red-500 transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submission Guidelines */}
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Submission Guidelines
                  </h3>
                  <ul className="mt-2 text-sm text-yellow-700 list-disc pl-5 space-y-1">
                    <li>Ensure all required files are included</li>
                    <li>Double-check your repository links</li>
                    <li>Include clear documentation</li>
                    <li>Test your live demo before submitting</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary min-w-[200px] flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    Submit Project
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}