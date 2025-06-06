import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Guest/Navbar";
import Footer from "../components/Guest/Footer";

export default function GuestLayout() {
    const location = useLocation();
    const hideNavbarPaths = ['/login', '/register', '/forgot-password', '/reset-password', '/otp', '/admin/login'];
    const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);
    return (
        <div className="min-h-screen flex flex-col m-0 p-0">

            {!shouldHideNavbar && <Navbar />}

            {/* Halaman Child (Login / Home) */}
            <div className={`min-h-[100vh]`}>
                <Outlet />
            </div>

            {!shouldHideNavbar && <Footer />}
        </div>
    )
}
