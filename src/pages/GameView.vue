<template>
    <Toast />
    <div v-if="deckSize > 0" class="flex flex-column align-items-center justify-content-center h-full mt-5" id="prompt">
        <div class="flex flex-column align-items-center justify-content-center" id="prompt__title">
            <h1>Memorization Game</h1>
            <h2>Try to guess the backside of the card</h2>
        </div>
        <div id="prompt__card">
            <FlipCard
                :content="{
                    front: gameDeck[currentCardIndex].content.front,
                    back: gameDeck[currentCardIndex].content.back,
                    key: gameDeck[currentCardIndex].content.key,
                    edittable: gameDeck[currentCardIndex].content.edittable
                }"
                :isDisabled="isCardDisabled"
                :flipped="isCardFlipped"
                @delete="(n) => deleteCard(n)"
            ></FlipCard>
        </div>
        <div id="prompt__buttons">
            <Button title="Previous Card" icon="pi pi-arrow-left" class="p-button-rounded p-button-secondary" @click="prevCard()"></Button>
            <Button title="Next Card" icon="pi pi-arrow-right" class="p-button-rounded p-button-secondary" @click="nextCard()"></Button>
            <Button title="Random Card" icon="pi pi-bolt" class="p-button-rounded p-button-secondary" @click="randomCard()"></Button>
        </div>
        <div id="prompt__cardcount">
            <h3>Card {{ currentCardIndex + 1 }} of {{ deckSize }}</h3>
        </div>
        <div>
            <InputText type="text" v-model="cardGuess" class="cardGuessInput" @keypress.enter="guessCard()"></InputText>
        </div>

        <Toast position="bottom-center" group="bc" />
    </div>
    <div v-else-if="main.deckSize === 0" class="flex flex-column align-items-center justify-content-center h-full mt-5">
        <h1>There are no cards to play with!</h1>
        <h2>Go back and add some cards</h2>
        <router-link to="/">Add Cards</router-link>
    </div>
    <div v-else class="flex flex-column align-items-center justify-content-center h-full mt-5" id="game-over-prompt">
        <h1>You've finished the deck!</h1>
        <h2>Go back and add some new cards, or play again.</h2>
        <router-link to="/">Add Cards</router-link>
        <Button title="Play Again" icon="pi pi-refresh" class="p-button-rounded p-button-secondary" @click="playAgain()"></Button>
    </div>
</template>

<script setup>
import Toast from 'primevue/toast';
import FlipCard from '../components/FlipCard.vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';
import { useCardStore } from '../store/cardStore';
import { ref, onMounted } from 'vue';
//refs
const main = useCardStore();
const currentCardIndex = ref(0);
const gameDeck = ref({});
const deckSize = ref(0);
const cardGuess = ref('');
//flipping refs
const isCardDisabled = ref(true);
const isCardFlipped = ref(false);
//toast stuff
const toast = useToast();
const showSuccess = () => {
    toast.add({ severity: 'success', summary: 'Success Message', detail: 'Correct!', group: 'bc', life: 3000 });
};
const showFailure = () => {
    toast.add({ severity: 'error', summary: 'Fail Message', group: 'bc', detail: 'Incorrect :(', life: 3000 });
};
//onMount
onMounted(() => {
    deckSize.value = main.deckSize;
    gameDeck.value = JSON.parse(JSON.stringify(main.$state.deckOfCards));
});

//functions
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
function deleteCard(content) {
    gameDeck.value = gameDeck.value.filter((c) => c.content.key !== content.key);
    deckSize.value--;
    prevCard();
}

function guessCard() {
    if (cardGuess.value === gameDeck.value[currentCardIndex.value].content.back) {
        isCardDisabled.value = false;
        isCardFlipped.value = !isCardFlipped.value;
        showSuccess();

        setTimeout(() => {
            isCardFlipped.value = false;
            isCardDisabled.value = true;
            deleteCard(gameDeck.value[currentCardIndex.value].content);
            randomCard();
        }, 4000);
    } else {
        showFailure();
    }
}
function playAgain() {
    deckSize.value = main.deckSize;
    gameDeck.value = JSON.parse(JSON.stringify(main.$state.deckOfCards));
    currentCardIndex.value = 0;
}

//TODO: Flip the card here with vue transition instead of using css.... maybe later?
/* function flipCard(card) {
} */
</script>
