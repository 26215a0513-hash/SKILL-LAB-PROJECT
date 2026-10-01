import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  fbSignOut, 
  onAuthStateChanged,
  db,
  doc,
  getDoc,
  setDoc,
  FirebaseUser,
  handleFirestoreError,
  OperationType
} from '../lib/firebase';
import { UserProfile, UserRole } from '../types';
import { DEMO_USERS, INITIAL_STUDENT_PROFILE } from '../services/mockData';

interface AuthContextType {
  currentUser: UserProfile | null;
  firebaseUser: FirebaseUser | null;
  role: UserRole;
  isAuthenticated: boolean;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  switchDemoRole: (role: UserRole) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('campuspulse_active_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_STUDENT_PROFILE;
  });
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Sync to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('campuspulse_active_user', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  // Firebase auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userDocRef);
          
          if (userSnap.exists()) {
            const data = userSnap.data() as UserProfile;
            setCurrentUser(data);
          } else {
            // Determine role: if admin email
            const isAdmin = user.email === 'chaturwedidheeraj911@gmail.com';
            const newProfile: UserProfile = {
              uid: user.uid,
              email: user.email || 'user@campus.edu',
              displayName: user.displayName || 'Campus Scholar',
              role: isAdmin ? 'admin' : 'student',
              studentId: isAdmin ? undefined : '#CS-2022-' + Math.floor(1000 + Math.random() * 9000),
              facultyId: isAdmin ? 'ADM-901' : undefined,
              department: 'School of Computing & AI',
              semester: 'Semester 5 - B.Tech CS',
              avatarUrl: user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
              currentCgpa: 3.84,
              attendancePercentage: 86.4,
              termCredits: '22/24',
              nextClass: 'Distributed Systems @ 10:30 AM (LH-302)',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            await setDoc(userDocRef, newProfile);
            setCurrentUser(newProfile);
          }
        } catch (err) {
          console.warn('Could not sync user to firestore, using local profile', err);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const isAdmin = user.email === 'chaturwedidheeraj911@gmail.com';
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email || 'user@campus.edu',
        displayName: user.displayName || 'Campus User',
        role: isAdmin ? 'admin' : 'student',
        studentId: isAdmin ? undefined : '#CS-2022-8492',
        department: 'School of Computing & AI',
        semester: 'Semester 5 - B.Tech CS',
        avatarUrl: user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        currentCgpa: 3.84,
        attendancePercentage: 86.4,
        termCredits: '22/24',
        nextClass: 'Distributed Systems @ 10:30 AM (LH-302)',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      try {
        await setDoc(doc(db, 'users', user.uid), userProfile, { merge: true });
      } catch (err) {
        console.error('Failed to save user profile to firestore', err);
      }
      setCurrentUser(userProfile);
    } catch (err) {
      console.error('Google Sign-in failed', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (firebaseUser) {
        await fbSignOut(auth);
      }
      setCurrentUser(INITIAL_STUDENT_PROFILE);
    } catch (err) {
      console.error('Error signing out', err);
    }
  };

  const switchDemoRole = (role: UserRole) => {
    const demo = DEMO_USERS.find(u => u.role === role) || INITIAL_STUDENT_PROFILE;
    setCurrentUser(demo);
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates, updatedAt: new Date().toISOString() };
    setCurrentUser(updated);

    if (firebaseUser && currentUser.uid === firebaseUser.uid) {
      try {
        await setDoc(doc(db, 'users', currentUser.uid), updated, { merge: true });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `users/${currentUser.uid}`);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        firebaseUser,
        role: currentUser?.role || 'student',
        isAuthenticated: !!currentUser,
        loading,
        loginWithGoogle,
        logout,
        switchDemoRole,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
