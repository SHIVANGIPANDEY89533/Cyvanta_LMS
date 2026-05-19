import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import StudentDashboard from '../pages/student/Dashboard';
import AdminDashboard from '../pages/admin/Dashboard';
import Login from '../pages/auth/Login';
import Profile from '../pages/student/Profile';
import LiveClass from '../pages/student/LiveClass';
import CourseDetails from '../pages/student/CourseDetails';
import Courses from '../pages/student/Courses';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Standalone Login Route (No Sidebar/Topbar) */}
      <Route path="/login" element={<Login />} />

      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Protected Routes (With Sidebar/Topbar Layout) */}
      <Route element={<MainLayout />}>
        {/* Student Routes */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/courses" element={<Courses />} />
        <Route path="/student/courses/:id" element={<CourseDetails />} />
        <Route path="/student/profile" element={<Profile />} />
        <Route path="/student/live" element={<LiveClass />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;