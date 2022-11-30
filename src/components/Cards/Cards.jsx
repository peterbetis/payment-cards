import { useContext, useEffect } from "react";
import { CardContext } from "../../data/CardContext";
import Card from '../Card'
import './cards.scss'

const Cards = () => {
    
    const { state, addNewCard } = useContext(CardContext);

    const newCard = {
      "type": "mastercard",
      "cvc_number": "004",
      "expiration_date": "08/21",
      "name": "John Cabruci",
      "number": "5532123455458014"
    }

    useEffect(() => {
        console.log(state);
      }, [state])

    return (
        <div className="cards-container">
            {state.cards.length > 0 ? (
                <>
                    <div className="heading">
                        <h1><strong>Your cards</strong></h1>
                        <p>Add, edit or delete your cards any time</p>
                    </div>
                    <div className="cards">
                        {state.cards.map((card) => <Card card={card} key={card.id} />)}
                    </div>
                </>
            ) : ( 
                <div>No cards found</div>
            )}

            <button className="btn-add-new-card" onClick={() => addNewCard(newCard)}>
                <span>Add new card</span>
            </button>
        </div>
    )
}

export default Cards
