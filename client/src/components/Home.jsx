import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import AllPuzzles from "./AllPuzzles";
import EditCreatePuzzle from "./EditCreatePuzzle";
import Instructions from "./Instructions";
import { puzzleApi } from "../service/api";

const Home = (props) => {
    const [allPuzzles, setAllPuzzles] = useState([]);

    useEffect(() => {
        axios
            .get(`${puzzleApi}`)
            .then((res) => setAllPuzzles(res.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <h1 className="headers">The Necron Death Cult Puzzle Collection</h1>
            <Routes>
                <Route path="/" element={<AllPuzzles allPuzzles={allPuzzles} />} />
                <Route path="/new" element={<EditCreatePuzzle allPuzzles={allPuzzles} setAllPuzzles={setAllPuzzles} />} />
                <Route path="/edit/:id" element={<EditCreatePuzzle allPuzzles={allPuzzles} setAllPuzzles={setAllPuzzles} />} />
                <Route path="/instructions" element={<Instructions />} />
            </Routes>
        </div>
    );
};

export default Home;
