import React from "react";
import "../../assets/styles/main/DonationCard.css";

const DonationCard = ({ title, content, logo }) => {
  return (
    <div className="donation-card">
      <h3 className="donation-card-title">{title}</h3>
      {logo && <img src={logo} alt={title} className="donation-card-logo" />}
      <div className="donation-card-content">{content}</div>
    </div>
  );
};

export default DonationCard;
