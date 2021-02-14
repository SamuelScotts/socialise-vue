<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-button slot="start" color="black" disabled="true">
        </ion-button>
            <ion-title style="margin-top:3px; font-size: 30px" class="ion-text-center">{{pageName}}</ion-title>
        <ion-button slot="end" color="black" @click="$router.push('/account')">
          <ion-icon :icon="person" />
        </ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
        <ion-card v-for="story in stories" :key="story" @click="$router.push({name:'story', params: {id: story.id, title: story.title, subtitle: story.subtitle, faculty: story.faculty, content: story.content}})">
        <ion-card-header>
          <ion-card-subtitle>{{ story.faculty }}</ion-card-subtitle>
          <ion-card-title>{{ story.title }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-card-subtitle>{{ story.subtitle }}</ion-card-subtitle>
        </ion-card-content>
        </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, 
IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle} from '@ionic/vue';
import { person } from 'ionicons/icons';
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
    }
  },
  mounted(){
    db.collection("stories").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const stories = doc.data()
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