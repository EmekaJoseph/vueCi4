<template>
    <div class="container mt-5">
        <form @submit.prevent="returnSt" id="formID">
            <div class="mb-3">
                <input class="form-control" accept="image/jpg, image/png" id="fileUp" type="file"
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

            <span v-show="imageURL"><b>Size:</b> {{imgSize.kb}}Kb, </span>
            <span v-show="imageURL"> {{imgSize.mb}}MB </span>
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
    import { inject, onMounted, ref, computed, reactive } from 'vue'
    import { useImageUpload } from '@/codeStore/composables/useImageUpload.js'
    import axios from 'axios'
    export default {
        name: 'fileUploadComponent',
        setup()
        {
            const codeStore = inject("codeStore");
            const baseURL = codeStore.constants.baseURL;

            let { handleFileUpload, imageURL, imageFile, imgSize } = useImageUpload()


            function chooseImage()
            {
                document.getElementById("fileUp").click()
            }
            function clearImage()
            {
                imageURL.value = ''
                imageFile.value = ''
                let form = document.getElementById("formID")
                form.reset()
            }

            async function returnSt()
            {
                let imageData = new FormData()
                imageData.append("image", imageFile.value)


                let urlPI = baseURL + '/submitImage'
                const headers = {
                    "Content-Type": "multipart/form-data",
                    "X-Requested-With": "XMLHttpRequest",
                };
                try
                {
                    var { data } = await axios.post(urlPI, imageData, headers);
                    console.log('submited: ', data);
                    alert('image uploaded successfully')
                    clearImage()
                } catch (error)
                {
                    console.log(error);
                    alert('Something went wrong abeg')
                }
            }

            return {
                handleFileUpload, imageURL, imageFile, clearImage, chooseImage,
                returnSt, imgSize
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
        border-radius: 100%;
    }
</style>