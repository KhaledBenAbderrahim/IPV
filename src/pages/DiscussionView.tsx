import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  ArrowLeft,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    'Hey everyone! I\'m preparing for the IHK exam and would love to hear your tips and strategies. What were your experiences, and what resources did you find most helpful? Any specific areas I should focus on?',
  author: {
    name: 'Sarah Johnson',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: 'Student',
  },
  category: 'Exam Prep',
  timestamp: '2h',
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
      timestamp: '1h',
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
          timestamp: '45m',
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
  const [showActions, setShowActions] = useState(false);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle comment submission
    setNewComment('');
  };

  const CommentComponent = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className={`${isReply ? 'ml-6' : ''} animate-fade-in`}>
      <div className="flex space-x-3">
        <img
          src={comment.author.avatar}
          alt={comment.author.name}
          className="h-8 w-8 rounded-full object-cover ring-2 ring-white flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="bg-slate-50 rounded-2xl p-3">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-slate-800 text-sm">{comment.author.name}</span>
                {comment.author.role && (
                  <span className="px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {comment.author.role}
                  </span>
                )}
              </div>
              <span className="text-xs text-slate-500">{comment.timestamp}</span>
            </div>
            <p className="text-sm text-slate-600">{comment.content}</p>
          </div>

          <div className="flex items-center space-x-4 mt-1 ml-2">
            <button className="flex items-center text-slate-500">
              <Heart className={`h-3.5 w-3.5 ${comment.isLiked ? 'fill-current text-red-500' : ''}`} />
              <span className="text-xs ml-1">{comment.likes}</span>
            </button>
            <button className="flex items-center text-slate-500">
              <Reply className="h-3.5 w-3.5" />
              <span className="text-xs ml-1">Reply</span>
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
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-4 sm:p-8">
        {/* Back Button */}
        <div className="flex items-center mb-4">
          <Link to="/student/community" className="inline-flex items-center text-slate-600 hover:text-blue-600">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="text-base font-medium">Back to Community</span>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Discussion Header */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm mb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start space-x-3 flex-1 min-w-0">
                <img
                  src={mockDiscussion.author.avatar}
                  alt={mockDiscussion.author.name}
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover ring-2 ring-white"
                />
                <div className="flex-1 min-w-0">
                  <h1 className="text-base sm:text-xl font-semibold text-slate-900 mb-1">
                    {mockDiscussion.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500">
                    <span className="font-medium">{mockDiscussion.author.name}</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs bg-blue-50 text-blue-600">
                      {mockDiscussion.author.role}
                    </span>
                    <span>·</span>
                    <span>{mockDiscussion.timestamp}</span>
                  </div>
                </div>
              </div>
              
              <div className="relative flex-shrink-0">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowActions(!showActions)}
                  className="p-1.5 hover:bg-slate-50 rounded-full"
                >
                  <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                </motion.button>
                <AnimatePresence>
                  {showActions && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-10"
                    >
                      <button className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center space-x-2">
                        <Flag className="h-4 w-4 text-slate-400" />
                        <span>Report</span>
                      </button>
                      <button 
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center space-x-2"
                      >
                        <Bookmark className={`h-4 w-4 ${isBookmarked ? 'text-blue-600 fill-current' : 'text-slate-400'}`} />
                        <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            <p className="mt-3 text-sm sm:text-base text-slate-600 whitespace-pre-wrap">
              {mockDiscussion.content}
            </p>
            
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
              <div className="flex items-center space-x-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center space-x-1 text-slate-500 hover:text-blue-600"
                >
                  <ThumbsUp className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm">{mockDiscussion.likes}</span>
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center space-x-1 text-slate-500 hover:text-blue-600"
                >
                  <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm">{mockDiscussion.comments.length}</span>
                </motion.button>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-1 text-slate-500 hover:text-blue-600"
              >
                <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm">Share</span>
              </motion.button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="space-y-4">
            {mockDiscussion.comments.map((comment) => (
              <CommentComponent key={comment.id} comment={comment} />
            ))}
          </div>

          {/* Comment Form */}
          <form onSubmit={handleSubmitComment} className="mt-6">
            <div className="flex items-start space-x-3">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Your avatar"
                className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
              />
              <div className="flex-1 min-w-0">
                <div className="relative">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write your comment..."
                    rows={1}
                    className="block w-full resize-none rounded-xl border-0 bg-slate-50 py-3 px-4 text-sm sm:text-base text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-500"
                  />
                  <div className="absolute right-2 bottom-2">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="inline-flex items-center justify-center rounded-full p-1.5 text-slate-400 hover:text-blue-600 focus:outline-none"
                    >
                      <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
