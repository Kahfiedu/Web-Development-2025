// src/router/AppRouter.jsx
import { Route, Routes } from 'react-router-dom';
import GuestLayout from '@/layouts/GuestLayout';
import AdminLayout from '@/layouts/AdminLayout';

// Guest Pages
import Beranda from '@/pages/Guest/Beranda';
import TentangKami from '@/pages/Guest/TentangKami';
import Login from '@/pages/Guest/login/Login';
import Register from '@/pages/Guest/Register';
import Blog from '@/pages/Guest/Blog';
import Otp from '@/pages/Guest/Otp';
import ResetPassword from '@/pages/Guest/ResetPassword';
import ForgotPassword from '@/pages/Guest/ForgotPassword';
import LoginAdmin from '@/pages/Guest/login/LoginAdmin';

// Auth Pages
import BerandaSiswa from '../pages/Auth/beranda/BerandaSiswa';
import KelasSiswa from '../pages/Auth/kelas/KelasSiswa';
import PengajarSiswa from '../pages/Auth/pengajar/PengajarSiswa';

// Admin Pages
import DashboardAdmin from '@/pages/Admin/dashboard/DashboardAdmin';
import UserList from '@/pages/Admin/user/UserList';
import UserDetail from '@/pages/Admin/user/UserDetail';
import CourseList from '@/pages/Admin/course/CourseList';
import CourseDetail from '@/pages/Admin/course/CourseDetail';
import ProtectedRoute from './ProtectedRoute';
import CategoryList from '../pages/Admin/settings/category/CategoryList';
import PaymentMethodList from '../pages/Admin/settings/payment-method/PaymentMethodList';
import RegionList from '../pages/Admin/settings/region/RegionList';
import RoleList from '../pages/Admin/settings/role/RoleList';
import InvoiceList from '../pages/Admin/invoice/InvoiceList';
import ClassList from '../pages/Admin/class/ClassList';
import BlogList from '../pages/Admin/blog/BlogList';
import CourseCreate from '../pages/Admin/course/CourseCreate';
import CourseEdit from '../pages/Admin/course/CourseEdit';
import AuthLayout from '../layouts/AuthLayout';

const AppRouter = () => (
    <Routes>
        <Route element={<GuestLayout />}>
            <Route path="/" element={<Beranda />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/tentangkami" element={<TentangKami />} />
        </Route>

        <Route element={<AuthLayout />}>
            <Route path="/siswa" element={<BerandaSiswa />} />
            <Route path="/siswa/kelas" element={<KelasSiswa />} />
            <Route path="/siswa/pengajar" element={<PengajarSiswa />} />
        </Route>

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
            <Route path="user" element={<UserList />} />
            <Route path="user/detail" element={<UserDetail />} />
            <Route path="course" element={<CourseList />} />
            <Route path="course/detail" element={<CourseDetail />} />
            <Route path="course/create" element={<CourseCreate />} />
            <Route path="course/edit" element={<CourseEdit />} />
            <Route path="class" element={<ClassList />} />
            <Route path="blog" element={<BlogList />} />
            <Route path="blog/detail" element={<CourseDetail />} />
            <Route path="category" element={<CategoryList />} />
            <Route path="payment-method" element={<PaymentMethodList />} />
            <Route path="region" element={<RegionList />} />
            <Route path="role" element={<RoleList />} />
            <Route path="invoice" element={<InvoiceList />} />
        </Route>
    </Routes>
);

export default AppRouter;
