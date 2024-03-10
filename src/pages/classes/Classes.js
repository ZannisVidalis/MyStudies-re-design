import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query,where } from 'firebase/firestore';

import "./Classes.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import ScrollToTop from "../../components/scrollToTop/ScrollToTop";
import FormDialogProf from '../../components/formDialogProf/FormDialogProf';

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

export default function Classes({db}){
    const [isAuthenticated, setUserAuthenticated] = useState(false);
    const [userData, setUserData] = useState([]);
    const userEmail = localStorage.getItem('email');
    const user_role = localStorage.getItem('role');

    const [editRowIndex, setEditRowIndex] = useState(null);

    const [searchValues, setSearchValues] = useState({
        semester: '',
        code: '',
        lesson: '',
        ects: '',
        assignments: '',
        grade_assignmentscts: '',
        book: ''
    });

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

    useEffect(() => {
        // Check localStorage for authentication status
        const storedAuthStatus = localStorage.getItem('isAuthenticated');
        if (storedAuthStatus === 'true') {
        setUserAuthenticated(true);
        }
    }, []);

    const handleInputChange = (field, value) => {
        setSearchValues((prevValues) => ({
          ...prevValues,
          [field]: value,
        }));
      };

      const filterClasses = userData.map((user) => ({
        ...user,
        class: user.class.filter((classes) =>
          Object.keys(searchValues).every((field) => {
            const searchValue = searchValues[field].toLowerCase();
            const rowValue = String(classes[field]).toLowerCase();
            return rowValue.includes(searchValue);
          })
        ),
      })); 

    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate("/login");
    };

    const navigateToHome = () => {
        navigate("/");
    };

      const flattenedClasses = [].concat(...filterClasses.map((user) => user.class));
      console.log("flattenedGrades:", flattenedClasses);

    return(
        <div> 
            <Navbar/>
            {/*--------- Breadcrumbs -------> */}
            <section id="breadcrumbs" className="breadcrumbs">
                        <div className="container">
                            <div className="d-flex justify-content-between align-items-center">
                                <ol>
                                    <li><a href="/"><i className="icofont-home"></i></a></li>
                                    <li>Τα μαθήματα μου</li>
                                </ol>
                            </div>
                        </div>
                    </section>
                    {/*--------- Breadcrumbs -------> */}

                    <div>
                        {isAuthenticated && user_role === 'admin' ? (
                            <div>
                                <div className='pro-info' style={{ fontStyle: 'italic' }}> 
                                    Μετά από κάθε ενέργεα ανανεώστε την σελίδα για να δείτε τις αλλάγες στον πίνακα πληροφοριών. 
                                </div>

                                <div className="classes-table-title">
                                    <span>Τα μαθήματα μου</span>
                                </div>

                                <table className="classes-table-container">
                                    <thead>
                                    <tr>
                                        <th>Εξάμηνο</th>
                                        <th>Κωδικός Μαθήματος</th>
                                        <th>Μάθημα</th>
                                        <th>ECTS</th>
                                        <th>Εργασίες</th>
                                        <th>Βαθμολόγηση Εργασίων</th>
                                        <th>Σύγγραμα</th>
                                        <th></th>
                                    </tr>

                                    <tr>
                                            <th>
                                                <input
                                                    type="text"
                                                    placeholder="Εξάμηνο..."
                                                    value= {searchValues.semester}
                                                    onChange={(e) => handleInputChange("semester", e.target.value)}
                                                />
                                            </th>
                                            <th>
                                                <input
                                                    type="text"
                                                    placeholder="Κωδικός Μαθήματος..."
                                                    value= {searchValues.code}
                                                    onChange={(e) => handleInputChange("code", e.target.value)}
                                                />
                                            </th>
                                            <th>
                                                <input
                                                    type="text"
                                                    placeholder="Μάθημα..."
                                                    value= {searchValues.lesson}
                                                    onChange={(e) => handleInputChange("lesson", e.target.value)}
                                                />
                                            </th>
                                            <th>
                                                <input
                                                    type="text"
                                                    placeholder="ECTS..."
                                                    value= {searchValues.ects}
                                                    onChange={(e) => handleInputChange("ects", e.target.value)}
                                                />
                                            </th>
                                            <th>
                                                <input
                                                    type="text"
                                                    placeholder="Εργασίες..."
                                                    value= {searchValues.assignments}
                                                    onChange={(e) => handleInputChange("assignments", e.target.value)}
                                                />
                                            </th>
                                            <th>
                                                <input
                                                    type="text"
                                                    placeholder="Βαθμολόγηση Εργασίων..."
                                                    value= {searchValues.grade_assignments}
                                                    onChange={(e) => handleInputChange("grade_assignments", e.target.value)}
                                                />
                                            </th>
                                            <th>
                                                <input
                                                    type="text"
                                                    placeholder="Σύγγραμα..."
                                                    value= {searchValues.book}
                                                    onChange={(e) => handleInputChange("book", e.target.value)}
                                                />
                                            </th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                    {flattenedClasses.map((course, index) => ( 
                                     <tr key={index}>
                                    
                    
                                         <>
                                             <td>{course.semester}</td>
                                             <td>{course.code}</td>
                                             <td>{course.lesson}</td>
                                             <td>{course.ects}</td>
                                             <td>{course.assignments}</td>
                                             <td>{course.grade_assignments}</td>
                                             <td>{course.book}</td>
                                             <td>
                                                 <FormDialogProf db={db} userData={userData} initialValues={course} index={course.id} onClose={() => setEditRowIndex(null)} />
                                             </td>
                                        </>
                                     
                                 </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            !isAuthenticated ? (
                                <div className="container-info">
                                    <div className="content-box"> 
                                        <hr />
                                        <h3>Για να πλοηγηθείς στα μαθήματα σου, πρέπει πρώτα να συνδεθείς.</h3>
                                        <hr />
                                        <button className="cancel-button" onClick={navigateToHome}>Άκυρο</button>
                                        <button className="login-button" onClick={navigateToLogin}>Login</button>
                                    </div>
                                </div>
                            ) : (
                                navigate('/')
                            )
                        )}
                    </div>
        
            <ScrollToTop/>
            <Footer/>
        </div>


    )
}