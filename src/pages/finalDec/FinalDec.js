import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './FinalDec.css'
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import ScrollToTop from "../../components/scrollToTop/ScrollToTop";
import ProgressTrackerDec from "../../components/progressTrackerDec/ProgressTrackerDec";

import { collection, getDocs, query, doc, updateDoc, getDoc, where } from 'firebase/firestore';

async function fetchDataFromFirebase(db, userEmail) {
    const q = query(collection(db, "users"), where("email", "==", userEmail));
    const querySnapshot = await getDocs(q);
    const data = [];
  
    querySnapshot.forEach((doc) => {
  
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
  
    return data;
}

const FinalDec = ({db}) => {

    const [progress, setProgress] = useState(0);

    const [userData, setUserData] = useState([]);
    const userEmail = localStorage.getItem('email');
    const user = userData[0];

    useEffect(() => {
        async function fetchData() {
          try {
            const data = await fetchDataFromFirebase(db, userEmail);
            setUserData(data);
          } catch (error) {
            console.error('Error fetching data from Firebase:', error);
          }
        }
        fetchData();
      }, [db, userEmail]);

    const navigate = useNavigate();
    const navigateToMyHistory = () => {
        navigate("/myhistory");
    };
    
    const navigateToMyhome = () => {
        navigate("/myhome");
    };

    const lastDeclaration = user?.declarations?.[user.declarations.length - 1] || {};
    console.log("lastDeclaration:", lastDeclaration);

    // Assuming lastDeclaration has a 'lesson' property which is an array
    const lessons = lastDeclaration.lesson || [];
    console.log("lessons:", lessons);

    return (
        <div> 
            <Navbar/>
            {/*--------- Breadcrumbs -------> */}
            <section id="breadcrumbs" className="breadcrumbs">
                        <div className="container">
                            <div className="d-flex justify-content-between align-items-center">
                                <ol>
                                    <li><a href="/"><i className="icofont-home"></i></a></li>
                                    <li>Φοιτητές/τρίες</li>
                                    <li>Δηλώσεις</li>
                                    <li>Οριστική Δήλωση</li>
                                </ol>
                            </div>
                        </div>
            </section>
            {/*--------- Breadcrumbs -------> */}

            <div className="final-dec">

            <ProgressTrackerDec currentSection={progress+100} />

                <div className="final-dec-row">
                    <h2>Η δήλωση έχει ολοκληρωθεί με επιτυχία και περιλαμβάνει τα παρακάτω μαθήματα.</h2>
                    <span>Οποιαδήποτε προηγούμενη δήλωση δεν θα ληφθεί υπόψιν για την τρέχουσα περίοδο. <br/></span>
                    <span>Μπορείς να έχεις πάντοτε πρόσβαση στην δήλωσή σου, στην ενότητα "Το ιστορικό μου".</span>
                </div>

                <div>
                    <div className="finaldeclaration-table-title">
                                <span>Οριστική Δήλωση</span>
                            </div>

                            <table className="finaldeclaration-table-container">
                                <thead>
                                <tr>
                                    <th>Κωδικός μαθήματος</th>
                                    <th>Μάθημα</th>
                                    <th>Κατεύθυνση</th>
                                </tr>
                                </thead>
                                <tbody>
                                {lessons.map((les, index) => (
                                <tr key={index}>
                                    <td>{les.code}</td>
                                    <td>{les.lesson}</td>
                                    <td>{les.specialization}</td>
                                </tr>
                                ))}
                                </tbody>
                            </table>

                            </div>


                <div className="final-dec-btns">
                    <button onClick={navigateToMyhome} className="final-dec-exit">ΕΞΟΔΟΣ </button>
                    <button onClick={navigateToMyHistory} className="final-dec-final">ΤΟ ΙΣΤΟΡΙΚΟ ΜΟΥ</button>
                </div>
            </div>
        
            <ScrollToTop/>
            <Footer/>

        </div>
    )
}

export default FinalDec