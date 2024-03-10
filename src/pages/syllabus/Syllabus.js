import React from "react";
import "./Syllabus.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import ScrollToTop from "../../components/scrollToTop/ScrollToTop";

import { DataSyllabus2 } from "../../data/Data";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';



const Syllabus = () => {

    const [isAuthenticated, setUserAuthenticated] = useState(false);

    /* =========== For the Colum filtering =========== */
    const [searchValues, setSearchValues] = useState({
        semester: "",
        code: "",
        lesson: "",
        type: "",
        specialization: "",
        ects: "",
        professor: "",
        assignments: "",
        grade_assignments: "",
        book: "",
        mandatory: ""
    });

    const handleInputChange = (column, value) => {
        setSearchValues((prevValues) => ({
          ...prevValues,
          [column]: value,
        }));
    };

    // Filter the DataSyllabus array based on searchValues
    const filteredData = DataSyllabus2.filter((row) => {
        return Object.keys(searchValues).every((column) => {
          const searchValue = searchValues[column].toLowerCase();
          const rowValue = String(row[column]).toLowerCase();
          return rowValue.includes(searchValue);
        });
    });
    /* ============================================== */

    /* =========== For the Pagination =========== */
    const itemsPerPage = 5;  //The number of items per page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the index range for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    /* ========================================== */

    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate("/login");
    };

    const navigateToHome = () => {
      navigate("/");
    };


    useEffect(() => {
        // Check localStorage for authentication status
        const storedAuthStatus = localStorage.getItem('isAuthenticated');
        if (storedAuthStatus === 'true') {
        setUserAuthenticated(true);
        }
      }, []);

    return (
      <div> 
        <Navbar/>
        {/*--------- Breadcrumbs -------> */}
        <section id="breadcrumbs" className="breadcrumbs">
                    <div className="container">
                        <div className="d-flex justify-content-between align-items-center">
                            <ol>
                                <li><a href="/"><i className="icofont-home"></i></a></li>
                                <li>Φοιτητές/τριες</li>
                                <li>Θέματα Φοίτησης</li>
                                <li>Πρόγραμμα Σπουδών</li>
                            </ol>
                        </div>
                    </div>
                </section>
                {/*--------- Breadcrumbs -------> */}

            <div>
                <div>
                    {isAuthenticated ? (
                        <div>
                          <div className="syllabus-container">
                              <h2>Πρόγραμμα Σπουδών</h2>
                              <table className="syllabus-table">
                                  <thead>
                                      <tr>
                                          <th>Εξάμηνο</th>
                                          <th>Κωδικός Μαθήματος</th>
                                          <th>Μάθημα</th>
                                          <th>Τύπος Μαθήματος</th>
                                          <th>Ειδίκευση</th>
                                          <th>ECTS</th>
                                          <th>Καθηγητής/τρια</th>
                                          <th>Εργασίες</th>
                                          <th>Ποσοστό εργασιών</th>
                                          <th>Σύγγραμα</th>
                                          <th>Προαπαιτούμενα</th>
                                      </tr>
                                      <tr>
                                          <th>
                                              <input
                                                  type="text"
                                                  placeholder="Εξάμηνο..."
                                                  value={searchValues.semester}
                                                  onChange={(e) => handleInputChange("semester", e.target.value)}
                                              />
                                          </th>
                                          <th>
                                              <input
                                                  type="text"
                                                  placeholder="Κωδικός Μαθήματος..."
                                                  value={searchValues.code}
                                                  onChange={(e) => handleInputChange("code", e.target.value)}
                                              />
                                          </th>
                                          <th>
                                              <input
                                                  type="text"
                                                  placeholder="Μάθημα..."
                                                  value={searchValues.lesson}
                                                  onChange={(e) => handleInputChange("lesson", e.target.value)}
                                              />
                                          </th>
                                          <th>
                                              <input
                                                  type="text"
                                                  placeholder="Τύπος Μαθήματος..."
                                                  value={searchValues.type}
                                                  onChange={(e) => handleInputChange("type", e.target.value)}
                                              />
                                          </th>
                                          <th>
                                              <input
                                                  type="text"
                                                  placeholder="Ειδίκευση..."
                                                  value={searchValues.specialization}
                                                  onChange={(e) => handleInputChange("specialization", e.target.value)}
                                              />
                                          </th>
                                          <th>
                                              <input
                                                  type="text"
                                                  placeholder="ECTS..."
                                                  value={searchValues.ects}
                                                  onChange={(e) => handleInputChange("ects", e.target.value)}
                                              />
                                          </th>
                                          <th>
                                              <input
                                                  type="text"
                                                  placeholder="Καθηγητής/τρια..."
                                                  value={searchValues.professor}
                                                  onChange={(e) => handleInputChange("professor", e.target.value)}
                                              />
                                          </th>
                                          <th>
                                              <input
                                                  type="text"
                                                  placeholder="Εργασίες..."
                                                  value={searchValues.assignments}
                                                  onChange={(e) => handleInputChange("assignments", e.target.value)}
                                              />
                                          </th>
                                          <th>
                                              <input
                                                  type="text"
                                                  placeholder="Ποσοστό εργασιών..."
                                                  value={searchValues.grade_assignments}
                                                  onChange={(e) => handleInputChange("grade_assignments", e.target.value)}
                                              />
                                          </th>
                                          <th>
                                              <input
                                                  type="text"
                                                  placeholder="Σύγγραμα..."
                                                  value={searchValues.book}
                                                  onChange={(e) => handleInputChange("book", e.target.value)}
                                              />
                                          </th>
                                          <th>
                                              <input
                                                  type="text"
                                                  placeholder="Προαπαιτούμενα..."
                                                  value={searchValues.mandatory}
                                                  onChange={(e) => handleInputChange("mandatory", e.target.value)}
                                              />
                                          </th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {currentItems.map((row, index) => (
                                          <tr key={index}>
                                              {Object.values(row).slice(1).map((value, subIndex) => (
                                                  <td key={subIndex}>{value}</td>
                                              ))}
                                          </tr>
                                      ))}
                                  </tbody>
                              </table>  
                              
                          </div>
            
                        <div className="syllabus-pagination">
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                {"<"}
                            </button>
                            <span>{currentPage} / {Math.ceil(filteredData.length / itemsPerPage)}</span>
                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={indexOfLastItem >= filteredData.length}
                            >
                                {">"}
                            </button>
                        </div>
                    </div>
                    ) : (
                        <div className="container-info">
                            <div className="content-box">       
                                <hr />
                                <h3>Για να πλοηγηθείς στο πρόγραμμα σπουδών, πρέπει πρώτα να συνδεθείς.</h3>
                                <hr />
                                <button className="cancel-button-syllabus" onClick={navigateToHome}>Άκυρο</button>
                                <button className="login-button-syllabus" onClick={navigateToLogin}>Login</button>
                            </div>
                        </div>
                    )}
                </div>

                </div>

            <ScrollToTop/>
            <Footer/>
        </div>
  );
}

export default Syllabus;
