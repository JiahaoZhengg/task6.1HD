import React from "react";
import { useParams } from "react-router-dom";

import "./detail.css";

function Detail() {
    const { time, video } = useParams();
    return (
        <div>
            <h3>Message Detail</h3>
            <div className="myDetail">
                <div>time: {(new Date(Number(time))).toString()}</div>
                <div>content: you liked {video},thank your support~~</div>
            </div>
        </div>
    )
}

export default Detail;