# CampusPulse — University Student Portal & Academic Management System

CampusPulse is a modern, production-grade university management portal engineered with React 19, TypeScript, Tailwind CSS, Firebase Authentication, and Google Cloud Firestore. It provides a university workspace for students, faculty, and administrators.

---

## 🌟 Key Capabilities & Screenshots Breakdown

### 1. Student Academic Workspace (Screenshot 1 & 2)
- **Academic Hero Banner:** Live status, current term credit progress (22/24), current CGPA (3.84/4.00), and next lecture countdown.
- **Digital Identity Pass (NFC / Barcode):** Modal with candidate photo, QR code, roll identifier (`#CS-2022-8492`), and printable ID pass.
- **Attendance Analytics & Statutory Warnings:**
  - University Ordinance Sec 14.B compliance tracker (minimum 75% attendance).
  - Safety buffer indicator (e.g. 4 classes maximum cushion for boundary courses like CS-504).
  - Breakdown table with Present, Absent, and On-Duty counts.
  - Absence appeal and medical exemption filing workflow.
- **Coursework & Submissions Pipeline (Screenshot 3):**
  - Urgent countdown timers and grade weightage tags.
  - Downloadable course assets (`raft_spec_v2.4.pdf`, `starter_code_skeleton.zip`).
  - Fast Lane Quick Submit Drawer with drag-and-drop file upload, notes to teaching assistant, university honor code validation, and celebration confetti.
- **Examinations & Transcripts Ledger (Screenshot 4):**
  - Mid-Semester invigilation timetable with exam halls, desks, and invigilator names.
  - Downloadable & printable official Exam Hall Ticket.
  - Multi-semester official grade ledger with cryptographically signed controller hash (`#7F04-BC99-E5`).
  - Cumulative grade distribution (A+, A, B+) and WES transcript requests.
- **Live Faculty Direct Messaging:** Real-time consultations between students and professors.
- **Campus Bulletin & Alerts:** Filterable notifications with immediate action buttons.

### 2. Faculty Command Center
- **Class Attendance Recording:** Instant increment and decrement of lecture sessions with direct Firestore persistence.
- **Coursework Management:** Publish new assignments with deadlines and grade weightages.
- **Submissions Evaluation:** Review uploaded student solutions, assign scores out of 100, award letter grades, and attach rubrics feedback.
- **Broadcast Announcements:** Transmit urgent bulletins directly to student dashboard feeds.

### 3. Administrator Command Hub
- **Campus-Wide Overview:** Monitor enrolled student tallies (2,480+), active faculty roster, and aggregate attendance compliance.
- **Course Syllabus Provisioning:** Register accredited course codes, credit allocations, syllabus units, and lecture room assignments.
- **Student Roster Management:** Review academic standings, Dean's Honors lists, and backlogs.

---

## 🔐 Security & Database Architecture

- **Firebase Authentication:** Google Sign-in popup integration alongside instant role switcher for seamless review.
- **Cloud Firestore Persistence:** Real-time document collections for `users`, `courses`, `attendance`, `assignments`, `submissions`, `exams`, `results`, `notifications`, `messages`, and `exemptions`.
- **Zero-Trust Attribute-Based Access Control (ABAC):** Strict security rules defined in `firestore.rules` and deployed to Firebase:
  - Role-based authorization: Students can only modify their own submissions and profiles.
  - Faculty/Admin validation: Attendance logs, assignments, and exam schedules can only be published by authenticated staff.
  - Audit protection: Default deny catch-all rule on unmatched document paths.

---

## 🚀 Demo Accounts & Instant Switching

You can switch roles directly using the top toggle pill in the sidebar:

1. **Student Account:**
   - **Identity:** Elena Vance
   - **Student ID:** `#CS-2022-8492`
   - **Program:** B.Tech Computer Science (Semester 5)
   - **Status:** Dean's Honors List Awardee

2. **Faculty Account:**
   - **Identity:** Dr. Alan Vance
   - **Faculty ID:** `FAC-CS-104`
   - **Role:** Lead Faculty — Systems Division


   - <img width="927" height="741" alt="Screenshot 2026-10-01 195433" src="https://github.com/user-attachments/assets/d0b983bb-43d6-4d96-84d8-472314019bf2" />
   <img width="912" height="736" alt="Screenshot 2026-10-01 195502" src="https://github.com/user-attachments/assets/f8f39639-6a22-4cbb-a969-a613f924191d" />
   <img width="910" height="737" alt="Screenshot 2026-10-01 195540" src="https://github.com/user-attachments/assets/eedc727b-623a-4e6c-a688-77e1080f9fdf" />
   <img width="915" height="733" alt="Screenshot 2026-10-01 195521" src="https://github.com/user-attachments/assets/c405b21a-d1dd-447d-829e-9042fcf3e1f3" />




