import React, { useState } from "react";
import "./HelpProfessor.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import ScrollToTop from "../../components/scrollToTop/ScrollToTop";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';

const HelpProfessor = () => {
  const [openState, setOpenState] = useState(Array(3).fill(false));

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
                    <li>Διδάσκοντες/ουσες</li>
                </ol>
                </div>
            </div>
            </section>
            {/*--------- Breadcrumbs -------> */}

        <div className="faq-container-professor">
            <h1>FREQUENTLY ASKED QUESTIONS</h1>

            <div className="faq-main-professor" onClick={() => toggleFAQ(0)}>
                <div className="faq-question-professor">
                    <h3>Πώς περνάω βαθμούς;</h3>
                    <IconButton color="primary">
                        {openState[0] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </div>
                <div
                    className={`faq-answer-professor ${
                    openState[0] ? "faq-answer-open-professor" : "faq-answer-closed-professor"
                    }`}
                >
                    <p> Για να περάσεις βαθμούς στο μάθημά σου:<br/><br/>
                        1. Πήγαινε στο <a href="/ratings">Βαθμολόγιο</a>.<br/><br/>
                        2. Επίλεξε το μάθημά σου από τη λίστα των μαθημάτων που διδάσκεις.<br/><br/>
                        3. Εκεί, θα εμφανιστεί η λίστα των φοιτητών/τριών που το έχουν δηλώσει. Μπορείς να βάλεις βαθμολογίες συμπληρώνοντας το κουτί τέρμα δεξιά στο πεδίο "Βαθμός".
                        Επιπλέον, έχεις την επιλογή να αναζητήσεις κάποιον φοιτητή, ή να βάλεις φίλτρα, πχ ταξινόμηση αλφαβητικά ή ανά ΑΜ.<br/><br/>
                        4. Όταν τελειώσεις, πάτα "Αποθήκευση" κάτω δεξιά. <br/><br/>
                        5. Θα εμφανιστεί μια προεπισκόπηση του βαθμολογίου. <br/>
                        &nbsp;&nbsp;&nbsp;- Αν θέλεις να  το υποβάλεις οριστικά, πάτα οριστικοποίηση. <br/>
                        &nbsp;&nbsp;&nbsp;- Αν θέλεις να το ξαναδείς αργότερα, πάτα προσωρινή αποθήκευση. <br/>
                        &nbsp;&nbsp;&nbsp;- Αν θέλεις να το επεξεργαστείς περεταίρω, πάτα επεξεργασία και συνέχισε ξανά από το βήμα 3. <br/><br/>
                    </p>
                </div>
            </div>

            <div className="faq-main-professor" onClick={() => toggleFAQ(1)}>
                <div className="faq-question-professor">
                    <h3>Πώς βλέπω ποιοί έχουν δηλώσει το μάθημά μου;</h3>
                    <IconButton color="primary">
                        {openState[1] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </div>
                <div
                    className={`faq-answer-professor ${
                    openState[1] ? "faq-answer-open-professor" : "faq-answer-closed-professor"
                    }`}
                >
                    <p>Στο <a href="/ratings">Βαθμολόγιο</a> εμφανίζεται η λίστα όλων των φοιτητών/τριών που
                    έχουν δηλώσει το μάθημά σου. Επιλέγεις ποιο από τα μαθήματά σου θέλεις από το μενού 
                    ακριβώς πάνω από το βαθμολόγιο, στα αριστερά.</p>
                </div>
            </div>

            <div className="faq-main-professor" onClick={() => toggleFAQ(2)}>
                <div className="faq-question-professor">
                    <h3>Μπορώ να αποθηκεύσω προσωρινά το βαθμολόγιο;</h3>
                    <IconButton color="primary">
                        {openState[2] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </div>
                <div
                    className={`faq-answer-professor ${
                    openState[2] ? "faq-answer-open-professor" : "faq-answer-closed-professor"
                    }`}
                >
                    <p>Ναι, μετά την αποθήκευση, κάτω δεξιά υπάρχει το κουμπί "προσωρινή αποθήκευση", το οποίο σου 
                        επιτρέπει να αποθηκέυσεις προσωρινά το βαθμολόγιο και να επιστρέψεις σε αυτό οποιαδήποτε στιγμή.</p>
                </div>
            </div>

        </div>
        
        <ScrollToTop/>
        <Footer />
    </div>
  );
};

export default HelpProfessor;
