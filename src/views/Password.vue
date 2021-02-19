<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="#642A5A">
        <ion-button slot="start">
          <ion-icon disabled="true"/>
        </ion-button>
        <ion-title style="margin-top:3px; font-size: 30px" class="ion-text-center">{{pageName}}</ion-title>
        <ion-button slot="end">
          <ion-icon disabled="true"/>
        </ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content>
        <div class="body">
            
            <h3 class="ion-text-center" style="font-size: 30px; color: black;">Welcome to</h3>
            <ion-item-divider style="width: 100%; text-align: center;"></ion-item-divider>
            <h1 class="ion-text-center" style="font-size: 50px; color: black; margin-top: -2px">Socialise</h1>
            
            <ion-input type="text" v-model="username" class="box" color="light" placeholder="Email" clearInput="true"></ion-input>
            <p></p>
            
            <ion-button @click="resetPassword()" class="button" expand="block">Reset Password</ion-button>

            <!-- Directs to login page, should user already have an account. -->
            <p class="ion-text-center" style="color: black;">Don't need a password reset? <router-link to="/login">Login here!</router-link></p>

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
  name: 'password',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton, IonIcon, 
  IonItemDivider, IonInput },
    data: () => ({
    pageName: 'Reset',
    username: '',
  }),
  setup() {
    return {
        //
    }
  }, 
  methods: {
    resetPassword(){
        auth.sendPasswordResetEmail(this.username).then(function() {
        alert("Email sent!")
        }).catch(function(error) {
        // An error happened.
        });
    }
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