import React, { useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, deleteCard } from "../utils/api/index";
import DeckButtons from "./DeckButtons";
import CardList from "../Cards/CardList";

function DeckView({ deck, setDeck, handleDelete }) {
  const { deckId } = useParams();
  const history = useHistory();

  const { id, name, description, cards } = deck;

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        const deckResponse = await readDeck(deckId, abortController.signal);
        setDeck(deckResponse);
      } catch (error) {
        console.error("Something went wrong", error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchData();
  }, [deckId, setDeck]);

  const handleCardDelete = async (id) => {
    if (
      window.confirm(`Delete this card? You will not be able to recover it`)
    ) {
      const abortController = new AbortController();
      try {
        await deleteCard(id, abortController.signal);
        history.go(0);
      } catch (error) {
        console.error("Something went wrong", error);
      }
      return () => {
        abortController.abort();
      };
    }
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {name}
          </li>
        </ol>
      </nav>
      <div className="mb-4" key={id}>
        <h5>{name}</h5>
        <p>{description}</p>
        <DeckButtons id={id} handleDelete={handleDelete} />
      </div>
      <CardList cards={cards} handleDelete={handleCardDelete} />
    </div>
  );
}

export default DeckView;
