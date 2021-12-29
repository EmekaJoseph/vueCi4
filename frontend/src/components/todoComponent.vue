<template>
    <h5 class="card-header">Todo List</h5> <br>
    <div>
        <i class="small">{{ itemInput }}</i>
        <span class="float-end fw-bold">{{ itemsList.length }}</span> <br />
        <br />
        <form @submit.prevent="addToList">
            <input v-model.trim="itemInput" type="text" placeholder="enter todo.." class="form-control" />
        </form>
        <br />
        <span v-if="itemsList.length">
            <ul>
                <li class="d-flex justify-content-between" v-for="(i, index) in itemsList" :key="i.id">
                    <span v-if="i.Done"><strike><b>{{ index + 1 }}.</b> {{ i.Text }}</strike></span>
                    <span v-else><b>{{ index + 1 }}.</b> {{ i.Text }}</span>
                    <span>
                        <div class="form-check">
                            <input v-model="i.Done" class="form-check-input" type="checkbox" value=""
                                id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                Done
                            </label>
                        </div>
                    </span>
                    <span v-if="i.Done">
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
                Id: Date.now(),
                Done: false,
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

    function showStatus(e) {
        // console.log('clicked', e.target.value)
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