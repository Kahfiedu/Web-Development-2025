import NavTop from "./NavTop";
import NavMenu from "./NavMenu";

export default function NavbarAdmin() {
    return (
        <nav className="w-full font-poppins gap-2 sticky flex flex-col px-[50px] py-[10px]">
            <NavTop />
            <NavMenu />
        </nav>
    )
}
