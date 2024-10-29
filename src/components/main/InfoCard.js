import React from "react";
import { Card } from "react-bootstrap";
import "../../assets/styles/main/InfoCard.css";

const InfoCard = ({ icon, title, description }) => {
  return (
    <Card className="text-center my-4 border-card">
      <Card.Body>
        <div className="icon-container">
          {icon === "mision" && (
            <i className="fa-regular fa-lightbulb fa-3x text-info-qs mb-3"></i>
          )}
          {icon === "vision" && (
            <i className="fa-solid fa-rocket fa-3x text-info-qs mb-3"></i>
          )}
        </div>
        <Card.Title className="text-info-qs">{title}</Card.Title>
        <Card.Text className="description-text">{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default InfoCard;
