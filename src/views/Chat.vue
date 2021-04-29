<!-- ******************************************************
*
**
***
- PAGE NOT BUILT YET.  VERY BASIC LAYOUT ADDED.
- TO HOLD USERS CONVERSTIONS WITH OTHER USERS.
- WAS TO WORK LIKE INSTANT MESSANGE. NOT YET IMPLEMENTED.
- NO COMMENTS ADDED DUE TO ABOVE.
***
**
*
******************************************************* -->

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-button slot="start" color="black" @click="$router.push('/stories')">
          <ion-icon :icon="chevronBack" />
        </ion-button>
        <ion-title style="margin-top:3px; font-size: 30px" class="ion-text-center">{{pageName}}</ion-title>
        <ion-button slot="end" color="black" @click="$router.push('/account')">
          <ion-icon :icon="person" />
        </ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/vue';
import { chevronBack, person } from 'ionicons/icons';
import router from '../router/index';

export default  {
  name: 'chat',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton, IonIcon },
    data: () => ({
    pageName: 'Chat',
  }),
  setup() {
    return {
      chevronBack,
      person
    }
  },  
  methods: {
    //
  },
}
</script>

<style scoped>
ion-content{
  background-color:#642A5A;
  --offset-bottom: auto!important;
  --overflow: hidden;
  overflow: auto;
}
ion-button{
  --box-shadow:none;
}
</style>