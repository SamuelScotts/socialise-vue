<template>
  <ion-page>
    <!-- View title & account view link -->
    <ion-header>
      <ion-toolbar>
        <ion-button slot="start" color="black" @click="$router.push('/groups')">
          <ion-icon :icon="chevronBack" />
        </ion-button>
            <ion-title style="margin-top:3px; font-size: 30px" class="ion-text-center">{{$route.params.faculty}}</ion-title>
        <!-- Navigate to account view on click of icon. -->
        <ion-button slot="end" color="black" @click="$router.push('/account')">
          <ion-icon :icon="person" />
        </ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">

        <!-- If no stories relevant to that faculty to show, display content below -->
        <ion-item v-if="noStories" color="#642A5A" lines="none">
          <ion-label style="font-size: 20px;">There are no stories in this faculty :(</ion-label>
        </ion-item>

        <!-- Display all stories from stories array, by means of v-for loop.  Push props to 'story' view on click of anywhere on card. -->
        <ion-card v-for="story, index in stories" :key="index">
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
              <div style="margin-bottom: 20px;">{{ story.subtitle }}</div>
              <ion-icon :icon="handLeftOutline" style="font-size: 22px;" @click="preventDefault($event), incrementLikes(story.id, index)"/> {{ story.likes }} appreciations
              <ion-icon :icon="chatbubbleEllipsesOutline" style="font-size: 22px; margin-left: 10px;" /> {{story.comments}} comments
            </ion-card-content>
          </div>
        </ion-card>

    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonLabel, IonItem, 
IonCard, IonCardHeader, IonCardSubtitle, IonGrid, IonRow, IonCol, IonCardContent, IonCardTitle } from '@ionic/vue';
import { person, handLeftOutline, chatbubbleEllipsesOutline, trashOutline, chevronBack } from 'ionicons/icons';
import firebase from 'firebase';
// import Firestore from main.ts file.
import { db } from '../main';

export default  {
  name: 'group',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton, IonIcon, IonLabel, IonItem,
  IonCard, IonCardHeader, IonCardSubtitle, IonGrid, IonRow, IonCol, IonCardContent, IonCardTitle,
  },
  data: () => ({
    pageName: 'Group',
    // Set empty array to hold all stories.
    stories: [],
    // To determines if section displayed in render.
    noStories: null,
    // Set current user to null.  Variable set when view is opened.
    currentUser: '',
  }),
  setup() {
    return {
      // Icon image references.
      person,
      handLeftOutline,
      chatbubbleEllipsesOutline,
      trashOutline,
      chevronBack
    }
  },
  methods:{
    // Prevents clickable event on <ion-card> occurring, when clickable item on the card is pressed.
    preventDefault(event){
      event.stopPropagation()
    },
    // Deletes story, but can only be done by relevant user who posted same.
    deleteStory(storyId){
      db.collection("stories").doc(storyId).delete().then(() => {
          this.getStories();
      }).catch((error) => {
          console.error("Error removing document: ", error);
      });
    },
    // Gets signed in users information
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
          // Check if username on each post is same as current user, 
          // to set whether trash icon should appear. 
          if (stories.user === this.currentUser){
            stories.trash = true;
          } else {
            stories.trash = false;
          }
          // Filter stories entering stories array to display those only
          // relevant to the selected faculty.
          if (stories.faculty === this.$route.params.faculty){
            this.stories.push(stories);
          }
          if (this.stories.length > 0){
            this.noStories = false;
          } else {
            this.noStories = true;
          }
        });
      })
    },
    // Increment the like field in Firestore by one.
    incrementLikes(storyId, index){
      db.collection("stories").doc(storyId).update({ 
          likes: firebase.firestore.FieldValue.increment(1) 
      })
      // Refreshes likes count displayed on view, by querying the Firestore on event.
      db.collection("stories").doc(storyId).onSnapshot((doc) => {
        const stories = doc.data()
        this.stories[index].likes = stories.likes;
      });
    },
    likedOrNot(){
      this.liked = true;
    }
  },
  // Method which runs on view loading, executing two methods above.
  ionViewWillEnter(){
    this.getCurrentUser(),
    this.getStories()
  },
  // Method which runs on view closing, reseting noStories variable to false.
  ionViewWillLeave(){
    this.noStories = false;
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
/* Remove scroll bar across app */
::-webkit-scrollbar,
*::-webkit-scrollbar {
  display: none;
}
</style>