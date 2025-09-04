import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import MobileNavbar from "./Mobile";
import DesktopNavbar from "./Desktop";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
            <div className="container mx-auto px-6 md:px-12 py-4 flex justify-between items-center md:max-w-6xl">
                <NavLink
                    to="/"
                    className="text-2xl font-bold text-indigo-600"
                    onClick={closeMenu}
                >
                    Gourango.
                </NavLink>

                <DesktopNavbar />

                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-slate-600 hover:text-indigo-600"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {isOpen && <MobileNavbar closeMenu={closeMenu} />}
        </nav>
    );
};

export default Navbar;
