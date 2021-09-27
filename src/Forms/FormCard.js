import React from "react";

function FormCard({
  handleChange,
  handleSubmit,
  handleSecondaryAction,
  title,
  card,
  secondaryActionText,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <h2>{title}</h2>
      <div className="form-group">
        <label>Front</label>
        <textarea
          id="front"
          name="front"
          className="form-control"
          onChange={handleChange}
          type="text"
          value={card.front}
        />
      </div>
      <div className="form-group">
        <label>Back</label>
        <textarea
          id="back"
          name="back"
          className="form-control"
          onChange={handleChange}
          type="text"
          value={card.back}
        />
      </div>
      <button
        className="btn btn-secondary mx-1"
        onClick={() => handleSecondaryAction()}
      >
        {secondaryActionText}
      </button>
      <button className="btn btn-primary mx-1" type="submit">
        Save
      </button>
    </form>
  );
}

export default FormCard;
