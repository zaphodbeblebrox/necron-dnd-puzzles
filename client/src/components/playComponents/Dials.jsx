import React, { useEffect, useState } from "react";

const Dials = ({puzzle, setPuzzle}) => {

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

    // Image name appears as [number][Off/On][Locked/Unlocked]
    const locked = "L";
    const unlocked = "U";
    const lightsOff = "F";
    const lightsOn = "N";
    // const dialImagePath = ".../static/images/dials/";
    const dialImagePath = "/static/images/dials/";
    const dialImageExt = ".png"

    useEffect(()=>{
        const newLighting = {...pairedLighting};
        for (const key in newLighting){
            newLighting[key] = (Math.round(Math.random())) ? true : false;
        }
        setPairedLighting({...newLighting});
    },[])


    return(
        <div>
            {puzzle.current_positions.map((row, idx) => {
                return(
                    <div key={idx} className="d-flex flex-row justify-content-center align-items-center">
                        {row.map((col, idy) => {
                            let imagePath = `${dialImagePath}${col}`;
                            imagePath = `${imagePath}${pairedLighting[puzzle.paired_positions[idx][idy]] ? lightsOn : lightsOff}`;
                            imagePath = `${imagePath}${puzzle.locked_positions[idx][idy] ? locked : unlocked}${dialImageExt}`;
                            console.log(imagePath);
                            return(
                                <img src={imagePath} alt={col} className="dial"/>
                            );
                        })}
                    </div>
                );
            })}
            <p>Puzzle!</p>
            <img src="image_url_or_file_path.jpg" alt="Image Description" />

        </div>
    );
}

export default Dials;