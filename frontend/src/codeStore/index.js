import { reactive } from 'vue'
const constants = {
    baseURL: 'http://localhost',//online
}

const values = reactive({
    response: null,
    cart: [],
    tabNames: [
        { slot: 1, name: "FILE UPLOAD" },
        { slot: 2, name: "TODO" },
        { slot: 3, name: "DATATABLE" },
        { slot: 4, name: "CART" },
        { slot: 5, name: "COLOR BINDING" },
        { slot: 6, name: "QUIZ" },
    ],
    //offcanvas
    showOffCanvas: false

})

const methods = {
    //offcanvas
    toggleOffCanvas() {
        values.showOffCanvas = !values.showOffCanvas
    },
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
    },

    randomFromArray: (array) => {
        return array[Math.floor(Math.random() * array.length)]
    }

}

export default {
    values,
    methods,
    constants
}