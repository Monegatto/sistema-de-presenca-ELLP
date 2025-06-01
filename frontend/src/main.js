import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import FontAwesomeIcon from './fontawesome-icons'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .use(Toast)
    .mount('#app')
