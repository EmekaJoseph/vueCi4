<template>
    <div class="container">

        <div class="row justify-content-center">
            <!-- <h1 class="text-center">{{u_val.response}}</h1> -->
            <div class="col-6 mt-5">
                <div class="d-flex justify-content-between">
                    <div><button @click="navigate(1)" class="btn" :class="{active: isShowingNow(1)}">FILE
                            UPLOAD</button>
                    </div>
                    <div><button @click="navigate(2)" class="btn" :class="{active: isShowingNow(2)}">MENU 2</button>
                    </div>
                    <div><button @click="navigate(3)" class="btn" :class="{active: isShowingNow(3)}">MENU 3</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-6 mt-4">
                <div v-if="isShowingNow(1)" class="card">
                    <div class="card-body">
                        <h5 class="card-title">Upload File</h5>
                        <fileUploadComponent />
                    </div>
                </div>
                <div v-if="isShowingNow(2)" class="card">
                    <div class="card-body">
                        <h5 class="card-title">Card {{tabNum}}</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of
                            the card's content.Some quick example text to build on the card title and make up the bulk
                            of
                            the card's content.</p>
                    </div>
                </div>
                <div v-if="isShowingNow(3)" class="card">
                    <div class="card-body">
                        <h5 class="card-title">Card {{tabNum}}</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of
                            the card's content.Some quick example text to build on the card title and make up the bulk
                            of
                            the card's content.Some quick example text to build on the card title and make up the bulk
                            of
                            the card's content.Some quick example text to build on the card title and make up the bulk
                            of
                            the card's content.Some quick example text to build on the card title and make up the bulk
                            of
                            the card's content.Some quick example text to build on the card title and make up the bulk
                            of
                            the card's content.Some quick example text to build on the card title and make up the bulk
                            of
                            the card's content.Some quick example text to build on the card title and make up the bulk
                            of
                            the card's content.Some quick example text to build on the card title and make up the bulk
                            of
                            the card's content.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { inject, onMounted, ref } from 'vue'
    import axios from 'axios'

    import fileUploadComponent from '@/components/fileUploadComponent.vue'
    export default {
        components: {
            fileUploadComponent
        },
        setup() {
            const codeStore = inject("codeStore");
            const baseURL = codeStore.constants.baseURL;
            const u_val = codeStore.values
            const tabNum = ref(1)

            onMounted(() => {
                //tryFetch();
            });

            const isShowingNow = (num) => {
                return tabNum.value == num ? true : false
            }

            function navigate(num) {
                tabNum.value = num
            }

            const tryFetch = async () => {
                let url = baseURL + 'getAll'
                try {
                    var { data } = await axios.get(url);
                    u_val.response = data;
                } catch (error) {
                    console.log(error);
                }
            }
            return {
                u_val, isShowingNow, navigate, tabNum
            }
        },
    };
</script>

<style scoped>
    .active {
        border-bottom: rgb(144, 240, 48) 5px solid;
        font-weight: bold;
    }

    input:focus,
    select:focus,
    textarea:focus,
    button:focus {
        outline: none;
        box-shadow: none;
    }

    .btn:hover {
        font-weight: bold;
    }
</style>