<template>
  <div class="offcanvas offcanvas-start" :class="{ show: u_val.showOffCanvas }" data-bs-backdrop="true"
    data-bs-scroll="true" tabindex="-1">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title"><b> Tools:</b></h5>
      <button @click="u_mtd.toggleOffCanvas" type="button" class="btn-close text-reset" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <!-- <div>
                Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images,
                lists, etc.
            </div> -->
      <ul class="list-group list-group-flush w-75">
        <li v-for="listItem in u_val.tabNames" :key="listItem.slot" @click="navigateTo(listItem.slot)"
          class="list-group-item">
          <i class="bx" :class="listItem.icon"></i>{{ listItem.name }}
        </li>
      </ul>

      <div class="accordion">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingThree">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              PAGES
            </button>
          </h2>
          <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
            data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <ul>
                <li><i class="bx bxs-cog"></i> Page 1</li>
                <li>Page 2</li>
                <li>Page 3</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { inject, ref } from "vue";

  const codeStore = inject("codeStore");
  const u_val = codeStore.values;
  const u_mtd = codeStore.methods;

  const emits = defineEmits(["navigate"]);

  function navigateTo(slot) {
    u_val.showOffCanvas = false;
    emits("navigate", slot);
  }
</script>

<style scoped>
  .show {
    visibility: visible;
  }

  .list-group-item {
    border: none;
    font-weight: bold;
  }

  .accordion-item {
    border: none;
  }

  .accordion-button {
    font-weight: bold;
    text-transform: uppercase;
  }

  .accordion-button:not(.collapsed) {
    color: #000;
    background-color: #fff;
  }

  .accordion-body ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .accordion-body ul>li {
    margin: 0px 0px 10px 20px;
  }

  .offcanvas {
    width: 300px;
  }

  .bx {
    margin-right: 10px;
  }
</style>