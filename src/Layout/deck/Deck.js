import React from "react";
import { Switch, Route, useParams } from "react-router-dom";
import Form from "../form/Form";
import DeckView from "./DeckView";
import DeckStudy from "./DeckStudy";
import PropTypes from "prop-types";

function Deck({
  editDeck,
  removeDeck,
  addCard,
  editCard,
  removeCard,
  abortController,
}) {
  const { deckId } = useParams();

  return (
    <div id={`deck-${deckId}`}>
      <Switch>
        <Route path="/decks/:deckId/study">
          <DeckStudy abortController={abortController} />
        </Route>

        <Route path="/decks/:deckId/edit">
          <Form
            type="deck"
            edit={true}
            editDeck={editDeck}
            abortController={abortController}
          />
        </Route>

        <Route path="/decks/:deckId/cards/new">
          <Form
            type="card"
            edit={false}
            addCard={addCard}
            abortController={abortController}
          />
        </Route>

        <Route path="/decks/:deckId/cards/:cardId/edit">
          <Form
            type="card"
            edit={true}
            editCard={editCard}
            abortController={abortController}
          />
        </Route>

        <Route path="/decks/:deckId">
          <DeckView
            removeDeck={removeDeck}
            removeCard={removeCard}
            abortController={abortController}
          />
        </Route>
      </Switch>
    </div>
  );
}

Deck.propTypes = {
  editDeck: PropTypes.func.isRequired,
  removeDeck: PropTypes.func.isRequired,
  addCard: PropTypes.func.isRequired,
  editCard: PropTypes.func.isRequired,
  removeCard: PropTypes.func.isRequired,
  abortController: PropTypes.instanceOf(AbortController).isRequired,
};

export default Deck;
