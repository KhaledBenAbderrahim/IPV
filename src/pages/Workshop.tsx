import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MessageSquare, Users, Video, Mic, Share2, Hand } from 'lucide-react';
import DashboardLayout from '../components/layouts/DashboardLayout';

const participants = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Instructor',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    isSpeaking: true,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Student',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    isSpeaking: false,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Student',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    isSpeaking: false,
  },
];

const messages = [
  {
    id: 1,
    user: 'Sarah Johnson',
    message: 'Welcome everyone to today\'s workshop on Advanced JavaScript Concepts!',
    time: '10:00 AM',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    user: 'Michael Chen',
    message: 'Excited to learn about async/await patterns!',
    time: '10:02 AM',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

export default function Workshop() {
  const { id } = useParams();
  const [newMessage, setNewMessage] = useState('');
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isHandRaised, setIsHandRaised] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Add message handling logic here
      setNewMessage('');
    }
  };

  return (
    <DashboardLayout role="student">
      <div className="min-h-screen bg-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-4 min-h-screen">
          {/* Main Content */}
          <div className="lg:col-span-3 p-8">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-dark">
                  Advanced JavaScript Workshop
                </h1>
                <div className="flex items-center space-x-4">
                  <button className="btn-outline">
                    <Share2 className="h-5 w-5 mr-2" />
                    Share Screen
                  </button>
                  <button 
                    className={`p-2 rounded-lg ${isVideoEnabled ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-light'}`}
                    onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                  >
                    <Video className="h-5 w-5" />
                  </button>
                  <button 
                    className={`p-2 rounded-lg ${isAudioEnabled ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-light'}`}
                    onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                  >
                    <Mic className="h-5 w-5" />
                  </button>
                  <button 
                    className={`p-2 rounded-lg ${isHandRaised ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-light'}`}
                    onClick={() => setIsHandRaised(!isHandRaised)}
                  >
                    <Hand className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Video Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden"
                  >
                    <img
                      src={participant.image}
                      alt={participant.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-white font-medium">
                          {participant.name}
                        </span>
                        <span className="ml-2 text-white/80 text-sm">
                          ({participant.role})
                        </span>
                      </div>
                      {participant.isSpeaking && (
                        <div className="flex items-center">
                          <Mic className="h-4 w-4 text-white" />
                          <div className="ml-2 flex space-x-1">
                            <div className="w-1 h-4 bg-green-500 animate-pulse" />
                            <div className="w-1 h-4 bg-green-500 animate-pulse delay-100" />
                            <div className="w-1 h-4 bg-green-500 animate-pulse delay-200" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Presentation Area */}
              <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
                <div className="text-center">
                  <Share2 className="h-12 w-12 text-light mx-auto" />
                  <p className="mt-4 text-light">Share your screen to present</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:border-l border-gray-200 bg-white">
            <div className="h-full flex flex-col">
              {/* Participants */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-dark">Participants</h2>
                  <div className="flex items-center text-light">
                    <Users className="h-5 w-5 mr-2" />
                    <span>{participants.length}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {participants.map((participant) => (
                    <div key={participant.id} className="flex items-center">
                      <img
                        src={participant.image}
                        alt={participant.name}
                        className="h-8 w-8 rounded-full"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-dark">
                          {participant.name}
                        </p>
                        <p className="text-xs text-light">{participant.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat */}
              <div className="flex-1 flex flex-col">
                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className="flex items-start">
                        <img
                          src={message.image}
                          alt={message.user}
                          className="h-8 w-8 rounded-full"
                        />
                        <div className="ml-3 flex-1">
                          <div className="flex items-baseline">
                            <span className="text-sm font-medium text-dark">
                              {message.user}
                            </span>
                            <span className="ml-2 text-xs text-light">
                              {message.time}
                            </span>
                          </div>
                          <p className="text-sm text-light mt-1">{message.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 border-t border-gray-200">
                  <form onSubmit={handleSendMessage}>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                      />
                      <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="btn-primary p-2"
                      >
                        <MessageSquare className="h-5 w-5" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}