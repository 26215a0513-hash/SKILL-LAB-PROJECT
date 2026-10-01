import { 
  db, 
  collection, 
  getDocs, 
  setDoc, 
  doc, 
  updateDoc, 
  deleteDoc,
  handleFirestoreError,
  OperationType 
} from '../lib/firebase';
import { 
  Course, 
  SubjectAttendanceSummary, 
  Assignment, 
  Submission, 
  Exam, 
  SemesterTranscript, 
  NotificationItem, 
  MessageItem, 
  LeaveExemption,
  TimetableSlot
} from '../types';
import { 
  INITIAL_COURSES, 
  INITIAL_ATTENDANCE_SUMMARIES, 
  INITIAL_ASSIGNMENTS, 
  INITIAL_SUBMISSIONS, 
  INITIAL_EXAMS, 
  INITIAL_TRANSCRIPTS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_MESSAGES, 
  INITIAL_EXEMPTIONS,
  WEEKLY_TIMETABLE
} from './mockData';

class DataService {
  private courses: Course[] = [];
  private attendanceSummaries: SubjectAttendanceSummary[] = [];
  private assignments: Assignment[] = [];
  private submissions: Submission[] = [];
  private exams: Exam[] = [];
  private transcripts: SemesterTranscript[] = [];
  private notifications: NotificationItem[] = [];
  private messages: MessageItem[] = [];
  private exemptions: LeaveExemption[] = [];
  private timetable: Record<string, TimetableSlot[]> = {};

  constructor() {
    this.initLocalCache();
  }

  private initLocalCache() {
    const load = (key: string, fallback: any) => {
      try {
        const item = localStorage.getItem('campuspulse_' + key);
        return item ? JSON.parse(item) : fallback;
      } catch (e) {
        return fallback;
      }
    };

    this.courses = load('courses', INITIAL_COURSES);
    this.attendanceSummaries = load('attendance', INITIAL_ATTENDANCE_SUMMARIES);
    this.assignments = load('assignments', INITIAL_ASSIGNMENTS);
    this.submissions = load('submissions', INITIAL_SUBMISSIONS);
    this.exams = load('exams', INITIAL_EXAMS);
    this.transcripts = load('transcripts', INITIAL_TRANSCRIPTS);
    this.notifications = load('notifications', INITIAL_NOTIFICATIONS);
    this.messages = load('messages', INITIAL_MESSAGES);
    this.exemptions = load('exemptions', INITIAL_EXEMPTIONS);
    this.timetable = load('timetable', WEEKLY_TIMETABLE);
  }

  private saveLocal(key: string, data: any) {
    try {
      localStorage.setItem('campuspulse_' + key, JSON.stringify(data));
    } catch (e) {
      console.warn('Local storage save failed', e);
    }
  }

  // --- Courses ---
  async getCourses(): Promise<Course[]> {
    try {
      const snap = await getDocs(collection(db, 'courses'));
      if (!snap.empty) {
        const list = snap.docs.map(d => ({ ...d.data(), id: d.id })) as Course[];
        this.courses = list;
        this.saveLocal('courses', list);
        return list;
      }
    } catch (err) {
      // Non-fatal, use cached
    }
    return this.courses;
  }

  async addCourse(course: Omit<Course, 'id'>): Promise<Course> {
    const id = 'course-' + Date.now();
    const newCourse: Course = { ...course, id };
    this.courses.unshift(newCourse);
    this.saveLocal('courses', this.courses);

    try {
      await setDoc(doc(db, 'courses', id), newCourse);
    } catch (err) {
      console.warn('Firestore write fallback', err);
    }
    return newCourse;
  }

  // --- Attendance ---
  async getAttendanceSummaries(): Promise<SubjectAttendanceSummary[]> {
    return this.attendanceSummaries;
  }

  async updateSubjectAttendance(code: string, deltaPresent: number, deltaAbsent: number) {
    this.attendanceSummaries = this.attendanceSummaries.map(item => {
      if (item.code === code) {
        const newAttended = Math.max(0, item.attended + deltaPresent);
        const newAbsent = Math.max(0, item.absent + deltaAbsent);
        const newTotal = newAttended + newAbsent + item.odLeave;
        const newPercentage = newTotal > 0 ? parseFloat(((newAttended / newTotal) * 100).toFixed(1)) : 100;
        let newStatus: 'Safe' | 'Warning' | 'Exceptional' = 'Safe';
        if (newPercentage < 75) newStatus = 'Warning';
        else if (newPercentage >= 95) newStatus = 'Exceptional';

        return {
          ...item,
          attended: newAttended,
          absent: newAbsent,
          totalSessions: newTotal,
          percentage: newPercentage,
          status: newStatus
        };
      }
      return item;
    });
    this.saveLocal('attendance', this.attendanceSummaries);
    return this.attendanceSummaries;
  }

  // --- Coursework / Assignments ---
  async getAssignments(): Promise<Assignment[]> {
    try {
      const snap = await getDocs(collection(db, 'assignments'));
      if (!snap.empty) {
        const list = snap.docs.map(d => ({ ...d.data(), id: d.id })) as Assignment[];
        this.assignments = list;
        this.saveLocal('assignments', list);
        return list;
      }
    } catch (err) {
      // Non-fatal
    }
    return this.assignments;
  }

  async addAssignment(assignment: Omit<Assignment, 'id'>): Promise<Assignment> {
    const id = 'assign-' + Date.now();
    const item: Assignment = { ...assignment, id, createdAt: new Date().toISOString() };
    this.assignments.unshift(item);
    this.saveLocal('assignments', this.assignments);

    try {
      await setDoc(doc(db, 'assignments', id), item);
    } catch (err) {
      console.warn('Firestore write fallback', err);
    }
    return item;
  }

  // --- Submissions ---
  async getSubmissions(): Promise<Submission[]> {
    try {
      const snap = await getDocs(collection(db, 'submissions'));
      if (!snap.empty) {
        const list = snap.docs.map(d => ({ ...d.data(), id: d.id })) as Submission[];
        this.submissions = list;
        this.saveLocal('submissions', list);
        return list;
      }
    } catch (err) {
      // Non-fatal
    }
    return this.submissions;
  }

  async submitAssignment(data: {
    assignmentId: string;
    studentId: string;
    studentName: string;
    studentNumber: string;
    fileName: string;
    fileSize: string;
    notes?: string;
    honorCodeAccepted: boolean;
  }): Promise<Submission> {
    const id = 'sub-' + Date.now();
    const targetAssign = this.assignments.find(a => a.id === data.assignmentId);
    const newSubmission: Submission = {
      id,
      assignmentId: data.assignmentId,
      assignmentTitle: targetAssign?.title || 'Coursework Submission',
      subjectCode: targetAssign?.subjectCode || 'CS-500',
      studentId: data.studentId,
      studentName: data.studentName,
      studentNumber: data.studentNumber,
      submittedAt: 'Just Now',
      status: 'submitted',
      fileName: data.fileName || 'submission_package.zip',
      fileSize: data.fileSize || '3.4 MB',
      notes: data.notes || '',
      honorCodeAccepted: data.honorCodeAccepted
    };

    this.submissions.unshift(newSubmission);
    this.saveLocal('submissions', this.submissions);

    // Update assignment state if matched
    if (targetAssign) {
      targetAssign.completionStage = '100% Submitted';
      targetAssign.completionPercent = 100;
      this.saveLocal('assignments', this.assignments);
    }

    try {
      await setDoc(doc(db, 'submissions', id), newSubmission);
    } catch (err) {
      console.warn('Firestore write fallback', err);
    }

    return newSubmission;
  }

  async gradeSubmission(submissionId: string, score: number, letterGrade: string, feedback: string) {
    this.submissions = this.submissions.map(sub => {
      if (sub.id === submissionId) {
        return {
          ...sub,
          score,
          letterGrade,
          feedback,
          status: 'graded'
        };
      }
      return sub;
    });
    this.saveLocal('submissions', this.submissions);

    try {
      await updateDoc(doc(db, 'submissions', submissionId), {
        score,
        letterGrade,
        feedback,
        status: 'graded'
      });
    } catch (err) {
      console.warn('Firestore write fallback', err);
    }
  }

  // --- Exams & Results ---
  async getExams(): Promise<Exam[]> {
    return this.exams;
  }

  async addExam(exam: Omit<Exam, 'id'>): Promise<Exam> {
    const id = 'exam-' + Date.now();
    const newExam: Exam = { ...exam, id };
    this.exams.push(newExam);
    this.saveLocal('exams', this.exams);

    try {
      await setDoc(doc(db, 'exams', id), newExam);
    } catch (err) {
      console.warn(err);
    }
    return newExam;
  }

  async getTranscripts(): Promise<SemesterTranscript[]> {
    return this.transcripts;
  }

  // --- Leave / Exemptions ---
  async getExemptions(): Promise<LeaveExemption[]> {
    return this.exemptions;
  }

  async applyExemption(data: Omit<LeaveExemption, 'id' | 'status' | 'submittedAt'>): Promise<LeaveExemption> {
    const id = 'ex-' + Date.now();
    const newExemption: LeaveExemption = {
      ...data,
      id,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    this.exemptions.unshift(newExemption);
    this.saveLocal('exemptions', this.exemptions);

    try {
      await setDoc(doc(db, 'exemptions', id), newExemption);
    } catch (err) {
      console.warn(err);
    }
    return newExemption;
  }

  async updateExemptionStatus(id: string, status: 'approved' | 'rejected') {
    this.exemptions = this.exemptions.map(e => e.id === id ? { ...e, status } : e);
    this.saveLocal('exemptions', this.exemptions);
    try {
      await updateDoc(doc(db, 'exemptions', id), { status });
    } catch (err) {
      console.warn(err);
    }
  }

  // --- Notifications ---
  async getNotifications(): Promise<NotificationItem[]> {
    return this.notifications;
  }

  async markNotificationAsRead(id: string) {
    this.notifications = this.notifications.map(n => n.id === id ? { ...n, read: true } : n);
    this.saveLocal('notifications', this.notifications);
  }

  async markAllNotificationsRead() {
    this.notifications = this.notifications.map(n => ({ ...n, read: true }));
    this.saveLocal('notifications', this.notifications);
  }

  async addNotification(notif: Omit<NotificationItem, 'id' | 'read' | 'timestamp'>) {
    const id = 'notif-' + Date.now();
    const item: NotificationItem = {
      ...notif,
      id,
      read: false,
      timestamp: 'Just Now'
    };
    this.notifications.unshift(item);
    this.saveLocal('notifications', this.notifications);
    return item;
  }

  // --- Messages ---
  async getMessages(): Promise<MessageItem[]> {
    return this.messages;
  }

  async sendMessage(senderId: string, senderName: string, senderRole: any, recipientId: string, recipientName: string, content: string) {
    const id = 'msg-' + Date.now();
    const conversationId = [senderId, recipientId].sort().join('-');
    const newMsg: MessageItem = {
      id,
      conversationId,
      senderId,
      senderName,
      senderRole,
      recipientId,
      recipientName,
      content,
      timestamp: 'Just now',
      read: false
    };
    this.messages.push(newMsg);
    this.saveLocal('messages', this.messages);

    try {
      await setDoc(doc(db, 'messages', id), newMsg);
    } catch (err) {
      console.warn(err);
    }
    return newMsg;
  }

  // --- Timetable ---
  async getWeeklyTimetable(): Promise<Record<string, TimetableSlot[]>> {
    return this.timetable;
  }
}

export const dataService = new DataService();
