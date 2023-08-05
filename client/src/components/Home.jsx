import React, {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import axios from "axios";
import AllPuzzles from "./AllPuzzles";
import EditCreatePuzzle from "./EditCreatePuzzle";

const Home = (props) => {
    const [allPuzzles, setAllPuzzles] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/puzzles")
            .then(res => setAllPuzzles(res.data))
            .catch(err => console.log(err));
    }, [])

    return(
        <div>
            <h1>The Necron Death Cult Puzzle Collection</h1>
            <Routes>
                <Route path="/" element={<AllPuzzles allPuzzles={allPuzzles}/>}/>
                <Route path="/new" element={<EditCreatePuzzle allPuzzles={allPuzzles} setAllPuzzles={setAllPuzzles}/>}/>
                <Route path="/edit/:id" element={<EditCreatePuzzle allPuzzles={allPuzzles} setAllPuzzles={setAllPuzzles}/>}/>
            </Routes>
        </div>
    );
}

export default Home;