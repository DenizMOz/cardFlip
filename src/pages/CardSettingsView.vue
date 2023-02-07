<template>
    <div class="flex justify-content-center align-items-center mt-5" id="inputs">
        <InputText type="text" placeholder="Front of Card" v-model="frontInput" class="frontInput" @keypress.enter="storeCard()"></InputText>

        <InputText type="text" placeholder="Back of Card" v-model="backInput" class="backInput" @keypress.enter="storeCard()"></InputText>

        <Button title="Add a card" icon="pi pi-plus-circle" class="p-button-rounded p-button-secondary" @click="storeCard()"></Button>

        <Checkbox inputId="binary" v-model="checked" :binary="true" />

        <label for="binary">{{ checked ? 'Skippable Cards' : 'Permanent Cards' }}</label>
    </div>
    <Divider />
    <div class="flex justify-content-center" id="card-counter">Cards Added:{{ cardList.length }}</div>
    <Divider />
    <div class="grid" id="cardInspector">
        <div v-for="card of cardList" class="col-2">
            <FlipCard
                :content="{
                    front: card.front,
                    back: card.back,
                    edittable: card.edittable,
                    key: card.key
                }"
                @delete="(n) => delCard(n)"
            ></FlipCard>
        </div>
    </div>
</template>

<script setup>
import FlipCard from '../components/FlipCard.vue';
import { uuid } from 'vue-uuid';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import { addCard, getCards, deleteCard } from '/service/CardService';
import { onMounted, ref } from 'vue';
//refs
const cardList = ref([]);
const frontInput = ref('');
const backInput = ref('');
const checked = ref(false);
//functions
async function storeCard() {
    const uuid1 = uuid.v1();
    const newCard = {
        front: frontInput.value,
        back: backInput.value,
        edittable: checked.value,
        key: uuid1
    };
    await addCard(newCard);
    frontInput.value = '';
    backInput.value = '';
    cardList.value = await getCards();
}
async function delCard(key) {
    await deleteCard(key);
    cardList.value = await getCards();
}

onMounted(async () => {
    cardList.value = await getCards();
});
</script>

<style scoped></style>
