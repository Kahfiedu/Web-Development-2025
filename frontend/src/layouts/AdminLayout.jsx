
import { Outlet, useLocation } from 'react-router-dom'; // <--- import useLocation
import FooterAdmin from '../components/Admin/FooterAdmin';
import { Box } from '@mui/material';
import NavbarAdmin from '../components/Admin/NavbarAdmin';

export default function AdminLayout() {
    const location = useLocation(); // <--- akses path sekarang

    const isLoginPage = location.pathname === '/admin/login'; // <--- cek apakah lagi di login

    return (
        <Box className="flex flex-col min-h-screen bg-gray-100 text-black">

            {/* Navbar */}
            {!isLoginPage && (
                <NavbarAdmin />
            )}
            <div>
                <Outlet />
            </div>
            {/* Footer */}
            {!isLoginPage && (
                <FooterAdmin />
            )}

        </Box>
    );
}
