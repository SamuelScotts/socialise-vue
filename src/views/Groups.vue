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
      <ion-card id="comment" v-for="faculty in faculties" :key="faculty">
        <div @click="$router.push({name:'group', params: {faculty: faculty}})">
          <ion-card-header>
            <ion-card-title>
              {{faculty}}
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
              Get the latest information from the {{faculty}} department.
          </ion-card-content>
        </div>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonCard,
IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';
import { chevronBack, person } from 'ionicons/icons';
import router from '../router/index';

export default  {
  name: 'groups',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton, IonIcon, IonCard,
  IonCardHeader, IonCardTitle, IonCardContent },
    data: () => ({
    pageName: 'Groups',
    faculties: ["Business", "Computer Science", "English", "Accounting", "Law", "Science", "Civil Engineering", 
    "Audio Engineering", "Air Service Training"]
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
::-webkit-scrollbar,
*::-webkit-scrollbar {
  display: none;
}
</style>