import React from "react";
import "./Home.css";
import Navbar from "../../components/navbar/Navbar";
import WelcomeScreen from "../../components/welcomeScreen/WelcomeScreen";
import Content from "../../components/content/Content";
import Footer from "../../components/footer/Footer";
import NewsCard from "../../components/newsCard/NewsCard";
import ScrollToTop from "../../components/scrollToTop/ScrollToTop";
import { Link } from 'react-router-dom'

import {DataNews} from "../../data/Data";


const Home = () => {

    //Convert date strings to Date objects for proper sorting
    const sortedNews = DataNews
    .slice()
    .sort((a, b) => new Date(b.date.split('/').reverse().join('-')) - new Date(a.date.split('/').reverse().join('-')));

    //Select the latest 8 news items
    const displayedNews = sortedNews.slice(0, 8);

    return (
        <div>
            <Navbar/>
            <WelcomeScreen/>
            <Content/>
            <div className="home-news-container">
                <h4 className="home-news-title"> <Link to="/news">Ανακοινώσεις</Link></h4>
                    <div className="home-news">
                        {displayedNews.map((newsItem) => (
                        <NewsCard key={newsItem.id} data={newsItem} />
                        ))}
                    </div>
            </div>
            <ScrollToTop/>
            <Footer/>
        </div>
    )
}

export default Home