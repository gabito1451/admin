'use client';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface DatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (startDate: Date | null, endDate: Date | null, selectedRange: string) => void;
  initialStartDate?: Date | null;
  initialEndDate?: Date | null;
  initialRange?: string;
}

interface DateObj {
  day: number;
  isCurrentMonth: boolean;
  isNextMonth: boolean;
  date: Date;
}

export const DatePickerModal: React.FC<DatePickerModalProps> = ({
  isOpen,
  onClose,
  onApply,
  initialStartDate = null,
  initialEndDate = null,
  initialRange = 'Last week',
}) => {
  const [selectedDateRange, setSelectedDateRange] = useState(initialRange);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 0)); // January 2025
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(initialStartDate);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(initialEndDate);
  const [customStartDate, setCustomStartDate] = useState(
    initialStartDate ? formatDateInput(initialStartDate) : 'Jan 6, 2025'
  );
  const [customEndDate, setCustomEndDate] = useState(
    initialEndDate ? formatDateInput(initialEndDate) : 'Jan 13, 2025'
  );

  const dateRangeOptions = [
    'Today',
    'Yesterday',
    'This week',
    'Last week',
    'This month',
    'Last month',
    'This year',
    'Last year',
    'All time',
  ];

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  function formatDateInput(date: Date): string {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }

  function parseDateInput(dateStr: string): Date | null {
    try {
      const date = new Date(dateStr);
      return isNaN(date.getTime()) ? null : date;
    } catch {
      return null;
    }
  }

  const getDateRangeDates = (range: string): { start: Date | null; end: Date | null } => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (range) {
      case 'Today':
        return { start: today, end: today };
      case 'Yesterday':
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        return { start: yesterday, end: yesterday };
      case 'This week':
        const thisWeekStart = new Date(today);
        thisWeekStart.setDate(today.getDate() - today.getDay());
        return { start: thisWeekStart, end: today };
      case 'Last week':
        const lastWeekEnd = new Date(today);
        lastWeekEnd.setDate(today.getDate() - today.getDay() - 1);
        const lastWeekStart = new Date(lastWeekEnd);
        lastWeekStart.setDate(lastWeekEnd.getDate() - 6);
        return { start: lastWeekStart, end: lastWeekEnd };
      case 'This month':
        const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        return { start: thisMonthStart, end: today };
      case 'Last month':
        const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
        return { start: lastMonthStart, end: lastMonthEnd };
      case 'This year':
        const thisYearStart = new Date(today.getFullYear(), 0, 1);
        return { start: thisYearStart, end: today };
      case 'Last year':
        const lastYearStart = new Date(today.getFullYear() - 1, 0, 1);
        const lastYearEnd = new Date(today.getFullYear() - 1, 11, 31);
        return { start: lastYearStart, end: lastYearEnd };
      case 'All time':
        return { start: null, end: null };
      default:
        return { start: selectedStartDate, end: selectedEndDate };
    }
  };

  const getDaysInMonth = (date: Date): DateObj[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0

    const days: DateObj[] = [];

    // Add previous month's trailing days
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = prevMonth.getDate() - i;
      days.push({
        day,
        isCurrentMonth: false,
        isNextMonth: false,
        date: new Date(year, month - 1, day),
      });
    }

    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isCurrentMonth: true,
        isNextMonth: false,
        date: new Date(year, month, day),
      });
    }

    // Add next month's leading days
    const remainingCells = 42 - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        isNextMonth: true,
        date: new Date(year, month + 1, day),
      });
    }

    return days;
  };

  const getNextMonth = (): Date => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth;
  };

  const handleDateRangeSelect = (range: string) => {
    setSelectedDateRange(range);
    const { start, end } = getDateRangeDates(range);
    setSelectedStartDate(start);
    setSelectedEndDate(end);

    if (start) setCustomStartDate(formatDateInput(start));
    if (end) setCustomEndDate(formatDateInput(end));
  };

  const handleDateClick = (dateObj: DateObj) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      // Start new selection
      setSelectedStartDate(dateObj.date);
      setSelectedEndDate(null);
      setCustomStartDate(formatDateInput(dateObj.date));
      setSelectedDateRange('Custom');
    } else if (dateObj.date >= selectedStartDate) {
      // Set end date
      setSelectedEndDate(dateObj.date);
      setCustomEndDate(formatDateInput(dateObj.date));
    } else {
      // Clicked date is before start date, make it the new start date
      setSelectedStartDate(dateObj.date);
      setCustomStartDate(formatDateInput(dateObj.date));
    }
  };

  const isDateSelected = (dateObj: DateObj): boolean => {
    if (!selectedStartDate) return false;

    const dateTime = dateObj.date.getTime();
    const startTime = selectedStartDate.getTime();
    const endTime = selectedEndDate?.getTime();

    if (endTime) {
      return dateTime >= startTime && dateTime <= endTime;
    }

    return dateTime === startTime;
  };

  const isDateInRange = (dateObj: DateObj): boolean => {
    if (!selectedStartDate || !selectedEndDate) return false;

    const dateTime = dateObj.date.getTime();
    const startTime = selectedStartDate.getTime();
    const endTime = selectedEndDate.getTime();

    return dateTime >= startTime && dateTime <= endTime;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleApply = () => {
    const startDate = parseDateInput(customStartDate);
    const endDate = parseDateInput(customEndDate);
    onApply(startDate, endDate, selectedDateRange);
  };

  const handleCancel = () => {
    onClose();
  };

  const handleCustomDateChange = (field: 'start' | 'end', value: string) => {
    if (field === 'start') {
      setCustomStartDate(value);
      const date = parseDateInput(value);
      if (date) setSelectedStartDate(date);
    } else {
      setCustomEndDate(value);
      const date = parseDateInput(value);
      if (date) setSelectedEndDate(date);
    }
    setSelectedDateRange('Custom');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex  items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col lg:flex-row">
          {/* Left Sidebar */}
          <div className="w-full lg:w-48 bg-gray-50 p-4 border-b lg:border-b-0 lg:border-r border-gray-200">
            <div className="flex justify-between items-center lg:hidden mb-4">
              <h3 className="font-medium">Select Date Range</h3>
              <button onClick={onClose} className="p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              {dateRangeOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleDateRangeSelect(option)}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                    selectedDateRange === option
                      ? 'bg-orange-100 text-orange-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Calendar Area */}
          <div className="flex-1 p-4 lg:p-6">
            <div className="hidden lg:flex justify-end mb-4">
              <button onClick={onClose} className="p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
              {/* First Calendar */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <button onClick={handlePrevMonth}>
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <h3 className="text-lg font-medium">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </h3>
                  <button onClick={handleNextMonth}>
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {getDaysInMonth(currentMonth).map((dateObj, index) => (
                    <button
                      key={index}
                      onClick={() => handleDateClick(dateObj)}
                      className={`
                        w-8 h-8 text-sm rounded flex items-center justify-center transition-colors
                        ${!dateObj.isCurrentMonth ? 'text-gray-400' : 'text-gray-700'}
                        ${
                          isDateSelected(dateObj)
                            ? 'bg-orange-500 text-white'
                            : isDateInRange(dateObj)
                              ? 'bg-orange-100 text-orange-700'
                              : 'hover:bg-gray-100'
                        }
                      `}
                    >
                      {dateObj.day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Second Calendar - Hidden on mobile */}
              <div className="flex-1 hidden lg:block">
                <div className="flex items-center justify-between mb-4">
                  <button onClick={handlePrevMonth}>
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <h3 className="text-lg font-medium">
                    {monthNames[getNextMonth().getMonth()]} {getNextMonth().getFullYear()}
                  </h3>
                  <button onClick={handleNextMonth}>
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {getDaysInMonth(getNextMonth()).map((dateObj, index) => (
                    <button
                      key={index}
                      onClick={() => handleDateClick(dateObj)}
                      className={`
                        w-8 h-8 text-sm rounded flex items-center justify-center transition-colors
                        ${!dateObj.isCurrentMonth ? 'text-gray-400' : 'text-gray-700'}
                        ${
                          isDateSelected(dateObj)
                            ? 'bg-orange-500 text-white'
                            : isDateInRange(dateObj)
                              ? 'bg-orange-100 text-orange-700'
                              : 'hover:bg-gray-100'
                        }
                      `}
                    >
                      {dateObj.day}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Date Range Inputs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 justify-center">
              <input
                type="text"
                value={customStartDate}
                onChange={(e) => handleCustomDateChange('start', e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm w-full sm:w-32 text-center"
                placeholder="Start date"
              />
              <span className="text-gray-500 hidden sm:block">–</span>
              <input
                type="text"
                value={customEndDate}
                onChange={(e) => handleCustomDateChange('end', e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm w-full sm:w-32 text-center"
                placeholder="End date"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
              <button
                onClick={handleCancel}
                className="w-full sm:w-auto px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="w-full sm:w-auto px-4 py-2 text-sm text-white bg-orange-500 rounded hover:bg-orange-600 transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
