import React from "react";
import "./InfoCard.css"

const InfoCard = ({data}) => {
    return (
        <div className="card">
            <div className="card-img">
                <img src={data.image} alt=""/>
            </div>
            <div className="card-details">
                <div className="card-name">
                    <h3>{data.fullName}</h3>
                </div>
                <div className="card-positions">
                    <span>{data.firstPosition}</span>
                    <span>{data.secondPosition}</span>
                </div>
                <div className="card-info">
                    <span>{data.email}</span>
                    <span>{data.desk}</span>
                    <span>{data.phone}</span>
                    <a href={data.webPage}>Web Page</a>
                </div>
            </div>
        </div>
    );
}

export default InfoCard