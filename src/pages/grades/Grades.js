import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query,where } from 'firebase/firestore';
import "./Grades.css";

import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import ScrollToTop from "../../components/scrollToTop/ScrollToTop";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


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

export default function Grades({db}){

    const [isAuthenticated, setUserAuthenticated] = useState(false);
    const [userData, setUserData] = useState([]);
    const userEmail = localStorage.getItem('email');
    const user_role = localStorage.getItem('role');
    const user = userData[0];

    const [searchValues, setSearchValues] = useState({
        semester: '',
        code: '',
        lesson: '',
        grade: '',
        passed: '',
        ects: '',
        type: ''
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

    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate("/login");
    };

    const navigateToHome = () => {
        navigate("/");
    };

    const handleInputChange = (field, value) => {
        setSearchValues((prevValues) => ({
          ...prevValues,
          [field]: value,
        }));
      };

      const filterGrades = userData.map((user) => ({
        ...user,
        courses: user.courses.filter((course) =>
          Object.keys(searchValues).every((field) => {
            const searchValue = searchValues[field].toLowerCase();
            const rowValue = String(course[field]).toLowerCase();
            return rowValue.includes(searchValue);
          })
        ),
      }));      
      
        // Flatten the array of grades
        const flattenedGrades = [].concat(...filterGrades.map((user) => user.courses));
        console.log("flattenedGrades:", flattenedGrades);
    
        const classesfailed = user ? user.courses.filter(course => course.grade < 5 && course.grade >= 1) : [];
        const classespassed = user ? user.courses.filter(course => course.grade >= 5 ) : [];

        const sortedItems = flattenedGrades.sort((courseA, courseB) => {
        const isFailedA = classesfailed.some(failedCourse => failedCourse.code === courseA.code);
        const isFailedB = classesfailed.some(failedCourse => failedCourse.code === courseB.code);
    
        if (isFailedA && !isFailedB) {
        return -1;
        } else if (!isFailedA && isFailedB) {
        return 1;
        } else {
        return 0;
        }
    });

    const exportRowAsPDF = () => {
        const input = document.getElementById('grades-table-container');
        if (input) {
          html2canvas(input, { scale: 0.5 })
            .then((canvas) => {
              const imgData = canvas.toDataURL('image/png');
              const pdf = new jsPDF();
              pdf.addImage(imgData, 'PNG', 0, 0);
              pdf.save('grades.pdf');
            });
        }
      };
      
      
    return(
        <div> 
            <Navbar/>
            {/*--------- Breadcrumbs -------> */}
            <section id="breadcrumbs" className="breadcrumbs">
                        <div className="container">
                            <div className="d-flex justify-content-between align-items-center">
                                <ol>
                                    <li><a href="/"><i className="icofont-home"></i></a></li>
                                    <li>Φοιτητές/τριες</li>
                                    <li>Βαθμολογία</li>
                                </ol>
                            </div>
                        </div>
                    </section>
                    {/*--------- Breadcrumbs -------> */}
                    {isAuthenticated && user_role === 'student' ? (
                        <div>
                            <div className='grades-info'>
                            <FormControl style={{ width: '12%', padding: '9px'}}>
                                <InputLabel id="demo-simple-select-label" > Επιλογή Εμφάνισης</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    defaultValue={'Όλα τα μαθήματα'} 
                                    >
                                    <MenuItem value={'Όλα τα μαθήματα'}> Όλα τα μαθήματα </MenuItem>
                                    <MenuItem value={'Επιτυχημένες'}> Επιτυχημένες </MenuItem>
                                    <MenuItem value={'Αποτυχημένες'}>Αποτυχημένες</MenuItem>                    
                                </Select>
                            </FormControl>

                            <button onClick={exportRowAsPDF} className="grades-export-button">Export as PDF</button>
                            </div>

                                <div className="grades-table-title">
                                    <span>Βαθμολογία</span>
                                </div>

                                <table id="grades-table-container" className="grades-table-container">
                                    <thead>
                                    <tr>
                                        <th>Εξάμηνο</th>
                                        <th>Κωδικός Μαθήματος</th>
                                        <th>Μάθημα</th>
                                        <th>Βαθμός</th>
                                        <th>Εξεταστική Περίοδος</th>
                                        <th>ECTS</th>
                                        <th>Τύπος</th>
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
                                                    placeholder="Βαθμός..."
                                                    value= {searchValues.grade}
                                                    onChange={(e) => handleInputChange("grade", e.target.value)}
                                                />
                                            </th>
                                            <th>
                                                <input
                                                    type="text"
                                                    placeholder="Εξεταστική Περίοδος..."
                                                    value= {searchValues.passed}
                                                    onChange={(e) => handleInputChange("passed", e.target.value)}
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
                                                    placeholder="Τύπος..."
                                                    value= {searchValues.type}
                                                    onChange={(e) => handleInputChange("type", e.target.value)}
                                                />
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                    {sortedItems.map((course, index) => (
                                    <tr key={index} style={{ color: classesfailed.some(failedCourse => failedCourse.code === course.code) ? 'red' : 'inherit' }}>
                                        <td>{course.semester}</td>
                                        <td>{course.code}</td>
                                        <td>{course.lesson}</td>
                                        <td>{course.grade}</td>
                                        <td>{course.passed}</td>
                                        <td>{course.ects}</td>
                                        <td>{course.type}</td>
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
                                <h3>Για να δείς την βαθμολογία σου, πρέπει πρώτα να συνδεθείς.</h3>
                                <hr />
                                <button className="cancel-button" onClick={navigateToHome}>Άκυρο</button>
                                <button className="login-button" onClick={navigateToLogin}>Login</button>
                            </div>
                        </div>
                        ) : (
                            navigate('/')
                        )
                    )}

            <ScrollToTop/>
            <Footer/>
        </div>
    )
}
