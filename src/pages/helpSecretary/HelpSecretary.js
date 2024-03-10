import React, { useState } from "react";
import "./HelpSecretary.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import ScrollToTop from "../../components/scrollToTop/ScrollToTop";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';

const HelpSecretary = () => {
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
                    <li>Γραμματεία</li>
                </ol>
                </div>
            </div>
            </section>
            {/*--------- Breadcrumbs -------> */}

        <div className="faq-container-secretary">
            <h1>FREQUENTLY ASKED QUESTIONS</h1>

            <div className="faq-main-secretary" onClick={() => toggleFAQ(0)}>
                <div className="faq-question-secretary">
                    <h3>Πώς εγκρίνω τις δηλώσεις των φοιτητών/τριών;</h3>
                    <IconButton color="primary">
                        {openState[0] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </div>
                <div
                    className={`faq-answer-secretary ${
                    openState[0] ? "faq-answer-open-secretary" : "faq-answer-closed-secretary"
                    }`}
                >
                    <p>Η σελίδα είναι υπό κατασκευή.</p>
                </div>
            </div>

            <div className="faq-main-secretary" onClick={() => toggleFAQ(1)}>
                <div className="faq-question-secretary">
                    <h3>Πώς βλέπω τις αιτήσεις για πιστοποιητικό;</h3>
                    <IconButton color="primary">
                        {openState[1] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </div>
                <div
                    className={`faq-answer-secretary ${
                    openState[1] ? "faq-answer-open-secretary" : "faq-answer-closed-secretary"
                    }`}
                >
                    <p>Η σελίδα είναι υπό κατασκευή.</p>
                </div>
            </div>

            <div className="faq-main-secretary" onClick={() => toggleFAQ(2)}>
                <div className="faq-question-secretary">
                    <h3>Πώς αλλάζω κωδικό;</h3>
                    <IconButton color="primary">
                        {openState[2] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </div>
                <div
                    className={`faq-answer-secretary ${
                    openState[2] ? "faq-answer-open-secretary" : "faq-answer-closed-secretary"
                    }`}
                >
                    <p>Η σελίδα είναι υπό κατασκευή.</p>
                </div>
            </div>

            <div className="faq-main-secretary" onClick={() => toggleFAQ(3)}>
                <div className="faq-question-secretary">
                    <h3>Πώς στέλνω ένα πιστοποιητικό;</h3>
                    <IconButton color="primary">
                        {openState[3] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </div>
                <div
                    className={`faq-answer-secretary ${
                    openState[3] ? "faq-answer-open-secretary" : "faq-answer-closed-secretary"
                    }`}
                >
                    <p>Η σελίδα είναι υπό κατασκευή.</p>
                </div>
            </div>

            <div className="faq-main-secretary" onClick={() => toggleFAQ(4)}>
                <div className="faq-question-secretary" >
                    <h3>Πώς βγάζω μια ανακοίνωση;</h3>
                    <IconButton color="primary">
                        {openState[4] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </div>
                <div
                    className={`faq-answer-secretary ${
                    openState[4] ? "faq-answer-open-secretary" : "faq-answer-closed-secretary"
                    }`}
                >
                    <p>Η σελίδα είναι υπό κατασκευή.</p>
                </div>
            </div>

        </div>

        <ScrollToTop/>
        <Footer />
    </div>
  );
};

export default HelpSecretary;