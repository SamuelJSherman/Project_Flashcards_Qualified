import React from "react";
import PropTypes from "prop-types";

function Card({ deck, cardNum, flipped, flip, next }) {
  return (
    <div className="card mt-2" id={`card-${deck.id}`}>
      <div className="card-body">
        <h4 className="card-title">
          Card {cardNum + 1} of {deck.cards.length}
        </h4>
        <p className="card-text">
          {deck.cards[cardNum][flipped ? "back" : "front"]}
        </p>
        <button type="button" className="btn btn-secondary mr-2" onClick={flip}>
          Flip
        </button>
        {flipped && (
          <button type="button" className="btn btn-primary mr-2" onClick={next}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

Card.propTypes = {
  deck: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
  cardNum: PropTypes.number.isRequired,
  flipped: PropTypes.bool.isRequired,
  flip: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};
export default Card;
