<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="#642A5A">
        <!-- Deactivated button added here as spacer -->
        <ion-button slot="start" disabled>
          <ion-icon disabled="true"/>
        </ion-button>
        <ion-title style="margin-top:3px; font-size: 30px" class="ion-text-center">{{pageName}}</ion-title>
        <!-- Deactivated button added here as spacer -->
        <ion-button slot="end" disabled>
          <ion-icon disabled="true"/>
        </ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content>
        <div class="body">
            
            <h3 class="ion-text-center" style="font-size: 30px; color: black;">Welcome to</h3>
            <ion-item-divider style="width: 100%; text-align: center;"></ion-item-divider>
            <h1 class="ion-text-center" style="font-size: 50px; color: black; margin-top: -2px">Socialise</h1>
            <!-- Input for user's email address -->
            <ion-input type="text" v-model="username" class="box" color="light" placeholder="Email" clearInput="true"></ion-input>
            <p></p>
            <!-- Input for users password -->
            <ion-input type="password" v-model="password" class="box" color="light" placeholder="Password" clearInput="true"></ion-input>
            <!-- Link to reset password view -->
            <p class="ion-text-center" style="color: black;">Forgotten your password? <router-link to="/password">Click here!</router-link></p>
            <!-- Button which activates userLogin() method below -->
            <ion-button @click="userLogin()" class="button" expand="block">Login</ion-button>
            <!-- Link to registration view -->
            <p class="ion-text-center" style="color: black;">Don't have an account? <router-link to="/register">Register here!</router-link></p>

        </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, 
IonItemDivider, IonInput } from '@ionic/vue';
//import { chevronBack } from 'ionicons/icons';
import router from '../router/index';
import firebase from "firebase";
import auth from '../main';

export default  {
  name: 'login',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton, IonIcon, 
  IonItemDivider, IonInput },
    data: () => ({
    pageName: 'Login',
    username: '',
    password: '',
  }),
  setup() {
    return {
        //
    }
  }, 
  methods: {
    userLogin() {
      // Login to app, via Firebase Auth, using input username & password above.
      firebase.auth().signInWithEmailAndPassword(this.username, this.password)
      .then(() => {
        // If authenticated ok, move to stories view, and clear username/password variables.
        this.$router.push('/stories');
        this.username = '';
        this.password = '';
      })
      .catch((error) => {
        alert(error.message);
      });
    },
  }
}
</script>

<style scoped>
ion-content{
    background-color:#FFFFFF;
    --offset-bottom: auto!important;
    --overflow: hidden;
    overflow: auto;
}
ion-toolbar{
  background-color: #642A5A;
}
ion-button{
  --box-shadow:none;
}
.body{
  padding-left: 30px;
  padding-right: 30px;
}
.box {
  border-color: #403E39;
  border-width: thin;
  border-style: solid;
  border-radius: 3px;
}
ion-item-divider{
  margin-top: -7px;
  min-height: 1px!important;
  width: 200px;
}
ion-button{
  --background: #642A5A;
  --background-activated: black;
  --background-focused: #642A5A;
}
ion-input{
  --padding-start: 10px;
}
</style>