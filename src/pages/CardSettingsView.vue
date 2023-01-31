<template>
    <div class="inputs">
        <InputText type="text" v-model="frontInput" class="frontInput" @keypress.enter="addCard()"></InputText>
        <InputText type="text" v-model="backInput" class="backInput" @keypress.enter="addCard()"></InputText>
        <Button title="Add a card" icon="pi pi-plus-circle" class="p-button-rounded p-button-secondary" @click="addCard()"></Button>
        <Checkbox inputId="binary" v-model="checked" :binary="true" />
        <label for="binary">{{ checked }}</label>
    </div>
</template>

<script setup>
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
    //TODO: add pinia store entry here
    console.log(newCard);
    frontInput.value = '';
    backInput.value = '';
}
</script>

<style scoped></style>
