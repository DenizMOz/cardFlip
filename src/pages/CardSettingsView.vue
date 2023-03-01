<template>
    <div class="flex justify-content-center align-items-center mt-5" id="inputs">
        <InputText type="text" placeholder="Front of Card" v-model="frontInput" class="frontInput" @keypress.enter="storeCard()"></InputText>

        <InputText type="text" placeholder="Back of Card" v-model="backInput" class="backInput" @keypress.enter="storeCard()"></InputText>

        <Button title="Add a card" icon="pi pi-plus-circle" class="p-button-rounded p-button-secondary" @click="storeCard()"></Button>

        <Checkbox inputId="binary" v-model="checked" :binary="true" />

        <label for="binary">{{ checked ? 'Skippable Cards' : 'Permanent Cards' }}</label>
        <!---  Change the dropdown below, or add some buttons or something to edit the categories  --->
        <Dropdown v-model="selectedCategory" :options="categories" inputId="categoryInput" optionLabel="name" optionValue="_id" placeholder="Select or Create a Category" :editable="true" @keypress.enter="storeCategory()" />
    </div>
    <Divider />
    <div class="flex justify-content-center gap-3" id="card-counter">Cards Added:{{ cardList.length }}</div>
    <div class="flex justify-content-center mb-3 p-2">
        <Button title="Edit Cards" icon="pi pi-pencil" class="p-button-rounded p-button-secondary" @click="editCards()"></Button>
        <Checkbox inputID="binary" v-model="showCats" :binary="true"></Checkbox>
    </div>
    <Divider />
    <div class="grid" id="cardInspector">
        <div v-for="card of cardList" class="col-2">
            <FlipCard
                :content="{
                    front: card.front,
                    back: card.back,
                    edittable: card.edittable,
                    key: card._id
                }"
            ></FlipCard>
            <div v-if="editMode === true">
                <Button icon="pi pi-times" class="p-button-rounded p-button-danger" @click="delCard(card._id)"></Button>
            </div>
            <div v-if="showCats === true">
                <p>Category: {{ getCatName(card.categoryID) }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import FlipCard from '../components/FlipCard.vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import { addCard, getCards, deleteCard } from '/service/CardService';
import { getAllCategories, createCategory } from '/service/CategoryService';
import { onMounted, ref } from 'vue';
//refs
const cardList = ref([]);
const frontInput = ref('');
const backInput = ref('');
const checked = ref(false);
const showCats = ref(false);
const editMode = ref(false);
const selectedCategory = ref();
const categories = ref();
//functions
const editCards = () => {
    editMode.value = !editMode.value;
};
async function storeCard() {
    console.log(getCatName(selectedCategory.value));
    const newCard = {
        front: frontInput.value,
        back: backInput.value,
        edittable: checked.value
    };
    if (selectedCategory.value) {
        newCard.categoryID = selectedCategory.value;
    }
    await addCard(newCard);
    frontInput.value = '';
    backInput.value = '';
    cardList.value = await getCards();
}
async function delCard(key) {
    await deleteCard(key);
    cardList.value = await getCards();
}
//below function is not working
//because the dropdown is consuming the enter keypress
async function storeCategory() {
    const newCategory = {
        name: selectedCategory.value.label
    };
    console.log(selectedCategory.value.label);
    await createCategory(newCategory);
    selectedCategory.value = '';
    categories.value = await getAllCategories();
}
function getCatName(id) {
    if (!id) return;
    const cat = categories.value.find((cat) => cat._id === id);
    return cat.name;
}

onMounted(async () => {
    cardList.value = await getCards();
    categories.value = await getAllCategories();
    console.log(categories.value);
    console.log(cardList.value);
});
</script>
