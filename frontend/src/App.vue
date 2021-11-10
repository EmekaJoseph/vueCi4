<template>
  <router-view></router-view>
</template>

<script>
import { provide } from "vue";
import codeStore from "@/codeStore";
export default {
  setup() {
    provide("codeStore", codeStore);
  },
};
</script>
