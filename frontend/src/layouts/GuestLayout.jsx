import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function GuestLayout() {
    const location = useLocation();
    const hideNavbarPaths = ['/masuk', '/daftar'];
    const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);
    return (
        <div className="min-h-screen flex flex-col m-0 p-0">

            {!shouldHideNavbar && <Navbar />}

            {/* Halaman Child (Login / Home) */}
            <div className='min-h-[100vh] pt-10'>
                <Outlet />
            </div>

            {!shouldHideNavbar && <Footer />}
        </div>
    )
}
