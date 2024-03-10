import React from "react"
import { useNavigate } from "react-router-dom";
import './DropRight.css'

const DropRight = ({ isHovered }) => {
    
    const style = {
        visibility: isHovered ? "visible" : "hidden",
        top: isHovered ? "107px" : "-9999px", //If it isnt hovered, move it away from the screen
        left: "100%", //Position it to the right of the button
    };

    const navigate = useNavigate();

    const navigateToScholarships = () => {
        navigate("/scholarships");
    };

    const navigateToStudyduration = () => {
        navigate("/studyduration");
    };

    const navigateToAdvisers = () => {
        navigate("/advisers");
    };

    const navigateToStudyinfo = () => {
        navigate("/studyinfo");
    };

    const navigateToSyllabus = () => {
        navigate("/syllabus");
    };

    return (
        <div>
            <div className="dropright-sub-main" style={style}>
                <button onClick={navigateToSyllabus} className="dropright-sub-button">Πρόγραμμα <br/> Σπουδών</button>
                <button onClick={navigateToScholarships} className="dropright-sub-button">Υποτροφίες</button>
                <button onClick={navigateToStudyduration} className="dropright-sub-button">Ανώτατη Διάρκεια <br/> Φοίτησης</button>
                <button onClick={navigateToAdvisers} className="dropright-sub-button">Ακαδημαϊκοί <br/> Σύμβουλοι</button>
                <button onClick={navigateToStudyinfo} className="dropright-sub-button">Βασικά Φοίτησης</button>
            </div>
        </div>
    )
}

export default DropRight