import React from "react";
import CardStudyButtons from "./CardStudyButtons";

function CardStudy({
  card,
  total,
  handleNext,
  handleFlip,
  cardNumber,
  flipCard,
  nextButton,
}) {
  const { id, front, back } = card;

  const question = <p className="card-body">{front}</p>;
  const answer = <p className="card-body text-success">{back}</p>;

  const content = flipCard ? answer : question;

  return (
    <div className="card border border-info" key={id}>
      <h5 className="card-title ml-2 mt-2 font-weight-light">
        Card {cardNumber} of {total}
      </h5>
      <div className="card-text">{content}</div>
      <CardStudyButtons
        handleNext={handleNext}
        handleFlip={handleFlip}
        nextButton={nextButton}
      />
    </div>
  );
}

export default CardStudy;
