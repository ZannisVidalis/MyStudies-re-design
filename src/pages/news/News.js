import React, { useState } from "react";
import "./News.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import ScrollToTop from "../../components/scrollToTop/ScrollToTop";
import NewsCard from "../../components/newsCard/NewsCard";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { DataNews } from "../../data/Data";

const News = () => {
    const [page, setPage] = useState(1);
    const itemsPerPage = 12; //The number of items per page

    //Convert date strings to Date objects for sorting
    const sortedNews = DataNews
        .slice()
        .sort((a, b) => new Date(b.date.split('/').reverse().join('-')) - new Date(a.date.split('/').reverse().join('-')));

    //Calculate the number of pages
    const pageCount = Math.ceil(sortedNews.length / itemsPerPage);

    //Get the current page data
    const currentPageData = sortedNews.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const handlePageChange = (event, value) => {
        setPage(value);
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
                    <li>Ανακοινώσεις</li>
                </ol>
                </div>
            </div>
            </section>
            {/*--------- Breadcrumbs -------> */}

            <div className="news-container">
                <h4 className="news-title">Ανακοινώσεις</h4>
                <div className="news">
                {currentPageData.map((newsItem) => (
                    <NewsCard key={newsItem.id} data={newsItem} />
                ))}
                </div>
            </div>

            {pageCount > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '100px' }}>
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
                </div>
            )}
            <ScrollToTop/>
            <Footer />
        </div>
  );
}

export default News;
