import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css';

import Layout from "./pages/Layout";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";
import Submit from "./pages/Submit";
import Terms from "./pages/Terms";
import SinglePost from "./components/posts/SinglePost";
import HeartParticlesBackground from "./HeartParticlesBackground";
import ParticlesBackground from "./ParticlesBackground";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="aboutus" element={<AboutUs />} />
                    <Route path="terms" element={<Terms />} />
                </Route>
                <Route path="/post/:postId" element={<Layout particlesComponent={<HeartParticlesBackground />} />}>
                    <Route index element={
                            <SinglePost
                                message="Hello"
                                recipient="recipient"
                                time="Today 12:00PM"
                                likes={10}
                                shares={5}
                                liked={false}
                                onLike={() => {}}
                                onShare={() => {}}
                                onClick={() => {}}
                                className=""
                            />
                        }
                    />
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
