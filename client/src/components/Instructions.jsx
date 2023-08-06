import React from "react";
import { Link } from "react-router-dom";
import "../static/instruction.css";

const Instructions = (props) => {

    return(
        <div className="d-flex flex-column align-items-start justify-content-start">
            {/* <Link className="btn btn-danger" to="/puzzles">Home</Link> */}
            <Link className="btn btn-primary btn-outline-dark" to="/puzzles">Home</Link>
            <h3 className="headers">About</h3>
            <p className="left-aligned">
                This app contains cryptic Sudoku puzzles of various difficulties for a Homebrew Dungeons and Dragons Campaign
            </p>

            <h3 className="headers">Objective</h3>
            <p className="left-aligned">
                The players need to rotate each dial into the correct orientation. They will have three attempts to do so. 
                Failing will result in an alarm being sounded.
            </p>

            <h3 className="headers">3x3 Rules</h3>
            <p className="left-aligned">
                The 3x3 puzzles are Magic Square puzzles. To solve, the sum of every row, column, & diagonal must be the same.
            </p>

            <h3 className="headers">9x9 Rules</h3>
            <p className="left-aligned">
                The 9x9 puzzles are Sudoku puzzles.
            </p>

            <h3 className="headers">The Dials</h3>
            <p className="left-aligned">There are 3 types of dials: Life, Death, Necron</p>
            <div className="d-flex flex-row justify-content-center align-items-center">
                <div>
                    <img className="dial-image" src="/static/images/dials/1FU.png" alt="Life Dial" />
                    <p>Life Dial</p>
                </div>
                <div>
                    <img className="dial-image" src="/static/images/dials/5FU.png" alt="Death Dial" />
                    <p>Death Dial</p>
                </div>
                <div>
                    <img className="dial-image" src="/static/images/dials/9FU.png" alt="Necron Dial" />
                    <p>Necron Dial</p>
                </div>
            </div>

            <p className="left-aligned">
                Each cardinal direction on the dials coorespond to an integer value, with the exception of the Necron Dial, 
                which will always be equal to 9.
            </p>

            <div className="d-flex flex-row justify-content-center align-items-center">
                <div>
                    <img className="dial-image-values" src="/static/images/life_dial_values.png" alt="Life Dial" />
                    <p>Life Dial Values</p>
                </div>
                <div>
                    <img className="dial-image-values" src="/static/images/death_dial_values.png" alt="Death Dial" />
                    <p>Death Dial Values</p>
                </div>
            </div>

            <p>Additionally, cracked dials cannot rotate. These are the set starting clues for completing the puzzles.</p>

            <h3 className="headers">Lighting</h3>
            <p className="left-aligned">
                The lights around the dials are a red herring. Dials are paired to each other and will randomly turn 
                On and Off if one of them is interacted with. While red herrings are typically bad puzzle design,
                there will be clues in the campaign for the players and this presented an additional programming challenge. 
            </p>

        </div>
    );
}

export default Instructions;