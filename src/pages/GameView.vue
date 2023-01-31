<template>
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
</template>

<script setup>
import FlipCard from '../components/FlipCard.vue';
import { useCardStore } from '../store/cardStore';
//refs
const main = useCardStore();

//functions

function flipCard(card) {
    //TODO: Flip the card here..
}
function deleteCard(card) {
    main.deleteCard(card);
}
</script>

<style scoped></style>
