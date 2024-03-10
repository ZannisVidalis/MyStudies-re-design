import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './TempDec.css'
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

const TempDec = ({db}) => {

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

    const lastDeclaration = user?.declarations?.[user.declarations.length - 1] || {};
    console.log("lastDeclaration:", lastDeclaration);

    
    // Assuming lastDeclaration has a 'lesson' property which is an array
    const lessons = lastDeclaration.lesson || [];
    console.log("lessons:", lessons);
    
    async function handleEditButton() {
        try {
            const user_mail = localStorage.getItem('email');
            const userRef = doc(db, "users", user_mail);
    
            // Fetch the current data of the user from Firestore
            const userDoc = await getDoc(userRef);
    
            const lastDeclarationIndex = userDoc.data().declarations?.length - 1;
    
            if (lastDeclarationIndex >= 0) {
                // Create a copy of the declarations array without the last declaration
                const updatedDeclarations = [
                    ...userDoc.data().declarations.slice(0, lastDeclarationIndex),
                    ...userDoc.data().declarations.slice(lastDeclarationIndex + 1),
                ];
    
                // Update the user object with the new declarations
                const updatedUser = { ...userDoc.data(), declarations: updatedDeclarations };
    
                // Update the user document in Firestore with the new data
                await updateDoc(userRef, updatedUser);
    
                // Update the state with the modified user data
                setUserData([updatedUser, ...userData.slice(1)]);
    
                console.log("Last declaration removed:", updatedUser.declarations);
                navigate("/declaration");
            } else {
                console.error("No declarations to remove.");
            }
        } catch (error) {
            console.error('Error removing last declaration:', error);
        }
    }

    const handleFinalButton = () => {
        pushDecFunc();
        navigate("/finaldeclaration");
    }
    
    async function pushDecFunc() {
        try {
            const userCourses = user.courses || [];
            const lastDeclarationIndex = user.declarations?.length - 1;
            const user_mail = localStorage.getItem('email');
            const userRef = doc(db, "users", user_mail);
    
            // Fetch the current data of the user from Firestore
            const userDoc = await getDoc(userRef);
    
            if (lastDeclaration && lastDeclaration.lesson) {
                // Assuming each lesson has a unique identifier like 'code'
                const newCourses = [...userCourses, ...lastDeclaration.lesson];
    
                // Update the user object with the new courses
                const updatedUser = { ...user, courses: newCourses };
    
                // Update the declarations array
                const updatedDeclarations = [
                    ...userDoc.data().declarations.slice(0, lastDeclarationIndex),
                    {
                        ...userDoc.data().declarations[lastDeclarationIndex],
                        // Update the fields you want to modify in the lastDeclaration
                        status: "Υποβληθείσα",
                        state: 'Ολοκληρώθηκε',
                        actions: "Λήψη ως pfd "
                    },
                    ...userDoc.data().declarations.slice(lastDeclarationIndex + 1),
                ];
    
                // Update the user object with the new declarations
                const updatedUserWithDeclarations = { ...updatedUser, declarations: updatedDeclarations };
    
                // Update the user document in Firestore with the new data
                await updateDoc(userRef, updatedUserWithDeclarations);
    
                // Update the state with the modified user data
                setUserData([updatedUserWithDeclarations, ...userData.slice(1)]);
    
                console.log("User courses and declarations updated:", updatedUser.courses, updatedDeclarations);
            } else {
                console.error("No lessons in the last declaration.");
            }
        } catch (error) {
            console.error('Error updating courses and declarations:', error);
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
                                    <li>Φοιτητές/τρίες</li>
                                    <li>Δηλώσεις</li>
                                    <li>Προσωρινή Αποθήκευση</li>
                                </ol>
                            </div>
                        </div>
            </section>
            {/*--------- Breadcrumbs -------> */}

            <div className="temp-dec">

                <ProgressTrackerDec currentSection={progress+66.66} />

                <div className="temp-dec-row">
                    <h2>ΠΡΟΣΟΧΗ!</h2>
                    <span>Η δήλωση δεν έχει ολοκληρωθεί</span>
                </div>

                <div>
                    <div className="tempdeclaration-table-title">
                                <span>Πρόχειρη Δήλωση</span>
                            </div>

                            <table className="tempdeclaration-table-container">
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


                <div className="temp-dec-btns">
                    <button onClick={navigateToMyHistory} className="temp-dec-exit">ΕΞΟΔΟΣ & ΑΠΟΘΗΚΕΥΣΗ</button>
                    <button onClick={handleEditButton} className="temp-dec-edit">ΕΠΕΞΕΡΓΑΣΙΑ</button>
                    <button onClick={handleFinalButton} className="temp-dec-final">ΟΡΙΣΤΙΚΟΠΟΙΗΣΗ</button>
                </div>
            </div>
        
            <ScrollToTop/>
            <Footer/>

        </div>
    )
}

export default TempDec