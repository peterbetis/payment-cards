import CardForm from '../CardForm'
import '../../styles/addcard.scss'

const AddCard = ({ setShowAddCard, setShowOverlay }) => {

    const closeAddCard = () => {
        setShowAddCard(false)
        setShowOverlay(false)
    }

    return (
        <div className="add-card-container">
            <div className="close-add-card">
                <button className="btn-close" onClick={() => closeAddCard()} />
            </div>
            
            <h1>Add your card details</h1>

            <CardForm closeAddCard={closeAddCard} />
        </div>
    )
}

export default AddCard