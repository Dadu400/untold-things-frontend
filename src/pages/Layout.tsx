import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ParticlesBackground from "../ParticlesBackground";

interface LayoutProps {
    useParticles?: boolean;
}

const Layout = ({ useParticles = false } : LayoutProps) => {
    return (
        <div className="relative">
            {useParticles && (
                <div className="absolute inset-0 -z-10">
                    <ParticlesBackground />
                </div>
            )}
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;