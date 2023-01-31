<template>
    <label class="card-wrap">
        <input type="checkbox" class="flipcard" />
        <div class="card">
            <div class="front card-face">
                <div v-if="content.edittable">
                    <Button icon="pi pi-times" class="p-button-rounded p-button-warning" @click="handleDelete"></Button>
                </div>
                <p>{{ content.front }}</p>
            </div>
            <div class="back card-face">
                <div v-if="content.edittable">
                    <Button icon="pi pi-times" class="p-button-rounded p-button-warning" @click="handleDelete"></Button>
                </div>
                <p>{{ content.back }}</p>
            </div>
        </div>
    </label>
</template>

<script setup>
const props = defineProps({
    content: {
        front: {},
        back: {},
        edittable: {},
        key: {}
    }
});
const emit = defineEmits(['flip', 'delete']);
// can use this emit later for flipping with vue transitions instead of css
/* const handleFlip = () => emit('flip', props.content); */

const handleDelete = () => {
    emit('delete', props.content);
};
</script>
<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.input {
    position: absolute;
}
.card-wrap {
    display: block;
    width: 300px;
    max-width: 100%;
    height: 400px;
    margin: 0 auto;
    margin-bottom: 15px;
}

.card,
.front,
.back {
    width: 100%;
    height: 100%;
}

.card-face {
    position: absolute;
    backface-visibility: hidden;
}

.card {
    position: relative;
    transform-style: preserve-3d;
    transition: transform 1s, box-shadow 0.4s;
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302), 0 1px 3px 1px rgba(60, 64, 67, 0.149);
    border-radius: 10px;
}

.card:hover {
    box-shadow: 0 1px 3px 0 rgba(60, 64, 67, 0.302), 0 4px 8px 3px rgba(60, 64, 67, 0.149);
}

.front {
    background-color: white;
    transform: rotateY(0deg);
    text-align: center;
    color: rgba(6, 145, 24, 0.973);
    border-radius: 10px;
    font-family: 'Raleway', sans-serif;
    font-weight: 600;
}
.front p {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.back {
    background-color: white;
    transform: rotateY(180deg);
    text-align: center;
    color: rgba(6, 145, 24, 0.973);
    border-radius: 10px;
    font-family: 'Raleway', sans-serif;
    font-weight: 600;
}

.back p {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.flipcard {
    opacity: 0;
}

input:checked + .card {
    transform: rotateY(180deg);
}
</style>
