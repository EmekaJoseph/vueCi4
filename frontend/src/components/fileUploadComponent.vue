<template>
    <div class="container mt-5">

        <div class="mb-3">
            <!-- <label for="formFile" class="form-label">Upload Image:</label> -->

            <input class="form-control" accept="image/png, image/jpg" id="fileUp" type="file" @change="handleFileUpload"
                hidden>

            <div class="row gx-5">
                <div class="col-6">
                    <button @click.prevent="chooseImage" class="btn btn-light w-100">Upload</button>
                </div>
                <div class="col-6">
                    <button v-show="imageURL" @click.prevent="clearImage" class="btn btn-secondary w-100">Clear</button>
                </div>
            </div>
        </div>

        <div v-show="imageURL" class="imagePreviewWrapper" :style="{ 'background-image': `url(${imageURL})` }">
        </div>
        <div class="col-6 float-end">
            <div v-show="imageURL" class="mt-3 "><button class="btn btn-primary w-100">Submit</button></div>

        </div>
    </div>
</template>

<script>
    import { inject, onMounted, ref, watch } from 'vue'
    export default {
        name: 'fileUploadComponent',
        setup() {
            const imageFile = ref('')
            const imageURL = ref('')

            function handleFileUpload(event) {
                if (event.target.files.length === 0) {
                    imageFile.value = ''
                    imageURL.value = ''
                    return
                }
                imageFile.value = event.target.files[0]

            }

            function chooseImage() {
                document.getElementById("fileUp").click()
            }
            function clearImage() {
                imageFile.value = ''
                imageURL.value = ''
            }

            watch(imageFile, (imageFile) => {
                if (!(imageFile instanceof File)) {
                    return;
                }
                let fileReader = new FileReader
                fileReader.readAsDataURL(imageFile)
                fileReader.addEventListener('load', () => {
                    imageURL.value = fileReader.result
                })
            })

            return { handleFileUpload, imageURL, chooseImage, clearImage }
        }
    }
</script>

<style scoped>
    .imagePreviewWrapper {
        background-repeat: no-repeat;
        width: 250px;
        height: 250px;
        display: block;
        cursor: pointer;
        margin: 0 auto 30px;
        background-size: contain;
        background-position: center center;
    }
</style>