import { useContext } from "react"
import { CardContext } from "../../data/CardContext"
import Card from '../Card'
import '../../styles/your-cards.scss'

const Cards = ({ addANewCard, editCard }) => {
    
    const { state } = useContext(CardContext)

    return (
        <div className="cards-container">
            {state.cards.length > 0 ? (
                <>
                    <div className="heading">
                        <h1>Your cards</h1>
                        <p>Add, edit or delete your cards any time</p>
                    </div>
                    <div className="cards">
                        {state.cards.map((card) => <Card card={card} key={card.id} editCard={editCard} />)}
                    </div>
                </>
            ) : ( 
                <div>No cards found</div>
            )}

            <button className="btn-add-new-card" onClick={() => addANewCard()}>
                <span>Add new card</span>
            </button>
        </div>
    )
}

export default Cards
