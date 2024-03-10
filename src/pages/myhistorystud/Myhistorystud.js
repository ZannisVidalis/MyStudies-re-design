import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Myhistorystud.css'
import Navbar from "../../components/navbar/Navbar"
import Footer from "../../components/footer/Footer"
import ScrollToTop from "../../components/scrollToTop/ScrollToTop";
import { collection, getDocs, query, where } from 'firebase/firestore';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
  
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const FirstTag = ({userData}) => {
    const user = userData[0];
    
    console.log("userData:", user);

    const [searchValues, setSearchValues] = useState({
      date: '',
      status: '',
      secretary: '',
      state: '',
      actions: '',
      comments: '',
  });
  

  const handleInputChange = (field, value) => {
      setSearchValues((prevValues) => ({
        ...prevValues,
        [field]: value,
      }));
    };

    const navigate = useNavigate();
    const navigateToTempdec = () => {
        navigate("/tempdeclaration");
    };
  
    const filterDeclarations = userData.map((user) => ({
      ...user,
      declarations: user.declarations.filter((declaration) =>
        Object.keys(searchValues).every((field) => {
          const searchValue = searchValues[field].toLowerCase();
          const rowValue = String(declaration[field]).toLowerCase();
          return rowValue.includes(searchValue);
        })
      ),
    }));
    
    // Flatten the array of certificates
    const flattenedDeclarations = [].concat(...filterDeclarations.map((user) => user.declarations));
    
    console.log("flattenedDeclarations:", flattenedDeclarations);

    // For PDF export
    const exportRowAsPDF = (rowData) => {
        const pdf = new jsPDF();
        
        pdf.text(20, 20, `Date: ${rowData.date}`);
        pdf.text(20, 30, `Status: ${rowData.status}`);
        pdf.text(20, 40, `State: ${rowData.state}`);
        pdf.save("declaration.pdf");
    };
    
    return (
          <div>
              {/*--------- Breadcrumbs -------> */}
              <section id="breadcrumbs" class="breadcrumbs">
              <div class="container">
                  <div class="d-flex justify-content-between align-items-center">
                  <ol>
                      <li><a href="/"><i class="icofont-home"></i></a></li>
                      <li>Το ιστορικό μου</li>
                      <li>Δηλώσεις</li>
                  </ol>
                  </div>
              </div>
              </section>
              {/*--------- Breadcrumbs -------> */}
  
              <div className="first-tag-myhistory-table-title">
                <span>Ιστορικό Δηλώσεων</span>
            </div>

                <table className="myhistory-table-container">
                    <thead>
                    <tr>
                        <th>Ημερομηνία Δήλωσης</th>
                        <th>Κατάσταση</th>
                        <th>Έγκριση Γραμματείας</th>
                        <th>Ενέργειες</th>
                        <th>Κατάσταση</th>
                        <th>Σχόλια</th>
                    </tr>

                    <tr>
                        <th>
                        <input
                            type="text"
                                placeholder="Ημερομηνία Δήλωσης..."
                                value= {searchValues.date}
                                onChange={(e) => handleInputChange("date", e.target.value)}
                        />
                        </th>
                        <th>
                        <input
                                type="text"
                                placeholder="Κατάσταση..."
                                value= {searchValues.status}
                                onChange={(e) => handleInputChange("status", e.target.value)}
                        />
                        </th>
                        <th>
                        <input
                            type="text"
                            placeholder="Έγκριση Γραμματείας..."
                            value= {searchValues.secretary}
                            onChange={(e) => handleInputChange("secretary", e.target.value)}
                        />
                        </th>
                        <th></th>
                        <th>
                        <input
                            type="text"
                            placeholder="Κατάσταση..."
                            value= {searchValues.state}
                            onChange={(e) => handleInputChange("state", e.target.value)}
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
                        </tr>

                        </thead>

                        <tbody>
                            {flattenedDeclarations.map((declaration) => (
                                <tr key={declaration.id}>
                                <td>{declaration.date}</td>
                                <td>{declaration.status}</td>
                                <td>{declaration.secretary}</td>
                                <td>
                                    <button onClick={() => exportRowAsPDF(declaration)} className="cert-export-button">Export as PDF</button>
                                </td>
                                <td
                                style={{
                                  cursor: 'pointer',
                                  color: declaration.state === 'Προβολή' ? 'blue' : 'inherit',
                                  textDecoration: declaration.state === 'Προβολή' ? 'underline' : 'none',
                                }}
                                onClick={declaration.state === 'Προβολή' ? navigateToTempdec : undefined}
                              >
                                {declaration.state}
                              </td>
                                <td>{declaration.comments}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
    )
};
  
  
const SecondTag = ({userData}) => {
 
    const user = userData[0];

    const [searchValues, setSearchValues] = useState({
        date: '',
        type: '',
        comments: '',
        secComments: '',
        state: '',
        actions: '',
    });
    

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
      
    // For PDF export
    const exportRowAsPDF = (rowData) => {
        const pdf = new jsPDF();
        
        pdf.text(20, 20, `Date: ${rowData.date}`);
        pdf.text(20, 30, `Type: ${rowData.type}`);
        pdf.text(20, 40, `Comments: ${rowData.comments}`);
        pdf.save("certificate.pdf");
    };

  
    return (
          <div>
              {/*--------- Breadcrumbs -------> */}
              <section id="breadcrumbs" class="breadcrumbs">
              <div class="container">
                  <div class="d-flex justify-content-between align-items-center">
                  <ol>
                      <li><a href="/"><i class="icofont-home"></i></a></li>
                      <li>Το ιστορικό μου</li>
                      <li>Πιστοποιητικά</li>
                  </ol>
                  </div>
              </div>
              </section>
              {/*--------- Breadcrumbs -------> */}

            <div className="second-tag-myhistory-table-title">
                <span>Ιστορικό Πιστοποιητικών</span>
            </div>

                <table className="myhistory-table-container">
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
                            {flattenedCertificates.map((certificate) => (
                                <tr key={certificate.id}>
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
    )
}
  
  
  function BasicTabs({ userData }) {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Δηλωσεις" {...a11yProps(0)} />
              <Tab label="Πιστοποιητικα" {...a11yProps(1)} />
              </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
              <FirstTag userData={userData}/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
              <SecondTag userData={userData}/>
          </CustomTabPanel>
      </Box>
    );
  }


  const Myhistorystud = ({db}) => {
    const [userData, setUserData] = useState([]);
    const userEmail = localStorage.getItem('email');
    
  
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
    
    
    return (
          <div>
              <Navbar/>
              <BasicTabs userData={userData}/>
              <ScrollToTop/>
              <Footer/>
          </div>
      );
  }
  
  export default Myhistorystud;