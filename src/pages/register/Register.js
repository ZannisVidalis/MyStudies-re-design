import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore'
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { DataSyllabus } from '../../data/Data';
import 'icofont/dist/icofont.css';
import './Register.css'

export default function Register({db}){

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [mothersname, setMothersname] = useState('');
  const [fathersname, setFathersname] = useState('');
  const [birthday, setBirthday] = useState('');
  const [sex, setSex] = useState('');
  const [adt, setAdt] = useState('');
  const [amka, setAmka] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showPasswordRules, setShowPasswordRules] = useState(false);
    

  const evaluatePasswordStrength = (inputValue) => {
    // Password validation criteria
    const hasMinimumLength = inputValue.length >= 8;
    const hasUppercase = /[A-Z]/.test(inputValue);
    const hasLowercase = /[a-z]/.test(inputValue);
    const hasNumber = /\d/.test(inputValue);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(inputValue);

    const criteriaMet =
        hasMinimumLength && hasUppercase && hasLowercase && hasNumber && hasSpecialCharacter;

    if (!inputValue) {
        setPasswordStrength('');
    } else if (criteriaMet) {
        setPasswordStrength('strong');
    } else if (hasMinimumLength && (hasUppercase || hasLowercase || hasNumber || hasSpecialCharacter)) {
        setPasswordStrength('medium');
    } else {
        setPasswordStrength('weak');
    }
};

const handleInfoClick = () => {
    setShowPasswordRules(!showPasswordRules);
};

const isAdminEmail = email.endsWith("@admin.uoa.gr");

  // Handles the register functionality of the user
  async function handleRegister(e){
    e.preventDefault()
    
    // This object represents the user's form that it will be saved in our database.
    const docUser = {
        name: name,
        lastname: lastname,
        fathersname: fathersname,
        mothersname: mothersname,
        birthday: birthday,
        sex: sex,
        adt: adt,
        amka: amka,
        email: email,
        phone: phone,
        address, address,
        password: password,
        role: isAdminEmail ? "admin" : "student",

        ...(isAdminEmail
            ? {
                class: [
                    {
                        id: 1,
                        semester: "1ο",
                        code: 15100083,
                        lesson: "Εισαγωγή στην Πληροφορική και στις Τηλεποικινωνίες",
                        ects: "2",
                        assignments: "0",
                        grade_assignments:"-",
                        book: "Η επιστήμη των υπολογιστών – Μια ολοκληρωμένη παρουσίαση» (J. Glenn Brookshear, 10η Αμερικανική έκδοση, Εκδόσεις Κλειδάριθμος)"
                    },
                    {
                        id: 2,
                        semester: "1ο",
                        code: 15100471,
                        lesson: "Σχεδίαση και Χρήση Βάσεων Δεδομένων",
                        ects: "7",
                        assignments: "3",
                        grade_assignments:"20 % η κάθε μία",
                        book: "Elmasri, R., & Navathe, S. B. (2016). Θεμελιώδεις αρχές συστημάτων βάσεων δεδομένων (7η έκδοση). ΔΙΑΥΛΟΣ Α.Ε. ΕΚΔΟΣΕΙΣ ΒΙΒΛΙΩΝ."
                    },
                    {
                        id: 3,
                        semester: "1ο",
                        code: 15100301,
                        lesson: "Επικοινωνία Ανθρώπου Μηχανής",
                        ects: "6",
                        assignments: "3",
                        grade_assignments:"10%, 15%, 25%",
                        book: "βούρης, Ν., Κατσάνος, Χ., Τσέλιος, Ν., & Μουστάκας, Κ. (2016). Εισαγωγή στην Επικοινωνία Ανθρώπου-Υπολογιστή. Πάτρα: Εκδόσεις Πανεπιστημίου Πατρών.",
                    }
                ],
                rating:[
                    {
                        date: "10/11/24 10:01",
                        status: "Υποβληθείσα",
                        secretary: "Ναι",
                        state: "Ολοκληρώθηκε",
                        actions: "Λήψη ως pfd ",
                        comments: " ",
                        
                    },
                    {
                        date: "10/03/24 21:00",
                        status: "Υποβληθείσα",
                        secretary: "Οχι",
                        state: "Ολοκληρώθηκε",
                        actions: "Λήψη ως pfd ",
                        comments: " Ο καθηγητής ζήτησε ακύρωση",
                        
                    },
                    {
                        date: "10/11/23 16:45",
                        status: "Υποβληθείσα",
                        secretary: "Ναι",
                        state: "Ολοκληρώθηκε",
                        actions: "Λήψη ως pfd ",
                        comments: " ",
                        
                    }
                ],
            }
            : {
            semester: "1",
            courses: [
            {
                id: 1,
                semester: "1ο",
                code: 15100114,
                lesson: "Γραμμική Άλγεβρα",
                type: "Υποχρεωτικό",
                specialization: null,
                ects: "6",
                professor: "Νάκος Βασίλειος",
                assignments: "0",
                grade_assignments:"-",
                book: "Εισαγωγή στη Γραμμική Άλγεβρα Βάρσος, Δεριζιώτης, Μαλιάκας,Ταλέλλη",
                grade: 10,
                passed: "ΕΞ(Χ) 2020 - 2021"
            },
            {
                id: 2,
                semester: "1ο",
                code: 15100010,
                lesson: "Διακριτά Μαθηματικά",
                type: "Υποχρεωτικό",
                specialization: null,
                ects: "7",
                professor: "Χρήστος Τζάμος & Γιάννης Χαμόδρακας",
                assignments: "0",
                grade_assignments:"-",
                book: "K.H. Rosen. Διακριτά Μαθηματικά και Εφαρμογές τους.7η Έκδοση, Εκδόσεις Τζιόλα, 2015.",
                grade: 4,
                passed: "ΕΞ(Χ) 2020 - 2021"
            },
            {
                id: 3,
                semester: "1ο",
                code: 15100083,
                lesson: "Εισαγωγή στην Πληροφορική και στις Τηλεπικινωνίες",
                type: "Γενικής Παιδείας",
                specialization: null,
                ects: "2",
                professor: "Ρούσσου Μαρία",
                assignments: "0",
                grade_assignments:"-",
                book: "Η επιστήμη των υπολογιστών – Μια ολοκληρωμένη παρουσίαση» (J. Glenn Brookshear, 10η Αμερικανική έκδοση, Εκδόσεις Κλειδάριθμος)",
                grade: null,
                passed: null
            }
            
            ],
            declarations:[
                {
                    date: "10/11/24 10:01",
                    status: "Υποβληθείσα",
                    secretary: "Ναι",
                    state: "Ολοκληρώθηκε",
                    actions: "Λήψη ως pfd ",
                    comments: " ",
                    lesson: [
                        {
                        id: 1,
                        semester: "1ο",
                        code: 15100114,
                        lesson: "Γραμμική Άλγεβρα",
                        type: "Υποχρεωτικό",
                        specialization: null,
                        ects: "6",
                        professor: "Νάκος Βασίλειος",
                        assignments: "0",
                        grade_assignments:"-",
                        book: "Εισαγωγή στη Γραμμική Άλγεβρα Βάρσος, Δεριζιώτης, Μαλιάκας,Ταλέλλη",
                        grade: 10,
                        mandatory: null,
                        passed: null
                        },
                        {
                        id: 2,
                        semester: "1ο",
                        code: 15100010,
                        lesson: "Διακριτά Μαθηματικά",
                        type: "Υποχρεωτικό",
                        specialization: null,
                        ects: "7",
                        professor: "Χρήστος Τζάμος & Γιάννης Χαμόδρακας",
                        assignments: "0",
                        grade_assignments:"-",
                        book: "K.H. Rosen. Διακριτά Μαθηματικά και Εφαρμογές τους.7η Έκδοση, Εκδόσεις Τζιόλα, 2015.",
                        grade: 4,
                        mandatory: null,
                        passed: null
                        },
                        {
                        id: 3,
                        semester: "1ο",
                        code: 15100083,
                        lesson: "Εισαγωγή στην Πληροφορική και στις Τηλεπικινωνίες",
                        type: "Γενικής Παιδείας",
                        specialization: null,
                        ects: "2",
                        professor: "Ρούσσου Μαρία",
                        assignments: "0",
                        grade_assignments:"-",
                        book: "Η επιστήμη των υπολογιστών – Μια ολοκληρωμένη παρουσίαση» (J. Glenn Brookshear, 10η Αμερικανική έκδοση, Εκδόσεις Κλειδάριθμος)",
                        grade: null,
                        mandatory: null,
                        passed: null
                        }
                    ] 
                },
                {
                    date: "10/03/24 21:00",
                    status: "Υποβληθείσα",
                    secretary: "Οχι",
                    state: "Ολοκληρώθηκε",
                    actions: "Λήψη ως pfd ",
                    comments: " Ο φοιτητής ζήτησε ακύρωση",
                    lesson: [
                        {
                        id: 1,
                        semester: "1ο",
                        code: 15100114,
                        lesson: "Γραμμική Άλγεβρα",
                        type: "Υποχρεωτικό",
                        specialization: null,
                        ects: "6",
                        professor: "Νάκος Βασίλειος",
                        assignments: "0",
                        grade_assignments:"-",
                        book: "Εισαγωγή στη Γραμμική Άλγεβρα Βάρσος, Δεριζιώτης, Μαλιάκας,Ταλέλλη",
                        grade: 10,
                        mandatory: null,
                        passed: null
                        },
                        {
                        id: 2,
                        semester: "1ο",
                        code: 15100010,
                        lesson: "Διακριτά Μαθηματικά",
                        type: "Υποχρεωτικό",
                        specialization: null,
                        ects: "7",
                        professor: "Χρήστος Τζάμος & Γιάννης Χαμόδρακας",
                        assignments: "0",
                        grade_assignments:"-",
                        book: "K.H. Rosen. Διακριτά Μαθηματικά και Εφαρμογές τους.7η Έκδοση, Εκδόσεις Τζιόλα, 2015.",
                        grade: 4,
                        mandatory: null,
                        passed: null
                        },
                        {
                        id: 3,
                        semester: "1ο",
                        code: 15100083,
                        lesson: "Εισαγωγή στην Πληροφορική και στις Τηλεπικινωνίες",
                        type: "Γενικής Παιδείας",
                        specialization: null,
                        ects: "2",
                        professor: "Ρούσσου Μαρία",
                        assignments: "0",
                        grade_assignments:"-",
                        book: "Η επιστήμη των υπολογιστών – Μια ολοκληρωμένη παρουσίαση» (J. Glenn Brookshear, 10η Αμερικανική έκδοση, Εκδόσεις Κλειδάριθμος)",
                        grade: null,
                        mandatory: null,
                        passed: null
                        }
                    ] 
                },
                {
                    date: "10/11/23 16:45",
                    status: "Υποβληθείσα",
                    secretary: "Ναι",
                    state: "Ολοκληρώθηκε",
                    actions: "Λήψη ως pfd ",
                    comments: " ",
                    lesson: [
                        {
                        id: 1,
                        semester: "1ο",
                        code: 15100114,
                        lesson: "Γραμμική Άλγεβρα",
                        type: "Υποχρεωτικό",
                        specialization: null,
                        ects: "6",
                        professor: "Νάκος Βασίλειος",
                        assignments: "0",
                        grade_assignments:"-",
                        book: "Εισαγωγή στη Γραμμική Άλγεβρα Βάρσος, Δεριζιώτης, Μαλιάκας,Ταλέλλη",
                        grade: 10,
                        mandatory: null,
                        passed: null
                        },
                        {
                        id: 2,
                        semester: "1ο",
                        code: 15100010,
                        lesson: "Διακριτά Μαθηματικά",
                        type: "Υποχρεωτικό",
                        specialization: null,
                        ects: "7",
                        professor: "Χρήστος Τζάμος & Γιάννης Χαμόδρακας",
                        assignments: "0",
                        grade_assignments:"-",
                        book: "K.H. Rosen. Διακριτά Μαθηματικά και Εφαρμογές τους.7η Έκδοση, Εκδόσεις Τζιόλα, 2015.",
                        grade: 4,
                        mandatory: null,
                        passed: null
                        },
                        {
                        id: 3,
                        semester: "1ο",
                        code: 15100083,
                        lesson: "Εισαγωγή στην Πληροφορική και στις Τηλεπικινωνίες",
                        type: "Γενικής Παιδείας",
                        specialization: null,
                        ects: "2",
                        professor: "Ρούσσου Μαρία",
                        assignments: "0",
                        grade_assignments:"-",
                        book: "Η επιστήμη των υπολογιστών – Μια ολοκληρωμένη παρουσίαση» (J. Glenn Brookshear, 10η Αμερικανική έκδοση, Εκδόσεις Κλειδάριθμος)",
                        grade: null,
                        mandatory: null,
                        passed: null
                        }
                    ] 
                }
            ],
            certificates:[
                {
                    date: "12/05/24 10:01",
                    type: "Βαθμολογία",
                    comments: " ",
                    secComments: " ",
                    state: "Ολοκληρώθηκε",
                    actions: "Λήψη ως pfd"
                },
                {
                    date: "10/05/24 10:01",
                    type: "Αναλυτική Βαθμολογία",
                    comments: " ",
                    secComments: " ",
                    state: "Εκκρεμεί",
                    actions: " "
                },
                {
                    date: "12/06/24 10:01",
                    type: "Αναλυτική Βαθμολογία",
                    comments: " ",
                    secComments: " ",
                    state: "Ολοκληρώθηκε",
                    actions: "Λήψη ως pfd"
                }
            ]

            })
    };


    try{
       // Create a Firebase doc that 'points' to our db and creates a collection "users" with primary key the email of the user
      const ref_user = doc(db, "users", email)
      // Then we use setDoc to push the 'user object' to the referenced user
      const res_user = await setDoc(ref_user, docUser);

      // At the same time we push all the courses at the db.
      // We create a 'courses' collection with primary key 'all_courses'
      const ref_courses = doc(db, "courses", "all_courses")
      const res_courses = await setDoc(ref_courses, DataSyllabus);

      try {
        const res_user = await setDoc(ref_user, docUser);
        console.log('User Document Added:', res_user);
        // ... rest of the code
      } catch (e) {
        console.error('Error Adding User Document:', e);
      }
      
      // Redirect to login route
        localStorage.setItem('role', isAdminEmail ? "admin" : "student");
        localStorage.setItem('email', email)
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('sex', sex)
      window.location.href = '/myhome'

    }catch(e){
      console.log(e)
    }
    
  }
    return(
        <div>
            <Navbar/>
                    
                    {/*--------- Breadcrumbs -------> */}
                    <section id="breadcrumbs" className="breadcrumbs">
                        <div className="container">
                            <div className="d-flex justify-content-between align-items-center">
                                <ol>
                                    <li><a href="/"><i className="icofont-home"></i></a></li>
                                    <li>Εγγραφή</li>
                                </ol>
                            </div>
                        </div>
                    </section>
                    {/*--------- Breadcrumbs -------> */}

                    <div className='row justify-content-center'>
                    <div className='register' >    
                    <form onSubmit={handleRegister} className='register-container'>
                        <h1 style={{ fontWeight: 'bold' }}>Εγγραφή</h1>
                        <hr/>
                            <p style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>Συμπληρώστε το όνομα χρήστη και τον κωδικό σας για να δημιουργήσετε λογαρισμό για τον ιστοχώρο του Πανεπιστημίου.</p>
                        <hr />
                        <div className='register-row col-md-6'>
                               
                                <label> Όνομα </label>
                                &nbsp;&nbsp;&nbsp;
                                <input
                                    type="Name"
                                    value={name}
                                    onChange={(e) => {
                                    const onlyLetters = /^[a-zA-Z\s]*$/;
                                    if (onlyLetters.test(e.target.value) || e.target.value === '') {
                                        setName(e.target.value);
                                    }}}
                                />
                                <label>Επίθετο</label>
                                &nbsp;&nbsp;&nbsp;
                                <input
                                    type="LastName"
                                    value={lastname}
                                    onChange={(e) => {
                                        const onlyLetters = /^[a-zA-Z\s]*$/;
                                        if (onlyLetters.test(e.target.value) || e.target.value === '') {
                                            setLastname(e.target.value);
                                        }}}
                                />
                            </div>
                            <div className='register-row col-md-6'>
                            <label> Όνομα Πατέρα</label>
                                &nbsp;&nbsp;&nbsp;
                                <input style={{ marginRight: '5px' }}
                                    type="Fathersname"
                                    value={fathersname}
                                    onChange={(e) => {
                                        const onlyLetters = /^[a-zA-Z\s]*$/;
                                        if (onlyLetters.test(e.target.value) || e.target.value === '') {
                                            setFathersname(e.target.value);
                                        }}}
                                />
                                <label>Όνομα Μητέρας</label>
                                &nbsp;&nbsp;&nbsp;
                                <input
                                    type="Mothersname"
                                    value={mothersname}
                                    onChange={(e) => {
                                        const onlyLetters = /^[a-zA-Z\s]*$/;
                                        if (onlyLetters.test(e.target.value) || e.target.value === '') {
                                            setMothersname(e.target.value);
                                        }}}
                                />
                            </div>
                            <div className='register-row col-md-6'>
                            <label> Ημερομηνία Γέννησης</label>
                                <input
                                    type="birthday"
                                    value={birthday}
                                    onChange={(e) => {
                                        const onlyNumbersAndSpaces = /^[0-9\s]*$/;
                                        if (onlyNumbersAndSpaces.test(e.target.value) || e.target.value === '') {
                                            setBirthday(e.target.value);
                                        }
                                    }}
                                />
                                <label>Φύλο</label>
                                <select
                                    value={sex}
                                    onChange={(e) => setSex(e.target.value)}
                                >
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="nonBinary">Non-Binary</option>
                                </select>
                            </div>
                            <div className='register-row col-md-6'>    
                                <label>ΑΜΚΑ</label>
                                <input
                                    type="ΑΜΚΑ"
                                    value={amka}
                                    onChange={(e) => {
                                        const onlyLetters = /^[0-9\s]*$/;
                                        if (onlyLetters.test(e.target.value) || e.target.value === '') {
                                            setAmka(e.target.value);
                                        }}}
                                />
                                
                                <label > ΑΔΤ</label>
                                <input
                                    type="adt"
                                    value={adt}
                                    onChange={(e) => {
                                        const onlyLetters = /^[A-Z0-9\s]*$/;
                                        if (onlyLetters.test(e.target.value) || e.target.value === '') {
                                            setAdt(e.target.value);
                                        }}}
                                />
                            </div>
                            <div className='register-row col-md-6'>    
                                <label>Τηλέφωνο</label>
                                <input
                                    type="phone"
                                    value={phone}
                                    onChange={(e) => {
                                        const onlyLetters = /^[0-9\s]*$/;
                                        if (onlyLetters.test(e.target.value) || e.target.value === '') {
                                            setPhone(e.target.value);
                                        }}}
                                />
                                <label>Διεύθυνση</label>
                                <input
                                    type="address"
                                    value={address}
                                    onChange={(e) => {
                                        const onlyLettersNumbersAndSpaces = /^[a-zA-Z0-9\s]*$/;
                                        if (onlyLettersNumbersAndSpaces.test(e.target.value) || e.target.value === '') {
                                            setAddress(e.target.value);
                                        }}}
                                />
                            </div>
                            <div className='register-row col-md-6'>
                            
                            <label>Email</label>
                                &nbsp;&nbsp;&nbsp;
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        const emailRegex = /^[a-z0-9_\-\.\@]*$/;
                                        if (emailRegex.test(e.target.value) || e.target.value === '') {
                                            setEmail(e.target.value);
                                        }}}
                                />
                                <label>Κωδικός</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        setPassword(inputValue);
                                        evaluatePasswordStrength(inputValue);
                                    }}
                                />
                                <div className={`password-strength ${passwordStrength}`}>
                                    {passwordStrength === 'strong' && 'Strong Password'}
                                    {passwordStrength === 'medium' && 'Medium Password'}
                                    {passwordStrength === 'weak' && 'Weak Password'}
                                </div>
                                <div className="info-button" onClick={handleInfoClick}>
                                ℹ️
                                {showPasswordRules && (
                                    <div className="password-rules">
                                <ul>
                                    <li>Minimum length of 8 characters</li>
                                    <li>At least one uppercase letter</li>
                                    <li>At least one lowercase letter</li>
                                    <li>At least one number</li>
                                    <li>At least one special character</li>
                                </ul>
                                    </div>
                                )}
                                </div>
                                </div>
                            <button type='submit'>Register</button>
                            <a href='/login' className="create-user-link">Already have an Account?</a>
                        </form>
                </div>       
        </div>
    <Footer/>
    </div>
    )
}