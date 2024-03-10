import React , {useState} from "react"
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './ProfessorDropDown.css'

const ProfessorDropdown = () => {

    const [isExpanded, setIsExpanded] = useState(false)

    const navigate = useNavigate();

    const navigateToProfessors = () => {
        navigate("/professors");
    };

    const navigateToRatings = () => {
        navigate("/ratings");
    };

    return (
        <div>
            <button onClick={() => setIsExpanded(!isExpanded)} className="prof-dropdown-main">
                Διδάσκοντες/ούσες
                {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </button>
            {isExpanded &&
                <div className="prof-dropdown-sub-main">
                <button onClick={navigateToRatings} className="prof-dropdown-sub-button">Βαθμολόγιο</button>
                <button onClick={navigateToProfessors} className="prof-dropdown-sub-button">Προσωπικό</button>
              </div>
            }
        </div>
    )
}

export default ProfessorDropdown