import React from "react";
import Buttons from "../comp/Buttons";
import PropTypes from "prop-types";

function CardView({ card, removeCard }) {
  return (
    <ul className="list-group">
      <li className="list-group-item">{card.front}</li>
      <li className="list-group-item">{card.back}</li>
      <li className="list-group-item">
        <Buttons
          names={["delete-card", "edit-card"]}
          removeCard={removeCard}
          deckId={card.deckId}
          cardId={card.id}
        />
      </li>
    </ul>
  );
}

CardView.propTypes = {
  card: PropTypes.shape({
    front: PropTypes.string.isRequired,
    back: PropTypes.string.isRequired,
    deckId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  removeCard: PropTypes.func.isRequired,
};

export default CardView;
