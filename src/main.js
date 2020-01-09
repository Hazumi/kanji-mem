import Vue from 'vue';
import VueLodash from 'vue-lodash';
import App from './App.vue';

Vue.config.productionTip = false;

const options = {
  name: 'lodash'
};

Vue.use(VueLodash, options);

new Vue({
  render: h => h(App),
}).$mount('#app')
