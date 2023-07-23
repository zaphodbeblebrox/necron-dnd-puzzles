import React, { useEffect, useState } from "react";

const Attempt = ({puzzle, setIsCorrect}) => {
    const turnDialAudioPath = "/static/audio/audio_click.wav";
    const maxAttempts = 3;

    // Audio paths
    const audioError = "/static/audio/audio_error.wav";
    const audioAlarm = "/static/audio/audio_alarm.wav";
    const audioSuccess = "/static/audio/audio_success.wav";

    
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
            if(attempts + 1 === maxAttempts){
                const audioElement = document.getElementById('audio-alarm');
                audioElement.play();
            }
            else{
                const audioElement = document.getElementById('audio-error');
                audioElement.play();
            }
            setAttemptImg(attemptIconPaths[attempts + 1]);
            setAttempts(attempts + 1);
            
        }
        else{
            setAttemptImg(attemptIconPaths[0]);
            setIsCorrect(true);
            const audioElement = document.getElementById('audio-success');
            audioElement.play();
        }
    }

    return(
        <div className="d-flex flex-column justify-content-center align-items-center">
            <audio id="audio-alarm" controls hidden>
                <source src={audioAlarm} type="audio/wav" />
            </audio>
            <audio id="audio-error" controls hidden>
                <source src={audioError} type="audio/wav" />
            </audio>
            <audio id="audio-success" controls hidden>
                <source src={audioSuccess} type="audio/wav" />
            </audio>
            <img src={attemptImg} alt="Attempts" className="attempts-icon" />
            <img src={isSubmitClicked ? submitBtnPressedPath : submitBtnNormalPath} alt="Submit" 
                onClick={SubmitBtnHandler} className="submit-btn"
                onMouseDown={SubmitBtnClick} onMouseUp={SubmitBtnRelease}/>

        </div>
    );
}

export default Attempt;