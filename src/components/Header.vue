<template>
    <div class="flex flex-column mt-5" id="header-container">
        <div class="flex justify-content-center" id="header">
            <h1>Vue Card Flip Vocab App</h1>
        </div>
        <Divider />
        <div class="flex justify-content-center mt-3" id="routerlinks">
            <router-link to="/">Add Cards</router-link>
            <i class="pi pi-prime"></i>
            <router-link to="/game">Play Game</router-link>
        </div>
        <Divider />
    </div>
</template>
<script setup></script>
