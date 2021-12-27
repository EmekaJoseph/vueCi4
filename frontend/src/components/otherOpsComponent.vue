<template>
    <p class="card-header fw-bold p-2 mb-3">Color Changer:</p>
    <div class="d-flex justify-content-between">
        <span>
            <label for="textColor">TextColor:</label>
            <input id="textColor" class="form-control" v-model="varColor" type="text" />
            <br />
            <label for="bgColor">Background:</label>
            <input id="bgColor" class="form-control" v-model="varColorBg" type="text" />
        </span>
        <span id="altText" class="h4"> TextColor </span>
    </div>
</template>

<script setup>
    import { inject, ref, onMounted } from "vue";

    //others
    const varColor = ref('#0085a1')
    const varColorBg = ref('yellow')
</script>

<style scoped>
    #altText {
        color: v-bind(varColor);
        background-color: v-bind(varColorBg);
        padding: 50px
    }
</style>