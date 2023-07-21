import React, { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const PuzzleData = ({data_positions, setDataPositions, data_type, size}) => {
    const dataOptions = [1,2,3,4,5,6,7,8,9];
    const pairOptions = ["a","b","c","d","e","f","g","h","i","j"];
    const lockOptions = [false, true];

    const [options, setOptions] = useState([]);

    useEffect(() => {
        switch(data_type){
            case "default":
                setOptions([...dataOptions]);
                break;
            case "locked":
                setOptions([...lockOptions]);
                break;
            case "paired":
                setOptions([...pairOptions]);
                break;
            case "solution":
                setOptions([...dataOptions]);
                break;
        }
    },[size]);

    useEffect(() => {
        const initialData = Array.from({length: size}, () => []);
        for(let i = 0; i<initialData.length; i++){
            for(let j = 0; j<size; j++){
                if(data_type)
                initialData[i].push(options[0]);
            }
        }
        setDataPositions(initialData.map((row) => [...row]));
    },[options]);

    const DataHandler = (event, idx, idy) => {
        const updatedData = data_positions.map((row) => [...row]);
        updatedData[idx][idy] = event.target.value;

        switch(data_type){
            case "default":
                updatedData[idx][idy] = parseInt(event.target.value, 10);
                break;
            case "locked":
                updatedData[idx][idy] = (event.target.value === "true") ? true : false;
                break;
            case "paired":
                updatedData[idx][idy] = event.target.value;
                break;
            case "solution":
                updatedData[idx][idy] = parseInt(event.target.value, 10);
                break;
        }
        setDataPositions(updatedData.map((row) => [...row]));
    }

    return(
        <div>
            {data_positions.map((row, idx) => {
                return(
                    <div key={idx} className="d-flex flex-row justify-content-center align-items-center">
                        {row.map((col, idy) => {
                            if(data_type === "locked"){
                                return(
                                    <select key={idy} value={col} onChange={e => DataHandler(e, idx, idy)}>
                                        {options.map((option, ido) => <option key={ido} value={option}>{option?"True":"False"}</option>)}
                                    </select>
                                );
                            }
                            else{
                                return(
                                    <select key={idy} value={col} onChange={e => DataHandler(e, idx, idy)}>
                                        {options.map((option, ido) => <option key={ido} value={option}>{option}</option>)}
                                    </select>
                                );
                            }
                        })}
                    </div>
                );
            })}
        </div>
    );
}

export default PuzzleData;