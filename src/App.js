import { useState } from 'react'
import Overlay from './components/Overlay'
import AddCard from './components/AddCard'
import EditCard from './components/EditCard'
import YourCards from './components/YourCards'
import './App.scss'

function App() {

  const [showAddCard, setShowAddCard] = useState(false)
  const [showEditCard, setShowEditCard] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})

  const addANewCard = () => {
    setShowAddCard(true)
  }

  const editCard = (card) => {
    setSelectedCard(card)
    setShowEditCard(true)
  }

  return (
      <div className="App">

          {(showAddCard || showEditCard) && (<Overlay />)}

          {showAddCard && (
            <AddCard 
              setShowAddCard={setShowAddCard}
            />)}
          {showEditCard && (
            <EditCard
              setShowEditCard={setShowEditCard}
              card={selectedCard}
            />)}
          
          <YourCards addANewCard={addANewCard} editCard={editCard} />
      </div>
  )
}

export default App
