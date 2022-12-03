import { useContext, useEffect, useState } from 'react'
import { CardContext } from '../../data/CardContext'
import '../../styles/form.scss'

const CardForm = ({closeAddCard, closeEditCard, editingCard}) => {

    const cardTypes = ['visa', 'mastercard']
    const { dispatch } = useContext(CardContext)
    
    const [nameValidated, setNameValidated] = useState(editingCard ? true : false)
    const [cardNumberValidated, setCardNumberValidated] = useState(editingCard ? true : false)
    const [expirationDateValidated, setExpirationDateValidated] = useState(editingCard ? true : false)
    const [cvcNumberValidated, setCvcNumberValidated] = useState(editingCard ? true : false)
    const [submitEnabled, setSubmitEnabled] = useState(false)

    const [nameState, setNameState] = useState(editingCard ? editingCard.name : '')
    const [expirationDateState, setExpirationDateState] = useState(editingCard ? editingCard.expiration_date : '')
    const [cardNumberState, setCardNumberState] = useState(editingCard ? editingCard.card_number.join('') : '')
    const [cvcNumberState, setCvcNumberState] = useState(editingCard ? editingCard.cvc_number : '')

    const [hasError, setHasError] = useState({
        card_name: false,
        card_number: false,
        expiration_date: false,
        cvc_number: false
    })

    const validateName = (name, nameValue) => {
        setHasError(prevState => ({
            ...prevState,
            [name]: /^[A-Za-z\s]*$/.test(nameValue) ? false : true
        }))
        nameValue ? setNameValidated(/^[A-Za-z\s]*$/.test(nameValue)) : setNameValidated(false)
        setNameState(nameValue)
    }
    
    const validateCardNumber = (name, card_number) =>  {
        document.querySelector('input[name=card_number]').value.replace(/\D/g, "")
        setHasError(prevState => ({
            ...prevState,
            [name]: (card_number.length === 16 && /^[0-9]+$/.test(card_number)) ? false : true
        }))
        setCardNumberValidated(card_number.length === 16 && /^[0-9]+$/.test(card_number))
        setCardNumberState(card_number)
    }

    const validateExpirationDate = (name, expiration_date) =>  {
        const expirationDateField = document.querySelector('input[name=expiration_date]')
        const regx = new RegExp(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)

        expirationDateField.value = expirationDateField.value.slice(0, 16)
        setHasError(prevState => ({
            ...prevState,
            [name]: (expiration_date.match(regx)) ? false : true
        }))
        setExpirationDateValidated(expiration_date.match(regx))
        setExpirationDateState(expiration_date)
    }

    const validateCvc = (name, cvc_number) =>  {
        const cvcNumberField = document.querySelector('input[name=cvc_number]')
        if (cvc_number.length !== 3) {
            cvcNumberField.value = cvcNumberField.value.slice(0, 3)
        }
        setHasError(prevState => ({
            ...prevState,
            [name]: (cvcNumberField.value.length === 3 && /^[0-9]+$/.test(cvc_number)) ? false : true
        }))
        setCvcNumberValidated(cvcNumberField.value.length === 3 && /^[0-9]+$/.test(cvc_number))
        setCvcNumberState(cvc_number)
    }    

    const onInputChange = (e) => {
        const { name, value } = e.target
        switch(name) {
            case 'card_name': {
               validateName(name, value)
               break
            }
            case 'card_number': {
                validateCardNumber(name, value)
                break
             }
             case 'expiration_date': {
                validateExpirationDate(name, value)
                break
             }
             case 'cvc_number': {
                validateCvc(name, value)
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
                    cvc_number: cvcNumberState,
                    expiration_date: expirationDateState,
                    name: nameState,
                    card_number: cardNumberState
                }})
                closeEditCard()
            } else {
                dispatch({ type: 'ADD_CARD', card: {
                    type: cardTypes[Math.floor(Math.random()*cardTypes.length)],
                    cvc_number: cvcNumberState,
                    expiration_date: expirationDateState,
                    name: nameState,
                    card_number: cardNumberState
                }})
                closeAddCard()
            }
        }
    }

    useEffect(() => {
        (nameValidated && cardNumberValidated && expirationDateValidated && cvcNumberValidated) ? setSubmitEnabled(true) : setSubmitEnabled(false)
    }, [nameValidated, cardNumberValidated, expirationDateValidated, cvcNumberValidated])

    return (
        <form className="details-form" onSubmit={((e) => handleSubmit(e))}>

            <div className="form-group">
                <label className={"label" + (hasError.card_name ? " has-errors" : "") + (nameValidated ? " validated" : "")}>
                    Name in card</label>
                <input 
                    type="text"
                    name="card_name"
                    onChange={(e)=> onInputChange(e)}
                    placeholder="John Doe"
                    maxLength="40"
                    value={nameState}
                />
                <label className={"error-label" + (hasError.card_name ? " visible" : "")}>Please fil in your name</label>
            </div>
            <div className="form-group">
                <label className={"label" + (hasError.card_number ? " has-errors" : "") + (cardNumberValidated ? " validated" : "")}>
                    Card number</label>
                <input 
                    type="text"
                    name="card_number" 
                    onChange={(e)=> onInputChange(e)}
                    placeholder="0000 0000 0000 0000"
                    maxLength="16"
                    value={cardNumberState}
                />
                <label className={"error-label" + (hasError.card_number ? " visible" : "")}>Please enter a valid credit card number</label>
            </div>
            <div className="form-group">
                <label className={"label" + (hasError.expiration_date ? " has-errors" : "") + (expirationDateValidated ? " validated" : "")}>Expiry date</label>
                <input 
                    type="text"
                    name="expiration_date"
                    onChange={(e)=> onInputChange(e)}
                    placeholder="00/00"
                    maxLength="5"
                    value={expirationDateState}
                />
                <label className={"error-label" + (hasError.expiration_date ? " visible" : "")}>Please enter a valid expiry date</label>
            </div>
            <div className="form-group">
                <label className={"label" + (hasError.cvc_number ? " has-errors" : "") + (cvcNumberValidated ? " validated" : "")}>CVC(Security code)</label>
                <input 
                    type="text"
                    name="cvc_number"
                    onChange={(e)=> onInputChange(e)}
                    placeholder="000"
                    maxLength="3"
                    value={cvcNumberState}
                />
                <label className={"error-label" + (hasError.cvc_number ? " visible" : "")}>Please enter a valid Security code</label>
            </div>

            <input className={"btn-submit" + (submitEnabled ? " enabled" : "")} type="submit" value="Confirm" />
        </form>
    )
}

export default CardForm