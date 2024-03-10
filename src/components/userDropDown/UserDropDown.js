import React , {useState} from "react"
import { useNavigate } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './UserDropDown.css'

const UserDropDown = () => {

    const [isExpanded, setIsExpanded] = useState(false)
    const user_role = localStorage.getItem('role');

    const navigate = useNavigate();

    const navigateToCommingSoon = () => {
        navigate("/comingsoon");
    };  

    const navigateToMyhome = () => {
        navigate("/myhome");
    }; 

    const navigateToGrades = () => {
        navigate("/grades");
    }; 

    const navigateToLogout = () => {
        navigate("/logout");
    }; 

    const navigateToProfile = () => {
        navigate("/profile");
    };

    const navigateToDeclaration = () => {
        navigate("/declaration");
    };

    const navigateToMyhistory = () => {
        navigate("/myhistory");
    };

    const navigateToClasses = () => {
        navigate("/classes");
    };

    const navigateToRatings = () => {
        navigate("/ratings");
    };

    return (
        <div>
            <button onClick={() => setIsExpanded(!isExpanded)} className="user-dropdown-main">
                <PersonIcon/>
                {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </button>
           { isExpanded && (
             user_role === 'student' ? (
                <div className="user-dropdown-sub-main">
                <button onClick= {navigateToMyhome} className="user-dropdown-sub-button">Η αρχική μου</button>
                <button onClick= {navigateToProfile} className="user-dropdown-sub-button">Το προφίλ μου</button>
                <button onClick= {navigateToGrades} className="user-dropdown-sub-button">Οι βαθμοί μου</button>
                <button onClick= {navigateToCommingSoon} className="user-dropdown-sub-button">Οι ειδοποιήσεις μου</button>
                <button onClick= {navigateToDeclaration} className="user-dropdown-sub-button">Δηλώσεις</button>
                <button onClick= {navigateToMyhistory} className="user-dropdown-sub-button">Το ιστορικό μου</button>
                <button onClick= {navigateToCommingSoon} className="user-dropdown-sub-button">Το ημερολογόγιο μου</button>
                <button onClick= {navigateToCommingSoon}className="user-dropdown-sub-button">Οι υποτροφίες μου</button>
                <button onClick= {navigateToCommingSoon} className="user-dropdown-sub-button">Τα μηνύματά μου</button>
                <button onClick= {navigateToLogout} className="user-dropdown-sub-button-log">Αποσύνδεση</button>
              </div>
            ):(
                <div className="user-dropdown-sub-main">
                <button onClick= {navigateToMyhome} className="user-dropdown-sub-button">Η αρχική μου</button>
                <button onClick= {navigateToProfile} className="user-dropdown-sub-button">Το προφίλ μου</button>
                <button onClick= {navigateToRatings} className="user-dropdown-sub-button">Βαθμολόγιο</button>
                <button onClick= {navigateToMyhistory} className="user-dropdown-sub-button">Το ιστορικό μου</button>
                <button onClick= {navigateToCommingSoon} className="user-dropdown-sub-button">Οι ειδοποιήσεις μου</button>
                <button onClick= {navigateToClasses} className="user-dropdown-sub-button">Τα μαθήματά μου</button>
                <button onClick= {navigateToCommingSoon} className="user-dropdown-sub-button">Τα μηνύματά μου</button>
                <button onClick= {navigateToLogout} className="user-dropdown-sub-button-log">Αποσύνδεση</button>
              </div>
            ))}
        </div>
    )

}
export default UserDropDown