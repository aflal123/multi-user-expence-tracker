import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, DollarSign, Plus } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([
    { date: '2026-01-15', type: 'expense', amount: 45.00, description: 'Lunch' },
    { date: '2026-01-18', type: 'expense', amount: 120.00, description: 'Groceries' },
    { date: '2026-01-22', type: 'expense', amount: 25.50, description: 'Coffee' },
    { date: '2026-01-25', type: 'income', amount: 3500.00, description: 'Salary' },
    { date: '2026-01-28', type: 'expense', amount: 89.30, description: 'Restaurant' },
  ]);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatMonthYear = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const formatDateKey = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getEventsForDate = (date) => {
    const dateKey = formatDateKey(date);
    return events.filter(event => event.date === dateKey);
  };

  const getTotalForDate = (date) => {
    const dayEvents = getEventsForDate(date);
    return dayEvents.reduce((total, event) => {
      return total + (event.type === 'expense' ? -event.amount : event.amount);
    }, 0);
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-100"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateKey = formatDateKey(date);
      const dayEvents = getEventsForDate(date);
      const total = getTotalForDate(date);
      const isToday = formatDateKey(new Date()) === dateKey;
      const isSelected = formatDateKey(selectedDate) === dateKey;

      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`h-24 border border-gray-200 p-2 cursor-pointer hover:bg-gray-50 transition-colors ${
            isToday ? 'bg-blue-50 border-blue-300' : ''
          } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
        >
          <div className="flex justify-between items-start mb-1">
            <span className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
              {day}
            </span>
            {dayEvents.length > 0 && (
              <div className={`w-2 h-2 rounded-full ${
                total < 0 ? 'bg-red-500' : 'bg-green-500'
              }`}></div>
            )}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map((event, idx) => (
              <div
                key={idx}
                className={`text-xs p-1 rounded truncate ${
                  event.type === 'expense' 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {event.type === 'expense' ? '-' : '+'}${event.amount}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500">+{dayEvents.length - 2} more</div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const selectedDateEvents = getEventsForDate(selectedDate);
  const selectedDateTotal = getTotalForDate(selectedDate);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
        <p className="text-gray-600">View your expenses and income by date</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {formatMonthYear(currentDate)}
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => navigateMonth('next')}
                    className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body p-0">
              {/* Day headers */}
              <div className="grid grid-cols-7 border-b border-gray-200">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="h-10 flex items-center justify-center text-sm font-medium text-gray-700 border-r border-gray-200 last:border-r-0">
                    {day}
                  </div>
                ))}
              </div>
              {/* Calendar days */}
              <div className="grid grid-cols-7">
                {renderCalendarDays()}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Date Details */}
        <div className="space-y-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Daily Total</span>
                  <span className={`text-lg font-bold ${
                    selectedDateTotal < 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {selectedDateTotal < 0 ? '-' : '+'}${Math.abs(selectedDateTotal).toFixed(2)}
                  </span>
                </div>
                
                <div className="space-y-2">
                  {selectedDateEvents.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">
                      No transactions for this date
                    </p>
                  ) : (
                    selectedDateEvents.map((event, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{event.description}</p>
                          <p className="text-xs text-gray-500">{event.type}</p>
                        </div>
                        <span className={`text-sm font-bold ${
                          event.type === 'expense' ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {event.type === 'expense' ? '-' : '+'}${event.amount.toFixed(2)}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
            </div>
            <div className="card-body space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Days</span>
                <span className="text-sm font-medium text-gray-900">{getDaysInMonth(currentDate)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Days with Activity</span>
                <span className="text-sm font-medium text-gray-900">{events.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Month Total</span>
                <span className="text-sm font-medium text-gray-900">
                  ${events.reduce((total, event) => 
                    total + (event.type === 'expense' ? -event.amount : event.amount), 0
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
