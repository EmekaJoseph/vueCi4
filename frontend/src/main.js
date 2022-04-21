import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap-icons/font/bootstrap-icons.css'
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

// npm i --save lodash
import _ from 'lodash';

//npm install vue3-date-time-picker   
import 'vue3-date-time-picker/dist/main.css'

// npm install -S vue-sweetalert2
import Swal from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';




const mainApp = createApp(App)
mainApp.use(router)
mainApp.use(Swal)
mainApp.mount('#app')
