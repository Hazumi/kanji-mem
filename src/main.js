import Vue from 'vue';
import VueLodash from 'vue-lodash';
import App from './App.vue';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

const options = {
  name: 'lodash'
};

Vue.use(VueLodash, options);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
