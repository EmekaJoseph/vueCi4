<template>
  <h5 class="card-header">Input File:</h5>
  <div class="card-body my-3">
    <div class="row">
      <div class="col-xl-6 col-md-12 mb-2">
        <div class="card h-100">
          <div class="card-header border-0">Click</div>
          <div class="card-body">
            <form @submit.prevent="returnSt" ref="ImgForm" id="formID">
              <div class="mb-3">
                <input class="form-control" accept="image/jpg, image/png" ref="mainImgBtn" id="fileUp" type="file"
                  @change="handleFileUpload" hidden />

                <div class="row gx-5">
                  <div class="col-md-6">
                    <button @click.prevent="chooseImage" class="btn btn-light w-100">Upload Image</button>
                  </div>
                  <div class="col-md-6">
                    <button v-show="imageURL" @click.prevent="clearImage" class="btn btn-danger w-100">Remove</button>
                  </div>
                </div>
              </div>

              <span v-show="imageURL">
                <b>Size:</b>
                {{ imgSize.kb }}Kb,
              </span>
              <span v-show="imageURL">{{ imgSize.mb }}MB</span>
              <div v-show="imageURL" class="imagePreviewWrapper" :style="{ 'background-image': `url(${imageURL})` }">
              </div>

              <div class="col-6 float-end">
                <div v-show="imageURL" class="mt-3">
                  <button type="submit" class="btn btn-primary w-100">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="col-xl-6 col-md-12">
        <div class="card">
          <div class="card-header border-0">DropZone</div>
          <div class="card-body">
            <div class="row justify-content-center">
              <DropZone @drop.prevent="drop" @change="selectedFile" />
            </div>
            <div class="p-4 text-center">
              <div v-if="dropzoneFile" class="p-2 alert alert-info">
                <i class="bi bi-check-circle-fill"></i>&nbsp;<b>File Name:</b> {{ dropzoneFile.name }}
              </div>
              <div v-else class="p-2">
                Select a file
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="card mt-5">
      <h5 class="card-header">FORM TEST</h5>
      <div class="card-body">
        <small class="text-muted">Insert multiple skills</small>
        <div v-for="(x, i) in data.interests" :key="i" class="col-md-6 mt-2">
          <input @keyup="updateInt" class="form-control" :value="x.text" :id="x.id" type="text"
            placeholder="enter a skill.." />
        </div>
        <div class="col-md-6">
          <span v-if="data.interests.length > 1">
            <button @click.prevent="removePane" class="btn btn-link text-danger addMoreBtn">
              <i class="bx bx-x"></i>REMOVE
            </button>
          </span>
          <span class="float-end">
            <button @click.prevent="addNewPane" class="btn btn-link addMoreBtn">
              <i class="bx bx-plus"></i> ADD
              MORE
            </button>
          </span>
        </div>
        <div class="col-md-6 my-4">
          <button @click="submitData" type="button" class="btn btn-secondary">Save My Skills</button>
        </div>

        <div class="mt-5" v-html="data.Html"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, ref, computed, reactive } from "vue";
import { useImageUpload } from "@/codeStore/composables/useImageUpload.js";
import DropZone from "./dropZoneComponent.vue";
// import axios from "axios";
import apiCall from '@/codeStore/apiStore.js'
const codeStore = inject("codeStore");
const baseURL = codeStore.constants.baseURL;




let dropzoneFile = ref("");
const drop = (e) => {
  dropzoneFile.value = e.dataTransfer.files[0];
};
const selectedFile = () => {
  dropzoneFile.value = document.querySelector(".dropzoneFile").files[0];
};


// //props 1
// const props = defineProps({
// name: {
//     type: String,
//     default: "2",
//     required: false,
// },
// });

//props 2
// defineProps({
//   name: {
//     type: String,
//     default: "2",
//     required: false,
//   },
//   msg: String
// })

// //emit
// const emits = defineEmits(['added'])
// function sendEmitFunction() {
//     emits('added', 33)
// }

let { handleFileUpload, imageURL, imageFile, imgSize } = useImageUpload();

const mainImgBtn = ref(null);
const ImgForm = ref(null);
function chooseImage() {
  mainImgBtn.value.click();
}
function clearImage() {
  imageURL.value = "";
  imageFile.value = "";
  ImgForm.value.reset();
}

async function returnSt() {
  let imageData = new FormData();
  imageData.append("image", imageFile.value);

  // let urlPI = baseURL + "/submitImage";
  // const headers = {
  //   "Content-Type": "multipart/form-data",
  //   "X-Requested-With": "XMLHttpRequest",
  // };
  try {
    // var { data } = await axios.post(urlPI, imageData, headers);
    var { data } = await apiCall.uploadImage(imageData)
    console.log("submited: ", data);
    alert("image uploaded successfully");
    clearImage();
  } catch (error) {
    console.log(error);
    alert("Something went wrong abeg");
  }
}

//////////////////////////////////// form test
const data = reactive({
  interests: [{
    id: 1,
    text: ''
  }],
  Html: null
})

function addNewPane() {
  data.interests.push({
    id: data.interests.length + 1,
    text: ''
  })
}

function removePane() {
  data.interests.pop()
}

function submitData() {
  let textt = data.interests.map(x => x.text)
  let texts = textt.filter(x => x != '')
  data.Html = (texts.length > 0) ? `<span class="text-success">You Interest(s): ${texts.toString()}</span>` : '<span class="text-danger">Please enter skill</span>'
}

function updateInt(e) {
  let thisItem = data.interests.find((x) => x.id == e.target.id);
  thisItem.text = e.target.value;
}
  /////////////////////////////////////// form test
</script>

<style scoped>
.imagePreviewWrapper {
  background-repeat: no-repeat;
  width: 50px;
  height: 50px;
  display: block;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: contain;
  background-position: center center;
  border-radius: 100%;
}

/* .hgt{
    w
  } */

.addMoreBtn {
  margin: 0px;
  padding: 0px;
  text-decoration: none;
  font-size: 12px;
  font-weight: bold;
}
</style>