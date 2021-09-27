import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";
//import FormDeck from "../Forms/FormDeck";

function DeckNew() {
  const history = useHistory();

  const initialState = {
    name: "",
    description: "",
  };

  const [newDeck, setNewDeck] = useState(initialState);

  const handleFormChange = ({ target }) => {
    setNewDeck({
      ...newDeck,
      [target.name]: target.value,
    });
  };

  async function handleSubmit(event) {
    console.log("event");
    event.preventDefault();
    const abortController = new AbortController();
    const response = await createDeck({ ...newDeck }, abortController.signal);
    history.push("/");
    return response;
  }

  const breadcrumb = (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Create Deck
        </li>
      </ol>
    </nav>
  );

  return (
    <div>
      {breadcrumb}
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
    </div>
  );
}

export default DeckNew;
