<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Tools Page:</a>
            <div class="ms-5 collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <span @click="navigateTo(listItem.slot)" v-for="listItem in u_val.tabNames" :key="listItem.slot"
                        class="nav-link mx-3"
                        :class="{'active': (currentTab == listItem.slot)}">{{listItem.name}}</span>

                    <div class="nav-item  dropdown">
                        <a class="nav-link dropdown-toggle text-white-50" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            PAGES
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#">Dashboard</a></li>
                            <li><a class="dropdown-item" href="#">Test Page</a></li>
                        </ul>
                    </div>
                </div>

            </div>
            <span class="navbar-toggler border-0">
                <span @click=" u_mtd.toggleOffCanvas" class="navbar-toggler-icon"></span>
            </span>
        </div>
    </nav>
    <offCanvasComponent @navigate="navigateTo" />
</template>

<script setup>
    import offCanvasComponent from "@/components/offCanvasComponent.vue";
    import { inject, ref } from "vue";

    const codeStore = inject("codeStore");
    const u_val = codeStore.values;
    const u_mtd = codeStore.methods;


    //emit
    const emits = defineEmits(['navigate'])

    const currentTab = ref(1)
    function navigateTo(slot) {
        currentTab.value = slot
        emits('navigate', slot)
    }
</script>

<style scoped>
    .nav-link {
        cursor: pointer;
    }
</style>