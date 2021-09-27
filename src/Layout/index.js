import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckDisplay from "../Decks/DeckDisplay";
import DeckView from "../Decks/DeckView";
import DeckEdit from "../Decks/DeckEdit";
import DeckStudy from "../Decks/DeckStudy";
import DeckNew from "../Decks/DeckNew";
import CardEdit from "../Cards/CardEdit";
import CardNew from "../Cards/CardNew";

function Layout() {
  const [decks, setDecks] = useState([]);
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <DeckDisplay decks={decks} setDecks={setDecks} />
          </Route>
          <Route path="/decks/new">
            <DeckNew />
          </Route>
          <Route exact path="/decks/:deckId">
            <DeckView
              deck={deck}
              setDeck={setDeck}
              cards={cards}
              setCards={setCards}
            />
          </Route>
          <Route path="/decks/:deckId/study">
            <DeckStudy
              deck={deck}
              setDeck={setDeck}
              cards={cards}
              setCards={setCards}
            />
          </Route>
          <Route path="/decks/:deckId/edit">
            <DeckEdit />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <CardEdit deck={deck} setDeck={setDeck} />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <CardNew deck={deck} setDeck={setDeck} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
