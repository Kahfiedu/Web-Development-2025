import { NavLink } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-50 px-6 md:px-14 shadow-sm">
      <div className="flex items-center justify-between">
        <img
          src="src/assets/logo-kahfi.png"
          alt="Logo Kahfi"
          className="h-20"
        />

        {/* Hamburger */}
        <div className="md:hidden" onClick={() => setOpen(!open)}>
          <svg
            className="w-8 h-8 text-gray-700 cursor-pointer"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={!open ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"}
            />
          </svg>
        </div>

        {/* Menu */}
        <ul
          className={`flex flex-col md:flex-row md:gap-14 gap-6 items-center absolute md:static left-0 right-0 top-20 bg-slate-50 md:bg-transparent px-6 md:px-0 py-4 md:py-0 shadow-md md:shadow-none transition-all duration-300 ${
            open ? "block" : "hidden md:flex"
          }`}
        >
          {["Beranda", "Tentang Kami", "Layanan Kami", "Blog"].map(
            (item, i) => (
              <li key={i}>
                <NavLink
                  to={
                    item === "Beranda"
                      ? "/"
                      : "/" + item.toLowerCase().replace(/\s+/g, "-")
                  }
                  className={({ isActive }) =>
                    isActive
                      ? "text-emerald-500 font-medium"
                      : "text-slate-800 font-medium hover:text-emerald-500"
                  }
                >
                  {item}
                </NavLink>
              </li>
            )
          )}

          <li className="flex gap-3">
            <NavLink
              to="/daftar"
              className="text-white font-medium bg-emerald-400 px-4 py-1.5 rounded-md hover:bg-emerald-500"
            >
              Daftar
            </NavLink>
            <NavLink
              to="/masuk"
              className="text-white font-medium bg-emerald-400 px-4 py-1.5 rounded-md hover:bg-emerald-500"
            >
              Masuk
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
