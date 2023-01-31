<template>
    <div class="inputs">
        <InputText type="text" v-model="frontInput" class="frontInput" @keypress.enter="addCard()"></InputText>
        <InputText type="text" v-model="backInput" class="backInput" @keypress.enter="addCard()"></InputText>
        <Button title="Add a card" icon="pi pi-plus-circle" class="p-button-rounded p-button-secondary" @click="addCard()"></Button>
        <Checkbox inputId="binary" v-model="checked" :binary="true" />
        <label for="binary">{{ checked }}</label>
        <div>Cards Added:{{ main.deckSize }}</div>

        <div class="grid">
            <div v-for="card of main.deckOfCards" class="col-2">
                <FlipCard
                    :content="{
                        front: card.content.front,
                        back: card.content.back,
                        key: card.content.key,
                        edittable: card.content.edittable
                    }"
                    @flip="(n) => flipCard(n)"
                    @delete="(n) => deleteCard(n)"
                ></FlipCard>
            </div>
        </div>
    </div>
</template>

<script setup>
import FlipCard from '../components/FlipCard.vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import { useCardStore } from '../store/cardStore';
import { ref } from 'vue';
//refs
const main = useCardStore();
const frontInput = ref('');
const backInput = ref('');
const checked = ref(false);
//functions
function addCard() {
    const newCard = {
        front: frontInput.value,
        back: backInput.value,
        edittable: checked.value
    };
    main.addCard(newCard);
    frontInput.value = '';
    backInput.value = '';
}
function deleteCard(content) {
    main.deleteCard(content);
}
</script>

<style scoped></style>
