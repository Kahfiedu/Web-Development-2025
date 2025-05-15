import { Outlet } from "react-router-dom";
import Navbar from "../components/students/Navbar";
import Footer from "../components/students/Footer";

export default function StudentsLayout() {
    return (
        <div className="min-h-screen m-0 p-0">
            <Navbar />

            <main className="flex-grow">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
