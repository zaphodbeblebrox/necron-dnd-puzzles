import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PuzzleData from "./PuzzleData";
import "../static/editCreate.css";
import { puzzleApi } from "../service/api";

const EditCreatePuzzle = ({ allPuzzles, setAllPuzzles }) => {
    const puzzleSizes = [3, 9];

    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [size, setSize] = useState(puzzleSizes[0]);
    const [description, setDescription] = useState("");
    const [default_positions, setDefault_positions] = useState([]);
    const [locked_positions, setLocked_positions] = useState([]);
    const [paired_positions, setPaired_positions] = useState([]);
    const [solution_positions, setSolution_positions] = useState([]);

    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (id !== undefined) {
            axios
                .get(`${puzzleApi}/${id}`)
                .then((res) => {
                    setTitle(res.data.title);
                    setSize(res.data.size);
                    setDescription(res.data.description);
                    setDefault_positions(res.data.default_positions);
                    setLocked_positions(res.data.locked_positions);
                    setPaired_positions(res.data.paired_positions);
                    setSolution_positions(res.data.solution_positions);
                })
                .catch((err) => console.log(err));
        }
    }, []);

    const puzzleHandler = (event) => {
        event.preventDefault();
        const newPuzzle = {
            title,
            size,
            description,
            default_positions,
            locked_positions,
            paired_positions,
            solution_positions,
        };
        // console.log(newRecord);
        if (id === undefined) {
            axios
                .post(`${puzzleApi}`, newPuzzle)
                .then((res) => {
                    setAllPuzzles([...allPuzzles, res.data]);
                    navigate("/puzzles");
                })
                .catch((err) => {
                    const errArray = [];
                    // console.log(err);
                    for (const key of Object.keys(err.response.data.errors)) {
                        errArray.push(err.response.data.errors[key].message);
                    }
                    console.log(errArray);
                    setErrors(errArray);
                });
        } else {
            axios
                .put(`${puzzleApi}/${id}`, newPuzzle)
                .then((res) => {
                    const tempAllPuzzles = allPuzzles.filter((puzzle) => puzzle._id !== id);
                    tempAllPuzzles.push(res.data);
                    setAllPuzzles([...tempAllPuzzles]);
                    navigate("/puzzles");
                })
                .catch((err) => {
                    const errArray = [];
                    // console.log(err);
                    for (const key of Object.keys(err.response.data.errors)) {
                        errArray.push(err.response.data.errors[key].message);
                    }
                    console.log(errArray);
                    setErrors(errArray);
                });
        }
    };

    const DeletePuzzleHandler = (event) => {
        event.preventDefault();
        axios
            .delete(`${puzzleApi}/${id}`)
            .then((res) => {
                const tempAllPuzzles = allPuzzles.filter((puzzle) => puzzle._id !== id);
                setAllPuzzles([...tempAllPuzzles]);
                navigate("/puzzles");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <Link className="btn btn-primary btn-outline-dark" to="/puzzles">
                Home
            </Link>
            <h3 className="headers">{id !== undefined ? "Edit" : "Create"} Puzzle</h3>
            <form onSubmit={puzzleHandler}>
                <div style={{ color: "red" }}>
                    {errors.map((err, idx) => {
                        return <p key={idx}>{err}</p>;
                    })}
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <label htmlFor="title" className="headers">
                        Puzzle Title
                    </label>
                    <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <label htmlFor="size" className="headers">
                        Puzzle Size
                    </label>
                    <select name="size" id="size" value={size} onChange={(e) => setSize(e.target.value)}>
                        {puzzleSizes.map((size, idx) => (
                            <option key={idx} value={size}>
                                {size}x{size}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <label htmlFor="description" className="headers">
                        Puzzle Description
                    </label>
                    <input type="text" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="default-positions" className="headers">
                        Default Positions
                    </label>
                    <PuzzleData data_positions={default_positions} setDataPositions={setDefault_positions} data_type="default" size={size} />
                </div>
                <div>
                    <label htmlFor="locked-positions" className="headers">
                        Locked Positions
                    </label>
                    <PuzzleData data_positions={locked_positions} setDataPositions={setLocked_positions} data_type="locked" size={size} />
                </div>
                <div>
                    <label htmlFor="paired-positions" className="headers">
                        Paired Positions
                    </label>
                    <PuzzleData data_positions={paired_positions} setDataPositions={setPaired_positions} data_type="paired" size={size} />
                </div>
                <div>
                    <label htmlFor="solution-positions" className="headers">
                        Solution Positions
                    </label>
                    <PuzzleData data_positions={solution_positions} setDataPositions={setSolution_positions} data_type="solution" size={size} />
                </div>
                <div>
                    <button className="btn btn-primary btn-outline-dark">{id !== undefined ? "Update" : "Create"}</button>
                    {id !== undefined && (
                        <button className="btn btn-danger btn-outline-dark" onClick={DeletePuzzleHandler}>
                            Delete Puzzle
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default EditCreatePuzzle;
