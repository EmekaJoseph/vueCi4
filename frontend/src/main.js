import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import '@/assets/css/root.css'


/*
npm install --save jquery
npm install --save jszip
npm install --save pdfmake
npm install --save datatables.net-bs5
npm install --save datatables.net-buttons-bs5

npm install vue3-date-time-picker
 */
import 'datatables.net-bs5'
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css'
import 'jszip'
import 'pdfmake'
import 'datatables.net-buttons-bs5/js/buttons.bootstrap5'
import 'datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css'
import 'datatables.net-buttons/js/buttons.colVis'
import 'datatables.net-buttons/js/buttons.flash'
import 'datatables.net-buttons/js/buttons.html5'
import 'datatables.net-buttons/js/buttons.print'

import _ from 'lodash';

import 'vue3-date-time-picker/dist/main.css'



const mainApp = createApp(App)
mainApp.use(router)
mainApp.mount('#app')
