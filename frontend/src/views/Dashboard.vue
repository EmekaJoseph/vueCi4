<template>
    <div class="container">
        <div class="row justify-content-center">
            <h1 class="text-center">{{u_val.response}}</h1>
        </div>
    </div>
</template>

<script>
    import { inject, onMounted } from 'vue'
    import axios from 'axios'
    export default {
        setup()
        {
            const codeStore = inject("codeStore");
            const baseURL = codeStore.constants.baseURL;
            const u_val = codeStore.values

            onMounted(() =>
            {
                tryFetch();
            });

            const tryFetch = async () =>
            {
                let url = baseURL + 'getAll'
                try
                {
                    var { data } = await axios.get(url);
                    u_val.response = data;
                } catch (error)
                {
                    console.log(error);
                }
            }
            return {
                u_val
            }
        },
    };
</script>

<style>
</style>