<template>
    <Toast />
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
        <div class="prompt__cardcount">
            <h3>Card {{ main.currentCardIndex + 1 }} of {{ main.deckSize }}</h3>
        </div>
        <div>
            <InputText type="text" v-model="cardGuess" class="cardGuessInput" @keypress.enter="guessCard()"></InputText>
        </div>

        <Toast position="bottom-center" group="bc" />
    </div>
    <div v-else class="prompt">
        <h1>There are no cards to play with!</h1>
        <h2>Go back and add some cards</h2>
        <router-link to="/">Add Cards</router-link>
    </div>
</template>

<script setup>
import Toast from 'primevue/toast';
import FlipCard from '../components/FlipCard.vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';
import { useCardStore } from '../store/cardStore';
import { ref } from 'vue';
//refs
const main = useCardStore();
const cardGuess = ref('');
const toast = useToast();
const showSuccess = () => {
    toast.add({ severity: 'success', summary: 'Success Message', detail: 'Correct!', life: 3000 });
};
const showFailure = () => {
    toast.add({ severity: 'error', summary: 'Fail Message', detail: 'Incorrect :(', life: 3000 });
};

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
function guessCard() {
    if (cardGuess.value === main.deckOfCards[main.currentCardIndex].content.back) {
        console.log('Correct!');
        showSuccess();
    } else {
        console.log('Incorrect!');
        showFailure();
    }
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
