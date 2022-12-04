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
        name: editingCard ? true : false,
        card_number: editingCard ? true : false,
        expiration_date: editingCard ? true : false,
        cvc_number: editingCard ? true : false
    })
    const [submitEnabled, setSubmitEnabled] = useState(false)
    const [newCardState, setNewCardState] = useState({
        cvc_number: '',
        expiration_date: '',
        name: '',
        card_number: ''
    })
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
        nameValue ? setFieldsValidated({...fieldsValidated, name: /^[A-Za-z\s]*$/.test(nameValue)}) : setFieldsValidated({...fieldsValidated, name: false})
        editCardState ? setEditCardState({...editCardState, name: nameValue}) : setNewCardState({...newCardState, name: nameValue})
    }
    
    const validateCardNumber = (name, card_number) =>  {
        setHasError(prevState => ({
            ...prevState,
            [name]: (card_number.length === 16 && /^[0-9]+$/.test(card_number)) ? false : true
        }))
        setFieldsValidated({...fieldsValidated, card_number: card_number.length === 16 && /^[0-9]+$/.test(card_number)})
        editCardState ? setEditCardState({...editCardState, card_number: card_number}) : setNewCardState({...newCardState, card_number: card_number})
    }

    const validateExpirationDate = (name, expiration_date) =>  {
        const expirationDateField = document.querySelector('input[name=expiration_date]')
        const regx = new RegExp(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)

        expirationDateField.value = expirationDateField.value.slice(0, 16)
        setHasError(prevState => ({
            ...prevState,
            [name]: (expiration_date.match(regx)) ? false : true
        }))
        setFieldsValidated({...fieldsValidated, expiration_date: expiration_date.match(regx) !== null })
        editCardState ? setEditCardState({...editCardState, expiration_date: expiration_date}) : setNewCardState({...newCardState, expiration_date: expiration_date})
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
        setFieldsValidated({...fieldsValidated, cvc_number: (cvcNumberField.value.length === 3 && /^[0-9]+$/.test(cvc_number))})
        editCardState ? setEditCardState({...editCardState, cvc_number: cvc_number}) : setNewCardState({...newCardState, cvc_number: cvc_number})
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
                    cvc_number: editCardState.cvc_number,
                    expiration_date: editCardState.expiration_date,
                    name: editCardState.name,
                    card_number: editCardState.card_number
                }})
                closeEditCard()
            } else {
                dispatch({ type: 'ADD_CARD', card: {
                    cvc_number: newCardState.cvc_number,
                    expiration_date: newCardState.expiration_date,
                    name: newCardState.name,
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
                <label className={"label" + (hasError.card_name ? " has-errors" : "") + (fieldsValidated.name ? " validated" : "")}>Name in card</label>
                <input 
                    type="text"
                    name="card_name"
                    onChange={(e)=> onInputChange(e)}
                    placeholder="John Doe"
                    maxLength="40"
                    value={editCardState ? editCardState.name : newCardState.name}
                />
                <label className={"error-label" + (hasError.card_name ? " visible" : "")}>Please fil in your name</label>
            </div>
            <div className="form-group">
                <label className={"label" + (hasError.card_number ? " has-errors" : "") + (fieldsValidated.card_number ? " validated" : "")}>Card number</label>
                <input 
                    type="text"
                    name="card_number" 
                    onChange={(e)=> onInputChange(e)}
                    placeholder="0000 0000 0000 0000"
                    maxLength="16"
                    value={editCardState ? editCardState.card_number  : newCardState.card_number}
                />
                <label className={"error-label" + (hasError.card_number ? " visible" : "")}>Please enter a valid credit card number</label>
            </div>
            <div className="form-group">
                <label className={"label" + (hasError.expiration_date ? " has-errors" : "") + (fieldsValidated.expiration_date ? " validated" : "")}>Expiry date</label>
                <input 
                    type="text"
                    name="expiration_date"
                    onChange={(e)=> onInputChange(e)}
                    placeholder="00/00"
                    maxLength="5"
                    value={editCardState ? editCardState.expiration_date : newCardState.expiration_date}
                />
                <label className={"error-label" + (hasError.expiration_date ? " visible" : "")}>Please enter a valid expiry date</label>
            </div>
            <div className="form-group">
                <label className={"label" + (hasError.cvc_number ? " has-errors" : "") + (fieldsValidated.cvc_number ? " validated" : "")}>CVC(Security code)</label>
                <input 
                    type="text"
                    name="cvc_number"
                    onChange={(e)=> onInputChange(e)}
                    placeholder="000"
                    maxLength="3"
                    value={editCardState ? editCardState.cvc_number : newCardState.cvc_number}
                />
                <label className={"error-label" + (hasError.cvc_number ? " visible" : "")}>Please enter a valid Security code</label>
            </div>

            <input className={"btn-submit" + (submitEnabled ? " enabled" : "")} type="submit" value="Confirm" />
        </form>
    )
}

export default CardForm