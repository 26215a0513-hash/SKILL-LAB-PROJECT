import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { TimetableSlot } from '../../types';

interface TimetableViewProps {
  timetable: Record<string, TimetableSlot[]>;
}

export const TimetableView: React.FC<TimetableViewProps> = ({ timetable }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [selectedDay, setSelectedDay] = useState<string>('Thursday'); // Default to Thursday as in mockup

  const slots = timetable[selectedDay] || [];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-indigo-600" />
            Fall 2024 Schedule
          </span>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Weekly Academic Timetable
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time schedule with room locations and faculty office hours
          </p>
        </div>

        {/* Day Selector Pills */}
        <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs overflow-x-auto">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDay === day
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {day.slice(0, 3)}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Day View */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              {selectedDay}'s Classes &amp; Laboratories
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-500">
            {slots.length} Planned Sessions
          </span>
        </div>

        {slots.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            No scheduled lectures on {selectedDay}. Independent study and research lab access open.
          </div>
        ) : (
          <div className="space-y-4">
            {slots.map((slot) => {
              const isNow = slot.status === 'NOW';
              const isAttended = slot.status === 'Attended';

              return (
                <div
                  key={slot.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    isNow
                      ? 'border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/20 ring-2 ring-indigo-500/20'
                      : 'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-center shrink-0 w-24">
                      <span className={`text-xs font-bold ${isNow ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'}`}>
                        {slot.startTime}
                      </span>
                      <p className="text-[10px] text-slate-400 mt-0.5">to {slot.endTime}</p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono font-bold text-xs text-indigo-600 dark:text-indigo-400">
                          {slot.subjectCode}
                        </span>
                        <span className="text-slate-400">•</span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {slot.subjectName}
                        </h4>
                        {slot.topic && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                            Topic: {slot.topic}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          {slot.facultyName}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {slot.room}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[10px] font-semibold text-slate-700 dark:text-slate-300">
                          {slot.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center justify-end">
                    {isNow ? (
                      <span className="px-3 py-1 rounded-xl bg-indigo-600 text-white text-xs font-black uppercase tracking-wider shadow-sm animate-pulse">
                        In Session Now
                      </span>
                    ) : isAttended ? (
                      <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold">
                        Attended
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs font-semibold">
                        Upcoming
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
