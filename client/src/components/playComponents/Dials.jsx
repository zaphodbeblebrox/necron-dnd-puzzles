import React, { useEffect, useState } from "react";

const Dials = ({puzzle, setPuzzle}) => {
    const dialDictionary = {
        1: {
            "off_locked": ".../static/dials/1FL.png",
            "off_unlocked": ".../static/dials/1FU.png",
            "on_locked": ".../static/dials/1NL.png",
            "on_unlocked": ".../static/dials/1NU.png"
        },
        2: {
            "off_locked": ".../static/dials/2FL.png",
            "off_unlocked": ".../static/dials/2FU.png",
            "on_locked": ".../static/dials/2NL.png",
            "on_unlocked": ".../static/dials/2NU.png"
        },
        3: {
            "off_locked": ".../static/dials/3FL.png",
            "off_unlocked": ".../static/dials/3FU.png",
            "on_locked": ".../static/dials/3NL.png",
            "on_unlocked": ".../static/dials/3NU.png"
        },
        4: {
            "off_locked": ".../static/dials/4FL.png",
            "off_unlocked": ".../static/dials/4FU.png",
            "on_locked": ".../static/dials/4NL.png",
            "on_unlocked": ".../static/dials/4NU.png"
        },
        5: {
            "off_locked": ".../static/dials/5FL.png",
            "off_unlocked": ".../static/dials/5FU.png",
            "on_locked": ".../static/dials/5NL.png",
            "on_unlocked": ".../static/dials/5NU.png"
        },
        6: {
            "off_locked": ".../static/dials/6FL.png",
            "off_unlocked": ".../static/dials/6FU.png",
            "on_locked": ".../static/dials/6NL.png",
            "on_unlocked": ".../static/dials/6NU.png"
        },
        7: {
            "off_locked": ".../static/dials/7FL.png",
            "off_unlocked": ".../static/dials/7FU.png",
            "on_locked": ".../static/dials/7NL.png",
            "on_unlocked": ".../static/dials/7NU.png"
        },
        8: {
            "off_locked": ".../static/dials/8FL.png",
            "off_unlocked": ".../static/dials/8FU.png",
            "on_locked": ".../static/dials/8NL.png",
            "on_unlocked": ".../static/dials/8NU.png"
        },
        9: {
            "off_locked": ".../static/dials/9FL.png",
            "off_unlocked": ".../static/dials/9FU.png",
            "on_locked": ".../static/dials/9NL.png",
            "on_unlocked": ".../static/dials/9NU.png"
        }
    };

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