import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';

// Public Pages
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentAnnouncements } from './pages/student/Announcements';
import { StudentAssignments } from './pages/student/Assignments';
import { StudentGrades } from './pages/student/Grades';
import { StudentAttendance } from './pages/student/Attendance';
import { StudentSchedule } from './pages/student/Schedule';
import { StudentMessages } from './pages/student/Messages';
import { StudentProfile } from './pages/student/Profile';

// Teacher Pages
import { TeacherDashboard } from './pages/teacher/TeacherDashboard';
import { TeacherAnnouncements } from './pages/teacher/Announcements';
import { CreateAssignment } from './pages/teacher/CreateAssignment';
import { Submissions } from './pages/teacher/Submissions';
import { MarkAttendance } from './pages/teacher/MarkAttendance';
import { TeacherGrades } from './pages/teacher/Grades';
import { TeacherStudents } from './pages/teacher/Students';
import { TeacherMessages } from './pages/teacher/Messages';
import { TeacherProfile } from './pages/teacher/Profile';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { UserManagement } from './pages/admin/UserManagement';
import { RolesPermissions } from './pages/admin/RolesPermissions';
import { SystemAnnouncements } from './pages/admin/SystemAnnouncements';
import { AuditLogs } from './pages/admin/AuditLogs';
import { Settings } from './pages/admin/Settings';
import { AdminProfile } from './pages/admin/Profile';

// Administrator Pages
import { AdministratorDashboard } from './pages/administrator/AdministratorDashboard';
import { InstitutionalOverview } from './pages/administrator/InstitutionalOverview';
import { ResourceManagement } from './pages/administrator/ResourceManagement';
import { Reports } from './pages/administrator/Reports';
import { DepartmentManagement } from './pages/administrator/DepartmentManagement';
import { FinanceOverview } from './pages/administrator/FinanceOverview';
import { Notices } from './pages/administrator/Notices';
import { AdministratorProfile } from './pages/administrator/Profile';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login/:role" element={<Login />} />
          <Route path="/signup/:role" element={<Signup />} />

          {/* Student Routes */}
          <Route
            path="/student/dashboard"
            element={
              <PrivateRoute requiredRole="student">
                <StudentDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/announcements"
            element={
              <PrivateRoute requiredRole="student">
                <StudentAnnouncements />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/assignments"
            element={
              <PrivateRoute requiredRole="student">
                <StudentAssignments />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/grades"
            element={
              <PrivateRoute requiredRole="student">
                <StudentGrades />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/attendance"
            element={
              <PrivateRoute requiredRole="student">
                <StudentAttendance />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/schedule"
            element={
              <PrivateRoute requiredRole="student">
                <StudentSchedule />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/messages"
            element={
              <PrivateRoute requiredRole="student">
                <StudentMessages />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/profile"
            element={
              <PrivateRoute requiredRole="student">
                <StudentProfile />
              </PrivateRoute>
            }
          />

          {/* Teacher Routes */}
          <Route
            path="/teacher/dashboard"
            element={
              <PrivateRoute requiredRole="teacher">
                <TeacherDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/teacher/announcements"
            element={
              <PrivateRoute requiredRole="teacher">
                <TeacherAnnouncements />
              </PrivateRoute>
            }
          />
          <Route
            path="/teacher/create-assignment"
            element={
              <PrivateRoute requiredRole="teacher">
                <CreateAssignment />
              </PrivateRoute>
            }
          />
          <Route
            path="/teacher/submissions"
            element={
              <PrivateRoute requiredRole="teacher">
                <Submissions />
              </PrivateRoute>
            }
          />
          <Route
            path="/teacher/mark-attendance"
            element={
              <PrivateRoute requiredRole="teacher">
                <MarkAttendance />
              </PrivateRoute>
            }
          />
          <Route
            path="/teacher/grades"
            element={
              <PrivateRoute requiredRole="teacher">
                <TeacherGrades />
              </PrivateRoute>
            }
          />
          <Route
            path="/teacher/students"
            element={
              <PrivateRoute requiredRole="teacher">
                <TeacherStudents />
              </PrivateRoute>
            }
          />
          <Route
            path="/teacher/messages"
            element={
              <PrivateRoute requiredRole="teacher">
                <TeacherMessages />
              </PrivateRoute>
            }
          />
          <Route
            path="/teacher/profile"
            element={
              <PrivateRoute requiredRole="teacher">
                <TeacherProfile />
              </PrivateRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute requiredRole="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <PrivateRoute requiredRole="admin">
                <UserManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/roles-permissions"
            element={
              <PrivateRoute requiredRole="admin">
                <RolesPermissions />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/announcements"
            element={
              <PrivateRoute requiredRole="admin">
                <SystemAnnouncements />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/audit-logs"
            element={
              <PrivateRoute requiredRole="admin">
                <AuditLogs />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <PrivateRoute requiredRole="admin">
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <PrivateRoute requiredRole="admin">
                <AdminProfile />
              </PrivateRoute>
            }
          />

          {/* Administrator Routes */}
          <Route
            path="/administrator/dashboard"
            element={
              <PrivateRoute requiredRole="administrator">
                <AdministratorDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/administrator/overview"
            element={
              <PrivateRoute requiredRole="administrator">
                <InstitutionalOverview />
              </PrivateRoute>
            }
          />
          <Route
            path="/administrator/resources"
            element={
              <PrivateRoute requiredRole="administrator">
                <ResourceManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/administrator/reports"
            element={
              <PrivateRoute requiredRole="administrator">
                <Reports />
              </PrivateRoute>
            }
          />
          <Route
            path="/administrator/departments"
            element={
              <PrivateRoute requiredRole="administrator">
                <DepartmentManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/administrator/finance"
            element={
              <PrivateRoute requiredRole="administrator">
                <FinanceOverview />
              </PrivateRoute>
            }
          />
          <Route
            path="/administrator/notices"
            element={
              <PrivateRoute requiredRole="administrator">
                <Notices />
              </PrivateRoute>
            }
          />
          <Route
            path="/administrator/profile"
            element={
              <PrivateRoute requiredRole="administrator">
                <AdministratorProfile />
              </PrivateRoute>
            }
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
