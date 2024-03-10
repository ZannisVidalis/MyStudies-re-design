import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import "./Ratings.css"
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import ScrollToTop from "../../components/scrollToTop/ScrollToTop";
import ProgressTrackerDec from "../../components/progressTrackerDec/ProgressTrackerDec";
import { collection, getDocs, query, doc, updateDoc,where, arrayUnion, getDoc } from 'firebase/firestore';



import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


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
  
    console.log("userData:", data);

    return data;
}

export default function Ratings({ db }) {

    const [progress, setProgress] = useState(0);

    const [isAuthenticated, setUserAuthenticated] = useState(false);
    
    const [userData, setUserData] = useState([]);
    const userEmail = localStorage.getItem('email');
    const user_role = localStorage.getItem('role');
    const user = userData[0];

    const [addSemester, setAddSemester] = useState();
    const [addAm, setAddAm] = useState();
    const [addName, setAddName] = useState();
    const [addGrade, setAddGrade] = useState();

    const [addDate, setAddDate] = useState();
    const [addStatus, setAddStatus] =useState();
    const [addSecretary, setAddSecretary] = useState();
    const [addState, setAddState] = useState();
    const [addActions, setAddActions] = useState();
    const [addComments, setAddComments] = useState();

    const [selectedClass, setSelectedClass] = useState(0); 

    const handleSelectChange = (event) => {
        const parsedValue = parseInt(event.target.value, 10);
        if (!isNaN(parsedValue)) {
            setSelectedClass(parsedValue);
        } else {
            console.error(`Failed to parse value: ${event.target.value}`);
        }
    };

    const [userInputTexts, setUserInputTexts] = useState([]);


    const handleTextInputChange = (event, index) => {
        const newTexts = [...userInputTexts];
        newTexts[index] = event.target.value;
        setUserInputTexts(newTexts);
    };

    const [selectedStud, setSelectedStud] = useState([]);

    const [isAnyCheckboxChecked, setIsAnyCheckboxChecked] = useState(false);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);


    const [searchValues, setSearchValues] = useState({
        semester: '',
        am: '',
        name: '',
        grades: ''
    });

    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate("/login");
    };

    const navigateToHome = () => {
        navigate("/");
    };
    
    const navigateToTempRat = () => {
        navigate("/temprating");
    };

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
    
      const filterClasses = userData.map((course) => {
        const elements = Object.values(course);
    
        return elements.filter((element) =>
            Object.entries(searchValues).every(([field, searchValue]) => {
                const lowerCaseField = String(element[field]).toLowerCase();
                const lowerCaseSearch = searchValue.toLowerCase();
                return lowerCaseField.includes(lowerCaseSearch);
            })
        );
    });
    

    const handleFinalizeButtonClick = () => {
        pushCertFunc();
        navigate("/temprating");
    };


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

    const handleCheckboxChange = (index) => {
        setSelectedCheckboxes((prevSelectedCheckboxes) => {
            const isCheckboxSelected = prevSelectedCheckboxes.includes(index);
    
            const updatedSelectedCheckboxes = isCheckboxSelected
                ? prevSelectedCheckboxes.filter((selectedCheckbox) => selectedCheckbox !== index)
                : [...prevSelectedCheckboxes, index];
    
            setIsAnyCheckboxChecked(updatedSelectedCheckboxes.length > 0);
    
            const updatedSelectedStud = ClassData[selectedClass].students.filter((_, idx) => updatedSelectedCheckboxes.includes(idx));
            setSelectedStud(updatedSelectedStud);

            //Set the Progress to 0% if all the CheckBoxes are un-Clicked
            if(updatedSelectedStud.length == 0){
                setProgress(0);
            }
            //Increase Progress if a CheckBox is Clicked
            else{
                setProgress(33.33)
            }
    
            return updatedSelectedCheckboxes;
        });
    };
    
    async function handleEditButton() {
        try {
            const user_mail = localStorage.getItem('email');
            const userRef = doc(db, "users", user_mail);
    
            // Fetch the current data of the user from Firestore
            const userDoc = await getDoc(userRef);
    
            const lastRatingIndex = userDoc.data().rating?.length - 1;
    
            if (lastRatingIndex >= 0) {
                // Create a copy of the ratings array without the last rating
                const updatedrating = [
                    ...userDoc.data().rating.slice(0, lastRatingIndex),
                    ...userDoc.data().rating.slice(lastRatingIndex + 1),
                ];
    
                // Update the user object with the new rating
                const updatedUser = { ...userDoc.data(), rating: updatedrating };
    
                // Update the user document in Firestore with the new data
                await updateDoc(userRef, updatedUser);
    
                // Update the state with the modified user data
                setUserData([updatedUser, ...userData.slice(1)]);
    
                console.log("Last rating removed:", updatedUser.declarations);
                navigate("/ratings");
            } else {
                console.error("No ratings to remove.");
            }
        } catch (error) {
            console.error('Error removing last rating:', error);
        }
    }
    
    const lastrating = user?.rating?.[user.rating.length - 1] || {};


    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('el-GR');
        const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setAddDate(`${formattedDate} ${formattedTime}`);
        setAddStatus("Προσωρινή Αποθήκευση");
        setAddSecretary('');
        setAddState('Προβολή');
        setAddActions('');
        setAddComments();        
    
        const studToAdd = selectedStud.map((student) => ({
            semester: student.semester,
            am: student.am,
            name: student.name,
            grade: null
        }));
    
        for (let i = 0; i < studToAdd.length; i++) {
            console.log("i", i);
            console.log("studToAdd", studToAdd);
            const stud = studToAdd[i];

            setAddSemester(stud.semester);
            setAddAm(stud.am);
            setAddName(stud.name);
            setAddGrade(null)
        }

    }, [selectedStud]);

    async function pushCertFunc() {
    const rating = {
        date: addDate || '',
        status: addStatus || '',
        secretary: addSecretary || '',
        state: addState || '',
        actions: addActions || '',
        comments: addComments || '',
    };

    try {
        // Create an array to store all the selected students with their grades
        const selectedStudArray = selectedStud.map((student, index) => ({
            semester: student.semester,
            am: student.am,
            name: student.name,
            grade: userInputTexts[index] || null,
        }));

        // Reference to the user document in Firestore
        const user_mail = localStorage.getItem('email');
        const userRef = doc(db, "users", user_mail);

        // Fetch the current data of the user from Firestore
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            const existingData = userDoc.data();

            // Update the user document with the new data using update
            const res = await updateDoc(userRef, {
                rating: arrayUnion({
                    date: addDate || '',
                    status: addStatus || '',
                    secretary: addSecretary || '',
                    state: addState || '',
                    actions: addActions || '',
                    comments: addComments || '',
                    students: selectedStudArray,
                }),
            });

            console.log('Courses added successfully.');
        } else {
            console.error('User document does not exist.');
        }
    } catch (e) {
        console.error('Error adding courses:', e);
    }
}

    
    const ClassData = user && user.class ? user.class : null;
    console.log("ClassData", ClassData);

    if (isAuthenticated && user_role === 'admin') {
        if (Array.isArray(ClassData) && ClassData.length > 0) {
            if (selectedClass >= 0 && selectedClass < ClassData.length) {

                return (
                    <div>
                        <Navbar />
                        {/* Breadcrumbs */}
                        <section id="breadcrumbs" className="breadcrumbs">
                        <div className="container">
                            <div className="d-flex justify-content-between align-items-center">
                            <ol>
                                <li><a href="/"><i className="icofont-home"></i></a></li>
                                <li>Διδάσκοντες/ουσες</li>
                                <li>Βαθμολόγιο</li>
                            </ol>
                            </div>
                        </div>
                        </section>
            
                        <section>
                        {isAuthenticated && user_role === 'admin' ? (
                            <div >
                            
                                {lastrating.state === 'Προβολή' ? (
                                    <div className=" ratetemp-container-info">
                                        <div className="ratetemp-content-box">
                                        <hr />
                                        <h3>Υπάρχει ήδη ένα προσωρινό βαθμολόγιο. <br/></h3>
                                        <h3>Θέλεις να συνεχίσεις την επεξεργασία; <br/></h3>
                                        <hr />
                                        <button className="ratetemp-cancel-button" onClick={handleEditButton}>Όχι, να απορριφθεί</button>
                                        <button className="ratetemp-button" onClick={navigateToTempRat}>Ναί, να προχωρήσει η επεξεργασία</button>
                                        </div>
                                    </div>
                                
                                ):(
                                    <div>
                                        <div className='ratings-info'>
                                            Για να καταχωρήσετε ένα νέο βαθμολόγιο, επιλέξτε στα αριστερά απο τους φοιτητές που επιθυμείτε να βαθμολογήσετε το κουτάκι επιλογής καθώς και τον βαθμό στο ανίστοιχο πεδίο.<br />
                                            Επείτα το κουμπί "Αποθήκευση" κάτω δεξιά, προκειμένου να δημιουργήσετε ένα πρόχειρο βαθμολόγιο.<br />
                                        </div>
                                        <br/>

                                        <label htmlFor="classSelect">Επιλογή Τάξης:</label>
                                        <select
                                            id="classSelect"
                                            value={selectedClass}
                                            onChange={handleSelectChange}
                                        >
                                        <option value="">Επιλέξτε Μάθημα</option>
                                        {ClassData.map((classItem, classIndex) => (
                                            <option key={classIndex} value={classIndex}>
                                                {classItem.lesson}
                                            </option>
                                        ))}
                                        </select>

                                            <div className='ratings-progress'>
                                                <ProgressTrackerDec currentSection={progress} />
                                            </div>

                                                {ClassData[selectedClass] && (
                                                <div key={selectedClass}>
                                                    <div className="ratings-table-title">
                                                        <span>Βαθμολόγιο - Τάξη {selectedClass + 1}</span>
                                                    </div>
                                                    <table className="ratings-table-container">
                                                    <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th>Εξάμηνο</th>
                                                            <th>Αριθμός Μητρώου</th>
                                                            <th>Ονοματεπώνυμο </th>
                                                            <th>Βαθμός</th>
                                                        </tr>
                                                        <tr>
                                                            <th></th>
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
                                                                placeholder="Αριθμός Μητρώου..."
                                                                value= {searchValues.am}
                                                                onChange={(e) => handleInputChange("am", e.target.value)}
                                                            />
                                                        </th>
                                                        <th>
                                                        <input
                                                                type="text"
                                                                placeholder="Ονοματεπώνυμο..."
                                                                value= {searchValues.name}
                                                                onChange={(e) => handleInputChange("name", e.target.value)}
                                                        />
                                                        </th>
                                                        <th></th>
                                                        </tr>
                                                        </thead>

                                                        <tbody>
                                                        {ClassData[selectedClass].students.map((student, index) => (
                                                                <tr key={index}>
                                                                    <td>
                                                                        <Checkbox
                                                                            {...label}
                                                                            onChange={() => handleCheckboxChange(index)}
                                                                        />

                                                                    </td>
                                                                    <td>{student.semester}</td>
                                                                    <td>{student.am}</td>
                                                                    <td>{student.name}</td>
                                                                    <td>
                                                                        <div>
                                                                            <label htmlFor={`userInputText-${index}`}></label>
                                                                            <input
                                                                                type="text"
                                                                                id={`userInputText-${index}`}
                                                                                value={userInputTexts[index] || ''}
                                                                                onChange={(e) => handleTextInputChange(e, index)}
                                                                                placeholder="Βαθμός..."
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>

                                                <div className='dec-buttons'>
                                                    <button className="dec-exit-button" onClick={navigateToHome}> Έξοδος </button>

                                                    <button className={`dec-save-button ${isAnyCheckboxChecked ? 'green-button' : ''}`} onClick={handleFinalizeButtonClick} disabled={!isAnyCheckboxChecked}> 
                                                        Αποθήκευση
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                        </div>       
                                    )}                            
                            </div>
                        ) : (
                            !isAuthenticated ? (
                            <div className="container-info">
                                <div className="content-box"> 
                                    <hr />
                                    <h3>Για να καταχωρήσεις την βαθμολογία, πρέπει πρώτα να συνδεθείς.</h3>
                                    <hr />
                                    <button className="cancel-button" onClick={navigateToHome}>Άκυρο</button>
                                    <button className="login-button" onClick={navigateToLogin}>Login</button>
                                </div>
                            </div>
                        ) : (
                            navigate('/')
                        )
                        )}
                        </section>

                        <ScrollToTop/>
                        <Footer/>
                    </div>
                )
            } else {
                console.error(`Invalid selectedClass: ${selectedClass}`);
            }
        } else {
            console.log("No classes found or invalid data structure");
            return null; // Or render a message for no classes found
        }
    }else{
        if (!isAuthenticated) {
            return (
                <div>
                <Navbar/>
                {/* Breadcrumbs */}
                <section id="breadcrumbs" className="breadcrumbs">
                    <div className="container">
                        <div className="d-flex justify-content-between align-items-center">
                        <ol>
                            <li><a href="/"><i className="icofont-home"></i></a></li>
                            <li>Διδάσκοντες/ουσες</li>
                            <li>Βαθμολόγιο</li>
                        </ol>
                        </div>
                    </div>
                </section>
                <div className="container-info">
                    <div className="content-box">
                        <hr />
                        <h3>Για να καταχωρήσεις την βαθμολογία, πρέπει πρώτα να συνδεθείς.</h3>
                        <hr />
                        <button className="cancel-button" onClick={navigateToHome}>Άκυρο</button>
                        <button className="login-button" onClick={navigateToLogin}>Login</button>
                    </div>
                </div>
                <Footer/>
                </div>
            );
        } else {
            navigate('/');
        }
    } 
}