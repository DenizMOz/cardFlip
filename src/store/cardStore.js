import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCardStore = defineStore('cardDeck', () => {
    const deckOfCards = ref([]);
    const cardCount = ref(0);
    const deckSize = ref(0);
    const currentCardIndex = ref(0);

    function addCard(card) {
        cardCount.value++;
        deckOfCards.value.push({ content: { front: card.front, back: card.back, edittable: card.edittable, key: cardCount.value } });
        deckSize.value++;
    }
    function deleteCard(content) {
        deckOfCards.value = deckOfCards.value.filter((c) => c.content.key !== content.key);
        deckSize.value--;
        this.prevCard();
    }
    function nextCard() {
        if (currentCardIndex.value < deckSize.value) {
            if (currentCardIndex.value === deckSize.value - 1) {
                currentCardIndex.value = 0;
            } else currentCardIndex.value++;
        }
    }
    function prevCard() {
        if (currentCardIndex.value === 0) {
            currentCardIndex.value = deckSize.value - 1;
        } else if (currentCardIndex.value > 0) {
            currentCardIndex.value--;
        }
    }
    function randomCard() {
        if (deckSize.value > 0) {
            currentCardIndex.value = Math.floor(Math.random() * deckSize.value);
        }
    }

    return {
        deckOfCards,
        cardCount,
        deckSize,
        currentCardIndex,
        addCard,
        deleteCard,
        nextCard,
        prevCard,
        randomCard
    };
});
