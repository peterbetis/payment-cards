import { createContext, useReducer } from "react";
import cardList from './cards.json'

const getUniqueId = () => String(
    Date.now().toString(32) +
      Math.random().toString(16)
  ).replace(/\./g, '')

const saveCardNumber = (number) => number.match(/.{1,4}/g)

const cardReducer = (state, card) => ({
    cards: [
      ...state.cards,
      {
        id: getUniqueId(),
        type: card.type,
        cvc_number: card.cvc_number,
        expiration_date: card.expiration_date,
        name: card.name,
        number: saveCardNumber(card.number)
      }
    ]
  });

const initialState = {
  cards: cardList
};

const CardContext = createContext({
    state: initialState
});

const CardProvider = ({ children }) => {
  const [state, addNewCard] = useReducer(cardReducer, initialState);

  return (
    <CardContext.Provider value={{ state, addNewCard }}>
      {children}
    </CardContext.Provider>
  );
};

export { CardProvider, CardContext };