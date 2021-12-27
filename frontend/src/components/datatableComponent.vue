<template>
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
</template>

<script setup>
    import { inject, ref, onMounted } from "vue";
    import axios from "axios";
    import $ from "jquery";

    const codeStore = inject("codeStore");
    const baseURL = codeStore.constants.baseURL;

    onMounted(() => {
        fetchFreeAPI();
    });

    //DataTable
    const tableArray = ref([]);
    const fetchFreeAPI = async () => {
        // let url = "https://jsonplaceholder.typicode.com/posts";
        let url = baseURL + '/getList'
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
                            const conditionalBtn =
                                '<button data-id="' +
                                data +
                                '" id="deleteBtn" class="btn btn-link">delete</button>';
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
</script>

<style lang="scss" scoped>
</style>