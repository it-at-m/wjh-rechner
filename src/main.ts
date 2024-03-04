import { createApp } from 'vue'
// Plugins
import { registerPlugins } from '@/plugins'
import { useNotificationsStore } from '@/store/notifications'

import App from './App.vue'

const app = createApp(App)
registerPlugins(app)
// https://vuejs.org/api/application.html#app-config-errorhandler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.config.errorHandler = function (err, vm, info) {
  console.error('Global errorHandler: handling uncatched error.', err)
  useNotificationsStore().handleError(err)
}

app.mount('#app')
