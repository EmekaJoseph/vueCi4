<template>
    <div class="container mt-5">
        <form action="https://google.com" @submit.prevent="returnSt" id="formID">
            <div class="mb-3">
                <input class="form-control" accept="image/png, image/jpg" id="fileUp" type="file"
                    @change="handleFileUpload" hidden>

                <div class="row gx-5">
                    <div class="col-6">
                        <button @click.prevent="chooseImage" class="btn btn-light w-100">Upload</button>
                    </div>
                    <div class="col-6">
                        <button v-show="imageURL" @click.prevent="clearImage"
                            class="btn btn-danger w-100">Remove</button>
                    </div>
                </div>
            </div>

            <div v-show="imageURL" class="imagePreviewWrapper" :style="{ 'background-image': `url(${imageURL})` }">
            </div>
            <div class="col-6 float-end">
                <div v-show="imageURL" class="mt-3 "><button type="submit" class="btn btn-primary w-100">Submit</button>
                </div>

            </div>
        </form>
    </div>
</template>

<script>
    // import { inject, onMounted, ref, watch } from 'vue'
    import { useImageUpload } from '@/codeStore/composables/useImageUpload.js'
    export default {
        name: 'fileUploadComponent',
        setup() {
            let { handleFileUpload, imageURL, imageFile } = useImageUpload()

            function chooseImage() {
                document.getElementById("fileUp").click()
            }
            function clearImage() {
                imageURL.value = ''
                imageFile.value = ''
                console.log('ok')
            }

            function returnSt() {
                console.log('submittedddd')
                // document.getElementById("formID").submit()
                // return true
            }

            return {
                handleFileUpload, imageURL, imageFile, clearImage, chooseImage,
                returnSt
            }
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