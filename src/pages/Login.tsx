import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, GraduationCap, Users, ArrowLeft, Home, LightbulbIcon, ArrowRight } from 'lucide-react';
import { useRole } from '../contexts/RoleContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Login() {
  const [selectedRole, setSelectedRole] = useState<'hr' | 'student' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  
  const navigate = useNavigate();
  const { setRole } = useRole();

  const demoCredentials = {
    hr: { email: 'hr@edumaster.com', password: 'HR@test123' },
    student: { email: 'student@edumaster.com', password: 'Student@123' }
  };

  const handleRoleSelect = (role: 'hr' | 'student') => {
    setSelectedRole(role);
    setFormData(prev => ({
      ...prev,
      email: demoCredentials[role].email,
      password: demoCredentials[role].password
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (selectedRole === 'hr' && formData.email === demoCredentials.hr.email && formData.password === demoCredentials.hr.password) {
      setRole('hr');
      navigate('/hr-dashboard');
    } else if (selectedRole === 'student' && formData.email === demoCredentials.student.email && formData.password === demoCredentials.student.password) {
      setRole('student');
      navigate('/student-dashboard');
    }

    setIsLoading(false);
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <Link 
              to="/" 
              className="flex items-center text-slate-600 hover:text-blue-600 transition-colors group"
            >
              <motion.div
                whileHover={{ x: -4 }}
                className="flex items-center"
              >
                <Home className="h-4 w-4 sm:h-5 sm:w-5 mr-2 group-hover:text-blue-600" />
                <span className="text-sm sm:text-base">Back to Home</span>
              </motion.div>
            </Link>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <GraduationCap className="h-8 w-8 sm:h-12 sm:w-12 text-blue-600" />
            </motion.div>
          </div>

          <div className="text-center mb-6 sm:mb-8">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-4xl font-bold text-slate-900"
            >
              Welcome Back!
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-2 text-sm sm:text-base text-slate-600"
            >
              Choose how you want to login
            </motion.p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRoleSelect('hr')}
              className="w-full flex items-center justify-between p-4 sm:p-5 rounded-xl bg-white border border-slate-200 hover:border-blue-200 shadow-sm hover:shadow transition-all group"
            >
              <div className="flex items-center">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mr-3" />
                <div className="text-left">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900">HR Login</h3>
                  <p className="text-xs sm:text-sm text-slate-500">For company administrators</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRoleSelect('student')}
              className="w-full flex items-center justify-between p-4 sm:p-5 rounded-xl bg-white border border-slate-200 hover:border-blue-200 shadow-sm hover:shadow transition-all group"
            >
              <div className="flex items-center">
                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mr-3" />
                <div className="text-left">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900">Student Login</h3>
                  <p className="text-xs sm:text-sm text-slate-500">For enrolled students</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentCredentials = selectedRole === 'hr' ? demoCredentials.hr : demoCredentials.student;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto"
      >
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <motion.button
            whileHover={{ x: -4 }}
            onClick={() => setSelectedRole(null)}
            className="flex items-center text-slate-600 hover:text-blue-600 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            <span className="text-sm sm:text-base">Back to Selection</span>
          </motion.button>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {selectedRole === 'hr' ? (
              <Users className="h-8 w-8 sm:h-12 sm:w-12 text-blue-600" />
            ) : (
              <GraduationCap className="h-8 w-8 sm:h-12 sm:w-12 text-blue-600" />
            )}
          </motion.div>
        </div>

        <div className="text-center mb-6 sm:mb-8">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-4xl font-bold text-slate-900"
          >
            {selectedRole === 'hr' ? 'HR Login' : 'Student Login'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-2 text-sm sm:text-base text-slate-600"
          >
            Enter your credentials to continue
          </motion.p>
        </div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-5"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors outline-none text-sm sm:text-base"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors outline-none text-sm sm:text-base"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.remember}
                onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-slate-600">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
              Forgot Password?
            </Link>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin mr-2" />
                Logging in...
              </>
            ) : (
              'Log In'
            )}
          </motion.button>

          <p className="text-center text-sm text-slate-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Sign up
            </Link>
          </p>
        </motion.form>
      </motion.div>
    </div>
  );
}