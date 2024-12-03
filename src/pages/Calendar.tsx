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
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md shadow-blue-200 transition-all duration-200">
                <Plus className="h-5 w-5 mr-2" />
                Add Event
              </button>
              <div className="flex items-center space-x-2 text-slate-600">
                <CalendarIcon className="h-5 w-5" />
                <span className="font-medium">{`${months[currentMonth]} ${currentYear}`}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={goToToday}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-all duration-200"
              >
                Today
              </button>
              <select
                value={view}
                onChange={(e) => setView(e.target.value)}
                className="text-sm bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              >
                <option value="month">Month</option>
                <option value="week">Week</option>
                <option value="day">Day</option>
              </select>
            </div>
          </div>

          {/* Calendar Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            {/* Calendar Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-bold text-slate-800">
                  {months[currentMonth]} {currentYear}
                </h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={goToPreviousMonth}
                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-all duration-200"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={goToNextMonth}
                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-all duration-200"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="p-6">
              <div className="grid grid-cols-7 gap-px bg-slate-200 rounded-xl overflow-hidden">
                {/* Week days */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div
                    key={day}
                    className="bg-slate-50 px-2 py-3 text-sm font-semibold text-slate-600 text-center"
                  >
                    {day}
                  </div>
                ))}

                {/* Calendar days */}
                {days.map((day) => (
                  <div
                    key={day}
                    className={`relative bg-white min-h-[140px] p-3 transition-all duration-200 hover:bg-slate-50 group ${
                      day === 15 ? 'ring-2 ring-blue-500 ring-inset' : ''
                    }`}
                  >
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                        day === 15
                          ? 'bg-blue-500 text-white'
                          : 'text-slate-700 group-hover:bg-slate-100'
                      }`}
                    >
                      {day}
                    </span>
                    {day === 15 && (
                      <div className="mt-2 space-y-1.5">
                        {events.map((event) => (
                          <div
                            key={event.id}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg ${event.color} cursor-pointer transform transition-all duration-200 hover:scale-[1.02] hover:shadow-sm`}
                          >
                            <div className="font-semibold truncate">{event.title}</div>
                            <div className="text-[10px] opacity-75">{event.time}</div>
                          </div>
                        ))}
                      </div>
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