import { Route, Routes } from 'react-router-dom'
import GuestLayout from '../layouts/GuestLayout'
import Login from '../pages/Guest/Login'
import Register from '../pages/Guest/Register'
import Otp from '../pages/Guest/Otp'
import ResetPassword from '../pages/Guest/ResetPassword'
import ForgotPassword from '../pages/Guest/ForgotPassword'
import Beranda from '../pages/Guest/Beranda'
import TentangKami from '../pages/Guest/TentangKami'
import Blog from '../pages/Guest/Blog'
// 
import TestingSocketIo from '../testing/TestingSocketIo'
// 
import StudentsLayout from '../layouts/StudentsLayout'
import BerandaSiswa from '../pages/Students/BerandaSiswa';
import KelasSiswa from '../pages/Students/KelasSiswa';
import PengajarSiswa from '../pages/Students/PengajarSiswa';
const AppRouter = () => {
    return (
        <Routes>
            {/* Guest routes */}
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
            {/* Student routes */}
            <Route element={<StudentsLayout />}>
                <Route path="/siswa" element={<BerandaSiswa />} />
                <Route path="/siswa/kelas" element={<KelasSiswa />} />
                <Route path="/siswa/pengajar" element={<PengajarSiswa />} />
            </Route>
        </Routes>
    )
}

export default AppRouter;