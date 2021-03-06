<template>
    <div class="card">
        <div v-html="dom.topic" class="card-header">
        </div>
        <div class="card-body">
            <div>
                <i class="small">{{ form.textInput }}</i>
                <span class="float-end fw-bold badge rounded-pill bg-secondary">{{ itemsList.length }}</span> <br />
                <br />
                <div class="row gy-3">
                    <div class="col-md-6">
                        <form @submit.prevent>
                            <input v-model.trim="form.textInput" type="text" placeholder="enter todo.."
                                class="form-control" :class="{ 'is-invalid': form.textError }" />
                        </form>
                    </div>
                    <div class="col-md-4">
                        <DatepickerVue ref="dateInputRef" v-model="form.inputDate" :enableTimePicker="false"
                            placeholder="Select Date" autoApply :state="form.dateError" />
                    </div>
                    <div class="col-md-2">
                        <button @click="addToList" class="btn btn-primary w-100">Add</button>
                    </div>
                </div>
                <!-- <br /> -->
                <span class="row justify-content-center my-2" v-html="dom.alertmsg"></span>
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
                                    <tr v-for="(i, index) in sortedList" :key="i.Id">
                                        <th>{{ index + 1 }}.</th>
                                        <td>
                                            <span :class="{ 'doneEle': i.Done }">
                                                {{ i.Text }}
                                            </span>
                                        </td>
                                        <td>
                                            <span :class="{ 'doneEle': i.Done }">
                                                {{ customFormatDate(i.Date) }}
                                            </span>
                                        </td>
                                        <td>
                                            <div class="form-check">
                                                <input @change="updateLocalStorage" v-model="i.Done"
                                                    class="form-check-input" type="checkbox" :id="'name' + i.Id"
                                                    :disabled="isOldDate(i.Date)" />
                                                <label class="form-check-label" :for="'name' + i.Id">
                                                    Completed
                                                </label>
                                            </div>
                                        </td>
                                        <td>
                                            <button @click="removeItem(index)" class="btn p-0 px-2 btn-small"
                                                :class="{ 'disabledBtn': !(i.Done), 'text-danger': i.Done }">delete
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
        </div>
    </div>
</template>

<script setup>
import { inject, ref, onMounted, reactive, computed } from "vue";
import DatepickerVue from 'vue3-date-time-picker';
const Swal = inject('$swal')


onMounted(() => {
    let storedItemList = localStorage.getItem("vue-todo");
    if (storedItemList != null) {
        let todos = JSON.parse(storedItemList)

        todos.forEach(todo => {
            if (isOldDate(todo.Date)) {
                todo.Done = true
            }
        });
        itemsList.value = todos;
    }
});

const isOldDate = (dd) => {
    let todayDate = (new Date()).setHours(0, 0, 0, 0)
    let formatedDate = new Date(dd).setHours(0, 0, 0, 0)
    return (todayDate > formatedDate) ? true : false
}

const dom = reactive({
    topic: 'Todo List...',
    alertmsg: '',
})

const form = reactive({
    textInput: '',
    inputDate: null,
    textError: false,
    dateError: null
})

// list
const itemsList = ref([]);
const sortedList = computed(() => {
    return itemsList.value.sort(function (a, b) {
        return new Date(a.Date) - new Date(b.Date);
    });
})

const dateInputRef = ref(null)
const addToList = () => {
    form.textError = false
    form.dateError = null
    if (form.textInput.length < 3) {
        dom.alertmsg = `<span class="text-danger text-center">Enter TODO text not less than 3 Xters!</span>`
        form.textError = true
        return
    }

    if (form.inputDate == null) {
        dom.alertmsg = `<span class="text-danger text-center">Please input date</span>`
        form.dateError = false
        return
    }

    let todayDate = (new Date()).setHours(0, 0, 0, 0)
    let inputDate_ = form.inputDate.setHours(0, 0, 0, 0)
    if (todayDate > inputDate_) {
        dom.alertmsg = `<span class="text-danger text-center">Please input date (not earlier than today)!</span>`
        form.dateError = false
        return
    }
    else {
        itemsList.value.push({
            Text: form.textInput,
            Date: form.inputDate,
            Id: Date.now(),
            Done: false,
        });
        console.log(form.inputDate);
        resetForm()
        dom.alertmsg = `<span class="text-success text-center">Added to list Successfully!</span>`
        setTimeout(() => {
            dom.alertmsg = ''
        }, 1000);

    }

};

function resetForm() {
    form.textInput = "";
    dom.alertmsg = ''
    form.dateError = null
    form.textError = false
    updateLocalStorage();
    dateInputRef.value.clearValue()
}

const customFormatDate = (rDate) => {
    let dateValue = new Date(rDate)
    const day = dateValue.getDate();
    const month = dateValue.getMonth() + 1;
    const year = dateValue.getFullYear();
    return `${day}/${month}/${year}`
}

function removeItem(index) {
    Swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            itemsList.value.splice(index, 1);
            updateLocalStorage();
            Swal({
                showConfirmButton: false,
                timer: 1500,
                icon: 'success',
                title: 'Deleted',
                text: '',
                width: 350,
                padding: '3em',
            }
            )
        }
    })
}

function updateLocalStorage() {
    localStorage.setItem("vue-todo", JSON.stringify(itemsList.value));
}

</script>

<style scoped>
.disabledBtn {
    pointer-events: none;
    color: #ccc;
}

.text-danger {
    background-color: rgb(250, 234, 228);
}

.text-danger:hover {
    background-color: rgb(247, 200, 185);
}

.form-check-label {
    cursor: pointer;
}

.doneEle {
    text-decoration: line-through;
    color: #ccc;
}
</style>