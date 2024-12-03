import React from 'react';
import { 
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Outlet
} from 'react-router-dom';
import { RoleProvider } from './contexts/RoleContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import HRDashboard from './pages/HRDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Courses from './pages/Courses';
import Calendar from './pages/Calendar';
import Students from './pages/Students';
import Reports from './pages/Reports';
import Analytics from './pages/Analytics';
import Support from './pages/Support';
import Notifications from './pages/Notifications';
import PracticeTest from './pages/PracticeTest';
import QuickReview from './pages/QuickReview';
import StudyGroups from './pages/StudyGroups';
import Mentorship from './pages/Mentorship';
import LiveSessions from './pages/LiveSessions';
import ProjectSubmission from './pages/ProjectSubmission';
import PeerReview from './pages/PeerReview';
import Blog from './pages/Blog';
import Documentation from './pages/Documentation';
import SuccessStories from './pages/SuccessStories';
import Careers from './pages/Careers';
import Pricing from './pages/Pricing';
import ContactSales from './pages/ContactSales';
import ScheduleDemo from './pages/ScheduleDemo';
import HelpCenter from './pages/HelpCenter';
import Resources from './pages/Resources';
import Community from './pages/Community';
import DiscussionDetails from './pages/DiscussionDetails';
import TestManagement from './pages/TestManagement';
import IHKExam from './pages/IHKExam';
import ExamPage from './pages/ExamPage';
import ExamResults from './pages/ExamResults';
import CourseDetails from './pages/CourseDetails';
import AssignmentSubmission from './pages/AssignmentSubmission';
import Workshop from './pages/Workshop';
import Activities from './pages/Activities';
import LearningPath from './pages/LearningPath';
import ModuleTest from './pages/ModuleTest';
import Achievements from './pages/Achievements';
import StudentProfile from './pages/StudentProfile';
import TestResults from './pages/TestResults';

const AppLayout = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <RoleProvider>
          <Outlet />
        </RoleProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/features" element={<Features />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/docs" element={<Documentation />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact-sales" element={<ContactSales />} />
      <Route path="/schedule-demo" element={<ScheduleDemo />} />
      <Route path="/success-stories" element={<SuccessStories />} />
      <Route path="/help" element={<HelpCenter />} />
      <Route path="/careers" element={<Careers />} />

      {/* HR routes */}
      <Route path="/hr-dashboard" element={<HRDashboard />} />
      <Route path="/hr/profile" element={<Profile />} />
      <Route path="/hr/courses" element={<Courses />} />
      <Route path="/hr/calendar" element={<Calendar />} />
      <Route path="/hr/settings" element={<Settings />} />
      <Route path="/hr/students" element={<Students />} />
      <Route path="/hr/reports" element={<Reports />} />
      <Route path="/hr/analytics" element={<Analytics />} />
      <Route path="/hr/help" element={<HelpCenter />} />
      <Route path="/hr/notifications" element={<Notifications />} />
      <Route path="/hr/test-management" element={<TestManagement />} />
      <Route path="/hr/student/:id" element={<StudentProfile />} />

      {/* Student routes */}
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/student/profile" element={<Profile />} />
      <Route path="/student/courses" element={<Courses />} />
      <Route path="/student/calendar" element={<Calendar />} />
      <Route path="/student/settings" element={<Settings />} />
      <Route path="/student/support" element={<Support />} />
      <Route path="/student/resources" element={<Resources />} />
      <Route path="/student/community" element={<Community />} />
      <Route path="/student/community/:id" element={<DiscussionDetails />} />
      <Route path="/student/practice-test" element={<PracticeTest />} />
      <Route path="/student/quick-review" element={<QuickReview />} />
      <Route path="/student/study-groups" element={<StudyGroups />} />
      <Route path="/student/mentorship" element={<Mentorship />} />
      <Route path="/student/live-sessions" element={<LiveSessions />} />
      <Route path="/student/project-submission" element={<ProjectSubmission />} />
      <Route path="/student/peer-review" element={<PeerReview />} />
      <Route path="/student/ihk-exam" element={<IHKExam />} />
      <Route path="/student/exam" element={<ExamPage />} />
      <Route path="/student/exam-results" element={<ExamResults />} />
      <Route path="/student/course/:id" element={<CourseDetails />} />
      <Route path="/student/assignment/:id" element={<AssignmentSubmission />} />
      <Route path="/student/workshop/:id" element={<Workshop />} />
      <Route path="/student/activities" element={<Activities />} />
      <Route path="/student/learning-path" element={<LearningPath />} />
      <Route path="/student/test/:id" element={<ModuleTest />} />
      <Route path="/student/achievements" element={<Achievements />} />
      <Route path="/student/test/results" element={<TestResults />} />
    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);

export default function App() {
  return <RouterProvider router={router} />;
}