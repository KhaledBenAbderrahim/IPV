import React, { useState } from 'react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { 
  Users, 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  Star,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ExternalLink
} from 'lucide-react';

const submissions = [
  {
    id: 1,
    title: 'E-commerce Platform',
    author: 'Michael Chen',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    submittedAt: '2024-03-15',
    technologies: ['React', 'Node.js', 'MongoDB'],
    description: 'A full-stack e-commerce platform with user authentication, product management, and order processing.',
    reviewsNeeded: 3,
    reviewsCompleted: 1,
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example/project',
  },
  {
    id: 2,
    title: 'Task Management App',
    author: 'Sarah Johnson',
    authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    submittedAt: '2024-03-14',
    technologies: ['Vue.js', 'Express', 'PostgreSQL'],
    description: 'A collaborative task management application with real-time updates and team features.',
    reviewsNeeded: 3,
    reviewsCompleted: 2,
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example/project',
  },
];

const reviewCriteria = [
  { id: 'functionality', label: 'Functionality', description: 'Does everything work as expected?' },
  { id: 'code_quality', label: 'Code Quality', description: 'Is the code well-organized and documented?' },
  { id: 'design', label: 'Design & UX', description: 'Is the interface user-friendly?' },
  { id: 'innovation', label: 'Innovation', description: 'Does it solve problems in a unique way?' },
];

export default function PeerReview() {
  const [selectedSubmission, setSelectedSubmission] = useState<typeof submissions[0] | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [feedback, setFeedback] = useState('');
  const [filter, setFilter] = useState('all');

  const handleStartReview = (submission: typeof submissions[0]) => {
    setSelectedSubmission(submission);
    setShowReviewModal(true);
    setRatings({});
    setFeedback('');
  };

  const handleSubmitReview = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowReviewModal(false);
  };

  return (
    <DashboardLayout role="student">
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-dark">Peer Reviews</h1>
              <p className="text-light mt-1">Review and provide feedback on your peers' projects</p>
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">All Submissions</option>
              <option value="pending">Pending Reviews</option>
              <option value="completed">Completed Reviews</option>
            </select>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-light">Reviews Completed</p>
                  <p className="text-2xl font-bold text-dark mt-1">12</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-light">Average Rating Given</p>
                  <p className="text-2xl font-bold text-dark mt-1">4.5/5</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <Star className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-light">Pending Reviews</p>
                  <p className="text-2xl font-bold text-dark mt-1">3</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Submissions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-airbnb transition-all p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <img
                      src={submission.authorImage}
                      alt={submission.author}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-dark">{submission.title}</h3>
                      <p className="text-light text-sm">by {submission.author}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-light">
                    <Clock className="h-4 w-4 mr-1" />
                    {submission.submittedAt}
                  </div>
                </div>

                <p className="mt-4 text-light text-sm">{submission.description}</p>

                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {submission.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <a
                        href={submission.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-primary hover:text-primary/80"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        <span className="text-sm">Demo</span>
                      </a>
                      <a
                        href={submission.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-primary hover:text-primary/80"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        <span className="text-sm">Code</span>
                      </a>
                    </div>
                    <button
                      onClick={() => handleStartReview(submission)}
                      className="btn-primary"
                    >
                      Start Review
                    </button>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-light">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {submission.reviewsCompleted}/{submission.reviewsNeeded} reviews completed
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-dark mb-6">
                Review: {selectedSubmission.title}
              </h2>

              {/* Rating Criteria */}
              <div className="space-y-6">
                {reviewCriteria.map((criterion) => (
                  <div key={criterion.id}>
                    <label className="block text-sm font-medium text-dark mb-2">
                      {criterion.label}
                      <span className="ml-2 text-light">{criterion.description}</span>
                    </label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setRatings({ ...ratings, [criterion.id]: rating })}
                          className={`p-2 rounded-lg transition-colors ${
                            ratings[criterion.id] === rating
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-light hover:bg-gray-200'
                          }`}
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Feedback */}
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Detailed Feedback
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                    placeholder="Provide constructive feedback..."
                  />
                </div>

                {/* Guidelines */}
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">
                        Review Guidelines
                      </h3>
                      <ul className="mt-2 text-sm text-yellow-700 list-disc pl-5 space-y-1">
                        <li>Be constructive and respectful</li>
                        <li>Focus on the code and implementation</li>
                        <li>Provide specific examples</li>
                        <li>Suggest improvements when possible</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="px-4 py-2 text-sm font-medium text-light hover:text-dark transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitReview}
                    className="btn-primary"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}