import React, { useState } from "react";
import './Professors.css';

import {Data} from "../../data/Data";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import InfoCard from "../../components/infoCard/InfoCard";
import ScrollToTop from "../../components/scrollToTop/ScrollToTop";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import logo from '../../images/professor.png'
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';


const Professors = () => {

    const [category, setCategory] = useState('');
    const [page, setPage] = useState(1);
    const itemsPerPage = 8; // Adjust the number of items per page as needed

    const handleChange = (event) => {
        setCategory(event.target.value);

        setPage(1); //Reset page when category changes
    };

    //Filter data based on the selected category
    const filteredData = category
        ? Data.filter((item) => item.category === category)
        : Data;


    //Calculate the number of pages
    const pageCount = Math.ceil(filteredData.length / itemsPerPage);

    //Get the current page data
    const currentPageData = filteredData.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const handlePageChange = (event, value) => {
        setPage(value);
    };
    
    return (
        <div>
            <Navbar/>

            {/*--------- Breadcrumbs -------> */}
            <section id="breadcrumbs" className="breadcrumbs">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center">
                        <ol>
                            <li><a href="/"><i className="icofont-home"></i></a></li>
                            <li>Διδάσκοντες/ουσες</li>
                            <li>Προσωπικό</li>
                        </ol>
                    </div>
                </div>
            </section>
            {/*--------- Breadcrumbs -------> */}

            <div className="prof-screen">
                <img src={logo} alt=""/>
                <div className="prof-screen-text">
                    <h1>Διάλεξε το τμήμα του Πανεπιστημίου Αθηνών</h1>
                    <span>Εδώ μπορείς να δείς αναλυτικές πληροφορίες <br/> για τους Διδάδκοντες/ουσες του Πανεπιστημίου</span>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', marginBottom: '20px'}}>
                <FormControl style={{ width: '12%'}}>
                    <InputLabel id="demo-simple-select-label">Τμήμα</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Category"
                    onChange={handleChange}
                    >
                        <MenuItem value="Βιολογίας">Βιολογίας</MenuItem>
                        <MenuItem value="Θεολογίας">Θεολογίας</MenuItem>
                        <MenuItem value="Ιατρική">Ιατρική</MenuItem>
                        <MenuItem value="Μαθηματικών">Μαθηματικών</MenuItem>
                        <MenuItem value="Νομική">Νομική</MenuItem>
                        <MenuItem value="Νοσηλευτική">Νοσηλευτική</MenuItem>
                        <MenuItem value="Οδοντιατρική">Οδοντιατρική</MenuItem>
                        <MenuItem value="Πληροφορικής">Πληροφορικής</MenuItem>
                        <MenuItem value="Φυσικής">Φυσικής</MenuItem>
                        <MenuItem value="Χημείας">Χημείας</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div className="professors-container">
                {currentPageData.map((item) => (
                <InfoCard key={item.id} data={item} />
                ))}
            </div>
            
            {pageCount > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '100px' }}>
            <Stack spacing={2}>
                <Pagination
                count={pageCount}
                page={page}
                onChange={handlePageChange}
                renderItem={(item) => (
                    <PaginationItem
                    component={item.page === page ? 'div' : 'button'}
                    {...item}
                    />
                )}
                />
            </Stack>
            </div>
            )}

            <ScrollToTop/>
            <Footer/>
        </div>
    );
}

export default Professors