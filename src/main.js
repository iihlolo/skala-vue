import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './components/exercise/WeatherComposition.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/main.css'
import './assets/exercise.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
