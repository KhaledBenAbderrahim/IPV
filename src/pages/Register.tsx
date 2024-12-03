import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Upload, Loader2, Check } from 'lucide-react';

type Step = 1 | 2 | 3;
type Role = 'hr' | 'student';

interface FormData {
  email: string;
  password: string;
  role: Role;
  // HR specific
  companyName?: string;
  department?: string;
  employeeId?: string;
  contactNumber?: string;
  // Student specific
  fullName?: string;
  educationLevel?: string;
  studyField?: string;
  dateOfBirth?: string;
  // Preferences
  profilePicture?: File | null;
  notifications: {
    email: boolean;
    push: boolean;
  };
  termsAccepted: boolean;
}

export default function Register() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    role: 'student',
    notifications: {
      email: true,
      push: true,
    },
    termsAccepted: false,
  });

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    window.location.href = formData.role === 'hr' ? '/hr-dashboard' : '/student-dashboard';
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-dark mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => updateFormData('password', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                placeholder="••••••••"
              />
              <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    formData.password.length > 8
                      ? 'w-full bg-green-500'
                      : formData.password.length > 4
                      ? 'w-1/2 bg-yellow-500'
                      : 'w-1/4 bg-red-500'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-2">
                Select Role
              </label>
              <div className="flex p-1 bg-gray-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => updateFormData('role', 'student')}
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                    formData.role === 'student'
                      ? 'bg-white shadow-sm text-primary'
                      : 'text-light hover:text-dark'
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => updateFormData('role', 'hr')}
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                    formData.role === 'hr'
                      ? 'bg-white shadow-sm text-primary'
                      : 'text-light hover:text-dark'
                  }`}
                >
                  HR Manager
                </button>
              </div>
            </div>
          </div>
        );

      case 2:
        return formData.role === 'hr' ? (
          <div className="space-y-6">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-dark mb-2">
                Company Name
              </label>
              <input
                id="companyName"
                type="text"
                required
                value={formData.companyName || ''}
                onChange={(e) => updateFormData('companyName', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                placeholder="Company Name"
              />
            </div>

            <div>
              <label htmlFor="department" className="block text-sm font-medium text-dark mb-2">
                Department
              </label>
              <input
                id="department"
                type="text"
                required
                value={formData.department || ''}
                onChange={(e) => updateFormData('department', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                placeholder="e.g., Human Resources"
              />
            </div>

            <div>
              <label htmlFor="employeeId" className="block text-sm font-medium text-dark mb-2">
                Employee ID
              </label>
              <input
                id="employeeId"
                type="text"
                required
                value={formData.employeeId || ''}
                onChange={(e) => updateFormData('employeeId', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                placeholder="EMP-123"
              />
            </div>

            <div>
              <label htmlFor="contactNumber" className="block text-sm font-medium text-dark mb-2">
                Contact Number
              </label>
              <input
                id="contactNumber"
                type="tel"
                required
                value={formData.contactNumber || ''}
                onChange={(e) => updateFormData('contactNumber', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-dark mb-2">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={formData.fullName || ''}
                onChange={(e) => updateFormData('fullName', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="educationLevel" className="block text-sm font-medium text-dark mb-2">
                Education Level
              </label>
              <select
                id="educationLevel"
                required
                value={formData.educationLevel || ''}
                onChange={(e) => updateFormData('educationLevel', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              >
                <option value="">Select Education Level</option>
                <option value="high_school">High School</option>
                <option value="bachelors">Bachelor's Degree</option>
                <option value="masters">Master's Degree</option>
                <option value="phd">Ph.D.</option>
              </select>
            </div>

            <div>
              <label htmlFor="studyField" className="block text-sm font-medium text-dark mb-2">
                Field of Study
              </label>
              <input
                id="studyField"
                type="text"
                required
                value={formData.studyField || ''}
                onChange={(e) => updateFormData('studyField', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                placeholder="e.g., Computer Science"
              />
            </div>

            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-dark mb-2">
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                type="date"
                required
                value={formData.dateOfBirth || ''}
                onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-dark mb-2">
                Profile Picture
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-lg hover:border-primary/60 transition-colors">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-light" />
                  <div className="flex text-sm text-light">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={(e) =>
                          updateFormData('profilePicture', e.target.files?.[0] || null)
                        }
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-light">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-2">
                Notification Preferences
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.notifications.email}
                    onChange={(e) =>
                      updateFormData('notifications', {
                        ...formData.notifications,
                        email: e.target.checked,
                      })
                    }
                    className="rounded border-gray-300 text-primary focus:ring-primary/20"
                  />
                  <span className="ml-2 text-sm text-light">Email notifications</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.notifications.push}
                    onChange={(e) =>
                      updateFormData('notifications', {
                        ...formData.notifications,
                        push: e.target.checked,
                      })
                    }
                    className="rounded border-gray-300 text-primary focus:ring-primary/20"
                  />
                  <span className="ml-2 text-sm text-light">Push notifications</span>
                </label>
              </div>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  required
                  checked={formData.termsAccepted}
                  onChange={(e) => updateFormData('termsAccepted', e.target.checked)}
                  className="rounded border-gray-300 text-primary focus:ring-primary/20"
                />
                <span className="ml-2 text-sm text-light">
                  I agree to the{' '}
                  <a href="#" className="text-primary hover:text-primary/80">
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary hover:text-primary/80">
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Progress */}
      <div className="hidden lg:flex lg:w-1/3 bg-primary/5 flex-col justify-center p-12">
        <div className="max-w-sm">
          <h2 className="text-2xl font-bold text-dark mb-8">Registration Progress</h2>
          <div className="space-y-4">
            {[
              { step: 1, title: 'Basic Information' },
              { step: 2, title: 'Role Details' },
              { step: 3, title: 'Preferences' },
            ].map(({ step, title }) => (
              <div
                key={step}
                className={`flex items-center ${step < currentStep ? 'text-primary' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === currentStep
                      ? 'bg-primary text-white'
                      : step < currentStep
                      ? 'bg-primary/20 text-primary'
                      : 'bg-gray-100 text-light'
                  }`}
                >
                  {step < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{step}</span>
                  )}
                </div>
                <div className="ml-4">
                  <p
                    className={`font-medium ${
                      step === currentStep
                        ? 'text-primary'
                        : step < currentStep
                        ? 'text-dark'
                        : 'text-light'
                    }`}
                  >
                    {title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-2/3 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-dark">Create Account</h2>
            <p className="text-light mt-3">
              Join EduMaster Pro to start your learning journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {renderStepContent()}

            <div className="flex items-center justify-between pt-4">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="flex items-center text-light hover:text-dark transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center text-light hover:text-dark transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Link>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn-primary"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading || !formData.termsAccepted}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Complete Registration'
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}