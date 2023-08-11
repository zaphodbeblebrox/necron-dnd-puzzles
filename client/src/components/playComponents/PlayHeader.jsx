import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";

const PlayHeader = (props) => {

    return(
        <div className="d-flex justify-content-start">
            <Link className="btn btn-primary btn-outline-dark margin-5" to="/puzzles">Home</Link>
        </div>
    );
}

export default PlayHeader;