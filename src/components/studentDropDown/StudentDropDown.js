import React , {useState} from "react"
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DropRight from "../../components/dropRight/DropRight";
import './StudentDropDown.css'


const StudentDropdown = () => {

    const [isExpanded, setIsExpanded] = useState(false)

    const [isHovered, setIsHovered] = useState(false);

    const navigate = useNavigate();
    const navigateToGrades = () => {
        navigate("/grades");
    };
    const navigateToDeclaration = () => {
        navigate("/declaration");
    };

    const navigateToCertificates = () => {
        navigate("/certificates");
    };
    
    return (
        <div>
            <button onClick={() => setIsExpanded(!isExpanded)} className="student-dropdown-main">
                Φοιτητές/τριες
                {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </button>
            {isExpanded &&
                <div className="student-dropdown-sub-main">
                <button onClick={navigateToGrades} className="student-dropdown-sub-button">Βαθμολογία</button>
                <button onClick={navigateToDeclaration} className="student-dropdown-sub-button">Δηλώσεις</button>
                <button onClick={navigateToCertificates} className="student-dropdown-sub-button">Πιστοποιητικά</button>
                
                <button className="student-dropright-sub-button"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Θέματα Φοίτησης <KeyboardArrowRightIcon/> 
                    <DropRight
                        isHovered={isHovered}
                    />  
                </button>
              </div>
            }
        </div>
    )
}

export default StudentDropdown