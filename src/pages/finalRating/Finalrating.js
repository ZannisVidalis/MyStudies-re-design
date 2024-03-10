import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Finalrating.css'
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import ScrollToTop from "../../components/scrollToTop/ScrollToTop";
import ProgressTrackerDec from "../../components/progressTrackerDec/ProgressTrackerDec";

import { collection, getDocs, query, where } from 'firebase/firestore';


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

const Finalrating = ({db}) => {

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

    const lastRating = user?.rating?.[user.rating.length - 1] || {};
    console.log("lastRating:", lastRating);

    // Assuming lastRating has a 'students' property which is an array
    const students = lastRating.students || [];
    console.log("students:", students);

    return (
        <div> 
            <Navbar/>
            {/*--------- Breadcrumbs -------> */}
            <section id="breadcrumbs" className="breadcrumbs">
                        <div className="container">
                            <div className="d-flex justify-content-between align-items-center">
                                <ol>
                                    <li><a href="/"><i className="icofont-home"></i></a></li>
                                    <li>Διδάσκοντες/ουσες</li>
                                    <li>Βαθμολόγιο</li>
                                    <li>Οριστικό Βαθμολόγιο</li>
                                </ol>
                            </div>
                        </div>
            </section>
            {/*--------- Breadcrumbs -------> */}

            <div className="final-rate">

            <ProgressTrackerDec currentSection={progress+100} />

                <div className="final-rate-row">
                    <h2>Η βαθμολόγηση έχει ολοκληρωθεί με επιτυχία και περιλαμβάνει τους παρακάτω φοιτητές.</h2>
                    <span>Οποιαδήποτε προηγούμενη βαθμολόγηση δεν θα ληφθεί υπόψιν για την τρέχουσα περίοδο. <br/></span>
                    <span>Μπορείς να έχεις πάντοτε πρόσβαση στο βαθμολόγιο σου, στην ενότητα "Το ιστορικό μου".</span>
                </div>

                <div>
                    <div className="finalrating-table-title">
                                <span>Οριστικό Βαθμολόγιο</span>
                            </div>

                            <table className="finalrating-table-container">
                                <thead>
                                <tr>
                                <th>Εξάμηνο</th>
                                    <th>Αριθμός Μητρώου</th>
                                    <th>Ονοματεπώνυμο </th>
                                    <th>Βαθμός</th>
                                </tr>
                                </thead>
                                <tbody>
                                {students.map((stu, index) => (
                                <tr key={index}>
                                    <td>{stu.semester}</td>
                                    <td>{stu.am}</td>
                                    <td>{stu.name}</td>
                                    <td>{stu.grade}</td>
                                </tr>
                                ))}
                                </tbody>
                            </table>

                            </div>


                <div className="final-rate-btns">
                    <button onClick={navigateToMyhome} className="final-rate-exit">ΕΞΟΔΟΣ </button>
                    <button onClick={navigateToMyHistory} className="final-rate-final">ΤΟ ΙΣΤΟΡΙΚΟ ΜΟΥ</button>
                </div>
            </div>
        
            <ScrollToTop/>
            <Footer/>

        </div>
    )
}

export default Finalrating