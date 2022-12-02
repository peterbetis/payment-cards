import { createContext, useReducer } from "react"
import cardList from './cards.json'

const getUniqueId = () => String(
    Date.now().toString(32) +
      Math.random().toString(16)
  ).replace(/\./g, '')

const saveCardNumber = (number) => number.match(/.{1,4}/g)

const cardReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CARD': 
      return {
        cards: [
          ...state.cards,
          {
            id: getUniqueId(),
            type: action.card.type,
            cvc_number: action.card.cvc_number,
            expiration_date: action.card.expiration_date,
            name: action.card.name,
            card_number: saveCardNumber(action.card.card_number)
          }
        ]
      }
    case 'EDIT_CARD': {
      let updatedCards = state.cards.map((currentCard) => {
        if (currentCard.id === action.card.id) {
           return { ...currentCard,
            id: action.card.id,
            type: action.card.type,            
            cvc_number: action.card.cvc_number,
            expiration_date: action.card.expiration_date,
            name: action.card.name,
            card_number: saveCardNumber(action.card.card_number)
          }
        }
          return currentCard
        })
      return { cards: updatedCards }
    }
    default: return state
  }
}

const initialState = {
  cards: cardList
}

const CardContext = createContext({
    state: initialState
})

const CardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cardReducer, initialState)

  return (
    <CardContext.Provider value={{ state, dispatch }}>
      {children}
    </CardContext.Provider>
  )
}

export { CardProvider, CardContext }