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
        <ion-card v-for="story in stories" :key="story" @click="$router.push({name:'story', params: {id: story.id, title: story.title, subtitle: story.subtitle, 
        faculty: story.faculty, content: story.content, timestamp: story.timestamp, user: story.user}})">
        <ion-card-header>
          <!-- Display relevant faculty and user posting story. -->
          <ion-card-subtitle>{{ story.faculty }} - {{ story.user}}</ion-card-subtitle>
          <ion-card-title style="margin-top: 5px; margin-bottom: -10px;">{{ story.title }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <!-- Display stories subtitle & appreciate/comment counters. -->
          <div>{{ story.subtitle }}</div>
          <ion-icon :icon="handLeftOutline" style="font-size: 22px; margin-top: 10px;" /> {{ story.likes }}
          <ion-icon :icon="chatbubbleEllipsesOutline" style="font-size: 22px; margin-left: 10px;" /> x
        </ion-card-content>
        </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, 
IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle} from '@ionic/vue';
import { person, handLeftOutline, chatbubbleEllipsesOutline } from 'ionicons/icons';
// import Firestore from main.ts file.
import { db } from '../main';


export default  {
  name: 'stories',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton, IonIcon,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle},
  data: () => ({
    pageName: 'Stories',
    stories: [],
  }),
  setup() {
    return {
      person,
      handLeftOutline,
      chatbubbleEllipsesOutline,
    }
  },
  // Get all stories from 'stories' collection on Firebase.
  ionViewWillEnter(){
    this.stories = []
    db.collection("stories").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const stories = doc.data()
        // Add document id to stories array to allow later identification.
        stories.id = doc.id
        this.stories.push(stories);
      });
    })
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