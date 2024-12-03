import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { 
  MessageSquare, 
  ThumbsUp, 
  Share2, 
  ArrowLeft,
  Send,
  MoreVertical,
  Flag,
  Bookmark,
  Copy
} from 'lucide-react';

const discussion = {
  id: 1,
  title: 'Tips for passing the IHK exam?',
  author: {
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: 'Student'
  },
  content: `Hi everyone! I'm preparing for the IHK exam and would love to hear some tips and strategies from those who have already taken it. What topics should I focus on? Any specific resources you found helpful?

Some areas I'm particularly concerned about:
- Time management during the exam
- Key theoretical concepts
- Practice questions and mock exams

Would really appreciate any advice!`,
  category: 'Exam Prep',
  createdAt: '2024-03-15T10:30:00',
  likes: 24,
  replies: [
    {
      id: 1,
      author: {
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        role: 'Student'
      },
      content: 'From my experience, focusing on past exam papers really helped. I spent about 2 weeks going through previous years\' questions and it gave me a good idea of what to expect.',
      createdAt: '2024-03-15T11:15:00',
      likes: 12,
      isLiked: false,
    },
    {
      id: 2,
      author: {
        name: 'Emily Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        role: 'Teaching Assistant'
      },
      content: 'Time management is crucial! I recommend dividing the exam duration by the number of questions to allocate appropriate time for each section. Also, our study materials in the Resources section have a dedicated IHK exam preparation guide.',
      createdAt: '2024-03-15T12:00:00',
      likes: 18,
      isLiked: true,
    }
  ]
};

export default function DiscussionDetails() {
  const { id } = useParams();
  const [newReply, setNewReply] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle reply submission
    setNewReply('');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <DashboardLayout role="student">
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            to="/student/community"
            className="flex items-center text-light hover:text-dark mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Discussions
          </Link>

          {/* Discussion Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <img
                  src={discussion.author.avatar}
                  alt={discussion.author.name}
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <h1 className="text-xl font-bold text-dark">{discussion.title}</h1>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className="text-light text-sm">{discussion.author.name}</span>
                    <span className="text-light">•</span>
                    <span className="text-light text-sm">{formatDate(discussion.createdAt)}</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {discussion.category}
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowOptions(!showOptions)}
                  className="p-2 text-light hover:text-dark rounded-full hover:bg-gray-100 transition-colors"
                >
                  <MoreVertical className="h-5 w-5" />
                </button>
                {showOptions && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-airbnb border border-gray-100 py-1">
                    <button className="w-full px-4 py-2 text-sm text-left text-light hover:text-dark hover:bg-gray-50 flex items-center">
                      <Bookmark className="h-4 w-4 mr-2" />
                      Save Discussion
                    </button>
                    <button className="w-full px-4 py-2 text-sm text-left text-light hover:text-dark hover:bg-gray-50 flex items-center">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Link
                    </button>
                    <button className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 flex items-center">
                      <Flag className="h-4 w-4 mr-2" />
                      Report
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-6 text-dark whitespace-pre-wrap">{discussion.content}</div>
            <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
              <div className="flex items-center space-x-6">
                <button className="flex items-center text-light hover:text-primary transition-colors">
                  <ThumbsUp className="h-5 w-5 mr-1" />
                  <span className="text-sm">{discussion.likes}</span>
                </button>
                <button className="flex items-center text-light hover:text-primary transition-colors">
                  <MessageSquare className="h-5 w-5 mr-1" />
                  <span className="text-sm">{discussion.replies.length}</span>
                </button>
                <button className="flex items-center text-light hover:text-primary transition-colors">
                  <Share2 className="h-5 w-5 mr-1" />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>
          </div>

          {/* Replies */}
          <div className="space-y-6">
            {discussion.replies.map((reply) => (
              <div key={reply.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={reply.author.avatar}
                    alt={reply.author.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-dark">{reply.author.name}</span>
                        <span className="ml-2 text-sm text-light">• {formatDate(reply.createdAt)}</span>
                      </div>
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                        {reply.author.role}
                      </span>
                    </div>
                    <p className="mt-2 text-dark">{reply.content}</p>
                    <div className="mt-4 flex items-center space-x-4">
                      <button className={`flex items-center ${
                        reply.isLiked ? 'text-primary' : 'text-light hover:text-primary'
                      } transition-colors`}>
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span className="text-sm">{reply.likes}</span>
                      </button>
                      <button className="text-light hover:text-primary transition-colors text-sm">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Reply Form */}
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-dark mb-4">Add a Reply</h2>
            <form onSubmit={handleSubmitReply}>
              <textarea
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                placeholder="Share your thoughts..."
              />
              <div className="mt-4 flex justify-end">
                <button type="submit" className="btn-primary">
                  <Send className="h-5 w-5 mr-2" />
                  Post Reply
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}