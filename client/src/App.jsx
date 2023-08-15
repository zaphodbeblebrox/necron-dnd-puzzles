import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Play from "./components/playComponents/Play";
import { useEffect, useState } from "react";

function App() {
    const backgroundImageUrlLandscape = "/static/images/old_metal_landscape.jpg";
    const backgroundImageUrlPortrait = "/static/images/old_metal_portrait.jpg";
    const [backgroundImage, setBackgroundImage] = useState(backgroundImageUrlLandscape);

    const containerStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh", // Take up full viewport height
        width: "100vw", // Take up full viewport width
    };

    useEffect(() => {
        const handleOrientationChange = () => {
            const isPortrait = window.matchMedia("(orientation: portrait)").matches;
            if (isPortrait) {
                setBackgroundImage(backgroundImageUrlPortrait);
            } else {
                setBackgroundImage(backgroundImageUrlLandscape);
            }
        };

        handleOrientationChange(); // Set the initial background image based on the current orientation

        // Add a listener for orientation change
        window.addEventListener("orientationchange", handleOrientationChange);

        // Clean up the listener on component unmount
        return () => {
            window.removeEventListener("orientationchange", handleOrientationChange);
        };
    }, []);

    return (
        <BrowserRouter Router>
            <div className="App" style={containerStyle}>
                <Routes>
                    <Route path="/" element={<Navigate to="/puzzles" />} />
                    <Route path="/puzzles/*" element={<Home />} />
                    <Route path="/play/:id" element={<Play />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
