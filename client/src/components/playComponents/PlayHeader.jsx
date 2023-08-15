import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const PlayHeader = (props) => {
    const ambientAudioPath = "/static/audio/factory_ambience.mp3";
    const [audioState, setAudioState] = useState(false);

    const playAudioHandler = () => {
        // Play audio
        const audioElement = document.getElementById("audio-ambient");
        if (audioElement.paused) {
            audioElement.play();
            setAudioState(true);
        } else {
            audioElement.pause();
            setAudioState(false);
        }
    };

    return (
        <div className="d-flex justify-content-space-start">
            <Link className="btn btn-primary btn-outline-dark margin-5" to="/puzzles">
                Home
            </Link>
            <button className="btn btn-primary btn-outline-dark margin-5" onClick={playAudioHandler}>
                {audioState ? "Pause" : "Play"}
            </button>
            <audio id="audio-ambient" controls hidden loop>
                <source src={ambientAudioPath} type="audio/mp3" />
            </audio>
        </div>
    );
};

export default PlayHeader;
