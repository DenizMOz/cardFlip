<template>
    <div v-if="main.deckSize > 0" class="prompt">
        <div class="prompt__title">
            <h1>Memorization Game</h1>
            <h2>Try to guess the backside of the card</h2>
        </div>
        <div class="prompt__card">
            <FlipCard
                :content="{
                    front: main.deckOfCards[main.currentCardIndex].content.front,
                    back: main.deckOfCards[main.currentCardIndex].content.back,
                    key: main.deckOfCards[main.currentCardIndex].content.key,
                    edittable: main.deckOfCards[main.currentCardIndex].content.edittable
                }"
                @flip="(n) => flipCard(n)"
                @delete="(n) => deleteCard(n)"
            ></FlipCard>
        </div>
        <div class="prompt__buttons">
            <Button title="Previous Card" icon="pi pi-arrow-left" class="p-button-rounded p-button-secondary" @click="previousCard()"></Button>
            <Button title="Next Card" icon="pi pi-arrow-right" class="p-button-rounded p-button-secondary" @click="nextCard()"></Button>
            <Button title="Random Card" icon="pi pi-bolt" class="p-button-rounded p-button-secondary" @click="randomCard()"></Button>
        </div>
    </div>
</template>

<script setup>
import FlipCard from '../components/FlipCard.vue';
import { useCardStore } from '../store/cardStore';
//refs
const main = useCardStore();

//functions
function nextCard() {
    main.nextCard();
}
function previousCard() {
    main.prevCard();
}
function randomCard() {
    main.randomCard();
}

function flipCard(card) {
    //TODO: Flip the card here..
}
function deleteCard(content) {
    main.deleteCard(content);
}
</script>

<style scoped>
.prompt {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}
</style>
