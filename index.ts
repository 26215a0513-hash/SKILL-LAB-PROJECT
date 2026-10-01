export type UserRole = 'student' | 'faculty' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  studentId?: string;
  facultyId?: string;
  department: string;
  semester: string;
  phone?: string;
  avatarUrl?: string;
  currentCgpa?: number;
  attendancePercentage?: number;
  termCredits?: string;
  nextClass?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  department: string;
  credits: number;
  semester: string;
  facultyName: string;
  facultyEmail: string;
  room: string;
  totalSessions: number;
  scheduleSummary?: string;
  syllabusTopics?: string[];
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  subjectCode: string;
  subjectName: string;
  date: string;
  status: 'present' | 'absent' | 'od_leave';
  session: string;
  recordedBy: string;
}

export interface SubjectAttendanceSummary {
  code: string;
  name: string;
  faculty: string;
  departmentDivision?: string;
  totalSessions: number;
  attended: number;
  absent: number;
  odLeave: number;
  percentage: number;
  targetPercentage: number;
  status: 'Safe' | 'Warning' | 'Exceptional';
  warningMessage?: string;
}

export interface Assignment {
  id: string;
  code: string;
  title: string;
  subjectCode: string;
  subjectName: string;
  facultyId: string;
  facultyName: string;
  description: string;
  dueDate: string;
  daysRemaining?: string;
  maxMarks: number;
  gradeWeightage: string;
  priority: 'urgent' | 'medium' | 'normal';
  completionStage?: string;
  completionPercent?: number;
  assets?: { name: string; size: string; type?: string }[];
  templateRepoUrl?: string;
  requirements?: string[];
  createdAt?: string;
}

export interface Submission {
  id: string;
  assignmentId: string;
  assignmentTitle?: string;
  subjectCode?: string;
  studentId: string;
  studentName: string;
  studentNumber: string;
  submittedAt: string;
  dueDate?: string;
  status: 'submitted' | 'graded' | 'late' | 'under_review';
  fileName: string;
  fileSize: string;
  fileUrl?: string;
  notes?: string;
  score?: number;
  maxScore?: number;
  letterGrade?: string;
  feedback?: string;
  honorCodeAccepted: boolean;
}

export interface Exam {
  id: string;
  paperCode: string;
  subjectCode: string;
  subjectName: string;
  credits: number;
  date: string;
  time: string;
  durationMinutes: number;
  venue: string;
  seatDesk: string;
  invigilator: string;
  examType: 'mid_term' | 'end_term' | 'quiz';
  instructions: string;
  syllabusCoverage: string;
}

export interface CourseGradeEntry {
  code: string;
  title: string;
  faculty: string;
  credits: number;
  internalMarks: number;
  endSemMarks: number;
  totalMarks: number;
  gradePoint: number;
  letterGrade: string;
  status: 'Pass' | 'Fail';
}

export interface SemesterTranscript {
  semesterId: string;
  semesterName: string;
  academicYear: string;
  sgpa: number;
  publishedDate: string;
  controllerHash: string;
  creditsRegistered: number;
  creditsEarned: number;
  courses: CourseGradeEntry[];
}

export interface NotificationItem {
  id: string;
  recipientId: string;
  title: string;
  message: string;
  category: 'announcement' | 'assignment' | 'exam' | 'attendance' | 'system';
  timestamp: string;
  read: boolean;
  priority: 'high' | 'medium' | 'normal';
  actionUrl?: string;
  actionText?: string;
}

export interface MessageItem {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  recipientId: string;
  recipientName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface LeaveExemption {
  id: string;
  studentId: string;
  studentName: string;
  studentNumber: string;
  type: 'medical' | 'on_duty' | 'sports';
  title: string;
  reason: string;
  sessionsCount: number;
  dateRange: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  startTime: string;
  endTime: string;
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  room: string;
  type: 'Lecture' | 'Lab' | 'Tutorial' | 'Office Hours';
  topic?: string;
  status?: 'Attended' | 'NOW' | 'Upcoming' | 'Optional';
}
