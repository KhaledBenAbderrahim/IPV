import React, { useState } from 'react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { 
  Users, 
  Star, 
  Calendar, 
  MessageSquare, 
  Search,
  Filter,
  BookOpen,
  Clock,
  Award,
  Video
} from 'lucide-react';

const mentors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    role: 'Senior Software Engineer',
    company: 'Tech Solutions Inc.',
    expertise: ['JavaScript', 'React', 'System Design'],
    rating: 4.9,
    reviews: 128,
    availability: 'Mon, Wed, Fri',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: '10+ years of experience in full-stack development. Passionate about teaching and mentoring.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Lead UX Designer',
    company: 'Design Studio',
    expertise: ['UI/UX', 'Design Systems', 'User Research'],
    rating: 4.8,
    reviews: 95,
    availability: 'Tue, Thu',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'Helping students master the art of user experience design through practical projects.',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Data Science Lead',
    company: 'Analytics Corp',
    expertise: ['Python', 'Machine Learning', 'Data Analysis'],
    rating: 4.7,
    reviews: 156,
    availability: 'Mon, Thu, Sat',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'Specialized in helping students transition into data science careers.',
  },
];

export default function Mentorship() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('all');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<typeof mentors[0] | null>(null);

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.expertise.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesExpertise = selectedExpertise === 'all' || mentor.expertise.includes(selectedExpertise);
    return matchesSearch && matchesExpertise;
  });

  const handleBookSession = (mentor: typeof mentors[0]) => {
    setSelectedMentor(mentor);
    setShowBookingModal(true);
  };

  return (
    <DashboardLayout role="student">
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-8 mb-8 text-white">
            <h1 className="text-2xl font-bold">Find Your Mentor</h1>
            <p className="mt-2 text-white/80">Connect with industry experts to accelerate your learning</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or expertise..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
              <select
                value={selectedExpertise}
                onChange={(e) => setSelectedExpertise(e.target.value)}
                className="px-4 py-2 rounded-lg border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                <option value="all">All Expertise</option>
                <option value="JavaScript">JavaScript</option>
                <option value="React">React</option>
                <option value="Python">Python</option>
                <option value="UI/UX">UI/UX</option>
              </select>
            </div>
          </div>

          {/* Mentor Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <div
                key={mentor.id}
                className="bg-white rounded-lg shadow-airbnb hover:shadow-airbnb-hover transition-all overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <img
                        src={mentor.image}
                        alt={mentor.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-dark">{mentor.name}</h3>
                        <p className="text-light text-sm">{mentor.role} at {mentor.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium text-dark">{mentor.rating}</span>
                      <span className="ml-1 text-sm text-light">({mentor.reviews})</span>
                    </div>
                  </div>

                  <p className="mt-4 text-light text-sm">{mentor.bio}</p>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-dark mb-2">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {mentor.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-light text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        Available: {mentor.availability}
                      </div>
                      <button
                        onClick={() => handleBookSession(mentor)}
                        className="btn-primary"
                      >
                        Book Session
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Booking Modal */}
          {showBookingModal && selectedMentor && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-dark mb-6">Book Mentoring Session</h2>
                  <div className="flex items-center mb-6">
                    <img
                      src={selectedMentor.image}
                      alt={selectedMentor.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="font-medium text-dark">{selectedMentor.name}</h3>
                      <p className="text-light text-sm">{selectedMentor.role}</p>
                    </div>
                  </div>

                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-dark mb-2">
                        Session Type
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          className="p-4 border-2 border-primary bg-primary/5 rounded-lg text-center"
                        >
                          <Video className="h-6 w-6 text-primary mx-auto mb-2" />
                          <span className="block text-sm font-medium text-primary">Video Call</span>
                        </button>
                        <button
                          type="button"
                          className="p-4 border-2 border-gray-200 rounded-lg text-center"
                        >
                          <MessageSquare className="h-6 w-6 text-light mx-auto mb-2" />
                          <span className="block text-sm font-medium text-light">Chat</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark mb-2">
                        Select Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark mb-2">
                        Select Time
                      </label>
                      <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20">
                        <option>9:00 AM</option>
                        <option>10:00 AM</option>
                        <option>11:00 AM</option>
                        <option>2:00 PM</option>
                        <option>3:00 PM</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark mb-2">
                        Session Topic
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                        placeholder="What would you like to discuss?"
                      />
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowBookingModal(false)}
                        className="px-4 py-2 text-sm font-medium text-light hover:text-dark transition-colors"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn-primary">
                        Confirm Booking
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}