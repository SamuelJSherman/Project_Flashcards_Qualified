import React from "react";
import Buttons from "../comp/Buttons";
import PropTypes from "prop-types";

function DeckPreview({ deck, removeDeck }) {
  return (
    <div className="card mt-2" id={`deck-${deck.id}`}>
      <div className="card-body">
        <p className="card-subtitle mb-2 text-muted float-right">
          {deck.cards.length} cards
        </p>
        <h4 className="card-title">{deck.name}</h4>
        <p className="card-text">{deck.description}</p>
        <Buttons
          names={["view", "study", "delete-deck"]}
          deckId={deck.id}
          removeDeck={removeDeck}
        />
      </div>
    </div>
  );
}

DeckPreview.propTypes = {
  deck: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  removeDeck: PropTypes.func.isRequired,
};

export default DeckPreview;
