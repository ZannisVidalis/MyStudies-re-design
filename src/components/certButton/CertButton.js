import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import ProgressTracker from "../../components/progressTracker/ProgressTracker";
import './CertButton.css';


const CertButton = ({db}) => {
  const [showSelect, setShowSelect] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [selectedCertificate, setSelectedCertificate] = useState('');
  const [userInput, setUserInput] = useState('');

  const [addDate, setAddDate] = useState();
  const [addType, setAddType] =useState();
  const [addcomments, setAddComments] = useState();
  const [addSeccomments, setAddSecComments] = useState();
  const [addState, setAddState] = useState();
  const [addAction, setAddAction] = useState();

  const handleChange = (event) => {
    setSelectedCertificate(event.target.value);
  };

  const handleUserInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleFabClick = () => {
    setShowSelect(!showSelect);
  };

  const handleExitButtonClick = () => {
    setShowSelect(false); // Close the FAB (plus) button
    setCurrentSection(0); // Reset to the first section
    setSelectedCertificate('');
    setUserInput('');
  };

  const handleNextButtonClick = () => {
    setCurrentSection(currentSection + 1);
  };

  const handlePreviousButtonClick = () => {
    setCurrentSection(currentSection - 1);
  };

  const handleFinalizeButtonClick = () => {
    handleNextButtonClick();     
    pushCertFunc();
  };

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('el-GR');
    const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setAddDate(`${formattedDate} ${formattedTime}`);
    setAddType(selectedCertificate);
    setAddComments(userInput);
    setAddSecComments('');
    setAddState('Ολοκληρώθηκε');
    setAddAction('Αποθήκευση ως pdf');
  }, [selectedCertificate, userInput]);


  //----------------------------------------------------------------
  // Update user data
    async function pushCertFunc() {
      const certificate = {
        date: addDate || '',
        type: addType || '',
        comments: addcomments || '',
        secComments: addSeccomments || '',
        state: addState || '',
        actions: addAction || ''
      };
      try{
          // Get the users email from the local storage.
          const user_mail = localStorage.getItem('email')

          // For this user get all the data from the db
          const ref = doc(db, "users", user_mail)

          // The user's object has a 'courses' array. Update and push the new data in the array with arrayUnion function
          await updateDoc(ref, {
              certificates: arrayUnion(certificate)
          });

          console.log('Certificate added successfully');
      }catch(e){
          console.error('Error adding certificate:', e);
      }
    }

    const user_sex = localStorage.getItem('sex');
    
  return (
    <Grid container spacing={0} alignItems="center" className='cert'>
      <Grid item>
        <div className='fab-cont'>

          <button onClick={handleFabClick}>
            <AddIcon />
          </button>

        </div>
        
      </Grid>

      <Grid item>
        <span className='cert-span'>
          Αίτημα Πιστοποιητικού
        </span>
      </Grid>

      {showSelect && (
        <Grid item xs={12}>
          <div className='cert-row-container'>
            <div className='cert-row'>
              <span>Δημιουργία Αιτήματος Πιστοποιητικού</span>
              <button onClick={handleExitButtonClick}>ΕΞΟΔΟΣ</button>
            </div>

            <ProgressTracker currentSection={currentSection} />

            {currentSection === 0 && (
              <div className='cert-cont'>
                <div className='cert-choose'>
                  <span>Επιλογή Πιστοποιητικού</span>
                  
                  {user_sex === 'female'? (
                        <FormControl style={{ width: '50%'}}>
                        <InputLabel id="demo-simple-select-label" >Επιλέξτε Είδος Πιστοποιητικού</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={selectedCertificate}
                          onChange={handleChange}
                        >
                            <MenuItem value={'Φοιτητικής Ιδιότητας'}>Φοιτητικής Ιδιότητας</MenuItem>
                            <MenuItem value={'Φορολογικής Χρήσης'}>Φορολογικής Χρήσης</MenuItem>
                            <MenuItem value={'Αναλυτική Βαθμολογία με Προβιβάσιμους Βαθμούς'}>Αναλυτική Βαθμολογία με Προβιβάσιμους Βαθμούς</MenuItem>
                            <MenuItem value={'Βεβαίωση Κατάταξης Έτους Εισαγωγής'}>Βεβαίωση Κατάταξης Έτους Εισαγωγής</MenuItem>

                        </Select>
                        </FormControl>
                    ) : (
                      <FormControl style={{ width: '50%'}}>
                        <InputLabel id="demo-simple-select-label" >Επιλέξτε Είδος Πιστοποιητικού</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={selectedCertificate}
                          onChange={handleChange}
                        >
                            <MenuItem value={'Φοιτητικής Ιδιότητας'}>Φοιτητικής Ιδιότητας</MenuItem>
                            <MenuItem value={'Φορολογικής Χρήσης'}>Φορολογικής Χρήσης</MenuItem>
                            <MenuItem value={'Αναλυτική Βαθμολογία με Προβιβάσιμους Βαθμούς'}>Αναλυτική Βαθμολογία με Προβιβάσιμους Βαθμούς</MenuItem>
                            <MenuItem value={'Βεβαίωση Κατάταξης Έτους Εισαγωγής'}>Βεβαίωση Κατάταξης Έτους Εισαγωγής</MenuItem>
                            <MenuItem value={'Στρατολογική Χρήση (Συνοπτικό)'}>Στρατολογική Χρήση (Συνοπτικό)</MenuItem>
                            <MenuItem value={'Στρατολογική Χρήση (Αναλυτικό)'}>Στρατολογική Χρήση (Αναλυτικό)</MenuItem>
                        </Select>
                        </FormControl>
                    )}

                </div>

                <button onClick={handleNextButtonClick} disabled={selectedCertificate === ''}>Επόμενο</button>
              </div>
            )}

            {currentSection === 1 && (
              <div className='cert-cont'>
                <div className='cert-choose-second'>
                  <span>Σχόλιο</span>
                  <input
                    type='text'
                    placeholder='Σχόλια...'
                    value={userInput}
                    onChange={handleUserInputChange}
                  />
                </div>

                <div className='cert-navigation'>
                  <button onClick={handlePreviousButtonClick}>Προηγούμενο</button>
                  <button onClick={handleNextButtonClick}>Επόμενο</button>
                </div>
              </div>
            )}

            {currentSection === 2 && (
              <div className='cert-cont'>
                <div className='cert-choose-third'>
                    <span>Προεπισκόπιση των Επιλογών</span>
                    
                    {userInput === '' ? (
                        <span>Έχεις διαλέξει το πιστοποιητικό <span>" {selectedCertificate} "</span> και δεν έχεις γράψει σχόλια</span>
                    ) : (
                        <span>Έχεις διαλέξει το πιστοποιητικό <span>" {selectedCertificate} "</span> και έχεις γράψει για σχόλια τα εξής: <span>" {userInput} "</span></span>
                    )}

                </div>

                <div className='cert-navigation-third'>
                  <button onClick={handlePreviousButtonClick}>Προηγούμενο</button>
                  <button onClick={handleFinalizeButtonClick}>Οριστικοποίηση</button>
                </div>
              </div>
            )}

            {currentSection === 3 && (
              <div className='cert-cont'>
                <div className='cert-choose-fourth'>
                    <span>Η αίτηση για το πιστοποιητικό <span>" {selectedCertificate} "</span> έχει ολοκληρωθεί με επιτυχία</span>
                    <span>Μπορείς να ελέξγεις την πορεία εξέλιξης του αιτήματός σου στην ενότητητα 
                        <a href='/myhistory' className="history-link">Το ιστορικό μου</a>
                    </span>
                </div>
              </div>
            )}

          </div>
        </Grid>
      )}
    </Grid>
  );
};

export default CertButton;

