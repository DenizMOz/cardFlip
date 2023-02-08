import { db } from '/firebase';
import { collection, addDoc, getDoc, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';

async function addCard(card) {
    const docRef = await addDoc(collection(db, 'Cards'), {
        front: card.front,
        back: card.back,
        edittable: card.edittable
    });
    return docRef.id;
}
async function getCard(cardId) {
    const cardSnapshot = await getDoc(doc(db, 'Cards', cardId));
    return cardSnapshot.data();
}
async function getCards() {
    const cardSnapshot = await getDocs(collection(db, 'Cards'));
    return cardSnapshot.docs.map((doc) => {
        return { key: doc.id, ...doc.data() };
    });
}
async function deleteCard(key) {
    await deleteDoc(doc(db, 'Cards', key));
}

export { addCard, getCards, getCard, deleteCard };
