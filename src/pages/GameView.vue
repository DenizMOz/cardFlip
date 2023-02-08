<template>
    <Toast />
    <div v-if="deckSize > 0" class="flex flex-column align-items-center justify-content-center h-full mt-5 gap-2" id="game-prompt">
        <div class="flex flex-column align-items-center justify-content-center gap-2" id="prompt__title">
            <h1>Memorization Game</h1>
            <h2>Try to guess the backside of the card</h2>
        </div>
        <div id="prompt__card">
            <FlipCard
                :content="{
                    front: gameDeck[currentCardIndex].front,
                    back: gameDeck[currentCardIndex].back,
                    key: gameDeck[currentCardIndex].key,
                    edittable: gameDeck[currentCardIndex].edittable
                }"
                :isDisabled="isCardDisabled"
                :flipped="isCardFlipped"
                @delete="(n) => delCard(n)"
            ></FlipCard>
        </div>
        <div class="flex gap-2 py-2" id="prompt__buttons">
            <Button title="Previous Card" icon="pi pi-arrow-left" class="p-button-rounded p-button-secondary" @click="prevCard()"></Button>
            <Button title="Next Card" icon="pi pi-arrow-right" class="p-button-rounded p-button-secondary" @click="nextCard()"></Button>
            <Button title="Random Card" icon="pi pi-bolt" class="p-button-rounded p-button-secondary" @click="randomCard()"></Button>
        </div>
        <div id="prompt__cardcount">
            <h3>Card {{ currentCardIndex + 1 }} of {{ deckSize }}</h3>
        </div>
        <div id="prompt__input">
            <InputText v-bind:disabled="guessDisable" type="text" v-model="cardGuess" class="cardGuessInput" @keypress.enter="guessCard()"></InputText>
        </div>

        <Toast position="bottom-center" group="bc" />
    </div>
    <div v-else-if="deckMounted === false" class="flex flex-column align-items-center justify-content-center h-full mt-5" id="go-back-prompt">
        <h1>There are no cards to play with!</h1>
        <h2>Go back and add some cards</h2>
        <router-link to="/">Add Cards</router-link>
    </div>
    <div v-else class="flex flex-column align-items-center justify-content-center h-full mt-5" id="game-over-prompt">
        <h1>You've finished the deck!</h1>
        <h2>Go back and add some new cards, or play again.</h2>
        <router-link class="link" to="/">Add Cards</router-link>
        <Button title="Play Again" icon="pi pi-refresh" class="p-button-rounded p-button-secondary" @click="playAgain()"></Button>
    </div>
</template>

<script setup>
import { getCards } from '/service/CardService';
import Toast from 'primevue/toast';
import FlipCard from '../components/FlipCard.vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';
import { ref, onMounted } from 'vue';
//refs
const currentCardIndex = ref(0);
const gameDeck = ref([]);
const deckSize = ref(0);
const deckMounted = ref(false);
const cardGuess = ref('');
const guessDisable = ref(false);

//flipping refs
const isCardDisabled = ref(true);
const isCardFlipped = ref(false);
//toast stuff
const toast = useToast();
const showSuccess = () => {
    toast.add({ severity: 'success', summary: 'Success Message', detail: 'Correct!', life: 3000 });
};
const showFailure = () => {
    toast.add({ severity: 'error', summary: 'Fail Message', detail: 'Incorrect :(', life: 3000 });
};
//onMount
onMounted(async () => {
    gameDeck.value = await getCards();
    if (gameDeck.value.length > 0) {
        deckMounted.value = true;
    }
    deckSize.value = gameDeck.value.length;
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
function delCard(key) {
    // debugger;
    gameDeck.value = gameDeck.value.filter((c) => c.key !== key);
    deckSize.value--;
    prevCard();
}

function guessCard() {
    //TODO: Disable the input field while the card is flipping

    if (cardGuess.value === gameDeck.value[currentCardIndex.value].back) {
        guessDisable.value = true;
        isCardDisabled.value = false;
        isCardFlipped.value = !isCardFlipped.value;
        cardGuess.value = '';
        showSuccess();
        setTimeout(() => {
            isCardDisabled.value = true;
            isCardFlipped.value = false;
        }, 3500);
        setTimeout(() => {
            delCard(gameDeck.value[currentCardIndex.value].key);
            randomCard();
            guessDisable.value = false;
        }, 4000);
    } else {
        showFailure();
    }
}
async function playAgain() {
    gameDeck.value = await getCards();
    deckSize.value = gameDeck.value.length;
    currentCardIndex.value = 0;
}
</script>

<style scoped>
.link {
    text-decoration: none;
    outline: none;
}
</style>
