import { Outlet } from "react-router-dom";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { PWAInstallProvider } from "../hooks/PWAInstallContext";

import { LayoutProps } from "../types/types";

const Layout = ({ particlesComponent, resetHomeKey }: LayoutProps) => {
    return (
        <PWAInstallProvider>
        <div className="relative min-h-[100vh] flex flex-col justify-between">
            {particlesComponent && (
                <div className="absolute inset-0 -z-10">
                    {particlesComponent}
                </div>
            )}
            <Header resetHomeKey={resetHomeKey} />
            <Outlet />
            <Footer />
        </div>
        </PWAInstallProvider>
    );
};

export default Layout;