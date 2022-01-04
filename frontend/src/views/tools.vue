<template>
  <navbarComponent :tabs="tabNames" @navigate="navigateToTab" />
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-8 mt-4">
        <div class="card p-5">
          <div class="card-body">
            <div v-if="isShowingNow(1)">
              <fileUploadComponent />
            </div>
            <div v-else-if="isShowingNow(2)">
              <todoComponent />
            </div>
            <div v-else-if="isShowingNow(3)">
              <datatable />
            </div>
            <div v-else-if="isShowingNow(4)">
              <cart />
            </div>
            <div v-else-if="isShowingNow(5)">
              <others />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { inject, ref } from "vue";

  import fileUploadComponent from "@/components/fileUploadComponent.vue";
  import todoComponent from "@/components/todoComponent.vue";
  import datatable from "@/components/datatableComponent.vue";
  import others from "@/components/otherOpsComponent.vue";
  import cart from "@/components/cart/cartComponent.vue";
  import navbarComponent from "@/components/navbarComponent.vue";

  const codeStore = inject("codeStore");
  const baseURL = codeStore.constants.baseURL;
  const u_val = codeStore.values;
  const tabNum = ref(1);

  const tabNames = ref(
    [
      { slot: 1, name: "FILE UPLOAD" },
      { slot: 2, name: "TODO" },
      { slot: 3, name: "DATATABLE" },
      { slot: 4, name: "CART" },
      { slot: 5, name: "OTHERS" },
    ]
  );

  const isShowingNow = (num) => {
    return tabNum.value == num ? true : false;
  };

  function navigateToTab(num) {
    tabNum.value = num;
  }
</script>

<style scoped>

</style>