<!-- ******************************************************
*
**
***
- LIMITED INFORMATION ADDED TO THIS PAGE AT PRESENT.
- ONLY REALLY DISPLAYING LOGGED IN USER'S NAME, AND
- PROVIDING LOGOUT ABILITY.
***
**
*
******************************************************* -->

<template>
  <ion-page>
    <!-- View title & account view link -->
    <ion-header>
      <ion-toolbar>
        <ion-button slot="start" color="black" @click="$router.push('/stories')">
          <ion-icon :icon="chevronBack" />
        </ion-button>
        <ion-title style="margin-top:3px; font-size: 30px" class="ion-text-center">{{pageName}}</ion-title>
        <!-- Navigate to account view on click of icon. Can still do, despite being on said view -->
        <ion-button slot="end" color="black" @click="$router.push('/account')">
          <ion-icon :icon="person" />
        </ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-grid style="margin-top: 20px;">
        <ion-row>
          <!-- Where avatar image would go, if/once image uploads built in -->
          <ion-col size="4"><ion-icon id="avatar" :icon="personOutline"></ion-icon></ion-col>
          <!-- Display logged in users username -->
          <ion-col><h1 style="font-size: 50px;">{{ currentUser }}</h1></ion-col>
        </ion-row>
        <ion-row>
          <!-- Logout button.  Links to logout method -->
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
//import router from '../router/index';
import firebase from "firebase";
import { db } from '../main';

export default  {
  name: 'account',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton, IonIcon, IonGrid, 
  IonCol, IonRow },
  data: () => ({
    // Variable for view name.
    pageName: 'Account',
    // Set current user to null.  Variable set when view is opened.
    currentUser: null,
  }),
  setup() {
    return {
      // Icon image references.
      chevronBack,
      personOutline,
      person
    }
  },  
  methods: {
    // Function to allow user to logout of the application.
    logout() {
      firebase.auth().signOut().then(() => {
        firebase.auth().onAuthStateChanged(() => {
          this.$router.push('/login')
        })
      })
    },
  },
  ionViewDidEnter(){
    // Gets current user from Firebase Auth 
    const user = firebase.auth().currentUser;
    // Gets current user details from FireStore DB.
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