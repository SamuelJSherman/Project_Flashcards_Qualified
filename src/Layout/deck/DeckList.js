import React from "react";
import DeckPreview from "./DeckPreview";
import Buttons from "../comp/Buttons";
import PropTypes from "prop-types";

function DeckList({ decks, removeDeck }) {
  const decksJSX = decks.map((deck) => (
    <DeckPreview key={deck.id} deck={deck} removeDeck={removeDeck} />
  ));

  return (
    <div id="deck-list">
      <Buttons names={["add-deck"]} />
      {decksJSX}
    </div>
  );
}

DeckList.propTypes = {
  decks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
  removeDeck: PropTypes.func.isRequired,
};

export default DeckList;
