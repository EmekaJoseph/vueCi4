<template>
    <div @click="clickFileBtn" @dragenter.prevent="toggleActive" @dragleave.prevent="toggleActive" @dragover.prevent
        @drop.prevent="toggleActive" :class="{ 'active-dropzone': active }" class="dropzone">
        <span class="fs-1"><i class="bi bi-file-earmark-arrow-down"></i></span>
        <span></span>
        <span>Drag & Drop File OR</span>
        <span>Click to Add</span>
        <input ref="fileBtn" type="file" id="dropzoneFile" class="dropzoneFile" />
    </div>
</template>

<script>
import { ref } from "vue";
export default {
    name: "DropZone",
    setup() {
        const active = ref(false);
        const fileBtn = ref(null)
        const clickFileBtn = () => {
            fileBtn.value.click()
        }
        const toggleActive = () => {
            active.value = !active.value;
        };
        return { active, toggleActive, fileBtn, clickFileBtn };
    },
};
</script>

<style scoped>
.dropzone {
    width: 300px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 5px;
    border: 2px dashed rgb(170, 164, 164);
    background-color: #fff;
    transition: 0.3s ease all;
    color: rgb(170, 164, 164);
}

.dropzone input {
    display: none;
}

.active-dropzone {
    color: #fff;
    border-color: #fff;
    background-color: #41b883;
}
</style>