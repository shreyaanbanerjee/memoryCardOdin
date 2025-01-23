import React from "react";

const GameBoard = ({ cards, onCardClick }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        justifyContent: "center",
        margin: "20px",
      }}
    >
      {cards.map((card) => (
        <div
          key={card.id}
          onClick={() => onCardClick(card.id)}
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "10px",
            cursor: "pointer",
            backgroundColor: "#f9f9f9",
            transition: "transform 0.3s",
          }}
        >
          <img
            src={card.image}
            alt={card.name}
            style={{ width: "100px", height: "100px" }}
          />
          <p style={{ textTransform: "capitalize" }}>{card.name}</p>
        </div>
      ))}
    </div>
  );
};

export default GameBoard;