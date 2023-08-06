import React from "react";

const Instructions = (props) => {

    return(
        <div>
            <h3>About</h3>
            <p>This app contains cryptic Sudoku puzzles of various difficulties for a Homebrew Dungeons and Dragons Campaign</p>

            <h3>Objective</h3>
            <p>The players need to rotate each dial into the correct orientation. They will have three attempts to do so. 
                Failing will result in an alarm being sounded.
            </p>

            <h3>The Dials</h3>
            <p>There are 3 types of dials: Life, Death, Necron</p>
            <div className="d-flex flex-row justify-content-center align-items-center">
                <div>
                    <img className="dial-image" src="/static/images/dials/1FU.png" alt="Life Dial" />
                    <p>Life Dial</p>
                </div>
                <div className="test">
                    <img className="dial-image" src="/static/images/dials/5FU.png" alt="Death Dial" />
                    <p>Death Dial</p>
                </div>
                <div>
                    <img className="dial-image" src="/static/images/dials/9FU.png" alt="Necron Dial" />
                    <p>Necron Dial</p>
                </div>
            </div>

        </div>
    );
}

export default Instructions;