import { BrowserRouter, Routes, Route } from "react-router-dom";
import { firebaseConfig } from './config/firebase';
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

import Home from "./pages/home/Home";
import Help from "./pages/help/Help";
import HelpStudent from "./pages/helpStudent/HelpStudent";
import HelpProfessor from "./pages/helpProfessor/HelpProfessor";
import HelpSecretary from "./pages/helpSecretary/HelpSecretary";
import About from "./pages/about/About";
import Professors from "./pages/professors/Professors";
import ComingSoon from "./pages/comingSoon/ComingSoon";
import News from "./pages/news/News";
import Scholarships from "./pages/scholarships/Scholarships";
import StudyDuration from "./pages/studyDuration/StudyDuration";
import Advisers from "./pages/advisers/Advisers";
import StudyInfo from "./pages/studyInfo/StudyInfo";
import Login from "./pages/login/Login";
import Logout from "./pages/logout/Logout";
import Register from "./pages/register/Register";
import Syllabus from "./pages/syllabus/Syllabus";
import Profile from "./pages/profile/Profile";
import Declaration from "./pages/declaration/Declaration";
import Certificates from "./pages/certificates/Certificates"
import Myhome from "./pages/myhome/Myhome";
import Myhistory from "./pages/myhistory/Myhistory";
import Myhistorystud from "./pages/myhistorystud/Myhistorystud";
import Myhistoryprof from "./pages/myhistoryprof/Myhistoryprof";
import TempDec from "./pages/tempDec/TempDec";
import FinalDec from "./pages/finalDec/FinalDec";
import Grades from "./pages/grades/Grades";
import Classes from "./pages/classes/Classes";
import Ratings from "./pages/ratings/Ratings";
import TempRating from "./pages/tempRating/Temprating";
import FinalRating from "./pages/finalRating/Finalrating";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home/>}/>
        <Route path="/help" element={<Help/>}/>
        <Route path="/help/student" element={<HelpStudent/>}/>
        <Route path="/help/professor" element={<HelpProfessor/>}/>
        <Route path="/help/secretary" element={<HelpSecretary/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/professors" element={<Professors/>}/>
        <Route path="/comingsoon" element={<ComingSoon/>}/>
        <Route path="/news" element={<News/>}/>
        <Route path="/scholarships" element={<Scholarships/>}/>
        <Route path="/studyduration" element={<StudyDuration/>}/>
        <Route path="/advisers" element={<Advisers/>}/>
        <Route path="/studyinfo" element={<StudyInfo/>}/>
        <Route path="/login" element={<Login db={db}/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/register" element={<Register db={db}/>}/>
        <Route path="/syllabus" element={<Syllabus/>}/>
        <Route path="/profile" element={<Profile db={db}/>}/>
        <Route path="/declaration" element={<Declaration db={db}/>}/>
        <Route path="/certificates" element={<Certificates db={db}/>}/>
        <Route path="/myhome" element={<Myhome db={db}/>}/>
        <Route path="/myhistory" element={<Myhistory db={db}/>}/>
        <Route path="/myhistorystud" element={<Myhistorystud db={db}/>}/>
        <Route path="/myhistoryprof" element={<Myhistoryprof db={db}/>}/>
        <Route path="/tempdeclaration" element={<TempDec db={db}/>}/>
        <Route path="/finaldeclaration" element={<FinalDec db={db}/>}/>
        <Route path="/grades" element={<Grades db={db}/>}/>
        <Route path="/classes" element={<Classes db={db}/>}/>
        <Route path="/ratings" element={<Ratings db={db}/>}/>
        <Route path="/temprating" element={<TempRating db={db}/>}/>
        <Route path="/finalrating" element={<FinalRating db={db}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;