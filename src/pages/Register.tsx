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
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors outline-none text-sm sm:text-base"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => updateFormData('password', e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors outline-none text-sm sm:text-base"
                placeholder="••••••••"
              />
              <div className="mt-2 h-1 bg-slate-100 rounded-full overflow-hidden">
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
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Select Role
              </label>
              <div className="flex p-1 bg-slate-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => updateFormData('role', 'student')}
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                    formData.role === 'student'
                      ? 'bg-white shadow-sm text-blue-600'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => updateFormData('role', 'hr')}
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                    formData.role === 'hr'
                      ? 'bg-white shadow-sm text-blue-600'
                      : 'text-slate-500 hover:text-slate-700'
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
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-slate-700 mb-1.5">
                Company Name
              </label>
              <input
                id="companyName"
                type="text"
                required
                value={formData.companyName || ''}
                onChange={(e) => updateFormData('companyName', e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors outline-none text-sm sm:text-base"
                placeholder="Company Name"
              />
            </div>

            <div>
              <label htmlFor="department" className="block text-sm font-medium text-slate-700 mb-1.5">
                Department
              </label>
              <input
                id="department"
                type="text"
                required
                value={formData.department || ''}
                onChange={(e) => updateFormData('department', e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors outline-none text-sm sm:text-base"
                placeholder="e.g., Human Resources"
              />
            </div>

            <div>
              <label htmlFor="employeeId" className="block text-sm font-medium text-slate-700 mb-1.5">
                Employee ID
              </label>
              <input
                id="employeeId"
                type="text"
                required
                value={formData.employeeId || ''}
                onChange={(e) => updateFormData('employeeId', e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors outline-none text-sm sm:text-base"
                placeholder="EMP-123"
              />
            </div>

            <div>
              <label htmlFor="contactNumber" className="block text-sm font-medium text-slate-700 mb-1.5">
                Contact Number
              </label>
              <input
                id="contactNumber"
                type="tel"
                required
                value={formData.contactNumber || ''}
                onChange={(e) => updateFormData('contactNumber', e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors outline-none text-sm sm:text-base"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1.5">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={formData.fullName || ''}
                onChange={(e) => updateFormData('fullName', e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors outline-none text-sm sm:text-base"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="educationLevel" className="block text-sm font-medium text-slate-700 mb-1.5">
                Education Level
              </label>
              <select
                id="educationLevel"
                required
                value={formData.educationLevel || ''}
                onChange={(e) => updateFormData('educationLevel', e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors outline-none text-sm sm:text-base"
              >
                <option value="">Select Education Level</option>
                <option value="high_school">High School</option>
                <option value="bachelors">Bachelor's Degree</option>
                <option value="masters">Master's Degree</option>
                <option value="phd">Ph.D.</option>
              </select>
            </div>

            <div>
              <label htmlFor="studyField" className="block text-sm font-medium text-slate-700 mb-1.5">
                Field of Study
              </label>
              <input
                id="studyField"
                type="text"
                required
                value={formData.studyField || ''}
                onChange={(e) => updateFormData('studyField', e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors outline-none text-sm sm:text-base"
                placeholder="e.g., Computer Science"
              />
            </div>

            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-slate-700 mb-1.5">
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                type="date"
                required
                value={formData.dateOfBirth || ''}
                onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors outline-none text-sm sm:text-base"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Profile Picture
              </label>
              <div className="mt-1 flex justify-center px-4 sm:px-6 pt-4 sm:pt-5 pb-4 sm:pb-6 border-2 border-slate-200 border-dashed rounded-lg hover:border-blue-300 transition-colors">
                <div className="space-y-2 text-center">
                  <Upload className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-slate-400" />
                  <div className="flex text-sm text-slate-500">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500"
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
                  <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Notification Preferences
              </label>
              <div className="space-y-3">
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
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-slate-600">Email notifications</span>
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
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-slate-600">Push notifications</span>
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
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-slate-600">
                  I agree to the{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-500">
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Progress Steps - Mobile */}
      <div className="lg:hidden px-4 pt-6">
        <div className="flex items-center justify-between mb-6">
          <Link to="/login" className="flex items-center text-slate-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            <span className="text-sm sm:text-base">Back to Login</span>
          </Link>
          <div className="text-sm sm:text-base font-medium text-slate-600">
            Step {currentStep} of 3
          </div>
        </div>
        <div className="flex space-x-2 mb-8">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className="flex-1 h-1 rounded-full overflow-hidden bg-slate-200"
            >
              <div
                className={`h-full transition-all duration-300 ${
                  step === currentStep
                    ? 'bg-blue-600 w-1/2'
                    : step < currentStep
                    ? 'bg-blue-600 w-full'
                    : 'w-0'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex">
        {/* Left side - Progress (Desktop) */}
        <div className="hidden lg:flex lg:w-1/3 bg-gradient-to-b from-slate-100 to-white flex-col justify-center p-8 sm:p-12">
          <div className="max-w-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 sm:mb-8">Registration Progress</h2>
            <div className="space-y-4">
              {[
                { step: 1, title: 'Basic Information' },
                { step: 2, title: 'Role Details' },
                { step: 3, title: 'Preferences' },
              ].map(({ step, title }) => (
                <div
                  key={step}
                  className={`flex items-center ${step < currentStep ? 'text-blue-600' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step === currentStep
                        ? 'bg-blue-600 text-white'
                        : step < currentStep
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {step < currentStep ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <span className="text-sm">{step}</span>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      step === currentStep ? 'text-slate-900' : 'text-slate-600'
                    }`}>
                      {title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="flex-1 p-4 sm:p-8 lg:p-12">
          <div className="max-w-xl mx-auto">
            <div className="mb-6 sm:mb-8">
              <h1 className="text-xl sm:text-3xl font-bold text-slate-900 mb-2">
                {currentStep === 1 && 'Create your account'}
                {currentStep === 2 && (formData.role === 'hr' ? 'HR Details' : 'Student Details')}
                {currentStep === 3 && 'Final Steps'}
              </h1>
              <p className="text-sm sm:text-base text-slate-600">
                {currentStep === 1 && 'Start by entering your basic information'}
                {currentStep === 2 && 'Tell us more about yourself'}
                {currentStep === 3 && 'Set up your preferences and complete registration'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {renderStepContent()}

              <div className="flex items-center justify-between pt-4 sm:pt-6">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="flex items-center text-slate-600 hover:text-blue-600 transition-colors text-sm sm:text-base"
                  >
                    <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Previous
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type={currentStep === 3 ? 'submit' : 'button'}
                  onClick={currentStep < 3 ? handleNext : undefined}
                  disabled={isLoading}
                  className="flex items-center justify-center px-6 py-2.5 sm:py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : currentStep === 3 ? (
                    'Complete Registration'
                  ) : (
                    <>
                      Next
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}