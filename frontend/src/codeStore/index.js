import { reactive } from 'vue'
const constants = {
    baseURL: 'http://localhost',//online

}

const values = reactive({
    response: null
})

const methods = {
    splitWords: (str) => {
        str = str.replace(/(^\s*)|(\s*$)/gi, "");
        str = str.replace(/[ ]{2,}/gi, " ");
        str = str.replace(/\n /, "\n");
        return str.split(' ');
    },

    removeDuplicates: (array) => {
        return array.filter((a, b) => array.indexOf(a) === b)
        // let unique = [...new Set(array)]; // can remove dupliates too
    },




    moveUp() {
        window.scrollTo(0, 0);
        //or this // document.getElementById('domID').scrollIntoView();
    },


    plural: (num) => {
        return num == 1 ? "" : "s"
    }

}

export default {
    values,
    methods,
    constants
}