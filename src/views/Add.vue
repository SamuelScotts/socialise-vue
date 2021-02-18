<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-button slot="start" color="black" @click="$router.push('/stories')">
          <ion-icon :icon="closeOutline" />
        </ion-button>
        <ion-title style="margin-top:3px; font-size: 30px" class="ion-text-center">{{pageName}}</ion-title>
        <ion-button slot="end" color="black" @click="$router.push('/stories'), getTimestamp(), addStory()">
          <ion-icon :icon="checkmarkOutline" />
        </ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form style="margin-top: 10px;">
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

        <ion-item style="margin-top: 10px;">
          <ion-input v-model="title" type="text" required="true" clearInput="true" maxlength="20" placeholder="Enter an interesting title!"></ion-input>
        </ion-item>

        <ion-item style="margin-top: 10px;">
          <ion-input v-model="subtitle" type="text" required="true" clearInput="true" placeholder="Enter a headline."></ion-input>
        </ion-item>

        <ion-item style="margin-top: 10px;">
          <ion-textarea v-model="content" type="text" required="true" auto-grow="true" placeholder="Add your post content."></ion-textarea>
        </ion-item>
      </form>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonSelectOption,
IonInput, IonSelect, IonLabel, IonItem, IonTextarea } from '@ionic/vue';
import { closeOutline, checkmarkOutline } from 'ionicons/icons';
//import router from '../router/index';
import firebase from "firebase";
import { db } from '../main'

export default  {
  name: 'add',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton, IonIcon, 
  IonSelectOption, IonInput, IonSelect, IonLabel, IonItem, IonTextarea  },
    data: () => ({
    pageName: 'New Story',
    faculty: '',
    title: '',
    subtitle: '',
    content:'',
    currentUser: null,
    timestamp: null,
  }),
  setup() {
    return {
      closeOutline,
      checkmarkOutline
    }
  }, 
  methods: {
    addStory(){
      db.collection("stories").add({
      faculty: this.faculty,
      title: this.title,
      subtitle: this.subtitle,
      content: this.content,
      likes: 0,
      user: this.currentUser,
      timestamp: this.timestamp,
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });
    },
    getTimestamp(){
      this.timestamp = Date.now()
    }
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
}
</style>