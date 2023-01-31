<template>
    <div class="inputs">
        <InputText type="text" v-model="frontInput" class="frontInput" @keypress.enter="addCard()"></InputText>
        <InputText type="text" v-model="backInput" class="backInput" @keypress.enter="addCard()"></InputText>
        <Button title="Add a card" icon="pi pi-plus-circle" class="p-button-rounded p-button-secondary" @click="addCard()"></Button>
        <Checkbox inputId="binary" v-model="checked" :binary="true" />
        <label for="binary">{{ checked }}</label>
    </div>
    <div class="grid">
        <div v-for="(card, i) of deckCards" class="col-2">
            <FlipCard
                :content="{
                    front: card.front,
                    back: card.back,
                    key: card.key,
                    edittable: card.edittable
                }"
                @flip="(n) => flipCard(n)"
                @delete="(n) => deleteCard(n)"
            ></FlipCard>
        </div>
    </div>
</template>

<script setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import FlipCard from '../components/FlipCard.vue';
import Checkbox from 'primevue/checkbox';
import { ref } from 'vue';
//reactives
const deckCards = ref([]);
const cardCount = ref(0);
const frontInput = ref('');
const backInput = ref('');
const checked = ref(false);

//functions
function addCard() {
    cardCount.value++;
    const newCard = {
        front: frontInput.value,
        back: backInput.value,
        key: cardCount.value,
        edittable: checked.value
    };
    deckCards.value.push(newCard);
    console.log(newCard);
}
function flipCard(card) {
    //TODO: Flip the card here..
}
function deleteCard(card) {
    console.log(card);
    console.log(deckCards.value[0]);
    deckCards.value = deckCards.value.filter((cardFromDeck) => cardFromDeck.key !== card.key);
}
</script>

<style></style>
