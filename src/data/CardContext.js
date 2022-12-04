import { createContext, useReducer } from "react"
import { getUniqueId } from '../utils/getUniqueId'
import cardList from './cards.json'


const cardTypes = ['visa', 'mastercard']  

const cardReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CARD': 
      return {
        cards: [
          ...state.cards,
          {
            id: getUniqueId(),
            type: cardTypes[Math.floor(Math.random()*cardTypes.length)],
            cvc_number: action.card.cvc_number,
            expiration_date: action.card.expiration_date,
            name: action.card.name,
            card_number: action.card.card_number
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
            card_number: action.card.card_number
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