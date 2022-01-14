<template>
    <div class="sidebar"></div>

    <!-- Button trigger modal -->
    <button @click="toggleModal" type="button" class="btn btn-primary">
        Open Modal
    </button>

    <!-- Modal -->
    <div v-if="modalIsOpen" class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Modal title</h5>
                    <button @click="toggleModal" type="button" class="btn-close"></button>
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button @click="toggleModal" type="button" class="btn btn-secondary">Close</button>
                    <button type="button" class="btn btn-primary">Understood</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    const modalIsOpen = ref(false)
    function toggleModal() {
        modalIsOpen.value = !modalIsOpen.value
    }
</script>
<style scoped>
    .modal {
        display: inline;
        background-color: rgba(0, 0, 0, 0.377);
    }
</style>