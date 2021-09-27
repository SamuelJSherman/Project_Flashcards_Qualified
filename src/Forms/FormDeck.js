import React from "react";
import { useHistory } from "react-router-dom";

function FormDeck({ newDeck, handleFormChange, handleSubmit }) {
  const history = useHistory();

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="form-control form-control-lg"
            id="name"
            placeholder="Enter name of new deck"
            onChange={handleFormChange}
            value={newDeck.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            className="form-control"
            id="description"
            placeholder="add deck description"
            onChange={handleFormChange}
            value={newDeck.description}
          />
        </div>
        <button
          type="button"
          onClick={() => history.goBack()}
          className="btn btn-secondary mr-2"
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormDeck;
