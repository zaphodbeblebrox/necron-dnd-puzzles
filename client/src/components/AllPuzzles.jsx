import React from "react";
import {Link} from "react-router-dom";
import "../static/allPuzzles.css";

const AllPuzzles = ({allPuzzles}) => {


    const CopyLinkHandler = (event, id) => {
        navigator.clipboard.writeText(`http://localhost:3000/play/${id}`);
    }

    return(
        <div className="d-flex flex-column justify-content-center alighn-items-center">
            <div>
            <Link className="btn btn-primary btn-outline-dark" to="/puzzles/new">Create a Puzzle</Link>
            <Link className="btn btn-primary btn-outline-dark" to="/puzzles/instructions">Instructions</Link>
            </div>
            <h3 className="headers">Available Puzzles</h3>
            <table>
                <thead>
                    <tr>
                        <th className="headers">Title</th>
                        <th className="headers">Size</th>
                        <th className="headers">Description</th>
                        <th className="headers">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allPuzzles.map(puzzle => {
                        return(
                            <tr key={puzzle._id}>
                                <td><p>{puzzle.title}</p></td>
                                <td><p>{puzzle.size}x{puzzle.size}</p></td>
                                <td><p>{puzzle.description}</p></td>
                                <td className="d-flex flex-row justify-content-evenly">
                                    <Link className="btn btn-primary btn-outline-dark" to={`/play/${puzzle._id}`}>Play</Link>
                                    <Link className="btn btn-primary btn-outline-dark" onClick={e => CopyLinkHandler(e, puzzle._id)}>Copy Link</Link>
                                    <Link className="btn btn-primary btn-outline-dark" to={`/puzzles/edit/${puzzle._id}`}>Edit</Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </div>
    );
}

export default AllPuzzles;