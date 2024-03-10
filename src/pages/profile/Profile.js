import React, { useState, useEffect } from 'react';
import './Profile.css'
import Navbar from "../../components/navbar/Navbar"
import Footer from "../../components/footer/Footer"
import ScrollToTop from "../../components/scrollToTop/ScrollToTop";
import { collection, getDocs, query, where } from 'firebase/firestore';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import logo from '../../images/student 1.png'
import FormDialog from "../../components/formDialog/FormDialog"

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
  const user = userData.length > 0 ? userData[0] : null;
  const user_role = localStorage.getItem('role');


  if (!user) {
    return <div>Loading...</div>;
  }  
  
  return (
        <div>
            {/*--------- Breadcrumbs -------> */}
            <section id="breadcrumbs" class="breadcrumbs">
            <div class="container">
                <div class="d-flex justify-content-between align-items-center">
                <ol>
                    <li><a href="/"><i class="icofont-home"></i></a></li>
                    <li>Το προφίλ μου</li>
                    <li>Γενικά Στοιχεία</li>
                </ol>
                </div>
            </div>
            </section>
            {/*--------- Breadcrumbs -------> */}

            {user_role === 'student' ? (
                <div className="first-tag-profile">
                    <div className="f-t-profile-row">
                        <div className="f-t-profile-image">
                            <img src={logo} alt=""/>
                        </div>
                        <div className="f-t-profile-sdi">
                            <h1>{user.lastname}</h1>
                            <h1>{user.name}</h1>
                            <h2>1115202000216</h2>
                        </div>
                    </div>
                    <div className="f-t-profile-second-row">
                        <div className="f-t-profile-categ">
                            <span>Ακαδημαϊκή Ταυτότητα</span>
                            <span>Τμήμα</span>
                            <span>Πρόγραμμα Σπουδών</span>
                            <span>Κατάσταση Φοιτητή</span>
                            <span>Ακαδημαϊκό Έτος 1ης Εγγραφής</span>
                            <span>Ανώτατη Διάρκεια Φοίτησης</span>
                        </div>
                        <div className="f-t-profile-answ">
                            <span>207585454475</span>
                            <span>ΠΛΗΡΟΦΟΡΙΚΗΣ ΚΑΙ ΤΗΛΕΠΙΚΟΙΝΩΝΙΩΝ</span>
                            <span>ΟΔΗΓΟΣ ΣΠΟΥΔΩΝ 2020 - Σήμερα</span>
                            <span>7ο ΕΞΑΜΗΝΟ</span>
                            <span>2020</span>
                            <span>2020-2027</span>
                        </div>
                    </div>
                </div>
            ) :(
                  <div className="first-tag-profile">
                  <div className="f-t-profile-row">
                      <div className="f-t-profile-image">
                          <img src={logo} alt=""/>
                      </div>
                      <div className="f-t-profile-sdi">
                          <h1>{user.lastname}</h1>
                          <h1>{user.name}</h1>
                          <h2>1115202000216</h2>
                      </div>
                  </div>
                  <div className="f-t-profile-second-row">
                      <div className="f-t-profile-categ">
                          <span>Τμήμα</span>
                          <span>Ιδιότητα</span>
                          <span>Βαθμίδα</span>
                          <span>Τομέας</span>
                          <span>Μαθήματα που διδάσκω</span>
                      </div>
                      <div className="f-t-profile-answ">
                          <span>Πληροφικής & Τηλεπικοινωνίων</span>
                          <span>Διδακτικό Ερευνητικό Προσωπικό (ΔΕΠ)</span>
                          <span>Αναπληρώτρια Καθηγήτρια</span>
                          <span>Υπολογιστικά Συστήματα και Εφαρμογές</span>
                          <span>Επικοινωνία Ανθρώπου Μηχανής (Χειμερινό) <br/> Σχεδίαση & Χρήση Βάσεων δεδομένων (Εαρινό )</span>
                      </div>
                  </div>
              </div>
            )}
        </div>
    );
};


const SecondTag = ({db, userData}) => {

  const user = userData.length > 0 ? userData[0] : null;

  if (!user) {
    return <div>Loading...</div>;
  }  

  return (
        <div>
            {/*--------- Breadcrumbs -------> */}
            <section id="breadcrumbs" class="breadcrumbs">
            <div class="container">
                <div class="d-flex justify-content-between align-items-center">
                <ol>
                    <li><a href="/"><i class="icofont-home"></i></a></li>
                    <li>Το προφίλ μου</li>
                    <li>Προσωπικά Στοιχεία</li>
                </ol>
                </div>
            </div>
            </section>
            {/*--------- Breadcrumbs -------> */}

            <div className='pro-info' style={{ fontStyle: 'italic' }}> 
                Μετά από κάθε ενέργεα ανανεώστε την σελίδα για να δείτε τις αλλάγες στον πίνακα πληροφοριών. 
            </div>

            <div className="second-tag-profile">

                <div className="s-t-profile-row">

                    <div className="s-t-profile-categ">
                        <span>Όνομα Πατέρα <br /></span>
                        <span>Όνομα Μητέρας <br /></span>
                        <span>Ημερομηνία Γέννησης</span>
                        <span>Φύλο</span>
                        <span>ΑΜΚΑ</span>
                        <span>Αριθμός Ταυτότητας</span> 
                        <span>Τηλέφωνο</span>                  
                        <span>Διεύθυνση Κατοικίας</span>
                        <span>Διεύθυνση Ηλεκτρονικού Ταχυδρομείου</span>
                    </div>
                    <div className="s-t-profile-answ">
                      <div>
                        <span style={{ display: 'block', marginBottom: '11px' }}>{user.fathersname}<br /> </span>
                        <span style={{ display: 'block', marginBottom: '11px' }}>{user.mothersname}<br /></span>
                        <span style={{ display: 'block', marginBottom: '11px' }}>{user.birthday}<br /></span>
                        <span style={{ display: 'block', marginBottom: '11px' }}>{user.sex}<br /></span>
                        <span style={{ display: 'block', marginBottom: '11px' }}> {user.amka}<br /></span>
                        <span style={{ display: 'block', marginBottom: '11px' }}>{user.adt}<br /></span>
                        <span style={{ display: 'block', marginBottom: '11px' }}>{user.phone}<br /></span>
                        <span style={{ display: 'block', marginBottom: '11px' }}>{user.address}<br /></span>
                        <span style={{ display: 'block', marginBottom: '11px' }}>{user.email}<br /></span>
                      </div>
                    </div>

                </div>

            </div>
            
            <div className="s-t-profile-edit-button">
                <FormDialog userData={userData} db={db} />
            </div>

        </div>
    )
}


function BasicTabs({ db, userData }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Γενικα Στοιχεια" {...a11yProps(0)} />
            <Tab label="Προσωπικα Στοιχεια" {...a11yProps(1)} />
            </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
            <FirstTag userData={userData}/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
            <SecondTag userData={userData} db={db}/>
        </CustomTabPanel>
    </Box>
  );
}

const Profile = ({db}) => {
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
            <BasicTabs userData={userData} db={db}/>
            <ScrollToTop/>
            <Footer/>
        </div>
    );
}

export default Profile;