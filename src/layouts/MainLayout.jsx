import { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer/Footer";

export default function MainLayout({ children }) {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <Navbar scrolled={scrolled} />
            {children}
            <Footer />
        </>
    );
}
