import React, { useState } from 'react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { 
  Video, 
  Calendar, 
  Clock, 
  Users, 
  Search,
  BookOpen,
  Star,
  MessageSquare,
  Mic,
  Settings,
  Share2
} from 'lucide-react';

const sessions = [
  {
    id: 1,
    title: 'Advanced JavaScript Concepts',
    instructor: 'Dr. Sarah Johnson',
    instructorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    date: '2024-03-20T14:00:00',
    duration: '90 minutes',
    participants: 24,
    maxParticipants: 30,
    topics: ['Closures', 'Promises', 'Async/Await'],
    rating: 4.9,
    status: 'upcoming',
  },
  {
    id: 2,
    title: 'UI/UX Design Workshop',
    instructor: 'Michael Chen',
    instructorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    date: '2024-03-21T15:30:00',
    duration: '120 minutes',
    participants: 18,
    maxParticipants: 25,
    topics: ['Design Systems', 'User Research', 'Prototyping'],
    rating: 4.8,
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'Data Science in Practice',
    instructor: 'Emily Rodriguez',
    instructorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    date: '2024-03-19T13:00:00',
    duration: '60 minutes',
    participants: 15,
    maxParticipants: 20,
    topics: ['Python', 'Data Analysis', 'Visualization'],
    rating: 4.7,
    status: 'live',
  },
];

export default function LiveSessions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState<typeof sessions[0] | null>(null);
  const [isInSession, setIsInSession] = useState(false);

  const filteredSessions = sessions.filter(session =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJoinSession = (session: typeof sessions[0]) => {
    setSelectedSession(session);
    if (session.status === 'live') {
      setIsInSession(true);
    } else {
      setShowJoinModal(true);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <DashboardLayout role="student">
      {isInSession && selectedSession ? (
        // Live Session Interface
        <div className="fixed inset-0 bg-gray-900 z-50">
          <div className="h-full flex flex-col">
            {/* Session Header */}
            <div className="bg-gray-800 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse mr-2" />
                    <span className="text-white font-medium">LIVE</span>
                  </div>
                  <span className="mx-4 text-gray-400">|</span>
                  <h2 className="text-white font-semibold">{selectedSession.title}</h2>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <Settings className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setIsInSession(false)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Leave Session
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex">
              {/* Video Grid */}
              <div className="flex-1 p-4 grid grid-cols-2 gap-4">
                <div className="aspect-video bg-gray-800 rounded-lg relative">
                  <img
                    src={selectedSession.instructorImage}
                    alt={selectedSession.instructor}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/50 px-2 py-1 rounded text-white text-sm">
                    {selectedSession.instructor} (Host)
                  </div>
                </div>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="aspect-video bg-gray-800 rounded-lg" />
                ))}
              </div>

              {/* Chat Panel */}
              <div className="w-80 bg-gray-800 border-l border-gray-700">
                <div className="h-full flex flex-col">
                  <div className="p-4 border-b border-gray-700">
                    <h3 className="text-white font-medium">Chat</h3>
                  </div>
                  <div className="flex-1 p-4 overflow-y-auto">
                    {/* Chat messages would go here */}
                  </div>
                  <div className="p-4 border-t border-gray-700">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <button className="p-2 text-primary hover:text-primary/80 transition-colors">
                        <MessageSquare className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="bg-gray-800 p-4">
              <div className="flex items-center justify-center space-x-4">
                <button className="p-4 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors">
                  <Mic className="h-6 w-6" />
                </button>
                <button className="p-4 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors">
                  <Video className="h-6 w-6" />
                </button>
                <button className="p-4 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors">
                  <Share2 className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Sessions List
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-dark">Live Sessions</h1>
                <p className="text-light mt-1">Join interactive learning sessions with experts</p>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-light" />
                <input
                  type="text"
                  placeholder="Search sessions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Sessions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-white rounded-lg shadow-airbnb hover:shadow-airbnb-hover transition-all overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <img
                          src={session.instructorImage}
                          alt={session.instructor}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold text-dark">{session.title}</h3>
                          <p className="text-light text-sm">with {session.instructor}</p>
                        </div>
                      </div>
                      {session.status === 'live' && (
                        <div className="flex items-center">
                          <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse mr-1" />
                          <span className="text-xs font-medium text-red-500">LIVE</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-light text-sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        {formatDate(session.date)}
                      </div>
                      <div className="flex items-center text-light text-sm">
                        <Clock className="h-4 w-4 mr-2" />
                        {session.duration}
                      </div>
                      <div className="flex items-center text-light text-sm">
                        <Users className="h-4 w-4 mr-2" />
                        {session.participants}/{session.maxParticipants} participants
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-dark mb-2">Topics</h4>
                      <div className="flex flex-wrap gap-2">
                        {session.topics.map((topic) => (
                          <span
                            key={topic}
                            className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm font-medium text-dark">
                            {session.rating}
                          </span>
                        </div>
                        <button
                          onClick={() => handleJoinSession(session)}
                          className={`btn-primary ${
                            session.participants >= session.maxParticipants
                              ? 'opacity-50 cursor-not-allowed'
                              : ''
                          }`}
                          disabled={session.participants >= session.maxParticipants}
                        >
                          {session.status === 'live' ? 'Join Now' : 'Register'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      {showJoinModal && selectedSession && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-dark mb-6">Register for Session</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-dark">{selectedSession.title}</h3>
                  <p className="text-light text-sm">with {selectedSession.instructor}</p>
                </div>
                <div className="flex items-center text-light text-sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(selectedSession.date)}
                </div>
                <div className="flex items-center text-light text-sm">
                  <Clock className="h-4 w-4 mr-2" />
                  {selectedSession.duration}
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => setShowJoinModal(false)}
                  className="px-4 py-2 text-sm font-medium text-light hover:text-dark transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowJoinModal(false);
                    // Handle registration logic
                  }}
                  className="btn-primary"
                >
                  Confirm Registration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}