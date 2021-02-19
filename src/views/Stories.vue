<template>
  <ion-page>
    <!-- View title & account view link -->
    <ion-header>
      <ion-toolbar>
        <ion-button slot="start" color="black" disabled="true">
        </ion-button>
            <ion-title style="margin-top:3px; font-size: 30px" class="ion-text-center">{{pageName}}</ion-title>
        <!-- Navigate to account view on click of icon. -->
        <ion-button slot="end" color="black" @click="$router.push('/account')">
          <ion-icon :icon="person" />
        </ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">

        <!-- Display all stories from stories array, by means of v-for loop.  Push props to 'story' view on click of anywhere on card. -->
        <ion-card v-for="story in stories" :key="story">
          <div @click="$router.push({name:'story', params: {id: story.id, title: story.title, subtitle: story.subtitle, 
          faculty: story.faculty, content: story.content, timestamp: story.timestamp, user: story.user}})">
            
            <!-- Display relevant faculty and user posting story. -->
            <ion-card-header>
              <ion-card-subtitle>
              <ion-grid>
                <ion-row>
                  <ion-col style="padding-left: 0px;">
                    <div>{{ story.faculty }}</div>
                  </ion-col>
                  <ion-col>
                    <div style="float: right;" @click="$router.push('/profile'), preventDefault($event)">{{ story.user}}</div>
                  </ion-col>
                  <ion-col style="padding-right: 0px;">
                    <div>
                      <ion-icon v-if="story.trash" @click="preventDefault($event), deleteStory(story.id)" style="font-size: 20px; float: right;" :icon="trashOutline"></ion-icon>
                    </div>
                  </ion-col>
                </ion-row>
              </ion-grid>
              </ion-card-subtitle>
              <ion-card-title style="margin-top: 5px; margin-bottom: -10px;">{{ story.title }}</ion-card-title>
            </ion-card-header>
            
            <!-- Display stories subtitle & appreciate/comment counters. -->
            <ion-card-content>
              <div>{{ story.subtitle }}</div>
              <ion-item-divider></ion-item-divider>
              <ion-icon :icon="handLeftOutline" style="font-size: 22px;" /> {{ story.likes }} appreciations
              <ion-icon :icon="chatbubbleEllipsesOutline" style="font-size: 22px; margin-left: 10px;" /> 0 comments
            </ion-card-content>
          </div>
        </ion-card>

    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, 
IonCard, IonCardHeader, IonCardSubtitle, IonGrid, IonRow, IonCol, IonCardContent, IonCardTitle,
IonItemDivider } from '@ionic/vue';
import { person, handLeftOutline, chatbubbleEllipsesOutline, trashOutline } from 'ionicons/icons';
import firebase from 'firebase';
// import Firestore from main.ts file.
import { db } from '../main';

export default  {
  name: 'stories',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton, IonIcon,
  IonCard, IonCardHeader, IonCardSubtitle, IonGrid, IonRow, IonCol, IonCardContent, IonCardTitle,
  IonItemDivider },
  data: () => ({
    pageName: 'Stories',
    stories: [],
    currentUser: '',
  }),
  setup() {
    return {
      person,
      handLeftOutline,
      chatbubbleEllipsesOutline,
      trashOutline,
    }
  },
  methods:{
    // Prevents clickable event on <ion-card> occurring, when clickable item on the card is pressed.
    preventDefault(event){
      event.stopPropagation()
    },
    deleteStory(storyId){
      db.collection("stories").doc(storyId).delete().then(() => {
          this.getStories();
      }).catch((error) => {
          console.error("Error removing document: ", error);
      });
    },
    getCurrentUser(){
      // Get current user from Fiebase Authentication when the view opens.
      const user = firebase.auth().currentUser;
      // Get above users username from 'users' collection.
      const docRef = db.collection("users").doc(user.uid);
        docRef.get().then((doc) => {
          const username = doc.data();
          this.currentUser = username.username;
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    },
    getStories(){
      // Get all stories from 'stories' collection on Firebase.
      this.stories = []
      db.collection("stories").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const stories = doc.data()
          // Add document id to stories array to allow later identification.
          stories.id = doc.id
          // check if username on each post is same as current user, 
          // to set whether trash icon should appear. 
          if (stories.user === this.currentUser){
            stories.trash = true;
          } else {
            stories.trash = false;
          }
          this.stories.push(stories);
        });
      })
    }
  },

  ionViewWillEnter(){
    this.getCurrentUser(),
    this.getStories()
  }

}
</script>

<style scoped>
ion-content {
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