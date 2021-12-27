<template>
  <div class="container">
    <div class="row justify-content-center">
      <h1 class="text-center mt-3">Tools Page</h1>
      <div class="col-8 mt-5">
        <div class="d-flex justify-content-between">
          <div v-for="(list, index) in tabNames" :key="index">
            <button
              @click="navigate(index + 1)"
              class="btn"
              :class="{ active: isShowingNow(index + 1) }"
            >
              {{ list }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-8 mt-4">
        <div v-show="isShowingNow(1)" class="card">
          <div class="card-body">
            <fileUploadComponent />
          </div>
        </div>
        <div v-show="isShowingNow(2)" class="card">
          <div class="card-body">
            <inputListComponent />
          </div>
        </div>
        <div v-show="isShowingNow(3)" class="card">
          <div class="card-body">
            <datatable />
          </div>
        </div>
        <div v-show="isShowingNow(4)" class="card">
          <div class="card-body">
            <cart />
          </div>
        </div>
        <div v-show="isShowingNow(5)" class="card">
          <div class="card-body">
            <others />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, onMounted } from "vue";

import fileUploadComponent from "@/components/fileUploadComponent.vue";
import cartComponent from "@/components/cartComponent.vue";
import inputListComponent from "@/components/inputListComponent.vue";
import datatable from "@/components/datatableComponent.vue";
import others from "@/components/otherOpsComponent.vue";
import cart from "@/components/cartComponent.vue";

const codeStore = inject("codeStore");
const baseURL = codeStore.constants.baseURL;
const u_val = codeStore.values;
const tabNum = ref(1);

const tabNames = ref([
  "FILE UPLOAD",
  "INPUT/LIST",
  "DATATABLE",
  "CART",
  "OTHERS",
]);

const isShowingNow = (num) => {
  return tabNum.value == num ? true : false;
};

function navigate(num) {
  tabNum.value = num;
}
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
</style>