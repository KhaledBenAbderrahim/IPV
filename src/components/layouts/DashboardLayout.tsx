import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  Award,
  Settings,
  LogOut,
  Bell,
  ChevronDown,
  GraduationCap,
  Lightbulb,
  BarChart2,
  FileText,
  ScrollText,
  ClipboardList,
  HelpCircle,
  FolderOpen,
  Menu,
  X,
  Search
} from 'lucide-react';
import { useRole } from '../../contexts/RoleContext';
import { useNotifications } from '../../contexts/NotificationContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'hr' | 'student';
}

const hrNavigation = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/hr-dashboard' },
  { name: 'Students', icon: Users, href: '/hr/students' },
  { name: 'Courses', icon: BookOpen, href: '/hr/courses' },
  { name: 'Reports', icon: FileText, href: '/hr/reports' },
  { name: 'Analytics', icon: BarChart2, href: '/hr/analytics' },
  { name: 'Test Management', icon: ClipboardList, href: '/hr/test-management' },
  { name: 'Calendar', icon: Calendar, href: '/hr/calendar' },
  { name: 'Settings', icon: Settings, href: '/hr/settings' },
  { name: 'Notifications', icon: Bell, href: '/hr/notifications' },
  { name: 'Help Center', icon: HelpCircle, href: '/hr/help' },
];

const studentNavigation = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/student-dashboard' },
  { name: 'Learning Path', icon: Lightbulb, href: '/student/learning-path' },
  { name: 'My Courses', icon: BookOpen, href: '/student/courses' },
  { name: 'IHK Exam', icon: ScrollText, href: '/student/ihk-exam' },
  { name: 'Calendar', icon: Calendar, href: '/student/calendar' },
  { name: 'Achievements', icon: Award, href: '/student/achievements' },
  { name: 'Settings', icon: Settings, href: '/student/settings' },
  { name: 'Support', icon: HelpCircle, href: '/student/support' },
  { name: 'Resources', icon: FolderOpen, href: '/student/resources' },
  { name: 'Community', icon: Users, href: '/student/community' },
];

export default function DashboardLayout({ children, role: propRole }: DashboardLayoutProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { role: contextRole, logout } = useRole();
  const { unreadCount } = useNotifications();

  const role = contextRole;
  const navigation = role === 'hr' ? hrNavigation : studentNavigation;
  const profileImage = role === 'hr' 
    ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = () => {
    logout();
  };

  const getActiveRoute = () => {
    const currentPath = location.pathname;
    return navigation.find(item => 
      currentPath === item.href || currentPath.startsWith(item.href + '/')
    );
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-3 rounded-full bg-primary shadow-lg text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 transform lg:transform-none lg:opacity-100 w-72 bg-white shadow-xl z-40 transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 lg:translate-x-0 lg:opacity-100'
      }`}>
        <div className="flex h-16 items-center justify-center border-b border-gray-100">
          <Link to="/" className="flex items-center space-x-3 px-4">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">
              EduMaster Pro
            </span>
          </Link>
        </div>

        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        </div>

        <nav className="mt-2 px-3 space-y-1 overflow-y-auto max-h-[calc(100vh-12rem)]">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || 
                           location.pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-md hover:shadow-lg hover:bg-primary-dark'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                {item.name}
                {item.name === 'Notifications' && unreadCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white">
          <div className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-all">
            <img
              src={profileImage}
              alt="Profile"
              className="h-10 w-10 rounded-xl object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {role === 'hr' ? 'HR Manager' : 'Student'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {role === 'hr' ? 'Admin Access' : 'Student Access'}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="p-2 text-gray-500 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Header */}
        <header className={`fixed top-0 right-0 left-0 lg:left-72 z-20 transition-all ${
          isScrolled ? 'bg-white/80 backdrop-blur-sm shadow-sm' : 'bg-transparent'
        }`}>
          <div className="flex items-center justify-between h-16 px-4 lg:px-8">
            <h1 className="text-xl font-semibold text-gray-900">
              {getActiveRoute()?.name || 'Dashboard'}
            </h1>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition-all"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs font-medium flex items-center justify-center rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
                    <div className="p-4 text-sm text-gray-500">No new notifications</div>
                  </div>
                </div>
              )}

              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-3 p-1.5 rounded-xl hover:bg-gray-100 transition-all"
                >
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="h-8 w-8 rounded-xl object-cover"
                  />
                  <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                    showProfileMenu ? 'transform rotate-180' : ''
                  }`} />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {role === 'hr' ? 'HR Manager' : 'Student'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {role === 'hr' ? 'Admin Access' : 'Student Access'}
                      </p>
                    </div>
                    
                    <Link
                      to={`/${role}/profile`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Your Profile
                    </Link>
                    
                    <Link
                      to={`/${role}/settings`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Settings
                    </Link>
                    
                    <div className="border-t border-gray-100 mt-1">
                      <button
                        onClick={() => {
                          handleSignOut();
                          setShowProfileMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-all"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="pt-16 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}