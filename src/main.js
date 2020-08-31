import Vue from 'vue'
import App from './App.vue'
import store from './store'

import vmodal from 'vue-js-modal'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';

Vue.use(vmodal, {
  dynamicDefaults: {
    height: '90%',
    width:"90%"
  },
},
BootstrapVue, IconsPlugin

)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
