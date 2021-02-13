import Vue from 'vue';
import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueGtag from 'vue-gtag';

import locale from 'element-ui/lib/locale/lang/it';

import App from './App.vue';
import router from './router';
import store from './store';

import { NavPlugin } from 'bootstrap-vue';
import { READ_EXAM } from './store/types/actions-types';

Vue.use(
  VueGtag,
  {
    config: { id: 'UA-119579696-2' },
  },
  router
);

// Install BootstrapVue
Vue.use(BootstrapVue);
Vue.use(NavPlugin);

Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;

store.dispatch(READ_EXAM);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
