import React, { useState } from 'react';
import { User, Mail, Phone, Building, Award, CheckCircle2, QrCode, Shield, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface ProfileViewProps {
  onOpenDigitalId: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onOpenDigitalId }) => {
  const { currentUser, updateUserProfile } = useAuth();
  const [phone, setPhone] = useState(currentUser?.phone || '+1 (555) 392-8411');
  const [displayName, setDisplayName] = useState(currentUser?.displayName || 'Elena Vance');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await updateUserProfile({ phone, displayName });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 mb-1">
          <span className="w-2 h-2 rounded-full bg-indigo-600" />
          University Registry
        </span>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Student Academic Profile
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Official enrollment record, academic standings, and credential verification
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Profile Card with Digital ID button */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5 text-center flex flex-col items-center">
          <div className="relative">
            <img
              src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={currentUser?.displayName}
              className="w-24 h-24 rounded-3xl object-cover ring-4 ring-indigo-500/20 shadow-md"
            />
            <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-slate-900" />
          </div>

          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">{currentUser?.displayName}</h3>
            <p className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
              {currentUser?.studentId || currentUser?.facultyId || '#CS-2022-8492'}
            </p>
            <p className="text-xs text-slate-400 mt-1">{currentUser?.department}</p>
          </div>

          <div className="w-full pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Enrollment Program</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">B.Tech CS</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Current Semester</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">5th Semester</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Academic Standing</span>
              <span className="font-bold text-emerald-600">Dean's List (Honors)</span>
            </div>
          </div>

          <button
            onClick={onOpenDigitalId}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-200 dark:shadow-none transition-colors"
          >
            <QrCode className="w-4 h-4" />
            <span>Launch Digital Student ID</span>
          </button>
        </div>

        {/* Right: Editable Profile Information Form */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Profile Details</h3>
              <p className="text-xs text-slate-500">Update your verified contact and notification channels</p>
            </div>
            {saved && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" /> Saved!
              </span>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  University Email Address
                </label>
                <input
                  type="email"
                  disabled
                  value={currentUser?.email || 'elena.vance@campus.edu'}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 text-slate-500 cursor-not-allowed font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Primary Mobile / WhatsApp
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Assigned Faculty Mentor
                </label>
                <input
                  type="text"
                  disabled
                  value="Dr. Alan Vance (Distributed Systems)"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-200 dark:shadow-none transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Syncing to Firebase...' : 'Save Profile Changes'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
