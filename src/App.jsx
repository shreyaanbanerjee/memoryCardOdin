import React, { useState, useEffect } from "react";
import axios from "axios";
import GameBoard from "./components/GameBoard";
import Scoreboard from "./components/Scoreboard";

const App = () => {
  const [cards, setCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  // Fetch Pokémon data from the API
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((response) => {
        const fetchedCards = response.data.results.map((item, index) => ({
          id: index + 1, // API's index starts from 1 for images
          name: item.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        }));
        setCards(fetchedCards);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Shuffle cards function
  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
  };

  // Handle card click
  const handleCardClick = (id) => {
    if (clickedCards.includes(id)) {
      // Reset the game if the card is already clicked
      setScore(0);
      setClickedCards([]);
    } else {
      // Update score and track clicked card
      setScore(score + 1);
      setClickedCards([...clickedCards, id]);

      // Update best score if necessary
      if (score + 1 > bestScore) {
        setBestScore(score + 1);
      }
    }
    shuffleCards(); // Shuffle cards after each click
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1>Pokémon Memory Game</h1>
      <Scoreboard score={score} bestScore={bestScore} />
      <GameBoard cards={cards} onCardClick={handleCardClick} />
    </div>
  );
};

export default App;