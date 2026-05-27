import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import StudentDashboard from '../pages/student/Dashboard';
import AdminDashboard from '../pages/admin/Dashboard';
import ManageUsers from '../pages/admin/ManageUsers';
import Login from '../pages/auth/Login';
import Profile from '../pages/student/Profile';
import LiveClass from '../pages/student/LiveClass';
import CourseDetails from '../pages/student/CourseDetails';
import Courses from '../pages/student/Courses';
import ProtectedRoute from './ProtectedRoute';
import AdminLiveClasses from '../pages/admin/AdminLiveClasses';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN']}>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentDashboard />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/:id" element={<CourseDetails />} />
        <Route path="profile" element={<Profile />} />
        <Route path="live" element={<LiveClass />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="live" element={<AdminLiveClasses />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;