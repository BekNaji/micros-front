import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import { routes } from './routes.js'
import VueMask from 'v-mask'
import VueTheMask from 'vue-the-mask'
import money from 'v-money'
import { VueMaskFilter } from 'v-mask'

Vue.filter('VMask', VueMaskFilter)

// register directive v-money and component <money>
Vue.use(money, {precision: 4})

Vue.use(VueTheMask)

Vue.use(VueMask);

Vue.use(VueRouter);

Vue.use(VueResource);


//http://beknaji.com/demo/micros/backend/
//Vue.http.options.root = 'http://micros.test/api';
Vue.http.options.root = 'https://beknaji.com/demo/micros/backend/api';


export const router = new VueRouter({
	routes,
	mode:'history'
});


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
