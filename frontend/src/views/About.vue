

<template>
  <div class="about">
    <h1 v-if="!myname">loading.....</h1>
    <h1 v-else>{{ myname }}</h1>

    <!-- <vSelect
      :options="options"
      label="country"
      :reduce="(country) => country.code"
    /> -->
  </div>
</template>

<script>
import { ref, onMounted, inject } from "vue";
import axios from "axios";

export default {
  setup() {
    const myname = ref("");
    const store = inject("codeStore");
    const baseURL = store.constants.baseURL;

    const options = ref([{ country: "Canada", code: "CA" }]);

    onMounted(() => {
      tryFetch();
    });

    const tryFetch = async () => {
      try {
        var { data } = await axios.get(baseURL + "getAll");
        myname.value = data;
      } catch (error) {
        console.log(error);
      }
    };

    return {
      myname,
      options,
    };
  },
};
</script>
<style>
</style>
