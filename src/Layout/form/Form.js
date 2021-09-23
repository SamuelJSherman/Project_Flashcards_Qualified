import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { readDeck, readCard } from "../../utils/api/index";
import Breadcrumb from "../comp/Breadcrumb";
import FormArea from "./FormArea";
import PropTypes from "prop-types";

function Form({
  type,
  edit,
  addDeck,
  addCard,
  editDeck,
  editCard,
  abortController,
}) {
  const history = useHistory();
  let { deckId, cardId } = useParams();
  const mode = edit ? "edit" : "create";
  const keys = type === "deck" ? ["name", "description"] : ["front", "back"];

  const initForm = {
    [keys[0]]: "",
    [keys[1]]: "",
  };

  const [deck, setDeck] = useState({});
  const [formData, setFormData] = useState({ ...initForm });

  useEffect(() => {
    getDeck();

    return () => {
      abortController.abort();
    };
  }, []);

  async function getDeck() {
    if (type === "deck" && !edit) return;

    try {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(response);

      if (edit) {
        if (response && type === "deck") {
          initForm[keys[0]] = response.name;
          initForm[keys[1]] = response.description;
        } else if (type === "card") {
          const card = await readCard(cardId, abortController.signal);
          if (card) {
            initForm[keys[0]] = card.front;
            initForm[keys[1]] = card.back;
          }
        }
        setFormData({ ...initForm });
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        throw error;
      }
    }
  }

  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let newItem = {
      [keys[0]]: formData[keys[0]],
      [keys[1]]: formData[keys[1]],
    };

    if (edit) {
      newItem["id"] = type === "deck" ? parseInt(deckId) : parseInt(cardId);

      if (type === "card") {
        newItem["deckId"] = parseInt(deckId);
      }
    }

    const idx = edit
      ? type === "deck"
        ? await editDeck(newItem)
        : await editCard(newItem)
      : type === "deck"
      ? await addDeck(newItem)
      : await addCard(newItem, deckId);

    if (!edit && type === "deck") {
      deckId = idx;
    }

    history.push(`/decks/${deckId}`);
  }

  return (
    <div id={`${type}-form-${mode}`}>
      <Breadcrumb
        page={`${mode}-${type}`}
        deckName={deck ? deck.name : null}
        deckId={parseInt(deckId)}
        cardId={cardId ? parseInt(cardId) : null}
      />

      <h1>
        {type === "card" && `${deck.name}: `}
        {mode.charAt(0).toUpperCase() + mode.slice(1)}&nbsp;
        {type.charAt(0).toUpperCase() + type.slice(1)}&nbsp;
      </h1>

      <form onSubmit={handleSubmit}>
        <FormArea
          keys={keys}
          idx={0}
          handleChange={handleChange}
          formData={formData}
        />

        <FormArea
          keys={keys}
          idx={1}
          handleChange={handleChange}
          formData={formData}
        />

        <a href="/">
          <button className="btn btn-secondary mr-1" type="button">
            Cancel
          </button>
        </a>

        <button className="btn btn-primary mr-1" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

Form.propTypes = {
  type: PropTypes.oneOf(["deck", "card"]).isRequired,
  edit: PropTypes.bool.isRequired,
  addDeck: PropTypes.func,
  addCard: PropTypes.func,
  editDeck: PropTypes.func,
  editCard: PropTypes.func,
  abortController: PropTypes.instanceOf(AbortController).isRequired,
};

export default Form;
