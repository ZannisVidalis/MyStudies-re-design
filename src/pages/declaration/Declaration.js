import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, doc, updateDoc,where, arrayUnion, getDoc, setDoc } from 'firebase/firestore';
import "./Declaration.css";

import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import ScrollToTop from "../../components/scrollToTop/ScrollToTop";
import ProgressTrackerDec from "../../components/progressTrackerDec/ProgressTrackerDec";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

async function fetchDataFromFirebase(db) {
    const q = query(collection(db, "courses"));
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

async function fetchDataFromFirebaseUser(db, userEmail) {
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

export default function Declaration({db}){

    
    const [progress, setProgress] = useState(0);


    const [userData, setUserData] = useState([]);
    const userEmail = localStorage.getItem('email');
    const user_role = localStorage.getItem('role');
    const user = userData[0];

    const [isAuthenticated, setUserAuthenticated] = useState(false);

    const [coursesData, setCoursesData] = useState([]);

    const [selectedOptions, setSelectedOptions] = useState([]);

    const [addedCourses, setAddedCourses] = useState([]);

    const [searchValues, setSearchValues] = useState({
        semester: '',
        code: '',
        lesson: '',
        ects: '',
        specialization: '',
        type: '',
        mandatory: ''
    });

    const [addId, setAddId] = useState();
    const [addSemester, setAddSemester] =useState();
    const [addCode, setAddCode] = useState();
    const [addType, setAddType] = useState();
    const [addLesson, setAddLesson] = useState();
    const [addSpecialization, setAddSpecialization] = useState();
    const [addEcts, setAddEcts] = useState();
    const [addProfessor, setAddProfessor] = useState();
    const [addAssignments, setAddAssignments] = useState();
    const [addGrade_assignments, setAddGrade_assignments] = useState();
    const [addBook, setAddBook] = useState();
    const [addGrade, setAddGrade] = useState();
    const [addMandatory, setAddMandatory] = useState();
    const [addPassed, setAddPassed] = useState();

    const [addDate, setAddDate] = useState();
    const [addStatus, setAddStatus] =useState();
    const [addSecretary, setAddSecretary] = useState();
    const [addState, setAddState] = useState();
    const [addActions, setAddActions] = useState();
    const [addComments, setAddComments] = useState();

    const [showPopup, setShowPopup] = useState(false);
    const [showPopup2, setShowPopup2] = useState(false);
    
    const [selectedCourses, setSelectedCourses] = useState([]);

    const [isAnyCheckboxChecked, setIsAnyCheckboxChecked] = useState(false);

    useEffect(() => {
        async function fetchData() {
          try {
            const data = await fetchDataFromFirebaseUser(db, userEmail);
            setUserData(data);
          } catch (error) {
            console.error('Error fetching data from Firebase:', error);
          }
        }
        fetchData();
      }, [db, userEmail]);

    //Handler for checkbox change
    const handleCheckboxChange = (course) => {
        // Check if the course is already selected
        const isCourseSelected = selectedCourses.some((selectedCourse) => selectedCourse.id === course.id);
    
        // Update selected courses based on checkbox state
        if (isCourseSelected) {
            const updatedSelectedCourses = selectedCourses.filter((selectedCourse) => selectedCourse.id !== course.id);
            setSelectedCourses(updatedSelectedCourses);

            //Set the Progress to 0% if all the CheckBoxes are un-Clicked
            if (updatedSelectedCourses.length === 0) {
                setProgress(0);
            }
        } else {
            setSelectedCourses((prevSelectedCourses) => [...prevSelectedCourses, course]);
            //Increase Progress if a CheckBox is Clicked
            setProgress(33.33)
        }
    
        //Update the state based on whether any checkbox is checked
        setIsAnyCheckboxChecked(!isCourseSelected);

    };

    //Handler for select change
    const handleSelectChange = (course, selectedValue) => {
        // Find the selected course in the state
        console.log("selectedValue", selectedValue);
        const updatedSelectedCourses = selectedCourses.map((selectedCourse) =>
            selectedCourse.id === course.id ? { ...selectedCourse, specialization: selectedValue }   : selectedCourse
        );

        console.log("updatedSelectedCourses", updatedSelectedCourses)
      
        if (updatedSelectedCourses.length > 0) {
            setSelectedCourses(updatedSelectedCourses);
        } else {
            setSelectedOptions((prevSelectedOptions) => [...prevSelectedOptions, { id: course.id,specialization: selectedValue }]);
        }
    };

    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate("/login");
    };

    const navigateToHome = () => {
        navigate("/");
    };

    const navigateToTempDec = () => {
        navigate("/tempdeclaration");
    };

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

    useEffect(() => {
        async function fetchData() {
        try {
            const data = await fetchDataFromFirebase(db);
            setCoursesData((data));

        } catch (error) {
            console.error('Error fetching data from Firebase:', error);
        }
        }
        fetchData();
    }, [db]);

    const handleInputChange = (field, value) => {
        console.log("Field:", field, "Value:", value);
        setSearchValues((prevValues) => ({
          ...prevValues,
          [field]: value,
        }));
      };


    const filterCourses = coursesData.map((course) => {
        const elements = Object.values(course);
        
        return elements.filter((element) =>
            Object.entries(searchValues).every(([field, searchValue]) => {
                const lowerCaseField = String(element[field]).toLowerCase();
                const lowerCaseSearch = searchValue.toLowerCase();
                return lowerCaseField.includes(lowerCaseSearch);
            })
        );
    });

    const [isPopupOpen, setIsPopupOpen] = useState(false);


    // Flatten the array of courses
    const flattenedCourses = [].concat(...filterCourses.map((course) => Object.values(course)));

    const handleFinalizeButtonClick = () => {
        if (user.semester === "1") {
            if (selectedCourses.length <= 5 ){
                pushCertFunc();
                navigate("/tempdeclaration");
            }
            else {
                setShowPopup(true);
            }
        }
    };


    const handleClosePopup = () => {
        // Close the popup
        setShowPopup(false);
      };

      const handleClosePopup2 = () => {
        // Close the popup
        setShowPopup2(false);
      }

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
    
        const coursesToAdd = selectedCourses.map((course) => ({
            id: course.id,
            semester: course.semester,
            code: course.code,
            lesson: course.lesson,
            type: course.type,
            specialization: course.specialization,
            ects: course.ects,
            professor: course.professor,
            assignments: course.assignments,
            grade_assignments: course.grade_assignments,
            book: course.book,
            grade: null,
            mandatory: course.mandatory,
            passed: null
        }));

        const hasPassedMandatoryPrerequisites = coursesToAdd.every(course => {
            // Check if the course has mandatory prerequisites
            if (course.mandatory && course.mandatory.length > 0) {
                // Handle the case where 'mandatory' is a non-empty string or any other value
                console.log("mandatory");
                console.log("course.mandatory", course.mandatory);

                if( course.mandatory.grade <5);
                    setShowPopup2(true);
                    setIsPopupOpen(true);
            } else {
                //No mandatory prerequisites or 'mandatory' is not set, so consider it passed
                return true;
            }
        });
    
        for (let i = 0; i < coursesToAdd.length; i++) {

            const course = coursesToAdd[i];

            setAddId(course.id);
            setAddSemester(course.semester);
            setAddCode(course.code);
            setAddLesson(course.lesson);
            setAddType(course.type);
            setAddSpecialization(course.specialization);
            setAddEcts(course.ects);
            setAddProfessor(course.professor);
            setAddAssignments(course.assignments);
            setAddGrade_assignments(course.grade_assignments);
            setAddBook(course.book);
            setAddGrade(null);
            setAddMandatory(course.mandatory);
            setAddPassed(null);
        }

    }, [selectedCourses]);
    

    async function pushCertFunc() {
        const declaration = {
            date: addDate || '',
            status: addStatus || '',
            secretary: addSecretary || '',
            state: addState || '',
            actions: addActions || '',
            comments: addComments || '',
        };
        try {
    // Create an array to store all the selected courses
    const selectedCoursesArray = selectedCourses.map(course => ({
            id: course.id,
            semester: course.semester,
            code: course.code,
            lesson: course.lesson,
            type: course.type,
            specialization: course.specialization,
            ects: course.ects,
            professor: course.professor,
            assignments: course.assignments,
            grade_assignments: course.grade_assignments,
            book: course.book,
            grade: course.grade,
            mandatory: course.mandatory,
            passed: course.passed
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
            declarations: arrayUnion({
                date: addDate || '',
                status: addStatus || '',
                secretary: addSecretary || '',
                state: addState || '',
                actions: addActions || '',
                comments: addComments || '',
                lesson: selectedCoursesArray,
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

    /* =========== For the Pagination =========== */
    const itemsPerPage = 6;  //The number of items per page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the index range for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = flattenedCourses.slice(indexOfFirstItem, indexOfLastItem);
    /* ========================================== */

    useEffect(() => {
        // Check localStorage for authentication status
        const storedAuthStatus = localStorage.getItem('isAuthenticated');
        if (storedAuthStatus === 'true') {
        setUserAuthenticated(true);
        }
    }, []);
    
    const lastDeclaration = user?.declarations?.[user.declarations.length - 1] || {};

    const classesfailed = user ? user.courses.filter(course => course.grade < 5 && course.grade >= 1) : [];
    const classespassed = user ? user.courses.filter(course => course.grade >= 5 ) : [];

    const sortedItems = currentItems.sort((courseA, courseB) => {
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
                                    <li>Δηλώσεις</li>
                                </ol>
                            </div>
                        </div>
                    </section>
                    {/*--------- Breadcrumbs -------> */}
            
            <div>
   
                    {isAuthenticated && user_role === 'student' ? (
                        <div>

                        {lastDeclaration.state === 'Προβολή' ? (
                                    <div className=" dectemp-container-info">
                                        <div className="dectemp-content-box">
                                        <hr />
                                        <h3>Υπάρχει ήδη μια προσωρινή δήλωση μαθημάτων. <br/></h3>
                                        <h3>Θέλεις να συνεχίσεις την επεξεργασία; <br/></h3>
                                        <hr />
                                        <button className="dectemp-cancel-button" onClick={handleEditButton}>Όχι, να απορριφθεί</button>
                                        <button className="dectemp-button" onClick={navigateToTempDec}>Ναί, να προχωρήσει η επεξεργασία</button>
                                        </div>
                                    </div>
                        ) : (

                                    <div>
                                        <div>
                                        <FormControl style={{ width: '12%', padding: '9px'}}>
                                            <InputLabel id="demo-simple-select-label" >Εξεταστική Περίοδος</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            defaultValue={'Χειμερινό'} 
                                            >
                                                <MenuItem value={'Χειμερινό'}> Χειμερινό</MenuItem>
                                                <MenuItem value={'Εαρινό'}> Εαρινό</MenuItem>
                                                <MenuItem value={'Προβολή όλων'}>Προβολή όλων</MenuItem>
                                                
                                            </Select>
                                        </FormControl>
                                        </div>

                                        <div className='declaration-info' style={{ marginTop: '20px' }}>
                                            Για να κάνετε μία νέα νέα δήλωση μαθημάτων, επιλέξτε στα αριστερά απο εκέινα που επιθυμείτε, το κουτάκι επιλογής καθώς και κατέυθυνση, εφόσον αυτή υπάρχει. <br />
                                            Επείτα το κουμπί "Αποθήκευση" κάτω δεξιά, προκειμένου να δημιουργήσετε μια πρόχειρη δήλωση.<br />
                                        </div>
                                        <br/>

                                        <div className='dec-progress'>
                                            <ProgressTrackerDec currentSection={progress} />
                                        </div>

                                        <div className="declaration-table-title">
                                            <span>Δήλωση Μαθημάτων</span>
                                        </div>

                                        <table className="declaration-table-container">
                                            <thead>
                                            <tr>
                                                <th></th>
                                                <th>Εξάμηνο</th>
                                                <th>Κωδικός μαθήματος</th>
                                                <th>Μάθημα</th>
                                                <th>ECTS</th>
                                                <th>Κατεύθυνση</th>
                                                <th>Τύπος μαθήματος</th>
                                                <th>Προαπαιτούμενα</th>
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
                                                    placeholder="Κωδικός μαθήματος..."
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
                                                    placeholder="Κατεύθυνση..."
                                                    value= {searchValues.specialization}
                                                    onChange={(e) => handleInputChange("specialization", e.target.value)}
                                            />
                                            </th>
                                            <th>
                                            <input
                                                    type="text"
                                                    placeholder="Τύπος μαθήματος..."
                                                    value= {searchValues.type}
                                                    onChange={(e) => handleInputChange("type", e.target.value)}
                                            />
                                            </th>
                                            <th>
                                            <input
                                                    type="text"
                                                    placeholder="Προαπαιτούμεμνα..."
                                                    value={searchValues.mandatory}
                                                    onChange={(e) => handleInputChange("mandatory", e.target.value)}
                                            />
                                            </th>

                                            </tr>
                                            </thead>

                                            <tbody>

                                            {sortedItems
                                            .filter(course => !classespassed.some(passedCourse => passedCourse.code === course.code))
                                            .map((course, index) => (
                                            <tr key={index} style={{ color: classesfailed.some(failedCourse => failedCourse.code === course.code) ? 'red' : 'inherit' }}>
                                                
                                            <td>
                                                

                                                <Checkbox
                                                    {...label}
                                                    checked={selectedCourses.some((selectedCourse) => selectedCourse.id === course.id)}
                                                    onChange={() => handleCheckboxChange(course)}
                                                />

                                            </td>
                                            <td>{course.semester}</td>
                                            <td>{course.code}</td>
                                            <td>{course.lesson}</td>
                                            <td>{course.ects}</td>
                                                

                                            
                                                {course.type === 'Υποχρεωτικό' || course.type === 'Γενικής Παιδείας' || course.type === 'Αυτοτελές Προαιρετικό Εργαστήριο' ? (
                                                    <td>{course.specialization}</td>
                                                ) : (
                                                course.specialization === 'S1' ? (
                                                    <td>
                                                    <FormControl style={{ width: '100%' }}>
                                                        <InputLabel id="demo-simple-select-label">Επιλέξτε Είδος</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={selectedCourses.find((selectedCourse) => selectedCourse.id === course.id)?.selectedValue || ''}
                                                            onChange={(event) => handleSelectChange(course, event.target.value)}
                                                        >
                                                        <MenuItem value={'Κατεύθυνση Α'}> Κατεύθυνση Α</MenuItem>
                                                        <MenuItem value={'S1'}> S1 </MenuItem>
                                                        <MenuItem value={'Ελεύθερο μάθημα'}> Ελεύθερο μάθημα </MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    </td>
                                                ) : (
                                                    course.specialization === 'S1, S2' ? (
                                                        <td>
                                                        <FormControl style={{ width: '100%' }}>
                                                            <InputLabel id="demo-simple-select-label">Επιλέξτε Είδος</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                value={selectedCourses.find((selectedCourse) => selectedCourse.id === course.id)?.selectedValue || ''}
                                                                onChange={(event) => handleSelectChange(course, event.target.value)}
                                                            >
                                                            <MenuItem value={'Κατεύθυνση Α'}> Κατεύθυνση Α</MenuItem>
                                                            <MenuItem value={'S1'}> S1 </MenuItem>
                                                            <MenuItem value={'S2'}> S2 </MenuItem>
                                                            <MenuItem value={'Ελεύθερο μάθημα'}> Ελεύθερο μάθημα </MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        </td>
                                                ) : (
                                                    course.specialization === 'S2' ? (
                                                        <td>
                                                        <FormControl style={{ width: '100%' }}>
                                                            <InputLabel id="demo-simple-select-label">Επιλέξτε Είδος</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                value={selectedCourses.find((selectedCourse) => selectedCourse.id === course.id)?.selectedValue || ''}
                                                                onChange={(event) => handleSelectChange(course, event.target.value)}
                                                            >
                                                            <MenuItem value={'Κατεύθυνση Α'}> Κατεύθυνση Α</MenuItem>
                                                            <MenuItem value={'S2'}> S2 </MenuItem>
                                                            <MenuItem value={'Ελεύθερο μάθημα'}> Ελεύθερο μάθημα </MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        </td>
                                                ) : (
                                                    course.specialization === 'S2, S3' ? (
                                                        <td>
                                                        <FormControl style={{ width: '100%' }}>
                                                            <InputLabel id="demo-simple-select-label">Επιλέξτε Είδος</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                value={selectedCourses.find((selectedCourse) => selectedCourse.id === course.id)?.selectedValue || ''}
                                                                onChange={(event) => handleSelectChange(course, event.target.value)}
                                                            >
                                                            <MenuItem value={'Κατεύθυνση Α'}> Κατεύθυνση Α</MenuItem>
                                                            <MenuItem value={'S2'}> S2 </MenuItem>
                                                            <MenuItem value={'S3'}> S3 </MenuItem>
                                                            <MenuItem value={'Ελεύθερο μάθημα'}> Ελεύθερο μάθημα </MenuItem>
                                                            <MenuItem value={'ΠΕΔΕ'}> ΠΕΔΕ </MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        </td>
                                                ) : (
                                                    course.specialization === 'S3' ? (
                                                        <td>
                                                        <FormControl style={{ width: '100%' }}>
                                                            <InputLabel id="demo-simple-select-label">Επιλέξτε Είδος</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                value={selectedCourses.find((selectedCourse) => selectedCourse.id === course.id)?.selectedValue || ''}
                                                                onChange={(event) => handleSelectChange(course, event.target.value)}
                                                            >
                                                            <MenuItem value={'Κατεύθυνση Α'}> Κατεύθυνση Α</MenuItem>
                                                            <MenuItem value={'S3'}> S3 </MenuItem>
                                                            <MenuItem value={'Ελεύθερο μάθημα'}> Ελεύθερο μάθημα </MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        </td>
                                                ) : (
                                                    course.specialization === 'S4' ? (
                                                        <td>
                                                        <FormControl style={{ width: '100%' }}>
                                                            <InputLabel id="demo-simple-select-label">Επιλέξτε Είδος</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                value={selectedCourses.find((selectedCourse) => selectedCourse.id === course.id)?.selectedValue || ''}
                                                                onChange={(event) => handleSelectChange(course, event.target.value)}
                                                            >
                                                            <MenuItem value={'Κατεύθυνση Β'}> Κατεύθυνση Β</MenuItem>
                                                            <MenuItem value={'S4'}> S4 </MenuItem>
                                                            <MenuItem value={'Ελεύθερο μάθημα'}> Ελεύθερο μάθημα </MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        </td>
                                                ) : (
                                                    course.specialization === 'S5' ? (
                                                        <td>
                                                        <FormControl style={{ width: '100%' }}>
                                                            <InputLabel id="demo-simple-select-label">Επιλέξτε Είδος</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                value={selectedCourses.find((selectedCourse) => selectedCourse.id === course.id)?.selectedValue || ''}
                                                                onChange={(event) => handleSelectChange(course, event.target.value)}
                                                            >
                                                            <MenuItem value={'Κατεύθυνση Β'}> Κατεύθυνση Β</MenuItem>
                                                            <MenuItem value={'S5'}> S5 </MenuItem>
                                                            <MenuItem value={'Ελεύθερο μάθημα'}> Ελεύθερο μάθημα </MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        </td>
                                                ) : (
                                                    course.specialization === 'S6' ? (
                                                        <td>
                                                        <FormControl style={{ width: '100%' }}>
                                                            <InputLabel id="demo-simple-select-label">Επιλέξτε Είδος</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                value={selectedCourses.find((selectedCourse) => selectedCourse.id === course.id)?.selectedValue || ''}
                                                                onChange={(event) => handleSelectChange(course, event.target.value)}
                                                            >
                                                            <MenuItem value={'Κατεύθυνση Β'}> Κατεύθυνση Β</MenuItem>
                                                            <MenuItem value={'S6'}> S6 </MenuItem>
                                                            <MenuItem value={'Ελεύθερο μάθημα'}> Ελεύθερο μάθημα </MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        </td>
                                                ) : (
                                                    <td>
                                                    <FormControl style={{ width: '100%'}}>
                                                    <InputLabel id="demo-simple-select-label" >Επιλέξτε Είδος</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={selectedCourses.find((selectedCourse) => selectedCourse.id === course.id)?.selectedValue || ''}
                                                        onChange={(event) => handleSelectChange(course, event.target.value)}
                                                    >
                                                        <MenuItem value={'Κατεύθυνση Α'}> Κατεύθυνση Α</MenuItem>
                                                        <MenuItem value={'Κατεύθυνση Β'}> Κατεύθυνση Β</MenuItem>
                                                        <MenuItem value={'S1'}> S1 </MenuItem>
                                                        <MenuItem value={'S2'}> S2 </MenuItem>
                                                        <MenuItem value={'S3'}> S3 </MenuItem>
                                                        <MenuItem value={'S4'}> S4 </MenuItem>
                                                        <MenuItem value={'S5'}> S5 </MenuItem>
                                                        <MenuItem value={'S6'}> S6 </MenuItem>
                                                        <MenuItem value={'Ελεύθερο μάθημα'}> Ελεύθερο μάθημα </MenuItem>
                                                    </Select>
                                                    </FormControl>
                                                    </td>
                                                )

                                                ))))))))}

                                                <td>{course.type}</td>
                                                <td>{course.mandatory}</td>
                                            </tr>
                                            ))}
                                        </tbody>
                                        
                                        </table>

                                    <div className="syllabus-pagination">
                                        <button
                                            onClick={() => setCurrentPage(currentPage - 1)}
                                            disabled={currentPage === 1}
                                        >
                                            {"<"}
                                        </button>
                                        <span>{currentPage} / {Math.ceil(flattenedCourses.length / itemsPerPage)}</span>
                                        <button
                                            onClick={() => setCurrentPage(currentPage + 1)}
                                            disabled={indexOfLastItem >= flattenedCourses.length}
                                        >
                                            {">"}
                                        </button>

                                    </div>



                                    <div className='dec-buttons'>
                                        <button className="dec-exit-button" onClick={navigateToHome}> Έξοδος </button>

                                        <button className={`dec-save-button ${isAnyCheckboxChecked ? 'green-button' : ''}`} onClick={handleFinalizeButtonClick} disabled={!isAnyCheckboxChecked || isPopupOpen}>
                                            Αποθήκευση
                                        </button>

                                        {showPopup && (
                                        <div className="overlay">
                                            <div className="popup-container">
                                            <div className="popup">
                                                <h1>Προσοχή!</h1>
                                                <p>Ξεπέρασες το όριο μαθημάτων που μπορείς να δηλώσεις για το έτος σου.</p>
                                                <button onClick={handleClosePopup}>Close</button>
                                            </div>
                                            </div>
                                        </div>
                                        )}

                                        {showPopup2 && (
                                        <div className="overlay">
                                            <div className="popup-container">
                                            <div className="popup">
                                                <h1>Προσοχή!</h1>
                                                <p>Προσπαθείς να δηλώσεις μαθήματα για τα οποία δεν έχεις περάσει τα προαπαιτούμενα.</p>
                                                <button onClick={handleClosePopup2}>Close</button>
                                            </div>
                                            </div>
                                        </div>
                                        )}
                                    </div>

                                  </div>
                                )}
                        </div>

                    ) : (
                        !isAuthenticated ? (
                        <div className="container-info">
                            <div className="content-box">
                                <hr />
                                <h3>Για να κάνεις μια δήλωση, πρέπει πρώτα να συνδεθείς.</h3>
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