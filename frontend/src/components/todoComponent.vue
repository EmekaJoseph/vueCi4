<template>

    <div v-html="topic"></div>
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
                <li class="d-flex justify-content-between" v-for="(i, index) in itemsList" :key="i.Id">
                    <span :class="{'text-decoration-line-through': i.Done}"><b>{{ index + 1 }}.</b> {{ i.Text }}</span>
                    <span>
                        <div class="form-check">
                            <input @change="updateLocalStorage" v-model="i.Done" class="form-check-input"
                                type="checkbox" :id="'name'+ i.Id">
                            <label class="form-check-label" :for="'name'+ i.Id">
                                Completed
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
    import { inject, ref, onMounted } from "vue";

    onMounted(() => {
        let storedItemList = localStorage.getItem('vue-todo')
        if (storedItemList != null) {
            itemsList.value = JSON.parse(storedItemList)
        }
    })

    const topic = '<h5 class="card-header">Todo List...</h5> <br>';

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
        updateLocalStorage()
    };
    function removeItem(index) {
        let text = "Sure You Want to Delete this?";
        if (confirm(text) == true) {
            itemsList.value.splice(index, 1);
            updateLocalStorage()
        }
    }

    function updateLocalStorage() {
        localStorage.setItem('vue-todo', JSON.stringify(itemsList.value))
    }


</script>

<style scoped>

</style>