import Vue from 'vue'
import App from './App.vue'
import store from './store'
import electronStore from './electronStore'
import { ipcRenderer } from 'electron'

import '@/assets/scss/index.scss'

Vue.config.productionTip = false

ipcRenderer.on('vuex-event', (e, eventData) => {
  store.dispatch(eventData.type, eventData.payload)
})

if (electronStore.get('active-file')) {
  store.dispatch('editor/openFile', electronStore.get('active-file'))
}

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
