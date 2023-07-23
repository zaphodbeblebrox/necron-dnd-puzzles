import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";

const PlayHeader = (props) => {

    return(
        <div>
            <Link to="/puzzles">Back</Link>
        </div>
    );
}

export default PlayHeader;