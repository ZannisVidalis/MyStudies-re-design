import React from "react";
import './Content.css'

import { PiBooks } from "react-icons/pi";
import { PiCertificate } from "react-icons/pi";
import { SiSemanticscholar } from "react-icons/si";
import { GiPapers } from "react-icons/gi";
import { LuCheckCheck } from "react-icons/lu";
import { IoBookSharp } from "react-icons/io5";
import { Link } from 'react-router-dom'


const Content = () => {
    return (
        <div className="content">
          
            <div className="content-row">

                <div className="content-stud-grades">
                    <SiSemanticscholar className="icon"/>
                    <h4 className="title"><Link to="/grades">Βαθμολογία</Link></h4>
                    <p className="description">Εδώ θα βρείτε έναν κατάλογο με την βαθμολογία των μαθημάτων που έχετε εξεταστεί.</p>
                </div>
                <div className="content-stud-dec">
                    <PiBooks className="icon"/>
                    <h4 className="title"><Link to="/declaration">Δηλώσεις</Link></h4>
                    <p className="description">Εδώ μπορείτε να πραγματοποιήσετε την δήλωση των μαθημάτων σας.</p>
                </div>
                <div className="content-stud-cert">
                    <PiCertificate className="icon"/>
                    <h4 className="title"><Link to="/certificates">Πιστοποιητικά</Link></h4>
                    <p className="description">Εδώ μπορείτε να αιτηθείτε για την έκδοση πιστοποιητικού.</p>
                </div>

            </div>

            <div className="content-row">

                <div className="content-prof-classes">
                    <IoBookSharp  className="icon"/>
                    <h4 className="title"><Link to="/classes">Μαθήματα</Link></h4>
                    <p className="description">Εδώ θα βρείτε έναν κατάλογο με τα μαθήματα που διδάσκετε.</p>
                </div>
                <div className="content-prof-rating">
                    <LuCheckCheck className="icon"/>
                    <h4 className="title"><Link to="/ratings">Βαθμολόγιο</Link></h4>
                    <p className="description">Εδώ μπορείτε καταχώρήσετε την βαθμολογία σας.</p>
                </div>
                <div className="content-prof-history">
                    <GiPapers className="icon"/>
                    <h4 className="title"><Link to="/myhistory">Το ιστορικό μου</Link></h4>
                    <p className="description">Εδώ μπορείτε να ελέξγετε το ιστορικό σας.</p>
                </div>

            </div>

        </div>  
    );
};
  
export default Content;