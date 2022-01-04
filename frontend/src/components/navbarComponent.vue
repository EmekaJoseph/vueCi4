<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Tools Page:</a>
            <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button> -->
            <div class="ms-5 collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <!-- <span class="nav-link active" aria-current="page" href="#">Home</span> -->
                    <span @click="navigateTo(listItem.slot)" v-for="listItem in tabs" :key="listItem.slot"
                        class="nav-link mx-3"
                        :class="{'active': (currentTab == listItem.slot)}">{{listItem.name}}</span>

                </div>
            </div>
            <span class="badge rounded-pill bg-secondary">
                proffix.js
            </span>
        </div>
    </nav>
</template>

<script setup>
    import { ref } from 'vue'
    //props
    const props = defineProps({
        tabs: {
            type: Array,
            default: [],
            required: false,
        },
    });

    //emit
    const emits = defineEmits(['navigate'])

    const currentTab = ref(1)
    function navigateTo(slot) {
        currentTab.value = slot
        emits('navigate', slot)
    }
</script>

<style scoped>
    /* .active {
        border-bottom: #fff 1px solid;
    } */
    .nav-link {
        cursor: pointer;
    }
</style>