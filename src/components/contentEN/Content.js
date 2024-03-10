import React from "react";
import './Content.css'

const Content = () => {
    return (
        <div className="content-button-container">
            <div className="content-button-frame">
                <button className="content-big-button">Grades Previe</button>
            </div>
            <div className="content-button-frame">
                <button className="content-big-button">Course Declaration</button>
            </div>
            <div className="content-button-frame">
                <button className="content-big-button">Request for Certificate</button>
            </div>
        </div>
    );
}

export default Content