import CardForm from '../CardForm'
import '../AddCard'

const EditCard = ({ showEditCard, setShowEditCard, setShowOverlay, card }) => {

    const closeEditCard = () => {
        setShowEditCard(false)
        setShowOverlay(false)
    }

    return (
        <div className={"add-card-container " + (showEditCard ? 'open' : null)}>
            <div className="close-add-card">
                <button className="btn-close" onClick={() => closeEditCard()} />
            </div>
            
            <h1>Edit your card</h1>

            <CardForm closeEditCard={closeEditCard} editingCard={card} />
        </div>
    )
}

export default EditCard