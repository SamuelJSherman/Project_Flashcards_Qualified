import React from "react";
import CardButtons from "./CardButtons";

function CardList({ cards, handleDelete }) {
  let displayCards = "loading...";

  if (cards) {
    displayCards = cards.map((card) => {
      const { id, front, back } = card;
      return (
        <div
          className="card justify-content-between mb-1 border border-dark"
          key={id}
        >
          <div className="col-12">
            <div className="row">
              <div className="col-6">
                <div className="card-body border-right">{front}</div>
              </div>
              <div className="col-6">
                <div className="card-body border-left">{back}</div>
              </div>
            </div>
            <div className="text-right mb-1">
              <CardButtons id={id} handleDelete={handleDelete} />
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      <h2>Cards</h2>
      <div>{displayCards}</div>
    </div>
  );
}

export default CardList;
