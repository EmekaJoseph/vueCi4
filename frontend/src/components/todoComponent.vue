<template>
    <div v-html="topic"></div>
    <div>
        <i class="small">{{ itemInput }}</i>
        <span class="float-end fw-bold">{{ itemsList.length }}</span> <br />
        <br />
        <div class="row gy-3">
            <div class="col-md-6">
                <form @submit.prevent>
                    <input v-model.trim="itemInput" type="text" placeholder="enter todo.." class="form-control" />
                </form>
            </div>
            <div class="col-md-4">
                <DatepickerVue ref="dateInputRef" v-model="ItemDate" :enableTimePicker="false" placeholder="Select Date"
                    autoApply />
            </div>
            <div class="col-md-2">
                <button @click="addToList" class="btn btn-primary w-100">Add</button>
            </div>
        </div>
        <br />
        <div class="p-5" style="background-color: #f5f5f0;">
            <span v-if="itemsList.length">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>List Name</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(i, index) in itemsList" :key="i.Id">
                                <th>{{ index + 1 }}.</th>
                                <td>
                                    <span :class="{ 'text-decoration-line-through': i.Done }">
                                        {{i.Text}}
                                    </span>
                                </td>
                                <td>
                                    <span :class="{ 'text-decoration-line-through': i.Done }">
                                        {{i.Date}}
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        <div class="form-check">
                                            <input @change="updateLocalStorage" v-model="i.Done"
                                                class="form-check-input" type="checkbox" :id="'name' + i.Id" />
                                            <label class="form-check-label" :for="'name' + i.Id">
                                                Completed
                                            </label>
                                        </div>
                                    </span>
                                </td>
                                <td>
                                    <button v-if="i.Done" @click="removeItem(index)"
                                        class="btn btn-link text-danger btn-small">
                                        delete
                                    </button>
                                    <button v-else class="btn btn-link text-muted btn-small" disabled>
                                        delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </span>
            <span v-else class="row justfy-content-center m-2">
                <h3 class="text-center">List Is Empty</h3>
                <small class="text-center">Enter list of TODOs</small>
            </span>
        </div>
    </div>
</template>

<script setup>
    import { inject, ref, onMounted } from "vue";
    import DatepickerVue from 'vue3-date-time-picker';


    onMounted(() => {
        let storedItemList = localStorage.getItem("vue-todo");
        if (storedItemList != null) {
            itemsList.value = JSON.parse(storedItemList);
        }
    });

    const topic = '<h5 class="card-header">Todo List...</h5> <br>';

    // list
    const itemInput = ref("");
    const ItemDate = ref("");
    const itemsList = ref([]);
    const dateInputRef = ref(null)
    const addToList = () => {
        if (itemInput.value.length && ItemDate.value != null) {
            itemsList.value.push({
                Text: itemInput.value,
                Date: customFormatDate(ItemDate.value),
                Id: Date.now(),
                Done: false,
            });
            itemInput.value = "";
            updateLocalStorage();
            dateInputRef.value.clearValue()
        }

    };

    const customFormatDate = (dateValue) => {
        const day = dateValue.getDate();
        const month = dateValue.getMonth() + 1;
        const year = dateValue.getFullYear();
        return `${day}/${month}/${year}`
    }

    function removeItem(index) {
        let text = "Sure You Want to Delete this?";
        if (confirm(text) == true) {
            itemsList.value.splice(index, 1);
            updateLocalStorage();
        }
    }

    function updateLocalStorage() {
        localStorage.setItem("vue-todo", JSON.stringify(itemsList.value));
    }
</script>

<style scoped>
</style>