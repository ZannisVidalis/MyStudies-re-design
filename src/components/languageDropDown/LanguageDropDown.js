import React , {useState} from "react"
import { useNavigate } from "react-router-dom";
import LanguageIcon from '@mui/icons-material/Language';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './LanguageDropDown.css'

const ProfessorDropdown = () => {

    const [isExpanded, setIsExpanded] = useState(false)

    const navigate = useNavigate();
    const navigateToComingSoon = () => {
        navigate("/comingsoon");
    };

    const navigateToHome = () => {
        navigate("/");
    };

    return (
        <div>
            <button onClick={() => setIsExpanded(!isExpanded)} className="lang-dropdown-main">
                <LanguageIcon/>
                {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </button>
            {isExpanded &&
                <div className="lang-dropdown-sub-main">
                <button onClick={navigateToHome} className="lang-dropdown-sub-button">Ελληνικά</button>
                <button onClick={navigateToComingSoon} className="lang-dropdown-sub-button">English</button>
                <button onClick={navigateToComingSoon} className="lang-dropdown-sub-button">Français</button>
                <button onClick={navigateToComingSoon} className="lang-dropdown-sub-button">Deutsch</button>
              </div>
            }
        </div>
    )
}

export default ProfessorDropdown