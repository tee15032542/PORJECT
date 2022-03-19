import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import OpenLayersMap from 'vue3-openlayers'
import 'vue3-openlayers/dist/vue3-openlayers.css'
import Toast from 'primevue/toast'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import 'primevue/resources/themes/saga-green/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

const app = createApp(App)
app.component(Toast)
app.use(store).use(router).use(OpenLayersMap).use(ToastService).use(PrimeVue).mount('#app')
