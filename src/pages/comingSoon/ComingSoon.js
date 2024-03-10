import React from "react";
import "./ComingSoon.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";


const ComingSoon = () => {
    return (
        <div>
            <Navbar />
            <div className="main-text">
                <div className="col">
                    <div className="row  justify-content-center ">
                        <h1><b>Η σελίδα είναι υπό κατασκευή.</b></h1>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
        
    );
};

export default ComingSoon