async function addCard(card) {
    const response = await fetch(`http://localhost:3001/cards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(card)
    });
    return await response.json();
}
async function getCard(cardId) {
    const response = await fetch(`http://localhost:3001/cards/${cardId}`);
    return await response.json();
}
async function getCards() {
    const response = await fetch('http://localhost:3001/cards');
    return await response.json();
}
async function deleteCard(cardID) {
    const response = await fetch(`http://localhost:3001/cards/${cardID}`, {
        method: 'DELETE'
    });
    return await response.json();
}

export { addCard, getCards, getCard, deleteCard };
