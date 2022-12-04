import { editCardNumber } from '../../utils/editCardNumber'
import '../../styles/card.scss'

const Card = ({ 
  card, 
  editCard,
  editCardState }) => {

 return (
    <div className={`card card-${card.type}`} onClick={() => editCard(card)}>
      <div className="card-content">
        
        <div className="row">
          <div className="logo" />
          <div className="card-top-group">
            <div className="group">
              <p className="title">CVC</p>
              <p className="number">{editCardState ? editCardState.cvc_number : card.cvc_number}</p>
            </div>
            <div className="group">
              <p className="title">EXPIRES</p>
              <p className="number">{editCardState ? editCardState.expiration_date : card.expiration_date}</p>
            </div>
          </div>
        </div>

        <div className="row card-bottom-group">
            <div className="group">
              <p className="title">{editCardState ? editCardState.name : card.name}</p>
              <p className="card-number">
                {editCardState ? editCardNumber(editCardState.card_number) : editCardNumber(card.card_number)}
              </p>
            </div>
            <div className="group">
              <p className="edit-icon"/>
            </div>
        </div>
      </div>
  </div>    
 )
}

export default Card