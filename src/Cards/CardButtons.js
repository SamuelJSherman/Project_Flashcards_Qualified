import React from "react";
import { Link, useParams } from "react-router-dom";

function CardButtons({ id, handleDelete }) {
  const { deckId } = useParams();

  return (
    <div className="btn-group" role="group" aria-label="Card Buttons group">
      <Link to={`/decks/${deckId}/cards/${id}/edit`}>
        <button type="button" className="btn btn-secondary mr-2">
          Edit
        </button>
      </Link>
      <button
        type="button"
        className="btn btn-sm btn-danger"
        onClick={() => handleDelete(id)}
      >
        Delete
      </button>
    </div>
  );
}

export default CardButtons;
