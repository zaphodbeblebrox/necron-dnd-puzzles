import React, { useEffect, useState } from "react";
import {io} from "socket.io-client";
import {socket} from "../../service/socket";

const Dials = ({puzzle, setPuzzle, isCorrect}) => {

    const [pairedLighting, setPairedLighting] = useState({
        "a": false,
        "b": false,
        "c": false,
        "d": false,
        "e": false,
        "f": false,
        "g": false,
        "h": false,
        "i": false,
        "j": false
    });

    // Life Dials range from 1-4
    const lifeStart = 1;
    const lifeLimit = 4;
    // Death Dials range from 5-8
    const deathStart = 5;
    const deathLimit = 8;
    // Necron Dial is always 9

    const turnDialAudioPath = "/static/audio/audio_click.wav";

    // Image name appears as [number][Off/On][Locked/Unlocked]
    const locked = "L";
    const unlocked = "U";
    const lightsOff = "F";
    const lightsOn = "N";
    const dialImagePath = "/static/images/dials/";
    const dialImageExt = ".png"

    // const socket = io("http://localhost:8000/")
    socket.on('connect', () => {
        console.log(`You are connected with id: ${socket.id}`)
    })

    useEffect(()=>{
        const newLighting = {...pairedLighting};
        for (const key in newLighting){
            newLighting[key] = (Math.round(Math.random())) ? true : false;
        }
        setPairedLighting({...newLighting});
    },[])

    useEffect(()=>{
        if(isCorrect){
            const newLighting = {...pairedLighting};
            for (const key in newLighting){
                newLighting[key] = true;
            }
            setPairedLighting({...newLighting});
        }
    },[isCorrect])

    socket.on('execute-update', (updatedPuzzle, updatedLighting) => {
        setPuzzle(updatedPuzzle);
        setPairedLighting({...updatedLighting});
    })

    const DialClickHandler = (event, idx, idy) => {
        event.preventDefault();
        if(puzzle.locked_positions[idx][idy]){
            return;
        }
        // Update dial position
        const updatedPuzzle = {...puzzle};
        if(updatedPuzzle.current_positions[idx][idy] <= lifeLimit){
            updatedPuzzle.current_positions[idx][idy] = (updatedPuzzle.current_positions[idx][idy] === lifeLimit) 
                ? lifeStart : updatedPuzzle.current_positions[idx][idy] + 1;
        }
        else if(updatedPuzzle.current_positions[idx][idy] <= deathLimit){
            updatedPuzzle.current_positions[idx][idy] = (updatedPuzzle.current_positions[idx][idy] === deathLimit) 
                ? deathStart : updatedPuzzle.current_positions[idx][idy] + 1;
        }
        setPuzzle(updatedPuzzle);
        // Update Lighting
        const newLighting = {...pairedLighting};
        newLighting[updatedPuzzle.paired_positions[idx][idy]] = (Math.round(Math.random())) ? true : false;
        setPairedLighting({...newLighting});

        // Update Socket
        socket.emit("update-dials", updatedPuzzle, newLighting);

        // Play audio
        const audioElement = document.getElementById('audio-dial-click');
        audioElement.play();
    }


    return(
        <div>
            <audio id="audio-dial-click" controls hidden>
                <source src={turnDialAudioPath} type="audio/wav" />
            </audio>
            {puzzle.current_positions.map((row, idx) => {
                return(
                    <div key={idx} className="d-flex flex-row justify-content-center align-items-center">
                        {row.map((col, idy) => {
                            let imagePath = `${dialImagePath}${col}`;
                            imagePath = `${imagePath}${pairedLighting[puzzle.paired_positions[idx][idy]] ? lightsOn : lightsOff}`;
                            imagePath = `${imagePath}${puzzle.locked_positions[idx][idy] ? locked : unlocked}${dialImageExt}`;
                            return(
                                <img key={idy} src={imagePath} alt={col} onClick={e => DialClickHandler(e,idx,idy)}
                                    className={puzzle.size === 3 ? "dial-3x3" : "dial-9x9"}/>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

export default Dials;