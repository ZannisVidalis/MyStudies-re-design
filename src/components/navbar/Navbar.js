import React from "react"
import './Navbar.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

import ProfessorDropDown from "../../components/professorDropDown/ProfessorDropDown";
import LanguageDropDown from "../../components/languageDropDown/LanguageDropDown";
import StudentDropdown from "../../components/studentDropDown/StudentDropDown";
import UserDropDown  from "../../components/userDropDown/UserDropDown";
import LogoNew from "../../components/LogoNew/LogoNew"
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {

  const [isAuthenticated, setUserAuthenticated] = useState(false);
  
    const navigate = useNavigate();

    const navigateToHelp = () => {
        navigate("/help");
    };

    const navigateToLogin = () => {
        navigate("/login");
    };

    const navigateToRegister = () => {
        navigate("/register");
    };

    const navigateToNews = () => {
        navigate("/news");
    }

    const navigateToCommingSoon = () => {
      navigate("/comingsoon");
  }

  useEffect(() => {
    // Check localStorage for authentication status
    const storedAuthStatus = localStorage.getItem('isAuthenticated');
    if (storedAuthStatus === 'true') {
    setUserAuthenticated(true);
    }
  }, []);

    return (
        <div>
          {isAuthenticated ? (
               <div className="nav">
               <div className="nav-row">
                   <div className="nav-logo">
                   <LogoNew />
                   </div>
                    
                   <div className="nav-right">
                       
                        <div className="nav-search">      
                            <SearchIcon className="nav-search-icon"/>
                            <input
                                placeholder="Αναζήτηση…"
                                aria-label="search"
                            />
                        </div>

                       <UserDropDown/>
                   </div>
               </div>
     
               <div className="nav-bottom-row">
                 
                 <StudentDropdown/>
                 <ProfessorDropDown/>
                 <button onClick= {navigateToCommingSoon}>Γραμματεία</button>
                 <button onClick={navigateToNews}>Ανακοινώσεις</button>
                 <button onClick={navigateToHelp}>Βοήθεια</button>
                   <LanguageDropDown/>
               </div>
           </div>               
               ) : (
                  <div className="nav">
                    <div className="nav-row">
                        <div className="nav-logo">
                            <LogoNew />
                        </div> 
                        <div className="nav-right">
                            
                            <div className="nav-search">
                                <SearchIcon className="nav-search-icon"/>
                                <input
                                    placeholder="Αναζήτηση…"
                                    aria-label="search"
                                />
                            </div>

                            <button onClick={navigateToLogin} className="nav-small-font">Σύνδεση</button>
                            <button onClick={navigateToRegister}className="nav-small-font-reg">Εγγραφή</button>
                        </div>
                    </div>
          
                    <div className="nav-bottom-row">
                      
                      <StudentDropdown/>
                      <ProfessorDropDown/>
                      <button onClick= {navigateToCommingSoon}>Γραμματεία</button>
                      <button onClick={navigateToNews}>Ανακοινώσεις</button>
                      <button onClick={navigateToHelp}>Βοήθεια</button>
                        <LanguageDropDown/>
                    </div>
                </div>
              )}
      </div> 
  )
}

export default Navbar;