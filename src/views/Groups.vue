<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-button slot="start" color="black" @click="$router.push('/stories')">
          <ion-icon :icon="chevronBack" />
        </ion-button>
        <ion-title style="margin-top:3px; font-size: 30px" class="ion-text-center">{{pageName}}</ion-title>
        <ion-button slot="end" color="black">
          <ion-icon disabled="true"/>
        </ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/vue';
import { chevronBack } from 'ionicons/icons';
import router from '../router/index';

export default  {
  name: 'groups',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton, IonIcon },
    data: () => ({
    pageName: 'Groups',
  }),
  setup() {
    return {
      chevronBack
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
</style>