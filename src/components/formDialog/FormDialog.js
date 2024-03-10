import React, {useState} from "react"

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { doc, updateDoc, getDoc } from 'firebase/firestore';


export default function FormDialog({ db, userData }) {
    const user = userData[0];

    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
        email: user.email,
        fathersname: user.fathersname || '',
        mothersname: user.mothersname || '',
        birthday: user.birthday || '',
        sex: user.sex || '',
        amka: user.amka || '',
        adt: user.adt || '',
        phone: user.phone || '',
        address: user.address || ''
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
      
            //Fetch the current data from the document
            const userDoc = await getDoc(userRef);
      
            if (userDoc.exists()) {
                const currentData = userDoc.data();

                // Compare each field in formData with currentData
                const updatedData = {};
                Object.entries(formData).forEach(([key, value]) => {
                if (value !== currentData[key]) {
                    updatedData[key] = value;
                }
                });
        
                // Perform the update in Firebase
                await updateDoc(userRef, updatedData);
        
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
            <DialogTitle>Επεξεργασία Προφίλ</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Ενημέρωσε τα στοιχεία προφίλ σου
                </DialogContentText>
                
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="email"
                    name="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                    value={formData.email}
                    onChange={handleInputChange}
                />

                <TextField
                    margin="dense"
                    id="fathersname"
                    name="fathersname"
                    label="Fathers Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={formData.fathersname}
                    onChange={handleInputChange}
                />

                <TextField
                    margin="dense"
                    id="mothersname"
                    name="mothersname"
                    label="Mothers Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={formData.mothersname}
                    onChange={handleInputChange}
                />

                <TextField
                    margin="dense"
                    id="birthday"
                    name="birthday"
                    label="Birthday"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={formData.birthday}
                    onChange={handleInputChange}
                />
    
                <TextField
                    margin="dense"
                    id="sex"
                    name="sex"
                    label="Sex"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={formData.sex}
                    onChange={handleInputChange}
                />

                <TextField
                    margin="dense"
                    id="amka"
                    name="amka"
                    label="AMKA"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={formData.amka}
                    onChange={handleInputChange}
                />
    
                <TextField
                    margin="dense"
                    id="adt"
                    name="adt"
                    label="ADT"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={formData.adt}
                    onChange={handleInputChange}
                />

                <TextField
                    margin="dense"
                    id="phone"
                    name="phone"
                    label="Phone Number"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={formData.phone}
                    onChange={handleInputChange}
                />

                <TextField
                    margin="dense"
                    id="address"
                    name="address"
                    label="Address"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={formData.address}
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