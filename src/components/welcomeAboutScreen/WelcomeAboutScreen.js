import React from "react";
import "./WelcomeAboutScreen.css";
import logo from '../../images/φόντο about welcome.png'

const WelcomeAboutScreen = () => {
    return (
        <div className="welcome-about-screen">
            <img src={logo} alt=""/>
            <div className="welcome-about-screen-text">
                <h1>About Mystudies</h1>
                <span>Η εφαρμογή αυτή σας παρέχει τη δυνατότητα να</span>
                <span>επικοινωνήσετε με τη Γραμματεία του Τμήματός σας από</span>
                <span>οποιοδήποτε Η/Υ, οπουδήποτε στον κόσμο! Από το σπίτι, το</span>
                <span>internet cafe, την εξοχική κατοικία, τη βιβλιοθήκη, μπορείτε</span>
                <span>να πραγματοποιήσετε διάφορες ενέργειες που αφορούν εσάς</span>
                <span>και τη Γραμματεία, εύκολα και γρήγορα.</span>
            </div>
        </div>
    );
}

export default WelcomeAboutScreen; 