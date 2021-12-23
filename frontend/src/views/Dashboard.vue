<template>
    <div class="container">
        <div class="row justify-content-center">
            <!-- <h1 class="text-center">{{u_val.response}}</h1> -->
            <div class="col-6 mt-5">
                <div class="d-flex justify-content-between">
                    <div>
                        <button @click="navigate(1)" class="btn" :class="{ active: isShowingNow(1) }">
                            FILE UPLOAD
                        </button>
                    </div>
                    <div>
                        <button @click="navigate(2)" class="btn" :class="{ active: isShowingNow(2) }">
                            INPUT/LIST
                        </button>
                    </div>
                    <div>
                        <button @click="navigate(3)" class="btn" :class="{ active: isShowingNow(3) }">
                            DATATABLE
                        </button>
                    </div>
                    <div>
                        <button @click="navigate(4)" class="btn" :class="{ active: isShowingNow(4) }">
                            OTHERS
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-6 mt-4">
                <div v-show="isShowingNow(1)" class="card">
                    <div class="card-body">
                        <h5 class="card-title">Upload File:</h5>
                        <fileUploadComponent />
                    </div>
                </div>
                <div v-show="isShowingNow(2)" class="card">
                    <div class="card-body">
                        Typing: <b>{{ itemInput }}</b>
                        <span class="float-end fw-bold">{{ itemsList.length }}</span> <br />
                        <br />
                        <form @submit.prevent="addToList">
                            <input v-model.trim="itemInput" type="text" placeholder="enter name here"
                                class="form-control" />
                        </form>
                        <br />
                        <span v-if="itemsList.length">
                            <ul>
                                <li class="d-flex justify-content-between" v-for="(i, index) in itemsList" :key="i.id">
                                    <span>
                                        <b>{{ index + 1 }}.</b> {{ i.Text }}</span>
                                    <span>
                                        <button @click="removeItem(index)"
                                            class="ms-5 btn btn-link p-0 m-0 text-danger btn-small">
                                            delete
                                        </button>
                                    </span>
                                </li>
                            </ul>
                        </span>
                    </div>
                </div>
                <div v-show="isShowingNow(3)" class="card">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table" id="myTable">
                                <thead>
                                    <tr>
                                        <th scope="col">S/N</th>
                                        <!-- <th scope="col">ID</th> -->
                                        <th scope="col">Title</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div v-show="isShowingNow(4)" class="card">
                    <div class="card-body">
                        <p class="card-header fw-bold p-2 mb-3">Color Changer:</p>
                        <div class="d-flex justify-content-between">
                            <span>
                                <label for="textColor">TextColor:</label>
                                <input id="textColor" class="form-control" v-model="varColor" type="text"> <br>
                                <label for="bgColor">Background:</label>
                                <input id="bgColor" class="form-control" v-model="varColorBg" type="text">

                            </span>
                            <span id="altText" class="h4">
                                TextColor
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { inject, ref, onMounted } from "vue";
    import axios from "axios";
    import $ from "jquery";

    import fileUploadComponent from "@/components/fileUploadComponent.vue";

    const codeStore = inject("codeStore");
    const baseURL = codeStore.constants.baseURL;
    const u_val = codeStore.values;
    const tabNum = ref(1);

    onMounted(() => {
        fetchFreeAPI();
    });

    const isShowingNow = (num) => {
        return tabNum.value == num ? true : false;
    };

    function navigate(num) {
        tabNum.value = num;
    }

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

    //DataTable
    const tableArray = ref([]);
    const fetchFreeAPI = async () => {
        let url = "https://jsonplaceholder.typicode.com/posts";
        // let url = baseURL + '/getList'
        try {
            var { data } = await axios.get(url);
            console.log(data);
            tableArray.value = data;

            $("#myTable").DataTable({
                // dom: 'Bfrtip',
                // buttons: [
                //     'excel', 'csv'
                // ],
                data: tableArray.value,
                columns: [
                    {
                        data: null,
                        render: (data, type, row, meta) => {
                            return "<b>" + (meta.row + 1) + "</b>";
                        },
                    },
                    // { data: "userId" },
                    { data: "title" },
                    {
                        data: "id",
                        render: (data) => {
                            const conditionalBtn = '<button data-id="' + data + '" id="deleteBtn" class="btn btn-link">delete</button>';
                            return conditionalBtn;
                        },
                    },
                ],

                paging: true,
                lengthChange: false,
                searching: true,
                ordering: false,
                info: false,
                autoWidth: false,
                responsive: false,
            });
        } catch (error) {
            console.log(error);
        }
    };

    $(document).on("click", "#deleteBtn", function () {
        let id = $(this).data("id");
        showID(id);
    });

    function showID(id) {
        let thisData = tableArray.value.find((x) => x.id == id);
        alert(id);
        console.log(thisData);
    }


    //others
    const varColor = ref('#0085a1')
    const varColorBg = ref('yellow')
</script>

<style scoped>
    .active {
        border-bottom: rgb(144, 240, 48) 5px solid;
        font-weight: bold;
    }

    input:focus,
    select:focus,
    textarea:focus,
    button:focus {
        outline: none;
        box-shadow: none;
    }

    .btn:hover {
        font-weight: bold;
    }

    #altText {
        color: v-bind(varColor);
        background-color: v-bind(varColorBg);
        padding: 50px
    }
</style>