<template>
    <div>
        <div class="card">
            <div class="card-header border-0">Color Changer:</div>
            <div class="card-body">
                <div class="row justify-content-center">
                    <div class="col-md-5 m-3 row align-content-center" :style="{'background-color': varColorBg}">
                        <span id="altText" class="h4 text-center"> {{ text }} </span>
                    </div>
                    <div class="col-md-4">
                        <span>
                            <label for="textColor">TextColor:</label>
                            <input id="textColor" class="form-control" v-model="varColor" type="text" />
                            <br />
                            <label for="bgColor">Background:</label>
                            <input id="bgColor" class="form-control" v-model="varColorBg" type="text" />
                            <br />
                            <label for="text">Text:</label>
                            <input id="text" class="form-control" v-model="text" type="text" />
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div class="card mt-4">
            <div class="card-header border-0">
                Rating Test <div class="float-end">{{chkdInput()}} / {{totalNum}}</div>
            </div>

            <div class="card-body">
                <p class="small text-muted">enter number from 1 - {{totalNum}}, to fill the boxes</p>
                <div class="row justify-content-center">
                    <div class="col-md-2">
                        <input type="number" class="form-control" v-model.number="rateInput">
                    </div>
                    <div class="col-md-10">
                        <div class="d-flex">
                            <div class="box box-fill" v-for="i in chkdInput()" :key="i">
                            </div>

                            <div class="box" v-for="i in (totalNum - chkdInput())" :key="i">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
    import { inject, ref, onMounted, computed } from "vue";

    //others
    const varColor = ref("#0085a1");
    const varColorBg = ref("yellow");
    const text = ref("TextColor");


    const rateInput = ref(0)
    const totalNum = 12
    const chkdInput = () => {
        let numR = rateInput.value
        if (numR > totalNum) {
            numR = totalNum
        }
        else if (numR < 0) {
            numR = 0
        }
        return numR
    }

</script>

<style scoped>
    #altText {
        color: v-bind(varColor);
        padding: 20px;
    }

    .box {
        width: 20px;
        border: 1px solid #ccc;
        padding: 10px;
        margin: 7px;
        border-radius: 100%;
    }

    .box-fill {
        background-color: rgb(230, 19, 202);
    }
</style>