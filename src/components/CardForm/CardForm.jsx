import { useContext, useEffect, useState } from 'react'
import { CardContext } from '../../data/CardContext'
import '../../styles/form.scss'

const CardForm = ({
    closeAddCard, 
    closeEditCard, 
    editingCard,
    editCardState,
    setEditCardState
    }) => {

    const { dispatch } = useContext(CardContext)

    const [fieldsValidated, setFieldsValidated] = useState({
        card_name: editingCard ? true : null,
        card_number: editingCard ? true : null,
        expiration_date: editingCard ? true : null,
        cvc_number: editingCard ? true : null
    })
    const [submitEnabled, setSubmitEnabled] = useState(false)
    const [newCardState, setNewCardState] = useState({
        cvc_number: '',
        expiration_date: '',
        card_name: '',
        card_number: ''
    })

    const validateField = (name, condition, value) => {
        setFieldsValidated({...fieldsValidated, [name]: condition})
        editCardState ? setEditCardState({...editCardState, [name]: value}) : setNewCardState({...newCardState, [name]: value})
    }
    
    const onInputChange = (e) => {
        const { name, value } = e.target
        switch(name) {
            case 'card_name': {
                // validates name is not empty and contains only letters
                const regx = new RegExp(/^[A-Za-z\s]*$/)
                const validationCondition = ((value !== '') && regx.test(value))
                validateField(name, validationCondition, value)
               break
            }
            case 'card_number': {
                // validates card number contains only numbers and has 16 digits
                const regx = new RegExp(/^[0-9]+$/)
                const validationCondition = (value.length === 16 && regx.test(value))
                validateField(name, validationCondition, value)
                break
             }
             case 'expiration_date': {
                // validates expiration date first 2 digits are between 1 and 12, then there is a "/", and then 2 numbers
                const regx = new RegExp(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)
                const validationCondition = value.match(regx) !== null
                validateField(name, validationCondition, value)
                break
             }
             case 'cvc_number': {
                // validates input contains only numbers
                const regx = new RegExp(/^[0-9]+$/)
                const validationCondition = regx.test(value)
                validateField(name, validationCondition, value)
                break
             }
             default: break
         }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (submitEnabled) {
            if (editingCard) {
                dispatch({ type: 'EDIT_CARD', card: {
                    id: editingCard.id,
                    type: editingCard.type,
                    cvc_number: editCardState.cvc_number,
                    expiration_date: editCardState.expiration_date,
                    name: editCardState.card_name,
                    card_number: editCardState.card_number
                }})
                closeEditCard()
            } else {
                dispatch({ type: 'ADD_CARD', card: {
                    cvc_number: newCardState.cvc_number,
                    expiration_date: newCardState.expiration_date,
                    name: newCardState.card_name,
                    card_number: newCardState.card_number
                }})
                closeAddCard()
            }
        }
    }

    useEffect(() => {
        Object.values(fieldsValidated).every(field => field === true) ? setSubmitEnabled(true) : setSubmitEnabled(false)
    }, [fieldsValidated])

    return (
        <form className="details-form" onSubmit={((e) => handleSubmit(e))}>

            <div className="form-group">
                <label className={"label" + (fieldsValidated.card_name !== null ? (fieldsValidated.card_name ? " validated" : " has-errors") : "")}>
                    Name in card
                </label>
                <input 
                    type="text"
                    name="card_name"
                    onChange={(e)=> onInputChange(e)}
                    placeholder="John Doe"
                    maxLength="40"
                    value={editCardState ? editCardState.card_name : newCardState.card_name}
                />
                <label className={"error-label" + (fieldsValidated.card_name !== null && !fieldsValidated.card_name ? " visible" : "")}>
                    Please fil in your name
                </label>
            </div>

            <div className="form-group">
                <label className={"label" + (fieldsValidated.card_number !== null ? (fieldsValidated.card_number ? " validated" : " has-errors") : "")}>
                    Card number
                </label>
                <input 
                    type="text"
                    name="card_number" 
                    onChange={(e)=> onInputChange(e)}
                    placeholder="0000 0000 0000 0000"
                    maxLength="16"
                    value={editCardState ? editCardState.card_number  : newCardState.card_number}
                />
                <label className={"error-label" + (fieldsValidated.card_number !== null && !fieldsValidated.card_number ? " visible" : "")}>
                    Please enter a valid credit card number
                </label>
            </div>

            <div className="form-group">
                <label className={"label" + (fieldsValidated.expiration_date !== null ? (fieldsValidated.expiration_date ? " validated" : " has-errors") : "")}>
                    Expiry date
                </label>
                <input 
                    type="text"
                    name="expiration_date"
                    onChange={(e)=> onInputChange(e)}
                    placeholder="00/00"
                    maxLength="5"
                    value={editCardState ? editCardState.expiration_date : newCardState.expiration_date}
                />
                <label className={"error-label" + (fieldsValidated.expiration_date !== null && !fieldsValidated.expiration_date ? " visible" : "")}>
                    Please enter a valid expiry date
                </label>
            </div>

            <div className="form-group">
                <label className={"label" + (fieldsValidated.cvc_number !== null ? (fieldsValidated.cvc_number ? " validated" : " has-errors") : "")}>
                    CVC(Security code)
                </label>
                <input 
                    type="text"
                    name="cvc_number"
                    onChange={(e)=> onInputChange(e)}
                    placeholder="000"
                    maxLength="3"
                    value={editCardState ? editCardState.cvc_number : newCardState.cvc_number}
                />
                <label className={"error-label" + (fieldsValidated.cvc_number !== null && !fieldsValidated.cvc_number ? " visible" : "")}>
                    Please enter a valid Security code
                </label>
            </div>

            <input className={"btn-submit" + (submitEnabled ? " enabled" : "")} type="submit" value="Confirm" />
        </form>
    )
}

export default CardForm