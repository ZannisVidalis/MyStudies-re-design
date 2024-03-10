import React, { useState, useEffect } from 'react';
import { FaArrowCircleUp } from "react-icons/fa";
import './ScrollToTop.css'

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        const threshold = 300;
        const currentScrollY = window.scrollY;

        setIsVisible(currentScrollY > threshold);
    };

    const scrollToTopHandler = () => {
        window.scrollTo({
        top: 0,
        behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        //Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <button
            className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
            onClick={scrollToTopHandler}
        >
            <FaArrowCircleUp className='stt-icon'/>
        </button>
    );
};

export default ScrollToTop;
