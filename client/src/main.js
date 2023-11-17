import { createApp } from 'vue'
import  router  from "./router";
import  '../src/assets/main.css'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'boxicons/css/boxicons.min.css';



/* import the fontawesome core */
/*import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
/*import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
/*import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
/*library.add(faUserSecret)*/


/*createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app');*/

createApp(App).use(router).mount('#app');

