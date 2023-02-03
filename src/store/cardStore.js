import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCardStore = defineStore('cardDeck', () => {
    const deckOfCards = ref([]);
    const cardIdCounter = ref(0);
    const deckSize = ref(0);

    function addCard(card) {
        cardIdCounter.value++;
        deckOfCards.value.push({ content: { front: card.front, back: card.back, edittable: card.edittable, key: cardIdCounter.value } });
        deckSize.value++;
    }
    function deleteCard(content) {
        deckOfCards.value = deckOfCards.value.filter((c) => c.content.key !== content.key);
        deckSize.value--;
        this.prevCard();
    }
    return {
        deckOfCards,
        deckSize,
        addCard,
        deleteCard
    };
});
