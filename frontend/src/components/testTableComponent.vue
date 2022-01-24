<template>
    <div class="m-3 mx-2 d-flex justify-content-between">
        <div>Page: <span class="badge badge-pill bg-info">{{currentShowing}}</span></div>
        <div><input @keyup="searchTable()" class="form-control form-control-sm" placeholder="search..." type="text"
                id="myInput">
        </div>
    </div>
    <div class="table-responsive">
        <table class="table" id="myTable">
            <thead>
                <tr>
                    <th scope="col">S/N</th>
                    <th scope="col">Title</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(data, index) in received" :key="index">
                    <th> {{index+1}}</th>
                    <td>{{data.title}}</td>
                    <td>Action</td>
                </tr>
            </tbody>
        </table>

    </div>
    <div class="float-end">
        <nav aria-label="Page navigation example">
            <ul class="pagination pagination-sm">
                <li class="page-item">
                    <a @click="move('p')" class="page-link" :class="{'disabled': isprev()}" href="#"
                        aria-label="Previous">
                        <span aria-hidden="true">Previous</span>
                    </a>
                </li>
                <li v-for="(i, index) in paginateSize" class="page-item">
                    <a @click="loadTable(index+1)" class="page-link" href="#">{{index+1}}</a>
                </li>


                <li class="page-item">
                    <a @click="move('n')" class="page-link" :class="{'disabled': isnext()}" href="#" aria-label="Next">
                        <span aria-hidden="true">Next</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script setup>
    import { inject, ref, onMounted } from "vue";
    import axios from "axios";

    const codeStore = inject("codeStore");
    const baseURL = codeStore.constants.baseURL;

    const received = ref([])
    const paginateSize = ref(0)
    const currentShowing = ref(null)
    const isprev = () => {
        return (currentShowing.value == 1) ? true : false
    }
    const isnext = () => {
        return (currentShowing.value == paginateSize.value) ? true : false
    }

    function move(d) {
        let direction = (d == 'p') ? -1 : 1
        loadTable(currentShowing.value + direction)
    }


    onMounted(() => {
        loadTable(1)
    })

    async function loadTable(num) {
        currentShowing.value = num
        let url = baseURL + `/getBatchList/${num}`
        try {
            var { data } = await axios.get(url);
            received.value = data.data
            paginateSize.value = data.size / 5
        } catch (error) {
            console.log(error)
        }
    }




    function searchTable() {
        // Declare variables
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

</script>

<style scoped>
    a.disabled {
        pointer-events: none;
        cursor: default;
        color: #ccc;
    }
</style>