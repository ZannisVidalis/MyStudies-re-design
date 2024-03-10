import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";


const Myhistory = () => {
    const [isAuthenticated, setUserAuthenticated] = useState(false);
    const user_role = localStorage.getItem('role');

    useEffect(() => {
        // Check localStorage for authentication status
        const storedAuthStatus = localStorage.getItem('isAuthenticated');
        if (storedAuthStatus === 'true') {
        setUserAuthenticated(true);
        }
    }, []);

    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate("/login");
    };

    const navigateToHome = () => {
        navigate("/");
    };
    
    return (
        <div>
        {isAuthenticated && user_role === 'student' ? (
            navigate("/myhistorystud")
        ) : (
            isAuthenticated && user_role === 'admin' ? (
            navigate("/myhistoryprof")
            ) : (
                <div>
                    <Navbar/>
                    {/*--------- Breadcrumbs -------> */}
                    <section id="breadcrumbs" className="breadcrumbs">
                    <div className="container">
                        <div className="d-flex justify-content-between align-items-center">
                            <ol>
                                <li><a href="/"><i className="icofont-home"></i></a></li>
                                <li>Το ιστορικό μου</li>
                            </ol>
                        </div>
                    </div>
                    </section>
                    {/*--------- Breadcrumbs -------> */}
                

                <div className="container-info">
                    <div className="content-box">
                    <hr />
                    <h3>Για να ελέγξεις το ιστορικό σου, πρέπει πρώτα να συνδεθείς.</h3>
                    <hr />
                    <button className="cancel-button" onClick={navigateToHome}>Άκυρο</button>
                    <button className="login-button" onClick={navigateToLogin}>Login</button>
                    </div>
                </div>
                <Footer/>  
                </div> 
            )
        )}
        </div>                    
    )
}

export default Myhistory