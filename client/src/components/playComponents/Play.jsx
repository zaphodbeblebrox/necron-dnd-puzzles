import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import Dials from "./Dials";
import PlayHeader from "./PlayHeader";
import Attempt from "./Attempt";

const Play = (props) => {
    const ambientAudioPath = "/static/audio/factory_ambience.mp3";
    const {id} = useParams();
    const [isCorrect, setIsCorrect] = useState(false);
    const [puzzle, setPuzzle] = useState({
        "current_positions": [[1]],
        "locked_positions": [[1]],
        "solution_positions": [[1]],
        "paired_positions": [[1]],
        "default_positions": [[1]],
    });

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/puzzles/${id}`)
            .then(res => {
                // console.log(res.data);
                const newPuzzle = {...res.data};
                newPuzzle.current_positions = res.data.default_positions.map((row) => [...row]);
                setPuzzle(newPuzzle);
                // console.log(newPuzzle);
            })
            .catch(err => console.log("Error getting the Puzzle",err));

        // Play audio
        const audioElement = document.getElementById('audio-ambient');
        audioElement.play();
    }, [])

    // useEffect(() => console.log(puzzle),[puzzle]);

    return(
        <div>
            <div>
                <PlayHeader />
            </div>
            <div className="d-flex flex-row justify-content-center">
                <Dials puzzle={puzzle} setPuzzle={setPuzzle} isCorrect={isCorrect}/>
                <Attempt puzzle={puzzle} setIsCorrect={setIsCorrect}/>
                <audio id="audio-ambient" controls hidden loop>
                    <source src={ambientAudioPath} type="audio/mp3" />
                </audio>

            </div>
        </div>
    );
}

export default Play;