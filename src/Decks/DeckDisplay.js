import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index";
import DeckButtons from "./DeckButtons";

function DeckDisplay({ decks, setDecks }) {
  const history = useHistory();

  useEffect(() => {
    async function getDecks() {
      const decksFromAPI = await listDecks();
      setDecks(decksFromAPI);
    }
    getDecks();
  }, [setDecks]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      deleteDeck(id);

      setDecks((currentDecks) => currentDecks.filter((deck) => deck.id !== id));

      history.push("/");
    }
  };

  const deckList = decks.map((deck) => {
    return (
      <Deck
        key={deck?.id}
        id={deck?.id}
        name={deck?.name}
        description={deck?.description}
        totalCards={deck?.cards?.length}
        handleDelete={handleDelete}
      />
    );
  });

  function Deck({ id, name, description, totalCards, handleDelete }) {
    const totalCardsDisplay =
      totalCards === 1 ? "1 card" : `${totalCards} cards`;

    return (
      <div className="card mb-2" key={id}>
        <div className="card-body">
          <div className="row justify-content-between">
            <h5 className="card-title">{name}</h5>
            <p className="text text-secondary">{totalCardsDisplay}</p>
          </div>
          <p className="card-text">{description}</p>
          <DeckButtons id={id} handleDelete={handleDelete} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Link to="/decks/new">
        <button type="button" className="btn btn-secondary mb-4">
          + Create Deck
        </button>
      </Link>
      {deckList}
    </div>
  );
}

export default DeckDisplay;
