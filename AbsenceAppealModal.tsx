import React, { useState } from 'react';
import { X, Send, FileCheck, CheckCircle2 } from 'lucide-react';
import { dataService } from '../../services/dataService';
import { useAuth } from '../../context/AuthContext';

interface AbsenceAppealModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubjectCode?: string;
  onSuccess: () => void;
}

export const AbsenceAppealModal: React.FC<AbsenceAppealModalProps> = ({
  isOpen,
  onClose,
  defaultSubjectCode = 'CS-504',
  onSuccess
}) => {
  const { currentUser } = useAuth();
  const [type, setType] = useState<'medical' | 'on_duty' | 'sports'>('medical');
  const [title, setTitle] = useState(defaultSubjectCode ? `Absence Appeal for ${defaultSubjectCode}` : 'Medical Exemption Request');
  const [reason, setReason] = useState('');
  const [sessionsCount, setSessionsCount] = useState(2);
  const [dateRange, setDateRange] = useState('Nov 02 - Nov 04, 2024');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setSubmitting(true);

    try {
      await dataService.applyExemption({
        studentId: currentUser.uid,
        studentName: currentUser.displayName,
        studentNumber: currentUser.studentId || '#CS-2022-8492',
        type,
        title,
        reason,
        sessionsCount: Number(sessionsCount),
        dateRange
      });

      // Also create an alert notification
      await dataService.addNotification({
        recipientId: currentUser.uid,
        title: `Exemption Submitted: ${title}`,
        message: `Your request for ${sessionsCount} sessions (${type.toUpperCase()}) was forwarded to Dean Academic Review.`,
        category: 'attendance',
        priority: 'medium'
      });

      setSubmitted(true);
      setTimeout(() => {
        onSuccess();
        onClose();
        setSubmitted(false);
      }, 1400);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Submit Attendance Exemption / Appeal</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Exemption Logged Successfully</h4>
            <p className="text-xs text-slate-500">Your claim has been submitted to the Department Head and Academic Advisor for validation.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Exemption Category
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['medical', 'on_duty', 'sports'] as const).map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => setType(cat)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold capitalize border transition-all ${
                      type === cat
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {cat.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Subject or Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Missed Sessions Count
                </label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={sessionsCount}
                  onChange={(e) => setSessionsCount(Number(e.target.value))}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Dates Applicable
                </label>
                <input
                  type="text"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  placeholder="e.g. Nov 02 - Nov 04, 2024"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Justification & Medical / Official Notes
              </label>
              <textarea
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                placeholder="Provide medical certificate details or university competition representation order ID..."
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center gap-1.5 shadow-md shadow-indigo-200 dark:shadow-none transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? 'Submitting...' : 'Transmit Appeal'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
