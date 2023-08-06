import React from "react";
import {Link} from "react-router-dom";

const AllPuzzles = ({allPuzzles}) => {


    const CopyLinkHandler = (event, id) => {
        navigator.clipboard.writeText(`http://localhost:3000/play/${id}`);
    }

    return(
        <div>
            <Link to="/puzzles/new">Add a New Puzzle</Link>
            <Link to="/puzzles/instructions">Instructions</Link>
            <h3>Available Puzzles</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Size</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allPuzzles.map(puzzle => {
                        return(
                            <tr key={puzzle._id}>
                                <td>{puzzle.title}</td>
                                <td>{puzzle.size}x{puzzle.size}</td>
                                <td>{puzzle.description}</td>
                                <td className="d-flex flex-row justify-content-evenly">
                                    <Link to={`/play/${puzzle._id}`}>Play</Link>
                                    <p> | </p>
                                    <Link onClick={e => CopyLinkHandler(e, puzzle._id)}>Copy Link</Link>
                                    <p> | </p>
                                    <Link to={`/puzzles/edit/${puzzle._id}`}>Edit</Link>
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