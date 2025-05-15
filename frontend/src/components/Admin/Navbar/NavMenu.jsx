import { Link, useLocation } from 'react-router-dom';
import { HiHome, HiUser, HiClipboardList } from 'react-icons/hi';

const dataMenu = [
    {
        title: "Dashboard",
        link: "/admin/dashboard",
        icon: <HiHome size={20} />
    },
    {
        title: "Users",
        link: "/admin/users",
        icon: <HiUser size={20} />
    },
    {
        title: "Tasks",
        link: "/admin/tasks",
        icon: <HiClipboardList size={20} />
    }
];

function NavMenu() {
    const location = useLocation();

    return (
        <div className="flex gap-4 bg-white p-2 rounded-lg">
            {dataMenu.map((menu, index) => {
                const isActive = location.pathname === menu.link;
                return (
                    <Link
                        key={index}
                        to={menu.link}
                        className={`flex items-center gap-2 px-5 py-3 rounded-md 
                            ${isActive ? 'bg-kahf-green text-white font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                        {menu.icon}
                        <span>{menu.title}</span>
                    </Link>
                );
            })}
        </div>
    );
}

export default NavMenu;
