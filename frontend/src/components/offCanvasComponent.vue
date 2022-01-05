<template>
    <div class="offcanvas offcanvas-start" :class="{'show': u_val.showOffCanvas}" data-bs-backdrop="true"
        data-bs-scroll="true" tabindex="-1">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title"><b>Tools:</b></h5>
            <button @click="u_mtd.toggleOffCanvas" type="button" class="btn-close text-reset"
                aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <!-- <div>
                Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images,
                lists, etc.
            </div> -->
            <ul class="list-group list-group-flush w-75">
                <li v-for="listItem in u_val.tabNames" :key="listItem.slot" @click="navigateTo(listItem.slot)"
                    class="list-group-item">{{listItem.name}}
                </li>

            </ul>
        </div>
    </div>
</template>

<script setup>
    import { inject, ref } from "vue";

    const codeStore = inject("codeStore");
    const u_val = codeStore.values;
    const u_mtd = codeStore.methods;

    const emits = defineEmits(['navigate'])

    function navigateTo(slot) {
        u_val.showOffCanvas = false
        emits('navigate', slot)
    }
</script>

<style scoped>
    .show {
        visibility: visible;
    }
</style>