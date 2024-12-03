import React from 'react';
import { Camera, Mail, Phone, MapPin, Building, Book, Calendar, Briefcase, Award, GraduationCap } from 'lucide-react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { useLocation } from 'react-router-dom';

export default function Profile() {
  const location = useLocation();
  const isHR = location.pathname.includes('hr');

  const profileData = {
    name: isHR ? 'John Doe' : 'Sarah Johnson',
    role: isHR ? 'HR Manager' : 'Student',
    email: isHR ? 'john.doe@example.com' : 'sarah.j@example.com',
    phone: '+1 (555) 000-0000',
    location: 'San Francisco, CA',
    company: 'Tech Solutions Inc.',
    department: 'Human Resources',
    joinDate: isHR ? '2020-01-15' : '2024-01-15',
    education: {
      degree: isHR ? 'Master of Human Resource Management' : 'Bachelor of Science',
      university: 'Stanford University',
      year: isHR ? '2019' : '2023',
      major: 'Computer Science'
    },
    certifications: [
      'SHRM Senior Certified Professional (SHRM-SCP)',
      'Professional in Human Resources (PHR)',
      'Learning & Development Professional'
    ]
  };

  return (
    <DashboardLayout role={isHR ? 'hr' : 'student'}>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Cover Photo */}
            <div className="h-48 bg-gradient-to-r from-primary/10 to-accent/10 relative">
              <button className="absolute bottom-4 right-4 bg-white rounded-lg px-4 py-2 text-sm font-medium text-dark hover:bg-gray-50 transition-colors">
                <Camera className="h-5 w-5 inline-block mr-2" />
                Change Cover
              </button>
            </div>

            {/* Profile Info */}
            <div className="px-8 pb-8">
              <div className="relative -mt-16 mb-8">
                <img
                  src={isHR 
                    ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  }
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-sm"
                />
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-sm hover:shadow-md transition-shadow">
                  <Camera className="h-5 w-5 text-dark" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Personal Information */}
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-bold text-dark mb-6">Personal Information</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-light mb-2">Full Name</label>
                      <input
                        type="text"
                        defaultValue={profileData.name}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-light mb-2">
                          <Mail className="h-4 w-4 inline-block mr-2" />
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue={profileData.email}
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-light mb-2">
                          <Phone className="h-4 w-4 inline-block mr-2" />
                          Phone
                        </label>
                        <input
                          type="tel"
                          defaultValue={profileData.phone}
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-light mb-2">
                        <MapPin className="h-4 w-4 inline-block mr-2" />
                        Location
                      </label>
                      <input
                        type="text"
                        defaultValue={profileData.location}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* HR-specific Professional Information */}
                  {isHR && (
                    <div className="mt-8">
                      <h2 className="text-2xl font-bold text-dark mb-6">Professional Information</h2>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-light mb-2">
                              <Building className="h-4 w-4 inline-block mr-2" />
                              Company
                            </label>
                            <input
                              type="text"
                              defaultValue={profileData.company}
                              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-light mb-2">
                              <Briefcase className="h-4 w-4 inline-block mr-2" />
                              Department
                            </label>
                            <input
                              type="text"
                              defaultValue={profileData.department}
                              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-light mb-2">
                            <Award className="h-4 w-4 inline-block mr-2" />
                            Professional Certifications
                          </label>
                          <div className="space-y-2">
                            {profileData.certifications?.map((cert, index) => (
                              <div key={index} className="flex items-center bg-gray-50 p-3 rounded-lg">
                                <Award className="h-5 w-5 text-primary mr-2" />
                                <span className="text-dark">{cert}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Education & Additional Info */}
                <div>
                  <h2 className="text-2xl font-bold text-dark mb-6">Details</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-light mb-2">
                        <GraduationCap className="h-4 w-4 inline-block mr-2" />
                        {isHR ? 'Degree' : 'Education Level'}
                      </label>
                      <input
                        type="text"
                        defaultValue={profileData.education.degree}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-light mb-2">
                        <Building className="h-4 w-4 inline-block mr-2" />
                        University
                      </label>
                      <input
                        type="text"
                        defaultValue={profileData.education.university}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-light mb-2">
                        <Calendar className="h-4 w-4 inline-block mr-2" />
                        {isHR ? 'Join Date' : 'Enrollment Date'}
                      </label>
                      <input
                        type="date"
                        defaultValue={profileData.joinDate}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button className="btn-outline">Cancel</button>
                <button className="btn-primary">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}