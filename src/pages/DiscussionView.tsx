import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../components/layouts/DashboardLayout';
import {
  MessageSquare,
  ThumbsUp,
  Share2,
  Send,
  MoreVertical,
  Flag,
  Bookmark,
  Heart,
  Reply,
} from 'lucide-react';

interface Comment {
  id: number;
  content: string;
  author: {
    name: string;
    avatar: string;
    role?: string;
  };
  timestamp: string;
  likes: number;
  replies: Comment[];
  isLiked?: boolean;
}

const mockDiscussion = {
  id: 1,
  title: 'Tips for passing the IHK exam?',
  content:
    'Hey everyone! I'm preparing for the IHK exam and would love to hear your tips and strategies. What were your experiences, and what resources did you find most helpful? Any specific areas I should focus on?',
  author: {
    name: 'Sarah Johnson',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: 'Student',
  },
  category: 'Exam Prep',
  timestamp: '2 hours ago',
  likes: 24,
  isBookmarked: false,
  comments: [
    {
      id: 1,
      content:
        'Focus on practice exams! I found them incredibly helpful. Make sure to time yourself to get used to the exam conditions.',
      author: {
        name: 'Michael Chen',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        role: 'Student',
      },
      timestamp: '1 hour ago',
      likes: 12,
      isLiked: false,
      replies: [
        {
          id: 2,
          content: 'Completely agree! The practice exams were a game-changer for me.',
          author: {
            name: 'Emma Wilson',
            avatar:
              'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          },
          timestamp: '45 minutes ago',
          likes: 5,
          replies: [],
        },
      ],
    },
  ],
};

export default function DiscussionView() {
  const { id } = useParams();
  const [newComment, setNewComment] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle comment submission
    setNewComment('');
  };

  const CommentComponent = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className={`${isReply ? 'ml-12' : ''}`}>
      <div className="flex space-x-4">
        <img
          src={comment.author.avatar}
          alt={comment.author.name}
          className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
        />
        <div className="flex-1">
          <div className="bg-slate-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-slate-800">{comment.author.name}</span>
                {comment.author.role && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {comment.author.role}
                  </span>
                )}
              </div>
              <span className="text-sm text-slate-500">{comment.timestamp}</span>
            </div>
            <p className="text-slate-600">{comment.content}</p>
          </div>

          <div className="flex items-center space-x-6 mt-2 ml-4">
            <button className="flex items-center text-slate-500 hover:text-blue-600 transition-colors duration-200">
              <Heart className={`h-4 w-4 mr-1.5 ${comment.isLiked ? 'fill-current text-red-500' : ''}`} />
              <span className="text-sm font-medium">{comment.likes}</span>
            </button>
            <button className="flex items-center text-slate-500 hover:text-blue-600 transition-colors duration-200">
              <Reply className="h-4 w-4 mr-1.5" />
              <span className="text-sm font-medium">Reply</span>
            </button>
          </div>

          {/* Nested Replies */}
          {comment.replies?.map((reply) => (
            <CommentComponent key={reply.id} comment={reply} isReply />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout role="student">
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Discussion Header */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <img
                  src={mockDiscussion.author.avatar}
                  alt={mockDiscussion.author.name}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-white"
                />
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">{mockDiscussion.title}</h1>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className="text-sm text-slate-500">{mockDiscussion.author.name}</span>
                    <span className="text-sm text-slate-400">•</span>
                    <span className="text-sm text-slate-500">{mockDiscussion.timestamp}</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {mockDiscussion.category}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    isBookmarked ? 'text-blue-600' : 'text-slate-400 hover:text-blue-600'
                  }`}
                >
                  <Bookmark className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 transition-colors duration-200">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>

            <p className="mt-4 text-slate-600 leading-relaxed">{mockDiscussion.content}</p>

            <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-200">
              <div className="flex items-center space-x-6">
                <button className="flex items-center text-slate-500 hover:text-blue-600 transition-colors duration-200">
                  <ThumbsUp className="h-5 w-5 mr-1.5" />
                  <span className="text-sm font-medium">{mockDiscussion.likes} Likes</span>
                </button>
                <button className="flex items-center text-slate-500 hover:text-blue-600 transition-colors duration-200">
                  <MessageSquare className="h-5 w-5 mr-1.5" />
                  <span className="text-sm font-medium">
                    {mockDiscussion.comments.length} Comments
                  </span>
                </button>
                <button className="flex items-center text-slate-500 hover:text-blue-600 transition-colors duration-200">
                  <Share2 className="h-5 w-5 mr-1.5" />
                  <span className="text-sm font-medium">Share</span>
                </button>
              </div>
              <button className="flex items-center text-slate-500 hover:text-red-600 transition-colors duration-200">
                <Flag className="h-5 w-5 mr-1.5" />
                <span className="text-sm font-medium">Report</span>
              </button>
            </div>
          </div>

          {/* New Comment Form */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Leave a Comment</h2>
            <form onSubmit={handleSubmitComment}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 placeholder-slate-400 resize-none"
                rows={3}
              />
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md shadow-blue-500/25 transition-all duration-200"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Post Comment
                </button>
              </div>
            </form>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">
              Comments ({mockDiscussion.comments.length})
            </h2>
            <div className="space-y-6">
              {mockDiscussion.comments.map((comment) => (
                <CommentComponent key={comment.id} comment={comment} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
