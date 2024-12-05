import { StrictMode } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import './index.css';
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";
import Submit from "./pages/Submit";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="aboutus" element={<AboutUs />} />
                    <Route path="submit" element={<Submit />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
        <App />
);