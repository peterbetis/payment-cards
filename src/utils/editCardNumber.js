export const editCardNumber = (cardNumber) => {
    const cardnumberEdited = cardNumber.replace(/[^0-9]/gi, '').replace(/(.{4})/g, '$1 ').trim()
    return cardnumberEdited
}