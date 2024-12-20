import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

interface LayoutProps {
    particlesComponent?: React.ReactNode;
}

const Layout = ({ particlesComponent }: LayoutProps) => {
    return (
        <div className="relative">
            {particlesComponent && (
                <div className="absolute inset-0 -z-10">
                    {particlesComponent}
                </div>
            )}
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;
