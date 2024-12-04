import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from 'lucide-react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { useLocation } from 'react-router-dom';

const events = [
  {
    id: 1,
    title: 'JavaScript Final Exam',
    type: 'exam',
    time: '10:00 AM - 12:00 PM',
    course: 'Advanced JavaScript',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    id: 2,
    title: 'UI Design Workshop',
    type: 'workshop',
    time: '2:00 PM - 4:00 PM',
    course: 'UI/UX Design',
    color: 'bg-purple-100 text-purple-700',
  },
  {
    id: 3,
    title: 'Project Submission',
    type: 'deadline',
    time: '11:59 PM',
    course: 'Data Science',
    color: 'bg-amber-100 text-amber-700',
  },
];

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function Calendar() {
  const location = useLocation();
  const isHR = location.pathname.includes('hr-dashboard');
  const [currentMonth, setCurrentMonth] = useState(2); // March
  const [currentYear, setCurrentYear] = useState(2024);
  const [view, setView] = useState('month');

  const goToPreviousMonth = () => {
    setCurrentMonth(prev => prev === 0 ? 11 : prev - 1);
    if (currentMonth === 0) setCurrentYear(prev => prev - 1);
  };

  const goToNextMonth = () => {
    setCurrentMonth(prev => prev === 11 ? 0 : prev + 1);
    if (currentMonth === 11) setCurrentYear(prev => prev + 1);
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  return (
    <DashboardLayout role={isHR ? 'hr' : 'student'}>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-2 sm:p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 lg:mb-8">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <button 
                className="group flex items-center px-3 sm:px-4 py-2 bg-blue-600 text-white text-sm sm:text-base rounded-lg hover:bg-blue-700 shadow-md shadow-blue-200 transition-all duration-200 active:scale-95"
              >
                <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 group-hover:rotate-90 transition-transform duration-200" />
                Add Event
              </button>
              <div className="flex items-center gap-2 text-slate-600">
                <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                <span className="text-sm sm:text-base font-medium">{`${months[currentMonth]} ${currentYear}`}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={goToToday}
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-all duration-200 active:scale-95 hover:shadow-sm"
              >
                Today
              </button>
              <select
                value={view}
                onChange={(e) => setView(e.target.value)}
                className="text-xs sm:text-sm bg-white border border-slate-200 rounded-lg px-2 sm:px-3 py-2 text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              >
                <option value="month">Month</option>
                <option value="week">Week</option>
                <option value="day">Day</option>
              </select>
            </div>
          </div>

          {/* Calendar Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Calendar Header */}
            <div className="flex items-center justify-between p-3 sm:p-4 lg:p-6 border-b border-slate-200">
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-slate-800">
                {months[currentMonth]} {currentYear}
              </h2>
              <div className="flex items-center gap-1">
                <button
                  onClick={goToPreviousMonth}
                  className="p-1.5 sm:p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-all duration-200 active:scale-95"
                >
                  <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <button
                  onClick={goToNextMonth}
                  className="p-1.5 sm:p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-all duration-200 active:scale-95"
                >
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="p-1 sm:p-2 lg:p-4">
              <div className="grid grid-cols-7 gap-px bg-slate-200 rounded-lg overflow-hidden">
                {/* Week days */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div
                    key={day}
                    className="bg-slate-50 px-0.5 sm:px-2 py-2 text-[10px] sm:text-xs lg:text-sm font-semibold text-slate-600 text-center"
                  >
                    <span className="hidden sm:inline">{day}</span>
                    <span className="sm:hidden">{day.charAt(0)}</span>
                  </div>
                ))}

                {/* Calendar days */}
                {days.map((day) => (
                  <div
                    key={day}
                    className={`relative bg-white min-h-[70px] sm:min-h-[100px] lg:min-h-[140px] p-1 sm:p-2 lg:p-3 transition-all duration-200 hover:bg-slate-50 group ${
                      day === 15 ? 'ring-1 sm:ring-2 ring-blue-500 ring-inset' : ''
                    }`}
                  >
                    <span
                      className={`inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 ${
                        day === 15
                          ? 'bg-blue-500 text-white'
                          : 'text-slate-700 group-hover:bg-slate-100'
                      }`}
                    >
                      {day}
                    </span>

                    {/* Events */}
                    <div className="mt-1 sm:mt-2 space-y-0.5 sm:space-y-1">
                      {day === 15 && (
                        <>
                          <div 
                            className="text-[10px] sm:text-xs lg:text-sm p-0.5 sm:p-1 lg:p-1.5 rounded bg-blue-100 text-blue-700 truncate transition-all duration-200 hover:bg-blue-200 cursor-pointer"
                            title="Team Meeting"
                          >
                            Team Meeting
                          </div>
                          <div 
                            className="text-[10px] sm:text-xs lg:text-sm p-0.5 sm:p-1 lg:p-1.5 rounded bg-green-100 text-green-700 truncate transition-all duration-200 hover:bg-green-200 cursor-pointer"
                            title="Project Review"
                          >
                            Project Review
                          </div>
                        </>
                      )}
                      {day === 10 && (
                        <div 
                          className="text-[10px] sm:text-xs lg:text-sm p-0.5 sm:p-1 lg:p-1.5 rounded bg-purple-100 text-purple-700 truncate transition-all duration-200 hover:bg-purple-200 cursor-pointer"
                          title="Design Review"
                        >
                          Design Review
                        </div>
                      )}
                    </div>

                    {/* More events indicator */}
                    {day === 15 && (
                      <button className="absolute bottom-0.5 right-0.5 text-[8px] sm:text-[10px] text-slate-500 hover:text-slate-700 transition-colors duration-200">
                        +2 more
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}