import { useState } from 'react'
import Overlay from './components/Overlay'
import AddCard from './components/AddCard'
import EditCard from './components/EditCard'
import YourCards from './components/YourCards'
import './App.scss'

function App() {

  const [showOverlay, setShowOverlay] = useState(false)
  const [showAddCard, setShowAddCard] = useState(false)
  const [showEditCard, setShowEditCard] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})

  const addANewCard = () => {
    setShowOverlay(true)
    setShowAddCard(true)
  }

  const editCard = (card) => {
    setSelectedCard(card)
    setShowOverlay(true)
    setShowEditCard(true)
  }

  return (
      <div className="App">
          {showOverlay && (<Overlay />)}
          {showAddCard && (
            <AddCard 
              showAddCard={showAddCard} 
              setShowAddCard={setShowAddCard}
              setShowOverlay={setShowOverlay}
            />)}
          {showEditCard && (
            <EditCard
              setShowEditCard={setShowEditCard}
              setShowOverlay={setShowOverlay}
              card={selectedCard}
            />)}
          
          <YourCards addANewCard={addANewCard} editCard={editCard} />
      </div>
  )
}

export default App
