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
            
            <!-- Input field for user to add a username  Obtained using v-model. -->
            <ion-input type="text" v-model="username" class="box" color="light" placeholder="Choose a username." clearInput="true"></ion-input>
            <p></p>

            <!-- A selector, for the user to determine which faculty they are associated too. -->
            <ion-item>
            <ion-label>What faculty?</ion-label>
            <ion-select v-model="faculty" required="true" placeholder="">
                <ion-select-option>Business</ion-select-option>
                <ion-select-option>Accounting</ion-select-option>
                <ion-select-option>Law</ion-select-option>
                <ion-select-option>Computer Science</ion-select-option>
                <ion-select-option>Science</ion-select-option>
                <ion-select-option>Civil Engineering</ion-select-option>
                <ion-select-option>Audio Engineering</ion-select-option>
                <ion-select-option>Air Service Training</ion-select-option>
                <ion-select-option>English</ion-select-option>
            </ion-select>
            </ion-item>
            
            <p></p>
            <!-- Input field for user to supply their email address.  Obtained using v-model. -->
            <ion-input type="text" v-model="email" class="box" color="light" placeholder="Enter your email address." clearInput="true"></ion-input>
            <p></p>
            <!-- Input field for user to supply their password.  Obtained using v-model. -->
            <ion-input type="password" min="6" v-model="password" class="box" color="light" placeholder="Choose a password." clearInput="true"></ion-input>
           
            <p v-if="passInfo" class="ion-text-end" id="passInfo">Your password must contain at least 8 characters</p>
            <p v-else></p>
            <!-- Submits registration form and performs validation at same time. -->
            <ion-button @click="checkPassLength()" class="button" expand="block">Register</ion-button>

            <!-- Directs to login page, should user already have an account. -->
            <p class="ion-text-center" style="color: black;">Already have an account? <router-link to="/login">Login here!</router-link></p>
        </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, 
IonItemDivider, IonInput, IonSelect, IonSelectOption, IonLabel, IonItem } from '@ionic/vue';
//import { chevronBack } from 'ionicons/icons';
//import router from '../router/index';
import firebase from "firebase";
import { db } from '../main';

export default  {
  name: 'register',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton, IonIcon, 
  IonItemDivider, IonInput, IonSelect, IonSelectOption, IonLabel, IonItem },
    data: () => ({
    pageName: 'Register',
    username: '',
    faculty: '',
    email: '',
    password: '',
    passInfo: false,
  }),
  setup() {
    return {
        //
    }
  }, 
  methods: {
    // A method to create a new user, based upon the info they've supplied, and stor with Firebase Auth.  
    // Thereafter directs to 'stories' view.
    userSignup(){
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then((userCredential) => {
            const user = userCredential.user;
            db.collection("users").doc(user.uid).set({
                username: this.username,
                faculty: this.faculty,
            })
            this.$router.push('/stories')
          })
    },
    // Performs minor validation on password length, as Firebase Auth requires a password > 6 characters.
    checkPassLength(){
        if (this.password.length < 6){
            this.passInfo = true;
        } else {
            this.passInfo = false;
            this.userSignup();
        }
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
ion-select{
  --box-shadow:none;
  --placeholder-color: black;
  padding-left:9px;
}
#passInfo{
    font-size: 11px;
    color: red;
}
</style>