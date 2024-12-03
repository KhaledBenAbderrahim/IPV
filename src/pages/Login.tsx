import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, GraduationCap, Users, ArrowLeft, Home, LightbulbIcon } from 'lucide-react';
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="flex justify-between items-center mb-8">
            <Link 
              to="/" 
              className="flex items-center text-gray-600 hover:text-primary transition-colors group"
            >
              <motion.div
                whileHover={{ x: -4 }}
                className="flex items-center"
              >
                <Home className="h-5 w-5 mr-2 group-hover:text-primary" />
                Back to Home
              </motion.div>
            </Link>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <GraduationCap className="h-12 w-12 text-primary" />
            </motion.div>
          </div>

          <div className="text-center mb-8">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            >
              Welcome Back!
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-2 text-gray-600"
            >
              Choose how you want to login
            </motion.p>
          </div>

          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRoleSelect('student')}
              className="w-full bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all text-left group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <GraduationCap className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">Student</h3>
                  <p className="text-gray-600 text-sm group-hover:text-gray-900 transition-colors">Access your learning dashboard</p>
                </div>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRoleSelect('hr')}
              className="w-full bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all text-left group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Users className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">HR Manager</h3>
                  <p className="text-gray-600 text-sm group-hover:text-gray-900 transition-colors">Manage your organization's learning</p>
                </div>
              </div>
            </motion.button>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:text-primary/80 font-medium">
                Register now
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  const currentCredentials = selectedRole === 'hr' ? demoCredentials.hr : demoCredentials.student;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      <div className="hidden lg:flex lg:w-1/2 bg-primary/5 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src={selectedRole === 'hr' 
            ? "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80"
            : "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80"
          }
          alt="Education"
          className="relative rounded-2xl shadow-2xl max-w-2xl w-full object-cover"
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-md w-full"
        >
          <div className="flex justify-between items-center mb-8">
            <motion.button
              whileHover={{ x: -4 }}
              onClick={() => setSelectedRole(null)}
              className="flex items-center text-gray-600 hover:text-primary transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:text-primary" />
              Back to role selection
            </motion.button>
            <Link 
              to="/" 
              className="flex items-center text-gray-600 hover:text-primary transition-colors group"
            >
              <motion.div
                whileHover={{ x: -4 }}
                className="flex items-center"
              >
                <Home className="h-5 w-5 mr-2 group-hover:text-primary" />
                Home
              </motion.div>
            </Link>
          </div>

          <div className="text-center mb-8">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            >
              Welcome Back!
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 mt-2"
            >
              Sign in as {selectedRole === 'hr' ? 'HR Manager' : 'Student'}
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-primary/20"
          >
            <div className="flex items-start">
              <LightbulbIcon className="h-5 w-5 text-primary mt-0.5" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Demo Credentials</p>
                <p className="text-sm text-gray-600 mt-1">
                  Email: <span className="text-primary">{currentCredentials.email}</span><br />
                  Password: <span className="text-primary">{currentCredentials.password}</span>
                </p>
              </div>
            </div>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onSubmit={handleSubmit} 
            className="space-y-6"
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none bg-white/50 backdrop-blur-sm"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none bg-white/50 backdrop-blur-sm"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.remember}
                  onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-primary hover:text-primary/80">
                Forgot password?
              </Link>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity relative overflow-hidden disabled:opacity-70"
            >
              {isLoading ? (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-inherit"
                  >
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </motion.div>
                </AnimatePresence>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}