import React from "react";
import "./About.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import WelcomeAboutScreen from "../../components/welcomeAboutScreen/WelcomeAboutScreen";
import ScrollToTop from "../../components/scrollToTop/ScrollToTop";

import logo from '../../images/tale.png'
import studentLogo from '../../images/student 1.png'
import taleBlackLogo from '../../images/blck tale.png'
import starLogo from '../../images/star.png'
import frameLogo from '../../images/Frame.png'
import professorLogo from '../../images/prof 1.png'
import goldStarLogo from '../../images/gold star.png'
import secretaryLogo from '../../images/secre 1.png'
import blackStarLogo from '../../images/black star.png'

const About = () => {
    return (
        <div>
            <Navbar/>

            {/*--------- Breadcrumbs -------> */}
            <section id="breadcrumbs" class="breadcrumbs">
            <div class="container">
                <div class="d-flex justify-content-between align-items-center">
                <ol>
                    <li><a href="/"><i class="icofont-home"></i></a></li>
                    <li>About</li>
                </ol>
                </div>
            </div>
            </section>
            {/*--------- Breadcrumbs -------> */}

            
            <WelcomeAboutScreen/>
            <div className="about-start">
                <h1>Παρέχεται η δυνατότητα να:</h1>
                <img src={logo} alt=""/>
            </div>

            <div className="about-student">
                <div className="about-student-container">
                    <h3>Για τους φοιτητές:</h3>
                    <li>Να δουν ή/και να εκτυπώσουν τη βαθμολογία τους</li>
                    <li>Να έχουν πληροφορίες για οποιοδήποτε μάθημα του <br /> Προγράμματος Σπουδών (διδακτικές μονάδες, βάση, ώρες <br /> διδασκαλίας, καθηγητής, συγγράμματα κτλ)</li>
                    <li>Να δηλώσουν τα μαθήματα που ενδιαφέρονται να <br /> παρακολουθήσουν στο επόμενο εξάμηνο</li>
                    <li>Να συμπληρώσουν αιτήσεις για την έκδοση οποιουδήποτε <br /> διαθέσιμου πιστοποιητικού</li>
                </div>
                <img src={studentLogo} alt=""/>
                <div className="small-images-container-student">
                    <img src={taleBlackLogo} alt="" className="small-image-student-1" />
                    <img src={starLogo} alt="" className="small-image-student-2" />
                    <img src={frameLogo} alt="" className="small-image-student-3" />
                </div>
            </div>

            <div className="about-professor">
                <img src={professorLogo} alt=""/>
                <div className="small-images-container-professor">
                    <img src={taleBlackLogo} alt="" className="small-image-professor-1" />
                    <img src={goldStarLogo} alt="" className="small-image-professor-2" />
                    <img src={frameLogo} alt="" className="small-image-professor-3" />
                </div>
                <div className="about-professor-container">
                    <h3>Για τους Διδάσκοντες/ουσες:</h3>
                    <li>Να παρέχονται πληροφόρίες για τις διαδικασίες που <br /> πρέπει να ακολουθήσουν, τη λειτουργία των υπηρεσιών του <br /> mystudies </li>
                    <li>Να υποβάλει βαθμολογίες για τα μαθήματα του.</li>
                    <li>Ενημερώνει την γραμματεία για πιθανές αλλαγές <br /> μαθημάτων</li>
                    
                </div>
            </div>

            <div className="about-secretary">
                <div className="about-secretary-container">
                    <h3>Για τη γραμματεία:</h3>
                    <li>Πληροφόρηση για τις διαδικασίες που πρέπει να <br /> ακολουθήσουν</li>
                    <li>Ορισμός προθεσμιών για την δήλωση μαθημάτων.</li>
                    <li>Συμπλήρωση των εντύπων που αιτείται ο/η φοιτητής/τρια <br /> και αποστολή στους αντίστοιχους χρήστες</li>
                </div>
                <img src={secretaryLogo} alt=""/>
                <div className="small-images-container-secretary">
                    <img src={taleBlackLogo} alt="" className="small-image-secretary-1" />
                    <img src={blackStarLogo} alt="" className="small-image-secretary-2" />
                    <img src={frameLogo} alt="" className="small-image-secretary-3" />
                </div>
            </div>

            <ScrollToTop/>
            <Footer/>
        </div>
    );
}

export default About;
