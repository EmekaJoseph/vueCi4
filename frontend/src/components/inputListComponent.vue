<template>
    <div>
        Typing: <b>{{ itemInput }}</b>
        <span class="float-end fw-bold">{{ itemsList.length }}</span> <br />
        <br />
        <form @submit.prevent="addToList">
            <input v-model.trim="itemInput" type="text" placeholder="enter name here" class="form-control" />
        </form>
        <br />
        <span v-if="itemsList.length">
            <ul>
                <li class="d-flex justify-content-between" v-for="(i, index) in itemsList" :key="i.id">
                    <span>
                        <b>{{ index + 1 }}.</b> {{ i.Text }}</span>
                    <span>
                        <button @click="removeItem(index)" class="ms-5 btn btn-link p-0 m-0 text-danger btn-small">
                            delete
                        </button>
                    </span>
                </li>
            </ul>
        </span>
    </div>
</template>

<script setup>
    import { inject, ref } from "vue";
    // list
    const itemInput = ref("");
    const itemsList = ref([]);
    const addToList = () => {
        if (itemInput.value.length) {
            itemsList.value.push({
                Text: itemInput.value,
                id: Date.now(),
            });
        }
        itemInput.value = "";
        console.log(itemsList.value);
    };
    function removeItem(id) {
        let text = "Sure You Want to Delete this?";
        if (confirm(text) == true) {
            itemsList.value.splice(id, 1);
        }
    }
</script>

<style scoped>
    input:focus,
    select:focus,
    textarea:focus,
    button:focus {
        outline: none;
        box-shadow: none;
    }
</style>