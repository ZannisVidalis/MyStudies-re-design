import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import ScholarshipCard from "../../components/scholarshipsCard/ScholarshipsCard";
import ScrollToTop from "../../components/scrollToTop/ScrollToTop";
import "./Scholarships.css";

import { DataScholarships } from "../../data/Data";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const itemsPerPage = 6;

const Scholarships = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = DataScholarships.slice(startIndex, endIndex);

  return (
    <div>
      <Navbar />
      {/*--------- Breadcrumbs -------> */}
      <section id="breadcrumbs" class="breadcrumbs">
            <div class="container">
                <div class="d-flex justify-content-between align-items-center">
                <ol>
                    <li><a href="/"><i class="icofont-home"></i></a></li>
                    <li>Φοιτητές/τριες</li>
                    <li>Θέματα Φοίτησης</li>
                    <li>Υποτροφίες</li>
                </ol>
                </div>
            </div>
            </section>
            {/*--------- Breadcrumbs -------> */}

      <div className="scholarships-news-container">
        <h1 className="scholarships-news-title">Υποτροφίες</h1>
        <div className="scholarships-news">
          {paginatedData.map((newsItem) => (
            <ScholarshipCard key={newsItem.id} data={newsItem} />
          ))}
        </div>

        <Stack spacing={2} className="pagination-container">
        <Pagination
            count={Math.ceil(DataScholarships.length / itemsPerPage)}
            size="small"
            page={currentPage}
            onChange={handlePageChange}
        />
        </Stack>
      </div>

      <ScrollToTop/>
      <Footer />
    </div>
  );
};

export default Scholarships;
