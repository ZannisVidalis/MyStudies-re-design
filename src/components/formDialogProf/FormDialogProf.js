import React, {useState} from "react"

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { doc, updateDoc, getDoc } from 'firebase/firestore';


export default function FormDialog({ db, userData, index }) {
    const user = userData[0];

    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
        assignments: user.assignments || '',
        grade_assignments: user.grade_assignments || '',
        book: user.book || ''
    });
  
    const handleClickOpen = () => {
        setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
    };
  
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };


    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const user_mail = localStorage.getItem('email');
            const userRef = doc(db, "users", user_mail);
    
            // Fetch the current data from the document
            const userDoc = await getDoc(userRef);
    
            if (userDoc.exists()) {
                const currentData = userDoc.data().class;
                console.log("curr", currentData);
    
                // Specify the index of the class you want to update
                const classIndex = index-1;
                
                // Compare each field in formData with the specified class
                const updatedData = currentData.map((classData, index) => {
                    if (index === classIndex) {
                        return {
                            ...classData,
                            assignments: formData.assignments,
                            grade_assignments: formData.grade_assignments,
                            book: formData.book,
                        };
                    }
                    return classData;
                });
    
                // Perform the update in Firebase
                await updateDoc(userRef, { class: updatedData });
    
                console.log("User data updated:", updatedData);
            } else {
                console.error("User document not found");
            }
        } catch (error) {
            console.error('Error updating data in Firebase:', error.message, error.code);
        }
    
        handleClose();
    };
    
      

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Επεξεργασια
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleFormSubmit,
                }}
            >
            <DialogTitle>Επεξεργασία Μαθήματος</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Ενημέρωσε τα στοιχεία του μαθήματος σου
                </DialogContentText>
                
                
                <TextField
                    margin="dense"
                    id="assignments"
                    name="assignments"
                    label="Εργασίες"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={formData.assignments}
                    onChange={handleInputChange}
                />

                <TextField
                    margin="dense"
                    id="grade_assignments"
                    name="grade_assignments"
                    label="Βαθμολόγηση Εργασίων"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={formData.grade_assignments}
                    onChange={handleInputChange}
                />

                <TextField
                    margin="dense"
                    id="book"
                    name="book"
                    label="Σύγγραμα"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={formData.book}
                    onChange={handleInputChange}
                />
        
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Ακυρωση</Button>
                <Button type="submit">Αποθηκευση</Button>
            </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}