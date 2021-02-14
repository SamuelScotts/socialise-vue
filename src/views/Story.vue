<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-button slot="start" color="black" @click="$router.push('/stories')">
          <ion-icon :icon="chevronBack" />
        </ion-button>
        <ion-title style="margin-top:3px; font-size: 30px" class="ion-text-center">{{pageName}}</ion-title>
        <ion-button slot="end" color="black" @click="$router.push('/account')">
          <ion-icon :icon="person" />
        </ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>{{ $route.params.faculty }}</ion-card-subtitle>
          <ion-card-title>{{ $route.params.title }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          {{ $route.params.content }}
        </ion-card-content>
      </ion-card>

      <ion-card id="hideCardTitle">
        <ion-card-header>
          <ion-card-title>Comments</ion-card-title>
        </ion-card-header>
      </ion-card>

      <ion-card id="postComment">
        <ion-card-content>
          <ion-item>
            <ion-input v-model="comment" type="text" clearInput="true" placeholder="Your comment..."></ion-input>
            <ion-button color="dark">Post</ion-button>
          </ion-item>
        </ion-card-content>
      </ion-card>

<!--       <ion-card id="hideCardContent">
        <ion-card-content>
          There are currently no comments on this story... Be the first to add one!
        </ion-card-content>
      </ion-card> -->

      <ion-card id="comment" v-for="comment in comments" :key="comment">
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
IonInput } from '@ionic/vue';
import { chevronBack, person } from 'ionicons/icons';
import router from '../router/index'
import { db } from '../main'


export default  {
  name: 'story',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton, IonIcon,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonInput },
  data: () => ({
    pageName: 'Story',
    comments: [],
    comment: '',
  }),
  setup() {
    return {
      chevronBack,
      person
    }
  },
  methods: {
    //
  },
  mounted(){
    db.collection("stories/" + this.$route.params.id + "/comments").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.comments.push(doc.data())
      });
    });

  }
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
#postComment{
  margin-top: -20px;
}
#hideCardTitle{
  background-color: #642A5A;
  box-shadow:none;
  margin-top: -20px;
  margin-left: -2px;
}
#hideCardContent{
  background-color: #642A5A;
  box-shadow:none;
  margin-top: -40px;
  margin-left: -2px;
}
#comment{
  margin-top: -10px;
}
::-webkit-scrollbar,
*::-webkit-scrollbar {
  display: none;
}
</style>