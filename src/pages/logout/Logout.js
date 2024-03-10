import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./Logout.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

export default function Logout() {
    
    const navigate = useNavigate();
  
    useEffect(() => {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
      localStorage.removeItem('sex');
  
    //Redirect to the home page
      navigate('/');
    }, [navigate]);

  return (
    <div>
      <Navbar/>
      <div className="main-text">
            <div className="col">
                <div className="row  justify-content-center ">
                    <h1><b>Logging out...</b></h1>
                    <a href='/' className="create-user-link">Αρχική</a>
                    <a href='/login' className="create-user-link" style={{marginLeft: '100px'}}>Σύνδεση</a>         
                </div>
            </div>
        </div>
      <Footer/>
    </div>
  );
}

