import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import firebase from 'firebase'
import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  
router.isReady().then(() => {
  app.mount('#app');
});

const firebaseConfig = {
  apiKey: "BLANK FOR A REASON",
  authDomain: "BLANK FOR A REASON",
  projectId: "BLANK FOR A REASON",
  storageBucket: "BLANK FOR A REASON",
  messagingSenderId: "BLANK FOR A REASON",
  appId: "BLANK FOR A REASON"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();