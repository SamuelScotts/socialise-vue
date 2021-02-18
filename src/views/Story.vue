<template>
  <ion-page>
    <!-- View title & account view link -->
    <ion-header>
      <ion-toolbar>
        <ion-button slot="start" color="black" @click="$router.push('/stories')">
          <ion-icon :icon="chevronBack" />
        </ion-button>
        <ion-title style="margin-top:3px; font-size: 30px" class="ion-text-center">{{pageName}}</ion-title>
        <!-- Navigate to account view on click of icon. -->
        <ion-button slot="end" color="black" @click="$router.push('/account')">
          <ion-icon :icon="person" />
        </ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      
      <!-- Displays stories info, using props passed down from 'stories view' -->
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>{{ $route.params.faculty }} - {{ $route.params.user }}</ion-card-subtitle>
          <ion-card-title>{{ $route.params.title }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          {{ $route.params.content }}
        </ion-card-content>
      </ion-card>
      
      <ion-item color="#642A5A" lines="none">
        <ion-label style="font-size: 30px; font-weight: bold">Comments</ion-label>
      </ion-item>

      <!-- Card for submitting comment.  V-model stores input from user in 'comment' variable and runs the 'addComment' method to add info to Firebase. -->
      <ion-card>
        <ion-card-content>
          <ion-item color="black" lines="none" style="border: 1px solid white; border-radius: 5px; color: white;">
            <ion-input v-model="comment" type="text" clearInput="true" placeholder="Your comment..."></ion-input>
            <ion-button @click="addComment()" color="dark">Post</ion-button>
          </ion-item>
        </ion-card-content>
      </ion-card>

      <!-- If no comments to show, display content below -->
      <ion-item v-if="noComments" color="#642A5A" lines="none">
        <ion-label style="font-size: 20px;">Be the first to comment!</ion-label>
      </ion-item>

      <!-- Loop through all comments, and display relevant info on separate cards -->
      <ion-card v-for="comment in comments" :key="comment">
        <ion-card-header>
          <ion-card-subtitle>Posted by: {{comment.postedBy}}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          {{ comment.content }}
        </ion-card-content>
      </ion-card>
    
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon,
IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem,
IonInput, IonLabel } from '@ionic/vue';
import { chevronBack, person } from 'ionicons/icons';
//import router from '../router/index';
import firebase from 'firebase';
import { db } from '../main';


export default  {
  name: 'story',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton, IonIcon,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonInput,
  IonLabel },
  data: () => ({
    pageName: 'Story',
    comments: [],
    comment: '',
    currentUser: null,
    noComments: null,
  }),
  setup() {
    return {
      chevronBack,
      person
    }
  },
  methods: {
    // A method that will add the submitted comment, based upon the relevant story id.  Stores the content and submitting users info.
    addComment(){
      this.comments = [];
      db.collection("stories/" + this.$route.params.id + "/comments").add({
        content: this.comment,
        postedBy: this.currentUser,
      })
      .then(() => {
          // Run refresh comments method, to obtain most up to date comment set from Firebase.
          this.refreshComments();
          this.comment = '';
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });
    },
    // A method that can be called to obtain latest comments from Firebase.
    refreshComments(){
      db.collection("stories/" + this.$route.params.id + "/comments").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.comments.push(doc.data())
      });
        // Set variable 'noComments' based upon number of comments obtained above.
        if (this.comments.length === 0) {
          this.noComments = true;
        } else {
          this.noComments = false;
        }
      });
    }
  },
  // Get all comments from sub-collection to 'stories', by using relevant passed generated id.
  ionViewWillEnter(){
    db.collection("stories/" + this.$route.params.id + "/comments").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.comments.push(doc.data())
      });
      // Set variable 'noComments' based upon number of comments obtained above.
      if (this.comments.length === 0) {
        this.noComments = true;
      } else {
        this.noComments = false;
      }
    });
    // Get current user from Fiebase Authentication when the view opens.
    const user = firebase.auth().currentUser;
    // Get above users username from 'users' collection.
    const docRef = db.collection("users").doc(user.uid);
      docRef.get().then((doc) => {
        const username = doc.data();
        // Store the obtained username in 'currentUser' variable.
        this.currentUser = username.username;
      }).catch((error) => {
          console.log("Error getting document:", error);
      });
  },
  // Clear the comments array on leaving the view.
  ionViewDidLeave() {
    this.comments = [];
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
ion-item{
    --highlight-color-focused: #642A5A;
}
#hideCardContent{
  background-color: #642A5A;
  box-shadow:none;
  margin-left: -2px;
}
::-webkit-scrollbar,
*::-webkit-scrollbar {
  display: none;
}
</style>