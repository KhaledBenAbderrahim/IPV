import React, { useState } from 'react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { Users, MessageSquare, Calendar, Search, Plus, BookOpen, UserPlus } from 'lucide-react';

const studyGroups = [
  {
    id: 1,
    name: 'JavaScript Masters',
    course: 'Advanced JavaScript Development',
    members: 8,
    maxMembers: 10,
    nextMeeting: '2024-03-15T14:00:00',
    topics: ['ES6+', 'Async Programming', 'Design Patterns'],
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 2,
    name: 'React Study Circle',
    course: 'React Fundamentals',
    members: 6,
    maxMembers: 8,
    nextMeeting: '2024-03-16T15:30:00',
    topics: ['Hooks', 'Context', 'Redux'],
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 3,
    name: 'Data Science Hub',
    course: 'Data Science Essentials',
    members: 12,
    maxMembers: 15,
    nextMeeting: '2024-03-17T13:00:00',
    topics: ['Python', 'Machine Learning', 'Statistics'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
];

export default function StudyGroups() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredGroups = studyGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || group.course === selectedCourse;
    return matchesSearch && matchesCourse;
  });

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
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-dark">Study Groups</h1>
              <p className="text-light mt-1">Join or create study groups to learn together</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Group
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-light" />
                <input
                  type="text"
                  placeholder="Search study groups..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">All Courses</option>
                <option value="Advanced JavaScript Development">JavaScript</option>
                <option value="React Fundamentals">React</option>
                <option value="Data Science Essentials">Data Science</option>
              </select>
            </div>
          </div>

          {/* Study Groups Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <div
                key={group.id}
                className="bg-white rounded-lg shadow-airbnb hover:shadow-airbnb-hover transition-all overflow-hidden"
              >
                <div className="relative h-48">
                  <img
                    src={group.image}
                    alt={group.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-semibold text-white">{group.name}</h3>
                    <p className="text-white/80 text-sm mt-1">{group.course}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-light">
                      <Users className="h-5 w-5 mr-2" />
                      <span>{group.members}/{group.maxMembers} members</span>
                    </div>
                    <div className="flex items-center text-light">
                      <Calendar className="h-5 w-5 mr-2" />
                      <span>{formatDate(group.nextMeeting)}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-dark mb-2">Topics</h4>
                      <div className="flex flex-wrap gap-2">
                        {group.topics.map((topic) => (
                          <span
                            key={topic}
                            className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <button className="text-light hover:text-primary transition-colors">
                        <MessageSquare className="h-5 w-5" />
                      </button>
                      <button
                        disabled={group.members >= group.maxMembers}
                        className={`btn-primary ${
                          group.members >= group.maxMembers
                            ? 'opacity-50 cursor-not-allowed'
                            : ''
                        }`}
                      >
                        <UserPlus className="h-5 w-5 mr-2" />
                        {group.members >= group.maxMembers ? 'Full' : 'Join Group'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Create Group Modal */}
          {showCreateModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-dark mb-6">Create Study Group</h2>
                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-dark mb-2">
                        Group Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                        placeholder="Enter group name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark mb-2">
                        Course
                      </label>
                      <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20">
                        <option value="">Select a course</option>
                        <option>Advanced JavaScript Development</option>
                        <option>React Fundamentals</option>
                        <option>Data Science Essentials</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark mb-2">
                        Maximum Members
                      </label>
                      <input
                        type="number"
                        min="2"
                        max="15"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark mb-2">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                        placeholder="Describe your study group..."
                      />
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowCreateModal(false)}
                        className="px-4 py-2 text-sm font-medium text-light hover:text-dark transition-colors"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn-primary">
                        Create Group
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