import './card.scss'

const Card = ({ card, editCard }) => {
 return (
    <div className={`card card-${card.type}`} onClick={() => editCard(card)}>
      <div className="card-content">
        
        <div className="row">
          <div className="logo" />
          <div className="card-top-group">
            <div className="group">
              <p className="title">CVC</p>
              <p className="number">{card.cvc_number}</p>
            </div>
            <div className="group">
              <p className="title">EXPIRES</p>
              <p className="number">{card.expiration_date}</p>
            </div>
          </div>
        </div>

        <div className="row card-bottom-group">
            <div className="group">
              <p className="title">{card.name}</p>
              <p className="card-number">
                {card.card_number.map(chunk => <span key={chunk}>{chunk}</span>)}
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