import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Myhistoryprof.css'

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
    const navigateToTempRat = () => {
        navigate("/temprating");
    };

    const filterRatings = userData.map((user) => ({
        ...user,
        rating: user.rating.filter((rate) =>
          Object.keys(searchValues).every((field) => {
            const searchValue = searchValues[field].toLowerCase();
            const rowValue = String(rate[field]).toLowerCase();
            return rowValue.includes(searchValue);
          })
        ),
      }));

    // Flatten the array of certificates
    const flattenedRatings = [].concat(...filterRatings.map((user) => user.rating));
    
    console.log("flattenedRatings:", flattenedRatings);

    // For PDF export
    const exportRowAsPDF = (rowData) => {
        const pdf = new jsPDF();
        
        pdf.text(20, 20, `Date: ${rowData.date}`);
        pdf.text(20, 30, `Status: ${rowData.status}`);
        pdf.text(20, 40, `State: ${rowData.state}`);  
        pdf.save("rating.pdf");
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
                      <li>Βαθμολόγιο</li>
                  </ol>
                  </div>
              </div>
              </section>
              {/*--------- Breadcrumbs -------> */}
              <div className="first-tag-myhistory-table-title">
                <span>Ιστορικό Βαθμολογιών</span>
            </div>

                <table className="myhistory-table-container">
                    <thead>
                    <tr>
                        <th>Ημερομηνία Βαθμολογίας</th>
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
                                placeholder="Ημερομηνία Βαθμολογίας..."
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
                            {flattenedRatings.map((rate) => (
                                <tr key={rate.id}>
                                <td>{rate.date}</td>
                                <td>{rate.status}</td>
                                <td>{rate.secretary}</td>
                                <td>
                                    <button onClick={() => exportRowAsPDF(rate)} className="cert-export-button">Export as PDF</button>
                                </td>
                                <td
                                style={{
                                  cursor: 'pointer',
                                  color: rate.state === 'Προβολή' ? 'blue' : 'inherit',
                                  textDecoration: rate.state === 'Προβολή' ? 'underline' : 'none',
                                }}
                                onClick={rate.state === 'Προβολή' ? navigateToTempRat : undefined}
                              >
                                {rate.state}
                              </td>
                                <td>{rate.comments}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

            </div>
    )
};
  
  

  
  function BasicTabs({ userData }) {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Βαθμολογιο" {...a11yProps(0)} />
              </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
              <FirstTag userData={userData}/>
          </CustomTabPanel>
      </Box>
    );
  }


  const Myhistoryprof = ({db}) => {
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
  
  export default Myhistoryprof;