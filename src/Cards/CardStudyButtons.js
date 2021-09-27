import React from "react";

function CardStudyButtons({ handleNext, handleFlip, nextButton }) {
  let buttonFlip = (
    <button
      type="button"
      onClick={() => handleFlip()}
      className="btn btn-secondary mr-2"
      style={{ maxWidth: "140px" }}
    >
      Flip
    </button>
  );
  let buttonNext = (
    <button
      type="button"
      onClick={() => handleNext()}
      className="btn btn-primary"
      style={{ maxWidth: "140px" }}
    >
      Next
    </button>
  );

  return (
    <div
      className="btn-group pl-2"
      role="group"
      aria-label="Study Card Buttons group"
    >
      {buttonFlip}
      {nextButton ? buttonNext : null}
    </div>
  );
}

export default CardStudyButtons;
