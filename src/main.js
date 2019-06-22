import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import {router} from './router'
import './common/style/style.css'

Vue.config.productionTip = false;
import VueMasonry from 'vue-masonry-css'

Vue.use(VueMasonry);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
