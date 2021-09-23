import React from "react";
import Buttons from "../comp/Buttons";
import PropTypes from "prop-types";

function NotEnoughCards({ length, id }) {
  return (
    <div id="card-error">
      <h3>Not enough cards.</h3>
      <p>
        You need at least 3 cards to study. There are {length} cards in this
        deck.
      </p>

      <Buttons names={["add-card"]} deckId={id} />
    </div>
  );
}

NotEnoughCards.propTypes = {
  length: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default NotEnoughCards;
