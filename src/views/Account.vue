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

    <ion-content :fullscreen="true">
      <ion-grid style="margin-top: 20px;">
        <ion-row>
          <ion-col size="4"><ion-icon id="avatar" :icon="personOutline"></ion-icon></ion-col>
          <ion-col><h1 style="font-size: 50px;">{{ currentUser }}</h1></ion-col>
        </ion-row>
        <ion-row>
          <ion-col><ion-button style="font-size: 20px;" @click="logout()" expand="block">Logout</ion-button></ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonGrid,
IonCol, IonRow } from '@ionic/vue';
import { chevronBack, personOutline, person } from 'ionicons/icons';
import router from '../router/index';
import firebase from "firebase";
import { db } from '../main';

export default  {
  name: 'account',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton, IonIcon, IonGrid, 
  IonCol, IonRow },
  data: () => ({
    pageName: 'Account',
    currentUser: null,
  }),
  setup() {
    return {
      chevronBack,
      personOutline,
      person
    }
  },  
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        firebase.auth().onAuthStateChanged(() => {
          this.$router.push('/login')
        })
      })
    },
  },
  ionViewDidEnter(){
    const user = firebase.auth().currentUser;
    const docRef = db.collection("users").doc(user.uid);
      docRef.get().then((doc) => {
        const username = doc.data();
        this.currentUser = username.username;
      }).catch((error) => {
          console.log("Error getting document:", error);
      });
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
  --background: black;
  --background-activated: black;
  --background-focused: #642A5A;
}
#avatar{
  font-size: 96px;
}
</style>