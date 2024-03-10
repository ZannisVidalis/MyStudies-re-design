import React from "react";
import "./NewsCard.css";
import ReadMore from "../../components/readMore/ReadMore";

const NewsCard = ({data}) => {
  return (
    <div className="news-card-container">
      <h3>{data.title}</h3>
      <span className="news-date">{data.date}</span>
      <ReadMore>{data.desc}</ReadMore>
    </div>
  );
}

export default NewsCard;