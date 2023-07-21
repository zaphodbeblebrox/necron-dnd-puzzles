import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import PuzzleData from "./PuzzleData";

const NewPuzzle = ({allPuzzles, setAllPuzzles}) => {
    const puzzleSizes = [3,9];

    const [title, setTitle] = useState("");
    const [size, setSize] = useState(puzzleSizes[0]);
    const [description, setDescription] = useState("");
    const [default_positions, setDefault_positions] = useState([]);
    const [locked_positions, setLocked_positions] = useState([]);
    const [paired_positions, setPaired_positions] = useState([]);
    const [solution_positions, setSolution_positions] = useState([]);

    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    

    const newPuzzleHandler = (event) => {
        event.preventDefault();
        const newPuzzle = {
            title,
            size,
            description,
            default_positions,
            locked_positions,
            paired_positions,
            solution_positions
        };
        // console.log(newRecord);
        axios.post("http://127.0.0.1:8000/api/puzzles", newPuzzle)
            .then(res => {
                setAllPuzzles([...allPuzzles, res.data]);
                navigate("/puzzles")
            })
            .catch(err => {
                const errArray = [];
                // console.log(err);
                for(const key of Object.keys(err.response.data.errors)){ 
                    errArray.push(err.response.data.errors[key].message);
                }
                console.log(errArray);
                setErrors(errArray);
            });
    }

    return(
        <div>
            <Link to="/puzzles">Home</Link>
            <h3>Add a New Puzzle</h3>
            <form onSubmit={newPuzzleHandler}>
                <div style={{color: "red"}}>
                    {errors.map((err,idx) => {
                        return(
                            <p key={idx}>{err}</p>
                        );
                    })}

                </div>
                <div>
                    <label htmlFor="title">Puzzle Title</label>
                    <input type="text" name="title" id="title" value={title} onChange={e => setTitle(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="size">Puzzle Size</label>
                    <select name="size" id="size" value={size} onChange={e => setSize(e.target.value)}>
                        {puzzleSizes.map((size, idx) => <option key={idx} value={size}>{size}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="description">Puzzle Description</label>
                    <input type="text" name="description" id="description" value={description} onChange={e => setDescription(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="default-positions">Default Positions</label>
                    <PuzzleData data_positions={default_positions} setDataPositions={setDefault_positions} data_type="default" size={size}/>
                </div>
                <div>
                    <label htmlFor="locked-positions">Locked Positions</label>
                    <PuzzleData data_positions={locked_positions} setDataPositions={setLocked_positions} data_type="locked" size={size}/>
                </div>
                <div>
                    <label htmlFor="paired-positions">Paired Positions</label>
                    <PuzzleData data_positions={paired_positions} setDataPositions={setPaired_positions} data_type="paired" size={size}/>
                </div>
                <div>
                    <label htmlFor="solution-positions">Solution Positions</label>
                    <PuzzleData data_positions={solution_positions} setDataPositions={setSolution_positions} data_type="solution" size={size}/>
                </div>

                <button>Add Puzzle</button>
            </form>
        </div>
    );
}

export default NewPuzzle;