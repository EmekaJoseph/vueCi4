<template>
    <div>

        <div class="my-3 row justify-content-center">
            <div class="text-center h2">{{userObj.counter}}</div>
        </div>

        <div v-show="!quizIsEnded" class="progress" style="height: 25px;">
            <div class="progress-bar bg-primary" :style="{ width: qObj.progressBar + '%' }" role="progressbar"
                :aria-valuenow="qObj.progressBar" aria-valuemin="0" aria-valuemax="100">
                QUESTION {{qObj.fractionAnswered}}</div>
        </div>

        <div v-if="!quizIsEnded">
            <h3 class="text-center m-3 mb-4">{{ currentlyShowing.question }}</h3>
            <div @click="selectAnswer(ops, currentlyShowing.id)" v-for="(ops, index) in currentlyShowing.options"
                :key="index" class="card p-2 ps-3 m-3 shadow-sm opsCard" :class="{ selected: isSelected(ops) }">
                {{ ops }}
            </div>
            <div v-show="userObj.answerClicked" class="float-end mt-4">
                <button @click="nextBtn" class="btn btn-success">Next</button>
            </div>
        </div>
        <div v-else>
            <span class="row justify-content-center">
                <h2 class="mb-4 text-center">Thank You for You Time!</h2>
                <h4 class="text-center text-success">You scored: {{userObj.percentage}}%</h4>
                <small class="text-center m-3">{{userObj.score}}/{{questionData.length}}
                    Correct Answers
                </small>
                <button @click="resetQuiz" class="btn btn-warning">Retake Quiz</button>

            </span>
        </div>
    </div>
</template>

<script setup>
    import { ref, inject, reactive, onMounted, computed } from "vue";

    //injects
    const codeStore = inject("codeStore");
    const u_val = codeStore.values;
    const u_mtd = codeStore.methods;

    //questions
    const AllQuestions = [
        {
            id: 1,
            question: "Who is the president of Nigeria?",
            options: ["Buhari", "Obasanjo", "Gowon"],
            answer: "Buhari",
        },
        {
            id: 2,
            question: "What is 2 + 2?",
            options: ["6", "4", "8"],
            answer: "4",
        },

        {
            id: 3,
            question: "What do we think with?",
            options: ["Nose", "Eyes", "Brain"],
            answer: "Brain",
        },
        {
            id: 4,
            question: "Do plant grow?",
            options: ["Yes", "No"],
            answer: "Yes",
        },
    ];

    const questionData = _.sampleSize(AllQuestions, 3)

    onMounted(() => {
        generateRandom();
        startCounting()
    });


    function startCounting() {
        let interval = setInterval(() => {
            if (userObj.counter > 0) {
                userObj.counter--

            } else {
                finishQuiz()
                clearInterval(interval)
            }
        }, 1000)
    }

    const qObj = reactive({
        displayedQuestionIds: [],
        randomQuestionId: null,
        fractionAnswered: computed(() => {
            return qObj.displayedQuestionIds.length + '/' + questionData.length
        }),
        progressBar: computed(() => {
            return Math.round((qObj.displayedQuestionIds.length / questionData.length) * 100)
        })
    });


    const userObj = reactive({
        selectedAnswer: "",
        answerClicked: false,
        score: 0,
        counter: 10,
        percentage: computed(() => {
            return Math.round((userObj.score / questionData.length) * 100)
        }),
    });

    const currentlyShowing = ref({});
    const quizIsEnded = ref(false)

    function selectAnswer(ops, id) {
        userObj.answerClicked = true;
        userObj.selectedAnswer = ops
        // validateAnswer(ops, id);
    }

    //for css coloring
    const isSelected = (ops) => {
        return userObj.selectedAnswer.toLowerCase() == ops.toLowerCase() ? true : false;
    };

    async function nextBtn() {
        await validateAnswer()
        generateRandom()
    }

    function validateAnswer() {
        let ops = userObj.selectedAnswer
        let id = currentlyShowing.value.id
        let question = questionData.find(qust => qust.id == id)
        if (question.answer.toLowerCase() == ops.toLowerCase()) {
            userObj.score += 1
        }
    }


    //genetate random from array
    function generateRandom() {
        userObj.selectedAnswer = ''
        userObj.answerClicked = false;
        qObj.randomQuestionId = u_mtd.randomFromArray(questionData).id;
        pushToDisplayedArray();
    }

    function pushToDisplayedArray() {
        if (qObj.displayedQuestionIds.length == questionData.length) {
            finishQuiz()
            userObj.counter = 0
        } else {
            if (!qObj.displayedQuestionIds.some((x) => x == qObj.randomQuestionId)) {
                qObj.displayedQuestionIds.push(qObj.randomQuestionId);
                currentlyShowing.value = questionData.find(
                    (x) => x.id == qObj.randomQuestionId
                );
                // console.log(currentlyShowing.value);
            } else {
                generateRandom();
            }
        }
    }

    function finishQuiz() {
        quizIsEnded.value = true
    }

    function resetQuiz() {
        userObj.answerClicked = false;
        userObj.score = 0;
        userObj.counter = 10
        userObj.selectedAnswer = '';
        quizIsEnded.value = false
        qObj.displayedQuestionIds = []
        generateRandom()
        startCounting()
    }

</script>

<style scoped>
    .opsCard {
        cursor: pointer;
    }

    .opsCard:hover {
        background-color: rgb(186, 243, 186);
    }

    .selected {
        background-color: rgb(186, 243, 186);
    }

    .btn {
        width: 150px;
    }
</style>