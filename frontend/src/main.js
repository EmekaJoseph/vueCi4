import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// import '@/assets/css/root.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'



const mainApp = createApp(App)
mainApp.use(router)
mainApp.mount('#app')
