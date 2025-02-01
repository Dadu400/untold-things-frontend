import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";

import './index.css';

import Layout from "./pages/Layout";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";
import Submit from "./pages/Submit";
import Terms from "./pages/Terms";
import SinglePostPage from "./pages/SinglePostPage";

import HeartParticlesBackground from "./components/particles/HeartParticlesBackground";
import ParticlesBackground from "./components/particles/ParticlesBackground";

export default function App() {
    const [homeKey, setHomeKey] = useState(0);

    const resetHomeKey = () => {
        setHomeKey(prevKey => prevKey + 1);
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout resetHomeKey={resetHomeKey} />}>
                    <Route index element={<Home key={homeKey} />} />
                    <Route path="aboutus" element={<AboutUs />} />
                    <Route path="terms" element={<Terms />} />
                </Route>
                <Route path="/post/:id" element={<Layout particlesComponent={<HeartParticlesBackground />} />}>
                    <Route index element={<SinglePostPage />} />
                </Route>
                <Route path="/submit" element={<Layout particlesComponent={<ParticlesBackground />} />} >
                    <Route index element={<Submit />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
