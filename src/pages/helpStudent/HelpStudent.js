import React, { useState } from "react";
import "./HelpStudent.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import ScrollToTop from "../../components/scrollToTop/ScrollToTop";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';

const HelpStudent = () => {
  const [openState, setOpenState] = useState(Array(5).fill(false));

  const toggleFAQ = (index) => {
    const newOpenState = [...openState];
    newOpenState[index] = !newOpenState[index];
    setOpenState(newOpenState);
  };

  return (
    <div>
        <Navbar />
        {/*--------- Breadcrumbs -------> */}
        <section id="breadcrumbs" class="breadcrumbs">
            <div class="container">
                <div class="d-flex justify-content-between align-items-center">
                <ol>
                    <li><a href="/"><i class="icofont-home"></i></a></li>
                    <li><a href="/help">Βοήθεια</a></li>
                    <li>Φοιτητές</li>
                </ol>
                </div>
            </div>
            </section>
            {/*--------- Breadcrumbs -------> */}

        <div className="faq-container">
            <h1>FREQUENTLY ASKED QUESTIONS</h1>

            <div className="faq-main" onClick={() => toggleFAQ(0)}>
                <div className="faq-question">
                    <h3>Πώς δηλώνω μαθήματα;</h3>
                    <IconButton color="primary">
                        {openState[0] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </div>
                <div
                    className={`faq-answer ${
                    openState[0] ? "faq-answer-open" : "faq-answer-closed"
                    }`}
                >
                    <p>Για να δηλώσεις ένα μάθημα:<br/><br/>
                        1. Πήγαινε στις <a href="/declaration">Δηλώσεις</a>.<br/><br/>
                        2. Επίλεξε τα μαθήματα που επιθυμείς τικάροντας τα κουτάκια αριστερά και την κατεύθυνση στην οποία τα δηλώνεις, όπου χρειάζεται. 
                        Μπορείς και να τα αναζητήσεις από οποιοδήποτε πεδίο του πίνακα.<br/><br/>
                        3. Πάτα στο κουμπί "Αποθήκευση", που σε οδηγεί στην σελίδα "Προσωρινή Αποθήκευση" 
                        όπου φαίνεται μια προεπισκόπηση της δήλωσης σου. <br/><br/>
                        4. Τέλος, πάτα το κουμπί "Οριστικοποίηση" για να οριστικοποιήσεις την δήλωσή σου. Αν θεωρείς ότι δεν είναι ακόμα έτοιμη, πάτα προσωρινή 
                        αποθήκευση και έλα πίσω αργότερα. Αν θέλεις να  την επεξεργαστείς, πάτα επεξεργσία και συνέχισε πάλι από το βήμα 2.</p>
                </div>
            </div>

            <div className="faq-main" onClick={() => toggleFAQ(1)}>
                <div className="faq-question">
                    <h3>Πώς αλλάζω διεύθυνση email;</h3>
                    <IconButton color="primary">
                        {openState[1] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </div>
                <div
                    className={`faq-answer ${
                    openState[1] ? "faq-answer-open" : "faq-answer-closed"
                    }`}
                >
                    <p>Για να αλλάξεις την διεύθυνση email σου:<br/><br/>
                    1. Εφόσον είσαι συνδεδεμένος στο προφίλ σου, πάτα <a href="/profile">Το προφίλ μου</a>.<br/><br/>
                    2. Έπειτα, διάλεξε την κατηγορία "ΠΡΟΣΩΠΙΚΑ ΣΤΟΙΧΕΙΑ" απο πάνω.<br/><br/>
                    3. Εκεί βρίσκεται το κουμπί ΕΠΕΞΕΡΓΑΣΙΑ. Πατώντας το κουμπί, εμφανίζεται σχετική φόρμα απο την οποία μπορείς να αλλάξεις το email σου (και όχι μόνο).<br/><br/>
                    4. Τέλος πάτα το κουμπί ΑΠΟΘΗΚΕΥΣΗ στο τέλος της φόρμας ώστε να περαστεί η αλλαγή.</p>
                </div>
            </div>

            <div className="faq-main" onClick={() => toggleFAQ(2)}>
                <div className="faq-question">
                    <h3>Πώς αλλάζω κωδικό;</h3>
                    <IconButton color="primary">
                        {openState[2] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </div>
                <div
                    className={`faq-answer ${
                    openState[2] ? "faq-answer-open" : "faq-answer-closed"
                    }`}
                >
                    <p>Για να αλλάξεις τον κωδικό σου:<br/><br/>
                    1. Εφόσον είσαι συνδεδεμένος στο προφίλ σου, πάτα <a href="/profile">Το προφίλ μου</a>.<br/><br/>
                    3. Έπειτα, διάλεξε την κατηγορία "ΠΡΟΣΩΠΙΚΑ ΣΤΟΙΧΕΙΑ" απο πάνω. <br/><br/>
                    4. Εκεί βρίσκεται το κουμπί ΕΠΕΞΕΡΓΑΣΙΑ. Πατώντας το κουμπί, εμφανίζεται σχετική φόρμα απο την οποία μπορείς να αλλάξεις το email σου (και όχι μόνο).<br/><br/>
                    3. Τέλος πάτα το κουμπί ΑΠΟΘΗΚΕΥΣΗ στο τέλος της φόρμας ώστε να περαστεί η αλλαγή.
                    </p>
                </div>
            </div>

            <div className="faq-main" onClick={() => toggleFAQ(3)}>
                <div className="faq-question">
                    <h3>Πώς κάνω αίτηση για πιστοποιητικό</h3>
                    <IconButton color="primary">
                        {openState[3] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </div>
                <div
                    className={`faq-answer ${
                    openState[3] ? "faq-answer-open" : "faq-answer-closed"
                    }`}
                >
                    <p>Για να κάνεις αίτηση για πιστοποιητικό:<br/><br/>
                    1. Πάτα στα <a href="/declaration">Πιστοποιητικά</a>. <br/><br/>
                    2. Πάτα "Αίτημα Πιστοποιητικού". <br/><br/>
                    3. Επίλεξε από το menu επιλογών εκείνο που επιθυμείς.
                    </p>
                </div>
            </div>

            <div className="faq-main" onClick={() => toggleFAQ(4)}>
                <div className="faq-question">
                    <h3>Πώς εντοπίζω ένα μάθημα στο πρόγραμμα σπουδών;</h3>
                    <IconButton color="primary">
                        {openState[4] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </div>
                <div
                    className={`faq-answer ${
                    openState[4] ? "faq-answer-open" : "faq-answer-closed"
                    }`}
                >
                    <p>Για να εντοπίσεις ένα μάθημα στο πρόγραμμα σπουδών πάτα στο Φοιτητές/τριες - Θέματα Φοίτησης - <a href="/syllabus">Πρόγραμμα Σπουδών</a> 
                    όπου μπορείς με την χρήση των φίλτρων στην αρχή του πίνακα να περιηγηθείς και να βρείς το μάθημα που αναζητάς.
                    </p>
                </div>
            </div>

        </div>
                
        <ScrollToTop/>
        <Footer />
    </div>
  );
};

export default HelpStudent;