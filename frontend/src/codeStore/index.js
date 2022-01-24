import _ from 'lodash'
import { reactive } from 'vue'
const constants = {
    baseURL: 'http://localhost',//online
    // baseURL: '',
}

const values = reactive({
    response: null,
    cart: [],
    tabNames: [
        { slot: 1, name: "FILE UPLOAD", icon: 'bx-folder' },
        { slot: 2, name: "TODO", icon: 'bx-edit' },
        { slot: 3, name: "DATATABLE", icon: 'bx-table' },
        { slot: 7, name: "CUSTOM TABLE", icon: 'bx-table' },
        { slot: 4, name: "CART", icon: 'bx-cart' },
        { slot: 5, name: "COLOR BINDING", icon: 'bx-color-fill' },
        { slot: 6, name: "QUIZ", icon: 'bx-spreadsheet' },

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
        return _.sample(array)
        // return array[Math.floor(Math.random() * array.length)]
    }

}

export default {
    values,
    methods,
    constants
}