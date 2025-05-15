
import { Outlet, useLocation } from 'react-router-dom'; // <--- import useLocation
import FooterAdmin from '../components/Admin/FooterAdmin';
import { Box } from '@mui/material';
import NavbarAdmin from '../components/Admin/Navbar/NavbarAdmin';

export default function AdminLayout() {
    const location = useLocation(); // <--- akses path sekarang

    const isLoginPage = location.pathname === '/admin/login'; // <--- cek apakah lagi di login

    return (
        <Box display="flex" bgcolor={"#F4F4F4"} flexDirection="column" minHeight="100vh" m={0} p={0}>
            {!isLoginPage && <NavbarAdmin />}

            <Box component="main" flexGrow={1} px={5}>
                <Outlet />
            </Box>

            {!isLoginPage && <FooterAdmin />}
        </Box>
    );
}
