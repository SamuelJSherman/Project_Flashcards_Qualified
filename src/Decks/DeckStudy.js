import React, { useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import CardStudy from "../Cards/CardStudy";

function DeckStudy() {
  const { deckId } = useParams();
  const history = useHistory();

  const [deck, setDeck] = useState();

  useEffect(() => {
    async function getDeck() {
      const deckFromAPI = await readDeck(deckId);
      setDeck(deckFromAPI);
    }
    getDeck();
  }, [deckId]);

  const initialFlashcardState = {
    cardNumber: 1,
    flipCard: false,
    nextButton: false,
  };

  const [card, setCard] = useState(initialFlashcardState);
  const { cardNumber, flipCard, nextButton } = card;

  const handleFlip = () => {
    setCard({ ...card, flipCard: !flipCard, nextButton: true });
  };

  const handleNext = () => {
    if (cardNumber >= totalCards && totalCards >= 3) {
      if (
        window.confirm(
          `Return to the beginning of the deck? Click 'cancel' to return to homepage.`
        )
      ) {
        setCard(initialFlashcardState);
      } else {
        history.push("/");
      }
    } else {
      setCard({
        cardNumber: cardNumber + 1,
        flipCard: false,
        nextButton: false,
      });
    }
  };

  const totalCards = deck?.cards?.length;

  const flashcards = deck?.cards?.map((card) => {
    //console.log("Status: Enough")
    return (
      <div className="card" key={card.id}>
        <CardStudy
          cardNumber={cardNumber}
          flipCard={flipCard}
          card={card}
          key={card.id}
          total={totalCards}
          handleNext={handleNext}
          handleFlip={handleFlip}
          nextButton={nextButton}
        />
      </div>
    );
  });

  if (!deck) {
    return <p>Loading...</p>;
  }

  let displayResult = null;

  const notEnoughCards = <NotEnough total={totalCards} deckId={deck.id} />;

  const enoughCards = flashcards[cardNumber - 1];

  function NotEnough({ totalCards, deckId }) {
    //console.log("Status: Not Enough");
    let cardCount = "2 cards";
    cardCount = !totalCards ? "0 cards" : "1 card";
    return (
      <div>
        <h2>Not enough cards.</h2>
        <p>
          You need at least 3 cards to study. There are {cardCount} in the deck
        </p>
        <Link to={`/decks/${deckId}/cards/new`}>
          <button type="button" className="btn btn-primary">
            + Add Cards
          </button>
        </Link>
      </div>
    );
  }

  displayResult = totalCards <= 2 ? notEnoughCards : enoughCards;

  //console.log(flashcards)
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h1>{deck.name}: Study</h1>
      <div style={{ marginTop: "30px" }}>{displayResult}</div>
    </div>
  );
}

export default DeckStudy;
