import React from "react"
import { useNavigate } from "react-router-dom";
import "./Help.css"
import Navbar from "../../components/navbar/Navbar"
import Footer from "../../components/footer/Footer"
import ScrollToTop from "../../components/scrollToTop/ScrollToTop";

const Help = () => {

    const navigate = useNavigate();

    const navigateToHelpStudent = () => {
        navigate("/help/student");
    };

    const navigateToHelpProfessor = () => {
        navigate("/help/professor");
    };

    const navigateToHelpSecretary = () => {
        navigate("/help/secretary");
    };

    return (
        <div>
            <Navbar/>
            {/*--------- Breadcrumbs -------> */}
            <section id="breadcrumbs" class="breadcrumbs">
            <div class="container">
                <div class="d-flex justify-content-between align-items-center">
                <ol>
                    <li><a href="/"><i class="icofont-home"></i></a></li>
                    <li>Βοήθεια</li>
                </ol>
                </div>
            </div>
            </section>
            {/*--------- Breadcrumbs -------> */}
            
            <div className="help-button-container">
                <div className="help-button-frame">
                    <button className="help-big-button" onClick={navigateToHelpStudent}>ΦΟΙΤΗΤΕΣ</button>
                </div>
                <div className="help-button-frame">
                    <button className="help-big-button" onClick={navigateToHelpProfessor}>ΔΙΔΑΣΚΟΝΤΕΣ/ΟΥΣΕΣ</button>
                </div>
                <div className="help-button-frame">
                    <button className="help-big-button" onClick={navigateToHelpSecretary}>ΓΡΑΜΜΑΤΕΙΑ</button>
                </div>
            </div>
            <ScrollToTop/>
            <Footer/>
        </div>
    );
}

export default Help