import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCardStore = defineStore('cardDeck', () => {
    const deckOfCards = ref([]);
    const cardCount = ref(0);

    function addCard(card) {
        cardCount.value++;
        deckOfCards.value.push({ content: { front: card.front, back: card.back, edittable: card.edittable, key: cardCount.value } });
    }
    function deleteCard(content) {
        deckOfCards.value = deckOfCards.value.filter((c) => c.content.key !== content.key);
    }

    return {
        deckOfCards,
        cardCount,
        addCard,
        deleteCard
    };
});
