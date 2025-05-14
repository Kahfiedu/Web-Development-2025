import { Route, Routes } from 'react-router-dom'
import TentangKami from '../pages/Guest/TentangKami'
import Beranda from '../pages/Guest/Beranda'
import GuestLayout from '../layouts/GuestLayout'
import TestingSocketIo from '../testing/TestingSocketIo'
import Login from '../pages/Guest/Login'
import Register from '../pages/Guest/Register'
import Blog from '../pages/Guest/Blog'
import Otp from '../pages/Guest/Otp'
import ResetPassword from '../pages/Guest/ResetPassword'
import ForgotPassword from '../pages/Guest/ForgotPassword'
import AdminLayout from '../layouts/AdminLayout'
import LoginAdmin from '../pages/Admin/LoginAdmin'
import ProtectedRoute from '../hooks/ProtectedRoute'
import DashboardAdmin from '../pages/Admin/dashboard/DashboardAdmin'

const AppRouter = () => {
    return (
        <Routes>
            {/* Route for guest layout */}
            <Route element={<GuestLayout />} >
                <Route path="/" element={<Beranda />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/otp" element={<Otp />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/tentangkami" element={<TentangKami />} />
                <Route path="/testing" element={<TestingSocketIo />} />
            </Route>

            {/* Route for admin layout */}
            <Route path="/admin/login" element={<LoginAdmin />} />
            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="dashboard" element={<DashboardAdmin />} />
            </Route>
        </Routes>
    )
}

export default AppRouter;