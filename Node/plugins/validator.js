import Vue from 'vue'

import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required,min, max,email,alpha_dash,integer,min_value } from 'vee-validate/dist/rules';

import Paginate from 'vuejs-paginate'  
import VueSweetalert2 from 'vue-sweetalert2'; 



import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'sweetalert2/dist/sweetalert2.min.css';
import { messages } from 'vee-validate/dist/locale/vi.json'

extend('required', {
  ...required,
  message: messages.required,
})

extend('email', {
  ...email,
  message: messages.email,
})

extend('min', {
  ...min,
  message: messages.min,
})

extend('max', {
  ...max,
  message: messages.max,
})
extend('alpha_dash', {
  ...alpha_dash,
  message: messages.alpha_dash,
})
extend('integer', {
  ...integer,
  message: messages.integer,
})
extend('min_value', {
  ...min_value,
  message: messages.min_value,
})

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('paginate', Paginate)

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.use(VueSweetalert2);