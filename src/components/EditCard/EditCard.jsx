import { useState } from 'react'
import CardForm from '../CardForm'
import Card from '../Card'
import '../AddCard'

const EditCard = ({ setShowEditCard, setShowOverlay, card }) => {

    const [editCardState, setEditCardState] = useState({
        cvc_number: card.cvc_number,
        expiration_date: card.expiration_date,
        card_name: card.name,
        card_number: card.card_number     
    })

    const closeEditCard = () => {
        setShowEditCard(false)
        setShowOverlay(false)
    }

    return (
        <div className="add-card-container" >
            <div className="close-add-card">
                <button className="btn-close" onClick={() => closeEditCard()} />
            </div>

            <h1>Edit your card</h1>

            <Card 
                card={card} 
                key={card.id}
                editCardState={editCardState}
            />
            <CardForm 
                closeEditCard={closeEditCard}
                editingCard={card}
                editCardState={editCardState}
                setEditCardState={setEditCardState}
            />
        </div>
    )
}

export default EditCard