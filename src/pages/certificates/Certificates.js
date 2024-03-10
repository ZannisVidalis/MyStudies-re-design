import React, { useEffect, useState, useRef, createRef } from 'react';
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from 'firebase/firestore';
import "./Certificates.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import CertButton from '../../components/certButton/CertButton';
import ScrollToTop from "../../components/scrollToTop/ScrollToTop";

import { jsPDF } from "jspdf";


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

export default function Certificates({db}){

    const [isAuthenticated, setUserAuthenticated] = useState(false);
    
    const [userData, setUserData] = useState([]);
    const userEmail = localStorage.getItem('email');
    const user_role = localStorage.getItem('role');

    const [searchValues, setSearchValues] = useState({
        date: '',
        type: '',
        comments: '',
        secComments: '',
        state: '',
        actions: '',
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
    
      const filterCertificates = userData.map((user) => ({
        ...user,
        certificates: user.certificates.filter((certificate) =>
          Object.keys(searchValues).every((field) => {
            const searchValue = searchValues[field].toLowerCase();
            const rowValue = String(certificate[field]).toLowerCase();
            return rowValue.includes(searchValue);
          })
        ),
      }));
      
      // Flatten the array of certificates
      const flattenedCertificates = [].concat(...filterCertificates.map((user) => user.certificates));
      
    useEffect(() => {
        // Check localStorage for authentication status
        const storedAuthStatus = localStorage.getItem('isAuthenticated');
        if (storedAuthStatus === 'true') {
        setUserAuthenticated(true);
        }
    }, []);

    // For PDF export
    const exportRowAsPDF = (rowData) => {
        const pdf = new jsPDF();
        
        pdf.text(20, 20, `Date: ${rowData.date}`);
        pdf.text(20, 30, `Type: ${rowData.type}`);
        pdf.text(20, 40, `Comments: ${rowData.comments}`);  
        pdf.save("certificate.pdf");
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
                                    <li>Πιστοποιητικά</li>
                                </ol>
                            </div>
                        </div>
                    </section>
                    {/*--------- Breadcrumbs -------> */}
            
                <div>
                    {isAuthenticated && user_role === 'student' ? (
                        <div >
                            <div className='certifivates-info'>
                                Για να κάνετε μία νέα αίτηση για πιστοποιητικό, πατήστε "Αίτημα Πιστοποιητικού" και επιλέξτε από το menu επιλογών εκείνο που επιθυμείτε.<br />
                            </div>
                            <br/>
                            <div className='certifivates-info' style={{ fontStyle: 'italic' }}> 
                                Μετά από κάθε ενέργεα ανανεώστε την σελίδα για να δείτε τις αλλάγες στον πίνακα πληροφοριών. 
                            </div>

                            <div className='certbtn'>
                                <CertButton db={db}/>
                            </div>


                            <div className="certificates-table-title">
                                <span>Ιστορικό Πιστοποιητικών</span>
                            </div>

                            <table className="certificates-table-container">
                                <thead>
                                <tr>
                                    <th>Ημερομηνία Αίτησης</th>
                                    <th>Είδος Πιστοποιητικού</th>
                                    <th>Σχόλια</th>
                                    <th>Σχόλια Γραμματείας</th>
                                    <th>Κατάσταση</th>
                                    <th>Ενέργειες</th>
                                </tr>

                                <tr>
                                          <th>
                                              <input
                                                  type="text"
                                                  placeholder="Ημερομηνία Αίτησης..."
                                                  value= {searchValues.date}
                                                  onChange={(e) => handleInputChange("date", e.target.value)}
                                              />
                                          </th>
                                          <th>
                                              <input
                                                  type="text"
                                                  placeholder="Είδος Πιστοποιητικού..."
                                                  value= {searchValues.type}
                                                  onChange={(e) => handleInputChange("type", e.target.value)}
                                              />
                                          </th>
                                          <th>
                                              <input
                                                  type="text"
                                                  placeholder="Σχόλια..."
                                                  value= {searchValues.comments}
                                                  onChange={(e) => handleInputChange("comments", e.target.value)}
                                              />
                                          </th>
                                          <th>
                                              <input
                                                  type="text"
                                                  placeholder="Σχόλια Γραμματείας..."
                                                  value= {searchValues.secComments}
                                                  onChange={(e) => handleInputChange("secComments", e.target.value)}
                                              />
                                          </th>
                                          <th>
                                              <input
                                                  type="text"
                                                  placeholder="Κατάσταση..."
                                                  value= {searchValues.state}
                                                  onChange={(e) => handleInputChange("state", e.target.value)}
                                              />
                                          </th>
                                          <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                {flattenedCertificates.map((certificate, index) => (
                                <tr key={index}>
                                    <td>{certificate.date}</td>
                                    <td>{certificate.type}</td>
                                    <td>{certificate.comments}</td>
                                    <td>{certificate.secComments}</td>
                                    <td>{certificate.state}</td>
                                    <td>
                                        <button onClick={() => exportRowAsPDF(certificate)} className="cert-export-button">Export as PDF</button>
                                    </td>
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
                                <h3>Για να κάνεις αίτηση για πιστοποιητικό, πρέπει πρώτα να συνδεθείς.</h3>
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