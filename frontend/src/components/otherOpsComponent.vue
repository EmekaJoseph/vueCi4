<template>
    <p class="card-header fw-bold p-2 mb-3">Color Changer:</p>
    <div class="col-md-12">
        <div class="row justify-content-center">
            <div class="col-md-6 my-3 row align-content-center">
                <span id="altText" class="h4 text-center"> {{text}} </span>
            </div>
            <div class="col-md-4">
                <span>
                    <label for="textColor">TextColor:</label>
                    <input id="textColor" class="form-control" v-model="varColor" type="text" />
                    <br />
                    <label for="bgColor">Background:</label>
                    <input id="bgColor" class="form-control" v-model="varColorBg" type="text" />
                    <br>
                    <label for="text">Text:</label>
                    <input id="text" class="form-control" v-model="text" type="text" />
                </span>
            </div>

        </div>
    </div>
</template>

<script setup>
    import { inject, ref, onMounted } from "vue";

    //others
    const varColor = ref("#0085a1");
    const varColorBg = ref("yellow");
    const text = ref('TextColor')
</script>

<style scoped>
    #altText {
        color: v-bind(varColor);
        background-color: v-bind(varColorBg);
        padding: 20px;
    }
</style>