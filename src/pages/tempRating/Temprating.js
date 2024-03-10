import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Temprating.css'
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

const Temprating = ({db}) => {

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
    
    console.log("userData:", userData);
    console.log("user:", user);

    const lastRating = user?.rating?.[user.rating.length - 1] || {};
    console.log("lastRating:", lastRating);

    
    // Assuming lastRating has a 'students' property which is an array
    const students = lastRating.students || [];
    console.log("students:", students);
    
    async function handleEditButton() {
        try {
            const user_mail = localStorage.getItem('email');
            const userRef = doc(db, "users", user_mail);
    
            // Fetch the current data of the user from Firestore
            const userDoc = await getDoc(userRef);
    
            const lastRatingIndex = userDoc.data().rating?.length - 1;
    
            if (lastRatingIndex >= 0) {
                // Create a copy of the ratings array without the last rating
                const updatedRating = [
                    ...userDoc.data().rating.slice(0, lastRatingIndex),
                    ...userDoc.data().rating.slice(lastRatingIndex + 1),
                ];
    
                // Update the user object with the new ratings
                const updatedUser = { ...userDoc.data(), rating: updatedRating };
    
                // Update the user document in Firestore with the new data
                await updateDoc(userRef, updatedUser);
    
                // Update the state with the modified user data
                setUserData([updatedUser, ...userData.slice(1)]);
    
                console.log("Last ratings removed:", updatedUser.rating);
                navigate("/ratings");
            } else {
                console.error("No ratings to remove.");
            }
        } catch (error) {
            console.error('Error removing last rating:', error);
        }
    }

    const handleFinalButton = () => {
        pushDecFunc();
        navigate("/finalrating");
    }
    
    async function pushDecFunc() {
        try {
            const lastRatingIndex = user.rating?.length - 1;
            const user_mail = localStorage.getItem('email');
            const userRef = doc(db, "users", user_mail);
    
            // Fetch the current data of the user from Firestore
            const userDoc = await getDoc(userRef);
    
                // Update the ratings array
                const updatedRatings = [
                    ...userDoc.data().rating.slice(0, lastRatingIndex),
                    {
                        ...userDoc.data().rating[lastRatingIndex],
                        status: "Υποβληθείσα",
                        state: 'Ολοκληρώθηκε',
                        actions: "Λήψη ως pfd "
                    },
                    ...userDoc.data().rating.slice(lastRatingIndex + 1),
                ];
    
                // Update the user object with the new ratings
                const updatedUserWithRatings = { ...user, rating: updatedRatings };
    
                // Update the user document in Firestore with the new data
                await updateDoc(userRef, updatedUserWithRatings);
    
                // Update the state with the modified user data
                setUserData([updatedUserWithRatings, ...userData.slice(1)]);
    
                console.log("User ratings updated:", user.rating, updatedRatings);
            } 
        catch (error) {
            console.error('Error updating ratings:', error);
        }
    }
    
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
                                    <li>Προσωρινή Αποθήκευση</li>
                                </ol>
                            </div>
                        </div>
            </section>
            {/*--------- Breadcrumbs -------> */}

            <div className="temp-rate">

                <ProgressTrackerDec currentSection={progress+66.66} />

                <div className="temp-rate-row">
                    <h2>ΠΡΟΣΟΧΗ!</h2>
                    <span>Η βαθμολόγηση δεν έχει ολοκληρωθεί</span>
                </div>

                <div>
                    <div className="tempderating-table-title">
                                <span>Πρόχειρο Βαθμολόγιο </span>
                            </div>

                            <table className="tempderating-table-container">
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


                <div className="temp-rate-btns">
                    <button onClick={navigateToMyHistory} className="temp-rate-exit">ΕΞΟΔΟΣ & ΑΠΟΘΗΚΕΥΣΗ</button>
                    <button onClick={handleEditButton} className="temp-rate-edit">ΕΠΕΞΕΡΓΑΣΙΑ</button>
                    <button onClick={handleFinalButton} className="temp-rate-final">ΟΡΙΣΤΙΚΟΠΟΙΗΣΗ</button>
                </div>
            </div>
        
            <ScrollToTop/>
            <Footer/>

        </div>
    )
}

export default Temprating