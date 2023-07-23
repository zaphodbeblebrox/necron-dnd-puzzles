import React, { useEffect, useState } from "react";

const Attempt = ({puzzle, setIsCorrect}) => {
    const turnDialAudioPath = "/static/audio/audio_click.wav";
    const maxAttempts = 3;
    
    // Image paths for the Submit Button
    const submitBtnNormalPath = "/static/images/submit_button/submit_default.png";
    const submitBtnPressedPath = "/static/images/submit_button/submit_pressed.png";
    const [isSubmitClicked, setIsSubmitClicked] = useState(false);

    // Image paths for the Attempts Display
    const attemptIconPaths = {
        "0": "/static/images/attempt_graphic/attempt_0.png",
        "1": "/static/images/attempt_graphic/attempt_1.png",
        "2": "/static/images/attempt_graphic/attempt_2.png",
        "3": "/static/images/attempt_graphic/attempt_3.png"
    }
    const [attemptImg, setAttemptImg] = useState(attemptIconPaths[0]);
    
    const [attempts, setAttempts] = useState(0);

    const SubmitBtnClick = () => {
        setIsSubmitClicked(true);
    };
    
    const SubmitBtnRelease = () => {
        setIsSubmitClicked(false);
    };

    const SubmitBtnHandler = () => {
        if(attempts >= maxAttempts){
            return;
        }
        
        // Check solution
        let isCorrect = (JSON.stringify(puzzle.current_positions) === JSON.stringify(puzzle.solution_positions));
        console.log(isCorrect)
        if(!isCorrect){
            setAttemptImg(attemptIconPaths[attempts + 1]);
            setAttempts(attempts + 1);
        }
        else{
            setAttemptImg(attemptIconPaths[0]);
            setIsCorrect(true);
        }
    }

    return(
        <div className="d-flex flex-column justify-content-center align-items-center">
            <audio id="audioPlayer" controls hidden>
                <source src={turnDialAudioPath} type="audio/wav" />
            </audio>
            <img src={attemptImg} alt="Attempts" className="attempts-icon" />
            <img src={isSubmitClicked ? submitBtnPressedPath : submitBtnNormalPath} alt="Submit" 
                onClick={SubmitBtnHandler} className="submit-btn"
                onMouseDown={SubmitBtnClick} onMouseUp={SubmitBtnRelease}/>

        </div>
    );
}

export default Attempt;